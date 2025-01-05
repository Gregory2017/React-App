import React from 'react';

export const Collection = ({ images = [], name = 'Unknown' }) => {
  return (
    <div className="collection" key={name}>
      {images.length > 3 ? (
        <img className="collection__big" src={images[3]} alt={name} />
      ) : (
        <img className="collection__big" src="" alt={name} />
      )}
      <div className="collection__bottom">
        {images.slice(1, 4).map((image, index) => (
          <img key={index} className="collection__mini" src={image} alt={name} />
        ))}
      </div>
      <h4>{name}</h4>
    </div>
  );
};