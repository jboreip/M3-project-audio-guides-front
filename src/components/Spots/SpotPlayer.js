import React from 'react'

 function SpotPlayer(props){
  
    const { src } = props;
    return (
      <>
      <audio controls src={src} type='audio/mpeg' controlsList='nodownload'>
          Your browser does not support the audio element.
      </audio>
      </>
    )
}

export default SpotPlayer;