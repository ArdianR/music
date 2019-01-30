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
    ActivityIndicator,
    StyleSheet,
    ScrollView
} from 'react-native';

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
        const dimension = await this.refs.rootView;
        if(dimension) {
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
            categories: json.categories.items,
        })
        if (this.state.categories !== null) {
            // this.handleFeatured();
            console.log(json)
            await this.setState({activity:false})
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
            await this.setState({
                activity: false,
            })
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
            <View ref="rootView" style={[styles.container, styles.horizontal]}>
                {
                    this.state.activity
                    ?
                        <ActivityIndicator size="large" color="#0000ff"/>
                    :
                        <ScrollView>
                            <View style={{height: this.state.height / 13, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20}}>
                                <Text style={{fontSize: 20, fontWeight: 'bold', alignSelf: 'center', textAlign: 'left', color: 'white'}}>Browse</Text>
                                <View style={{flexDirection: 'row', marginRight: 20}}>
                                    <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}} style={{width: 40, height: 40, borderRadius: 25, alignSelf: 'center' }} />
                                    <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}} style={{width: 35, height: 35, borderRadius: 25, alignSelf: 'center', marginLeft: 15 }} />
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                                <Text style={{fontSize: 18, fontWeight: 'bold', padding: 10, color: 'white'}}>New Release</Text>
                                <TouchableOpacity>
                                    <Text style={{fontSize: 18, fontWeight: 'bold', padding: 10, color: 'white'}}>See All</Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                horizontal={true}
                                data={this.state.releases}
                                renderItem={({item}) => 
                                    <View style={{flexWrap: 'wrap'}}>
                                        <TouchableOpacity>
                                            <ImageBackground style={{ height: this.state.height / 3.5, width: this.state.width / 1.25, marginLeft: 20, alignItems: 'center', justifyContent: 'center'}} imageStyle={{ borderRadius: 15 }} source={{uri: item.images[0].url}}>
                                                <Text style={{ textAlign: 'center', fontSize: 35, fontWeight: '900', color: 'white'}}>{item.artists[0].name}</Text>
                                            </ImageBackground>
                                        </TouchableOpacity>
                                    </View>
                                }
                                keyExtractor={item => item.id}
                                showsHorizontalScrollIndicator={false}
                            />
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10, paddingTop: 25}}>
                                <Text style={{fontSize: 18, fontWeight: 'bold', padding: 10, color: 'white'}}>Categories</Text>
                                <TouchableOpacity>
                                    <Text style={{fontSize: 18, fontWeight: 'bold', padding: 10, color: 'white'}}>See All</Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                horizontal={true}
                                data={this.state.categories}
                                renderItem={({item}) => 
                                    <View style={{flexWrap: 'wrap'}}>
                                        <TouchableOpacity>
                                            <Image style={{ height: 100, width: 100, marginLeft: 20, alignItems: 'center', justifyContent: 'center'}} source={{uri: item.icons[0].url}}/>
                                            <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '900', color: 'white'}}>{item.name}</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                                keyExtractor={item => item.id}
                                showsHorizontalScrollIndicator={false}
                            />
                        </ScrollView>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black'
  }
})
