import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import AsyncStorage from '@react-native-async-storage/async-storage';

class InformationBScreen extends Component {
  state = {
    haveLaptop: '',
    address: '',
    phoneNumber: '',
    isValidation: false,
    errMsg: '',
  };

  onSubmit = async () => {
    try {
      await AsyncStorage.setItem('haveLaptop', this.state.haveLaptop);
      await AsyncStorage.setItem('address', this.state.address);
      await AsyncStorage.setItem('phoneNumber', this.state.phoneNumber);
    } catch (err) {
      console.log('this error', err);
    }
  };
  getData = async () => {
    try {
      const haveLaptop = await AsyncStorage.getItem('haveLaptop');
      const address = await AsyncStorage.getItem('address');
      const phoneNumber = await AsyncStorage.getItem('phoneNumber');
      this.setState({
        haveLaptop: haveLaptop,
        address: address,
        phoneNumber: phoneNumber,
      });
    } catch (e) {
      console.log('this error', e);
    }
  };

  validation = () => {
    if (this.state.haveLaptop === null) {
      this.setState({
        isValidation: true,
        errMsg: 'Please pick have a Laptop/PC!',
      });
    } else if (this.state.address === null) {
      this.setState({
        isValidation: true,
        errMsg: 'Please fill your address!',
      });
    } else if (this.state.phoneNumber === null) {
      this.setState({
        isValidation: true,
        errMsg: 'Please fill your phone number!',
      });
    } else {
      this.onSubmit();
      this.setState({
        errMsg: '',
      });
      this.props.navigation.navigate('Confirmation');
    }
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const radio_props = [
      {label: 'Yes    ', value: 'Yes'},
      {label: 'No', value: 'No'},
    ];

    const {haveLaptop, address, phoneNumber, isValidation, errMsg} = this.state;
    console.log('ini ', this.state.address);
    console.log('ini ', this.state.haveLaptop);
    console.log('ini ', this.state.phoneNumber);

    return (
      <ScrollView style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.titleHeader}>Information B</Text>
          <Text style={styles.titleHeader}>02</Text>
        </View>

        <View style={styles.containerEmail}>
          <Text style={styles.textTitle}>Have a Laptop/PC?</Text>
          <View
            style={{
              paddingVertical: 10,
              backgroundColor: '#F4F4F4',
              paddingHorizontal: 10,
              borderRadius: 15,
            }}>
            <RadioForm
              radio_props={radio_props}
              initial={haveLaptop == 1 ? 1 : 0}
              value={haveLaptop}
              onPress={(value) => {
                this.setState({haveLaptop: value});
              }}
              labelHorizontal={true}
              formHorizontal={true}
            />
          </View>
        </View>
        <View style={styles.containerEmail}>
          <Text style={styles.textTitle}>Address</Text>
          <View style={styles.inputReview}>
            <TextInput
              style={{width: '100%', fontSize: 18}}
              multiline={true}
              placeholder="Address"
              value={address}
              onChangeText={(text) =>
                this.setState({
                  address: text,
                })
              }
            />
          </View>
        </View>
        <View style={styles.containerEmail}>
          <Text style={styles.textTitle}>Phone Number</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={(text) =>
              this.setState({
                phoneNumber: text,
              })
            }
          />
        </View>
        {isValidation === true ? (
          <Text style={styles.textValidation}>{errMsg}</Text>
        ) : null}
        <View
          style={{
            width: '80%',
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <TouchableOpacity
            style={styles.btnBack}
            onPress={() => this.props.navigation.goBack()}>
            <Text>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnNext}
            onPress={() => {
              this.validation();
            }}>
            <Text>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

export default InformationBScreen;

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
  // textInputArea: {
  //   width: '100%',
  //   height: 100,
  //   borderRadius: 10,
  //   borderWidth: 1,
  //   paddingHorizontal: 10,
  //   marginVertical: 10,
  //   backgroundColor: '#F4F4F4',
  //   // color: '#F4F4F4',
  // },
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
  textValidation: {
    fontSize: 18,
    color: '#ff0000',
    alignSelf: 'center',
  },
});
