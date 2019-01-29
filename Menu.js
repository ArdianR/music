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
            // await this.handleCategories();
            await this.setState({activity:false})
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
                            <View style={{height: this.state.height / 13, flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={{fontSize: 18, fontWeight: 'bold', alignSelf: 'center', padding: 10, textAlign: 'left', color: 'white'}}>Browse</Text>
                                <View style={{flexDirection: 'row' }}>
                                    <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}} style={{width: 35, height: 35, borderRadius: 25, alignSelf: 'center', margin: 5 }} />
                                    <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}} style={{width: 35, height: 35, borderRadius: 25, alignSelf: 'center', margin: 5 }} />
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 20, }}>
                                <Text style={{fontSize: 18, fontWeight: 'bold', padding: 10, color: 'black'}}>New Release</Text>
                                <Text style={{fontSize: 18, fontWeight: 'bold', padding: 10, color: 'black'}}>SeeAll</Text>
                            </View>
                            <FlatList
                                horizontal={true}
                                data={this.state.releases}
                                renderItem={({item}) => 
                                    <View style={{flexWrap: 'wrap'}}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Album', { id: '123' }) }>
                                            <Image style={{ height: this.state.height / 4, width: this.state.width / 1.25, borderRadius: 15, margin: 5 }} source={{uri: item.images[0].url}}/>
                                            <Text style={{ textAlign: 'center', marginBottom: 15, marginTop: 5 }}>{item.artists[0].name}</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                                keyExtractor={item => item.id}
                                flashScrollIndicators={false}
                            />
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 20, }}>
                                <Text style={{fontSize: 18, fontWeight: 'bold', padding: 10, color: 'black'}}>New Release</Text>
                                <Text style={{fontSize: 18, fontWeight: 'bold', padding: 10, color: 'black'}}>SeeAll</Text>
                            </View>
                            <FlatList
                                horizontal={true}
                                data={this.state.releases}
                                renderItem={({item}) => 
                                    <View style={{flexWrap: 'wrap'}}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Album', { id: '123' }) }>
                                            <Image style={{ height: this.state.height / 5, width: this.state.height / 5, borderRadius: 15, margin: 5 }} source={{uri: item.images[0].url}}/>
                                            <Text style={{ textAlign: 'center', marginBottom: 15, marginTop: 5 }}>{item.artists[0].name}</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                                keyExtractor={item => item.id}
                                flashScrollIndicators={false}
                            />
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 20, }}>
                                <Text style={{fontSize: 18, fontWeight: 'bold', padding: 10, color: 'black'}}>New Release</Text>
                                <Text style={{fontSize: 18, fontWeight: 'bold', padding: 10, color: 'black'}}>SeeAll</Text>
                            </View>
                            <FlatList
                                horizontal={true}
                                data={this.state.releases}
                                renderItem={({item}) => 
                                    <View style={{flexWrap: 'wrap'}}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Album', { id: '123' }) }>
                                            <Image style={{ height: this.state.height / 5, width: this.state.height / 5, borderRadius: 15, margin: 5 }} source={{uri: item.images[0].url}}/>
                                            <Text style={{ textAlign: 'center', marginBottom: 15, marginTop: 5 }}>{item.artists[0].name}</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                                keyExtractor={item => item.id}
                                flashScrollIndicators={false}
                            />
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 20, }}>
                                <Text style={{fontSize: 18, fontWeight: 'bold', padding: 10, color: 'black'}}>New Release</Text>
                                <Text style={{fontSize: 18, fontWeight: 'bold', padding: 10, color: 'black'}}>SeeAll</Text>
                            </View>
                            <FlatList
                                horizontal={true}
                                data={this.state.releases}
                                renderItem={({item}) => 
                                    <View style={{flexWrap: 'wrap'}}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Album', { id: '123' }) }>
                                            <Image style={{ height: this.state.height / 5, width: this.state.height / 5, borderRadius: 15, margin: 5 }} source={{uri: item.images[0].url}}/>
                                            <Text style={{ textAlign: 'center', marginBottom: 15, marginTop: 5 }}>{item.artists[0].name}</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                                keyExtractor={item => item.id}
                                flashScrollIndicators={false}
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
  }
})
