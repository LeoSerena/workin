import { useContext, useEffect } from 'react';
import { Tabs, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import UserIcon from '@/components/userElements/UserIcon';
import { AuthContext } from '@/utils/context';

export default function TabLayout() {

  const { userToken, isLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    console.log('Redirect check:', { isLoading, userToken });
    if(!isLoading && !userToken){ router.replace("/login") }
  },[isLoading, userToken])

  return (
      <UserIcon username={String(userToken)}> 
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#ffd33d',
                headerStyle: {
                backgroundColor: '#25292e',
                },
                headerShadowVisible: false,
                headerTintColor: '#fff',
                tabBarStyle: {
                backgroundColor: '#25292e',
                },
            }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
              ),
            }}
          />
          <Tabs.Screen
            name="sessions"
            options={{
              title: 'Sessions',
              tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24}/>
              ),
            }}
          />
      </Tabs>
    </UserIcon>
  );

}
