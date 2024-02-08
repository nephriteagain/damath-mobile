import { PieceI } from "../types";
/**
 * @description promotes a piece if its reaches the other side
*/
export function promotePiece(piece: PieceI, y: number) {
    if (piece.isKing) return;
    if (piece.type === 'z' && y === 7) {
        piece.isKing = true;            
    }
    if (piece.type === 'x' && y === 0) {
        piece.isKing = true;
    }
}