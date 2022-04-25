import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Audio } from 'expo-av'
 
const RadioPlaylist = [
  {
    title: 'Tipik',
    uri: 'http://radios.rtbf.be/pure-128.mp3',
    imageSource: 'http://141.94.245.137/tfe/tipik.png'
  },
  {
    title: 'Bel-RTL',
    uri: 'http://belrtl.ice.infomaniak.ch/belrtl-mp3-192.mp3',
    imageSource: 'http://141.94.245.137/tfe/belrtl.png'
  },
  {
    title: 'Classic 21',
    uri: 'http://radios.rtbf.be/classic21-128.mp3',
    imageSource: 'http://141.94.245.137/tfe/classic21.jpg'
  },
  {
    title: 'La Première Wallonie',
    uri: 'http://radios.rtbf.be/laprem1ere-128.mp3',
    imageSource: 'http://141.94.245.137/tfe/lapremiere.png'
  },
  {
    title: 'VivaCité Hainaut',
    uri: 'http://radios.rtbf.be/vivahainaut-128.mp3',
    imageSource: 'http://141.94.245.137/tfe/vivacite.png'
  }
]
 
class RadioPlayer extends React.Component {
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
          {RadioPlaylist[currentIndex].title}
        </Text>
      </View>
    ) : null
  }
  render() {
    
    const {currentIndex} = this.state
    return (
      <View style={styles.container}>
        <Image
          style={styles.RadioCover}
          source={{uri: RadioPlaylist[currentIndex].imageSource}}
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
        uri: RadioPlaylist[currentIndex].uri
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
      currentIndex < RadioPlaylist.length - 1 ? (currentIndex -= 1) : (currentIndex = 0)
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
      currentIndex < RadioPlaylist.length - 1 ? (currentIndex += 1) : (currentIndex = 0)
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
  RadioCover: {
    width: 250,
    height: 250
  },
  trackInfo: {
    padding: 40,
    backgroundColor: '#fff'
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

export default RadioPlayer;
