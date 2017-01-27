/**
 * react-webnerplan (https://enerplan.ch)
 *
 * Copyright © 2016-2017 Enerplan SA. All rights reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Paul Nta <paul.nta@enerplan.ch>, $(date) $(user)
 */

import * as types from '../constants/ActionTypes';

export function receiveScalePoints(scalepoints) {
  return {
    type: types.RECEIVE_SCALEPOINTS,
    scalepoints,
  };
}

export function receiveBadges(badges) {
  return {
    type: types.RECEIVE_BADGES,
    badges,
  };
}


export function fetchBadges() {
  return (dispatch, getState) => {
    const { authed } = getState()
    const userId = authed.user.id
    return fetch(`/api/me/badges?userId=${userId}`)
      .then(response => response.json())
      .then(json => {
        console.log('fetchBadge', json)
        return json
      })
      .then(json => dispatch(receiveBadges(json)))
  }
}

export function fetchScalePoints() {
  return (dispatch, getState) => {
    const { authed } = getState()
    const userId = authed.user.id
    return fetch(`/api/me/scalepoints?userId=${userId}`)
      .then(response => response.json())
      .then(json => {
        console.log('fetchScalePoints', json)
        return json
      })
      .then(json => dispatch(receiveScalePoints(json)))
  }
}