import React, { useState } from 'react'
import {View, Text, TextInput, TouchableOpacity, ToastAndroid} from "react-native"
import { styles, colores } from '../theme/theme';
import Icon from "react-native-vector-icons/Ionicons"
import axios from 'axios';

const initialState = {
  nombre:'',
  descripcion:'',
};

const Sensor = () => {
  const [datos, setDatos] = useState(initialState);
  const {nombre, descripcion} = datos;

  const handleChange = (n, v) => {
    setDatos({...datos,[n]:v});
  };

  const handleSubmit = async () => {
    await axios.post('http://192.168.1.73:8000/sensor', datos)
    .then(function (response){
      if(response.status === 200) {
        setDatos(initialState);
        ToastAndroid.show(
          `Sensor agregado con id: ${response.data._id}`,
          ToastAndroid.SHORT,
        );
      }
    })
    .catch(function (error){
      console.log(error);
    });
    };
  return (
    <View style={styles.container}>
        <Text style={styles.sensor_titulo}>Ingresa los datos del sensor</Text>
        <Text style={styles.sensor_etiqueta}>Nombre:</Text>
        <TextInput
          placeholder='Nombre'
          placeholderTextColor={colores.uno}
          style={styles.sensor_input}
          value={nombre}
          onChangeText = {(valor) => handleChange('nombre', valor)}
        />
        <Text style={styles.sensor_etiqueta}>Descripción:</Text>
        <TextInput
          placeholder='Descripción'
          placeholderTextColor={colores.uno}
          style={styles.sensor_input_text}
          multiline
          numberOfLines={4}
          maxLength={200}
          value={descripcion}
          onChangeText= {(valor) => handleChange ('descripcion', valor)}
        />
        <TouchableOpacity
          style={styles.sensor_boton_guardar}
          onPress={handleSubmit}
        >
          <Text style={styles.sensor_etiqueta}>
            <Icon name="archive-outline" color={colores.cinco} size={26}/>
          </Text>
        </TouchableOpacity>
    </View>
  )
}

export default Sensor;