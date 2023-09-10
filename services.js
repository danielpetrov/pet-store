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