import React, { useState, useEffect } from 'react';
import {View, Text, ToastAndroid, FlatList} from "react-native";
import { Picker } from 'react-native-form-component';
import { styles, colores } from '../theme/theme';
import axios from 'axios';

const Item = ({lectura}) => (
  <View style={styles.mostrar_lecturas_item}>
    <Text style={styles.mostrar_lecturas_title}>{lectura.valor}</Text>
    <Text>{lectura.fecha}</Text>
  </View>
)

const Lecturas = () => {
  useEffect(() => {
    traerSensores()
  }, []);
  
  const traerSensores = async () => {
    await axios.get('http://192.168.1.71:8000/sensores')
    .then(function (response){
      if(response.status === 200) {
        setSensores(response.data.datos)
      }
    })
    .catch(function (error){
      console.log(error);
    });
  };
  const traerLecturas = async (sensorId) =>{
    setNumber(sensorId);
    await axios.get(`http://192.168.1.71:8000/lecturas/${sensorId}`)
    .then(function (response){
      if(response.status === 200) {
        setSensores(response.data.datos)
        ToastAndroid.show(`Se han cargado los datos`, ToastAndroid.SHORT)
      }
    })
    .catch(function (error){
      console.log(error);
    });
  };

  const [number, setNumber] = useState(1);
  const [sensores, setSensores] = useState([]);
  const [lecturas, setLecturas] = useState([]);
  return (
    <View style={styles.container}>
      <Text style={styles.sensor_etiqueta}>Mostrar lecturas de sensor</Text>
        <Picker
        items={sensores}
        label="Selecciona un sensor"
        selectedValue={number}
        onSelection={(item) => traerLecturas(item.value)}
        buttonStyle={styles.mostrar_select}
        labelStyle={styles.mostrar_select_label}
        placeholder="Selecciona un sensor"
        />
      <FlatList
        data={lecturas}
        renderItem={({item}) => <Item lectura={item}/>}
        keyExtractor={item => item._id}
      />
    </View>
  )
}

export default Lecturas

