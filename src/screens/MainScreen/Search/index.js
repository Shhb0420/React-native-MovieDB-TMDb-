import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {API_URL, API_KEY, API_IMAGE} from '@env';
import {FlatGrid} from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/EvilIcons';
import {colors} from '../../../utils';

const Search = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState([]);
  const [isNotFoundSearch, setIsNotFoundSearch] = useState(false);

  const searching = () => {
    axios
      .get(
        `${API_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${search}&page=1&include_adult=false`,
      )
      .then((res) => {
        const item = res.data.results;
        setIsSearching(item);
        setIsNotFoundSearch(false);
      })
      .catch((err) => {
        setIsNotFoundSearch(true);
        console.log(err);
      });
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="#393534"
      />
      <View style={styles.container}>
        <View style={styles.Search}>
          <TouchableOpacity
            onPress={() => {
              searching();
            }}>
            <Icon name="search" color={colors.black} size={30} />
          </TouchableOpacity>
          <TextInput
            placeholder="Search"
            value={search}
            onChangeText={(search) => setSearch(search)}
            style={styles.form}
            onSubmitEditing={() => {
              searching();
            }}
          />
        </View>
        {isNotFoundSearch === false ? (
          <FlatGrid
            itemDimension={130}
            data={isSearching}
            style={styles.gridView}
            spacing={10}
            renderItem={({item}) => (
              <ScrollView>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('DetailMovie', {
                      itemId: item.id,
                      title: item.original_title,
                    })
                  }>
                  <View
                    style={[
                      styles.itemContainer,
                      {backgroundColor: '#393534'},
                    ]}>
                    {item.poster_path && item.backdrop_path === null ? (
                      <ActivityIndicator
                        size="large"
                        color="#00ff00"
                        style={{
                          width: '100%',
                          height: 250,
                        }}
                      />
                    ) : item.poster_path !== null ? (
                      <Image
                        source={{
                          uri: `${API_IMAGE}${item.poster_path}`,
                        }}
                        style={{
                          borderRadius: 10,
                          width: '100%',
                          height: '100%',
                        }}
                        resizeMode="contain"
                      />
                    ) : (
                      <Image
                        source={{
                          uri: `${API_IMAGE}${item.backdrop_path}`,
                        }}
                        style={{
                          borderRadius: 10,
                          width: '100%',
                          height: '100%',
                        }}
                        resizeMode="contain"
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </ScrollView>
            )}
          />
        ) : (
          <View
            style={{
              width: '100%',
              height: '100%',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../../assets/Image/no-product-found.png')}
              style={{width: 150, height: 150}}
            />
            <Text style={{fontSize: 20}}>Oops, your movie not found!</Text>
          </View>
        )}
      </View>
    </>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#393534',
    height,
    paddingHorizontal: 20,
  },
  Search: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10%',
    paddingHorizontal: '10%',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  form: {
    width: '100%',
  },

  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    // justifyContent: 'flex-end',
    borderRadius: 10,
    padding: 10,
    height: 180,
  },
  itemName: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '600',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#000000',
  },
});

export default Search;
