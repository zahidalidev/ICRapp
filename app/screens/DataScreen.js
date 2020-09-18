import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, ScrollView } from 'react-native';
import MyTextInput from '@components/MyTextInput'
// import { MyTextInput } from 'react-native';


export default class App extends React.Component{
  // const [isLoading, setLoading] = useState(true);
  // const [data, setData] = useState([]);

  state = {
    isLoading: true,
    data: [],
    names1st: '',
    names2nd: '',
    names3rd: '',

    Domicilio: '',
    Colonia: '',
    Codigo: '',
    Municipio: '',
    estado: '',
    clave: '',
    CURP: '',
    fecha: ''

  }

  componentDidMount = () => {
    try {
      const data2 = this.props.navigation.state.params;
      console.log("value: ", data2.data[2])
      console.log("dataScreen 2" ,data2)
      this.setState({data: data2, names1st: data2.data[0][0][0], names2nd: data2.data[0][1][0], names3rd: data2.data[0][2][0]})
  
      let colo = '';
      let codigoPosta = '';
      data2.data[2][0].map((col, i) => {
          if(i < data2.data[2][0].length - 1){
            colo = colo + " " + col;
          }else{
            codigoPosta = codigoPosta + " " + col;
          }
      })
  
      let muni = '';
      let estado = '';
      data2.data[3][0].map((col, i) => {
          if(i < data2.data[3][0].length - 2){
            muni = muni + " " + col;
          }else{
            estado = estado + " " + col;
          }
      })
  
      let domic = "";
      data2.data[1][0].map((dom) => {
        domic = domic + " " + dom
      })
  
      this.setState({
        Domicilio: domic,
        Colonia: colo,
        Codigo: codigoPosta,
        Municipio: muni,
        estado: estado,
  
        clave: data2.data[4][0][data2.data[4][0].length - 1],
        CURP: data2.data[6][0][0],
        fecha: data2.data[5][0][0]
      })
    } catch (error) {
      alert("please scan your card again")
    }
    //  fetch('http://192.168.0.5/29-07-20/api/credenciales')
    //   .then((response) => response.json())
    //   .then((json) => setData(json.credenciales))
    //   .catch((error) => console.error(error))
    //   .finally(() => setLoading(false));
  }

  // useEffect(() => {
  //   // fetch('http://192.168.0.5/29-07-20/api/credenciales')
  //   //   .then((response) => response.json())
  //   //   .then((json) => setData(json.credenciales))
  //   //   .catch((error) => console.error(error))
  //   //   .finally(() => setLoading(false));
  // }, []);

  render(){
    const {data, names1st, names2nd, names3rd, fecha, CURP, Domicilio, estado, Codigo, Colonia, Municipio, clave} = this.state;
    if(data == []){
      return <Text>Loading...</Text>
    }
    return (
      <ScrollView>
      <View style={{padding:10,margin:10}}>
        {/* {this.state.isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={this.state.data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
            <Text style={{color:'#fff', fontWeight:'bold'}}>
            Nombres: {item.nombres} Apellidos: {item.ape_pat} {item.ape_mat} Fecha Nacimiento: {item.fecha_nacimiento}
            Domicilio: {item.domicilio} Colonia: {item.colonia} CP: {item.cp} Estado: {item.estado} 
            Municipio: {item.municipio} Localidad: {item.localidad} 
            Clave elector: {item.clave_elector} Curp: {item.curp}  </Text>
              
            )}
            
          />
          )} */}
          <Text style={{fontSize: 30, padding: 40, fontWeight: "bold"}}> Informacion Recolectada</Text>
          
          <View style={{paddingLeft: 20,}}>

            <View > 
              <Text style={{marginBottom: -20, marginTop: -20, fontSize: 16, fontWeight: "bold"}}>apellido paterno</Text>
              <MyTextInput
                value={names1st}
              />
            </View>
            <View > 
              <Text style={{marginBottom: -20, marginTop: -20, fontSize: 16, fontWeight: "bold"}}>apellido materno</Text>
              <MyTextInput
                value={names2nd}
              />
            </View>
            <View > 
              <Text style={{marginBottom: -20, marginTop: -20, fontSize: 16, fontWeight: "bold"}}>Nombre</Text>
              <MyTextInput
                value={names3rd}
              />
            </View>
            <View > 
              <Text style={{marginBottom: -20, marginTop: -20, fontSize: 16, fontWeight: "bold"}}>Domicilio</Text>
              <MyTextInput
                value={Domicilio}
              />
            </View>
            <View > 
              <Text style={{marginBottom: -20, marginTop: -20, fontSize: 16, fontWeight: "bold"}}>Colonia</Text>
              <MyTextInput
                value={Colonia}
              />
            </View>
            <View > 
              <Text style={{marginBottom: -20, marginTop: -20, fontSize: 16, fontWeight: "bold"}}>Codigo Postal</Text>
              <MyTextInput
                value={Codigo}
              />
            </View>
            <View > 
              <Text style={{marginBottom: -20, marginTop: -20, fontSize: 16, fontWeight: "bold"}}>Municipio</Text>
              <MyTextInput
                value={Municipio}
              />
            </View>
            <View > 
              <Text style={{marginBottom: -20, marginTop: -20, fontSize: 16, fontWeight: "bold"}}>estado</Text>
              <MyTextInput
                value={estado}
              />
            </View>
            <View > 
              <Text style={{marginBottom: -20, marginTop: -20, fontSize: 16, fontWeight: "bold"}}>clave elector</Text>
              <MyTextInput
                value={clave}
              />
            </View>
            <View > 
              <Text style={{marginBottom: -20, marginTop: -20, fontSize: 16, fontWeight: "bold"}}>CURP</Text>
              <MyTextInput
                value={CURP}
              />
            </View>
            <View > 
              <Text style={{marginBottom: -20, marginTop: -20, fontSize: 16, fontWeight: "bold"}}>fecha Nacimiento</Text>
              <MyTextInput
                value={fecha}
              />
            </View>
          </View>
        </View>
        </ScrollView>
      );
    }
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});