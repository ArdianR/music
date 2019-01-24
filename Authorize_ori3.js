import React, { Component } from 'react';
import {   
    StyleSheet,
    WebView,
    Linking,
    View,
    Text
} from 'react-native';
import { createAppContainer, createStackNavigator, NavigationActions } from 'react-navigation';

var client_id = 'a4fd5d5325454189ba2c3dec27f6fa8c';
var client_secret = '9c3e9e1ee9394015af9f5db874ccfca2';
var redirect_uri = 'music://spotify.development';

class Authorize extends Component {
    constructor(props) {
      super(props);
      this.state = {
        url: `https://accounts.spotify.com/authorize?client_id=`+client_id+`&response_type=code&show_dialog=true&redirect_uri=`+redirect_uri+`&scope=user-read-private user-read-email&state=34fFs29kd09`,
      };
    }

  render() {
    return (
      <WebView
        style={{flex:1}}
        source={{uri: this.state.url}}
        onNavigationStateChange={this.onNavigationStateChange}
      />
    );
  }

  onNavigationStateChange = navState => {
    // music://spotify.development/?code=
    // https://accounts.spotify.com/authorize/accept

    console.warn(navState.url.includes('music://spotify.development/?code='))
    if (navState.url.includes('music://spotify.development/?code=')) {
      this.props.navigation.navigate('Token', {
           url: navState.url,
       })
    }
  }
}

class Token extends Component {
    constructor(props) {
      super(props);
      this.state = {
        url: this.props.navigation.getParam('url'),
      };
    }

    // componentDidMount(){

      // console.warn(this.state.url);
      // return fetch(`https://accounts.spotify.com/api/token`, {
      //   method: 'POST',
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     grant_type: 'authorization_code',
      //     code: 'yourOtherValue',
      //   }),
      // })
      //   .then((response) => response.json())
      //   .then((responseJson) => {

      //     this.setState({
      //       isLoading: false,
      //       dataSource: responseJson.movies,
      //     }, function(){

      //     });

      //   })
      //   .catch((error) =>{
      //     console.error(error);
      //   });
    // }

  render() {
    return (
      <View>
        <Text>{this.state.url}</Text>
      </View>
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