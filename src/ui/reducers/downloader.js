import AppConstants from '../constants/AppConstants';

export default (state = {}, payload) => {
  switch (payload.type) {
    case(AppConstants.APP_DOWNLOADER_ADD): {
      var insert = {
        id: payload.id,
        title: payload.title,
        artist: payload.artist,
      }
      return {
        ...state,
        downloadQueue: [ ...state.downloadQueue, insert ]
      }
    }

    case (AppConstants.APP_DOWNLOADER_SET_INPUTS): {
      return {
        ...state,
        inputs: payload.inputs,
      }
    }

    case (AppConstants.APP_DOWNLOADER_START): {
      return {
        ...state,
        downloadCursor: payload.downloadCursor,
        downloadState: payload.downloadState,
      }
    }

    case (AppConstants.APP_DOWNLOADER_UPDATE_PROGRESS): {
      return {
        ...state,
        downloadProgress: payload.downloadProgress,
        downloadState: payload.downloadState,
      }
    }

    case (AppConstants.APP_DOWNLOADER_COMPLETE): {
      return {
        ...state,
        downloadProgress: payload.downloadProgress,
        downloadState: payload.downloadState,
        downloadCursor: payload.downloadCursor,
        downloadQueue: payload.downloadQueue,
      }
    }

    default: {
      return state;
    }
  }
};
