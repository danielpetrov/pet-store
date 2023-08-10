const petsMockData = [{"petId":42,"petName":"Gosho","addedDate":"2022-10-31","kind":1},{"petId":43,"petName":"Pesho","addedDate":"2022-10-25","kind":2},{"petId":44,"petName":"Kenny","addedDate":"2022-10-27","kind":3}]
const displayedPets = document.getElementById("pet-list")
console.log(displayedPets)


function getPetInfo(pets) { // TODO: rename
    for(i = 0; i < pets.length; i++) {
        const pet = pets[i]
        const newPetCardElement = document.createElement("div") // TODO: rename
        newPetCardElement.setAttribute("class","new-pet")
        newPetCardElement.setAttribute("id", pets[i].petId)
        newPetCardElement.innerHTML = `Name: ${pets[i].petName}, Kind: ${pets[i].kind}, Added Date: ${pets[i].addedDate}`
        displayedPets.appendChild(newPetCardElement)

        console.log(pets[i])
        console.log(`Name: ${pets[i].petName}`)
        console.log(`Kind: ${pets[i].kind}`)
        console.log(`Added Date: ${pets[i].addedDate}`)        
    }
}
getPetInfo(petsMockData)