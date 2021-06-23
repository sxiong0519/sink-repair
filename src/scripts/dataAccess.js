const mainContainer = document.querySelector("#container");

const applicationState = {
    requests: [],
    plumbers: [],
    completions: []
}

const API = "http://localhost:8088"

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
        
}

export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (servicePlumbers) => {
                // Store the external state in application state
                applicationState.plumbers = servicePlumbers
            }
        )
        
}

export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (serviceCompletions) => {
                // Store the external state in application state
                applicationState.completions = serviceCompletions
            }
        )
        
}

export const getRequests = () => {
    const requestCompleted = applicationState.requests.map( request => {
        request.completion = !!applicationState.completions.find(completion => completion.requestId === request.id)
        return request
    })
    .sort((complete, notComplete) => {
        return complete.completion - notComplete.completion
    })
    return requestCompleted
}

export const getPlumbers = () => {
    return [...applicationState.plumbers]
}

export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }
    // Add this...
    

    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            // ...and this
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })

    }

    export const deleteRequest = (id) => {
        return fetch(`${API}/requests/${id}`, { method: "DELETE" })
            .then(
                () => {
                    mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
                }
            )
    }
    
    
    export const saveCompletion = (POSTrequest) => {
        const assignedPlumbers = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(POSTrequest)
        }
    
        return fetch(`${API}/completions`, assignedPlumbers)
        .then(response => response.json())
        .then(() => {
            // ...and this
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
    }