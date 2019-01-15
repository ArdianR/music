import React from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert, TouchableHighlight, Image } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import Spotify from 'rn-spotify-sdk';

class Logo extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    logo: true,
  }

  componentDidMount() {
    setTimeout(() => {
      
      this.setState({
        logo: false,
      })

      const navAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Login'})
        ]
      })
      this.props.navigation.dispatch(navAction)

    }, 5000)
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
        {
          this.state.logo
          ?
          <Image style={{ width: 125, height: 125 }}
            source={require('./assets/icon.png')}
          />
          :
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.welcome}>Logo Done</Text>
          </View>
        }
      </View>
    );
  }
}

class Login extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this.state = {
      spotifyInitialized: false,
    }
    this.spotifyLoginButtonWasPressed = this.spotifyLoginButtonWasPressed.bind(this);
  }

  componentDidMount() {

    if(!Spotify.isInitialized()) {

      var spotifyOptions = {
        "clientID":"a4fd5d5325454189ba2c3dec27f6fa8c",
        "sessionUserDefaultsKey":"SpotifySession",
        "redirectURL":"examplespotifyapp://auth",
        "scopes":["user-read-private", "playlist-read", "playlist-read-private", "streaming"],
      }

      Spotify.initialize(spotifyOptions).then((loggedIn) => {
      
        this.setState({
          spotifyInitialized: true
        })
      
        if(loggedIn)
        {
          this.goToPlayer()
        }
      }).catch((error) => {
        Alert.alert("Error", error.message)
      })
    }
    else {

      this.setState((state) => {
        state.spotifyInitialized = true
        return state
      })

      if(Spotify.isLoggedIn()) {
        this.goToPlayer()
      }
    }
  }

  spotifyLoginButtonWasPressed() {

    Spotify.login().then((loggedIn) => {
      if(loggedIn) {
        this.goToPlayer()
      }
      else {
      }
    }).catch((error) => {
      Alert.alert("Error", error.message);
    })
  }

  goToPlayer() {
    const navAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Menu'})
      ]
    })
    this.props.navigation.dispatch(navAction);
  }

  render() {
    if(!this.state.spotifyInitialized) {
      return (
        <View style={styles.container}>
          <ActivityIndicator animating={true} style={styles.loadIndicator}>
          </ActivityIndicator>
          <Text style={styles.loadMessage}>
            Loading...
          </Text>
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <Text style={styles.greeting}>
            Hey! You! Log into your spotify
          </Text>
          <TouchableHighlight onPress={this.spotifyLoginButtonWasPressed} style={styles.spotifyLoginButton}>
            <Text style={styles.spotifyLoginButtonText}>Log into Spotify</Text>
          </TouchableHighlight>
        </View>
      );
    }
  }
}

class menu extends React.Component {
  static navigationOptions = {
    title: 'Menu',
  }

  constructor(props) {
    super(props)
    this.state = { spotifyUserName: null }
    this.spotifyLogoutButtonWasPressed = this.spotifyLogoutButtonWasPressed.bind(this)
  }

  componentDidMount() {
    Spotify.getMe().then((result) => {
      this.setState({
        spotifyUserName: result.display_name
      })
      return Spotify.playURI("spotify:track:7kQiiHm3jvdz2npYMW7wcE", 0, 0)
    }).then(() => {

    }).catch((error) => {
      Alert.alert("Error", error.message);
    })
  }

  goToInitialScreen() {
    const navAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Login'})
      ]
    });
    this.props.navigation.dispatch(navAction);
  }

  spotifyLogoutButtonWasPressed() {
    Spotify.logout().finally(() => {
      this.goToInitialScreen()
    });
  }

  render() {
    return (
      <View style={styles.container}>
        { this.state.spotifyUserName!=null ? (
          <Text style={styles.greeting}>
            You are logged in as {this.state.spotifyUserName}
          </Text>
        ) : (
          <Text style={styles.greeting}>
            Getting user info...
          </Text>
        )}
        <TouchableHighlight onPress={this.spotifyLogoutButtonWasPressed}>
          <Text>Logout</Text>
        </TouchableHighlight>
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
  Menu: {
    screen: menu,
  },
}, {
    initialRouteName: 'Logo',
})

export default createAppContainer(AppNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  loadIndicator: {
    //
  },
  loadMessage: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

  spotifyLoginButton: {
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: 'green',
    overflow: 'hidden',
    width: 200,
    height: 40,
    margin: 20,
  },
  spotifyLoginButtonText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },

  greeting: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
})