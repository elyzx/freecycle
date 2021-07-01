# Freecycle

## Description
A free marketplace for rehoming unwanted items, Freecycle makes it easy to connect with your community and pass on items you no longer need.

## User Stories

## Routes

## Models
#### User Model

new Schema
* _id
* Name
* Email Address
* Password
* NeighbourhoodRef
⋅⋅* neighbourhood._id

#### Listing Model

new Schema
* _id
* Name
* Description
* Photo
* Listing Duration
* UserOwnerRef
⋅⋅* user._id
* NeighbourhoodRef
⋅⋅* neighbourhood._id

#### Neighbourhood Model

new Schema
* _id
* Name

## Backlog

## Links