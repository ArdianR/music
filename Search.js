import React, {
    Component
} from 'react';
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';

import Header from './Header';

export default class Search extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            access_token: this.props.navigation.getParam('access_token'),
            categories: null,
            activity: false
        }
    }

    handleCategories = async() => {
        const response = await fetch('https://api.spotify.com/v1/browse/categories?limit=30', {
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
            await this.setState({activity:false})
        }
    }

    componentDidMount() {
        // this.handleCategories();
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
        <FlatList
            ListHeaderComponent={<Header/>}
            data={this.state.categories}
            renderItem={({item}) => 
                <View style={{flex: 1, backgroundColor: 'black', justifyContent: 'space-between', padding: 10}}>
                    <View style={{backgroundColor: 'gray', borderRadius: 10, paddingTop: 15, paddingBottom: 15, justifyContent: 'center'}}>
                        <Text style={{color: "white", fontSize: 18, textAlign: 'center'}}>{item.name.substr(0, 10)}</Text>
                    </View>
                </View>
            }
            numColumns={3}
            keyExtractor={item => item.id}
        />
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