import React, {
    Component
} from 'react';
import {
    Text,
    View
} from 'react-native';

export default class Album extends Component {
    constructor(props) {
        super(props);
        this.state = {
            access_token: this.props.navigation.getParam('access_token'),
        }
    }
    render() {
        return ( 
        	<View>
        		<Text> Hello world! </Text>
        	</View>
        );
    }
}