import React, {
    Component
} from 'react';
import {
    Text,
    View
} from 'react-native';

export default class Playlist extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            access_token: this.props.navigation.getParam('access_token'),
        }
    }

    handleToken = async() => {
        const response = await fetch('https://api.spotify.com/v1/me/player/devices', {
            method: 'GET',
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

    componentDidMount() {
        this.handleAuthorize();
    }

    render() {
        return ( 
        	<View>
        		<Text>{this.state.access_token}</Text>
        	</View>
        );
    }
}