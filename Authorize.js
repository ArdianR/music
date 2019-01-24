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

var client_id = 'a4fd5d5325454189ba2c3dec27f6fa8c';
var client_secret = '9c3e9e1ee9394015af9f5db874ccfca2';
var redirect_uri = 'music://spotify.development';

class Authorize extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: `https://accounts.spotify.com/authorize?client_id=` + client_id + `&response_type=code&show_dialog=true&redirect_uri=` + redirect_uri + `&scope=user-read-private user-read-email&state=34fFs29kd09`,
            code: '',
        };
    }

  render() {
    return (
      <View style={{flex:1, justifyContent: 'center'}}>
        {
          this.state.code === '' ? 
          <WebView
            style={{flex:1}}
            source={{uri: this.state.url}}
            onNavigationStateChange={this.onNavigationStateChange}
          />
          : 
          <Text style={{textAlign: 'center'}}>{this.state.code}</Text> 
        }
        <Text style={{textAlign: 'center'}}>{this.state.code}</Text> 
      </View>
    );
  }

    onNavigationStateChange = navState => {
        console.warn(navState.url.includes('music://spotify.development/?code='))
        if (navState.url.includes('music://spotify.development/?code=')) {
            this.setState({url: navState.url})
            // this.props.navigation.navigate('Token', {
            //     url: navState.url,
            // })
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