import {StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    padding:'7%',
    backgroundColor:'white',
  },
  textInput: {
    backgroundColor:'transparent',
    paddingLeft: 20,
    borderRadius: 30,
    marginBottom: 10,
    color:'black',
    borderWidth:1,
    borderColor:"#2C5DD1",
    color:"#2C5DD1"
  },
  inputContainer: {
    gap:10   
  },

  signUp:{
    fontSize:20,
    paddingBottom:50,
    paddingTop:10,
    color: '#2C5DD1',
    fontWeight:'bold',
    fontFamily:'Arial'
  },

  loginButton:{
    borderWidth:0,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:50,
    backgroundColor: '#2C5DD1',
    elevation:20
  },
  Or:{
    borderColor:'lightgrey',
    borderBottomWidth:1,
    width:'40%',
    marginBottom:7,
  },
  registerOr:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    gap:7,
    paddingTop:10
  },
  loginFacebook:{
    borderWidth:0,
    height:40,
    borderRadius:50,
    backgroundColor: '#1162F9',
  },

  loginApple:{
    borderWidth:0,
    height:40,
    borderRadius:50,
    backgroundColor: 'black',
  },

  containerSSo:{
    marginTop:90,
     height:'36%',
     display:'flex',
     flexDirection:'column',
     justifyContent:'space-between',
  },

  tinyLogo:{
    width: 50,
    height: 50,
  },

  logo:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  }

});

export default styles;
