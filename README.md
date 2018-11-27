# AeroStore
Second place in the aerolab challenge! [Take a look](https://twitter.com/aerolab/status/946100876942262272) - [Aerolab Challenge](https://aerolab.co/coding-challenge) ([demo](https://aerostore.now.sh))

This project is being redesigned, rebuilt, recooled and refreshed using almost all knowledges I learned this year :grimacing:. Design and coding :art::computer:. New Platzi courses :green_heart:. New trends and good practices in web development :+1::tada:. Just wait for it :wink:.


## About
The challenge is to build a catalog view for a loyalty program app.
Aerolab will provide the base UI and API, it can be used as provided or make with any improvements you deem fit. 

The base UI will not provide a responsive version of the app, its optional to do something about it or not, though I think its completely obligatory.

The product’s main goal is to help users redeem items through a points-based system. It’s expected the end-product to be both visually attractive and functionally effective.

![AeroChallenge Base UI](https://github.com/juandc/aerostore/blob/master/base-ui.png)


## Setup
This challenge is composed by two services: the **_redesigned_** api service and the web (frontend) service.

### Api
The [challenge api](https://aerolabchallenge.docs.apiary.io) doesn't have a prodcts category filter, nor specific product url, therefore I have decided to create a new api client for my challenge version.

Considering this is a Frontend challenge (or at least I think it is 😅), I have not created a new DB, with new products, new categories and probably new features...
The new API features are: subcategories, filtering and searching.


Anyway, these are the new API entrypoints:

 - **GET** `/user/profile` -> Access your personal user information
 - **GET** `/user/history` -> Access your redeem history
 - **GET** `/user/reclaim` -> Add points to your user with the `amount` param
 - **GET** `/categories/Electronics` -> Check out all the available products with their attributes. You can sort, paginate and filter produts by category.
 - **GET** `/categories/Electronics/subcategories` -> All Electronics products subcategories
 - **GET** `/categories/Electronics/:productId` -> Take a look to an specific product
 - **GET** `/categories/Electronics/:productId/redeem` -> Buy it

_* Subject to changes_

**Important:** *The api makes all request using the base api token, security is still being planned.*


### Web
Libraries:

 - React.js
 - Next.js
 - PostCSS

Features:

 - PWA (100% PWA, 91% Performance, 97% Accessibility, 94% Best Practices)
 - Offline support
 - Dark theme (storage listeners)

TODOS:

 - Product Redeem
 - Shop Search filter

