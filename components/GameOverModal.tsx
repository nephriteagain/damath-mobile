import { Modal, Text, StyleSheet, Pressable, View, Dimensions } from "react-native";
import { useGlobalContext } from "../GlobalContext";
import { ActionKind } from "../gameReducer";

const dimensions = Dimensions.get('screen')

export default function GameOverModal() {
    const { boardData, playerTurn, dispatch, scores } = useGlobalContext()
    const { isGameOver } = boardData

    const winnerText = scores.z === scores.x ?
        'Draw' :
        scores.z > scores.x ?
        'Red Wins!' :
        'Blue Wins'

    function resetGame() {
        dispatch({
            type: ActionKind.RESTART_GAME
        })
    }

    return (
        <Modal 
        animationType="slide" 
        visible={isGameOver} 
        transparent={true}
        >
            <View style={styles.container}>
                <View style={styles.background} />                
                <View style={[styles.dialog, {backgroundColor: playerTurn === 'x' ? 'red' : 'blue'}]}>
                    <Text style={[styles.text, {fontSize: 24}]}>
                        {winnerText}
                    </Text>
                    <Pressable 
                    style={styles.button}
                    onPress={resetGame}
                    >
                        <Text style={[styles.text, {fontSize: 20}]}>Reset Game</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#25292e',
        width: '100%',
        height: '100%',        
        opacity: 0.7
    },
    container: {
        height: dimensions.height,
        width: dimensions.width,
        position: 'relative',
    },    
    dialog: {
        width: 300,
        height: 200,
        position: 'absolute',
        top: 150,
        left: '50%',
        transform: [{translateX: -150}],
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24                       
    },
    text: {
        color: 'white'
    },
    button: {
        backgroundColor: 'green',
        paddingHorizontal:16,
        paddingVertical: 8,
        borderRadius: 24,        
    }
})