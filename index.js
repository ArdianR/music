import {AppRegistry} from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';

import Login from './Login';

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Login);
