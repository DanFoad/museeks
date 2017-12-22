import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppActions from '../../actions/AppActions';

import axios from 'axios'

/*
|--------------------------------------------------------------------------
| YoutubeSearcher
|--------------------------------------------------------------------------
*/

const key =	'AIzaSyCShIqEyNE1hlw4Sda3kq8JRQWsg6qwUPc'


export default class YoutubeSearcher extends Component {
  static propTypes = {
    callback: PropTypes.func,
    inputs: PropTypes.array,
  }

  constructor(props) {
    super(props);

    this.state = {
      inputs: props.inputs,
      currentIndex: 0,
      youtubeResults: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      inputs: nextProps.inputs,
    })
  }

  async searchYoutube(uri) {
    return new Promise((resolve, reject) => {
      axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=' + uri + '&key=' + key)
        .then((response) => {
          if (response.data.items.length == 0) {
            this.setState({
              youtubeResults: {id: -1, title: 'No Videos Found', img: ''}
            })
            resolve(-1)
            return
          }

          var results = []
          var ids = ''
          var min = Math.min(response.data.items.length, 5)

          for (var i = 0; i < min; i++) {
            var res = response.data.items[i]
            var id = res.id.videoId
            var title = res.snippet.title
            var img = 'https://i.ytimg.com/vi/' + res.id.videoId + '/0.jpg'
            results.push({
              id, title, img
            })
            ids += id
            if (i < min - 1) ids += ','
          }

          var uri = 'https://www.googleapis.com/youtube/v3/videos?id=' + ids + '&part=contentDetails&key=' + key
          axios.get(uri)
            .then((contentResponse) => {
              for (var i = 0; i < min; i++) {
                
                var duration = contentResponse.data.items[i].contentDetails.duration
                results[i].duration = duration
              }

              this.setState({
                youtubeResults: results
              })
    
              resolve(id)
            })
            .catch((error) => {
              reject(error);
            })
        })
        .catch((error) => {
          reject(error);
        })
    })
  }

  getDurationValue(duration) {
    var regex = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/
    var output = ''

    if (regex.test(duration)) {
      var matches = regex.exec(duration)
      if (matches[1]) output += (Number(matches[1]) < 10 ? '0' + Number(matches[1]) : Number(matches[1])) + ':'

      if (matches[2]) output += (Number(matches[2]) < 10 ? '0' + Number(matches[2]) : Number(matches[2])) + ':'
      else output += '00:'

      if (matches[3]) output += (Number(matches[3]) < 10 ? '0' + Number(matches[3]) : Number(matches[3]))
      else output += '00'
    }

    return output
  }

  selectYoutubeVideo(index, title, artist) {
    var selectedVideo = { ...this.state.youtubeResults[index] }
    AppActions.downloader.add(selectedVideo.id, title, artist)
    this.setState({
      currentIndex: this.state.currentIndex + 1,
      youtubeResults: []
    })
  }

  searchForCurrentInput() {
    if (this.state.currentIndex == this.state.inputs.length) {
      this.props.callback()
      return(
        <div className='youtube-message'>Done</div>
      )
    }
    var currentInput = { ...this.state.inputs[this.state.currentIndex] }
    var title = currentInput.title.replace(/[^a-z0-9 ]/gi, '')
    title = title.replace(/\s/g, '+')
    var artist = currentInput.artist.replace(/[^a-z0-9 ]/gi, '')
    artist = artist.replace(/\s/g, '+')
    var uri = artist + '+' + title

    var result = [];
    if (this.state.youtubeResults.length == 0) {
      result = <div className='youtube-message'>loading...</div>
      this.searchYoutube(uri)
    } else {
      for (var i = 0; i < 5; i++) {
        var youtubeResult = { ...this.state.youtubeResults[i] }
        result.push(
          <div onClick={this.selectYoutubeVideo.bind(this, i, currentInput.title, currentInput.artist)} className='youtube-result' key={i}>
            <div className='youtube-result-inner'>
              <img src={youtubeResult.img} />
              <span>{this.getDurationValue(youtubeResult.duration)}</span>
            </div>
            <h3>{youtubeResult.title}</h3>
          </div>
        )
      }
    }

    return (
      <div className='youtube-searcher'>
        <h2>Searching for '{currentInput.title}' by {currentInput.artist}</h2>
        <div className='youtube-results'>
          { result }
        </div>
      </div>
    )
  }

  render() {
    return this.searchForCurrentInput()
  }
}
