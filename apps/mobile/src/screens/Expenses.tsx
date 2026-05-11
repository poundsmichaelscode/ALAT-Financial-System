import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { api } from '../lib/api';
export default function Expenses(){const [items,setItems]=useState<any[]>([]);useEffect(()=>{api.get('/expenses').then(r=>setItems(r.data.data.items)).catch(()=>{})},[]);return <ScrollView style={s.container}><Text style={s.title}>Expense Tracking</Text>{items.map(i=><View key={i._id} style={s.card}><Text style={s.name}>{i.title}</Text><Text style={s.text}>{i.category} · ₦{i.amount?.toLocaleString()}</Text></View>)}</ScrollView>}
const s=StyleSheet.create({container:{flex:1,backgroundColor:'#020617',padding:20},title:{color:'#fff',fontSize:26,fontWeight:'800'},card:{marginTop:14,backgroundColor:'#0f172a',padding:16,borderRadius:18},name:{color:'#fff',fontWeight:'800'},text:{color:'#94a3b8',marginTop:6}});
