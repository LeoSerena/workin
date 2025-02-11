import { createContext, type PropsWithChildren, useEffect, useState } from 'react';
import { useStorageState } from './useStorageState';
import { authenticate } from '@/utils/call_backend';
import { LoginInputs } from '@/app/login';

export const AuthContext = createContext<{
    signIn: (T : LoginInputs) => void;
    signOut: () => void;
    userToken: string | null,
    isLoading: boolean;
}>({
    signIn: (T) => null,
    signOut: () => null,
    userToken: null,
    isLoading: true
});


export function SessionProvider( { children } : PropsWithChildren ) {
    const [ userToken, setUserToken ] = useStorageState( "userToken" );
    const [ isLoading, setIsLoading ] = useState(true);

    // useEffect(() => {
    //     async function checkToken(){
    //         if(userToken) {
    //             const isValid = await verifyTokenWithAPI(userToken); // Here we check validity with an endpoint on server
    //             if(!isValid){
    //                 // Here if we should handle the case where the user has creds locally and authenticare again
    //                 await setUserToken(null)
    //             }
    //         }
    //         setIsLoading(false)
    //     }
    //     checkToken();
    // }, [ userToken ])

    return (
        <AuthContext.Provider
            value={{
                signIn : async (data : LoginInputs) =>  { 
                    const res = await authenticate(data)
                    setUserToken("tamere")
                },
                signOut : async () =>  { setUserToken( null ) },
                userToken,
                isLoading
            }}>
            { children }
        </AuthContext.Provider>
    )
}

async function verifyTokenWithAPI(token: string) {
    // Simulate a network request to check token validity
    return new Promise((resolve) => setTimeout(() => resolve(token === "xxx"), 1000));
}