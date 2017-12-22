import React, { Component } from 'react';
import PropTypes from 'prop-types';
import path from 'path'

import YoutubeMp3Downloader from 'youtube-mp3-downloader';
import Icon from 'react-fontawesome'

import AppActions from '../../actions/AppActions'

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

    var appPath = AppActions.getAppPath()

    var downloads = [ ...this.props.downloadQueue ]
    
    for (var i = 0; i < downloads.length; i++) {
      downloads[i].progress = 0
      downloads[i].status = 'circle-o'
    }

    var YD = new YoutubeMp3Downloader({
      'ffmpegPath': path.join(appPath, 'bin/ffmpeg.exe'),
      'outputPath': path.join(appPath, 'music'),
      'youtubeVideoQuality': 'highest',
      'queueParallelism': 1,
      'progressTimeout': 200,
    })

    this.state = {
      downloads,
      YD,
    }

    this.getDownloads = this.getDownloads.bind(this)
    this.startYTDownloader = this.startYTDownloader.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    var downloads = [ ...nextProps.downloadQueue ]

    if (nextProps.downloadState == 'starting') {
      this.startYTDownloader(downloads[nextProps.downloadCursor], nextProps.downloadCursor)
    }
    
    for (var i = 0; i < downloads.length; i++) {
      if (i == nextProps.downloadCursor) {
        downloads[i].progress = nextProps.downloadProgress
        downloads[i].status = 'arrow-circle-o-down'
      } else if (i < nextProps.downloadCursor) {
        downloads[i].progress = 100
        downloads[i].status = 'check-circle'
      } else {
        downloads[i].progress = 0
        downloads[i].status = 'circle-o'
      }
    }

    this.setState({
      downloads,
    })
  }

  startYTDownloader(download, index) {
    this.state.YD.download(download.id)

    this.state.YD.on('finished', (err, data) => {
      AppActions.completeDownload(index, download.artist, download.title, data)
    })

    this.state.YD.on('error', (error) => {
      console.log(error)
    })

    this.state.YD.on('progress', (progress) => {
      AppActions.downloader.updateProgress(progress.progress.percentage)
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
