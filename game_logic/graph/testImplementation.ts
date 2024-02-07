import { coordinates, Direction, operation, PieceI, BlockI, BoardI } from "../../types";
import { cloneDeep } from "lodash";
import { CAPTURE_GROUPS } from '../../lib/CAPTURE_GROUPS'




type BlockContructorArgs = {
    coordinates: {x:number;y:number};
    operation: operation;
    highlighted?: boolean;
    piece?: PieceI
}

export class Block implements BlockI {
    public coordinates;
    public operation;
    public highlighted;
    public piece;

    constructor (
        {
            coordinates, 
            operation, 
            highlighted=false, 
            piece
        } : BlockContructorArgs            
    ) {
        this.coordinates = coordinates;
        this.operation = operation;
        this.highlighted = highlighted;
        this.piece = piece
    }
}

type PieceContructorArgs = {
    type: 'x'|'z',
    value: number,
    isKing?: boolean,
    moves?: Array<coordinates> 
}

export class Piece implements PieceI {
    public type;
    public value;
    public isKing;
    public moves;    

    constructor({
        type,
        value,
        isKing=false,
        moves=[]
    }: PieceContructorArgs) {
        this.type = type;
        this.value = value;
        this.isKing = isKing;
        this.moves = moves;        
    }
}



export class Board implements BoardI {
    public board;
    public isGameOver: boolean;        
    public score: number;

    constructor(board: Array<BlockI>) {
        this.board = board;
        this.isGameOver = false;
        this.score = 0;
    }

    /**
     * @description sets all highlighted blocks to false
     */
    private clearAllHighlights() {        
        for (let i = 0; i < this.board.length; i++) {
            this.board[i].highlighted = false;
        }
    }

    /**
     * @description checks if a block exist and have piece
     */
    private isBlockEmpty(block: BlockI|undefined) : boolean {
        if (!block) {
            return false;
        }
        return Boolean(!block.piece)
    }

    /**
     * 
     * @param block the block the check if empty
     * @param moves array to store new moves
     * @param direction direction of the move
     * @description recursively checks blocks if empty and add it into the moves array
     */
    private isBlockEmptyRecursive(block: BlockI|undefined, moves: Array<coordinates>, direction : Direction) {
        if (!block) {
            return moves;
        }
        if (block.piece) {
            return moves
        }

        moves.push(block.coordinates)
        const nexBlock = 
            direction === Direction.TOP_LEFT ? block.topLeft :
            direction === Direction.TOP_RIGHT ? block.topRight :
            direction === Direction.BOT_LEFT ? block.botLeft :
            direction === Direction.BOT_RIGHT ? block.botRight : 
            undefined

        this.isBlockEmptyRecursive(nexBlock, moves, direction)
        return moves
    }

    /**
     * @description checks if a block exist, have piece, and what type
     */
    private isBlockWithOppositePiece(block: BlockI|undefined, pieceType: 'x'|'z') : boolean {
        if (!block) {
            return false;
        }
        return Boolean(block.piece && block.piece.type !== pieceType)
    }
    

    /**
     * 
     * @param block the current block where the piece is located
     * @param moves the array where new moves will be stored
     * @description add all possble moves of a king piece
     */
    private updatedKingMoves(block: BlockI|undefined, moves: Array<coordinates>) : Array<coordinates> {       
        this.isBlockEmptyRecursive(block?.topLeft, moves, Direction.TOP_LEFT)
        this.isBlockEmptyRecursive(block?.topRight, moves, Direction.TOP_RIGHT)
        this.isBlockEmptyRecursive(block?.botLeft, moves, Direction.BOT_LEFT)
        this.isBlockEmptyRecursive(block?.botRight, moves, Direction.BOT_RIGHT)

        return moves
    }

    private searchOppositePiece(block: BlockI|undefined, piece: PieceI, direction: Direction) : BlockI|undefined {
        if (!block) {
            return undefined
        }
        if (this.isBlockWithOppositePiece(block, piece.type)) {{
            return block
        }}
        const nextBlock = 
            direction === Direction.TOP_RIGHT ? block.topRight :
            direction === Direction.TOP_LEFT ? block.topLeft :
            direction === Direction.BOT_RIGHT ? block.botRight :
            direction === Direction.BOT_LEFT ? block.botLeft :
            undefined
        return this.searchOppositePiece(nextBlock, piece, direction)
    }

    private searchKingJump(block: BlockI|undefined, piece: PieceI, moves: Array<coordinates>, direction: Direction) : Array<coordinates> {
        if (!block) {
            return moves;
        }
        const oppositePieceBlock = this.searchOppositePiece(block, piece, direction)
        
        if (oppositePieceBlock) {
            const nextBlock = 
            direction === Direction.TOP_RIGHT ? oppositePieceBlock.topRight :
            direction === Direction.TOP_LEFT ? oppositePieceBlock.topLeft :
            direction === Direction.BOT_RIGHT ? oppositePieceBlock.botRight :
            direction === Direction.BOT_LEFT ? oppositePieceBlock.botLeft :
            undefined

            this.isBlockEmptyRecursive(nextBlock, moves, direction)
        }

        return moves
    }

    private updateKingJumps(block: BlockI|undefined, piece: PieceI, moves: Array<coordinates>) : Array<coordinates> {
        this.searchKingJump(block?.topLeft, piece, moves, Direction.TOP_LEFT)
        this.searchKingJump(block?.topRight, piece, moves, Direction.TOP_RIGHT)
        this.searchKingJump(block?.botLeft, piece, moves, Direction.BOT_LEFT)
        this.searchKingJump(block?.botRight, piece, moves, Direction.BOT_RIGHT)

        return moves
    }
    
    private updatePieceWithNewJumps(piece: PieceI) : Array<coordinates> {
        const newMoves : Array<coordinates> = [];

        const pieceBlock = this.board.find(b => b.piece && b.piece.type === piece.type && b.piece.value === piece.value)
        if (!pieceBlock) {
            throw new Error('piece not found')
        }
        const { type , isKing } = piece
        if (!isKing) {
            if (
                pieceBlock.botLeft && this.isBlockWithOppositePiece(pieceBlock.botLeft, type) &&
                pieceBlock.botLeft.botLeft && this.isBlockEmpty(pieceBlock.botLeft.botLeft)
            ) {            
                newMoves.push(pieceBlock.botLeft.botLeft.coordinates)
            }
            if (
                pieceBlock.botRight && this.isBlockWithOppositePiece(pieceBlock.botRight, type) &&
                pieceBlock.botRight.botRight && this.isBlockEmpty(pieceBlock.botRight.botRight)
            ) {
                newMoves.push(pieceBlock.botRight.botRight.coordinates)
            }
            if (
                pieceBlock.topLeft && this.isBlockWithOppositePiece(pieceBlock.topLeft, type) &&
                pieceBlock.topLeft.topLeft && this.isBlockEmpty(pieceBlock.topLeft.topLeft)
            ) {
                newMoves.push(pieceBlock.topLeft.topLeft.coordinates)
            }
            if (
                pieceBlock.topRight && this.isBlockWithOppositePiece(pieceBlock.topRight, type) &&
                pieceBlock.topRight.topRight && this.isBlockEmpty(pieceBlock.topRight.topRight)
            ) {
                newMoves.push(pieceBlock.topRight.topRight.coordinates)
            }

        }
        if (isKing) {
            this.updateKingJumps(pieceBlock, piece, newMoves)
        }
        return newMoves
    }

    private updatePieceWithNewMoves(piece: PieceI) : Array<coordinates> {
        const newMoves : Array<coordinates> = [];
        const pieceBlock = this.board.find(b => b.piece && b.piece.type === piece.type && b.piece.value === piece.value)
        if (!pieceBlock) {
            throw new Error('piece not found')
        }
        const { type , isKing } = piece
        if (!isKing) {                           
            if (type === 'x' && pieceBlock.botLeft && this.isBlockEmpty(pieceBlock.botLeft)) {
                newMoves.push(pieceBlock.botLeft.coordinates)
            }
            if (type === 'x' && pieceBlock.botRight && this.isBlockEmpty(pieceBlock.botRight)) {
                newMoves.push(pieceBlock.botRight.coordinates)
            }
            if (type === 'z' && pieceBlock.topLeft && this.isBlockEmpty(pieceBlock.topLeft)) {
                newMoves.push(pieceBlock.topLeft.coordinates)
            }
            if (type === 'z' && pieceBlock.topRight && this.isBlockEmpty(pieceBlock.topRight)) {
                newMoves.push(pieceBlock.topRight.coordinates)
            }
        }
        if (isKing) {
            this.updatedKingMoves(pieceBlock, newMoves)
        }

        
        return newMoves
    }

    private updateBoardWithNewMoves()  {
        // for blue jumps only
        for (let i = 0; i < this.board.length; i++) {
            const b = this.board[i];
            if (!b.piece || b.piece.type === 'z') {
                continue;
            }
            b.piece.moves = this.updatePieceWithNewJumps(b.piece)
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
                b.piece.moves = this.updatePieceWithNewMoves(b.piece)
            }
        }

        // for red jumps only
        for (let i = 0; i < this.board.length; i++) {
            const b = this.board[i];
            if (!b.piece || b.piece.type === 'x') {
                continue;
            }
            b.piece.moves = this.updatePieceWithNewJumps(b.piece)
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
                b.piece.moves = this.updatePieceWithNewMoves(b.piece)
            }
        }
    }

    private promotePiece(piece: Piece, y: number) {
        if (piece.isKing) return;
        if (piece.type === 'z' && y === 7) {
            piece.isKing = true;
        }
        if (piece.type === 'x' && y === 0) {
            piece.isKing = true;
        }
    }

    private removedCapturedPiece(to: coordinates, from: coordinates, piece: PieceI) {
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
        const toBlock = this.board.find(b => b.coordinates.x === to.x && b.coordinates.y === to.y)
        const fromBlock = this.board.find(b => b.coordinates.x === from.x && b.coordinates.y === from.y)
        if (!toBlock) {
            throw new Error('"to" block not found')
        }
        if (!fromBlock) {
            throw new Error('"from" block not found')
        }
        // get the indices of those blocks
        const toIndex = this.board.indexOf(toBlock)
        const fromIndex = this.board.indexOf(fromBlock)
        
        // loop in remove the capture piece
        for (let i = 0; i < this.board.length; i++) {
            const b = this.board[i]
            // check if the block is part of the capture group
            const  isPartOfCaptureGroup =  capturedArea.some(c => c.x === b.coordinates.x && c.y === b.coordinates.y)
            if (isPartOfCaptureGroup && b.piece) {
                

                const  blockIndex = this.board.indexOf(b)
                // this means to block is in the middle of the from and to blocks
                if (
                    blockIndex > toIndex && blockIndex < fromIndex ||
                    blockIndex < toIndex && blockIndex > fromIndex
                ) {                    
                    this.computeScore(piece, b.piece, toBlock.operation)
                    // remove  the captured piece
                    this.board[i].piece =  undefined;
                    return;
                }
            }
        }
        this.resetScore()        
        return;
    }
    computeScore(movedPiece: PieceI, capturedPiece: PieceI, destinationOperation: operation,) : void {
        const kingMultiplier =
            movedPiece.isKing && capturedPiece.isKing ? 
            4 :
            movedPiece.isKing || capturedPiece.isKing ?
            2 :
            1


        if (destinationOperation === operation.ADD) {            
            const total = movedPiece.value + capturedPiece.value
            this.score = total * kingMultiplier
            return
        }
        if (destinationOperation === operation.SUBTRACT) {
            const total = movedPiece.value - capturedPiece.value
            this.score = total * kingMultiplier
            return
        }
        if (destinationOperation === operation.MULTIPLY) {
            const total = movedPiece.value * capturedPiece.value
            this.score = total * kingMultiplier
            return
        }
        if (destinationOperation === operation.DIVIDE) {
            if (capturedPiece.value === 0) {
                 this.score = 0
                 return
            }
            const total = (movedPiece.value / capturedPiece.value) * kingMultiplier
            this.score = Number(total.toFixed(2))
            return
        }
        this.score = 0
        return
    }
    resetScore() {
        this.score = 0
    }
    

    private gameOverChecker() {
        let xPlayerHasMoves = false;
        for (let i = 0; i < this.board.length; i++) {
            const b = this.board[i];
            if (b.piece && b.piece.type === 'x' && b.piece.moves.length > 0) {
                xPlayerHasMoves = true;
                break;
            }
        }
        let zPlayerHasMoves = false;
        for (let i = 0; i < this.board.length; i++) {
            const b = this.board[i];
            if (b.piece && b.piece.type === 'z' && b.piece.moves.length > 0) {
                zPlayerHasMoves = true;
                break;
            }
        }
        if (!xPlayerHasMoves || !zPlayerHasMoves) {
            this.isGameOver = true
        }
    }

    restartGame(board: Array<BlockI>) : BoardI {
        this.board = board;
        this.isGameOver = false;

        return cloneDeep(this)
    }

    movePiece(piece: PieceI, from: coordinates, to: coordinates): BoardI {
        const currentBlock = this.board.find(b => b.coordinates.x === from.x && b.coordinates.y === from.y)
        if (!currentBlock) {
            throw new Error('cannot find "from" block')
        }
        
        this.clearAllHighlights()
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
        this.removedCapturedPiece(to, from, piece)
        
        // promote the piece if it landed on the other side
        this.promotePiece(piece, to.y)
        
        // update each pieces moves
        this.updateBoardWithNewMoves()

        this.gameOverChecker()

        return cloneDeep(this)
    }

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


