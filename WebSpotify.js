import React, { Component } from 'react';
import { WebView } from 'react-native';

export default class WebSpotify extends Component {
  render() {
    return (
      <WebView
        source={{uri: 'https://accounts.spotify.com/authorize?client_id=a4fd5d5325454189ba2c3dec27f6fa8c&response_type=code&redirect_uri=https:%2F%2Fopen.spotify.com&scope=user-read-private%20user-read-email'}}
        style={{marginTop: 20}}
      />
    );
  }
}