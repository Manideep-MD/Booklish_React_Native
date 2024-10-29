import {Image, Text, View} from 'react-native';
import React from 'react';
import styles from '../../components/Card/BookCard.styles';
import { ProgressBar } from 'react-native-paper';
// import { Avatar, Button, Card, Text } from 'react-native-paper';

const BookCard = ({item,flash}) => {
  return (
    <View style={styles.cardContainer}>
      <Image
        source={{uri: item.image}}
        style={{borderRadius: 15, width: '100%', height:208}}
      />
     {flash && <View style={{paddingTop:10,width:'100%',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',gap:16}}>
        <ProgressBar progress={4/5} color="orange" width="60%"/>
       <Text style={{color:'#CAC6C6',fontSize:12}}>4 Left</Text>
      </View>}
      <Text
        style={{
          fontSize: 12,
          paddingLeft: 10,
          color: '#2C5DD1',
          fontFamily: 'Poppins',
          fontWeight: 'bold',
          paddingTop:8,
        }}>
        {item.title.toUpperCase()}
      </Text>
      <Text style={{
          fontSize: 12,
          paddingLeft: 10,
          color: '#CAC6C6',
          fontFamily: 'Arial',
          // fontWeight: 'bold',
        }}>{item.genre}</Text>
    </View>
  );
};

export default BookCard;
