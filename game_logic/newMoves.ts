import { boxPiece, piece } from "../lib/data";
import { coordinates } from "../types";
import { blockMovable, blockJumpable } from "../lib/utils";


/**
 * NOTE:
 * topLeft - +
 * topRight + +
 * botLeft - -
 * botRight - +
 */

/**
 * 
 * @param boardData 
 * @param piece 
 * @param c the coordinate of the selected piece
 * @returns a piece with updated moves
 */
function getPieceWithNewMoves(
    boardData: Array<boxPiece>, 
    piece: piece, 
    c: coordinates
) : piece {
    const { type, isKing } = piece
    const newMoves : Array<number> = [];
    const { x, y } = c
    if (type === 'z' && !isKing) {
        const topLeftBlock = blockMovable(boardData, {x: x-1, y: y+1})
        const topRightBlock = blockMovable(boardData, {x: x+1, y: y+1})
        if (topLeftBlock.status) {
            newMoves.push(topLeftBlock.index)
        }
        if (topRightBlock.status) {
            newMoves.push(topRightBlock.index)
        }
    }
    if (type === 'x' && !isKing) {        
        const botLeftBlock = blockMovable(boardData, {x:x-1, y:y-1})
        const botRightBlock = blockMovable(boardData, {x:x+1, y: y-1})
        if (botLeftBlock.status) {
            newMoves.push(botLeftBlock.index)
        }
        if (botRightBlock.status) {
            newMoves.push(botRightBlock.index)
        }
    }

    return {
        ...piece,
        moves: newMoves
    }
}

function getPieceWithNewJumps(
    boardData: Array<boxPiece>,
    piece: piece,
    c: coordinates
) : piece {
    const { isKing } = piece
    const newJumps : Array<number> = []
    const { x, y } = c

    if (!isKing) {
        const topLeft = blockJumpable(boardData, piece.type, {x:x-2,y:y+2}, {x:x-1,y:y+1})
        const topRight = blockJumpable(boardData, piece.type, {x:x+2,y:y+2},{x:x+1,y:y+1})
        const botLeft = blockJumpable(boardData, piece.type, {x: x-2,y:y-2},{x:x-1,y:y-1})
        const botRight = blockJumpable(boardData, piece.type, {x:x+2,y:y-2},{x:x+1,y:y-1})

        if (topLeft.status) {
            newJumps.push(topLeft.index)
        }
        if (topRight.status) {
            newJumps.push(topRight.index)
        }
        if (botLeft.status) {
            newJumps.push(botLeft.index)
        }
        if (botRight.status) {
            newJumps.push(botRight.index)
        }
    }

    return {
        ...piece,
        moves: newJumps
    }
}

/**
 * 
 * @param boardData 
 * @returns a new board with all pieces updated their moves
 * TODO: the jump has a bug!
 */
export function getBoardWithUpdatedMoves(board: Array<boxPiece>) : Array<boxPiece> {
    // checks all available jumps for blue
    const boardData = structuredClone(board)

    const boardWithOnlyBlueJumps = boardData.map(b => {
        // skips all empty blocks or non blue piece
        if (!b.piece || b.piece.type === 'z') {
            return b
        }
        return {
            ...b,
            piece: getPieceWithNewJumps(
                boardData,
                b.piece,
                {x:b.x, y: b.y}
            )
        }
    })
    // checks all available jumps for red
    const boardWithOnlyRedJumps = boardData.map(b => {
        // skips all empty blocks or non red piece
        if (!b.piece || b.piece.type === 'x') {
            return b
        }
        return {
            ...b,
            piece: getPieceWithNewJumps(
                boardData,
                b.piece,
                {x:b.x, y: b.y}
            )
        }
    })

    const doesBlueHasJumps = boardWithOnlyBlueJumps.some(b  => b.piece && b.piece.moves.length > 0)
    const doesRedHasJumps = boardWithOnlyRedJumps.some(b  => b.piece && b.piece.moves.length > 0)


    return boardData.map((b,i) => {
        // skips all empty blocks
        if (!b.piece) {
            return b
        }
        // uses the value of only jumps
        if (b.piece.type === 'x' && doesBlueHasJumps) {
            return {
                ...b,
                piece: {
                    ...b.piece,
                    moves: boardWithOnlyBlueJumps[i].piece?.moves ?? []
                }
            }
        }
        // uses the value of only jumps
        if (b.piece.type === 'z' && doesRedHasJumps) {
            return {
                ...b,
                piece: {
                    ...b.piece,
                    moves: boardWithOnlyRedJumps[i].piece?.moves ?? []
                }
            }
        }

        return {
            ...b,
            piece: getPieceWithNewMoves(
                boardData, 
                b.piece, 
                {x:b.x, y: b.y}
            )
        }
    })
}
