import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, ScrollView, Dimensions} from 'react-native';
import {Text} from '../../components';
import {getMovieById} from '../../utils/redux/actions/movie';
import {useDispatch, useSelector} from 'react-redux';
import {API_IMAGE} from '@env';

const DetailMovie = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {itemId} = route.params;

  const [opacity, setOpacity] = useState(1);
  const [blur, setBlur] = useState(0);

  const {movieDetail: item, isPending} = useSelector((state) => state.movie);

  let handleOnScroll = (e) => {
    const yOffset = e.nativeEvent.contentOffset.y;
    const blurConstant = 10;
    const xOffset = marginTop.height / marginTop.goldenRatio;

    if (yOffset > xOffset) {
      setOpacity(0);
      setBlur(blurConstant);
    } else {
      const opacity = 1 - yOffset / xOffset;
      const blur = parseInt((yOffset * blurConstant) / xOffset, 10);
      setOpacity(opacity);
      setBlur(blur);
    }
    return;
  };

  useEffect(() => {
    dispatch(getMovieById(itemId));
  }, [itemId]);
  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <Image
            source={{uri: `${API_IMAGE}${item.backdrop_path}`}}
            resizeMode="stretch"
            style={{
              width: '100%',
              height: 250,
            }}
            opacity={opacity}
            blur={blur}
          />
          <Text style={styles.titleText} children={item.title} />
          <Text
            style={styles.textTitle}
            children={`${item.title} (${new Date(
              item.release_date,
            ).getFullYear()})`}
          />
        </ScrollView>
      </View>
    </>
  );
};

export default DetailMovie;

const {width, height} = Dimensions.get('window');
const marginTop = {
  height: height - 54 * 2,
  goldenRatio: 1.618,
};

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
    paddingLeft: '3%',
    fontSize: 30,
  },
});
