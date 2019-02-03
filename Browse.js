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
import styles from './Styles';

export default class Browse extends React.PureComponent {
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
