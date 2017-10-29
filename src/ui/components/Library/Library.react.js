import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

import FullViewMessage from '../Shared/FullViewMessage.react';
import TracksList from '../Shared/TracksList.react';

import Header from '../Header/Header.react';

/*
|--------------------------------------------------------------------------
| Global View
|--------------------------------------------------------------------------
*/

export default class Library extends Component {
  static propTypes = {
    library: PropTypes.object,
    tracks: PropTypes.object,
    trackPlayingId: PropTypes.string,
    playlists: PropTypes.array,
    playerStatus: PropTypes.string,
  }

  constructor(props) {
    super(props);
  }

  getLibraryComponent() {
    // Loading library
    if(this.props.tracks.all === null) {
      return (
        <FullViewMessage>
          <p>Loading library...</p>
        </FullViewMessage>
      );
    }

    // Empty library
    if (this.props.tracks.all.length === 0) {
      if(this.props.library.refreshing) {
        return (
          <FullViewMessage>
            <p>Your library is being scanned</p>
            <p className='sub-message'>
                          hold still...
            </p>
          </FullViewMessage>
        );
      }

      return (
        <FullViewMessage>
          <p>There is no music in your library</p>
          <p className='sub-message'>
            <span>nothing found yet, but that's fine, you can always </span>
            <Link to='/settings/library'>add your music here</Link>
          </p>
        </FullViewMessage>
      );
    }

    // Empty search
    if (this.props.tracks.sub.length === 0) {
      return (
        <FullViewMessage>
          <p>Your search returned no results</p>
        </FullViewMessage>
      );
    }

    // All good !
    return (
      <TracksList
        type='library'
        playerStatus={this.props.playerStatus}
        tracks={this.props.tracks.sub}
        trackPlayingId={this.props.trackPlayingId}
        playlists={this.props.playlists}
      />
    );
  }

  render() {
    const store = this.props.store;
    const rawconfig = this.props.rawconfig;
    const app = this.props.app;
    return (
      <div className='library-container'>
        <Header
          app={app}
          playerStatus={store.playerStatus}
          repeat={store.repeat}
          shuffle={store.shuffle}
          queue={store.queue}
          queueCursor={store.queueCursor}
          useNativeFrame={rawconfig.useNativeFrame}
        />
        <div className='view view-library' >
        { this.getLibraryComponent() }
        </div>
      </div>
    );
  }
}
