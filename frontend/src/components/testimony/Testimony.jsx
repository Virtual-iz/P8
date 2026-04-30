import React from 'react';
import './Testimony.scss';

const Testimony = ({ client, mission, testimony, avatar }) => {
  return (
    <figure className="testimony">
      <div className="testimony__avatar">
        {avatar ? <img src={`/img/${avatar}`} alt={`Avatar de ${client}`} /> : <div className="testimony__placeholder" />}
      </div>
      <div className="testimony__content">
        <figcaption className="testimony__meta">
          <strong>{client}</strong>
          <span>{mission}</span>
        </figcaption>
        <blockquote className="testimony__text">
          {testimony}
        </blockquote>
      </div>
    </figure>
  );
};

export default Testimony;