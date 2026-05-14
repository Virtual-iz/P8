import React from 'react';
import './Testimony.scss';

const Testimony = ({ client, mission, testimony }) => {
  return (
    <figure className="testimony">
      <figcaption className="testimony__meta">
        <span className="testimony__label">Témoignage :</span>
        <h3>{client} — {mission}</h3>
      </figcaption>
      <blockquote className="testimony__text">
        {testimony}
      </blockquote>
    </figure>
  );
};

export default Testimony;
