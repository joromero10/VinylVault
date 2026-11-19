# VinylVault

Indie VinylVault Record Online Store

main.jsx
│
└── <BrowserRouter>
│
└── <App />
-> src/App.jsx

App.jsx
(State Owner: cart Array, isCartOpen Boolean)

├── Navbar.jsx (header, site, inner,)
│ Props:
│ ├── cartCount number
│ └── onOpenCart function
│
├── CatalogPage.jsx (hero, .filter-bar, pill, grid)
│ State:
│ └── selectedGenre
│
│ Props:
│ ├── albums array
│ └── onAddToCart function
│
│ └── AlbumCard.jsx (.album card, image, body, genre, title, price)
│ Props:
│ ├── album object
│ └── onAddToCart function
│
├── AlbumDetailPage.jsx (Route /album/:albumId ) (CSS: detail-grid,img,info)
│ State:
│ └── qty number
│
│ Props:
│ ├── albums array
│ └── onAddToCart function
│
├── CheckoutPage.jsx (Route /checkout) (.checkout container, grid, .form-group, card)
│ State:
│ ├── isSubmitted boolean
│ └── formData object
│
│ Props:
│ ├── cart array
│ └── onClearCart function
│
└── CartDrawer.jsx (.drawer overlay, panel, .cart list, item, and .subtotal row)
Props:
├── isOpen boolean
├── cart array
├── onClose function
├── onUpdateQuantity function
└── onRemove function
