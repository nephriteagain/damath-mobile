import { StatusBar } from 'expo-status-bar';
import { StyleSheet,View } from 'react-native';

import Board from './components/Board';
import GlobalProvider from './GlobalContext';
import PlayerTurn from './components/PlayerTurn';
import GameOverModal from './components/GameOverModal';
import Scoreboard from './components/Scoreboard';

export default function App() {
  return (
    <GlobalProvider>  
      <View style={styles.container}>
        <PlayerTurn />
        <Board />
        <Scoreboard />
        <StatusBar style="auto" />
      </View>
      <GameOverModal />
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
