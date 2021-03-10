import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import MoviesScreen from '../screens/MainScreen/Movies';
import ProfileScreen from '../screens/MainScreen/Profile';
import DetailMovie from '../screens/DetailMovieScreen';

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
      <BottomTab.Screen name="Profile" component={ProfileScreen} />
    </BottomTab.Navigator>
  );
};

const StackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Movies"
        component={MainScreenView}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailMovie"
        component={DetailMovie}
        options={({route}) => ({
          title: route.params.title,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
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
