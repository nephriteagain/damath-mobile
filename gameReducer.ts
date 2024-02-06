import { COUNTING } from "./lib/data";
import { coordinates, BoardI, PieceI } from "./types";
import { Board, } from "./game_logic/graph/testImplementation";
import { generateCountingBoard } from "./game_logic/graph/COUNTING";

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
    payload: coordinates
    
}


export type Action = MoveAction|HighlightAction

export const gameInitialState : {
    boardData: BoardI;
    pieceToMove: PieceI|null;
    playerTurn: 'x'|'z';
    hasCapturedPiece: boolean;
} = {
    boardData: new Board(generateCountingBoard()),
    pieceToMove: null,
    playerTurn: 'z',
    hasCapturedPiece: false
}

export type GameTypes = typeof gameInitialState


export function boardReducer(state: GameTypes, action: Action) : GameTypes {
    if (action.type === ActionKind.HIGHLIGHT_MOVES) {
        const {x,y} = action.payload
        const block = state.boardData.board.find(b  => b.coordinates.x == x && b.coordinates.y === y)
        if (!block || !block.piece) {
            throw new Error('missing piece')
        }
        const moves = block.piece.moves
        const  newBoard = state.boardData.highLightMoves(moves)
        
        return {
            ...state,
            pieceToMove: block.piece,
            boardData: newBoard
        }
    }

    if (action.type === ActionKind.MOVE_PIECE) {
        if (!state.pieceToMove) {
            throw new Error('no piece to move')
        }  
        const { to } = action.payload
        const pieceCurrentBlock = state.boardData.board.find(b => b.piece && state.pieceToMove && b.piece.value === state.pieceToMove.value && b.piece.type  === state.pieceToMove.type)
        if (!pieceCurrentBlock) {
            throw new Error('cannot find piece to move')
        }
        const from = {
            x: pieceCurrentBlock.coordinates.x, 
            y: pieceCurrentBlock.coordinates.y
        }

        const newBoard = state.boardData.movePiece(state.pieceToMove, from, to)
        
        return {
            ...state,
            pieceToMove: null,
            boardData: newBoard,
            playerTurn: state.playerTurn === 'z' ? 'x' : 'z',
        }
        
    }

    return state;
}