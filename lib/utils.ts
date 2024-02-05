import { boxPiece, piece } from "./data";

/**
 * 
 * @param boardData 
 * @param c coordinates
 * @returns the status of whether the block is an available move and what is the index
 * @description checks if the selected block is an available move  to a certain piece
 */
export function blockMovable(
    boardData: Array<boxPiece>, 
    c: {x:number;y:number}
) : {status:boolean;index:number} {
    const block = boardData.find(b => b.x === c.x && b.y === c.y)
    return {
        status: Boolean(block && block.playable && !block.piece),
        index: block ? boardData.indexOf(block) : -1
    }
}

/**
 * 
 * @param boardData 
 * @param c coordinates
 * @param pieceType
 * @returns the status of whether the block is an available jump and what is the index
 * @description checks if the selected block is an available jump  to a certain piece
 */
export function blockJumpable(
    boardData:Array<boxPiece>, 
    pieceType: 'x'|'z',
    jumpC: {x:number;y:number},
    captureC: {x:number;y:number},
) : {status:boolean;index:number} {
    const jumpBlock = boardData.find(b => b.x === jumpC.x && b.y === jumpC.y)
    const captureBlock = boardData.find(b => b.x === captureC.x && b.y === captureC.y)


    const isPlayableHasOppositePiece = Boolean(
        captureBlock &&
        captureBlock.playable && 
        captureBlock.piece?.type === pieceType
    )

    if (!isPlayableHasOppositePiece) {
        return {
            status: false,
            index: -1
        }
    }

    const isPlayableEmpty = Boolean(
        jumpBlock &&
        jumpBlock.playable &&
        !jumpBlock.piece
    )

    if (!isPlayableEmpty) {
        return {
            status: false,
            index: -1
        }
    }

    return {
        status: true,
        index: jumpBlock ? boardData.indexOf(jumpBlock) : -1
    }
    

}

export function makeC(x:number,y:number) : {x:number,y:number} {
    return {x,y}
}

export function generateBoardCoordinate() :  Array<{x:number;y:number}> {
    let x = 0;
    let y = 7;
    const coordinateArr : Array<{x:number;y:number}> = []

    while  (y >= 0) {
        while (x <= 7) {
            coordinateArr.push({x,y})
            ++x
        }
        x = 0
        --y
    }

    return coordinateArr
}