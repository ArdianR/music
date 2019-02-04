import React, {
    Component
} from 'react';
import {
    Text,
    View,
    Linking
} from 'react-native';

export default class Playlist extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            access_token: this.props.navigation.getParam('access_token'),
            url: `https://api.spotify.com/v1/me/player/devices?access_token=`
        }
    }

    handleGetDevice = async() => {
        // await Linking.openURL(this.state.url+this.state.access_token).then((url) => {
        //     if (url) {
        //         console.warn(url)
        //     }
        // }).catch(err => console.log(err));
    }

    componentDidMount() {
        this.handleGetDevice();
    }

    render() {
        return ( 
        	<View>
        		<Text>{this.state.access_token}</Text>
        	</View>
        );
    }
}