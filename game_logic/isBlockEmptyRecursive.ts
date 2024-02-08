import { BlockI, Direction, coordinates } from "../types";

/**
 * 
 * @param block the block the check if empty
 * @param moves array to store new moves
 * @param direction direction of the move
 * @description recursively checks blocks if empty and add it into the moves array
 */
export function isBlockEmptyRecursive(
    block: BlockI|undefined, 
    moves: Array<coordinates>, 
    direction : Direction
) {
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

    isBlockEmptyRecursive(nexBlock, moves, direction)
    return moves
}