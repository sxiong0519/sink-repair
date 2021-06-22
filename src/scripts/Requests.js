import { getRequests, saveCompletion } from "./dataAccess.js"
import { deleteRequest } from "./dataAccess.js"
import { getPlumbers } from "./dataAccess.js"


export const Requests = () => {
    const requests = getRequests()
    const plumbers = getPlumbers()

    let html = '<ul>'

    const listItems = requests.map(request => {
        return `
        <li>
            ${request.description}
            <button class="request__delete delete"
                    id="request--${request.id} request">
                Delete
            </button>
            <select class="plumbers" id="plumbers">
            <option value="">Choose</option>
            ${
                plumbers.map(
                    plumber => {
                        return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
                    }
                ).join("")
            }
        </select>
        </li>
    `
    
                    })

    html += listItems.join("")
    html += '</ul>'                

    return html
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")
            /* 
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                requestId: requestId,
                plumberId: plumberId,
                timestamp: Date.now()
             }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
                saveCompletion(completion)
        }
        
    }
)
