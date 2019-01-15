import React from 'react';
import {
    Text,
    View,
    Image,
    ImageBackground
} from 'react-native';

import base64 from 'react-native-base64';
import {
    createAppContainer,
    createStackNavigator,
    StackActions,
    NavigationActions
} from 'react-navigation';

class Logo extends React.Component {
    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        var encode = base64.encode('a4fd5d5325454189ba2c3dec27f6fa8c:9c3e9e1ee9394015af9f5db874ccfca2');

        return fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Basic ${encode}`,
                },
                body: 'grant_type=client_credentials',
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.props.navigation.navigate('Login', {
                    access_token: responseJson.access_token
                });
            })
            .catch((error) => {
                console.warn(error);
            });
    }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
          <Image style={{ width: 125, height: 125 }}
            source={require('./assets/icon.png')}
          />
      </View>
    );
  }
}

class Login extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            access_token: this.props.navigation.getParam('access_token'),
            user_object: '',
        }
    }

    componentDidMount() {
        return fetch('https://api.spotify.com/v1/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.state.access_token}`,
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.warn(responseJson);
                // this.setState({
                //     user_object: responseJson, 
                // })
            })
            .catch((error) => {
                console.warn(error);
            });
    }

    render() {
        return ( 
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                    <ImageBackground source={require('./assets/login_background.png')} style={{ flex: 1, justifyContent: 'center', resizeMode: 'cover', width: '100%' }}>
                        <Text>asasa</Text>
                    </ImageBackground>
              </View>
            );
        }
    }

const AppNavigator = createStackNavigator({
    Logo: {
        screen: Logo,
    },
    Login: {
        screen: Login,
    },
}, {
    initialRouteName: 'Logo',
})

export default createAppContainer(AppNavigator)