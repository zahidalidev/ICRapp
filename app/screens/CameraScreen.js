import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions,ActivityIndicator} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { mainStyles, loginStyles } from '@styles/styles'
import color from '@styles/colors'
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob'
import ImagePicker from 'react-native-image-picker';



const options = {
  title: 'Selecciona una foto',
  takePhotoButtonTitle: 'Tomar foto con tu camara',
  chooseFromLibraryButtonTitle: 'Escoger una foto de tu libreria',
  storageOptions: {
      skipBackup: true,
      path: 'images',
  },
  quality: 1, maxWidth: 3072, maxHeight: 3072

};


const { width } = Dimensions.get('screen');

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  myfun = () => {
    //alert('clicked');

    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      }

      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        response['uri'] = response.path;
        response['name'] = response.fileName;

        this.setState({
          avatarSource: source,
          pic: response,
          loading : true
        });

        this.uploadOnCloudinary(response)
      }
    });
  }

  state = {
    img: require('@recursos/images/scan.png'),
    show: false,
    captureImage: "https://res.cloudinary.com/dzrym6tfj/image/upload/v1599580442/WhatsApp_Image_2020-08-10_at_12.04.12_PM_owzi0y.jpg",    //scanning this imaage
    extractedWordsArray : [],
    loading : false
  }

    processImage = async(captureImage)  => {      
        var uriBase = "https://testicrapp.cognitiveservices.azure.com/" + "vision/v3.0/ocr";  //endpoint
        // Request parameters.
        var params = {
            "language": "es",
            "detectOrientation": "true",
        };

          // const options = {
          //   method: 'POST',
          //   headers: { 
          //     'content-type': 'application/json', 
          //    "Ocp-Apim-Subscription-Key": "3b9450ca855a43f399f49630e6159f5a" //subscription key
          //   },
          //   data: '{"url": ' + '"' + captureImage + '"}',
          //   url: uriBase + "?" + params,
          // };
          try {
          let data = {
            url:  captureImage 
          }
           return fetch(uriBase + "?" + params, {
              body: JSON.stringify(data),
              headers: { 
                'content-type': 'application/json', 
               "Ocp-Apim-Subscription-Key": "3b9450ca855a43f399f49630e6159f5a" //subscription key
              },
              method: 'POST',
            }).then(async r => {
              let data = await r.json()
              // alert(JSON.stringify(data))
              this.setState({
                loading : false
              })
              return data
              // this.upload(data.url)
              // setPhoto(data.url);
            }).catch(err => {
              alert("error: ", JSON.stringify(err))
            })
          } catch (error) {
            alert("error: ", JSON.stringify(error))
          }
          
        
       
    };

    uploadOnCloudinary = (response) => {
      // const cloudinary = require('cloudinary').v2
      // cloudinary.config({
      //   cloud_name: 'dzrym6tfj',
      //   api_key: '327912853979898',
      //   api_secret: 'T06tyOb-RPYvn3xYTHwyoFtj2PI'
      // })
      let CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dzrym6tfj/upload';
      let base64Img = `data:image/jpg;base64,${response.data}`;

      let data = {
        "file": base64Img,
        "upload_preset": "s4myyino",
      }
      try {
        fetch(CLOUDINARY_URL, {
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json'
          },
          method: 'POST',
        }).then(async r => {
          let data = await r.json()
          console.log(JSON.stringify(data))
          this.upload(data.url)
          console.log('image uploaded')
          // setPhoto(data.url);
        }).catch(err => console.warn(err))
      
      } catch (error) {
        console.log("error: ", error)
      }

    
    }

    extractWordArray = async(url) => {
      const data = await this.processImage(url);    //responce from the scanned image
      let textArray = [];

      data.regions.map(region => {
          region.lines.map(line => {
            let wordsOfLine = [];

            line.words.map(word => {
              wordsOfLine.push(word.text);
            })

            textArray.push(wordsOfLine)
          })
      })

      console.log("original Array: ", textArray ,  "croped")
      
      var innerIndex;
      var indexNombre = textArray.findIndex(function(sub) {
        innerIndex = sub.indexOf("NOMBRE");
        return innerIndex !== -1;
      });
      
      if(indexNombre == -1){
        textArray.splice(0, 3);
      }else{
        textArray.splice(0, indexNombre);
      }
      
      const firstThreeLines = [textArray[0], textArray[1], textArray[2]];

      var innerIndex2;
      var indexDOM = textArray.findIndex(function(sub) {
        innerIndex2 = sub.indexOf("DOMICILIO");
        return innerIndex2 !== -1;
      });
      if(indexDOM !== -1){
        textArray.splice(indexDOM, 1);
      }
      
      const fourthLine = [textArray[3]];
      const fifthLine = [textArray[4]];
      const sisthLine = [textArray[5]];
      
      var indexDOB = textArray.findIndex(function(sub) {
        let innerIndex3 = sub.indexOf("FECHA");
        let innerIndex4 = sub.indexOf("NACIMIENTO");
        let innerIndex5 = sub.indexOf("PECHA");
        let innerIndex6 = sub.indexOf("DOMICILIO");
        return innerIndex3 !== -1 || innerIndex4 !== -1 || innerIndex5 !== -1 || innerIndex6 !== -1;
      });
      if(indexDOB !== -1){
        textArray.splice(indexDOB, 1);
      }
      
      const sevenLine = [textArray[6]];
      const eigthLine = [textArray[7]];
      const ninethLine = [textArray[8]];

      textArray.splice(9, textArray.length);

      const finalArray = [firstThreeLines, fourthLine, fifthLine, sisthLine, sevenLine, eigthLine, ninethLine]
      this.setState({extractedWordsArray: finalArray, loading : false});

      console.log("textArray of line finalArray: ", finalArray)      //result from the scanned image
    }

  capture = async() => {
    const img = await this.refs.cam.takePictureAsync({ quality: 0.5 });
    this.setState({ img, show: false })
    console.warn("img Data", img)
  }

  upload = async(url) => {
    await this.extractWordArray(url);    //Extracting Printed Text (OCR) Using the Computer Vision REST API and JavaScript
    console.warn(resp);

    // now i just create the form data
    const body = new FormData();
    // alert('ddf');
    // RNFetchBlob.fetch('POST', 'https://icrapp.000webhostapp.com/war/upload.php', {
    //   Authorization: "Bearer access-token",
    //   otherHeader: "foo",
    //   'Content-Type': 'multipart/form-data',
    // }, [
    //   // element with property `filename` will be transformed into `file` in form data
    //   { name: 'image', filename: 'card.png', data: this.state.pic }
    // ]).then((resp) => {
    //   console.warn(resp);
    //   alert('Imagen subida con exito');
    //   this.setState({ avatarSource: null })
    // })
  }

  //sending and navigation to data screen
  goToScreen = (routeName) => {
    this.props.navigation.navigate(routeName, { data: this.state.extractedWordsArray })
  }

  render() {
    console.log("tes: -----", this.state.extractedWordsArray.length === 0)
    return (
        this.state.show ?
          <View style={styles.container}>
            <RNCamera ref='cam' style={StyleSheet.absoluteFill} />
            <TouchableOpacity style={styles.capture} onPress={() => this.capture()} />
          </View>
          :
          <View style={styles.container}> 
              <Image source={this.state.img} style={styles.img} />
              <View>
                <Text style={styles.btntxt} onPress={this.myfun}>Escanear</Text>
              {/* <Text style={styles.btntxt} onPress={() => }>Subir</Text> */}
              </View>
              <View style={{marginTop : 10, flexDirection : 'row', flexWrap : 'wrap', marginHorizontal : 15}}>
              
              {
                this.state.loading ? <View style={{justifyContent : 'center', alignItems : 'center'}}>
                <ActivityIndicator color='#000' size='small'></ActivityIndicator> 
                <Text style={{textAlign : 'center'}}>Espere, estamos cargando la imagen y mostrándole el texto.</Text>
                </View> : 
                null
              }
              </View>

              {
                this.state.extractedWordsArray.length === 0 ? null : 
              <View style={mainStyles.btnMain}>
                  <TouchableOpacity onPress={() => this.goToScreen('Data')}>
                      <Text style={mainStyles.btntxt}>Scanned Card</Text>
                  </TouchableOpacity>
              </View>
              }
          </View>
    )
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