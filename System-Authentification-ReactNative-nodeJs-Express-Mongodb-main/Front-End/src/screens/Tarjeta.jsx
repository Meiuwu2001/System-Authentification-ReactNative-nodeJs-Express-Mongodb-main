import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
// import Spinner from 'react-native-loading-spinner-overlay';
// import {AuthContext} from '../context/AuthContext.js'
  // Aquí puedes llamar a la función que deseas ejecutar al abrir la aplicación

 const Tarjeta = () => {
  const TraerTarjeta = async () => {
    await axios
      .get("http://192.168.1.71:8000/login")
      .then(function (response) {
        if (response.status === 200) {
           setHora(response.data.datos.login.hora);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const [hora, setHora] = useState([]);

  const horaStr = hora.toString();

const horaMinutos = horaStr.split(":");
const horaPartes = {
  hora: horaMinutos[0],
  minutos: horaMinutos[1],
};

  console.log("hora desde rfid: " + horaPartes.hora + ", minutos: " + horaPartes.minutos);

  useEffect(() => {
      TraerTarjeta()
  }, []);


  setInterval(() => {
    TraerTarjeta();
  }, 1000);
  

  const fechaActual = new Date();
  const horaActual = agregarCeros(fechaActual.getHours());
  const minutosActuales = agregarCeros(fechaActual.getMinutes());
  const segundosActuales = agregarCeros(fechaActual.getSeconds());
  const horaEnFormato = horaActual + ":" + minutosActuales + ":" + segundosActuales;
  
  console.log("La hora actual es: ", horaEnFormato);
  
  function agregarCeros(numero) {
    if (numero < 10) {
      return "0" + numero;
    } else {
      return numero;
    }
  }
  const navigation = new  useNavigation();
  if(horaActual == horaPartes.hora && minutosActuales == horaPartes.minutos){
    console.log("todo funciona bien");
    navigation.navigate('Login');

  }else{
    console.log("ingrese su tarjeta");
  }
  

  return (
    
   
    
    <View style={styles.container}>
      <Text style={styles.welcome}>Ingrese su tarjeta de acceso</Text>
      {/* <Spinner visible={isLoading} />       */}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  welcome: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default Tarjeta;
