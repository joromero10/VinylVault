import React from "react";
import { Link } from "react-router-dom";

const AlbumCard = ({ album, onAddToCart }) => {
  if (!album) return null;
  return (
    <article className="album-card">
      <Link className="product-img-link" to={`/album/${album.id}`}>
        <img src="{album.name}" alt="{album.name}" className="album-image" />
      </Link>
      <div className="album-body">
        <span className="album-category">{album.category}</span>
        <h3 className="album-title">
          <Link to={`/album/${album.id}`}>{album.name} </Link>
        </h3>
        <p className="product-price">
          $
          {typeof album.price === "number"
            ? album.price.toFixed(2)
            : "Contact For Price"}
        </p>
        <button
          className="btn btn-secondary btn-block"
          type="button"
          onClick={() => onAddToCart(album)}
        >
          Add to Cart !
        </button>
      </div>
    </article>
  );
};

export default AlbumCard;
