import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useGlobalContext } from "../GlobalContext";

export default function PlayerTurn() {
    const { playerTurn } = useGlobalContext()

    const msg = playerTurn === 'z' ? `Red's turn` : `Blue's turn`
    const bannerColor = playerTurn === 'z' ? styles.bannerRed : styles.bannerBlue

    return (
        <View style={[styles.banner, bannerColor]}>
            <Text style={styles.text}>{msg}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    banner: {
        height: 60,
        width: Dimensions.get('screen').width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bannerRed: {
        backgroundColor: 'red'
    },
    bannerBlue: {
        backgroundColor: 'blue'
    },
    text: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff'
    }
    
})