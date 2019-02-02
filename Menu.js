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
    ActivityIndicator,
    StyleSheet,
    ScrollView
} from 'react-native';

import {
    createAppContainer,
    createStackNavigator
} from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Menu extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            access_token: this.props.navigation.getParam('access_token'),
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
            releases: null,
            categories: null,
            orientation: null,
            featured: null,
            recommendations: null,
            activity: true
        }
    }

    handleOrientation = async() => {
        if( Dimensions.get('window').width < Dimensions.get('window').height ) {
            await this.setState({
                orientation: 'portrait',
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width
            });
        } else {
            await this.setState({
                orientation: 'landscape',
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width
            });
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
        await this.setState({
            releases: json.albums.items,
        })
        if (this.state.releases !== null) {
            await this.handleCategories();
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
        await this.setState({
            categories: json.categories.items
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
        await this.setState({
            featured: json.playlists.items,
        })
        if (this.state.featured !== null) {
            this.handleRecommendations();
        }
    }

    handleRecommendations = async() => {
        const response = await fetch('https://api.spotify.com/v1/recommendations?limit=10&market=ES&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry&seed_tracks=0c6xIDDpzE81m2q797ordA', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.state.access_token}`,
            }
        })
        const json = await response.json();
        await this.setState({
            recommendations: json.tracks,
        })
        if (this.state.recommendations !== null) {
            await this.setState({activity:false})
        }
    }

    componentDidMount() {
        this.handleOrientation();
        Dimensions.addEventListener( 'change', () => {
            this.handleOrientation();
        });
    }

    render() {
        if (this.state.activity) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            );
        }

        return (
            <View ref="rootView" style={styles.container}>
                <Browse/>
                <ScrollView>
                <Title nameCategory='New Release'/>
                <FlatList
                    horizontal={true}
                    data={this.state.releases}
                    renderItem={({item}) => 
                        <Body
                            bodyImage={styles.bodyImageLarge}
                            bodyTitle={styles.bodyTitleLarge}
                            imageKey={item.id}
                            imageUrl={item.images[0].url}
                            imageName={item.artists[0].name}
                        />
                    }
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                />
                <Title nameCategory='Categories'/>
                <FlatList
                    horizontal={true}
                    data={this.state.categories}
                    renderItem={({item}) => 
                        <Body
                            bodyImage={styles.bodyImageSmall}
                            bodyTitle={styles.bodyTitleSmall}
                            imageKey={item.id}
                            imageUrl={item.icons[0].url}
                            imageName={item.name.substr(0, 10)}
                        />
                    }
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                />
                <Title nameCategory='Featured'/>
                <FlatList
                    horizontal={true}
                    data={this.state.featured}
                    renderItem={({item}) => 
                        <Body
                            bodyImage={styles.bodyImageSmall}
                            bodyTitle={styles.bodyTitleSmall}
                            imageKey={item.id}
                            imageUrl={item.images[0].url}
                            imageName={item.name.substr(0, 10)}
                        />
                    }
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                />
                <Title nameCategory='Recommendations'/>
                <FlatList
                    horizontal={true}
                    data={this.state.recommendations}
                    renderItem={({item}) => 
                        <Body 
                            bodyImage={styles.bodyImageSmall}
                            bodyTitle={styles.bodyTitleSmall}
                            imageKey={item.id}
                            imageUrl={item.album.images[0].url}
                            imageName={item.name.substr(0, 10)}
                        />
                    }
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    bodyImageLarge: {
        height: 175,
        width: 350,
        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bodyImageSmall: {
        height: 100,
        width: 100,
        marginLeft: 20,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    bodyTitleSmall: {
        fontSize: 16,
        fontWeight: '900',
        color: 'white'
    },
    bodyTitleLarge: {
        textAlign: 'center',
        fontSize: 35,
        fontWeight: '900',
        color: 'white'
    },
    browseContainer: {
        height: 75,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20
    },
    browseLeftText: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'left',
        color: 'white'
    }

})

class Browse extends React.PureComponent {
    render() {
        return (
            <View style={styles.browseContainer}>
                <Text style={styles.browseLeftText}>Browse</Text>
                <View style={{flexDirection: 'row', marginRight: 20}}>
                    <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}} style={{width: 40, height: 40, borderRadius: 25, alignSelf: 'center' }} />
                    <TouchableOpacity style={{ justifyContent: 'center' }}>     
                        <Ionicons name="ios-search" size={40} color="white" style={{width: 35, height: 35, borderRadius: 25, alignSelf: 'center', marginLeft: 15 }}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

class Title extends React.PureComponent {
  render() {
    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', padding: 10, color: 'white'}}>{this.props.nameCategory}</Text>
            <TouchableOpacity>
                <Text style={{fontSize: 18, fontWeight: 'bold', padding: 10, color: 'white'}}>See All</Text>
            </TouchableOpacity>
        </View>
    );
  }
}

class Body extends React.PureComponent {
    render() {
        return (
            <View style={{flexWrap: 'wrap'}} key={this.props.imageKey}>
                <ImageBackground
                    style={this.props.bodyImage}
                    imageStyle={{ borderRadius: 15 }}
                    source={{uri: this.props.imageUrl }}>
                    <Text style={this.props.bodyTitle}>{this.props.imageName}</Text>
                </ImageBackground>
            </View>
        );
    }
}