import { BlockI } from "../types";

/**
* @description sets all highlighted blocks to false
*/
export function clearAllHighlights(board: Array<BlockI>) {        
    for (let i = 0; i < board.length; i++) {
        board[i].highlighted = false;
    }
}