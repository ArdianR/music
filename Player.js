import React, {
    Component
} from 'react';
import {
    Text,
    View,
    ImageBackground,
    Image,
    Slider,
    StyleSheet
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class Player extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor() {
        super();
        this.state = {
            SliderValue: 0
        }
    }

    render() {
        return ( 
        	<View style={{flex:1, backgroundColor: 'black'}}>
        		<View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 20}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Ionicons name="ios-arrow-down" size={40} color="white" style={{paddingRight: 20}}/>
                        <Text style={{color: 'white', fontSize: 26, fontWeight: 'bold'}}>Now Playing</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Ionicons name="ios-share" size={30} color="white" style={{paddingRight: 20}}/>
                        <Ionicons name="ios-add" size={45} color="white"/>
                    </View>
                </View>
                <ImageBackground style={{width: 325, height: 325, alignSelf: 'center', margin: 20 }} imageStyle={{borderRadius: 50}} source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}>
                    <Ionicons name="ios-heart-empty" size={30} color="white" style={{margin: 25}}/>
                </ImageBackground>
                <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>...</Text>
                <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>Lirict</Text>
                <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>...</Text>
                <Text style = {{color: 'white', fontSize: 15, fontWeight: 'bold', textAlign: 'center'}}>Slider Value = { this.state.SliderValue }</Text>
                <Slider
                  step={1}
                  minimumValue={0}
                  maximumValue={100}
                  minimumTrackTintColor="white"
                  onValueChange={(ChangedValue) => this.setState({SliderValue: ChangedValue})}
                  style={{width: '80%', alignSelf: 'center'}}
                />
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 20}}>
                    <Ionicons name="ios-menu" size={30} color="white"/>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <AntDesign name="banckward" size={25} color="white" style={{paddingRight: 20}}/>
                        <AntDesign name="play" size={60} color="white"/>
                        <AntDesign name="forward" size={25} color="white" style={{paddingLeft: 20}}/>
                    </View>
                    <AntDesign name="sound" size={25} color="white"/>
                </View>
        	</View>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
});