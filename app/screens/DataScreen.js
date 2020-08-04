/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions} from 'react-native';
import { RNCamera } from 'react-native-camera';

const { width } = Dimensions.get('screen');

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  state = {
    img: require('@recursos/images/ine.png'),
    show: false
  }
  async capture() {
    const img = await this.refs.cam.takePictureAsync({ quality: 0.5 });
    this.setState({ img, show: false })
  }
  upload() {
    // now i just create the form data
    const body = new FormData();
    // taking img is stored in the state
    body.append('img', { uri: this.state.img.uri, name: 'img.jpg', type: 'image/jpeg' });
    //now img is appended
    fetch('http://192.168.0.2/images/upload.php', {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body
    }).then(a => a.json()).then(res => alert(res));
  }
  render() {
    return this.state.show ?
    <View style={styles.container}>
      <RNCamera ref='cam' style={StyleSheet.absoluteFill} />
      <TouchableOpacity style={styles.capture} onPress={() => this.capture()} />
    </View>
    :
    <View style={styles.container}>
        <Image source={this.state.img} style={styles.img} />
        <Text style={styles.button} onPress={() => this.setState({ show: true })}>Escanear</Text>
        <Text style={styles.button} onPress={() => this.upload()}>Subir</Text>
    </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    padding: 10,
    paddingHorizontal: 20,
    margin: 20,
    backgroundColor: 'black',
    color: 'white'
  },
  img: {
    width: 300,
    height: 300,
    borderRadius: 150
  },
  capture: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 10,
    left: (width / 2) - 30,
    backgroundColor: 'white',
    borderRadius: 30
  }
});