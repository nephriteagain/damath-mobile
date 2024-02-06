import { ReactNode } from 'react'
import { PressableProps, Pressable, StyleSheet } from 'react-native'

type PlayableBlockProps = PressableProps & {
    highlighted: boolean;
    boxWidth: number
    children: ReactNode
}

export default function PlayableBlock({boxWidth, highlighted, children, onPress, ...props}: PlayableBlockProps) {
    const boxColorStyle = highlighted  ? styles.boxHighlighted : styles.boxPlayable


    return (
        <Pressable
        style={[styles.box, boxColorStyle, {width: boxWidth, height: boxWidth}]}
        onPress={onPress}
        {...props}
        >
            {children}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    box: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    boxPlayable: {
        backgroundColor: '#fff'
    },
    boxHighlighted: {
        backgroundColor: '#99BC85'
    },
})