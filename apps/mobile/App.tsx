import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { store } from './src/store';
import Dashboard from './src/screens/Dashboard';
import Expenses from './src/screens/Expenses';
import Invoices from './src/screens/Invoices';
import Receipts from './src/screens/Receipts';
import Businesses from './src/screens/Businesses';
import Assistant from './src/screens/Assistant';
const Tab = createBottomTabNavigator();
const theme = { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: '#170C79', primary: '#56B6C6', card: '#170C79', text: '#EFE3CA', border: 'rgba(255,255,255,.12)' } };
export default function App(){return <Provider store={store}><NavigationContainer theme={theme}><Tab.Navigator screenOptions={{headerStyle:{backgroundColor:'#170C79'},headerTintColor:'#EFE3CA',tabBarStyle:{backgroundColor:'#170C79',borderTopColor:'rgba(255,255,255,.12)'},tabBarActiveTintColor:'#8ACBD0',tabBarInactiveTintColor:'#EFE3CA'}}><Tab.Screen name="Dashboard" component={Dashboard}/><Tab.Screen name="Expenses" component={Expenses}/><Tab.Screen name="Invoices" component={Invoices}/><Tab.Screen name="Receipts" component={Receipts}/><Tab.Screen name="Business" component={Businesses}/><Tab.Screen name="AI" component={Assistant}/></Tab.Navigator></NavigationContainer></Provider>}
