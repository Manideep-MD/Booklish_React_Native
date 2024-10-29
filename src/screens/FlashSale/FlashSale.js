import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from './FlashSale.styles';
import BackIcon from 'react-native-vector-icons/Ionicons';
import MoreIcon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import style from '../SearchBooks/SearchBooks.styles';
import { Books_Data } from '../../api/Index';
import GridIcon from 'react-native-vector-icons/Ionicons';
import ListIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SortIcon from 'react-native-vector-icons/FontAwesome5';
import HorizontalCard from '../../components/HorizontalCard/HorizontalCard';
import BookCard from '../../components/Card/BookCard';
import { SET_BOOK_DATA } from '../../Redux/BookDetails';
import { useDispatch } from 'react-redux';
import { RefreshControl } from 'react-native-gesture-handler';


const FlashSale = () => {
  const navigation = useNavigation();
  const [today, setToday] = useState(true);
  const [tomorrow, setTomorrow] = useState(false);
  const [bookData, setBookData] = useState([]);
  const [grid, setGrid] = useState(false);
  const [list, setList] = useState(false);
  const [sort, setSort] = useState(false);
  const [count,setCount] = useState(20);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch()


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      fetchBooks();
      setRefreshing(false);
    }, 2000);
  }, []);

  const fetchBooks = async () => {
    console.log('is triggered');
    try {
      const response = await Books_Data();
      if (response && response.status === 200) {
        setBookData(response.data.data);
        setList(true);
      } else {
        console.log('Error white fetching details');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(count => {
        if (count === 1) {
          clearInterval(intervalId); 
          navigation.navigate("homeScreen"); 
          return count; 
        }
        return count - 1;
      });
    }, 1000);
  
    return () => clearInterval(intervalId);
  }, [count]);

  const handleGrid = () => {
    setGrid(true);
    setList(false);
    setSort(false);
  };

  const handleList = () => {
    setList(true);
    setGrid(false);
    setSort(false);
  };

  const handleSort = () => {
    console.log(' triggered')
    setSort(true);
    setGrid(false);
    setList(false);
    // console.log(filteredData)
  }; 

  const handleSwitch=()=>{
     if(today){
        setTomorrow(true)
        setToday(false)
        handleGrid()
     }else if(tomorrow){
        setToday(true)
        setTomorrow(false)
        handleList()
     }
  }

  const handleDetails = (item) =>{
    dispatch(SET_BOOK_DATA(item?._id))
    navigation.navigate("details")
  }

 
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.flashContainer}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 16,
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
            Flash Sale
          </Text>
          <Pressable style={{paddingRight: 7}}>
            <MoreIcon name="more-vertical" size={24} color="black" />
          </Pressable>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '90%',
            marginLeft: 20,
            marginTop: 30,
            borderRadius: 8,
            backgroundColor: 'lightgrey',
          }}>
          <TouchableOpacity
            style={{
              width: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              height: 30,
              backgroundColor: today ? '#2C5DD1' : "lightgrey",
            }}
            onPress={handleSwitch}>
            <Text
              style={{
                color:today ? "white":"black",
                fontSize: 16,
                fontWeight: 600,
                fontFamily: 'Arial',
              }}>
              Today
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              height: 30,
              backgroundColor:tomorrow ? '#2C5DD1' : "lightgrey"
            }}
            onPress={handleSwitch}>
            <Text
              style={{
                color:tomorrow ? "white":"black",
                fontSize: 16,
                fontWeight: 600,
                fontFamily: 'Arial',
              }}>
              Tomorrow
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 22,
            paddingBottom: 15,
          }}>
          <View style={{paddingLeft: 17}}>
            <Text style={{color: 'orange', fontSize: 16, fontWeight: 'bold'}}>
              00:{count}:21
            </Text>
            <Text style={{color: 'black', fontSize: 12}}>
              {bookData && bookData.length} Books found
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
              paddingRight: 15,
            }}>
            <Pressable onPress={()=>handleGrid()}>
              <GridIcon
                name="grid-outline"
                size={22}
                color={grid ? '#2C5DD1' : 'lightgrey'}
              />
            </Pressable>

            <Pressable onPress={()=>handleList()}>
              <ListIcon
                name="format-list-checkbox"
                size={25}
                color={list ? '#2C5DD1' : 'lightgrey'}
              />
            </Pressable>

            <Pressable onPress={()=>handleSort()}>
              <SortIcon
                name="sort-amount-down-alt"
                size={25}
                color={sort ? '#2C5DD1' : 'lightgrey'}
              />
            </Pressable>
          </View>
        </View>

        <FlatList
          // data={bookData}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
         ListHeaderComponent={
            <>
              { grid && (<View style={{width:'100%'}}>
                <View style={style.popularContainer}>
                  {bookData && bookData.length > 0 && (
                    <FlatList
                      data={bookData}
                      key={2}
                      numColumns={2}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item, index}) => (
                        <Pressable key={index} style={style.popularCard} onPress={()=>handleDetails(item)}>
                          <BookCard item={item} flash={"flash"} />
                        </Pressable>
                      )}
                      keyExtractor={item => item.id}
                    />
                  )}
                </View>
              </View>)}
            </>
          }

          ListFooterComponent={
            <>
             {list && ( <View style={{width:'100%',height:'100%',paddingLeft:15}}>
                <View>
                  {bookData && bookData.length > 0 && (
                    <FlatList
                      data={bookData}
                      horizontal={false}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item, index}) => (
                        <Pressable key={index} style={{
                          paddingBottom:10}} onPress={()=>handleDetails(item)}>
                          <HorizontalCard item={item} />
                        </Pressable>
                      )}
                      keyExtractor={item => item.id.toString()}
                    />
                  )}
                </View>
              </View>)}
            </>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default FlashSale;
