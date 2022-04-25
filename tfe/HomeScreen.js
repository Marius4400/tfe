import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    Button 
} from 'react-native';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bonjour et bienvenue sur mon application !</Text>
        <Button style={styles.button}
          title="Radio"
          onPress={() =>
            this.props.navigation.navigate('RadioPlayer')
          }
        />
        <View style={styles.space} />
        <Button style={styles.button}
        title="Ma musique"
        onPress={() =>
          this.props.navigation.navigate('MaMusique')
        }
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CCC',
    padding: 5,
    flex: 1,
    paddingVertical: 8,
  },
  title: {
    marginTop: 10,
    color: '#20232a',
    textAlign: 'center',
    fontSize: 18,
    paddingVertical: 8,
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#E3BB76',
    textAlign: 'center',
    padding: 5,
    justifyContent: 'center',
    paddingVertical: 8,
  },
  space: {
    width: 20,
    height: 20,
  },
});


export default HomeScreen;