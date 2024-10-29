import React from 'react';
// import {createStackNavigator} from '@react-navigation/stack'
// import {NavigationContainer} from '@react-navigation/native'
// import {createDrawerNavigator} from '@react-navigation/drawer'
// import HomeScreen from '../screens/Home/HomeScreen';
// import CategoriesScreen from '../screens/Categories/CategoriesScreen';
// import RecipeScreen from '../screens/Recipe/RecipeScreen';
// import RecipesListScreen from '../screens/RecipesList/RecipesListScreen';
// import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';
// import IngredientScreen from '../screens/Ingredient/IngredientScreen';
// import SearchScreen from '../screens/Search/SearchScreen';
// import IngredientsDetailsScreen from '../screens/IngredientsDetails/IngredientsDetailsScreen';
import Home from '../screens/SearchBooks/SearchBooks';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabs from '../components/BottomTabs/BottomTabs';
import Register from '../screens/Register/Register';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FlashSale from '../screens/FlashSale/FlashSale';
import Profile from '../screens/Profile/Profile';
// import {PaperProvider} from 'react-native-paper';

const Stack = createNativeStackNavigator();

function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontWeight: 'bold',
          textAlign: 'center',
          alignSelf: 'center',
          flex: 1,
        },
      }}>
      <Stack.Screen
        name="Home"
        component={BottomTabs} // Pass BottomTabs as the component directly
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="register"
        component={Register}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="flash"
        component={FlashSale}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="profile"
        component={Profile}
        options={{headerShown: false}}
      />

    </Stack.Navigator>
  );
}

//  const Drawer = createDrawerNavigator();

// function DrawerStack() {
//   return(
//     <Drawer.Navigator
//       drawerPosition='left'
//       initialRouteName='Main'
//       drawerStyle={{
//         width: 250
//       }}
//       screenOptions={{headerShown: false}}
//       drawerContent={({navigation})=> <DrawerContainer navigation={navigation}/>}
//     >
//       <Drawer.Screen name='Main' component={MainNavigator} />
//     </Drawer.Navigator>
//   )
// }

export default function AppContainer() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
