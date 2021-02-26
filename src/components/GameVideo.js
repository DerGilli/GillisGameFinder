import React, { useState, useEffect } from "react";
import YouTube from 'react-youtube'
import Loader from "./Loader";
import "../css/GameVideo.css"

function GameVideo({ slug }) {

  const [video, setVideo] = useState([])
  const [error, setError] = useState(null)

  const getVideo = async (slug) => {
    const res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?maxResults=1&q=${slug}%20videogame-trailer&key=${process.env.REACT_APP_YT_KEY}`);
    return await res.json();

  }

  useEffect(() => {
    try {
      if (isNaN(slug)) {
        getVideo(slug).then((data) => {
          setVideo(data.items)
        })
      } else {
        setError("We do not fetch videos for randomized games")
      }
    } catch (error) {
      console.log(error)
      setError(error)
    }

  }, [slug])

  if (error) {
    return <div></div>
  } else if (video.length === 0) {
    return <Loader />
  } else {
    return (
      <div className="video-container">
        <YouTube
          videoId={video[0].id.videoId}
          opts={{
            height: '200',
            width: '300',
            playerVars: { autoplay: 1, mute: 1 }
          }} />
      </div>
    )
  }
}

export default GameVideo;