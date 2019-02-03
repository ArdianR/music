import React, {
    Component
} from 'react';
import {
    StyleSheet,
    WebView,
    Linking,
    View,
    Text,
    Image,
    ActivityIndicator
} from 'react-native';

import base64 from 'react-native-base64';

var client_id = 'a4fd5d5325454189ba2c3dec27f6fa8c';
var client_secret = '9c3e9e1ee9394015af9f5db874ccfca2';
var redirect_uri = 'music://spotify.development';
var scope = 'user-read-private user-read-email playlist-read-private playlist-modify-private playlist-modify-public playlist-read-collaborative user-modify-playback-state user-read-currently-playing user-read-playback-state user-top-read user-read-recently-played app-remote-control streaming user-read-birthdate user-follow-read user-follow-modify user-library-modify user-library-read';

export default class Authorize extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            url: `https://accounts.spotify.com/authorize?client_id=` + client_id + `&response_type=code&show_dialog=true&redirect_uri=` + redirect_uri + `&scope=`+ scope +`&state=34fFs29kd09`,
            code: null,
            auth: base64.encode(client_id+`:`+client_secret),
            access_token: null,
            refresh_token: null,
            display_name: null,
            id: null,
            logo: true,
            activity: true
        };
    }

    handleAuthorize = async() => {
        await Linking.openURL(this.state.url).then((url) => {
            if (url) {
                Linking.addEventListener('url', this.handleOpenURL);
            }
        }).catch(err => console.log(err));
    };

    handleOpenURL = async(event) => {
        await this.setState({code: event.url.replace('music://spotify.development/?code=', '').replace('&state=34fFs29kd09', '')})
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
        await this.setState({
            access_token: json.access_token,
            refresh_token: json.refresh_token
        })
        console.log(json.access_token)
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
        await this.setState({
            display_name: json.display_name,
            id: json.id
        })
        if (json.id) {
            await this.props.navigation.navigate('Playlist', {
                access_token: this.state.access_token
            });
            await this.setState({logo: false})
        }
    }

    componentDidMount() {
        this.handleAuthorize();
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
            <ActivityIndicator size="large" color="#0000ff"/>
          }
        </View>
      );
    }

}