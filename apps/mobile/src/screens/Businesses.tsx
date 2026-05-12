import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { api } from '../lib/api';
export default function Businesses(){
  const [items,setItems]=useState<any[]>([]); const [name,setName]=useState(''); const [industry,setIndustry]=useState('');
  async function load(){try{const r=await api.get('/businesses');setItems(r.data.data||[])}catch{}}
  useEffect(()=>{load()},[]);
  async function add(){if(!name)return; await api.post('/businesses',{name,industry,currency:'NGN'}); setName(''); setIndustry(''); load();}
  return <ScrollView style={s.container}><Text style={s.title}>Businesses</Text><View style={s.form}><TextInput placeholder="Business name" placeholderTextColor="#64748b" value={name} onChangeText={setName} style={s.input}/><TextInput placeholder="Industry" placeholderTextColor="#64748b" value={industry} onChangeText={setIndustry} style={s.input}/><Pressable onPress={add} style={s.btn}><Text style={s.btnText}>Add Business</Text></Pressable></View>{items.map(i=><View key={i._id} style={s.card}><Text style={s.name}>{i.name}</Text><Text style={s.text}>{i.industry || 'No industry'} · {i.currency}</Text></View>)}</ScrollView>}
const s=StyleSheet.create({container:{flex:1,backgroundColor:'#170C79',padding:20},title:{color:'#fff',fontSize:26,fontWeight:'800'},form:{marginTop:16,gap:10},input:{backgroundColor:'rgba(255,255,255,0.10)',color:'#fff',padding:14,borderRadius:16},btn:{backgroundColor:'#56B6C6',padding:14,borderRadius:16,alignItems:'center'},btnText:{fontWeight:'900',color:'#170C79'},card:{marginTop:14,backgroundColor:'rgba(255,255,255,0.10)',padding:16,borderRadius:18},name:{color:'#fff',fontWeight:'800'},text:{color:'#EFE3CA',marginTop:6}});
