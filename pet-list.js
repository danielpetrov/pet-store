import { getAllPetsInfo, getPetKinds, fetchPetDetails, updatePetDetails, postPetDetails} from './services.js'

const displayedPets = document.getElementById("pet-list")
const loader = document.getElementById("loader")
const loaderPortal  = document.getElementById("loader-portal")
const blurredDiv = document.getElementById("blurred-div")

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
            <div class="pet-card-name pet-card-details">Name: ${pet.petName}</div> 
            <div class="pet-card-kind pet-card-details">Kind: ${petKindFound.displayName}</div>
            <div class="pet-card-date pet-card-details">Added Date: ${pet.addedDate}</div>
        `
        displayedPets.appendChild(newPetCardElement)

        newPetCardElement.addEventListener('click', function() {
            loadPetPopup(pet.petId, petKindFound)
        })
    }
}


function renderPetDetails(petKind, receivedPetDetails) {
    blurredDiv.setAttribute("class", "blurred")
    const popupPetInfoElement = document.querySelector('#popup-pet')
    popupPetInfoElement.classList.add("open-popup-pet-window")
    const popupPetDetailsElement = document.createElement("div")
    popupPetInfoElement.innerHTML = ''

    const healthStatus = receivedPetDetails.healthProblems
    let healthStatEl = ''

    // if(healthStatus) {
    //     healthStatEl == true
    // } else {
    //     healthStatEl == false
    // }

    if(receivedPetDetails.notes == undefined) {
        receivedPetDetails.notes = 'none'
    }

    popupPetInfoElement.appendChild(popupPetDetailsElement)
    popupPetDetailsElement.innerHTML = `
    <div> Name: ${receivedPetDetails.petName}</div>
    <div> Age: ${receivedPetDetails.age}</div>
    <div> Kind: ${petKind.displayName}</div>
    <div> Notes: ${receivedPetDetails.notes}</div>
    <div> Health problems: <input type="checkbox" ${receivedPetDetails.healthProblems ? 'checked' : '' } disabled></div>
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
        blurredDiv.classList.remove("blurred")
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
    <form id="edit-form">
        <label for="pet-name">Name: </label>
        <input type="text" id="pet-name" value="${receivedPetDetails.petName}" required><br>
        <label for="pet-age">Age: </label>
        <input type="number" id="pet-age" min="1" max="99" value = "${receivedPetDetails.age}"><br>
        <label for="pet-kind">Kind: </label>
        <select name="kinds" id="pet-kind" form="kindform">
        <option value="${receivedPetDetails.kind}" selected disabled hidden>${petKind.displayName}</option>
        <option value="1">Cat</option>
        <option value="2">Dog</option>
        <option value="3">Parrot</option>
        <option value="4">Other</option>
        </select><br>
        <label for="pet-notes">Notes: </label>
        <textarea id="pet-notes" rows="1" value="${receivedPetDetails.notes}"></textarea><br>
        <label for="health-problems">Health problems:</label>
        <input type="checkbox" id="health-problems" ${receivedPetDetails.healthProblems ? 'checked' : '' } /><br>
        <label for="added-date"> Added date: </label>
        <input type="date" id="added-date" value="${receivedPetDetails.addedDate}">
        <button type="submit" id="save-pet-button" class="save-pet">Save</button>
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
        blurredDiv.classList.remove("blurred")
    }
    closePetButton.addEventListener("click", closePetInfoPopup)

    const editForm = document.getElementById("edit-form")
    editForm.addEventListener("submit", function(e) {
        console.log(editForm)
        e.preventDefault()
        editForm.checkValidity()
        
        const dataToUpdate = {
            petName: `${document.getElementById("pet-name").value.trim()}`,
            age: `${document.getElementById('pet-age').value}`,
            notes: `${document.getElementById('pet-notes').value.trim()}`,
            kind: Number(`${document.getElementById('pet-kind').value}`),
            healthProblems: Boolean(document.getElementById("health-problems").checked),
            addedDate: `${document.getElementById('added-date').value}`,
        }

        submitEditPet(receivedPetDetails, dataToUpdate, petKind)
    })

    const cancelPetButton = document.createElement("button")
    cancelPetButton.innerHTML = "Cancel"
    cancelPetButton.setAttribute("id", "cancel-pet-button")
    cancelPetButton.setAttribute("class", "cancel-pet")
    popupPetInfoElement.appendChild(cancelPetButton)

    // add cancel button function
}

function switchLoader(isLoading) {
    if (isLoading) {
        loaderPortal.setAttribute("class", "blurred")
        loader.style.visibility = "visible"
    } else {
        loader.style.visibility = "hidden"
        loaderPortal.classList.remove("blurred")
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
    } catch (e) {
        console.error(e)
    } finally {
        switchLoader(false)
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

function createNewPet() {
    blurredDiv.setAttribute("class", "blurred")
    const popupPetInfoElement = document.querySelector('#popup-pet')
    popupPetInfoElement.classList.add("open-popup-pet-window")
    const popupPetDetailsElement = document.createElement("div")
    popupPetInfoElement.innerHTML = ''
    popupPetInfoElement.appendChild(popupPetDetailsElement)

    popupPetDetailsElement.innerHTML = `
    <form id="edit-form">
        <label for="pet-name">Name: </label>
        <input type="text" id="pet-name" value="" placeholdet="e.g. Max" required><br>
        <label for="pet-age" placeholder=1>Age: </label>
        <input type="number" id="pet-age" min="1" max="99" value = ""><br>
        <label for="pet-kind">Kind: </label>
        <select name="kinds" id="pet-kind" form="kindform">
        <option value="0" selected disabled hidden></option>
        <option value="1">Cat</option>
        <option value="2">Dog</option>
        <option value="3">Parrot</option>
        <option value="4">Other</option>
        </select><br>
        <label for="pet-notes">Notes: </label>
        <textarea id="pet-notes" rows="1" value=""></textarea><br>
        <label for="health-problems">Health problems:</label>
        <input type="checkbox" id="health-problems" /><br>
        <label for="added-date"> Added date: </label>
        <input type="date" id="added-date" value="">
        <button type="submit" id="save-pet-button" class="save-pet">Save</button>
    </form>
    `
    const editForm = document.getElementById("edit-form")
    editForm.addEventListener("submit", function(e) {
        console.log(editForm)
        e.preventDefault()
        editForm.checkValidity()
        
        const dataToPost = {
            petName: `${document.getElementById("pet-name").value.trim()}`,
            age: `${document.getElementById('pet-age').value}`,
            notes: `${document.getElementById('pet-notes').value.trim()}`,
            kind: Number(`${document.getElementById('pet-kind').value}`),
            healthProblems: Boolean(document.getElementById("health-problems").checked),
            addedDate: `${document.getElementById('added-date').value}`,
        }

        submitNewPet(dataToPost)
    })


    const closePetButton = document.createElement("button")
    closePetButton.innerHTML = "×"
    closePetButton.setAttribute("id", "close-pet-button")
    closePetButton.setAttribute("class", "close-pet")
    popupPetInfoElement.appendChild(closePetButton)

    function closePetInfoPopup() {
        popupPetInfoElement.classList.remove("open-popup-pet-window")
        popupPetDetailsElement.innerHTML = ''
        blurredDiv.classList.remove("blurred")
    }
    closePetButton.addEventListener("click", closePetInfoPopup)

    const cancelPetButton = document.createElement("button")
    cancelPetButton.innerHTML = "Cancel"
    cancelPetButton.setAttribute("id", "cancel-pet-button")
    cancelPetButton.setAttribute("class", "cancel-pet")
    popupPetInfoElement.appendChild(cancelPetButton)
    
}
addNewPetButton.addEventListener("click", createNewPet)

async function submitNewPet(dataToPost) {
    try {
        switchLoader(true)

        const createdPetDetails = await postPetDetails(dataToPost)
        renderPetDetails(dataToPost.kind, createdPetDetails)
        const popupPetInfoElement = document.querySelector('#popup-pet')
        popupPetInfoElement.classList.remove("open-popup-pet-window")
        // close form
        await loadPetList()
    } catch (e) {
        // add error message in form
       console.error(e)
    } finally {
        switchLoader(false)
    }
}