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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

class InformationAScreen extends Component {
  state = {
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    jobdesk: [],
    isValidation: false,
    errMsg: '',
  };

  addJobdesk() {
    this.setState({
      jobdesk: [...this.state.jobdesk, ''],
    });
  }

  handleChange(e, index) {
    this.state.jobdesk[index] = e;
    this.setState({jobdesk: this.state.jobdesk});
  }

  handleRemove(index) {
    this.state.jobdesk.splice(index);
    this.setState({jobdesk: this.state.jobdesk});
  }

  onSubmit = async () => {
    try {
      await AsyncStorage.setItem('firstName', this.state.firstName);
      await AsyncStorage.setItem('lastName', this.state.lastName);
      await AsyncStorage.setItem('gender', this.state.gender);
      await AsyncStorage.setItem('email', this.state.email);
      const jsonValue = JSON.stringify(this.state.jobdesk);
      await AsyncStorage.setItem('jobdesk', jsonValue);
    } catch (err) {
      console.log('this error', err);
    }
  };

  getData = async () => {
    try {
      const firstName = await AsyncStorage.getItem('firstName');
      const lastName = await AsyncStorage.getItem('lastName');
      const jobdesk = await AsyncStorage.getItem('jobdesk');
      const gender = await AsyncStorage.getItem('gender');
      const email = await AsyncStorage.getItem('email');

      const dataJobdesk = jobdesk != null ? JSON.parse(jobdesk) : [];
      this.setState({
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        email: email,
        jobdesk: dataJobdesk,
      });
    } catch (e) {
      console.log('this error', e);
    }
  };

  validation = () => {
    if (this.state.firstName === null) {
      this.setState({
        isValidation: true,
        errMsg: 'Please fill your First Name!',
      });
    } else if (this.state.lastName === null) {
      this.setState({
        isValidation: true,
        errMsg: 'Please fill your Last Name!',
      });
    } else if (this.state.jobdesk.length === 0) {
      this.setState({
        isValidation: true,
        errMsg: 'Please fill your Jobdesk!',
      });
    } else if (this.state.gender === null) {
      this.setState({
        isValidation: true,
        errMsg: 'Please pick your Gender!',
      });
    } else if (this.state.email === null) {
      this.setState({
        isValidation: true,
        errMsg: 'Please fill your Email!',
      });
    } else if (!regexEmail.test(this.state.email)) {
      this.setState({
        isValidation: true,
        errMsg: 'Please fill your Email correctly!',
      });
    } else {
      this.onSubmit();
      this.props.navigation.navigate('InformationB');
    }
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const radio_props = [
      {label: 'Male    ', value: 'Male'},
      {label: 'Female', value: 'Female'},
    ];

    const {
      firstName,
      lastName,
      jobdesk,
      gender,
      email,
      errMsg,
      isValidation,
    } = this.state;
    console.log('ini ', this.state.jobdesk);
    console.log('ini gender ', this.state.gender);
    console.log('err', this.state.errMsg);
    console.log('err', this.state.isValidation);
    return (
      <ScrollView style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.titleHeader}>Information A</Text>
          <Text style={styles.titleHeader}>01</Text>
        </View>
        <View
          style={{
            // height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'white',
          }}>
          <View style={styles.containerName}>
            <View style={{width: '50%', paddingHorizontal: 10}}>
              <Text style={styles.textTitle}>First Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="First Name"
                value={firstName}
                onChangeText={(text) =>
                  this.setState({
                    firstName: text,
                  })
                }
              />
            </View>
            <View style={{width: '50%', paddingHorizontal: 10}}>
              <Text style={styles.textTitle}>Last Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Last Name"
                value={lastName}
                onChangeText={(text) =>
                  this.setState({
                    lastName: text,
                  })
                }
              />
            </View>
          </View>
          <View style={styles.containerGender}>
            <Text style={styles.textTitle}>Jobdesk</Text>
            <View>
              {this.state.jobdesk.map((jobdesk, index) => {
                return (
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      // justifyContent: 'space-between',
                    }}
                    key={index}>
                    <View style={{width: '70%'}}>
                      <TextInput
                        style={styles.textInput}
                        placeholder="Jobdesk"
                        onChangeText={(e) => this.handleChange(e, index)}
                        value={jobdesk}
                      />
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() => this.handleRemove(index)}
                        style={{marginHorizontal: 10}}>
                        <Icon name="delete" color="#ff0000" size={30} />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
            <View style={{width: '100%'}}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#FF7314',
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  // width: '50%',
                }}
                onPress={(e) => this.addJobdesk(e)}>
                <Text>Add Jobdesk</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.containerEmail}>
            <Text style={styles.textTitle}>Gender</Text>
            <View
              style={{
                paddingVertical: 10,
                backgroundColor: '#F4F4F4',
                paddingHorizontal: 10,
                borderRadius: 15,
              }}>
              <RadioForm
                radio_props={radio_props}
                initial={0}
                value={gender}
                label
                onPress={(value) => {
                  this.setState({gender: value});
                }}
                labelHorizontal={true}
                formHorizontal={true}
              />
            </View>
          </View>
          <View style={styles.containerEmail}>
            <Text style={styles.textTitle}>Email</Text>
            <TextInput
              style={styles.textInput}
              placeholder="email"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) =>
                this.setState({
                  email: text,
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
              justifyContent: 'flex-end',
              paddingVertical: 15,
            }}>
            <TouchableOpacity
              style={styles.btnNext}
              onPress={() => {
                this.validation();
              }}>
              <Text>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default InformationAScreen;

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
  containerGender: {
    width: '100%',
    backgroundColor: '#393534',
    marginTop: 10,
    padding: 5,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
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
  btnNext: {
    backgroundColor: '#FF7314',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
  },
  textValidation: {
    fontSize: 18,
    color: '#ff0000',
  },
});
