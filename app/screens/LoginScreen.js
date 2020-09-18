import React, { Component, useState} from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Image
} from 'react-native'
import { mainStyles, loginStyles } from '@styles/styles'
import MyTextInput from '@components/MyTextInput'
import color from '@styles/colors'

function goToScreen(props, routeName){
    props.navigation.navigate(routeName)
}


export default function LoginScreen(props){

    const [hidePassword, setHidePassword] = useState(false)

    return(

        <View style={[mainStyles.container]}>
            <StatusBar backgroundColor={color.BLACK} translucent={false}/>
            <View style={loginStyles.logo}>
                <Image source={require('@recursos/images/Fingerprint.png')}
                style={{padding: 25,}}/>    
            </View>
            <MyTextInput keyboardType='email-address' placeholder='Nombre de Usuario' image='user'/>
            <MyTextInput keyboardType={null} placeholder='Contraseña' image='lock'
            secureTextEntry={true}
            onPress={() => setHidePassword(!hidePassword)}/>
            <View style={mainStyles.btnMain}>
                <TouchableOpacity onPress={() => goToScreen(props, 'First')}>
                    <Text style={mainStyles.btntxt}>Iniciar Sesion</Text>
                </TouchableOpacity>
            </View>
            <View>
            <TouchableOpacity onPress={() => goToScreen(props, 'RecuperarPassword')}>
                <Text style={[mainStyles.txtTransparent, { textDecorationLine: ''}]}>Data Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
        </View>
             </View>
    )

}