import { piece } from "../lib/data";
import { StyleSheet, Pressable, Text, Dimensions, Alert } from "react-native";

import { useGlobalContext } from "../GlobalContext";
import { ActionKind } from "../gameReducer";

type PieceProps = piece & {
    x: number;
    y: number;
}

const screenWidth = Dimensions.get('screen').width
const boxWidth = screenWidth/8

export default function Piece({type, value, isKing, moves, label, x, y}:PieceProps) {
    const { dispatch, playerTurn } = useGlobalContext()

    const showMoves = playerTurn === type ? 
        () => dispatch({
            type: ActionKind.HIGHLIGHT_MOVES,
            payload: {x,y}
        }) :
        undefined

    const movableStateStyle = 
        moves.length > 0 ? 
        styles.pieceMovable : 
        styles.pieceImmovable
    const pieceColorStyle =
        type === 'z' ?
        styles.redPiece :
        styles.bluePiece

    return (
        <Pressable 
            onPressIn={showMoves}
            style={[
                styles.piece,
                pieceColorStyle,
                movableStateStyle
            ]}
            >
                <Text style={styles.pieceValue}>
                {value}
                </Text>
            </Pressable>
    )
}

const styles = StyleSheet.create({
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
    },
    pieceMovable: {
        opacity: 1
    },
    pieceImmovable: {
        opacity: 0.7
    }
})