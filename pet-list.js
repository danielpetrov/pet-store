import { getAllPetsInfo, getPetKinds, fetchPetDetails } from './services.js'

const displayedPets = document.getElementById("pet-list")
const loader = document.getElementById("loader")
const blurredDiv  = document.getElementById("blurred-div")

function renderPetList(pets, petKinds) {
    for(let i = 0; i < pets.length; i++) {
        const pet = pets[i]
        const petKindFound = petKinds.find((item) => {
            console.log(item, pet)
            return item.value === pet.kind
        })     
        const newPetCardElement = document.createElement("div")
        newPetCardElement.setAttribute("class","pet-card")
        newPetCardElement.setAttribute("id", pet.petId)
        newPetCardElement.innerHTML = `
            <div class="pet-card-name">Name: ${pet.petName}</div> 
            <div class="pet-card-kind">Kind: ${petKindFound.displayName}</div>
            <div class="pet-card-date">Added Date: ${pet.addedDate}</div>
        `
        displayedPets.appendChild(newPetCardElement)

        newPetCardElement.addEventListener('click', function() {
            onPetCardClick(pet.petId, petKindFound)
        })
    }
}



function onPetCardClick(petId, petKind) {
    const popupPetInfoElement = document.querySelector('#popup-pet')
    popupPetInfoElement.classList.add("open-popup-pet-window")
    const popupPetDetailsElement = document.createElement("div")
    popupPetInfoElement.innerHTML = ''

    async function showFetchedPetDetails(petId) {
        const fetchedPetDetails = await fetchPetDetails(petId)

        const healthStatus = fetchedPetDetails.healthProblems
        let healthStatEl = ''

        if(healthStatus) {
            healthStatEl = 'yes'
        } else {
            healthStatEl = 'no'
        }

        if(fetchedPetDetails.notes == undefined) {
            fetchedPetDetails.notes = 'none'
        }

        //const popupPetDetailsElement = document.createElement("div")
        popupPetInfoElement.appendChild(popupPetDetailsElement)
        popupPetDetailsElement.innerHTML = `
        <div> Name: ${fetchedPetDetails.petName}</div>
        <div> Age: ${fetchedPetDetails.age}</div>
        <div> Kind: ${petKind.displayName}</div>
        <div> Notes: ${fetchedPetDetails.notes}</div>
        <div> Health problems: ${healthStatEl}</div>
        <div> Added date: ${fetchedPetDetails.addedDate}</div>
        `
    }

    
    showFetchedPetDetails(petId)

    const closePetButton = document.createElement("button")
    closePetButton.innerHTML = "×"
    closePetButton.setAttribute("id", "close-pet-button")
    closePetButton.setAttribute("class", "close-pet")
    popupPetInfoElement.appendChild(closePetButton)
    

    function closePetInfoPopup() {
        console.log('closePetInfoPopup', popupPetInfoElement)
        popupPetInfoElement.classList.remove("open-popup-pet-window")
        popupPetDetailsElement.innerHTML = ''
    }
    closePetButton.addEventListener("click", closePetInfoPopup)
}

function switchLoader(isLoading) {
    if (isLoading) {
        blurredDiv.setAttribute("class", "blurred")
        loader.style.visibility = "visible"
    } else {
        loader.style.visibility = "hidden"
        blurredDiv.classList.remove("blurred")
    }
}

async function loadPetList() {
    try {
        switchLoader(true)
        const [petListData, petKindsData] = await Promise.all([
            getAllPetsInfo(),
            getPetKinds()
        ])

        renderPetList(petListData, petKindsData)
    
        switchLoader(false)
    } catch (e) {
        console.error(e)
    }
}

loadPetList()

const addNewPetButton = document.getElementById("add-new-pet-button")
