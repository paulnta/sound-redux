package main

import (
	"fmt"
	"net/http"
	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"
	"os"
	"bytes"
	"encoding/json"
	"io/ioutil"
)

type Credentials struct {
	ApplicationName string `json:"applicationName"`
	Password string `json:"password"`
}

var token string
var apiHost = "localhost:8090"

func status(rw http.ResponseWriter, r *http.Request) {
	response := "{\"status\": \"ok\"}"
	fmt.Fprint(rw, response)
}

func events(rw http.ResponseWriter, req *http.Request) {
	url := "http://" + apiHost + "/api/events"
	req, err := http.NewRequest("POST", url, req.Body)
	req.Header.Set("Authorization", token)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	body, _ := ioutil.ReadAll(resp.Body)

	// send the body and status code
	rw.WriteHeader(resp.StatusCode)
	fmt.Fprintln(rw, string(body))
}

func scalePointList(rw http.ResponseWriter, req *http.Request)  {
	userId := req.URL.Query().Get("userId")
	url := "http://" + apiHost + "/api/users/" + userId + "/scalepoints"

	req, err := http.NewRequest("GET", url, nil)
	req.Header.Set("Authorization", token)
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	body, _ := ioutil.ReadAll(resp.Body)
	// send the body and status code
	rw.Header().Set("Content-Type", "application/json")
	rw.WriteHeader(resp.StatusCode)
	fmt.Fprintln(rw, string(body))
}

func badgeList(rw http.ResponseWriter, req *http.Request) {
	userId := req.URL.Query().Get("userId")
	url := "http://" + apiHost + "/api/users/" + userId + "/badges"
	req, err := http.NewRequest("GET", url, nil)
	req.Header.Set("Authorization", token)
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	body, _ := ioutil.ReadAll(resp.Body)
	// send the body and status code
	rw.Header().Set("Content-Type", "application/json")
	rw.WriteHeader(resp.StatusCode)
	fmt.Fprintln(rw, string(body))
}


func gamifyLogin() (token string) {
	credentials := Credentials{ ApplicationName:"sound-redux",Password:"welovemusic" }
	b := new(bytes.Buffer) // encoded json
	json.NewEncoder(b).Encode(credentials)
	res, err := http.Post("http://"+ apiHost +"/api/login", "application/json", b)
	if (err != nil) {
		fmt.Println("An error occured during login", err)
		os.Exit(-1)
	}
	if (res.StatusCode != 200) {
		fmt.Println("Cannot login. Check crendentials")
		os.Exit(-1)
	}
	fmt.Println("Login success!")
	token = res.Header.Get("Authorization")
	token = token[len("Bearer "):]
	return
}

func main() {
	token = gamifyLogin();
	fmt.Println(token)
	r := mux.NewRouter()
	r.Handle("/", http.FileServer(http.Dir("public"))).Methods("GET")
	r.HandleFunc("/api/events", events).Methods("POST")
	r.HandleFunc("/api/status", status).Methods("GET")
	r.HandleFunc("/api/me/badges", badgeList).Methods("GET")
	r.HandleFunc("/api/me/scalepoints", scalePointList).Methods("GET")
	r.HandleFunc("/api/callback", action(authCallback))
	n := negroni.Classic()
	n.UseHandler(r)
	n.Run(":8081")
}
