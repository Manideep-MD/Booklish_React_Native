import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  searchContainer: {
    width: '100%',
    height: '100%',
  },
  input: {
    width: 270,
    height: 40,
    borderColor: '#2C5DD1',
    borderRadius: 8,
    backgroundColor: '#F2EDED',
    color: 'black',
    paddingLeft: 20,
    borderWidth: 0.5,
    // elevation:10
  },
  filterContainer: {
    width: '12%',
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    backgroundColor: '#2C5DD1',
    elevation: 10,
  },
  carousel: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  popularCard: {
    width: '42%',
    marginLeft: 20,
    paddingBottom:'4%'
  },
  newbookContainer:{
   paddingTop:'6%'
  },
 
});

