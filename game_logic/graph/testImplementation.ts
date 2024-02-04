import { operation } from "../../lib/data";

interface PieceI {
    type: 'x'|'z';
    value: number;
    isKing: boolean;
    moves: Array<BlockI>;
}

interface BlockI {
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
    moves?: Array<BlockI>    
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

interface BoardI {
    board: Array<BlockI>
}

export class Board implements BoardI {
    public board

    constructor(board: Array<BlockI>) {
        this.board = board;
    }
}

