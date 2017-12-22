import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios'

/*
|--------------------------------------------------------------------------
| YoutubeSearcher
|--------------------------------------------------------------------------
*/

const key =	'AIzaSyCShIqEyNE1hlw4Sda3kq8JRQWsg6qwUPc'


export default class YoutubeSearcher extends Component {
  static propTypes = {}

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
      axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + uri + '&key=' + key)
        .then((response) => {
          var results = []
          var ids = ''

          for (var i = 0; i < 5; i++) {
            var res = response.data.items[i]
            var id = res.id.videoId
            var title = res.snippet.title
            var img = 'https://i.ytimg.com/vi/' + res.id.videoId + '/0.jpg'
            results.push({
              title, img
            })
            ids += id
            if (i < 4) ids += ','
          }

          var uri = 'https://www.googleapis.com/youtube/v3/videos?id=' + ids + '&part=contentDetails&key=' + key
          axios.get(uri)
            .then((contentResponse) => {
              for (var i = 0; i < 5; i++) {
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

  selectYoutubeVideo(index) {
    var selectedVideo = { ...this.state.youtubeResults[index] }
  }

  searchForCurrentInput() {
    var currentInput = { ...this.state.inputs[this.state.currentIndex] }
    var title = currentInput.title.replace(/[^a-z0-9 ]/gi, '')
    title = title.replace(/\s/g, '+')
    var artist = currentInput.artist.replace(/[^a-z0-9 ]/gi, '')
    artist = artist.replace(/\s/g, '+')
    var uri = artist + '+' + title

    var result = [];
    if (this.state.youtubeResults.length == 0) {
      result = <div className='youtube-result'><p>loading...</p></div>
      this.searchYoutube(uri)
    } else {
      for (var i = 0; i < 5; i++) {
        var youtubeResult = { ...this.state.youtubeResults[i] }
        result.push(
          <div onClick={this.selectYoutubeVideo.bind(this, i)} className='youtube-result' key={i}>
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
