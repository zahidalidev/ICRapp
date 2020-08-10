
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,FlatList} from 'react-native';
export default class App extends Component {

  state ={
    data:['users']
  }

  fetchData= async()=>{
    const response = await fetch('http://192.168.0.5/29-07-20/api/users');
    const users = await response.status;
    //console.log(users);
    this.State({data: users.users});

  }
  
 async componentDidMount(){
  await this.fetchData();
}
  render() {
    return (
      <View >
       <Text>Informacion Recolectada</Text>

       <FlatList
       data={this.state.data}
       keyExtractor={(item,index) => index.toString()}
       renderItem={({item}) =>

       <View style={{backgroundColor:'#abc123',padding:10,margin:10}}>
          <Text style={{color:'#fff', fontWeight:'bold'}}>{item.email}</Text>
          <Text style={{color:'#fff'}}>{item.username}</Text>
         </View>

       }

       />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});