import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Board from './components/Board';
import GlobalProvider from './GlobalContext';
import PlayerTurn from './components/PlayerTurn';

export default function App() {
  return (
    <GlobalProvider>
      <View style={styles.container}>
        <PlayerTurn />
        <Board />
        <StatusBar style="auto" />
      </View>
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
