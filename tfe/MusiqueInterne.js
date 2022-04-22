import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    Button 
} from 'react-native';

class MaMusique extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Que veux-tu écouter ? :)</Text>
        <Button
          title="Retour à la page d'accueil"
          onPress={() =>
            this.props.navigation.navigate('Home')
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default MaMusique;