import { BoardI } from "../types"

export function resetScore(boardData: BoardI) {
    boardData.score = 0
}