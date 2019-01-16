import React from 'react';
import {
    Text,
    View,
    Image,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    Dimensions,
    Alert
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
        header: null,
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
            albums: '',
            next: '',
            previous: '',
            items: '',
            orientation: '',
            Columns: 3,
            height: Dimensions.get('window').width / 3,
            width: Dimensions.get('window').width / 3,
        }
    }

    getOrientation = () => {
        if( this.refs.rootView ) {
            if( Dimensions.get('window').width < Dimensions.get('window').height ) {
              this.setState({ orientation: 'portrait' });
              this.setState({ Columns: 3 });
              this.setState({ height: Dimensions.get('window').width / 3 });
              this.setState({ width: Dimensions.get('window').width / 3 });
            } else {
              this.setState({ orientation: 'landscape' });
              this.setState({ Columns: 3 });
              this.setState({ height: Dimensions.get('window').width / 3 });
              this.setState({ width: Dimensions.get('window').width / 3 });
            }
        }
    }

    componentDidMount() {

        this.getOrientation();
        Dimensions.addEventListener( 'change', () => { this.getOrientation(); });

        return fetch('https://api.spotify.com/v1/browse/new-releases', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${this.state.access_token}`,
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    albums: responseJson.albums, 
                    next: responseJson.albums.next,
                    previous: responseJson.albums.previous,
                    items: responseJson.albums.items,
                })
            })
            .catch((error) => {
                console.warn(error);
            });
    }

    render() {
        return (
            <FlatList
                ref = "rootView"
                style = {{ flex: 1 }}
                data={this.state.items}
                renderItem={({item}) => 
                    <View style={{ flexWrap: 'wrap' }}>
                        <TouchableOpacity onPress={() => navigate('Album', {name: 'Jane'})}>
                            <Image style={{ height: this.state.height, width: this.state.width, margin: 0 }} source={{uri: item.images[0].url}}/>
                        </TouchableOpacity>
                    </View>
                }
                numColumns = {this.state.Columns}
                keyExtractor={item => item.items}
            />
        );
    }
}

class Album extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>This is a modal!</Text>
        <Button
          
          title="Dismiss"
        />
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