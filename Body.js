import React, {
    Component
} from 'react';
import {
    Text,
    View,
    Image,
    ImageBackground    
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './Styles';

export default class Body extends React.PureComponent {
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