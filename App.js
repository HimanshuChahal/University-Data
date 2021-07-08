import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UniversityListScreen from './src/screens/UniversityListScreen';
import colors from './assets/colors.json';
import { Provider } from './src/context/UniversityDataContext';
import UniversityDetailScreen from './src/screens/UniversityDetailScreen';

const Stack = createStackNavigator();

const App = () => {

  return (
  <NavigationContainer>

    <Stack.Navigator>

      <Stack.Screen name = 'UniversityList' component = { UniversityListScreen }
      options = {{ title: 'Home', headerStyle: { backgroundColor: colors.red }, headerTintColor: 'white' }}/>

      <Stack.Screen name = 'UniversityDetail' component = { UniversityDetailScreen }
      options = {{ title: 'Details', headerStyle: { backgroundColor: colors.red }, headerTintColor: 'white' }}/>

    </Stack.Navigator>

  </NavigationContainer>);
}

export default () => {

  return (
    <Provider>

      <App/>

    </Provider>
  );

}
