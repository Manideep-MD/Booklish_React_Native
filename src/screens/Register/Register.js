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
import styles from './Register.styles';
import bookLogo from '../../Assets/images/bookLogo.webp';
import {Checkbox} from 'react-native-paper';
import VisibleIcon from 'react-native-vector-icons/Entypo';
import NotVisibleIcon from 'react-native-vector-icons/Entypo';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import { User_Register } from '../../api/Index';
import Toast from 'react-native-simple-toast';
import {Formik} from 'formik';
import * as Yup from 'yup';
import { emailRegex, email_Validation, passwordRegex } from '../../Utils/Validations/Validations';


const Register = () => {
  // const [firstName, setFirstName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword,setConfirmPassword] = useState("")
  const [show, setShow] = useState(true);
  const [confirm, setConfirm] = useState(true);

  const focus = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    setShow(true);
    setConfirm(true);
  }, [focus]);

  const handleRegister = async(data) => {
    if(data.password === data.confirmPassword){
      try{
        const payload = {
           fullname: data?.fullName,
           email: data?.email,
           password:data?.confirmPassword
        }
        const response = await User_Register(payload)
        if(response && response.status === 201){
           Toast.showWithGravity(response.data.message, 2, Toast.BOTTOM);
           navigation.navigate("login")
        }else{
          console.log("Error while creating user",error)
        }
      }catch(error){
        console.log("Error:",error?.response?.data?.message)
        Toast.showWithGravity(error.response.data.message, 2, Toast.BOTTOM);
      }
     }else{
      Toast.showWithGravity('Password do not match', 2, Toast.BOTTOM);
     }
    }

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("* Fullname is required"),
    email: Yup.string()
      .matches(emailRegex, '* Invalid email')
      .required('* Email is required'),
    password: Yup.string().matches(passwordRegex,"* Password is not secure").required('* Password is required'),
    confirmPassword: Yup.string().required('* Confirmation is required'),
  });

  const handleLogin = () => {
    navigation.navigate('login');
  };

  const handleShowPassword = () => {
    setShow(false);
    if (!show) {
      setShow(true);
    }
  };

  const handleConfirm = () => {
    setConfirm(false);
    if (!confirm) {
      setConfirm(true);
    }
  };


  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.container}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            // paddingTop: '8%',
            paddingBottom:20
            // gap:40
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
            fullName:'',
            email: '',
            password: '',
            confirmPassword:''
          }}
          validationSchema={validationSchema}
          onSubmit={(data) => handleRegister(data)}>
          {({errors, handleSubmit,values,handleChange,touched}) => (
        <View style={styles.inputContainer}>
          <View style={{gap: 13}}>
            <SafeAreaView>
              <TextInput
                placeholder="Full Name"
                placeholderTextColor="#928F8F"
                style={styles.textInput}
                value={values.fullName}
                onChangeText={handleChange('fullName')}
              />
              {errors.fullName && touched.fullName ? (
                    <View>
                      <Text style={{color: 'red', fontSize: 10,paddingLeft:20,fontFamily:'serif'}}>
                        {errors.fullName}
                      </Text>
                    </View>
                  ):null}
            </SafeAreaView>

            <SafeAreaView>
              <TextInput
                placeholder="Email"
                placeholderTextColor="#928F8F"
                style={styles.textInput}
                value={values.email}
                onChangeText={handleChange('email')}
              />
              {errors.email && touched.email ? (
                    <View>
                      <Text style={{color: 'red', fontSize: 10,paddingLeft:20,fontFamily:'serif'}}>
                        {errors.email}
                      </Text>
                    </View>
                  ):null}
            </SafeAreaView>

            <SafeAreaView>
              <TextInput
                secureTextEntry={show}
                placeholder="Password"
                placeholderTextColor="#928F8F"
                style={styles.textInput}
                value={values.password}
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
                      <Text style={{color: 'red', fontSize: 10,paddingLeft:20,position:'absolute',bottom:1,fontFamily:'serif'}}>
                        {errors.password}
                      </Text>
                    </View>
                  ):null}

            <SafeAreaView>
              <TextInput
                secureTextEntry={confirm}
                placeholder="Confirm Password"
                placeholderTextColor="#928F8F"
                style={styles.textInput}
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
              />
              <TouchableOpacity
                style={{position: 'absolute', right: 17, bottom: 25}}
                onPress={handleConfirm}>
                {confirm ? (
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
            {errors.confirmPassword && touched.confirmPassword ? (
                    <View>
                      <Text style={{color: 'red', fontSize: 10,paddingLeft:20,position:'absolute',bottom:1,fontFamily:'serif'}}>
                        {errors.confirmPassword}
                      </Text>
                    </View>
                  ):null}

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
              <Text style={{color: '#2C5DD1', fontSize: 11}}>Remember Me</Text>
            </View>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={{color: '#2C5DD1', fontSize: 11}}>
                Already have an account ?
              </Text>
            </TouchableOpacity>
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
              SIGN UP
            </Text>
          </Pressable>
          </View>
        </View>)}
        </Formik>

      </View>
    </ScrollView>
  );
};

export default Register;
