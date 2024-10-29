import {View, Text, Dimensions, Image} from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';

const Slider = ({sliderImages}) => {
  const width = Dimensions.get('window').width;

  return (
    <View style={{flex: 1}}>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={sliderImages}
        scrollAnimationDuration={800}
        onSnapToItem={index => index}
        renderItem={({item}) => (
          <View
            style={{
              flex: 1,
              // borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              name="slides"
              source={item.sliderImage}
              style={{borderRadius: 15, width: '88%', height: '75%'}}
            />
          </View>
        )}
      />
    </View>
  );
};

export default Slider;
