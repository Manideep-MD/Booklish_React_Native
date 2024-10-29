import {
  View,
  Text,
  Button,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ImageBackground,
  ScrollView,
  TouchableWithoutFeedback,
  Pressable,
  RefreshControl,
  Image,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import styles from './HomeScreen.styles';
import {useNavigation} from '@react-navigation/native';
import {Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '../../components/Carousel/Slider';
import slide1 from '../../Assets/images/slide1.jpg';
import slide2 from '../../Assets/images/slide2.jpg';
import slide3 from '../../Assets/images/slide3.jpg';
import {Books_Data} from '../../api/Index';
import BookCard from '../../components/Card/BookCard';
import HorizontalCard from '../../components/HorizontalCard/HorizontalCard';
import { useDispatch, useSelector } from 'react-redux';
import { SET_BOOK_DATA } from '../../Redux/BookDetails';
import Loader from '../../components/Loader/Loader';
import bookLogo from '../../Assets/images/bookLogo.webp';
import LogoutIcon from 'react-native-vector-icons/AntDesign';
import { CLEAR_USER_DATA } from '../../Redux/UserDetails';
import Toast from 'react-native-simple-toast';




// const image = {
//   uri: 'https://e0.pxfuel.com/wallpapers/785/727/desktop-wallpaper-black-abstract-android-dark-black-abstract.jpg',
// };

const HomeScreen = () => {
  const navigation = useNavigation();
  const [bookData, setBookData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [more,setMore] = useState(false)
  const dispatch = useDispatch()
  const [showLoader, setShowLoader] = useState(false)
  const User = useSelector((state) => state.UserDetails.userData)


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      fetchBooks();
      setRefreshing(false);
    }, 2000);
  }, []);

  const sliderImages = [
    {
      id: 1,
      sliderImage: slide1,
    },
    {
      id: 2,
      sliderImage: slide2,
    },
    {
      id: 3,
      sliderImage: slide3,
    },
  ];

  const fetchBooks = async () => {
    try {
      setShowLoader(true)
      const response = await Books_Data();
      if (response && response.status === 200) {
        console.log(response.data.data,"data=========>")
        setBookData(response.data.data);
      } else {
        console.log('Error white fetching details');
      }
    } catch (error) {
      console.log('Error:', error?.response?.data?.message);
    }finally{
      setShowLoader(false)
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleFlash =()=>{
     navigation.navigate("flash")
  }

  const handleDetails = (item) =>{
    dispatch(SET_BOOK_DATA(item?._id))
    navigation.navigate("details")
  }

  const handleMore = () =>{
     setMore(true)
     if(more){
      setMore(false)
     }
  }

  const handleLogout = () =>{
      dispatch(CLEAR_USER_DATA())
      Toast.show('Logged out successfully', 2, Toast.CENTER);
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
         {Object.keys(User).length > 0 ? <View style={styles.headerContent}>
            <Avatar.Image
              size={48}
              source={require('../../Assets/images/avatar.jpg')}
              backgroundColor="white"
            />
            <Text style={styles.greetingText}>Hi, {User?.fullname} !</Text>
          </View> : <View style={{position:'relative',right:20}}><Image source={bookLogo} style={{width: 160, height: 30}} /></View>}
         <View style={{flexDirection:'row',gap:12}}>
         <Icon name="notifications-outline" color="#878789" size={29} />
          {Object.keys(User).length > 0 && <TouchableOpacity onPress={handleLogout}><LogoutIcon name="logout" color="#2C5DD1" size={25} /><Text style={{color:'#2C5DD1',fontSize
        :9}}>Logout</Text></TouchableOpacity>}
         </View>
        </View>

        <FlatList
          data={bookData}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListHeaderComponent={
            <>
              {/* Slider */}
              <Pressable style={styles.sliderContainer} onPress={handleFlash}>
                <Slider sliderImages={sliderImages}  />
              </Pressable>

              {/* Popular Section */}
              {bookData.length > 0 && <View style={styles.carousel}>
                <Text style={styles.sectionTitle}>Popular</Text>
                <View style={styles.popularContainer}>
                  {bookData && bookData.length > 0 && (
                    <FlatList
                      data={bookData}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item, index}) => (
                        <Pressable key={index} style={styles.popularCard} onPress={()=>handleDetails(item)}>
                          <BookCard item={item} />
                        </Pressable>
                      )}
                      keyExtractor={item => item.id}
                    />
                  )}
                </View>
              </View>}
            </>
          }
          ListFooterComponent={
            <>
             {bookData.length > 0 && <View style={styles.newbookContainer}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: 15,
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: 'black',
                      paddingLeft: 23,
                      fontWeight: 'bold',
                    }}>
                    New Books
                  </Text>
                  { !more ? <TouchableOpacity onPress={handleMore}>
                  <Text style={{color: '#2C5DD1', paddingRight: 10}}>More</Text>
                  </TouchableOpacity> : <TouchableOpacity onPress={handleMore}>
                  <Text style={{color: '#2C5DD1', paddingRight: 10}}>Less</Text>
                  </TouchableOpacity> }
                </View>
                <View>
                  {bookData && bookData.length > 0 && (
                    <FlatList
                      data={more ? bookData : bookData.slice(0, 3)}
                      horizontal={false}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item, index}) => (
                        <Pressable key={index} style={styles.newBooks} onPress={()=>handleDetails(item)}>
                          <HorizontalCard item={item} />
                        </Pressable>
                      )}
                      keyExtractor={item => item.id.toString()}
                    />
                  )}
                                    

                </View>
              </View>}
            </>
          }
        />
      </View>
      {showLoader && <Loader/>}
    </SafeAreaView>
  );
};

export default HomeScreen;
