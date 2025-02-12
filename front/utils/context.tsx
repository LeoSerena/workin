import { createContext, type PropsWithChildren, useEffect, useState } from 'react';
import { useStorageState } from './useStorageState';
import { authenticate, LoginInputs } from '@/utils/call_backend';
import { useRouter } from 'expo-router';

export const AuthContext = createContext<{
    signIn: (T : LoginInputs) => void;
    signOut: () => void;
    // accessToken: string | null,
    refreshToken: string | null,
    isLoading: boolean;
}>({
    signIn: (T) => null,
    signOut: () => null,
    // accessToken: null,
    refreshToken: null,
    isLoading: true
});


export function SessionProvider( { children } : PropsWithChildren ) {
    // const [ accessToken, setAccessToken ] = useStorageState( "accessToken" );
    const [ refreshToken, setRefreshToken ] = useStorageState( "refreshToken" );
    const [ isLoading, setIsLoading ] = useState(true);

    const router = useRouter();

    return (
        <AuthContext.Provider
            value={{
                signIn : async (data : LoginInputs) =>  { 
                    setIsLoading( true )
                    const res = await authenticate(data)
                    setRefreshToken(res?.data.refresh_token)
                    router.push("/(tabs)/sessions")
                },
                signOut : async () =>  { 
                    // setAccessToken( null ) 
                    setRefreshToken( null )
                },
                // accessToken, 
                refreshToken, 
                isLoading
            }}>
            { children }
        </AuthContext.Provider>
    )
     
}
