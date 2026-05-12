import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { api } from '../lib/api';
const money=(n:number)=>`₦${Number(n||0).toLocaleString()}`;
export default function Receipts(){
  const [items,setItems]=useState<any[]>([]); const [paidBy,setPaidBy]=useState(''); const [amount,setAmount]=useState('');
  async function load(){try{const r=await api.get('/receipts');setItems(r.data.data||[])}catch{}}
  useEffect(()=>{load()},[]);
  async function add(){if(!paidBy||Number(amount)<=0)return; await api.post('/receipts',{paidBy,amount:Number(amount),paymentMethod:'Bank Transfer'}); setPaidBy(''); setAmount(''); load();}
  return <ScrollView style={s.container}><Text style={s.title}>Receipts</Text><View style={s.form}><TextInput placeholder="Customer name" placeholderTextColor="#64748b" value={paidBy} onChangeText={setPaidBy} style={s.input}/><TextInput placeholder="Amount paid" placeholderTextColor="#64748b" value={amount} onChangeText={setAmount} keyboardType="numeric" style={s.input}/><Pressable onPress={add} style={s.btn}><Text style={s.btnText}>Create Receipt</Text></Pressable></View>{items.map(i=><View key={i._id} style={s.card}><Text style={s.name}>{i.receiptNumber}</Text><Text style={s.text}>{i.paidBy} · {money(i.amount)} · {i.paymentMethod}</Text></View>)}</ScrollView>}
const s=StyleSheet.create({container:{flex:1,backgroundColor:'#170C79',padding:20},title:{color:'#fff',fontSize:26,fontWeight:'800'},form:{marginTop:16,gap:10},input:{backgroundColor:'rgba(255,255,255,0.10)',color:'#fff',padding:14,borderRadius:16},btn:{backgroundColor:'#56B6C6',padding:14,borderRadius:16,alignItems:'center'},btnText:{fontWeight:'900',color:'#170C79'},card:{marginTop:14,backgroundColor:'rgba(255,255,255,0.10)',padding:16,borderRadius:18},name:{color:'#fff',fontWeight:'800'},text:{color:'#EFE3CA',marginTop:6}});
