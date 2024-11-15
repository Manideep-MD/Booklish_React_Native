import { StyleSheet } from "react-native";


export default StyleSheet.create({
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#2C5DD1',
        borderRadius: 30,
        padding: 12,
        backgroundColor:'transparent',
        height:55,
        justifyContent:'center',
        paddingLeft:17
      },
      pickerText: {
        fontSize: 14,
        color: '#2C5DD1',
      },
      placeholderText: {
        color: 'grey',
      },
      hiddenPicker: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0, 
      },
      button: {
        borderWidth: 1,
        borderColor: '#2C5DD1',
        borderRadius: 30,
        padding: 12,
        backgroundColor:'transparent',
        height:55,
        justifyContent:'center',
        paddingLeft:17,
        color:'#2C5DD1'
      },
      selectedDateText: {
        fontSize: 18,
        color: '#2C5DD1',
        marginTop: 15,
      },
      buttonText:{
        color: '#2C5DD1',
      }
})