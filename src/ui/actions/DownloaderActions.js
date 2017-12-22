import store from '../store.js';
import AppConstants  from '../constants/AppConstants';

const add = (id, title, artist) => {
  store.dispatch({
      type: AppConstants.APP_DOWNLOADER_ADD,
      id,
      title,
      artist,
  })
};


export default {
  add,
};
