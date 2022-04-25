import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    Button, 
    TouchableOpacity, 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'
class MaMusique extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.title}>Quel album veux tu écouté ? :)</Text>
        <View style={styles.space} />
        <Button style={styles.btnhomes}
          title="Retour à la page d'accueil"
          onPress={() =>
            this.props.navigation.navigate('Home')
          }
        />
        <TouchableOpacity style={styles.btnhome} onPress={() => 
          this.props.navigation.navigate('Home')
          }>
          <Ionicons name='home' size={48} color='#444' />
        </TouchableOpacity>
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
    title: {
      marginTop: 10,
      color: '#20232a',
      textAlign: 'center',
      fontSize: 18,
      paddingVertical: 8,
    },
    space: {
      width: 20,
      height: 20,
    },
    btnhomes: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      height: 120,
    },
});

export default MaMusique;