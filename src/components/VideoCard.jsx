import React from 'react';

const VideoCard = ({ videoId, title }) => {
    return (
        <div className="p-4 border rounded-lg shadow-lg">
            <iframe
                width="100%"
                height="200px"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
            <p className="mt-2 text-center">{title}</p>
        </div>
    );
};

export default VideoCard;
