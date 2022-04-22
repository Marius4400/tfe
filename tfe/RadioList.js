import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Button,
  Image, 
} from 'react-native';

class RadioList extends React.Component {

  render() {
    return (
      <View>
        <Text style={styles.title}>Choisis la radio que tu veux écouter :)</Text>
        <View style={styles.space} />
        <Image
          source={require('./RadioImage/tipik.png')}
          style={{width: 120, height: 80}}
        />
        <View style={styles.space} />
        <Button style={styles.btnhome}
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
      padding: 5,
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
    btnhome: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      height: 120,
    },
  });

export default RadioList;