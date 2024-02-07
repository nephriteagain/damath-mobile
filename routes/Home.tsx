import { View, Text, StyleSheet, Pressable } from 'react-native';
import { RootStackNavigationProps } from '../types';

type HomeProps = RootStackNavigationProps<'Home'>;

export default function Home ({ navigation }: HomeProps) {    
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Damath Wars</Text>
      <Pressable        
        onPress={() => navigation.navigate('Game')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Play Damath</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        gap:48
    },
    title: {
        fontWeight: 'bold',
        fontSize:48,
    },
    button: {
        backgroundColor: 'green',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 16,
        elevation: 8
    },
    buttonText: {
        color: 'white',
        fontSize: 28,
        fontWeight: '600',
    }

})