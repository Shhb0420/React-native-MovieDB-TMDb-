import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConfirmationScreen = ({navigation}) => {
  const [getFirstName, setGetFirstName] = useState('');
  const [getLastName, setGetLastName] = useState('');
  const [getJobdesk, setGetJobdesk] = useState('');
  const [getGender, setGetGender] = useState('');
  const [getEmail, setGetEmail] = useState('');
  const [getHaveLaptop, setGetHaveLaptop] = useState('');
  const [getAddress, setGetAddress] = useState('');
  const [getPhoneNumber, setGetPhoneNumber] = useState('');

  const getData = async () => {
    try {
      const firstName = await AsyncStorage.getItem('firstName');
      const lastName = await AsyncStorage.getItem('lastName');
      const jobdesk = await AsyncStorage.getItem('jobdesk');
      const gender = await AsyncStorage.getItem('gender');
      const email = await AsyncStorage.getItem('email');
      const haveLaptop = await AsyncStorage.getItem('haveLaptop');
      const address = await AsyncStorage.getItem('address');
      const phoneNumber = await AsyncStorage.getItem('phoneNumber');
      const dataJobdesk = jobdesk != null ? JSON.parse(jobdesk).toString() : [];

      setGetFirstName(firstName);
      setGetLastName(lastName);
      setGetJobdesk(dataJobdesk);
      setGetGender(gender);
      setGetEmail(email);
      setGetHaveLaptop(haveLaptop);
      setGetAddress(address);
      setGetPhoneNumber(phoneNumber);
    } catch (e) {
      console.log('this error', e);
    }
  };

  const clearAppData = async function () {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error('Error clearing app data.');
    }
  };
  useEffect(() => {
    getData();
  });
  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.titleHeader}>Confirmation data of entry</Text>
          <Text style={styles.titleHeader}>03</Text>
        </View>
        <View style={{}}>
          <View style={styles.dataContainer}>
            <Text style={styles.labelData}>Full Name: </Text>
            <Text style={styles.dataEntry}>
              {getFirstName} {getLastName}
            </Text>
          </View>

          <View style={styles.dataContainer}>
            <Text style={styles.labelData}>Jobdesc: </Text>
            <Text style={styles.dataEntry}>{getJobdesk}</Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.labelData}>Gender: </Text>
            <Text style={styles.dataEntry}>{getGender}</Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.labelData}>Email: </Text>
            <Text style={styles.dataEntry}>{getEmail}</Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.labelData}>Have a Laptop/PC: </Text>
            <Text style={styles.dataEntry}>{getHaveLaptop}</Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.labelData}>Phone Number: </Text>
            <Text style={styles.dataEntry}>{getPhoneNumber}</Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.labelData}>Address: </Text>
            <Text style={styles.dataEntry}>{getAddress}</Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginVertical: 20,
          bottom: 0,
        }}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => navigation.goBack()}>
          <Text>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnNext}
          onPress={() => {
            clearAppData();
            navigation.push('RegisterDone');
          }}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    padding: 10,
    backgroundColor: '#22211F',
  },
  containerName: {
    width: '100%',
    backgroundColor: '#393534',
    padding: 5,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  containerEmail: {
    width: '100%',
    backgroundColor: '#393534',
    marginTop: 10,
    padding: 5,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  dataContainer: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 2,
  },
  labelData: {
    color: '#F4F4F4',
    width: '45%',
    fontSize: 18,
  },
  dataEntry: {
    width: '55%',
    color: '#F4F4F4',
    fontSize: 18,
  },
  titleHeader: {
    color: '#F4F4F4',
    fontSize: 20,
    marginBottom: 20,
  },
  textTitle: {
    fontSize: 18,
    color: '#F4F4F4',
  },
  textInput: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#F4F4F4',
    // color: '#F4F4F4',
  },
  inputReview: {
    width: '100%',
    height: 100,
    borderRadius: 15,
    borderWidth: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    backgroundColor: '#F4F4F4',
    marginVertical: 15,
  },
  btnNext: {
    backgroundColor: '#FF7314',
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 10,
  },
  btnBack: {
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 10,
  },
});
