import axios, {AxiosResponse} from "axios";

export async function call_backend(method :string, route: string, payload? : any ) : Promise<AxiosResponse<any, any>> {

    const config = { 
        withCredentials: true,
        headers : { 'Content-Type' : 'application/json' }
    }

    const api_route = "http://192.168.1.40" + ":" + "5000" + route
    // const api_route = "http://localhost" + ":" + "5000" + route
    switch(method){
        case "GET":
            return await axios.get( api_route, { ...config, params: payload} )
        case "POST":
            return await axios.post( api_route, payload, config )
        case "DELETE":
            return await axios.delete( api_route, { ...config, data: payload } )
        default:
            throw new Error(`Unsupported HTTP method: ${method}`);
    }
}

export type RegisterInputs = {
    email : string
    username : string
    password : string
    repassword : string
}
export async function register( creds : RegisterInputs ){ return call_backend('POST', '/register', creds) }

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

export async function fetchSessions() { return await call_backend('GET', '/session') }
export async function deleteSession( sessionId : string ) {
    console.log("deleting: " + sessionId)
    return await call_backend('DELETE', '/session', {'data' : { "session_id" : sessionId} } ) 
}
export type AddSessionType = {
    sessionType : string
    sessionName? : string
}
export async function addSession( data : AddSessionType ) { return await call_backend('POST', '/session', { 'data' : data } ) }
