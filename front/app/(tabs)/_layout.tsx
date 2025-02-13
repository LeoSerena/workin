import { useContext, useEffect } from 'react';
import { Tabs, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { AuthContext } from '@/utils/context';

export default function TabLayout() {

  const { refreshToken, isLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if(!isLoading && !refreshToken){ router.replace("/login") }
  },[isLoading, refreshToken])

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
        headerStyle: { backgroundColor: '#25292e' },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle: { backgroundColor: '#25292e' },
        headerRight: () => (
          <TouchableOpacity onPress={() => console.log('User Icon Pressed')}>
            <MaterialCommunityIcons name="account-circle" size={28} color="#fff" style={{ marginRight: 15 }} />
          </TouchableOpacity>
        )
      }}
      >
      <Tabs.Screen
        name="sessions"
        options={{
          title: 'Sessions',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={focused ? 'weight-lifter' : 'weight-lifter'} color={color} size={24}/>
          ),
        }}
      />
      <Tabs.Screen
        name="sleeps"
        options={{
          title: 'Sleeps',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons  name={focused ? 'power-sleep' : 'power-sleep'} color={color} size={24}/>
          ),
        }}
      />
      <Tabs.Screen
        name="measures"
        options={{
          title: 'Measures',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={focused ? 'tape-measure' : 'tape-measure'} color={color} size={24}/>
          ),
        }}
      />
    </Tabs>
  );

}
