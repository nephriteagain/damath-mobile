import { Modal, Text, StyleSheet, Pressable, View } from "react-native";
import { useGlobalContext } from "../GlobalContext";
import { ActionKind } from "../gameReducer";


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
            <View 
            className="relative top-0 left-0 w-screen h-screen items-center justify-center"
            >
                <View 
                className="bg-[#25292e] w-full h-full opacity-70"
                />  
                <View 
                style={styles.dialog}
                className="bg-green-800 rounded-xl items-center justify-center gap-y-8"                
                >
                    <Text 
                    className="text-white text-4xl"
                    >
                        {winnerText}
                    </Text>
                    <Pressable 
                    className="bg-green-700 px-4 py-2 rounded-xl border border-[gold]"
                    onPress={resetGame}
                    >
                        <Text 
                        className="text-white text-xl"
                        >
                            Reset Game</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({   
    dialog: {
        width: 300,
        height: 200,
        position: 'absolute',
        top: 150,
        left: '50%',
        transform: [{translateX: -150}],                   
    },
})