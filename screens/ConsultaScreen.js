import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { consultarEstudiante } from './api';

export default function ConsultaScreen() {
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [resultado, setResultado] = useState(null);

  const consultar = async () => {
    if (!cedula) return Alert.alert('Ingresa una cédula');
    try {
      const { data } = await consultarEstudiante(cedula);
      setResultado(data);
    } catch {
      Alert.alert('Error', 'Estudiante no encontrado');
      setResultado(null);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Cédula</Text>
      <TextInput style={styles.input} value={cedula} onChangeText={setCedula} placeholder="Ingresa cédula" keyboardType="numeric"/>
      <Text style={styles.label}>Nombre</Text>
      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} placeholder="Nombre (opcional)"/>
      <TouchableOpacity style={styles.btn} onPress={consultar}>
        <Text style={styles.btnText}>Consultar</Text>
      </TouchableOpacity>
      {resultado && (
        <View style={styles.card}>
          <Text style={styles.cardText}>Materia: {resultado.materia}</Text>
          <Text style={styles.cardText}>Nota 1: {resultado.nota1 ?? 'N/A'}</Text>
          <Text style={styles.cardText}>Nota 2: {resultado.nota2 ?? 'N/A'}</Text>
          <Text style={styles.cardText}>Nota 3: {resultado.nota3 ?? 'N/A'}</Text>
          <Text style={styles.cardText}>Nota 4: {resultado.nota4 ?? 'N/A'}</Text>
          <Text style={[styles.cardText, styles.definitiva]}>Definitiva: {resultado.definitiva ?? 'N/A'}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1 },
  label: { fontSize: 14, marginBottom: 4, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginBottom: 14, fontSize: 14 },
  btn: { backgroundColor: '#4A90D9', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  btnText: { color: '#fff', fontWeight: '600' },
  card: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 16 },
  cardText: { fontSize: 14, marginBottom: 6, color: '#333' },
  definitiva: { fontWeight: 'bold', fontSize: 16, color: '#2a7a2a' },
});