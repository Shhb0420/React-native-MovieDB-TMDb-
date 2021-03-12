import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const Profile = ({navigation}) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.title}>
          <TouchableOpacity
            style={styles.btnSignIn}
            onPress={() => navigation.navigate('InformationA')}>
            <Text style={{color: '#F4F4F4'}}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Profile;

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: '#393534',
  },
  title: {
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '50%',
  },
  text: {
    color: '#F4F4F4',
    fontSize: 18,
    fontWeight: '700',
  },
  btnSignIn: {
    backgroundColor: '#FF7314',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
  },
});
