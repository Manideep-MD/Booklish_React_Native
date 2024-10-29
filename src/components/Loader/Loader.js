import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

const Loader = () => {
  return (
    <View style={{
      position:'absolute',
       left:'44%',
       top:'50%'
      }}>
      <LottieView
        source={require('../../Assets/Animated_loader/Animation - 1729773530681.json')}
        autoPlay
        loop
        style={{width:80,height:100,color:"blue"}}
      />
      </View>
  )
}

export default Loader