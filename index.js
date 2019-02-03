import {AppRegistry} from 'react-native';

import {
    createAppContainer,
    createStackNavigator
} from 'react-navigation';

import Authorize from './Authorize';
import Menu from './Menu';
import Browse from './Browse';
import Header from './Header';
import Title from './Title';
import Body from './Body';
import Search from './Search';
import Playlist from './Playlist';
import Player from './Player';
import Artist from './Artist';
import Album from './Album';

import {name as appName} from './app.json';


const IndexNavigator = createAppContainer(
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
        },
        Artist: {
            screen: Artist,
        },
        Album: {
            screen: Album,
        }
    }, {
        initialRouteName: 'Authorize',
    })
)

const MenuNavigator = createAppContainer(
    createStackNavigator({
        Menu: {
            screen: Menu,
        },
        Browse: {
            screen: Browse,
        }
    }, {
        initialRouteName: 'Menu',
    })
)

const BrowseNavigator = createAppContainer(
    createStackNavigator({
        Menu: {
            screen: Menu,
        },
        Search: {
            screen: Search
        }
    }, {
        initialRouteName: 'Browse',
    })
)

AppRegistry.registerComponent(appName, () => IndexNavigator);
