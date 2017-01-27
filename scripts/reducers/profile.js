/**
 * react-webnerplan (https://enerplan.ch)
 *
 * Copyright © 2016-2017 Enerplan SA. All rights reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Paul Nta <paul.nta@enerplan.ch>, $(date) $(user)
 */

import * as types from '../constants/ActionTypes';

const initialState = {
  badges: [],
  scalepoints: [],
};

export default function player(state = initialState, action) {
  switch (action.type) {
    case types.RECEIVE_BADGES:
      return Object.assign({}, state, {
        badges: action.badges,
      });
    case types.RECEIVE_SCALEPOINTS:
      return Object.assign({}, state, {
        scalepoints: action.scalepoints,
      });
    default:
      return state;
  }
}
