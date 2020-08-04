import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import SplashScreen from '@screens/SplashScreen'
import LoginScreen from '@screens/LoginScreen'
import PrincipalScreen from '@screens/PrincipalScreen'
import RecuperarPasswordScreen from '@screens/RecuperarPasswordScreen'
import RegistroScreen from '@screens/RegistroScreen'
import FirstScreen from '@screens/FirstScreen'
import CameraScreen from '@screens/CameraScreen'
import InformacionScreen from '@screens/InformacionScreen'
import DataScreen from '@screens/DataScreen'

const AppNavigation = createStackNavigator({

    Splash:{
        screen: SplashScreen,
        navigationOptions:{
            headerShown: false,
        }
    },

    Login:{
        screen: LoginScreen,
        navigationOptions:{
            headerShown: false,
        }
    },

    Principal:{
        screen: PrincipalScreen,
        navigationOptions:{
            headerShown: false,
        }
    },

    RecuperarPassword:{
        screen: RecuperarPasswordScreen,
        navigationOptions:{
            headerShown: false,
        }
    },

    Registro:{
        screen: RegistroScreen,
        navigationOptions:{
            headerShown: false,
        }
    },
    
    First:{
        screen: FirstScreen,
        navigationOptions:{
            headerShown: false,
        }
    },

    Camera:{
        screen: CameraScreen,
        navigationOptions:{
            headerShown: false,
        }
    },

    Informacion:{
        screen: InformacionScreen,
        navigationOptions:{
            headerShown: false,
        }
    },

    Data:{
        screen: DataScreen,
        navigationOptions:{
            headerShown: false,
        }
    },
})

export default createAppContainer(AppNavigation)