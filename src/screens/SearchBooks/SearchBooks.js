import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import styles from './SearchBooks.styles';
import FilterIcon from 'react-native-vector-icons/FontAwesome';
import SearchIcon from 'react-native-vector-icons/Ionicons';
import GridIcon from 'react-native-vector-icons/Ionicons';
import ListIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SortIcon from 'react-native-vector-icons/FontAwesome5';
import {Books_Data, Search_Book_Data} from '../../api/Index';
import BookCard from '../../components/Card/BookCard';
import HorizontalCard from '../../components/HorizontalCard/HorizontalCard';
import style from '../HomeScreen/HomeScreen.styles';
import {debounce} from 'lodash';
import {SET_BOOK_DATA} from '../../Redux/BookDetails';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Loader from '../../components/Loader/Loader';
import {RefreshControl} from 'react-native-gesture-handler';

// format-list-checkbox

const SearchBooks = () => {
  const [searchText, setSearchText] = useState('');
  const [bookData, setBookData] = useState([]);
  const [grid, setGrid] = useState(false);
  const [list, setList] = useState(false);
  const [sort, setSort] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      fetchBooks();
      setRefreshing(false);
    }, 2000);
  }, []);

  const fetchBooks = async () => {
    try {
      setShowLoader(true);
      const response = await Books_Data();
      if (response && response.status === 200) {
        setBookData(response.data.data);
        setList(true);
        setGrid(false);
      } else {
        console.log('Error white fetching details');
      }
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setShowLoader(false);
    }
  };

  const searchData = async () => {
    try {
      setShowLoader(true);
      const payload = {
        search: searchText,
      };
      const response = await Search_Book_Data(payload);
      if (response && response.status === 200) {
        setBookData(response.data.data);
      } else {
        console.log('Error white fetching details');
      }
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setShowLoader(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (searchText) {
      searchData();
    } else {
      fetchBooks();
    }
  }, [searchText]);

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

  // const handleSort = () => {
  //   setSort(true);
  // };

  const handleSearch = debounce(text => {
    setSearchText(text);
  }, 200);

  const handleDetails = item => {
    dispatch(SET_BOOK_DATA(item?._id));
    navigation.navigate('details');
  };

  console.log(bookData.length)

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.searchContainer}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 60,
            flexDirection: 'row',
            gap: 20,
            paddingTop: 15,
          }}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <TextInput
              name="search"
              onChangeText={e => handleSearch(e)}
              style={styles.input}
            />
            {/* <Pressable onPress={handleSearch}> */}
            <SearchIcon
              name="search"
              color="#2C5DD1"
              size={27}
              style={{position: 'absolute', right: 10, top: 6}}
            />
            {/* </Pressable> */}
          </View>
          <TouchableOpacity style={styles.filterContainer}>
            <FilterIcon name="filter" size={30} color="white" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 22,
            paddingBottom: 8,
          }}>
          <View style={{paddingLeft: 17}}>
            <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
              Search Results
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
            <Pressable onPress={() => handleGrid()}>
              <GridIcon
                name="grid-outline"
                size={22}
                color={grid ? '#2C5DD1' : 'lightgrey'}
              />
            </Pressable>

            <Pressable onPress={() => handleList()}>
              <ListIcon
                name="format-list-checkbox"
                size={25}
                color={list ? '#2C5DD1' : 'lightgrey'}
              />
            </Pressable>

            <Pressable onPress={() => handleSort()}>
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
              {grid && (
                <View style={styles.carousel}>
                  <View style={style.popularContainer}>
                    {bookData && bookData.length > 0 && (
                      <FlatList
                        data={bookData}
                        key={2}
                        numColumns={2}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item, index}) => (
                          <Pressable
                            key={index}
                            style={styles.popularCard}
                            onPress={() => handleDetails(item)}>
                            <BookCard item={item} />
                          </Pressable>
                        )}
                        keyExtractor={item => item.id}
                      />
                    )}
                  </View>
                </View>
              )}
            </>
          }
          ListFooterComponent={
            <>
              {list && (
                <View style={styles.newbookContainer}>
                  <View>
                    {bookData && bookData.length > 0 && (
                      <FlatList
                        data={bookData}
                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item, index}) => (
                          <Pressable
                            key={index}
                            style={style.newBooks}
                            onPress={() => handleDetails(item)}>
                            <HorizontalCard item={item} />
                          </Pressable>
                        )}
                        keyExtractor={item => item.id.toString()}
                      />
                    )}
                  </View>
                </View>
              )}
            </>
          }
        />
      </View>
     {bookData.length === 0 && <View style={{position:'absolute',top:'50%',left:'25%',backgroundColor:'#2C5DD1',width:'50%',height:50,justifyContent:'center',alignItems:'center',borderRadius:30}}>
         <Text style={{color:'white',fontSize:18,fontFamily:'serif',fontWeight:'bold'}}>No Data Found</Text>
      </View>}
      {showLoader && <Loader />}
    </SafeAreaView>
  );
};

export default SearchBooks;
