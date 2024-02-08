import { coordinates, operation, PieceI, BlockI, BoardI } from "../../types";
import { cloneDeep } from "lodash";

// NOTE: you did this because typescript is getting slow!
import { 
    clearAllHighlights,
    promotePiece,    
    removeCapturedPiece,
    updatePieceWithNewJumps,
    updatePieceWithNewMoves
} from '../classHelpers'


export class Board implements BoardI {
    public board;
    public score: number;
    public hasMultiJump: boolean;
    public didPieceCapture: boolean;

    constructor(board: Array<BlockI>) {
        this.board = board;
        this.score = 0;
        this.didPieceCapture = false;
        this.hasMultiJump = false;
    }
        

    private updateBoardWithNewMoves()  {
        // for blue jumps only
        for (let i = 0; i < this.board.length; i++) {
            const b = this.board[i];
            if (!b.piece || b.piece.type === 'z') {
                continue;
            }
            b.piece.moves = updatePieceWithNewJumps(b.piece, this)
        }
        const hasForceJumpsBlue = this.board
            .some(b => b.piece && b.piece.type === 'x' && b.piece.moves.length > 0)
        // no force jumps for blue
        if (!hasForceJumpsBlue) {
            for (let i = 0; i < this.board.length; i++) {
                const b = this.board[i];
                if (!b.piece || b.piece.type === 'z') {
                    continue;
                }
                b.piece.moves = updatePieceWithNewMoves(b.piece, this)
            }
        }

        // for red jumps only
        for (let i = 0; i < this.board.length; i++) {
            const b = this.board[i];
            if (!b.piece || b.piece.type === 'x') {
                continue;
            }
            b.piece.moves = updatePieceWithNewJumps(b.piece, this)
        }
        const hasForceJumpsRed = 
            this.board.some(b => b.piece && b.piece.type === 'z' && b.piece.moves.length > 0)
        // no force jumps for red
        if (!hasForceJumpsRed) {
            for (let i = 0; i < this.board.length; i++) {
                const b = this.board[i];
                if (!b.piece || b.piece.type === 'x') {
                    continue;
                }
                b.piece.moves = updatePieceWithNewMoves(b.piece, this)
            }
        }
    }
        

    restartGame(board: Array<BlockI>) : BoardI {
        this.board = board;

        return cloneDeep(this)
    }

    movePiece(piece: PieceI, from: coordinates, to: coordinates): BoardI {
        const currentBlock = this.board.find(b => b.coordinates.x === from.x && b.coordinates.y === from.y)
        if (!currentBlock) {
            throw new Error('cannot find "from" block')
        }
        
        clearAllHighlights(this.board)
        // moves the piece accordingly
        for (let i = 0; i < this.board.length; i++) {
            let b = this.board[i]
            if (b.coordinates.x === from.x && b.coordinates.y === from.y) {
                b.piece = undefined;
            }
            if (b.coordinates.x === to.x && b.coordinates.y === to.y) {
                b.piece = piece
            }
        }
        // removes a capture piece and compute scores
        removeCapturedPiece(to, from, piece, this)
        
        // update each pieces moves
        this.updateBoardWithNewMoves()

        // promote the piece if it landed on the other side
        promotePiece(piece, to.y)
    

        return cloneDeep(this)
    }

    // private checkIfPieceHasMultiJump(piece: PieceI, ) {

    // }

    highLightMoves(moves: Array<coordinates>): BoardI {
        for (let i = 0; i < this.board.length; i++) {
            const block = this.board[i]
            const {x,y} = block.coordinates
            if (moves.some(m => m.x === x && m.y === y)) {
                block.highlighted = true;
                continue; 
            }
            block.highlighted = false;
        }
                
        return cloneDeep(this)
            
    }
}


