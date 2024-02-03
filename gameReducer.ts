import { COUNTING, boxPiece, piece } from "./lib/data";
import { highlightMoves, resetHighlightMoves } from "./game_logic/highlightMoves";
import { movePiece } from "./game_logic/movePiece";
import { getBoardWithUpdatedMoves } from "./game_logic/newMoves";
import { coordinates } from "./types";

export const initialBoardData = COUNTING;

export enum ActionKind {
    MOVE_PIECE,
    HIGHLIGHT_MOVES,
}

type MoveAction = {
    type: ActionKind.MOVE_PIECE,
    payload: {
        to: coordinates   
    }
}

type HighlightAction = {
    type: ActionKind.HIGHLIGHT_MOVES,
    payload: {
        x: number,
        y: number
    }
}


export type Action = MoveAction|HighlightAction

export const gameInitialState : {
    boardData: Array<boxPiece>;
    pieceToMove: piece|null;
    playerTurn: 'x'|'z'
} = {
    boardData: COUNTING,
    pieceToMove: null,
    playerTurn: 'z'
}

export type GameTypes = typeof gameInitialState

export function boardReducer(state: GameTypes, action: Action) : GameTypes {
    if (action.type === ActionKind.HIGHLIGHT_MOVES) {
        const { x, y }  = action.payload
        const box = state.boardData.find((box) => box.x === x && box.y === y)
        if (!box || !box.piece) {                
            throw new Error('moving a piece that does not exist')
        }
        if (box.piece.type !== state.playerTurn) {
            throw new Error(`player ${box.piece.type} tried to turn when it is ${state.playerTurn}'s turn`)
        }
        const { moves } = box.piece
        const newBoard = highlightMoves(state.boardData, moves)
        return {
            ...state, 
            boardData: newBoard, 
            pieceToMove: box.piece
        };
    }

    if (action.type === ActionKind.MOVE_PIECE) {
        if (!state.pieceToMove) {
            throw new Error('no piece to move')
        }  
        const { to } = action.payload
        const pieceCurrentBlock = state.boardData.find(b => b.piece === state.pieceToMove)
        if (!pieceCurrentBlock) {
            throw new Error('cannot find piece to move')
        }
        const from = {
            x: pieceCurrentBlock.x, 
            y: pieceCurrentBlock.y
        }
        // remove the highligts across the board
        const boardWithoutHighlights = resetHighlightMoves(state.boardData)
        // move the selected piece to its new location
        const boardWithMovedPiece = movePiece(boardWithoutHighlights, state.pieceToMove, from, to)
        // updates all the pieces moves
        const boardWithUpdatedMoves = getBoardWithUpdatedMoves(boardWithMovedPiece)
        return {
            ...state,
            boardData: boardWithUpdatedMoves,
            // reset the selected piece
            pieceToMove: null,
            // change player turn
            playerTurn: state.playerTurn === 'z' ? 'x' : 'z'
        }
    }

    return state;
}