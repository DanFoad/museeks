import store from '../store.js';
import AppConstants  from '../constants/AppConstants';

const add = (id, title, artist) => {
  if (store.getState().downloadState == 'idle') {
    startDownload(0)
  }

  store.dispatch({
      type: AppConstants.APP_DOWNLOADER_ADD,
      id,
      title,
      artist,
  })
};

const setInputs = (inputs) => {
  store.dispatch({
    type: AppConstants.APP_DOWNLOADER_SET_INPUTS,
    inputs,
  })
}

const startDownload = (index) => {
  store.dispatch({
    type: AppConstants.APP_DOWNLOADER_START,
    downloadState: 'starting',
    downloadCursor: index,
  })
}

const updateProgress = (progress) => {
  store.dispatch({
    type: AppConstants.APP_DOWNLOADER_UPDATE_PROGRESS,
    downloadState: 'downloading',
    downloadProgress: progress,
  })
}


export default {
  add,
  setInputs,
  startDownload,
  updateProgress,
};
