/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import AppWrapper from './AppWrapper';
import {name as appName} from './app.json';
import AppRealmWrapper from './AppRealmWrapper';
import AppWrapperServerless from './RealmServerlessfunction';

AppRegistry.registerComponent(appName, () => AppWrapper);
