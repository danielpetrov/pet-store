const petsMockData = [{"petId":42,"petName":"Gosho","addedDate":"2022-10-31","kind":1},{"petId":43,"petName":"Pesho","addedDate":"2022-10-25","kind":2},{"petId":44,"petName":"Kenny","addedDate":"2022-10-27","kind":3}]
const petKindsMockData = [{"displayName":"Parrot","value":3}, {"displayName":"Cat","value":1}, {"displayName":"Dog","value":2}]
const displayedPets = document.getElementById("pet-list")

function renderPetList(pets, petKinds) { // TODO: rename
    for(i = 0; i < pets.length; i++) {
        const pet = pets[i]
        const petKindFound = petKinds.find((item) => {
            console.log(item, pet)
            return item.value === pet.kind
        })     
        const newPetCardElement = document.createElement("div") // TODO: rename
        newPetCardElement.setAttribute("class","pet-card")
        newPetCardElement.setAttribute("id", pet.petId)
        newPetCardElement.innerHTML = `
            <div class="pet-card-name">Name: ${pet.petName}</div> 
            <div class="pet-card-kind">Kind: ${petKindFound.displayName}</div>
            <div class="pet-card-date">Added Date: ${pet.addedDate}</div>
        `
        displayedPets.appendChild(newPetCardElement)

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

renderPetList(petsMockData, petKindsMockData)

const addNewPetButton = document.getElementById("add-new-pet-button")

