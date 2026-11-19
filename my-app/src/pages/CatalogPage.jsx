import React, { useState } from "react";
import AlbumCard from "../components/AlbumCard";

function CatalogPage({ albums, onAddToCart }) {
  const genres = ["All", "Jazz", "Electronic", "Rock", "Classical"];
  const [selectedGenre, setSelectedGenre] = useState("All");

  //    put a safety check - what happens if data is bad or missing
  const validAlbums = albums || [];

  const filteredAlbums =
    selectedGenre === "All"
      ? validAlbums
      : validAlbums.filter((p) => p.genre === selectedGenre);

  return (
    <div className="catalog-container">
      <header className="catalog-hero">
        <h1>Handcrafted Functional Stoneware</h1>
        <p>
          Sustainable ceramics shaped by hand for intentional daily rituals.
        </p>
      </header>

      <div className="filter-bar">
        {genres.map((cat) => (
          <button
            key={cat}
            className={`filter-pill ${selectedGenre === cat ? "active" : ""}`}
            onClick={() => setSelectedGenre(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="album-grid">
        {filteredAlbums.map((album) => (
          <AlbumCard key={album.id} album={album} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
}

export default CatalogPage;
