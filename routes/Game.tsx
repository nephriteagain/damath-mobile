import { View, Text, Button, StyleSheet } from 'react-native';
import { RootStackNavigationProps } from '../types';

import PlayerTurn from '../components/PlayerTurn';
import Board from '../components/Board';
import Scoreboard from '../components/Scoreboard';
import GameOverModal from '../components/GameOverModal';

type GameProps = RootStackNavigationProps<'Home'>;

export default function Game ({ navigation }: GameProps) {    
    return (
        <View style={styles.container}>
            <PlayerTurn />
            <Board />
            <Scoreboard />
            <GameOverModal />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    }
})

