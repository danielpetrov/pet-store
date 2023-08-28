import { getAllPetsInfo } from './services.js'

const petsMockData = [{"petId":42,"petName":"Gosho","addedDate":"2022-10-31","kind":1},{"petId":43,"petName":"Pesho","addedDate":"2022-10-25","kind":2},{"petId":44,"petName":"Kenny","addedDate":"2022-10-27","kind":3}]
const petKindsMockData = [{"displayName":"Parrot","value":3}, {"displayName":"Cat","value":1}, {"displayName":"Dog","value":2}]
const displayedPets = document.getElementById("pet-list")
const loader = document.getElementById("loader")
const blurredDiv  = document.getElementById("blurred-div")

function renderPetList(pets, petKinds) { // TODO: rename
    console.log(pets)
    for(let i = 0; i < pets.length; i++) {
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

function switchLoader(isLoading) {
    if (isLoading === true) {
        blurredDiv.setAttribute("class", "blurred")
        loader.style.visibility = "visible"
    } else if (isLoading === false) {
        loader.style.visibility = "hidden"
        blurredDiv.classList.remove("blurred")
    }
    // html isLoading true -> show
}
async function loadPetList () {
    // start loading -> show loader in HTML
    try {
        switchLoader(true)

        const petListData = await getAllPetsInfo()
        renderPetList(petListData, petKindsMockData)
    
        switchLoader(false)
    } catch (e) {
        console.error(e)
    }
    
    // stop loading -> hide loader in HTML
    console.log('do something else after await in function')
}



console.log('before the function call')
loadPetList()
console.log('do something else outside of the function')

const addNewPetButton = document.getElementById("add-new-pet-button")
