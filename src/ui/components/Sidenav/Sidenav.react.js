import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
|--------------------------------------------------------------------------
| Sidenav
|--------------------------------------------------------------------------
*/


export default class Sidenav extends Component {
  static propTypes = { }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='sidenav'>
        <div className='sidenav-header'>
          <h2>MUSEEKS</h2>
        </div>
      </div>
    );
  }
}
