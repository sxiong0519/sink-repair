import { sendRequest } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => { //when something in the maincontainer is clicked - maincontainer is referenced in main.js
    if (clickEvent.target.id === "submitRequest") { //the button below
        // Get what the user typed into the form fields
        const userDescription = document.querySelector("input[name='serviceDescription']").value //the input value of description is = to userDescription
        const userAddress = document.querySelector("input[name='serviceAddress']").value // ""
        const userBudget = document.querySelector("input[name='serviceBudget']").value // ""
        const userDate = document.querySelector("input[name='serviceDate']").value // ""

        // Make an object out of the user input
        const dataToSendToAPI = {
            description: userDescription,
            address: userAddress,
            budget: userBudget,
            neededBy: userDate
        }

        // Send the data to the API for permanent storage
        sendRequest(dataToSendToAPI)
    }
})

export const ServiceForm = () => {
    let html = `
        <div class="field">
            <label class="label" for="serviceDescription">Description</label>
            <input type="text" name="serviceDescription" class="input" />
        </div>
        <div class="field">
            <label class="label" for="serviceAddress">Address</label>
            <input type="text" name="serviceAddress" class="input" />
        </div>
        <div class="field">
            <label class="label" for="serviceBudget">Budget</label>
            <input type="number" name="serviceBudget" class="input" />
        </div>
        <div class="field">
            <label class="label" for="serviceDate">Date needed</label>
            <input type="date" name="serviceDate" class="input" />
        </div>

        <button class="button" id="submitRequest">Submit Request</button>
    `

    return html
}
