import { View, Text, StyleSheet } from "react-native";
import { useGlobalContext } from "../GlobalContext";

export default function Scoreboard() {

    const { scores } = useGlobalContext()

    return (
        <View>
            <Score  redScore={scores.z} blueScore={scores.x} />
        </View>
    )
}
import { Dimensions } from "react-native";

const dimensions = Dimensions.get('window')

function Score({redScore, blueScore}: {redScore:number, blueScore:number}) {
    

    return (
    <>        
    <View style={styles.container}>
        <View style={[styles.score, {backgroundColor: 'blue'}]}>  
            <Text style={{fontSize: 36, color: 'white'}}>
            {blueScore}
            </Text>
        </View>        
        <View style={[styles.score, {backgroundColor: 'red'}]}>
            <Text style={styles.text}>
            {redScore}
            </Text>            
        </View>
    </View>
    </>
    )
}


const styles = StyleSheet.create({
    container: { 
        flexDirection: 'row', 
        width: dimensions.width, 
        justifyContent: 'space-between'
    },
    score: {
        flexDirection: 'row', 
        gap: 4, width: '50%', 
        justifyContent: 'center', 
        paddingHorizontal: 16, 
        paddingVertical: 12
    },
    text: {
        fontSize: 36, 
        color: 'white'
    }
})