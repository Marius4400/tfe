import React from 'react'
import { 
    StyleSheet, 
    TouchableOpacity, 
    View, 
    Image, 
    Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Audio } from 'expo-av'
 
const albumList = [
  {
    title: 'Ecire',
    artiste: 'Nekfeu',
    album: 'Les étoiles vagabondes : Expansion', 
    uri: 'http://141.94.245.137/tfe/music/chanson/lev/ecrire.mp3',
    imageSource: 'http://141.94.245.137/tfe/music/albumcover/lev.jpg'
  },
]
 
class MusicPlayer extends React.Component {
  state = {
    isPlaying: false,
    playbackInstance: null,
    currentIndex: 0,
    volume: 1.0,
    isBuffering: false
  }

  renderFileInfo() {
    const { playbackInstance, currentIndex } = this.state
    return playbackInstance ? (
      <View style={styles.trackInfo}>
        <Text style={[styles.trackInfoText, styles.largeText]}>
          {albumList[currentIndex].title}
        </Text>
        <View style={styles.space} />
        <Text style={[styles.trackInfoText, styles.largeText]}>
          {albumList[currentIndex].artiste}
        </Text>
        <View style={styles.space} />
        <Text style={[styles.trackInfoText, styles.largeText]}>
          {albumList[currentIndex].album}
        </Text>
      </View>
    ) : null
  }
  render() {
    
    const {currentIndex} = this.state
    return (
      <View style={styles.container}>
        <Image
          style={styles.albumcover}
          source={{uri: albumList[currentIndex].imageSource}}
        />
        <View style={styles.controls}>
          <TouchableOpacity style={styles.control} onPress={this.handlePreviousTrack}>
            <Ionicons name='arrow-back' size={48} color='#444' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.control} onPress={this.handlePlayPause}>
            {this.state.isPlaying ? (
              <Ionicons name='ios-pause' size={48} color='#444' />
            ) : (
              <Ionicons name='ios-play-circle' size={48} color='#444' />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.control} onPress={this.handleNextTrack}>
            <Ionicons name='arrow-forward' size={48} color='#444' />
          </TouchableOpacity>
        </View>
        {this.renderFileInfo()}
      </View>
    )
  }

  async componentDidMount() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true
      })
 
      this.loadAudio()
    } catch (e) {
      console.log(e)
    }
  }
  async loadAudio() {
    const {currentIndex, isPlaying, volume} = this.state
   
    try {
      const playbackInstance = new Audio.Sound()
      const source = {
        uri: albumList[currentIndex].uri
      }
   
      const status = {
        shouldPlay: isPlaying,
        volume
      }
   
      playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)     
      await playbackInstance.loadAsync(source, status, false)
      this.setState({playbackInstance})
      } catch (e) {
        console.log(e)
      }
  }
   
  onPlaybackStatusUpdate = status => {
    this.setState({
      isBuffering: status.isBuffering
    })
  }

  handlePlayPause = async () => {
    const { isPlaying, playbackInstance } = this.state
    isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync()
 
    this.setState({
      isPlaying: !isPlaying
    })
  }
 
    handlePreviousTrack = async () => {
    let { playbackInstance, currentIndex } = this.state
    if (playbackInstance) {
      await playbackInstance.unloadAsync()
      currentIndex < albumList.length - 1 ? (currentIndex -= 1) : (currentIndex = 0)
      this.setState({
        currentIndex
      })
      this.loadAudio()
    }
  }
 
  handleNextTrack = async () => {
    let { playbackInstance, currentIndex } = this.state
    if (playbackInstance) {
      await playbackInstance.unloadAsync()
      currentIndex < albumList.length - 1 ? (currentIndex += 1) : (currentIndex = 0)
      this.setState({
        currentIndex
      })
      this.loadAudio()
    }
  }
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  space: {
    width: 20,
    height: 20,
  },
  albumcover: {
    width: 250,
    height: 250
  },
  trackInfo: {
    padding: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  trackInfoText: {
    textAlign: 'center',
    flexWrap: 'wrap',
    color: '#550088'
  },
  largeText: {
    fontSize: 22
  },
  smallText: {
    fontSize: 16
  },
  control: {
    margin: 20
  },
  controls: {
    flexDirection: 'row'
  }
})

export default MusicPlayer;
