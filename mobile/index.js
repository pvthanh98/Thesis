/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import app_reducer from './src/reducers/index';
const store = createStore(app_reducer);
const RNRedux = () => (
    <Provider store = { store }>
      <App />
    </Provider>
)
AppRegistry.registerComponent(appName, () => RNRedux);
