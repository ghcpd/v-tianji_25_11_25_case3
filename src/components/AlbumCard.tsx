import React from 'react';
import { Album } from '../types';
import './AlbumCard.css';

interface AlbumCardProps {
  album: Album;
  onClick: () => void;
}

export const AlbumCard: React.FC<AlbumCardProps> = ({ album, onClick }) => {
  return (
    <div className="album-card" onClick={onClick}>
      <div className="album-cover">
        <img src={album.cover} alt={album.title} />
        <div className="album-overlay">
          <button className="play-button">▶</button>
        </div>
      </div>
      <div className="album-info">
        <h3 className="album-title">{album.title}</h3>
        <p className="album-artist">{album.artist}</p>
        <p className="album-year">{album.year}</p>
      </div>
    </div>
  );
};

