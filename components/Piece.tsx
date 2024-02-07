import { Pressable, Text } from "react-native";
import { useGlobalContext } from "../GlobalContext";
import { ActionKind } from "../gameReducer";
import { PieceI } from "../types";

type PieceProps = PieceI & {
    x: number;
    y: number;
}

export default function Piece({type, value, isKing, moves,  x, y}:PieceProps) {
    const { dispatch, playerTurn } = useGlobalContext()

    const showMoves = (playerTurn === type && moves.length > 0) ? 
        () => {
            dispatch({
                type: ActionKind.HIGHLIGHT_MOVES,
                payload: {x,y}
            })
        } :
        undefined

    const movableStateStyle = moves.length > 0 ?  "opacity-100" : "opacity-70"
    const pieceColorStyle = type === 'z' ? "bg-red-500" : "bg-blue-700"
    const pieceKingStyle =  isKing ? "border-2 border-[gold]" : ""
    return (
        <Pressable 
            onPressIn={() => {
                typeof showMoves === 'function' && showMoves()
            }}
            className={`
                w-5/6 h-5/6 rounded-full items-center justify-center
                ${movableStateStyle} ${pieceColorStyle} ${pieceKingStyle}
            `}
            >
                <Text 
                className="text-2xl font-semibold text-white"
                >
                {value}
                </Text>
        </Pressable>
    )
}
