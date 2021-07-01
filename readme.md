# ReHood

## Description
A free marketplace for rehoming unwanted items, ReHood makes it easy to connect with your community and rehome goods in your neighbourhood.

## User Stories

## Routes

#### Authentication & Authorisation
Existing user
**GET /auth/login**
* if user already logged in, redirect to homepage.hbs
* otherwise, render login.hbs

**POST /auth/login**
* body: Email Address, Password
* if successful, render homepage.hbsgit 

New user - CREATE PROFILE
**GET /auth/signup**
* if user already logged in, redirect to homepage.hbs
* otherwise, render signup.hbs

**POST /auth/signup**
* body: Name, Email Address, Password, NeighbourhoodRef
* redirect to login.hbs

Sign out button
**POST /auth/logout**
* redirect to login.hbs


#### Main Site
Home
**GET /**
* render homepage.hbs

**GET /listings**
* render homepage.hbs


LISTINGS - CREATE
**GET /create/:id**
* render createListing.hbs

**POST /create/:id**
* redirect to listingDetails.hbs


LISTINGS - READ
**GET /listings/:id**
* dynamically render listingDetails.hbs
* placeholder for chat functionality

LISTINGS - UPDATE
**GET /listings/:id/edit**
* render editListing.hbs

**POST /listings/:id/edit**
* redirect to listingDetails.hbs

LISTINGS - DELETE
**POST /profile/:id**
* delete listing
* render profile.hbs


PROFILE - READ, UPDATE, DELETE
**GET /profile/:id**
* render profile.hbs

**POST /profile/:id**
* saving and editing details
* redirect to homepage.hbs

**POST /profile/:id**
* clicking to edit listing
* redirect to editListing.hbs

**POST /profile/:id**
* delete profile
* redirect to signup.hbs


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
* UserOwnerRef: user._id
* NeighbourhoodRef: neighbourhood._id

#### Neighbourhood Model

new Schema
* _id
* Name

## Backlog

## Links