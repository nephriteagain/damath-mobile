import { operation } from "../../lib/data";
import { coordinates } from "../../types";
import { cloneDeep } from "lodash";

export interface PieceI {
    type: 'x'|'z';
    value: number;
    isKing: boolean;
    moves: Array<coordinates>;
}

export interface BlockI {
    coordinates: {x:number;y:number};
    operation: operation;
    highlighted: boolean;
    piece?: PieceI;
    topLeft?: BlockI;
    topRight?: BlockI;
    botLeft?: BlockI;
    botRight?: BlockI    
}
    
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
    public piece

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

export interface BoardI {
    board: Array<BlockI>;
    movePiece(
        piece: PieceI, 
        from: coordinates, 
        to: coordinates
    ) : BoardI
    highLightMoves(moves: Array<coordinates>) : BoardI;    

}   

export class Board implements BoardI {
    public board

    constructor(board: Array<BlockI>) {
        this.board = board;
    }

    
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
     * @description checks if a block exist, have piece, and what type
     */
    private isBlockWithOppositePiece(block: BlockI|undefined, pieceType: 'x'|'z') : boolean {
        if (!block) {
            return false;
        }
        return Boolean(block.piece && block.piece.type !== pieceType)
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
        if (!piece.isKing) {
            // this removes any capture piece for regular piece only
            // this determines the direction of the jump and only works when a piece is captured
            const topRightJump = to.x - from.x === 2 && to.y - from.y === 2
            const topLeftJump = to.x - from.x === -2 && to.y - from.y === 2
            const botRightJump = to.x - from.x === 2 && to.y - from.y === -2
            const botLeftJump = to.x - from.x === -2 && to.y - from.y === -2
            if (topRightJump) {
                currentBlock.topRight!.piece = undefined;
            }
            if (topLeftJump) {
                currentBlock.topLeft!.piece = undefined;
            }
            if (botRightJump) {
                currentBlock.botRight!.piece = undefined;
            }
            if (botLeftJump) {
                currentBlock.botLeft!.piece = undefined;
            }
        }
        // update each pieces moves
        this.updateBoardWithNewMoves()

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

