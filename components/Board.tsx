import { Pressable, View, StyleSheet, Text, Dimensions, Alert } from "react-native"
import { COUNTING, operation } from "../lib/data"


import Operation from "./Operation";
import Piece from "./Piece";
import { useGlobalContext } from "../GlobalContext";



const screenWidth = Dimensions.get('screen').width
const boxWidth = screenWidth/8


export default function Board() {
    const { boardData } = useGlobalContext()

    return (
        <View style={styles.board}>            

            {boardData.map((b,i) => {
                const {x,y,playable, operation, piece, hightlighted} = b

                const boxColorStyle = hightlighted  ? styles.boxHighlighted :
                    playable ? styles.boxPlayable : styles.boxUnplayable

                const onPress = hightlighted ? () => Alert.alert(`you pressed box ${b.x}:${b.y}`) : undefined

                return (
                    <Pressable
                    key={`x:${x};y:${y}`}
                    style={[styles.box, boxColorStyle]}
                    onPress={onPress}
                    >
                        <Operation 
                        name={operation} 
                        hasPiece={Boolean(piece)}
                        />
                        { piece && 
                        <Piece 
                        {...piece} 
                        x={x} 
                        y={y} 
                        />
                        }
                    </Pressable>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    board: {
        width: screenWidth,
        aspectRatio: '1/1',
        flexWrap: 'wrap',
        flexDirection: 'row',
        maxWidth: 500
    },
    box: {
        width: boxWidth,
        height: boxWidth,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    boxPlayable: {
        backgroundColor: '#fff'
    },
    boxUnplayable: {
        backgroundColor: '#747264',        
    },
    boxHighlighted: {
        backgroundColor: '#99BC85'
    },
    piece: {
        width: boxWidth * 5/6,
        height: boxWidth * 5/6,        
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',        

    },
    bluePiece: {
        backgroundColor: 'blue'
    },
    redPiece: {
        backgroundColor: 'red'
    },
    pieceValue: {
        fontSize: 24,
        fontWeight: '600',
        color: 'white'
    }
})