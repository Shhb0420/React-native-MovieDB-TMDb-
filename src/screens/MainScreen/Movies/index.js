import React, {useEffect} from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {
  fetchAllMovie,
  fetchAllMoviePopular,
  fetchAllMovieWatch,
  fetchAllMovieDisplay,
} from '../../../utils/redux/actions/movie';
import {useDispatch, useSelector} from 'react-redux';
import {Text} from '../../../components';
import {API_IMAGE} from '@env';

const Movies = ({navigation}) => {
  const dispatch = useDispatch();
  const {
    movie: stateMovie,
    popular: statePopular,
    watch: stateWatch,
    display: stateDisplay,
    isPending,
  } = useSelector((state) => state.movie);
  const urlPoster = API_IMAGE;

  useEffect(() => {
    dispatch(fetchAllMovie());
    dispatch(fetchAllMoviePopular());
    dispatch(fetchAllMovieWatch());
    dispatch(fetchAllMovieDisplay());
  }, [dispatch]);

  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{marginTop: '12%'}}
        key={item.id}
        onPress={() =>
          navigation.navigate('DetailMovie', {
            itemId: item.id,
            title: item.original_title,
          })
        }>
        <Image
          source={{uri: `${urlPoster}${item.poster_path}`}}
          resizeMode="stretch"
          style={{
            borderRadius: 10,
            width: '100%',
            height: 250,
          }}
        />
      </TouchableOpacity>
    );
  };
  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="#393534"
      />
      <ScrollView
        vertical={true}
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <View>
          <Carousel
            data={stateDisplay}
            renderItem={_renderItem}
            sliderWidth={width}
            itemWidth={280 + 20 * 2}
          />
        </View>

        <View style={styles.wrapContainer}>
          <View style={styles.wrapTitleText}>
            <Text
              children="What's Popular"
              size="xl3"
              color="white"
              style={styles.titeText}
            />
            <Text
              children="See All"
              size="m"
              color="white"
              style={styles.childText}
            />
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.slider}>
            {statePopular &&
              statePopular.map(
                ({
                  id,
                  poster_path,
                  original_title,
                  vote_average,
                  release_date,
                }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('DetailMovie', {
                          itemId: id,
                          title: original_title,
                        })
                      }
                      style={{paddingHorizontal: 5}}
                      key={id}>
                      <Image
                        source={{uri: `${urlPoster}${poster_path}`}}
                        style={{
                          borderRadius: 10,
                          width: 150,
                          height: 250,
                        }}
                      />
                    </TouchableOpacity>
                  );
                },
              )}
          </ScrollView>
        </View>

        <View style={styles.wrapContainer}>
          <View style={styles.wrapTitleText}>
            <Text
              children="Trending"
              size="xl3"
              color="white"
              style={styles.titeText}
            />
            <Text
              children="See All"
              size="m"
              color="white"
              style={styles.childText}
            />
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.slider}>
            {stateMovie &&
              stateMovie.map(
                ({
                  id,
                  poster_path,
                  original_title,
                  vote_average,
                  release_date,
                }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('DetailMovie', {
                          itemId: id,
                          title: original_title,
                        })
                      }
                      style={{paddingHorizontal: 5}}
                      key={id}>
                      <Image
                        source={{uri: `${urlPoster}${poster_path}`}}
                        style={{
                          borderRadius: 10,
                          width: 150,
                          height: 250,
                        }}
                      />
                    </TouchableOpacity>
                  );
                },
              )}
          </ScrollView>
        </View>

        <View style={styles.wrapContainer}>
          <View style={styles.wrapTitleText}>
            <Text
              children="Coming Soon"
              size="xl3"
              color="white"
              style={styles.titeText}
            />
            <Text
              children="See All"
              size="m"
              color="white"
              style={styles.childText}
            />
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.slider}>
            {stateWatch &&
              stateWatch.map(
                ({
                  id,
                  poster_path,
                  original_title,
                  vote_average,
                  release_date,
                }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('DetailMovie', {
                          itemId: id,
                          title: original_title,
                        })
                      }
                      style={{paddingHorizontal: 5}}
                      key={id}>
                      <Image
                        source={{uri: `${urlPoster}${poster_path}`}}
                        style={{
                          borderRadius: 10,
                          width: 150,
                          height: 250,
                        }}
                      />
                    </TouchableOpacity>
                  );
                },
              )}
          </ScrollView>
        </View>
      </ScrollView>
    </>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  Search: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  form: {
    width: '100%',
  },
  scrollMovie: {
    width: '100%',
    height: '100%',
    backgroundColor: '#22211F',
    // margin: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F4F4F4',
    marginVertical: 10,
  },
  cardPopular: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#393534',
    marginVertical: 5,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 20,
    color: '#F4F4F4',
    flexWrap: 'wrap',
  },
  childText: {
    paddingTop: '5%',
  },
  container: {
    width,
    height,
    backgroundColor: '#393534',
  },
  button: {
    margin: 10,
  },
  titeText: {
    fontWeight: 'bold',
  },
  wrapTitleText: {
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  slider: {
    // marginTop: '3%',
    flexDirection: 'row',
  },
  wrapContainer: {
    marginHorizontal: '2%',
    marginVertical: '2%',
  },
});

export default Movies;
