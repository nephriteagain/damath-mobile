import { PieceI, coordinates } from "../../types";


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