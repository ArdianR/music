import React, {
    Component
} from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity    
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Header extends React.PureComponent {
    render() {
        return(
            <View style={{flex:1, backgroundColor: 'black', padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Ionicons name="ios-search" size={40} color="white"/>
                <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => this.props.navigation.navigate('Browse')}>
                    <Text style={{color: "white", fontSize: 22}}>Close</Text>
                </TouchableOpacity>
            </View>    
        );
    }
}