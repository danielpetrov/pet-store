export async function getAllPetsInfo() {
    const response = await fetch("http://localhost:5150/pet/all")
    const petData = await response.json()
    return petData
}
