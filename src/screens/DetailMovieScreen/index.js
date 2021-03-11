import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, ScrollView, Dimensions} from 'react-native';
import {Text} from '../../components';
import {getMovieById, getVideoById} from '../../utils/redux/actions/movie';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {WebView} from 'react-native-webview';
import {API_IMAGE} from '@env';

const DetailMovie = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [url, setUrl] = useState('');
  const {itemId} = route.params;

  const {movieDetail: item, video: youtube, isPending} = useSelector(
    (state) => state.movie,
  );
  console.log('VIDEO', youtube);

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
  }, [itemId]);
  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          {/* <Image
            source={{uri: `${API_IMAGE}${item.backdrop_path}`}}
            resizeMode="stretch"
            style={{
              width: '100%',
              height: 250,
            }}
          /> */}
          <WebView
            style={{
              width: '100%',
              height: 250,
              paddingHorizontal: '5%',
            }}
            javaScriptEnabled
            domStorageEnabled
            allowsInlineMediaPlayback
            mediaPlaybackRequiresUserAction={false}
            source={{uri: url}}
          />
          {/* <Text style={styles.titleText} children={item.title} />
          <Text
            style={styles.textTitle}
            children={`${new Date(item.release_date).getFullYear()}`}
          />
          <Text style={styles.overview} children={item.overview} /> */}
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 15,
            }}>
            <View style={{width: '30%'}}>
              <Image
                source={{uri: `${API_IMAGE}${item.poster_path}`}}
                style={{width: '100%', height: 150}}
              />
            </View>
            <View style={{width: '70%', marginHorizontal: 10}}>
              <Text style={styles.title}>{item.title}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.detail}>Release {item.release_date}</Text>
                <View style={{flexDirection: 'row', marginHorizontal: 20}}>
                  <Icon name="star" color="#ffd700" size={20} />
                  <Text style={styles.detail}>{item.vote_average}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{marginVertical: 10}}>
            <Text style={styles.desc}>{item.overview}</Text>
          </View>
        </ScrollView>
      </View>
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
  absoluteImage: {},
  titleText: {
    color: '#F4F4F4',
    position: 'absolute',
    paddingVertical: '50%',
    paddingLeft: '5%',
    fontSize: 25,
  },
  textTitle: {
    color: '#F4F4F4',
    marginHorizontal: '3%',
    fontSize: 20,
  },
  overview: {
    color: '#f4f4f4',
    fontSize: 20,
    marginVertical: '3%',
    marginHorizontal: '3%',
  },
});
