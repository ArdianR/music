import React, {
    Component
} from 'react';
import {
    StyleSheet,
    WebView,
    Linking,
    View,
    Text
} from 'react-native';
import {
    createAppContainer,
    createStackNavigator
} from 'react-navigation';

import base64 from 'react-native-base64';

var client_id = 'a4fd5d5325454189ba2c3dec27f6fa8c';
var client_secret = '9c3e9e1ee9394015af9f5db874ccfca2';
var redirect_uri = 'music://spotify.development';

export default class Authorize extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: `https://accounts.spotify.com/authorize?client_id=` + client_id + `&response_type=code&show_dialog=true&redirect_uri=` + redirect_uri + `&scope=user-read-private user-read-email&state=34fFs29kd09`,
            auth: base64.encode(client_id+`:`+client_secret),
        };
    }

    componentDidMount() {
      Linking.openURL(this.state.url).catch(err => console.log(err));
      Linking.addEventListener('url', ({url}) => this.setState({code: url.replace('music://spotify.development/?code=', '').replace('&state=34fFs29kd09', '')}) );
      console.warn('1')
    }

    componentWillMount() {
      return fetch('https://accounts.spotify.com/api/token?', {
        method: 'POST',
        headers: {
          Authorization: `Basic `+ this.state.auth,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=authorization_code&code=`+this.state.code+`&redirect_uri=music://spotify.development`
      }).then((response) => response.json()).then((responseJson) => {
        this.setState({
            access_token: responseJson.access_token,
            refresh_token: responseJson.refresh_token
        })
        console.warn('2')
      }).catch((error) => {
        console.log(error);
      });
  }

  componentWillUpdate() {
      return fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer `+ this.state.access_token
        }
      }).then((response) => response.json()).then((responseJson) => {
        this.setState({
            display_name: responseJson.display_name,
            id: responseJson.id
        })
        console.warn('3')
      }).catch((error) => {
        console.log(error);
      });
    }

  render() {
    return (
      <View>
        <Text>code = {this.state.code}</Text>
        <Text>access_token = {this.state.access_token}</Text>
        <Text>refresh_token = {this.state.refresh_token}</Text>
        <Text>display_name = {this.state.display_name}</Text>
        <Text>id = {this.state.id}</Text>
      </View>
    );
  }

}