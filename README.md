# Busy Buy - Online Shopping Website

This project is an online shopping website developed using React.js. It allows users to sign up, sign in, browse products, filter products, add them to the cart, and place orders.

## Features

- User authentication: Users can sign up with their email and password or sign in if they already have an account.
- Product browsing: Users can browse through a list of products available on the website.
- Filter Products: User can filter product by price range & category.
- Cart management: Users can add products to their cart, view the products in the cart, and proceed to purchase them.
- Order history: Users can view their past orders.

## Technologies Used

- React.js: Used for building the user interface components.
- React Router DOM: Used for routing within the application.
- Firebase: Used for user authentication & data storage.
- Toastify: Used for displaying notifications.
- React Spinners: Used for Showing Loading spinner till the product not loaded.
- CSS Modules: Used for styling the components.

## Project Structure

The project is structured as follows:

- `src/components`: Contains reusable components used across different pages.
- `src/context`: Contains context providers for managing user, product, cart, and order data.
- `src/pages`: Contains individual pages of the website, such as Home, Sign Up, Sign In, Cart, Order, and 404 Error.
- `src/App.js`: Main entry point of the application where routing is configured.
- `src/App.css`: Contains global styles for the application.

## Setup Instructions

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Start the development server using `npm start`.
5. Access the application in your web browser at `http://localhost:3000`.

## Usage

- Sign Up: Users can sign up for a new account by providing their name, email, and password.
- Sign In: Existing users can sign in using their registered email and password.
- Home: Users can browse through available products, filter them by price and category, and search for specific products.
- Cart: Users can view the products added to their cart, remove items, and proceed to purchase.
- Order: Users can view their order history.
- 404 Error: This page is displayed when a user navigates to a non-existent route.


This README provides a brief overview of the Busy Buy - Online Shopping Website, including Features, Technologies Used, Project Structure, Setup Instructions, and Usage. Adjustments and additional details can be made as needed.