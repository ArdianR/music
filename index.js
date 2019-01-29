import {AppRegistry} from 'react-native';

import {
    createAppContainer,
    createStackNavigator
} from 'react-navigation';

import Authorize from './Authorize';
import Menu from './Menu';

import {name as appName} from './app.json';


const AppNavigator = createAppContainer(
    createStackNavigator({
        Authorize: {
            screen: Authorize,
        },
        Menu: {
            screen: Menu,
        }
    }, {
        initialRouteName: 'Authorize',
    })
)

AppRegistry.registerComponent(appName, () => AppNavigator);
