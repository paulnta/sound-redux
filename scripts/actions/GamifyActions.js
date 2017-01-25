/**
 * react-webnerplan (https://enerplan.ch)
 *
 * Copyright © 2016-2017 Enerplan SA. All rights reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Paul Nta <paul.nta@enerplan.ch>, $(date) $(user)
 */

export const EventTypes = {
  START_PLAY_SONG: 'START_PLAY_SONG',
  START_FOLLOW_USER: 'START_FOLLOW_USER'
}

export function postEvent(type, payload) {
  return (_, getState) => {
    const { authed } = getState()
    const user = authed.user.id
    const body = { user, type, payload }
    console.log(type, body)
    fetch('/api/events', {
      method: 'post',
      body: JSON.stringify(body),
    })
      .then(response => {
        if (response.ok) { console.log('event posted') }
        else {
          console.log('couldn\'t post event')
        }
      })
  }
}