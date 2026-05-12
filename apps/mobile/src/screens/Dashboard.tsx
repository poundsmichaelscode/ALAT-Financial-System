import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { api } from '../lib/api';
export default function Dashboard(){
 const [data,setData]=useState<any>();
 useEffect(()=>{api.get('/dashboard/summary').then(r=>setData(r.data.data)).catch(()=>{})},[]);
 return <ScrollView style={s.container}><Text style={s.title}>ALAT Dashboard</Text><Text style={s.sub}>Real-time income, expenses, payroll and AI insights.</Text>{data && <><View style={s.card}><Text style={s.label}>Income</Text><Text style={s.value}>₦{data.totalIncome?.toLocaleString()}</Text></View><View style={s.card}><Text style={s.label}>Expenses</Text><Text style={s.value}>₦{data.totalExpenses?.toLocaleString()}</Text></View><View style={s.card}><Text style={s.label}>AI Recommendation</Text><Text style={s.text}>{data.aiRecommendation}</Text></View></>}</ScrollView>
}
const s=StyleSheet.create({container:{flex:1,backgroundColor:'#170C79',padding:20},title:{color:'#fff',fontSize:28,fontWeight:'800'},sub:{color:'#EFE3CA',marginTop:8},card:{marginTop:16,backgroundColor:'rgba(255,255,255,0.10)',padding:18,borderRadius:20},label:{color:'#EFE3CA'},value:{color:'#fff',fontSize:26,fontWeight:'800',marginTop:8},text:{color:'#EFE3CA',marginTop:8}});
