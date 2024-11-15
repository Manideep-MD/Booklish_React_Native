import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import styles from './Settings.styles';
import {Avatar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import EditIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ForwardIcon from 'react-native-vector-icons/Ionicons';
import UserIcon from 'react-native-vector-icons/AntDesign';
import LockIcon from 'react-native-vector-icons/MaterialIcons';
import ShieldIcon from 'react-native-vector-icons/Octicons';
import LogoutIcon from 'react-native-vector-icons/AntDesign';
import ToggleIcon from 'react-native-vector-icons/Fontisto';
import SupportIcon from 'react-native-vector-icons/MaterialIcons';
import AboutIcon from 'react-native-vector-icons/AntDesign';
import {CLEAR_USER_DATA} from '../../Redux/UserDetails';
import Toast from 'react-native-simple-toast';
import {useNavigation} from '@react-navigation/native';

const settingsList = [
  {
    id: 1,
    icon: <UserIcon name="user" color="black" size={23} />,
    title: 'My Account',
    description: 'Make changes to your account',
    icon2: (
      <ForwardIcon name="chevron-forward-outline" color="black" size={20} />
    ),
    path: 'account',
  },
  {
    id: 2,
    icon: <UserIcon name="user" color="black" size={23} />,
    title: 'Saved Beneficiary',
    description: 'Manage your saved account',
    icon2: (
      <ForwardIcon name="chevron-forward-outline" color="black" size={20} />
    ),
    path: 'savedAccount',
  },
  {
    id: 3,
    icon: <LockIcon name="lock-outline" color="black" size={23} />,
    title: 'Face Id / Touch Id',
    description: 'Manage your device security',
    icon2: <ToggleIcon name="toggle-on" color="lightgrey" size={33} />,
    path: 'accountSecurity',
  },
  {
    id: 4,
    icon: <ShieldIcon name="shield-check" color="black" size={23} />,
    title: 'Two-Factor Authentication',
    description: 'Further secure your account for safety',
    icon2: (
      <ForwardIcon name="chevron-forward-outline" color="black" size={20} />
    ),
    path: 'accountSafety',
  },
  {
    id: 5,
    icon: <LogoutIcon name="logout" color="black" size={23} />,
    title: 'Logout',
    description: 'Further secure your account for safety',
    icon2: (
      <ForwardIcon name="chevron-forward-outline" color="black" size={20} />
    ),
  },
];

const More = [
  {
    id: 1,
    icon: <SupportIcon name="support-agent" color="black" size={23} />,
    title: 'Help & Support',
    icon2: (
      <ForwardIcon name="chevron-forward-outline" color="black" size={20} />
    ),
    path: 'account',
  },
  {
    id: 2,
    icon: <AboutIcon name="infocirlceo" color="black" size={23} />,
    title: 'About App',
    icon2: (
      <ForwardIcon name="chevron-forward-outline" color="black" size={20} />
    ),
    path: 'savedAccount',
  },
];

const Settings = () => {
  const User = useSelector(state => state.UserDetails.userData);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = item => {
    if (item?.id == 5) {
      dispatch(CLEAR_USER_DATA());
      Toast.show('Logged out successfully', 2, Toast.CENTER);
    }
  };

  const handleProfile = () => {
    navigation.navigate('profile');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.settingsContainer}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // marginTop: 10,
            paddingBottom: 10,
          }}>
          {/* <Pressable
            style={{paddingLeft: 10}}
            onPress={() => navigation.navigate('home')}>
            <BackIcon name="chevron-back-sharp" size={22} color="black" />
          </Pressable> */}
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              paddingRight: '29%',
              fontWeight: 'bold',
              fontFamily: 'Arial',
            }}>
            Profile
          </Text>
          {/* <Pressable style={{paddingRight: 7}}>
            <MoreIcon name="more-vertical" size={24} color="black" />
          </Pressable> */}
        </View>
        <View style={styles.profile}>
          <Avatar.Image
            size={66}
            source={require('../../Assets/images/avatar.jpg')}
            backgroundColor="white"
          />
          <View style={{gap: 10, paddingRight: 30}}>
            <Text style={{fontSize: 17, color: 'white', fontFamily: 'serif'}}>
              {User?.fullname}
            </Text>
            <Text style={{fontSize: 12,color:'lightgrey'}}>{User?.email}</Text>
          </View>
          <TouchableOpacity onPress={handleProfile}>
            <EditIcon name="account-edit-outline" size={27} color="white" />
          </TouchableOpacity>
        </View>

        <FlatList
          ListHeaderComponent={
            <View
              style={{
                width: '100%',
                backgroundColor: 'white',
                marginTop: 30,
                borderRadius: 10,
                justifyContent: 'space-between',
              }}>
              <FlatList
                data={settingsList}
                key={1}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      height: 67,
                      alignItems: 'center',
                      gap: 10,
                      padding: 15,
                      justifyContent: 'space-between',
                    }}
                    onPress={() => handleLogout(item)}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        gap: 20,
                      }}>
                      <View
                        style={{
                          width: 40,
                          height: 40,
                          backgroundColor: '#F3F3F3',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 50,
                        }}>
                        {item?.icon}
                      </View>
                      <View>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 12,
                            fontWeight: 'bold',
                          }}>
                          {item?.title}
                        </Text>
                        <Text style={{color: 'lightgrey', fontSize: 12}}>
                          {item?.description}
                        </Text>
                      </View>
                    </View>
                    <View style={{}}>{item?.icon2}</View>
                  </TouchableOpacity>
                )}
              />
            </View>
          }
          ListFooterComponent={
            <View
              style={{
                width: '100%',
                backgroundColor: 'white',
                marginTop: 30,
                borderRadius: 10,
                justifyContent: 'space-between',
              }}>
              <FlatList
                data={More}
                key={1}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      height: 67,
                      alignItems: 'center',
                      gap: 10,
                      padding: 15,
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        gap: 20,
                      }}>
                      <View
                        style={{
                          width: 40,
                          height: 40,
                          backgroundColor: '#F3F3F3',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 50,
                        }}>
                        {item?.icon}
                      </View>
                      <View style={{justifyContent: 'center'}}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 12,
                            fontWeight: 'bold',
                          }}>
                          {item?.title}
                        </Text>
                      </View>
                    </View>
                    <View style={{}}>{item?.icon2}</View>
                  </TouchableOpacity>
                )}
              />
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Settings;
