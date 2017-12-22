import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Icon from 'react-fontawesome'

/*
|--------------------------------------------------------------------------
| Downloads
|--------------------------------------------------------------------------
*/


export default class Downloads extends Component {
  static propTypes = {
    downloadQueue: PropTypes.array,
  }

  constructor(props) {
    super(props);

    var downloads = [ ...this.props.downloadQueue ]
    
    for (var i = 0; i < downloads.length; i++) {
      downloads[i].progress = 0
      downloads[i].status = 'circle-o'
    }

    this.state = {
      downloads,
    }

    this.getDownloads = this.getDownloads.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    var downloads = [ ...nextProps.downloadQueue ]
    
    for (var i = 0; i < downloads.length; i++) {
      downloads[i].progress = 0
      downloads[i].status = 'circle-o'
    }

    this.setState({
      downloads,
    })
  }

  getDownloads() {
    var downloadItems = []

    for (var i = 0; i < this.state.downloads.length; i++) {
      var download = this.state.downloads[i]
      downloadItems.push(
        <div className='download-item' key={i}>
          <h3><span style={{'font-weight': 'bold'}}>{download.artist}</span> - {download.title}</h3>
          <div className='download-info'>
            <div className='download-progress'>
              <div style={{'width': (download.progress + '%')}}></div>
            </div>
            <div className='download-status'>
              <Icon name={download.status} />
            </div>
          </div>
        </div>
      )
    }

    return downloadItems
  }

  render() {
    return (
      <div className='download-container'>
        <div className='download-header'>
          <span className='download-settings'><i className='fa fa-gear'></i></span>
          <h2>Downloads</h2>
        </div>
        { this.getDownloads() }
      </div>
    );
  }
}
