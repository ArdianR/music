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

export default class Title extends React.PureComponent {
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