import { Pressable, View, StyleSheet, Text, Dimensions, Alert } from "react-native"
import { COUNTING, operation } from "../lib/data"


import Operation from "./Operation";
import Piece from "./Piece";
import PlayableBlock from "./PlayableBlock";
import UnplayableBlock from "./UnplayableBlock";


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
                        <UnplayableBlock 
                        key={key}
                        boxWidth={boxWidth} 
                        />
                    )
                }

                const movePiece = b.highlighted ?
                    () => dispatch({
                        type: ActionKind.MOVE_PIECE, 
                        payload: {
                            to: b.coordinates
                        }
                    }) : 
                  undefined

                return (
                    <PlayableBlock
                    key={key}
                    boxWidth={boxWidth}
                    highlighted={b.highlighted}
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
                    </PlayableBlock>
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
    }
})