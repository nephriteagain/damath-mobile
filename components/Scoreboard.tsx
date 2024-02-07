import { View, Text } from "react-native";
import { useGlobalContext } from "../GlobalContext";

export default function Scoreboard() {

    const { scores } = useGlobalContext()

    return (
        <View>
            <Score  redScore={scores.z} blueScore={scores.x} />
        </View>
    )
}


function Score({redScore, blueScore}: {redScore:number, blueScore:number}) {
    

    return (
    <>        
    <View 
    className="flex-row w-screen justify-between"
    >
        <View 
        className="flex-row w-[50%] items-center justify-center px-4 py-3 bg-blue-700"
        >
            <Text 
            className="text-4xl text-white"
            >
            {blueScore}
            </Text>
        </View>        
        <View 
        className="flex-row w-[50%] items-center justify-center px-4 py-3 bg-red-600"
        >
            <Text 
            className="text-4xl text-white"
            >
            {redScore}
            </Text>            
        </View>
    </View>
    </>
    )
}
