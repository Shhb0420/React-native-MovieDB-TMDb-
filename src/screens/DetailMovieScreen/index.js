import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {Text} from '../../components';
import {
  getMovieById,
  getVideoById,
  fetchAllMoviePopular,
} from '../../utils/redux/actions/movie';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {WebView} from 'react-native-webview';
import {API_IMAGE} from '@env';

const DetailMovie = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [url, setUrl] = useState('');
  const {itemId} = route.params;

  const {
    movieDetail: item,
    video: youtube,
    popular: statePopular,
    isPending,
  } = useSelector((state) => state.movie);

  useEffect(() => {
    let filteredVideos = '';
    youtube.forEach((video) => {
      if (video.site === 'YouTube') {
        filteredVideos += `https://www.youtube.com/embed/${video.key}?&autoplay=1`;
      }
    });

    setUrl(filteredVideos);
  }, [youtube, url, setUrl]);

  useEffect(() => {
    dispatch(getMovieById(itemId));
    dispatch(getVideoById(itemId));
    dispatch(fetchAllMoviePopular());
  }, [itemId]);
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {isPending ? (
            <ActivityIndicator
              size="large"
              color="#00ff00"
              style={{
                width: '100%',
                height: 250,
              }}
            />
          ) : (
            <WebView
              style={{
                width: '100%',
                height: 250,
              }}
              javaScriptEnabled
              domStorageEnabled
              allowsInlineMediaPlayback
              mediaPlaybackRequiresUserAction={false}
              source={{uri: url}}
            />
          )}
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              marginHorizontal: '3%',
              marginVertical: 15,
            }}>
            <View style={{width: '30%'}}>
              {isPending ? (
                <ActivityIndicator
                  size="large"
                  color="#00ff00"
                  style={{
                    width: '100%',
                    height: 250,
                  }}
                />
              ) : (
                <Image
                  source={{uri: `${API_IMAGE}${item.backdrop_path}`}}
                  style={{
                    width: '100%',
                    height: 150,
                    borderRadius: 10,
                  }}
                />
              )}
            </View>
            <View style={{width: '70%', marginHorizontal: 10}}>
              <Text style={styles.titleText} children={item.title} />
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.detail}>Release {item.release_date}</Text>
                <View style={{flexDirection: 'row', marginHorizontal: 20}}>
                  <Icon name="star" color="#ffd700" size={20} />
                  <Text style={styles.detail}>{item.vote_average}</Text>
                </View>
              </View>
              <Text
                children={`${item.runtime} Minutes`}
                style={styles.textTitle}
              />
            </View>
          </View>
          <View>
            <Text style={styles.overview}>{item.overview}</Text>
          </View>
          <View style={styles.wrapContainer}>
            <View style={styles.wrapTitleText}>
              <Text
                children="Popular"
                size="xl3"
                color="white"
                style={styles.titeText}
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
                        {isPending ? (
                          <ActivityIndicator
                            size="large"
                            color="#00ff00"
                            style={{
                              width: '100%',
                              height: 250,
                            }}
                          />
                        ) : (
                          <Image
                            source={{uri: `${API_IMAGE}${poster_path}`}}
                            style={{
                              borderRadius: 10,
                              width: 150,
                              height: 250,
                            }}
                          />
                        )}
                      </TouchableOpacity>
                    );
                  },
                )}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default DetailMovie;

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height,
    width,
    backgroundColor: '#393534',
  },
  detail: {
    color: '#F4F4F4',
    fontSize: 16,
    fontWeight: '800',
  },
  titleText: {
    color: '#F4F4F4',
    fontWeight: '800',
    paddingVertical: '3%',
    fontSize: 20,
  },
  textTitle: {
    color: '#F4F4F4',
    fontSize: 15,
  },
  overview: {
    color: '#f4f4f4',
    fontSize: 15,
    marginHorizontal: '3%',
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
    marginVertical: '5%',
  },
});
