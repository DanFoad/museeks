import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
|--------------------------------------------------------------------------
| Downloads
|--------------------------------------------------------------------------
*/


export default class Downloads extends Component {
  static propTypes = { }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='download-container'>
        <div className='download-header'>
          <span className='download-settings'><i className='fa fa-gear'></i></span>
          <h2>Downloads</h2>
        </div>
      </div>
    );
  }
}
