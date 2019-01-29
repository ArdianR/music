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
    Alert,
    ActivityIndicator
} from 'react-native';

export default class Menu extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            access_token: this.props.navigation.getParam('access_token'),
            height: Dimensions.get('window').width / 3,
            width: Dimensions.get('window').width / 3,
            releases: null,
            categories: null,
            orientation: null,
            featured: null,
            recommendations: null,
            activity: true
        }
    }

    handleOrientation = async() => {
        const dimension = await this.refs.rootView;
        if(dimension) {
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
        if (this.state.orientation !== null) {
            this.handleNewRelease();
        }
    }

    handleNewRelease = async() => {
        const response = await fetch('https://api.spotify.com/v1/browse/new-releases', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.state.access_token}`,
            }
        })
        const json = await response.json();
        this.setState({
            releases: json.albums.items,
        })
        if (this.state.releases !== null) {
            this.handleCategories();
        }

    }

    handleCategories = async() => {
        const response = await fetch('https://api.spotify.com/v1/browse/categories?offset=0&limit=20', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.state.access_token}`,
            }
        })
        const json = await response.json();
        this.setState({
            categories: json.categories.items,
        })
        if (this.state.categories !== null) {
            this.handleFeatured();
        }
    }

    handleFeatured = async() => {
        const response = await fetch('https://api.spotify.com/v1/browse/featured-playlists?offset=0&limit=20', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.state.access_token}`,
            }
        })
        const json = await response.json();
        this.setState({
            featured: json.playlists.items,
        })
        if (this.state.featured !== null) {
            this.handleRecommendations();
        }
    }

    handleRecommendations = async() => {
        const response = await fetch('https://api.spotify.com/v1/recommendations', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.state.access_token}`,
            }
        })
        const json = await response.json();
        this.setState({
            recommendations: json.recommendations.items,
        })
        if (this.state.recommendations !== null) {
            console.log(this.state.recommendations)
            // this.setState({
            //     activity: false,
            // })
        }
    }

    componentDidMount() {

        this.handleOrientation();
        Dimensions.addEventListener( 'change', () => {
            this.handleOrientation();
        });
        
    }

    render() {
        return (
              <View ref = "rootView" style = {{ backgroundColor: ( this.state.orientation == 'portrait' ) ? '#1B5E20' : '#006064' }}>
                <Text>{ this.state.orientation }</Text>
              </View>
        );
    }
}
