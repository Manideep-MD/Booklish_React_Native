import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 13,
    paddingTop: 23,
    paddingBottom:10
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  greetingText: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'serif',
    fontWeight:'bold'
  },
  scrollContainer: {
    flex: 1, // Allows scrollable content to grow and be scrollable
    paddingBottom: 20,
  },
  sliderContainer: {
    width: '100%',
    // aspectRatio: 2,
  },
  carousel: {
    height: 300,
    // marginVertical: 20,
    width: '100%',
    marginBottom:20,
    // paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 26,
    color: 'black',
    paddingLeft: 20,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontStyle: 'normal'
  },
  popularContainer: {
    width: '100%',
    paddingTop: 15,
  },
  popularCard: {
    width: 130,
    marginLeft: 20,
    // marginRight:15
  },
  newBooks:{
    // width:'100%',
   paddingLeft:20,
   paddingBottom:10
  },
  newbookContainer:{
      width:'100%',
      height:'100%',
  },
  // newContainer:{
  //   width:'100%',
  //   height:500
  // }
});


