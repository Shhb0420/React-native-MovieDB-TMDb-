import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import MoviesScreen from '../screens/MainScreen/Movies';
import ProfileScreen from '../screens/MainScreen/Profile';
import SearchScreen from '../screens/MainScreen/Search';
import DetailMovie from '../screens/DetailMovieScreen';
import InformationAScreen from '../screens/AuthScreen/Register/InformationA';
import InformationBScreen from '../screens/AuthScreen/Register/InformationB';
import ConfirmationScreen from '../screens/AuthScreen/Register/Confirmation';
import RegisterDoneScreen from '../screens/AuthScreen/Register/RegisterDone';
import SplashScreen from '../screens/SplashScreen';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const MainScreenView = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Movies') {
            iconName = focused ? 'movie-open' : 'movie-open-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account-circle' : 'account-circle-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search-web' : 'search-web';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        style: {
          backgroundColor: '#393534',
          paddingBottom: 5,
          paddingTop: 5,
          elevation: 10,
        },
        activeTintColor: 'white',
        inactiveTintColor: 'gray',
      }}>
      <BottomTab.Screen name="Movies" component={MoviesScreen} />
      <BottomTab.Screen name="Search" component={SearchScreen} />
      <BottomTab.Screen name="Profile" component={ProfileScreen} />
    </BottomTab.Navigator>
  );
};

// console.log('ROUTE', MainScreenView());

const StackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        initialRouteName="Splash"
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Movie"
        component={MainScreenView}
        options={{headerShown: false}}
        // options={({route}) => ({
        //   title: route.name,
        //   headerTitleStyle: {
        //     fontWeight: 'bold',
        //     textAlign: 'center',
        //     width: '90%',
        //   },
        //   headerStyle: {
        //     backgroundColor: '#393534',
        //   },
        //   headerTintColor: 'white',
        // })}
      />
      <Stack.Screen
        name="DetailMovie"
        component={DetailMovie}
        options={({route}) => ({
          title: route.params.title,
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
            width: '90%',
          },
          headerStyle: {
            backgroundColor: '#393534',
          },
          headerTintColor: 'white',
        })}
      />
      <Stack.Screen
        name="InformationA"
        component={InformationAScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="InformationB"
        component={InformationBScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Confirmation"
        component={ConfirmationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RegisterDone"
        component={RegisterDoneScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export const MainNavigation = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};
