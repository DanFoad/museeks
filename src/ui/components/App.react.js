import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import KeyBinding from 'react-keybinding-component';

import { connect } from 'react-redux';
import classnames from 'classnames';

import Header from './Header/Header.react';
import WindowControls from './Header/WindowControls.react';
import Footer from './Footer/Footer.react';
import Toasts from './Toasts/Toasts.react';
import Downloads from './Downloads/Downloads.react';
import Sidenav from './Sidenav/Sidenav.react';

import AppActions from '../actions/AppActions';

import app from '../lib/app';


/*
|--------------------------------------------------------------------------
| The App
|--------------------------------------------------------------------------
*/

class Museeks extends Component {
  static propTypes = {
    store: PropTypes.object,
    children: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.onKey = this.onKey.bind(this);
  }

  onKey(e) {
    switch(e.keyCode) {
      case 32:
        e.preventDefault();
        e.stopPropagation();
        AppActions.player.playToggle();
        break;
    }
  }

  getTopHeader() {
    if(this.props.useNativeFrame) return null;

    return (
      <div className='top-header'>
        <WindowControls />
      </div>
    );
  }

  render() {
    const store = this.props.store;
    const trackPlayingId = (store.queue.length > 0 && store.queueCursor !== null) ? store.queue[store.queueCursor]._id : null;

    const config = { ...app.config.getAll() };

    const mainClasses = classnames('main', {
      'native-frame': config.useNativeFrame,
    });

    return (
      <div className={mainClasses}>
        { this.getTopHeader() }
        <div className='body-container'>
          <Sidenav />
          <div className='main-container'>
            <KeyBinding onKey={this.onKey} preventInputConflict />
            <div className='main-content container-fluid'>
              <Row className='content'>
                { React.cloneElement(
                  this.props.children, {
                    app               : this,
                    store             : store,
                    rawconfig         : config,
                    config,
                    inputs            : store.inputs,
                    playerStatus      : store.playerStatus,
                    queue             : store.queue,
                    tracks            : {
                      all: store.tracks[store.tracksCursor].all,
                      sub: store.tracks[store.tracksCursor].sub,
                    },
                    playlists         : store.playlists,
                    library           : store.library,
                    trackPlayingId,
                  })
                }
              </Row>
            </div>
            <Footer
              tracks={store.tracks[store.tracksCursor].sub}
              library={store.library}
            />
            <Toasts toasts={store.toasts} />
          </div>
          <Downloads />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { store: { ...state } };
}

export default connect(mapStateToProps)(Museeks);
