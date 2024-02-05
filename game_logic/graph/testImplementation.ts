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

    
    private clearAllHighlights() : Array<BlockI> {
        const boardCopy = cloneDeep(this.board)
            .map(b => {
                return {
                    ...b,
                    highlighted: false
                }
            })
        this.board = boardCopy;
        return this.board;
    }

    // private updatePieceWithNewMoves(piece: PieceI) : PieceI {
    //     const newMoves = [];
        
    // }

    // private updateBoardWithNewMoves() : Array<BlockI> {
    //     const boardCopy = structuredClone(this.board)
        
    // }

    movePiece(piece: PieceI, from: coordinates, to: coordinates): BoardI {
        const currentBlock = this.board.find(b => b.coordinates.x === from.x && b.coordinates.y === from.y)
        if (!currentBlock) {
            throw new Error('cannot find "from" block')
        }
        const cleanBoard = this.clearAllHighlights()
        const boardCopy = cloneDeep(cleanBoard)
            .map(b => {
                if (b.coordinates.x === from.x && b.coordinates.y === from.y) {
                    return {
                        ...b,
                        piece: undefined
                    }
                }
                if (b.coordinates.x === to.x && b.coordinates.y === to.y) {
                    return {
                        ...b,
                        piece
                    }
                }
                return b
            })
        this.board = boardCopy;
        return cloneDeep(this)
    }

    highLightMoves(moves: Array<coordinates>): BoardI {
        const boardCopy = cloneDeep(this.board)
            .map(b => {
                const {x,y} = b.coordinates
                if (moves.some(m => m.x === x && m.y === y)) {
                    return {
                        ...b,
                        highlighted: true
                    }
                }
                return {
                    ...b,
                    highlighted: false
                }
            })
            this.board = boardCopy
            return cloneDeep(this)
            
    }
}

