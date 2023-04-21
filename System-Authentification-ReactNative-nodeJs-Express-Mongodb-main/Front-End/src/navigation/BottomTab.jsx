import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Sensor from '../screens/Sensor';
import Lecturas from '../screens/Lecturas';
import Icon from "react-native-vector-icons/Ionicons"
import { colores } from '../theme/theme';
import HomeScreen from '../screens/Homescreen';

const Tab = createMaterialBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      activeColor={colores.cinco}
      inactiveColor={colores.dos}
      barStyle={{backgroundColor: colores.uno}}
    >
      <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel:'Home',
        tabBarIcon: () => (
          <Icon name="home" color={colores.tres} size={26}/>
        )
        
      }}
      />
      <Tab.Screen 
      name="Sensor" 
      component={Sensor}
      options={{
        tabBarLabel:'Agregar Sensor',
        tabBarIcon: () => (
          <Icon name="add-circle" color={colores.tres} size={26}/>
        )
      }} 
      />
      <Tab.Screen 
      name="Lecturas" 
      component={Lecturas}
      options={{
        tabBarLabel:'Mostrar Lecturas',
        tabBarIcon: () => (
          <Icon name="bar-chart" color={colores.tres} size={26}/>
        )
      }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
