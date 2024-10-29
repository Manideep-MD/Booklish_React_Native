import {View, Text, Image, Touchable, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import styles from '../../components/HorizontalCard/HorizontalCard.styles';
import Heart from 'react-native-vector-icons/Entypo';
import Star from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-simple-toast';

const HorizontalCard = ({item}) => {
  const [touch, setTouch] = useState(false);

  const handlePress = () => {
    setTouch(true);
    if (touch) {
      setTouch(false);
      setTimeout(() => {
        Toast.showWithGravity('Removed From Wishlist', 2, Toast.CENTER);
      }, 50);
    } else {
      setTimeout(() => {
        Toast.showWithGravity('Added To Wishlist', 2, Toast.CENTER);
      }, 50);
    }
  };
  
  return (
    <View style={styles.cardContainer}>
        <Image
          source={{uri: item.image}}
          style={{borderRadius: 15, width: '36%', height: 210}}
        />

      <View style={{paddingLeft: 10, width: '50%'}}>
        <View style={{flex: 1, paddingTop: 10}}>
          <Text
            style={{
              fontSize: 12,
              paddingLeft: 10,
              color: '#2C5DD1',
              fontFamily: 'Arial',
              fontWeight: 'bold',
              paddingTop: 8,
            }}>
            {item.title.toUpperCase()}
          </Text>
          <Text
            style={{
              fontSize: 12,
              paddingLeft: 10,
              color: '#CAC6C6',
              fontFamily: 'Arial',
              // fontWeight: 'bold',
            }}>
            {item.genre}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 12,
              paddingLeft: 10,
              color: '#44AF25',
              fontFamily: 'Arial',
              fontWeight: 'bold',
              paddingBottom: 20,
              // fontWeight: 'bold',
            }}>
            {'$ 30'}
          </Text>
        </View>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity style={{paddingTop: 15,paddingLeft:10}} onPress={handlePress}>
          {!touch ? (
            <Heart name="heart-outlined" size={20} color="black" />
          ) : (
            <Heart name="heart" size={20} color="red" />
          )}
        </TouchableOpacity>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingBottom: 22,
            gap: 3,
          }}>
          <Star name="star" size={15} color="gold" />
          <Text style={{fontSize: 12, color: 'orange'}}>{4.3}</Text>
        </View>
      </View>
    </View>
  );
};

export default HorizontalCard;
