import { boxPiece, piece } from "../lib/data";
import { coordinates } from "../types";


export function movePiece(
    boardData: Array<boxPiece>,
    piece: piece, 
    from: coordinates, 
    to: coordinates
) : Array<boxPiece> {


    const newBoardData = boardData.map(b => {
        // removes the piece from its old place
        if (b.x === from.x && b.y === from.y) {
            return {
                ...b,
                piece: undefined
            }
        }
        // add the piece to its new place
        if (b.x === to.x &&  b.y === to.y) {
            return {
                ...b,
                piece
            }
        }
        return b
    })

    return newBoardData
}