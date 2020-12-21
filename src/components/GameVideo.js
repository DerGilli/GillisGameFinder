import React, { useState, useEffect } from "react";
import YouTube from 'react-youtube'
import "../css/GameVideo.css"
import Loader from "./Loader";

function GameVideo(props) {

  const [video, setVideo] = useState()

  useEffect(() => {
    getVideo(props.slug).then((data) => {
      setVideo(data.items)
    })
  }, [])

  if (typeof video === "undefined") {
    return <Loader />
  } else if (video.length > 0) {
    return (
      <div className="video-container">
        <YouTube videoId={video[0].id.videoId} opts={{ playerVars: { autoplay: 1, mute: 1, loop: 1 } }} />
      </div>
    )
  } else {
    return (
      <div className="alt-video">no video available :(</div>
    )
  }
}

async function getVideo(slug) {
  const res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${slug}%20trailer&key=AIzaSyBf3oikkPa1tMrmMcShCutgtx6HNvQMbaY`).catch((err) => console.log(err));
  return await res.json().catch((err) => console.log(err));
}

export default GameVideo;