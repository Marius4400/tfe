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
        <Image style={styles.imageradio}
          source={require('./RadioImage/tipik.png')}
        />
        <Button style={styles.btnradio}
        title="Tipik"
        onPress={() =>
          this.props.navigation.navigate('Home')
        }
        />
        <View style={styles.space} />
        <Button style={styles.btnhome}
          title="HomePage"
          onPress={() =>
            this.props.navigation.navigate('RadioPlayer')
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    imageradio: {
      width: 120, 
      height: 80
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
    btnradio: {
      backgroundColor: '#E3BB76',
    },
    btnhome: {
      flex: 1,
      alignItems: 'flex-end',
      position: 'absolute',
    },
  });

export default RadioList;