import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Find_Books_Details} from '../../api/Index';
import {useSelector} from 'react-redux';
import MoreIcon from 'react-native-vector-icons/Feather';
import BackIcon from 'react-native-vector-icons/Ionicons';
import Cart from 'react-native-vector-icons/Ionicons';
import styles from './BookDetails.styles';
import {useNavigation} from '@react-navigation/native';
import Heart from 'react-native-vector-icons/Entypo';
import MinusIcon from 'react-native-vector-icons/Fontisto';
import Toast from 'react-native-simple-toast';
import Loader from '../../components/Loader/Loader';

const BookDetails = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const bookId = useSelector(state => state.BookDetails.bookData);
  const [touch, setTouch] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [cart, setCart] = useState(false);
  const [count, setCount] = useState(1);


  const handlePress = () => {
    setTouch(true);
    if (touch) {
      setTouch(false);
      setTimeout(() => {
        Toast.showWithGravity('Removed From Wishlist', 2, Toast.BOTTOM);
      }, 50);
    } else {
      setTimeout(() => {
        Toast.showWithGravity('Added To Wishlist', 2, Toast.BOTTOM);
      }, 50);
    }
  };

  useEffect(() => {
    if (bookId) {
      fetchBook();
    }
  }, []);

  const fetchBook = async () => {
    try {
      setShowLoader(true);
      const response = await Find_Books_Details(bookId);
      if (response && response.status === 200) {
        console.log(response.data.data, 'data========>');
        setData(response.data.data);
      } else {
        console.log('Error while fetching data');
      }
    } catch (error) {
      console.log('Error:', error.response.data.message);
    } finally {
      setShowLoader(false);
    }
  };

  const handleCart = () => {
    setCart(true);
    setCount(1)
  };

  const handleAdd = () =>{
    setCount(count + 1)
  }

  const handleRemove = () =>{
    setCount(count - 1)
    if(count === 1 ){
      setCart(false)
    }
  }

  return (
    <ScrollView style={{flex: 1}}>
      {showLoader && <Loader />}
      <View style={styles.detailContainer}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 16,
          }}>
          <Pressable
            style={{paddingLeft: 10}}
            onPress={() => navigation.navigate('home')}>
            <BackIcon name="chevron-back-sharp" size={22} color="black" />
          </Pressable>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              paddingRight: '29%',
              fontWeight: 'bold',
              fontFamily: 'Arial',
            }}>
            Book Details
          </Text>
          <Pressable style={{paddingRight: 7}}>
            <MoreIcon name="more-vertical" size={24} color="black" />
          </Pressable>
        </View>
        <View
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 20,
          }}>
          <Image
            source={{uri: data?.image}}
            style={{borderRadius: 15, width: '60%', height: 300}}
          />
        </View>
        <View style={{paddingTop: 15, paddingLeft: 15, paddingBottom: 15}}>
          <View style={{display: 'flex', gap: 10}}>
            <View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  paddingRight: '29%',
                  fontWeight: 'bold',
                  fontFamily: 'Arial',
                }}>
                Title
              </Text>
              <Text
                style={{
                  color: '#2C5DD1',
                  fontSize: 13,
                  paddingRight: '29%',
                  fontWeight: 500,
                  fontFamily: 'serif',
                }}>
                {data?.title}
              </Text>
            </View>

            <View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  paddingRight: '29%',
                  fontWeight: 'bold',
                  fontFamily: 'Arial',
                }}>
                Author
              </Text>
              <Text
                style={{
                  color: 'orange',
                  fontSize: 13,
                  paddingRight: '29%',
                  fontWeight: 500,
                  fontFamily: 'serif',
                }}>
                {data?.author}
              </Text>
            </View>

            <View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  paddingRight: '29%',
                  fontWeight: 'bold',
                  fontFamily: 'Arial',
                }}>
                Description
              </Text>
              <Text
                style={{
                  color: '#2C5DD1',
                  fontSize: 13,
                  paddingRight: '29%',
                  fontWeight: 500,
                  fontFamily: 'serif',
                }}>
                {data?.description}
              </Text>
            </View>

            <View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  paddingRight: '29%',
                  fontWeight: 'bold',
                  fontFamily: 'Arial',
                }}>
                Genre
              </Text>
              <Text
                style={{
                  color: '#2C5DD1',
                  fontSize: 13,
                  paddingRight: '29%',
                  fontWeight: 500,
                  fontFamily: 'serif',
                }}>
                {data?.genre}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              paddingTop: 12,
            }}>
            <View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  paddingRight: '29%',
                  fontWeight: 'bold',
                  fontFamily: 'Arial',
                }}>
                Price
              </Text>
              <Text
                style={{
                  color: 'green',
                  fontSize: 13,
                  paddingRight: '29%',
                  fontWeight: 500,
                  fontFamily: 'serif',
                }}>
                $ 30
              </Text>
            </View>
            <View
              style={{
                paddingRight: 10,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: 190,
                right: 10,
              }}>
             {!cart ? <TouchableOpacity
                style={{
                  width: 40,
                  height: 30,
                  backgroundColor: 'orange',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 6,
                }} onPress={handleCart}>
                <Cart name="add-sharp" size={22} color="white" />
              </TouchableOpacity> :

             <View style={{flexDirection:'row',gap:10,justifyContent:'center',alignItems:'center'}}>
             <TouchableOpacity onPress={handleAdd} style={{
                  width: 25,
                  height: 30,
                  backgroundColor: 'orange',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 6,
                }}>
              <Cart name="add-sharp" size={19} color="black" />
              </TouchableOpacity>
              <Text style={{color:'black'}}>{count}</Text>
              <TouchableOpacity onPress={handleRemove} style={{
                  width: 25,
                  height: 30,
                  backgroundColor: 'orange',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 6,
                }}>
              <MinusIcon name="minus-a" size={15} color="black" />
              </TouchableOpacity>
             </View>}
             {!cart && <Text
                style={{
                  paddingBottom: 4,
                  color: 'black',
                  fontSize: 8,
                  paddingTop: 3,
                }}>
                ADD TO CART
              </Text>}
              <View>
                <TouchableOpacity
                  style={{paddingTop: 15}}
                  onPress={handlePress}>
                  {!touch ? (
                    <Heart name="heart-outlined" size={20} color="black" />
                  ) : (
                    <Heart name="heart" size={20} color="red" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default BookDetails;
