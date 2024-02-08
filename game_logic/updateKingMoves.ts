import { BlockI, Direction, coordinates } from "../types"
import { isBlockEmptyRecursive } from "./classHelpers"

/**
 * 
 * @param block the current block where the piece is located
 * @param moves the array where new moves will be stored
 * @description add all possble moves of a king piece
 */
export function updateKingMoves(
    block: BlockI|undefined, 
    moves: Array<coordinates>
) : Array<coordinates> {       
    isBlockEmptyRecursive(block?.topLeft, moves, Direction.TOP_LEFT)
    isBlockEmptyRecursive(block?.topRight, moves, Direction.TOP_RIGHT)
    isBlockEmptyRecursive(block?.botLeft, moves, Direction.BOT_LEFT)
    isBlockEmptyRecursive(block?.botRight, moves, Direction.BOT_RIGHT)

    return moves
}