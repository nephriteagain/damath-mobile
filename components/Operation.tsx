import { StyleSheet, View } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { operation } from '../types';

type OperationProps = {
    name: operation|undefined;
    hasPiece: boolean;
}

export default function Operation({ name, hasPiece}: OperationProps) {
    const size = hasPiece ? 12 : 36
    
    if (name === operation.ADD) {
        return  (
            <View style={[hasPiece ? styles.hasPiece : {}]}>
                <FontAwesome name="plus" size={size} color="black" />
            </View>
        )
    }
    if (name === operation.SUBTRACT) {
        return (
            <View style={[hasPiece ? styles.hasPiece : {}]}>
                <FontAwesome name="minus" size={size} color="black" />
            </View>
            )
    }
    if (name === operation.MULTIPLY) {
        return  (
            <View style={[hasPiece ? styles.hasPiece : {}]}>
                <FontAwesome5 name="times" size={size} color="black" />
            </View>
        )
    }
    if (name === operation.DIVIDE) {
        return (
            <View style={[hasPiece ? styles.hasPiece : {}]}>
                <FontAwesome5 name="divide" size={size} color="black" />
            </View>
            )
    }
    return (
        <View/>
    )
}

const styles = StyleSheet.create({

    hasPiece: {
        position: 'absolute',
        top: 1,
        left: 1,                
    }
})