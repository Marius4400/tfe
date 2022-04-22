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
        <Text>Bonjour et bienvenue sur mon application !.</Text>
        <Button
          title="Radio"
          onPress={() =>
            this.props.navigation.navigate('RadioList')
          }
        />
        <Button
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
    flex: 1,
    backgroundColor: '#CCC',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;