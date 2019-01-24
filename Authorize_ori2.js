import React, { Component } from 'react';
import {   
    StyleSheet,
    WebView,
    Linking
} from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';

class Authorize extends Component {
    constructor(props) {
      super(props);
      this.state = {
        url: 'https://accounts.spotify.com/authorize?client_id=a4fd5d5325454189ba2c3dec27f6fa8c&response_type=code&show_dialog=true&redirect_uri=music://spotify.development&scope=user-read-private&state=34fFs29kd09'
      };
    }

  render() {
    return (
      <WebView
        ref={(ref) => { this.webview = ref; }}
        style={{flex:1}}
        source={{uri: this.state.url}}
        onNavigationStateChange={(event) => {
          if (event.url !== this.state.url) {
            this.webview.stopLoading();
            Linking.openURL(event.url);
          }
        }}
      />
    );
  }

  onNavigationStateChange = navState => {
    console.warn(navState.url)

   // this.props.navigation.navigate('Token', {
   //     url: navState.url
   // });

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
      <WebView
        style={{flex:1}}
        source={{
          uri: this.state.url
        }}
      />
    );
  }
}

const AppNavigator = createStackNavigator({
    Authorize: {
        screen: Authorize,
    },
    Token: {
        screen: Token,
    }
}, {
    initialRouteName: 'Authorize',
})

export default createAppContainer(AppNavigator)