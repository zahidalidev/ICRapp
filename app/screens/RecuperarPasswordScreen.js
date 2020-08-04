import React, { useState} from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    ScrollView
} from 'react-native'
import { mainStyles, loginStyles } from '@styles/styles'
import MyTextInput from '@components/MyTextInput'
import color from '@styles/colors'
import ToolBar from '@components/ToolBar'

function goToScreen(props, routeName){
    props.navigation.navigate(routeName)
}

export default function RecuperarPasswordScreen(props){

    return(
        <ScrollView
            keyboardDismissMode='on-drag'
            keyboardShouldPersistTap='always'
            style={{backgroundColor: color.WHITE}}>
            <StatusBar backgroundColor={color.BLACKPRIMARYCOLOR} translucent={true}/>
            <View style={[mainStyles.container, {padding: 50}]}>
    <Text style={mainStyles.titleText}>Recuperar{'\n'}Contraseña</Text>     
            <MyTextInput keyboardType='email-address' placeholder='E-mail' image='user'/>
            <View style={mainStyles.btnMain}>
                <TouchableOpacity onPress={() => goToScreen(props, 'Login')}>
                    <Text style={ mainStyles.btntxt}>Recuperar</Text>
                </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
    )
}