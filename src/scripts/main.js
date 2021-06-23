import { fetchCompletions, fetchPlumbers, fetchRequests } from "./dataAccess.js" // make sure the requests data has been fetched and set into application state first thing
import { SinkRepair } from "./SinkRepair.js"


const mainContainer = document.querySelector("#container")

const render = () => {
    fetchRequests().then(
        () => {
            mainContainer.innerHTML = SinkRepair()
        }
    )
}

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)

fetchRequests()
    .then( () => fetchPlumbers()
    )
    .then( () => fetchCompletions()
    )
    .then( () => render()
    )