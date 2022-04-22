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
      <View style={styles.container}>
        <Text>Choisis la radio que tu veux écouter :)</Text>
        <Image
          source={require('./RadioImage/tipik.png')}
          style={{width: 120, height: 80}}
        />
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

export default RadioList;