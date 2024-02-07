import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useGlobalContext } from "../GlobalContext";

export default function PlayerTurn() {
    const { playerTurn } = useGlobalContext()

    const msg = playerTurn === 'z' ? `Red's turn` : `Blue's turn`

    return (
        <View 
        className={`
            ${playerTurn === 'z' ? 'bg-red-600' : 'bg-blue-700'}
            h-[60] w-screen flex-row items-center justify-center
        `}
        >
            <Text 
            className="text-3xl font-bold text-white"
            >
                {msg}
            </Text>
        </View>
    )
}
