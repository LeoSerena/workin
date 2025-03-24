import { call_backend, ProfileData } from '@/utils/call_backend';
import { useEffect, useState } from 'react';
import { PropsWithChildren } from 'react';
import { StyleSheet, View, Text } from 'react-native';


export default function UserIcon({ children } : PropsWithChildren) {

  const [ userData, setUserData ] = useState<ProfileData>()

  useEffect(() => {
    async function profile(){
      const res = await call_backend('GET', '/user/profile')
     
      setUserData(res?.data)
    }
    profile()
  }, [])

  return (
    <View >
        <Text> USERNAME: {userData?.username} </Text>
        {children}
    </View>
  );
}

const styles = StyleSheet.create({

});
