import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import utils  from '../../utils/utils';


/*
|--------------------------------------------------------------------------
| Header - PlayingBar
|--------------------------------------------------------------------------
*/

export default class TrackCover extends PureComponent {
  static propTypes = {
    artist: PropTypes.string,
    title: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      coverPath: null,
    };

    this.fetchInitialCover = this.fetchInitialCover.bind(this);
  }

  componentDidMount() {
    this.fetchInitialCover();
  }

  async componentWillUpdate(nextProps) {
    if(nextProps.artist !== this.props.artist || nextProps.title !== this.props.title ) {
      const coverPath = await utils.fetchCover(nextProps.artist, nextProps.title);
      this.setState({ coverPath });
    }
  }

  async fetchInitialCover() {
    const coverPath = await utils.fetchCover(this.props.artist, this.props.title);
    this.setState({ coverPath });
  }

  render() {
    if(this.state.coverPath) {
      const coverPath = encodeURI(this.state.coverPath)
        .replace(/'/g, '\\\'')
        .replace(/"/g, '\\"');

      return <div className='cover' ><img src={ coverPath } /></div>;
    }

    return(
      <div></div>
    );
  }
}
