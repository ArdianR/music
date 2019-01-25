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
            code: '',
            auth: base64.encode(client_id+`:`+client_secret),
        };
    }

    componentDidMount() {
      Linking.openURL(this.state.url).catch(err => console.warn(err));
      Linking.addEventListener('url', ({url}) => this.setState({code: url.replace('music://spotify.development/?code=', '')}) );
    }

    componentDidUpdate() {
      return fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          Authorization: `Basic `+ this.state.auth,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=authorization_code&code=`+this.state.code.replace('&state=34fFs29kd09', '')+'&redirect_url=music://spotify.development'
      }).then((response) => response.json()).then((responseJson) => {
        console.warn(responseJson)
      }).catch((error) => {
        console.error(error);
      });
    }


          // grant_type:`authorization_code`,
          // redirect_url:`music://spotify.development`,
          // code: this.state.code.replace('&state=34fFs29kd09', '')

  render() {
    return (
      <View>
        <Text>{this.state.code}</Text>
      </View>
    );
  }

      // <WebView
      //   style={{flex:1}}
      //   source={{uri: this.state.url}}
      //   onNavigationStateChange={this.onNavigationStateChange}
      // />

// componentDidMount() {
//   Linking.getInitialURL().then((url) => {
//     if (url) {
//       console.log('Initial url is: ' + url);
//     }
//   }).catch(err => console.error('An error occurred', err));
// }

// componentDidMount() {
//   Linking.addEventListener('url', this._handleOpenURL);
// },
// componentWillUnmount() {
//   Linking.removeEventListener('url', this._handleOpenURL);
// }
// _handleOpenURL(event) {
//   console.warn(event.url);
// }

    onNavigationStateChange = navState => {
      if (navState.url.includes('music://spotify.development/?code=')) {
          this.setState({code: navState})
          console.warn(this.state.code)
      }
    }

    Token() {
      console.warn(this.state.code)
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