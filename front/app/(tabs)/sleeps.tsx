import VerticalList from "@/components/VertcalList";
import { fetchSessions } from "@/utils/call_backend";
import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';

export default function SleepScreen() {
  const [sleeps, setSleeps] = useState<{ 
    _id: string;
    workoutType: string; 
    createdAt: string; 
    workoutRecords?: any[]
  }[]>([]);
  const [loading, setLoading] = useState(true);

  const getSleeps = async () => {
    setLoading( true )
    const sleeps = await fetchSessions()
    console.log(sleeps)
    setSleeps(sleeps?.data.sessions)
    setLoading( false )
  }

  useEffect( () => { getSleeps() }, [])

  return (
    <View style = {styles.outerView}>
      <Text style={styles.headerText}> Workout Sessions </Text>

      {
        loading 
        ? ( <ActivityIndicator size = "large" color = "blue"/> )
        : ( 
          <VerticalList
            list = {sleeps}
            key_ = "_id"
            outerName = "workoutType"
            sublistName = "workoutRecords"
            sublistKey = "_id"
            deleteItem={(x) => console.log(x)}
          /> 
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  outerView : { flex : 1, padding : 20, backgroundColor: "#fff" },
  headerText : { fontSize: 24, fontWeight: "bold", marginBottom: 10 }
})