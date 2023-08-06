Description
Create a pet store inventory system. The system has the purpose of managing the list of pets that the store sells.

The user has to be able to see the list of pets, add a new pet to the list, edit an existing pet and delete a pet.

A pet has these characteristics:

Name - the name of the pet
Notes - free form text associated with the pet
Kind - what kind of a pet it is
Age - the age of the pet
Health Problems: - whether or not the pet has any health problems
Added date - when the pet was added to the system
Picture - a picture of the pet. This field may be added later.
Backend
Run npm start to run the backend for this project.

Endpoints
* GET /pet/kinds: Returns a list of pet kinds.
* GET /pet/all: Returns a list of all pets.
* GET /pet/:petId: Returns a pet for a given petID.
* POST /pet: Creates a new pet.
* PUT /pet/:petId: Updates an existing pet.
* DELETE /pet/:petId: Deletes the specified pet.
