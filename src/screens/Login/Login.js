import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './Login.styles';
import google from '../../Assets/images/google.png';
import facebook from '../../Assets/images/facebook.png';
import git from '../../Assets/images/git.png';
import bookLogo from '../../Assets/images/bookLogo.webp';
import {Checkbox} from 'react-native-paper';
import VisibleIcon from 'react-native-vector-icons/Entypo';
import NotVisibleIcon from 'react-native-vector-icons/Entypo';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import {User_Login} from '../../api/Index';
import {useDispatch} from 'react-redux';
import {SET_USER_DATA} from '../../Redux/UserDetails';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {emailRegex} from '../../Utils/Validations/Validations';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Loader from '../../components/Loader/Loader';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
// import firebase from '@react-native-firebase/app';

GoogleSignin.configure({
  webClientId:
    '749928924796-92dp1d37f7tqpnuc058mcm0m2jt38so2.apps.googleusercontent.com', // Use Web Client ID
});

const Login = () => {
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const focus = useIsFocused();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    setShow(true);
  }, [focus]);

  // useEffect(() => {

  // }, []);

  // useEffect(() => {
  //   // Check if the user is already signed in
  //   const checkUser = async () => {
  //     const isSignedIn = await GoogleSignin.isSignedIn();
  //     if (isSignedIn) {
  //       const currentUser = await GoogleSignin.signInSilently();
  //       setUser(currentUser);
  //     }
  //   };

  //   checkUser();
  // }, []);

  //   if (!firebase.apps.length) {
  //     firebase.initializeApp();
  // }

  const handleLogin = async data => {
    try {
      const payload = {
        email: data?.email,
        password: data?.password,
      };
      const response = await User_Login(payload);
      if (response && response.status === 200) {
        console.log(response.data, 'data=========>');
        dispatch(SET_USER_DATA(response.data.user));
        Toast.show(response.data.message, 2, Toast.CENTER);
        navigation.navigate('homeScreen');
      } else {
        console.log('Error while creating user', error);
      }
    } catch (error) {
      // console.log("Error:",error.response.data.message)
      Toast.showWithGravity(error.response.data.message, 2, Toast.BOTTOM);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(emailRegex, '* Invalid email')
      .required('* Email is required'),
    password: Yup.string().required('* Password is required'),
  });

  const handleShowPassword = () => {
    setShow(false);
    if (!show) {
      setShow(true);
    }
  };

  const handleRegister = () => {
    navigation.navigate('register');
  };

  const onGoogleButtonPress = async () => {
    try {
      setLoading(true)
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const signInResult = await GoogleSignin.signIn();

      // Try the new style of google-sign in result, from v13+ of that module
      idToken = signInResult.data?.idToken;
      if (!idToken) {
        // if you are using older versions of google-signin, try old style result
        idToken = signInResult.idToken;
      }

      // If idToken is missing, log an error and handle it
      if (!idToken) {
        console.error('No idToken received');
        throw new Error('No idToken received');
      }

      // Authenticate with Firebase using the idToken
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      const firebaseResult = await auth().signInWithCredential(
        googleCredential,
      );
      dispatch(SET_USER_DATA(firebaseResult.user));
      navigation.navigate('homeScreen');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign-in in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available');
      } else {
        console.log(error.message);
      }
    }finally{
       setLoading(false)
    }
  };

  const onFacebookButtonPress = async() => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
  
    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();
  
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
  
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
    
  }

  return (
    <ScrollView style={{flex: 1}}>
 
     <View style={styles.container}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 20,
            paddingBottom: 30,
          }}>
          <Image source={bookLogo} style={{width: 250, height: 50}} />
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'serif',
            gap: 10,
            paddingBottom: 15,
          }}>
          <Text style={{fontSize: 22, color: 'black', fontWeight: 'bold'}}>
            Welcome Back
          </Text>
          <Text style={{color: '#928F8F'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </Text>
        </View>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={data => handleLogin(data)}>
          {({errors, handleSubmit, values, handleChange, touched}) => (
            <View style={styles.inputContainer}>
              <View style={{gap: 13}}>
                <SafeAreaView>
                  <TextInput
                    name="email"
                    placeholder="Email"
                    placeholderTextColor="#928F8F"
                    style={styles.textInput}
                    value={values.email} // Bind Formik's state to this input
                    onChangeText={handleChange('email')}
                  />
                  {errors.email && touched.email ? (
                    <View>
                      <Text
                        style={{
                          color: 'red',
                          fontSize: 10,
                          paddingLeft: 20,
                          fontFamily: 'serif',
                        }}>
                        {errors.email}
                      </Text>
                    </View>
                  ) : null}
                </SafeAreaView>

                <SafeAreaView>
                  <TextInput
                    name="password"
                    secureTextEntry={show}
                    placeholder="Password"
                    placeholderTextColor="#928F8F"
                    style={styles.textInput}
                    value={values.password} // Bind Formik's state to this input
                    onChangeText={handleChange('password')}
                  />
                  <TouchableOpacity
                    style={{position: 'absolute', right: 17, bottom: 25}}
                    onPress={handleShowPassword}>
                    {show ? (
                      <NotVisibleIcon
                        name="eye-with-line"
                        size={20}
                        color="#2C5DD1"
                      />
                    ) : (
                      <VisibleIcon name="eye" size={20} color="#2C5DD1" />
                    )}
                  </TouchableOpacity>
                </SafeAreaView>
                {errors.password && touched.password ? (
                  <View>
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 10,
                        paddingLeft: 18,
                        position: 'absolute',
                        bottom: 1,
                        fontFamily: 'serif',
                      }}>
                      {errors.password}
                    </Text>
                  </View>
                ) : null}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Checkbox
                  // value={isSelected}
                  // onValueChange={setSelection}
                  // style={styles.checkbox}
                  />
                  <Text style={{color: '#2C5DD1', fontSize: 11}}>
                    Remember Me
                  </Text>
                </View>
                <View>
                  <Text style={{color: '#2C5DD1', fontSize: 11}}>
                    Forgot Password ?
                  </Text>
                </View>
              </View>

              <Pressable onPress={handleSubmit} style={styles.loginButton}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 12,
                    fontWeight: 'bold',
                    fontFamily: 'Arial',
                    letterSpacing: 1,
                  }}>
                  LOGIN
                </Text>
              </Pressable>
            </View>
          )}
        </Formik>

        <TouchableOpacity
          style={{paddingTop: 13, paddingBottom: 10}}
          onPress={handleRegister}>
          <Text
            style={{
              textAlign: 'center',
              color: '#2C5DD1',
              fontSize: 12,
              fontWeight: 'bold',
              fontFamily: 'Arial',
              letterSpacing: 1,
            }}>
            Create an account !
          </Text>
        </TouchableOpacity>

        <View style={styles.registerOr}>
          <View style={styles.Or}></View>
          <Text style={{color: 'black', fontSize: 14}}>OR</Text>
          <View style={styles.Or}></View>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingTop: 12,
          }}>
          <TouchableOpacity style={styles.logo} onPress={() => onFacebookButtonPress()}>
            <Image style={styles.tinyLogo} source={facebook} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.logo} onPress={onGoogleButtonPress}>
            <Image style={styles.tinyLogo} source={google} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.logo}>
            <Image style={styles.tinyLogo} source={git} />
          </TouchableOpacity>

          {/* <Pressable onPress={handleSignout}>
            <Text>Sign out</Text>
          </Pressable> */}
        </View>
        {loading && <Loader/>}
      </View>

    </ScrollView>
  );
};

export default Login;
