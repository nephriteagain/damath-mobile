import { ReactNode } from 'react'
import { PressableProps, Pressable, StyleSheet } from 'react-native'

type PlayableBlockProps = PressableProps & {
    highlighted: boolean;
    boxWidth: number
    children: ReactNode
}

export default function PlayableBlock({boxWidth, highlighted, children, onPress, ...props}: PlayableBlockProps) {


    return (
        <Pressable
        className={`
        items-center justify-center relative w-[12.5%] h-[12.5%]
        ${highlighted ? 'bg-[#99BC85]' : 'bg-white'}
        `}
        onPress={onPress}
        {...props}
        >
            {children}
        </Pressable>
    )
}
