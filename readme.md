# Freecycle

## Description
A free marketplace for rehoming unwanted items, Freecycle makes it easy to connect with your community and rehome goods in your neighbourhood.

## Routes

### Auth
##### GET /login
* if user already logged in, redirect to homepage.hbs
* otherwise, render login.hbs

##### POST /login
* body: Email Address, Password
* if successful, render homepage.hbsgit 

##### GET /register
* if user already logged in, redirect to homepage.hbs
* otherwise, render register.hbs

##### POST /register
* body: Name, Email Address, Password, NeighbourhoodRef
* redirect to login.hbs

##### POST /logout
* redirect to login.hbs


### Create Listings
##### GET /create/:id
* render createListing.hbs

##### POST /create/:id
* redirect to viewListing.hbs
* id is for the listing


### View Listings
##### GET /
* render homepage.hbs

##### GET /listings
* render homepage.hbs

##### GET /listings/:id
* dynamically render viewListing.hbs
* id is for the listing


### Manage Listings
##### POST /manage/:id
* redirect to manageListings.hbs page with all my listings
* id is for the user

##### GET /manage/:id
* render editListing.hbs form 
* id is for the user

##### POST /manage/:id
* delete listing
* render manageListings.hbs


### Manage Account
##### GET /account/:id
* render account.hbs
* id is for the user

##### POST /account/:id
* edit and save details
* id is for the user

##### POST /account/:id
* delete profile
* redirect to register.hbs


## Models
#### User Model

new Schema
* _id
* Name
* Email Address
* Password
* NeighbourhoodRef: neighbourhood._id

#### Listing Model

new Schema
* _id
* Name
* Description
* Photo
* Listing Duration
* Status: Available, Reserved, Unavailable
* UserOwnerRef: user._id
* NeighbourhoodRef: neighbourhood._id

#### Neighbourhood Model

new Schema
* _id
* Name

## Backlog

## Links
Wireframes: https://whimsical.com/wireframes-JyJ82nAMyWAcLTirGQPJUf

[Please click on the link to see the page](https://freecycle-eu.herokuapp.com/)