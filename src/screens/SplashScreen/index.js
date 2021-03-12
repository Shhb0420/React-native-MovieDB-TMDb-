import React, {useEffect} from 'react';
import {View, Image, StyleSheet, StatusBar} from 'react-native';
import LogoSplash from '../../assets/Image/launch_screen.png';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Movie');
    }, 3000);
  }, [navigation]);
  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="#011347"
      />
      <View style={styles.background}>
        <Image source={LogoSplash} />
      </View>
    </>
  );
};

export default Splash;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#011347',
  },
});
