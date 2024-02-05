import { Pressable, View, StyleSheet, Text, Dimensions, Alert } from "react-native"
import { COUNTING, operation } from "../lib/data"


import Operation from "./Operation";
import Piece from "./Piece";
import { useGlobalContext } from "../GlobalContext";
import { ActionKind } from "../gameReducer";
import { generateBoardCoordinate } from "../lib/utils";



const screenWidth = Dimensions.get('screen').width
const boxWidth = screenWidth/8


export default function Board() {
    const { boardData, dispatch } = useGlobalContext()
    const squareBoard = generateBoardCoordinate()
    const gameBoard = squareBoard.map(b => {        
        return boardData.board.find(block => b.x === block.coordinates.x && b.y === block.coordinates.y)
    })
    

    return (
        <View style={styles.board}>            

            {gameBoard.map((b,i) => {
                
                const key = b ? `x:${b.coordinates.x};y:${b.coordinates.y}` : i

                

                


                if (!b) {
                    return (
                        <View 
                        key={key}
                        style={[
                            styles.box, styles.boxUnplayable
                        ]}
                        >

                        </View>
                    )
                }

                const boxColorStyle = b?.highlighted  ? styles.boxHighlighted : styles.boxPlayable

                const movePiece = b.highlighted ?
                    () => dispatch({
                        type: ActionKind.MOVE_PIECE, 
                        payload: {
                            to: b.coordinates
                        }
                    }) : 
                  undefined

                return (
                    <Pressable
                    key={key}
                    style={[styles.box, boxColorStyle]}
                    onPress={movePiece}
                    >
                        <Operation 
                        name={b.operation} 
                        hasPiece={Boolean(b.piece)}
                        />
                        { b.piece && 
                        <Piece 
                        {...b.piece} 
                        x={b.coordinates.x} 
                        y={b.coordinates.y} 
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