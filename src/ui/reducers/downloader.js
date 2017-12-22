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

    default: {
      return state;
    }
  }
};
