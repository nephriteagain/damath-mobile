import { CAPTURE_GROUPS } from "../lib/CAPTURE_GROUPS"
import { coordinates, PieceI, BoardI } from "../types"
import { computeScore, resetScore } from "./classHelpers"

export function removeCapturedPiece(to: coordinates, from: coordinates, piece: PieceI, boardData: BoardI) {
    // get the captured group
    const capturedArea = CAPTURE_GROUPS.find(group => {
        const hasTo = group.some(c => c.x === to.x && c.y === to.y)
        const hasFrom = group.some(c => c.x === from.x && c.y === from.y)
        return hasTo && hasFrom
    })
    if (!capturedArea) {
        throw new Error('capture group not found')
    }
    // get the block where to and from exist
    const toBlock = boardData.board.find(b => b.coordinates.x === to.x && b.coordinates.y === to.y)
    const fromBlock = boardData.board.find(b => b.coordinates.x === from.x && b.coordinates.y === from.y)
    if (!toBlock) {
        throw new Error('"to" block not found')
    }
    if (!fromBlock) {
        throw new Error('"from" block not found')
    }
    // get the indices of those blocks
    const toIndex = boardData.board.indexOf(toBlock)
    const fromIndex = boardData.board.indexOf(fromBlock)
    
    // loop in remove the capture piece
    for (let i = 0; i < boardData.board.length; i++) {
        const b = boardData.board[i]
        // check if the block is part of the capture group
        const  isPartOfCaptureGroup =  capturedArea.some(c => c.x === b.coordinates.x && c.y === b.coordinates.y)
        if (isPartOfCaptureGroup && b.piece) {
            

            const  blockIndex = boardData.board.indexOf(b)
            // this means to block is in the middle of the from and to blocks
            if (
                blockIndex > toIndex && blockIndex < fromIndex ||
                blockIndex < toIndex && blockIndex > fromIndex
            ) {                    
                computeScore(piece, b.piece, toBlock.operation, boardData)
                // remove  the captured piece
                boardData.board[i].piece =  undefined;
                boardData.didPieceCapture = true;
                return;
            }
        }
    }
    resetScore(boardData) 
    boardData.didPieceCapture = false;
    return;
}    