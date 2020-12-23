import React from 'react'
import '../css/ScreenshotGallery.css'

export default (props) => {
  if (props.screenshots.length > 0) {
    return (
      <div className="ScreenshotGallery">
        {props.screenshots.map((screenshot, idx) => {
          return <img key={idx} src={screenshot.image} />
        })}
      </div>
    )
  } else {

  }
}
