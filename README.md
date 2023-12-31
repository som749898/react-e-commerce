# BookBazaar

A user-friendly e-commerce application for books. Buy, sell, or explore books of various genres, authors, and formats.

## Table of Contents

- [User Stories](#user-stories)
  - [Home Page](#home-page)
  - [Product Listing Page](#product-listing-page)
  - [Product Detail Page](#product-detail-page)
  - [Cart Management](#cart-management)
  - [Wishlist Management](#wishlist-management)
  - [Search](#search)
  - [Loading & Alerts](#loading--alerts)
  - [Sign-up Page](#sign-up-page)
  - [Login Page](#login-page)
  - [Logout](#logout)
  - [Address Management](#address-management)
  - [Checkout](#checkout)

## User Stories

### Home Page

- A landing page with a list of featured categories.
- If you click on any one of the categories, you should be redirected to the product list page with the selected category.

### Product Listing Page

- A product listing page where all the products are listed with a section of filters.
- Multiple filters on the product listing page, including:
  - Price: A radio button to sort from low to high & high to low.
  - Category: A checkbox with various categories according to the theme.
  - Ratings: A slider to filter as per product rating.
- A button to clear filters.
- On the product cards, there should be two call-to-action buttons:
  - Add to Cart: Adds the item to the cart & shows "Go to Cart" on the product card.
  - Add to Wishlist: Adds the item to the wishlist.

### Product Detail Page

- If you click on any product, you should be redirected to a single product page with all details.
- The "Add to Cart" & "Add to Wishlist" buttons with persisted data.

### Cart Management

- From the navbar, you can navigate to the cart where all the products you want to buy are mentioned.
- On the product card, you can:
  - See the quantity of a particular product.
  - Increase or Decrease the quantity.
  - Remove the product from the cart.
  - Add the product to the Wishlist.
- Price details card with a button to checkout.

### Wishlist Management

- From the navbar, you can navigate to my wishlist where all the products you would like to buy are mentioned.
- On the product card, you can:
  - Remove the item from the wishlist.
  - Add the item to the cart (increasing quantity if already in the cart).

### Search

- You can search for an item from the list via the input text box on the header navbar.

### Loading & Alerts

- You can see loading spinners when data (e.g., products) is loading.
- You can see acknowledgment alerts for various actions.

### Sign-up Page

- Sign-up with email, first name, last name, password & confirm password.
- Show/hide password feature.

### Login Page

- Log in with email & password.

### Logout

- Log out from the app via the header navbar.

### Address Management

- Add, update, or delete multiple addresses.
- Choose a single address for order delivery.

### Checkout

- Choose an address and proceed to checkout, displaying the order summary.
