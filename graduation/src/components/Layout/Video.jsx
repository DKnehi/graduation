import React from 'react'
import ReactPlayer from "react-player";
export default function Video({ url, handleProgress }) {
  return (
    <div>
      <div className="lesson-section-video">
        <ReactPlayer
          width="100%"
          height="100%"
          controls={true}
          url={url}
          onProgress={handleProgress}
        />
      </div>
    </div>
  );
}
