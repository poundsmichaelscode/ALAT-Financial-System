import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { api } from '../lib/api';
const money=(n:number)=>`₦${Number(n||0).toLocaleString()}`;
export default function Invoices(){
  const [items,setItems]=useState<any[]>([]); const [client,setClient]=useState(''); const [service,setService]=useState(''); const [amount,setAmount]=useState('');
  async function load(){try{const r=await api.get('/invoices');setItems(r.data.data.items||[])}catch{}}
  useEffect(()=>{load()},[]);
  async function add(){if(!client||!service)return; await api.post('/invoices',{clientName:client,status:'pending',items:[{description:service,quantity:1,unitPrice:Number(amount)}]}); setClient(''); setService(''); setAmount(''); load();}
  return <ScrollView style={s.container}><Text style={s.title}>Invoices</Text><View style={s.form}><TextInput placeholder="Client name" placeholderTextColor="#64748b" value={client} onChangeText={setClient} style={s.input}/><TextInput placeholder="Product/service" placeholderTextColor="#64748b" value={service} onChangeText={setService} style={s.input}/><TextInput placeholder="Amount" placeholderTextColor="#64748b" value={amount} onChangeText={setAmount} keyboardType="numeric" style={s.input}/><Pressable onPress={add} style={s.btn}><Text style={s.btnText}>Create Invoice</Text></Pressable></View>{items.map(i=><View key={i._id} style={s.card}><Text style={s.name}>{i.invoiceNumber}</Text><Text style={s.text}>{i.clientName} · {money(i.total)} · {i.status}</Text></View>)}</ScrollView>}
const s=StyleSheet.create({container:{flex:1,backgroundColor:'#170C79',padding:20},title:{color:'#fff',fontSize:26,fontWeight:'800'},form:{marginTop:16,gap:10},input:{backgroundColor:'rgba(255,255,255,0.10)',color:'#fff',padding:14,borderRadius:16},btn:{backgroundColor:'#56B6C6',padding:14,borderRadius:16,alignItems:'center'},btnText:{fontWeight:'900',color:'#170C79'},card:{marginTop:14,backgroundColor:'rgba(255,255,255,0.10)',padding:16,borderRadius:18},name:{color:'#fff',fontWeight:'800'},text:{color:'#EFE3CA',marginTop:6}});
