import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from 'react-simple-input';
import KeyBinding from 'react-keybinding-component';

import PlayingBar     from './PlayingBar.react';
import PlayerControls from './PlayerControls.react';
import Cover          from '../Shared/Cover.react';

import AppActions from '../../actions/AppActions';


/*
|--------------------------------------------------------------------------
| Header
|--------------------------------------------------------------------------
*/

export default class Header extends Component {
  static propTypes = {
    playerStatus: PropTypes.string,
    queue: PropTypes.array,
    queueCursor: PropTypes.number,
    shuffle: PropTypes.bool,
    repeat: PropTypes.string,
    useNativeFrame: PropTypes.bool,
  }

  constructor(props) {
    super(props);

    this.onKey = this.onKey.bind(this);
  }

  search(e) {
    AppActions.library.filterSearch(e.target.value);
  }

  getCover() {
    var queue        = this.props.queue;
    var queueCursor  = this.props.queueCursor;
    var trackPlaying = queue[queueCursor];
    
    if (!trackPlaying) {
      return null
    } else {
      console.log(trackPlaying.artist + " " + trackPlaying.title);
      return <Cover artist={trackPlaying.artist.join(', ')} title={trackPlaying.title} />
    }
  }

  onKey(e) {
    switch (e.keyCode) {
      case 70: { // "F"
        if(e.ctrlKey) {
          this.refs.search.refs.input.select();
        }
      }
    }
  }

  render() {
    
    return (
      <header>
        <div className='main-header'>
          { this.getCover() }
          <div className="col-search-controls">
            <h2>My Music <span className='sorting-method'>A-Z by Title</span></h2>
            <Input
              selectOnClick
              placeholder='Enter keywords...'
              className='form-control input-sm search'
              changeTimeout={250}
              clearButton
              ref='search'
              onChange={this.search}
            />
          </div>
          <div className='col-player-infos'>
            <PlayingBar
              queue={this.props.queue}
              queueCursor={this.props.queueCursor}
              shuffle={this.props.shuffle}
              repeat={this.props.repeat}
            />
          </div>
          <div className='col-main-controls'>
            <PlayerControls
              playerStatus={this.props.playerStatus}
            />
          </div>
        </div>
        <KeyBinding onKey={this.onKey} preventInputConflict />
      </header>
    );
  }
}
