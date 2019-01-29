import React, {
    Component
} from 'react';
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

export default class Menu extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            access_token: this.props.navigation.getParam('access_token'),
            releases: '',
            categories: '',
            orientation: '',
            height: Dimensions.get('window').width / 3,
            width: Dimensions.get('window').width / 3,
        }
    }

    getOrientation = () => {
        if( this.refs.rootView ) {
            if( Dimensions.get('window').width < Dimensions.get('window').height ) {
              this.setState({ orientation: 'portrait' });
              this.setState({ height: Dimensions.get('window').width / 3 });
              this.setState({ width: Dimensions.get('window').width / 3 });
            } else {
              this.setState({ orientation: 'landscape' });
              this.setState({ height: Dimensions.get('window').width / 3 });
              this.setState({ width: Dimensions.get('window').width / 3 });
            }
        }
    }

    handleAlbums = async() => {
        return fetch('https://api.spotify.com/v1/browse/new-releases', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${this.state.access_token}`,
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    releases: responseJson.albums.items,
                })
            })
            .catch((error) => {
                console.warn(error);
            });
    }

    render() {
        return (
            <View>
                <Text>Hello world!</Text>
            </View>
        );
    }
}