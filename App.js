import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import ConsultaScreen from './screens/ConsultaScreen';
import RegistroEstudianteScreen from './screens/RegistroEstudianteScreen';
import RegistroNotasScreen from './screens/RegistroNotasScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#4A90D9',
          tabBarInactiveTintColor: '#999',
          tabBarStyle: { backgroundColor: '#fff' },
        }}
      >
        <Tab.Screen
          name="Consulta"
          component={ConsultaScreen}
          options={{ tabBarLabel: 'consulta', tabBarIcon: () => <Text>🔍</Text> }}
        />
        <Tab.Screen
          name="Reg. Estudiante"
          component={RegistroEstudianteScreen}
          options={{ tabBarLabel: 'reg. estud', tabBarIcon: () => <Text>👤</Text> }}
        />
        <Tab.Screen
          name="Reg. Notas"
          component={RegistroNotasScreen}
          options={{ tabBarLabel: 'reg. nota', tabBarIcon: () => <Text>📝</Text> }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}