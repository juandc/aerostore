# AeroStore
AeroStore - Aerolab Challenge


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

There is not so much diference between the old api and this api, here are the actions available:

 - GET `/user/profile` -> Access your personal user information
 - GET `/user/points?amount=amount` -> Add points to your user
 - GET `/user/history` -> Access your redeem history
 - GET `/products` -> Check out all the available products with their attributes
 - GET `/products?category=category_name` -> Filter produts by category (separating categories with `,`)
 - GET `/products/:product_id` -> Check out an specific product
 - GET `/products/:product_id/redeem` -> Redeem Products
_* Subject to changes_

**Important:** *The api makes all request using the base api token, security is still being planned.*

### Web
I just know I will use React.js along with Next.js. No more... D:

