import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import BackIcon from 'react-native-vector-icons/Ionicons';
import React, {useState} from 'react';
import {Avatar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import styles from '../Login/Login.styles';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {emailRegex} from '../../Utils/Validations/Validations';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import style from './Profile.styles';
import DatePicker from 'react-native-date-picker';

const Profile = () => {
  const User = useSelector(state => state.UserDetails.userData);
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const handleUpdate = data => {
    console.log(data, 'data=========>');
  };

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required('* Fullname is required'),
    phone: Yup.string().required('* Mobile number is required'),
    gender: Yup.string().required('* Select your gender'),
    date: Yup.string().required('* Select your DOB'),
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 16,
        }}>
        <Pressable
          style={{paddingLeft: 10}}
          onPress={() => navigation.navigate('settings')}>
          <BackIcon name="chevron-back-sharp" size={22} color="black" />
        </Pressable>
        <Text
          style={{
            color: 'black',
            fontSize: 15,
            paddingRight: '42%',
            fontWeight: 'bold',
            fontFamily: 'Arial',
          }}>
          Bio-data
        </Text>
      </View>
      <View style={{height: '100%', padding: 19}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 170,
            gap: 10,
          }}>
          <View>
            <Avatar.Image
              size={86}
              source={require('../../Assets/images/avatar.jpg')}
              backgroundColor="white"
            />
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'black', fontSize: 17}}>{User?.fullname}</Text>
            <Text style={{color: '#C8C5C5', fontSize: 11}}>{User?.email}</Text>
          </View>
        </View>
        <View>
          <Formik
            initialValues={{
              fullname: '',
              phone: '',
              gender: setSelectedValue,
              date: setDate,
            }}
            validationSchema={validationSchema}
            onSubmit={data => handleUpdate(data)}>
            {({errors, handleSubmit, values, handleChange, touched}) => (
              <View style={styles.inputContainer}>
                <View style={{gap: 13}}>
                  <SafeAreaView>
                    <TextInput
                      name="fullname"
                      placeholder="Full name"
                      placeholderTextColor="#928F8F"
                      style={styles.textInput}
                      value={values.email} // Bind Formik's state to this input
                      onChangeText={handleChange('email')}
                    />
                    {errors.fullname && touched.fullname ? (
                      <View>
                        <Text
                          style={{
                            color: 'red',
                            fontSize: 10,
                            paddingLeft: 20,
                            fontFamily: 'serif',
                          }}>
                          {errors.fullname}
                        </Text>
                      </View>
                    ) : null}
                  </SafeAreaView>

                  <SafeAreaView>
                    <TextInput
                      name="phone"
                      placeholder="Phone number"
                      placeholderTextColor="#928F8F"
                      style={styles.textInput}
                      value={values.password}
                      keyboardType="numeric"
                      maxLength={10}
                      onChangeText={handleChange('password')}
                    />
                    {errors.phone && touched.phone ? (
                      <View>
                        <Text
                          style={{
                            color: 'red',
                            fontSize: 10,
                            paddingLeft: 18,
                            fontFamily: 'serif',
                          }}>
                          {errors.phone}
                        </Text>
                      </View>
                    ) : null}
                  </SafeAreaView>

                  <View style={style.pickerContainer}>
                    <Text
                      style={[
                        style.pickerText,
                        selectedValue === '' && style.placeholderText,
                      ]}>
                      {selectedValue || 'Please select your gender'}
                    </Text>
                    <Picker
                      name="gender"
                      selectedValue={selectedValue}
                      onValueChange={itemValue => setSelectedValue(itemValue)}
                      style={style.hiddenPicker}>
                      <Picker.Item
                        label="Please select your gender"
                        value=""
                        color="#aaa"
                      />
                      <Picker.Item label="Male" value="Male" />
                      <Picker.Item label="Female" value="Female" />
                    </Picker>
                    {errors.gender && touched.gender ? (
                      <View>
                        <Text
                          style={{
                            color: 'red',
                            fontSize: 10,
                            paddingLeft: 18,
                            fontFamily: 'serif',
                          }}>
                          {errors.gender}
                        </Text>
                      </View>
                    ) : null}
                  </View>

                  <View>
                    <TouchableOpacity
                      style={style.button}
                      onPress={() => setOpen(true)}>
                      <Text style={style.buttonText}>
                        {!date
                          ? 'Select Date'
                          : `Selected Date: ${date.toDateString()}`}
                      </Text>
                    </TouchableOpacity>
                    <DatePicker
                      modal
                      open={open}
                      date={date}
                      mode="date"
                      onConfirm={selectedDate => {
                        setOpen(false);
                        setDate(selectedDate);
                      }}
                      onCancel={() => setOpen(false)}
                      textColor="#2C5DD1"
                      fadeToColor="#2C5DD1"
                      androidVariant="iosClone"
                    />
                    {errors.date && touched.date ? (
                      <View>
                        <Text
                          style={{
                            color: 'red',
                            fontSize: 10,
                            paddingLeft: 18,
                            fontFamily: 'serif',
                          }}>
                          {errors.date}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                </View>
                <Pressable style={styles.loginButton} onPress={handleSubmit}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      fontSize: 12,
                      fontWeight: 'bold',
                      fontFamily: 'Arial',
                      letterSpacing: 1,
                    }}>
                    Update Profile
                  </Text>
                </Pressable>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
