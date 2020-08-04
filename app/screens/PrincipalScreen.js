import React, { Component} from 'react'
import { Text } from 'react-native'

export default class PrincipalScreen extends Component {

    goToScreen(routeName){
        this.props.navigation.navigate(routeName)
    }

    componentDidMount(){
        setTimeout( () => {
            this.goToScreen('First')
        }, 2000, this)
    }

    render(){
        return(
            <Text style={{ textAlign:'center', marginTop:200, fontFamily:'Poppins-Black'}}>Principal</Text>
        )
    }


}

