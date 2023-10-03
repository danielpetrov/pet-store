export async function getAllPetsInfo() {
    const response = await fetch("http://localhost:5150/pet/all")
    const petData = await response.json()
    return petData
}

export async function getPetKinds() {
    const response = await fetch("http://localhost:5150/pet/kinds")
    const petKindsData = await response.json()
    return petKindsData
}

export async function fetchPetDetails(petId) {
    const response = await fetch("http://localhost:5150/pet/" + `${petId}`)
    const petDetails = await response.json()
    return petDetails
}

export async function updatePetDetails(petId, dataToUpdate) {
    const response = await fetch("http://localhost:5150/pet/" + `${petId}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(dataToUpdate)
    })
    const newPetDetails = await response.json()
    return newPetDetails
}

export async function postPetDetails(dataToPost) {
    const response = await fetch("http://localhost:5150/pet" , {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(dataToPost)
    })
    const addPetDetails = await response.json()
    return addPetDetails
}