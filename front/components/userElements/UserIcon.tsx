import { call_backend } from '@/utils/call_backend';
import { useEffect, useState } from 'react';
import { PropsWithChildren } from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';

type Props = PropsWithChildren<{ username : string }>

export default function UserIcon({ username, children }: Props) {

  const [ userData, setUserData ] = useState(null)

  useEffect(() => {
    async function profile(){
      const res = await call_backend('GET', '/user/profile')
      console.log(res)
      
      setUserData(res?.data)
    }
    profile()
  }, [])

  return (
    <View >
        <Text> USERNAME: {username} </Text>
        {children}
    </View>
  );
}

const styles = StyleSheet.create({

});
