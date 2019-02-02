import {AppRegistry} from 'react-native';

import {
    createAppContainer,
    createStackNavigator
} from 'react-navigation';

import Authorize from './Authorize';
import Menu from './Menu';
import Search from './Search';
import Playlist from './Playlist';
import Player from './Player';

import {name as appName} from './app.json';


const AppNavigator = createAppContainer(
    createStackNavigator({
        Authorize: {
            screen: Authorize,
        },
        Menu: {
            screen: Menu,
        },
        Search: {
            screen: Search,
        },
        Playlist: {
            screen: Playlist,
        },
        Player: {
            screen: Player,
        }
    }, {
        initialRouteName: 'Authorize',
    })
)

AppRegistry.registerComponent(appName, () => AppNavigator);
