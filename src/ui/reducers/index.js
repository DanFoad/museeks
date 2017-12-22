import app from './app';
import library from './library';
import toasts from './toasts';
import player from './player';
import playlists from './playlists';
import queue from './queue';
import downloader from './downloader';

const reducers = [
  app,
  library,
  toasts,
  player,
  playlists,
  queue,
  downloader,
];

export default (state, action) => {
  return reducers.reduce((currentState, reducer) => {
    return reducer(currentState, action);
  }, state);
};
