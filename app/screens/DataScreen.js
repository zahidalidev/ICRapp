import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';

export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    consol.log("dataScreen")
    fetch('http://192.168.0.5/29-07-20/api/credenciales')
      .then((response) => response.json())
      .then((json) => setData(json.credenciales))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);


  return (
    <View style={{backgroundColor:'black',padding:10,margin:10}}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
          <Text style={{color:'#fff', fontWeight:'bold'}}>Nombres: {item.nombres} Apellidos: {item.ape_pat} {item.ape_mat} 
           Fecha Nacimiento: {item.fecha_nacimiento} Domicilio: {item.domicilio} Colonia: {item.colonia} CP: {item.cp} Estado: {item.estado} Municipio: {item.municipio} Localidad: {item.localidad} 
          Clave elector: {item.clave_elector} Curp: {item.curp}  </Text>
            
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});