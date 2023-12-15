import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Logo from '../img/logo.svg';

import './css/_Header.css';

@connect(({ posts }) => ({ votes: posts.votes }))
export default class Header extends Component {
  static propTypes = {
    votes: PropTypes.number,
  };

  render() {
    return (
      <div className="header">
        {/* eslint-disable-next-line */}
        <img src={Logo} alt="Canny" className="logo" />
        <div className="spacer" />
        <div>Total Votes: {this.props.votes}</div>
      </div>
    );
  }
}
