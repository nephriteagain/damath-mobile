import { StatusBar } from 'expo-status-bar';
import { StyleSheet,View } from 'react-native';

import { NavigationContainer, } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


import GlobalProvider from './GlobalContext';

import Game from './routes/Game';
import Home from './routes/Home';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <GlobalProvider>  
                <Stack.Navigator>
                    <Stack.Screen  name='Home' component={Home} />
                    <Stack.Screen name='Game' component={Game} />
                </Stack.Navigator>
            </GlobalProvider>
            <StatusBar style="auto" />
        </NavigationContainer>
    );
}

