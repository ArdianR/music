import {AppRegistry} from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';

import Authorize from './Authorize';

// import Login from './Login';
import Token from './Token';

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Authorize);
