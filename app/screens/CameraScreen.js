'use strict';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground , Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class CameraScreen extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
          path: null,
        };
    }

    render() {
        const { path } = this.state;
        if (path) {
            return this.renderAsPreview();
        }
        return (
      <View style={styles.container}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permiso para utilizar tu camara',
            message: 'Ocupamos tu autorizacion para acceder a tu camara',
            buttonPositive: 'Aceptar',
            buttonNegative: 'Cancelar',
          }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
          <Text>
            Escanear
        </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderAsPreview(){
    return (
      <View style={styles.container}>
        <ImageBackground source={{ uri: this.state.path }} style={styles.preview}/>
        <Text
          style={styles.cancel}
          onPress={() => this.setState({ path: null })}
        >Reintentar
        </Text>
      </View>
    );
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      this.setState({ path: data.uri });
      console.log(data.uri);
    }
  };
}

const styles = StyleSheet.create({
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
      },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  cancel: {
    position: 'absolute',
    right: 20,
    top: 30,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  }
});