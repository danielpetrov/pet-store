const petsMockData = [{"petId":42,"petName":"Gosho","addedDate":"2022-10-31","kind":1},{"petId":43,"petName":"Pesho","addedDate":"2022-10-25","kind":2},{"petId":44,"petName":"Kenny","addedDate":"2022-10-27","kind":3}]
const displayedPets = document.getElementById("pet-list")
console.log(displayedPets)


function renderPetList(pets) { // TODO: rename
    for(i = 0; i < pets.length; i++) {
        const pet = pets[i]
        const newPetCardElement = document.createElement("div") // TODO: rename
        newPetCardElement.setAttribute("class","new-pet")
        newPetCardElement.setAttribute("id", pet.petId)
        newPetCardElement.innerHTML = `Name: ${pet.petName}, Kind: ${pet.kind}, Added Date: ${pet.addedDate}`
        displayedPets.appendChild(newPetCardElement)

        console.log(pet)
        console.log(`Name: ${pet.petName}`)
        console.log(`Kind: ${pet.kind}`)
        console.log(`Added Date: ${pet.addedDate}`)
        
        newPetCardElement.addEventListener('click', renderPetInfoModal)
    }
}

function renderPetInfoModal() {
    const popupPetInfoElement = document.querySelector('#popup-pet')

    popupPetInfoElement.classList.add("open-popup-pet-window")

    const closePetButton = document.createElement("button")
    closePetButton.innerHTML = "×"
    closePetButton.setAttribute("id", "close-pet-button")
    closePetButton.setAttribute("class", "close-pet")
    popupPetInfoElement.appendChild(closePetButton)
    

    function closePetInfoPopup() {
        console.log('closePetInfoPopup', popupPetInfoElement)
        popupPetInfoElement.classList.remove("open-popup-pet-window")
    }
    closePetButton.addEventListener("click", closePetInfoPopup)
}

renderPetList(petsMockData)

const addNewPetButton = document.getElementById("add-new-pet-button")

