import React from 'react'

 function AudioPlayer(props){
  
    const { src } = props;
    return (
      <>
      <audio controls src={`/city_sounds/${src}`} type='audio/mpeg'>
          Your browser does not support the audio element.
      </audio>
      </>
    )
}

export default AudioPlayer;