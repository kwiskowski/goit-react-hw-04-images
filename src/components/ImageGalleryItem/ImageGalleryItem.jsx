import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, onItemClick }) => {
  const handleClick = () => {
    onItemClick(image);
  };
  return (
    <li className={css.galleryItem} onClick={handleClick}>
      <img
        className={css.galleryImage}
        src={image.webformatURL}
        alt={image.tags}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired, // Assuming 'tags' is a property of the image object
  }).isRequired,
  onItemClick: PropTypes.func.isRequired,
};
