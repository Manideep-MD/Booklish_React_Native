/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppContainer from './src/navigations/appNavigations';
import Toast from 'react-native-toast-message';
import { PaperProvider } from 'react-native-paper';
import './reanimatedConfig';
import { Provider } from 'react-redux';
import store from './src/Redux/Store/Store';



const Stack = createNativeStackNavigator();

function App() {
  return (
     <>
     <PaperProvider>
      <Provider store={store}>
      <AppContainer />
      </Provider>
      </PaperProvider>
      <Toast />
     </>
  );
}

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
