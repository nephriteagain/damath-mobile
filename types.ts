export enum operation  {
    ADD = 'ADD',
    MULTIPLY = 'MULTIPLY',
    SUBTRACT = 'SUBTRACT',
    DIVIDE = 'DIVIDE'
}


export type coordinates = {
    x: number,
    y: number
}

export enum Direction {
    TOP_LEFT = 'TOP_LEFT',
    TOP_RIGHT = 'TOP_RIGHT',
    BOT_LEFT = 'BOT_LEFT',
    BOT_RIGHT = 'BOT_RIGHT',
}

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

export interface BoardI {
    board: Array<BlockI>;
    movePiece(
        piece: PieceI, 
        from: coordinates, 
        to: coordinates
    ) : BoardI
    highLightMoves(moves: Array<coordinates>) : BoardI;    
}   

