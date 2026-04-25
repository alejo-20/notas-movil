import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { registrarEstudiante } from './api';

export default function RegistroEstudianteScreen() {
  const [form, setForm] = useState({ cedula:'', nombre:'', correo:'', celular:'', materia:'' });

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const registrar = async () => {
    if (!form.cedula || !form.nombre) return Alert.alert('Cédula y nombre son obligatorios');
    try {
      await registrarEstudiante(form);
      Alert.alert('Éxito', 'Estudiante registrado');
      setForm({ cedula:'', nombre:'', correo:'', celular:'', materia:'' });
    } catch (e) {
      Alert.alert('Error', e.response?.data?.error || 'Error al registrar');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {['cedula','nombre','correo','celular','materia'].map(campo => (
        <View key={campo}>
          <Text style={styles.label}>{campo.charAt(0).toUpperCase() + campo.slice(1)}</Text>
          <TextInput style={styles.input} value={form[campo]} onChangeText={v => set(campo, v)} placeholder={`Ingresa ${campo}`} keyboardType={campo === 'celular' ? 'phone-pad' : 'default'}/>
        </View>
      ))}
      <TouchableOpacity style={styles.btn} onPress={registrar}>
        <Text style={styles.btnText}>Registrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1 },
  label: { fontSize: 14, marginBottom: 4, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginBottom: 14, fontSize: 14 },
  btn: { backgroundColor: '#4A90D9', padding: 12, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '600' },
});