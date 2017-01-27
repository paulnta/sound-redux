import { combineReducers } from 'redux';
import authed from '../reducers/authed';
import entities from '../reducers/entities';
import environment from '../reducers/environment';
import modal from '../reducers/modal';
import navigator from '../reducers/navigator';
import player from '../reducers/player';
import playlists from '../reducers/playlists';
import profile from '../reducers/profile';

const rootReducer = combineReducers({
  authed,
  entities,
  environment,
  modal,
  navigator,
  player,
  profile,
  playlists,
});

export default rootReducer;
