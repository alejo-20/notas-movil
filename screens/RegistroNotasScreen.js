import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { registrarNotas } from './api';

export default function RegistroNotasScreen() {
  const [cedula, setCedula] = useState('');
  const [notas, setNotas] = useState({ nota1:'', nota2:'', nota3:'', nota4:'' });

  const setNota = (k, v) => setNotas(prev => ({ ...prev, [k]: v }));

  const calcDefinitiva = () => {
    const vals = Object.values(notas).map(Number);
    if (vals.some(isNaN)) return '---';
    return (vals.reduce((a,b) => a+b, 0) / 4).toFixed(2);
  };

  const guardar = async () => {
    if (!cedula) return Alert.alert('Ingresa la cédula');
    try {
      await registrarNotas({ cedula, nota1: +notas.nota1, nota2: +notas.nota2, nota3: +notas.nota3, nota4: +notas.nota4 });
      Alert.alert('Éxito', 'Notas guardadas');
    } catch (e) {
      Alert.alert('Error', e.response?.data?.error || 'Error al guardar');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Cédula</Text>
      <TextInput style={styles.input} value={cedula} onChangeText={setCedula} placeholder="Cédula del estudiante" keyboardType="numeric"/>
      <Text style={styles.label}>Nombre</Text>
      <TextInput style={[styles.input, {backgroundColor:'#f5f5f5'}]} editable={false} placeholder="(se obtiene automáticamente)"/>
      <View style={styles.card}>
        {['nota1','nota2','nota3','nota4'].map((k,i) => (
          <View key={k} style={styles.row}>
            <Text style={styles.label}>Nota {i+1}</Text>
            <TextInput style={[styles.input, styles.notaInput]} value={notas[k]} onChangeText={v => setNota(k,v)} keyboardType="decimal-pad" placeholder="0.0"/>
          </View>
        ))}
        <View style={styles.row}>
          <Text style={[styles.label, {color:'#2a7a2a', fontWeight:'bold'}]}>Definitiva</Text>
          <Text style={[styles.notaDisplay, {color:'#2a7a2a'}]}>{calcDefinitiva()}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.btn} onPress={guardar}>
        <Text style={styles.btnText}>Guardar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1 },
  label: { fontSize: 14, marginBottom: 4, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginBottom: 10, fontSize: 14 },
  card: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 16, marginBottom: 20 },
  row: { flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom: 8 },
  notaInput: { width: 100, textAlign:'center', marginBottom: 0 },
  notaDisplay: { fontSize: 18, fontWeight:'bold' },
  btn: { backgroundColor: '#4A90D9', padding: 12, borderRadius: 8, alignItems:'center' },
  btnText: { color: '#fff', fontWeight: '600' },
});