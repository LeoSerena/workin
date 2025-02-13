import { fetchSessions, deleteSession,  } from "@/utils/call_backend";
import React, { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';

export default function SessionScreen() {
  const [sessions, setSessions] = useState<{ 
    _id: string; 
    workoutType: string; 
    createdAt: string; 
    workoutRecords?: any[]
  }[]>([]);
  const [loading, setLoading] = useState(true);

  const getSessions = async () => {
    setLoading( true )
    const sessions = await fetchSessions()
    console.log(sessions)
    setSessions(sessions?.data.sessions)
    setLoading( false )
  }

  useEffect( () => { getSessions() }, [])

  return (
    <View style = {{ flex : 1, padding : 20, backgroundColor: "#fff" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}> Workout Sessions </Text>

      {loading ? (
        <ActivityIndicator size = "large" color = "blue"/>
      ) : (
        <FlatList
          data={sessions}
          keyExtractor={(item) => item._id}
          renderItem = {({ item }) => (
            <View style = {{ padding: 15, borderBottomWidth:1, borderColor: "#ddd"}}>
              <Text style = {{ fontSize: 18, fontWeight: "bold"}}>{item.workoutType}</Text>
              <Text>Created: {new Date(item.createdAt).toLocaleDateString()}</Text>

              {
                item.workoutRecords && item.workoutRecords.length > 0 ? 
                (
                  <FlatList
                    data = {item.workoutRecords}
                    keyExtractor = {(rec, index) => indexedDB.toString()}
                    renderItem={({ item : rec }) => ( <Text>- {JSON.stringify(rec)}</Text>)}
                  >
                  </FlatList>
                ): 
                (<Text>No records available</Text>)
              }

              <View style = {{ flexDirection : "row", marginTop: 10 }}>
                <TouchableOpacity
                  onPress={() => { console.log(item)} }
                  style={{ padding: 10, backgroundColor: "blue", marginRight: 10, borderRadius: 5 }}
                >
                  <Text style = {{color : "white"}}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => deleteSession(item._id)}
                  style={{ padding: 10, backgroundColor: "red", borderRadius: 5 }}
                >
                  <Text style={{ color: "white" }}>Delete</Text>
                </TouchableOpacity>
              </View>

            </View>
          )}
        ></FlatList>
      )}
    </View>
  );
}

