import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
// import Register from '../../screens/Register/Register';
import Icon from 'react-native-vector-icons/AntDesign';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import Register from '../../screens/Register/Register';
import HomeIcon from 'react-native-vector-icons/Ionicons';
import CartIcon from 'react-native-vector-icons/FontAwesome6';
import Search from 'react-native-vector-icons/Ionicons';
import {Text, View} from 'react-native';
import SearchBooks from '../../screens/SearchBooks/SearchBooks';
import Cart from '../../screens/Cart/Cart';
import {Badge} from 'react-native-paper';
import BookDetails from '../../screens/BookDetails/BookDetails';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FlashSale from '../../screens/FlashSale/FlashSale';
import {CommonActions} from '@react-navigation/native';
import Login from '../../screens/Login/Login';
import {useSelector} from 'react-redux';
import UserIcon from 'react-native-vector-icons/FontAwesome5';
import Profile from '../../screens/Profile/Profile';
import Settings from '../../screens/Settings/Settings';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Home() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="details" component={BookDetails} />
    </Stack.Navigator>
  );
}

const BottomTabs = () => {
  const User = useSelector(state => state.UserDetails.userData);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FB8D09',
        tabBarInactiveTintColor: 'gray',
        // backgroundColor:'black',
        tabBarStyle: {
          backgroundColor: '#2C5DD1',
          paddingTop: 10,
          height: 50,
          // borderColor: '#0D689E',
        }, // Inactive icon color
      }}>
      <Tab.Screen
        name="homeScreen"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <View
              style={{
                backgroundColor: focused ? 'white' : '#2C5DD1',
                width: 40,
                height: 39,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 2.5,
              }}>
              <HomeIcon
                name="home"
                color={focused ? '#2C5DD1' : 'lightgrey'}
                size={20}
              />
            </View>
          ),
          tabBarActiveTintColor: 'white', 
          tabBarInactiveTintColor: 'gray', 
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault(); 
            // navigation.navigate('home'); // Navigate to home screen
            navigation.navigate('homeScreen', {screen: 'home'});
          },
        })}
      />

      <Tab.Screen
        name="search"
        component={SearchBooks}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <View
              style={{
                backgroundColor: focused ? 'white' : '#2C5DD1',
                width: 40,
                height: 39,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 2.5,
              }}>
              <Search
                name="search"
                color={focused ? '#2C5DD1' : 'lightgrey'}
                size={20}
              />
            </View>
          ),
          tabBarActiveTintColor: 'white', 
          tabBarInactiveTintColor: 'gray', 
        }}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('search');
          },
        })}
      />

      <Tab.Screen
        name={Object.keys(User).length > 0 ? 'settings' : 'login'}
        component={Object.keys(User).length > 0 ? Settings : Login}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <View
              style={{
                backgroundColor: focused ? 'white' : '#2C5DD1',
                width: 40,
                height: 39,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 2.5,
              }}>
              {Object.keys(User).length > 0 ? (
                <UserIcon
                  name="user"
                  color={focused ? '#2C5DD1' : 'lightgrey'}
                  size={20}
                />
              ) : (
                <Icon
                  name="login"
                  color={focused ? '#2C5DD1' : 'lightgrey'}
                  size={20}
                />
              )}
            </View>
          ),
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
        }}
        listeners={({navigation}) => ({
          tabPress: () => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {name: Object.keys(User).length > 0 ? 'settings' : 'login'},
                ],
              }),
            );
          },
        })}
      />

      <Tab.Screen
        name="cart"
        component={Cart}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: focused ? 'white' : '#2C5DD1',
                width: 40,
                height: 39,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 2.5,
              }}>
              <CartIcon
                name="cart-shopping"
                color={focused ? '#2C5DD1' : 'lightgrey'}
                size={20}
              />
              <Badge
                style={{
                  position: 'absolute',
                  bottom: 21,
                  left: 21,
                  backgroundColor: focused ? 'red' : 'white',
                  color: focused ? 'white' : '#2C5DD1',
                }}
                size={15}>
                3
              </Badge>
            </View>
          ),
          tabBarActiveTintColor: 'white', // Set label color when active
          tabBarInactiveTintColor: 'gray', // Set label color when inactive
        }}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('cart');
          },
        })}
      />

      {/* Pass Register directly */}
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
};

export default BottomTabs;
