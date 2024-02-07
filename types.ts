import { NativeStackNavigationProp } from "@react-navigation/native-stack";
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
    isGameOver: boolean;
    movePiece(
        piece: PieceI, 
        from: coordinates, 
        to: coordinates
    ) : BoardI
    highLightMoves(moves: Array<coordinates>) : BoardI;    
    restartGame(board: Array<BlockI>) : BoardI;
    score: number;
}   

export type RootStackParamList = {
    Home: undefined;
    Game: undefined;
};

// Define navigation prop types for each screen
export type RootStackNavigationProps<T extends keyof RootStackParamList> = {
    navigation: NativeStackNavigationProp<RootStackParamList, T>;
  };