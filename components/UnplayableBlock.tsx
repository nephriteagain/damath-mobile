import { View, StyleSheet } from "react-native"

export default function UnplayableBlock({boxWidth}: {boxWidth:number}) {
    return (
        <View 
            style={[
                styles.box, {width: boxWidth, height: boxWidth}
            ]}
            >
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: '#747264',        
    },
})