import { operation } from "../types";

export type boxPiece = {
    x: number;
    y: number;
    playable: boolean;
    operation?: operation;
    piece?: piece;
    hightlighted?: boolean;
}

export type piece = {
    type: "x" | "z";
    value: number;
    isKing: boolean;
    moves: number[];
    label?: string;
}

export const COUNTING: boxPiece[] = [
    {
        x: 0,
        y: 7,
        hightlighted: false,
        playable: true,
        piece: { type: "x", isKing: false, value: 3, moves: [] },
        operation: operation.MULTIPLY,
    },
    { x: 1, y: 7, playable: false },

    {
        x: 2,
        y: 7,
        hightlighted: false,
        playable: true,
        piece: { type: "x", isKing: false, value: 6, moves: [] },
        operation: operation.DIVIDE,
    },
    { x: 3, y: 7, playable: false },

    {
        x: 4,
        y: 7,
        hightlighted: false,
        playable: true,
        piece: { type: "x", isKing: false, value: 9, moves: [] },
        operation: operation.SUBTRACT,
    },
    { x: 5, y: 7, playable: false },

    {
        x: 6,
        y: 7,
        hightlighted: false,
        playable: true,
        piece: { type: "x", isKing: false, value: 12, moves: [] },
        operation: operation.ADD,
    },
    { x: 7, y: 7, playable: false },

    { x: 0, y: 6, playable: false },
    {
        x: 1,
        y: 6,
        hightlighted: false,
        playable: true,
        piece: { type: "x", isKing: false, value: 8, moves: [] },
        operation: operation.DIVIDE,
    },

    { x: 2, y: 6, playable: false },
    {
        x: 3,
        y: 6,
        hightlighted: false,
        playable: true,
        piece: { type: "x", isKing: false, value: 11, moves: [] },
        operation: operation.MULTIPLY,
    },

    { x: 4, y: 6, playable: false },
    {
        x: 5,
        y: 6,
        hightlighted: false,
        playable: true,
        piece: { type: "x", isKing: false, value: 4, moves: [] },
        operation: operation.ADD,
    },

    { x: 6, y: 6, playable: false },
    {
        x: 7,
        y: 6,
        hightlighted: false,
        playable: true,
        piece: { type: "x", isKing: false, value: 1, moves: [] },
        operation: operation.SUBTRACT,
    },

    {
        x: 0,
        y: 5,
        hightlighted: false,
        playable: true,
        piece: { type: "x", isKing: false, value: 5, moves: [25] },
        operation: operation.SUBTRACT,
    },
    { x: 1, y: 5, playable: false },

    {
        x: 2,
        y: 5,
        hightlighted: false,
        playable: true,
        piece: { type: "x", isKing: false, value: 2, moves: [25, 27] },
        operation: operation.ADD,
    },
    { x: 3, y: 5, playable: false },

    {
        x: 4,
        y: 5,
        hightlighted: false,
        playable: true,
        piece: { type: "x", isKing: false, value: 7, moves: [27, 29] },
        operation: operation.MULTIPLY,
    },
    { x: 5, y: 5, playable: false },

    {
        x: 6,
        y: 5,
        hightlighted: false,
        playable: true,
        piece: { type: "x", isKing: false, value: 10, moves: [29, 31] },
        operation: operation.DIVIDE,
    },
    { x: 7, y: 5, playable: false },

    { x: 0, y: 4, playable: false },
    {
        x: 1,
        y: 4,
        hightlighted: false,
        playable: true,
        operation: operation.ADD,
    },

    { x: 2, y: 4, playable: false },
    {
        x: 3,
        y: 4,
        hightlighted: false,
        playable: true,
        operation: operation.SUBTRACT,
    },

    { x: 4, y: 4, playable: false },
    {
        x: 5,
        y: 4,
        hightlighted: false,
        playable: true,
        operation: operation.DIVIDE,
    },

    { x: 6, y: 4, playable: false },
    {
        x: 7,
        y: 4,
        hightlighted: false,
        playable: true,
        operation: operation.MULTIPLY,
    },

    {
        x: 0,
        y: 3,
        hightlighted: false,
        playable: true,
        operation: operation.MULTIPLY,
    },
    { x: 1, y: 3, playable: false },

    {
        x: 2,
        y: 3,
        hightlighted: false,
        playable: true,
        operation: operation.DIVIDE,
    },
    { x: 3, y: 3, playable: false },

    {
        x: 4,
        y: 3,
        hightlighted: false,
        playable: true,
        operation: operation.SUBTRACT,
    },
    { x: 5, y: 3, playable: false },

    {
        x: 6,
        y: 3,
        hightlighted: false,
        playable: true,
        operation: operation.ADD,
    },
    { x: 7, y: 3, playable: false },

    { x: 0, y: 2, playable: false },
    {
        x: 1,
        y: 2,
        hightlighted: false,
        playable: true,
        piece: { type: "z", isKing: false, value: 10, moves: [32, 34] },
        operation: operation.DIVIDE,
    },

    { x: 2, y: 2, playable: false },
    {
        x: 3,
        y: 2,
        hightlighted: false,
        playable: true,
        piece: { type: "z", isKing: false, value: 7, moves: [34, 36] },
        operation: operation.MULTIPLY,
    },

    { x: 4, y: 2, playable: false },
    {
        x: 5,
        y: 2,
        hightlighted: false,
        playable: true,
        piece: { type: "z", isKing: false, value: 2, moves: [36, 38] },
        operation: operation.ADD,
    },

    { x: 6, y: 2, playable: false },
    {
        x: 7,
        y: 2,
        hightlighted: false,
        playable: true,
        piece: { type: "z", isKing: false, value: 5, moves: [38] },
        operation: operation.SUBTRACT,
    },

    {
        x: 0,
        y: 1,
        hightlighted: false,
        playable: true,
        piece: { type: "z", isKing: false, value: 1, moves: [] },
        operation: operation.SUBTRACT,
    },
    { x: 1, y: 1, playable: false },

    {
        x: 2,
        y: 1,
        hightlighted: false,
        playable: true,
        piece: { type: "z", isKing: false, value: 4, moves: [] },
        operation: operation.ADD,
    },
    { x: 3, y: 1, playable: false },

    {
        x: 4,
        y: 1,
        hightlighted: false,
        playable: true,
        piece: { type: "z", isKing: false, value: 11, moves: [] },
        operation: operation.MULTIPLY,
    },
    { x: 5, y: 1, playable: false },

    {
        x: 6,
        y: 1,
        hightlighted: false,
        playable: true,
        piece: { type: "z", isKing: false, value: 8, moves: [] },
        operation: operation.DIVIDE,
    },
    { x: 7, y: 1, playable: false },

    { x: 0, y: 0, playable: false },
    {
        x: 1,
        y: 0,
        hightlighted: false,
        playable: true,
        piece: { type: "z", isKing: false, value: 12, moves: [] },
        operation: operation.ADD,
    },

    { x: 2, y: 0, playable: false },
    {
        x: 3,
        y: 0,
        hightlighted: false,
        playable: true,
        piece: { type: "z", isKing: false, value: 9, moves: [] },
        operation: operation.SUBTRACT,
    },

    { x: 4, y: 0, playable: false },
    {
        x: 5,
        y: 0,
        hightlighted: false,
        playable: true,
        piece: { type: "z", isKing: false, value: 6, moves: [] },
        operation: operation.DIVIDE,
    },

    { x: 6, y: 0, playable: false },
    {
        x: 7,
        y: 0,
        hightlighted: false,
        playable: true,
        piece: { type: "z", isKing: false, value: 3, moves: [] },
        operation: operation.MULTIPLY,
    },
];