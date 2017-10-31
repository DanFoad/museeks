import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
|--------------------------------------------------------------------------
| EditingInput
|--------------------------------------------------------------------------
*/

export default class EditingInput extends Component {
  static propTypes = {
    track: PropTypes.object,
    field: PropTypes.string,
    initialValue: PropTypes.string,
    metadata: PropTypes.object,
  }

  constructor(props) {
    super(props);
  }

  updateMetadata = (newValue) => {
    if (this.props.field === 'artist') {
      this.props.track.artist[0] = newValue;
      this.props.metadata.artist[0] = newValue;
    } else {
      this.props.track[this.props.field] = newValue;
      this.props.metadata[this.props.field] = newValue;
    }
  }

  _handleKeyPress = (e) => {
    this.updateMetadata(e.target.value);
  }

  render() {
    return <input className='editor-input' type='text' defaultValue={ this.props.initialValue } onKeyUp={this._handleKeyPress} />
  }
}