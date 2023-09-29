import { getAllPetsInfo, getPetKinds, fetchPetDetails, updatePetDetails } from './services.js'

const displayedPets = document.getElementById("pet-list")
const loader = document.getElementById("loader")
const blurredDiv  = document.getElementById("blurred-div")

function renderPetList(pets, petKinds) {
    displayedPets.innerHTML = ''
    for(let i = 0; i < pets.length; i++) {
        const pet = pets[i]
        const petKindFound = petKinds.find((item) => {
            console.log(pet.kind)
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
            loadPetPopup(pet.petId, petKindFound)
        })
    }
}


function renderPetDetails(petKind, receivedPetDetails) {
    const popupPetInfoElement = document.querySelector('#popup-pet')
    popupPetInfoElement.classList.add("open-popup-pet-window")
    const popupPetDetailsElement = document.createElement("div")
    popupPetInfoElement.innerHTML = ''


    const healthStatus = receivedPetDetails.healthProblems
    let healthStatEl = ''

    if(healthStatus) {
        healthStatEl = 'yes'
    } else {
        healthStatEl = 'no'
    }

    if(receivedPetDetails.notes == undefined) {
        receivedPetDetails.notes = 'none'
    }

    popupPetInfoElement.appendChild(popupPetDetailsElement)
    popupPetDetailsElement.innerHTML = `
    <div> Name: ${receivedPetDetails.petName}</div>
    <div> Age: ${receivedPetDetails.age}</div>
    <div> Kind: ${petKind.displayName}</div>
    <div> Notes: ${receivedPetDetails.notes}</div>
    <div> Health problems: ${healthStatEl}</div>
    <div> Added date: ${receivedPetDetails.addedDate}</div>
    `
    
    const closePetButton = document.createElement("button")
    closePetButton.innerHTML = "×"
    closePetButton.setAttribute("id", "close-pet-button")
    closePetButton.setAttribute("class", "close-pet")
    popupPetInfoElement.appendChild(closePetButton)
    
    function closePetInfoPopup() {
        popupPetInfoElement.classList.remove("open-popup-pet-window")
        popupPetDetailsElement.innerHTML = ''
    }
    closePetButton.addEventListener("click", closePetInfoPopup)

    const editPetButton = document.createElement("button")
    editPetButton.innerHTML = "Edit"
    editPetButton.setAttribute("id", "edit-pet-button")
    editPetButton.setAttribute("class", "edit-pet")
    popupPetInfoElement.appendChild(editPetButton)

    editPetButton.addEventListener("click", () => {
        renderEditPet(receivedPetDetails, petKind)
    })

    const deletePetButton = document.createElement("button")
    deletePetButton.innerHTML = "Delete"
    deletePetButton.setAttribute("id", "delete-pet-button")
    deletePetButton.setAttribute("class", "delete-pet")
    popupPetInfoElement.appendChild(deletePetButton)
}

function renderEditPet(receivedPetDetails, petKind) {
    const popupPetInfoElement = document.querySelector('#popup-pet')
    popupPetInfoElement.classList.add("open-popup-pet-window")
    const popupPetDetailsElement = document.createElement("div")
    popupPetInfoElement.innerHTML = ''

    popupPetInfoElement.appendChild(popupPetDetailsElement)
    popupPetDetailsElement.innerHTML = `
    <form>
        <label for="pet-name">Name: </label>
        <input type="text" id="pet-name" value='${receivedPetDetails.petName}'><br>
        <label for="pet-age">Age: </label>
        <input type="number" id="pet-age" min="1" max="99" value = '${receivedPetDetails.age}'><br>
        <label for="pet-kind">Kind: </label>
        <select name="kinds" id="pet-kind" form="kindform">
        <option value="1">Cat</option>
        <option value="2">Dog</option>
        <option value="3">Parrot</option>
        <option value="4">Other</option>
        </select><br>
        <label for="pet-notes">Notes: </label>
        <textarea id="pet-notes" rows="1" value='${receivedPetDetails.notes}'></textarea><br>
        <label for="health-problems">Health problems</label>
        <select name="health-problems" id="health-problems" form="healthstat">
        <option value="1">Yes</option>
        <option value="2">No</option>
        </select><br>
        <label for="added-date"> Added date: </label>
        <input type="date" id="added-date" value = '${receivedPetDetails.addedDate}'>
    </form>
    `
    
    const closePetButton = document.createElement("button")
    closePetButton.innerHTML = "×"
    closePetButton.setAttribute("id", "close-pet-button")
    closePetButton.setAttribute("class", "close-pet")
    popupPetInfoElement.appendChild(closePetButton)

    function closePetInfoPopup() {
        popupPetInfoElement.classList.remove("open-popup-pet-window")
        popupPetDetailsElement.innerHTML = ''
    }
    closePetButton.addEventListener("click", closePetInfoPopup)

    const savePetButton = document.createElement("button")
    savePetButton.innerHTML = "Save"
    savePetButton.setAttribute("id", "save-pet-button")
    savePetButton.setAttribute("class", "save-pet")
    popupPetInfoElement.appendChild(savePetButton)

    savePetButton.addEventListener("click", function() {
        const dataToUpdate = {
            petName: `${document.getElementById("pet-name").value.trim()}`,
            age: `${document.getElementById('pet-age').value}`,
            notes: `${document.getElementById('pet-notes').value.trim()}`,
            kind: Number(`${document.getElementById('pet-kind').value}`),
            healthProblems:`${receivedPetDetails.healthProblems}`,
            addedDate: `${document.getElementById('added-date').value}`,
        }

        submitEditPet(receivedPetDetails, dataToUpdate, petKind)
    })

    const cancelPetButton = document.createElement("button")
    cancelPetButton.innerHTML = "Cancel"
    cancelPetButton.setAttribute("id", "cancel-pet-button")
    cancelPetButton.setAttribute("class", "cancel-pet")
    popupPetInfoElement.appendChild(cancelPetButton)
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

async function loadPetPopup(petId, petKind) {
     try {
         switchLoader(true)

         const receivedPetDetails = await fetchPetDetails(petId)

         renderPetDetails(petKind, receivedPetDetails)

         switchLoader(false)

     } catch (e) {
        console.error(e)
     }
}

async function submitEditPet(receivedPetDetails, dataToUpdate, petKind) {
    try {
        switchLoader(true)

        const updatedPetDetails = await updatePetDetails(receivedPetDetails.petId, dataToUpdate)
        renderPetDetails(petKind, updatedPetDetails)
        loadPetList()

        switchLoader(false)

    } catch (e) {
       console.error(e)
    }
}

const addNewPetButton = document.getElementById("add-new-pet-button")
