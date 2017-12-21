import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FullViewMessage from '../Shared/FullViewMessage.react';

/*
|--------------------------------------------------------------------------
| Global View
|--------------------------------------------------------------------------
*/

export default class Downloader extends Component {
  static propTypes = {
    inputs: PropTypes.array,
  }

  constructor(props) {
    super(props)

    this.state = {
      inputs: props.inputs,
    }

    this.handleManualSubmit = this.handleManualSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleManualSubmit(event) {
    event.preventDefault()
  }

  handleInputChange(event) {

    var header = event.target.dataset.header
    var key = event.target.parentNode.dataset.key
    var value = event.target.value

    var newInputs = [ ...this.state.inputs ]
    newInputs[key][header] = value

    this.setState({
      inputs: newInputs,
    })
  }

  addRow() {
    var newInputs = [ ...this.state.inputs, {title: '', artist: ''} ]
    this.setState({
      inputs: newInputs,
    })
    this.inputsContainer.scrollTop = this.inputsContainer.scrollHeight
  }

  getInputRows() {
    var rows = [];

    for (var i = 0; i < this.state.inputs.length; i++) {
      rows.push(
        <div className='input-row' data-key={i}>
          <input onChange={this.handleInputChange} data-header='title' type='text' placeholder='Title' value={this.state.inputs[i].title} />
          <input onChange={this.handleInputChange} data-header='artist' type='text' placeholder='Value' value={this.state.inputs[i].artist} />
        </div>
      )
    }

    return rows
  }

  getDownloaderComponent() {

    // Main
    return (
      <div className='downloader-content'>
        <div className='downloader-manualinputs' ref={(container) => {this.inputsContainer = container}}>
          <form onSubmit={this.handleManualSubmit}>
            {this.getInputRows()}
          </form>
          <div className='input-buttons'>
            <button onClick={this.addRow.bind(this)} className='add'><i className='fa fa-plus' /></button>
            <input type='submit' value='Download' />
          </div>
        </div>
        <hr className='separator' />
        <div className='download-filereader'></div>
      </div>
    );
  }

  render() {
    const store = this.props.store;
    const app = this.props.app;

    return (
      <div className='downloader-container'>
        <div className='view view-downloader' >
          <h4>Downloader</h4>
          {this.getDownloaderComponent()}
        </div>
      </div>
    );
  }
}