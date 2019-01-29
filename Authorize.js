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

class Authorize extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: `https://accounts.spotify.com/authorize?client_id=` + client_id + `&response_type=code&show_dialog=true&redirect_uri=` + redirect_uri + `&scope=user-read-private user-read-email&state=34fFs29kd09`,
            code: null,
            auth: base64.encode(client_id+`:`+client_secret),
            access_token: null,
            refresh_token: null,
            display_name: null,
            id: null
        };
    }

    handleSpotifyLogin = async() => {
        await Linking.openURL(this.state.url).then((url) => {
            if (url) {
                Linking.addEventListener('url', this.handleOpenURL);
            }
        }).catch(err => console.log(err));
    };

    handleOpenURL = async(event) => {
        this.setState({code: event.url.replace('music://spotify.development/?code=', '').replace('&state=34fFs29kd09', '')})
        if (event.url.includes('code')) {
            this.handleToken()
        }
    }

    handleToken = async() => {
        const response = await fetch('https://accounts.spotify.com/api/token?', {
            method: 'POST',
            headers: {
                Authorization: `Basic ` + this.state.auth,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `grant_type=authorization_code&code=` + this.state.code + `&redirect_uri=music://spotify.development`
        })
        const json = await response.json();
        this.setState({
            access_token: json.access_token,
            refresh_token: json.refresh_token
        })
        if (json.access_token) {
            this.handleMe()
        }
    }

    handleMe = async() => {
        const response = await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ` + this.state.access_token
            }
        })
        const json = await response.json();
        this.setState({
            display_name: json.display_name,
            id: json.id
        })
        if (json.id) {
            console.warn(this.state.id)
        }
    }

    componentDidMount() {
      this.handleSpotifyLogin()
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

class Token extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.navigation.getParam('url'),
        };
    }

  render() {
    return (
      <View>
        <Text>{this.state.url}</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
      Authorize: Authorize,
      Token: Token,
  },
  {
      initialRouteName: 'Authorize',
  }
)

export default createAppContainer(AppNavigator)