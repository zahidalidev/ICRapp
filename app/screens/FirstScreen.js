import React, { Component, useState} from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Image
} from 'react-native'
import { mainStyles, loginStyles } from '@styles/styles'
import color from '@styles/colors'

export default function FirstScreen(props) {
        return(
            <View style={[mainStyles.container]}>
            <StatusBar backgroundColor={color.BLACK} translucent={true}/>
            <View style={loginStyles.logo}>
                <Image source={require('@recursos/images/ine.png')}
                style={{ height:150, width:250}}/>    
            </View>
            <View style={mainStyles.btnMain}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Camera')}>
                    <Text style={mainStyles.btntxt}>Digitalizar</Text>
                </TouchableOpacity>
            </View>
            </View>
        )
}

