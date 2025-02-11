import axios from "axios";

export async function call_backend(method :string, route: string, payload? : any ){

    const config = { withCredentials: true }

    const api_route = "http://localhost" + ":" + "5000" + route
    switch(method){
        case "GET":
            return await axios.get( api_route, { ...config, params: payload} )
        case "POST":
            return await axios.post( api_route, payload, config )
    }
}

export type LoginInputs = {
    identifier : string
    password : string
}
export async function authenticate( creds : LoginInputs ){ return await call_backend('POST', '/login', creds) }

export type ProfileData = {
    id_ : string,
    username : string,
    email : string
}
export async function fetchProfile() { return await call_backend('GET', '/user/profile') }