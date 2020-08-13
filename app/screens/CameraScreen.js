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
import { mainStyles, loginStyles } from '@styles/styles'
import color from '@styles/colors'
import axios from 'axios';


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
    img: require('@recursos/images/scan.png'),
    show: false,
    captureImage: "https://faculty.weber.edu/tmathews/grammar/Rulfo.JPG"    //scanning this imaage
  }

    processImage = async(captureImage)  => {      
        var uriBase = "https://apirestocr.cognitiveservices.azure.com/" + "vision/v3.0/ocr";  //endpoint
        // Request parameters.
        var params = {
            "language": "unk",
            "detectOrientation": "true",
        };

        try {
          console.log("calling api...")
          const options = {
            method: 'POST',
            headers: { 
              'content-type': 'application/json', 
             "Ocp-Apim-Subscription-Key": "00f21e52b1df40f5aa0d3185dac5f517" //subscription key
            },
            data: '{"url": ' + '"' + captureImage + '"}',
            url: uriBase + "?" + params,
          };
          const {data} = await axios(options);  //calling api using axios
          return data;  //returning responce
        } catch (error) {
          console.log("error: ", error)
        }
       
    };

    extractWordArray = async() => {
      const data = await this.processImage(this.state.captureImage);    //responce from the scanned image

      //extracting word from responce
      const textArray = [];
      data.regions.map(region => {
        region.lines.map(line => {
            line.words.map(word => {
                textArray.push(word.text);
            })
        })
        this.setState({extractedWordsArray: textArray});
      })

      console.log("wordsArray: ", textArray)      //result from the scanned image
    }

  capture = async() => {
    const img = await this.refs.cam.takePictureAsync({ quality: 0.5 });
    this.setState({ img, show: false })
    console.log("img Data", img)
  }

  upload = async() => {
    await this.extractWordArray();    //Extracting Printed Text (OCR) Using the Computer Vision REST API and JavaScript

    // now i just create the form data
    const body = new FormData();
    // taking img is stored in the state
    body.append('img', { uri: this.state.img.uri, name: 'img.jpg', type: 'image/jpeg' });
    //now img is appended
    fetch('http://localhost:3000/credenciales', {
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
        <View>
        <Text style={styles.btntxt} onPress={() => this.setState({ show: true })}>Escanear</Text>
        <Text style={styles.btntxt} onPress={() => this.upload()}>Subir</Text>
        </View>
    </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
    borderRadius: 50
  },
  capture: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 10,
    left: (width / 2) - 30,
    backgroundColor: 'white',
    borderRadius: 30
  },
  btntxt: {
    textAlign: 'center',
    fontSize: 17,
    color: color.black,
    paddingVertical: 15,
    fontFamily: 'Poppins-Bold',
},
  
});