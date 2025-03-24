import VerticalList from "@/components/VertcalList";
import { fetchSessions, deleteSession } from "@/utils/call_backend";
import React, { useEffect, useState } from "react";
import { Alert, Text, View, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import SlideModal from "@/components/SlideModal";
import AddSessionForm from "@/components/forms/AddSessionForm";

export default function SessionScreen() {

  const [sessions, setSessions] = useState<{ 
    _id: string; 
    workoutType: string; 
    createdAt: string; 
    workoutRecords?: any[]
  }[]>([]);
  const [ loading, setLoading ] = useState(true);
  const [ modalVisible, setModalVisible ] = useState(false);

  const getSessions = async () => {
    setLoading( true )
    const sessions = await fetchSessions()
    console.log(sessions)
    setSessions(sessions?.data.sessions)
    setLoading( false )
  }

  useEffect( () => { getSessions() }, [])

  function handleDeleteSession(itemId: string) : void {
    Alert.alert(
      'Delete', 'Are you sure you want to delete?', 
      [
        { 
          text: 'Yes', 
          onPress: async () => {
              let response = await deleteSession(itemId)
              if (response.status == 200 ){ 
                console.log('Deleted:', itemId);
                setSessions((prevList) => prevList.filter((item) => item._id !== itemId));
  
              }
          },
        },
        { 
          text: 'No', 
          onPress: () => '' 
        }
    ]);
  }

  return (
    <View style = {styles.outerView}>
      <Text style={styles.headerText}> Workout Sessions </Text>

      {
        loading 
        ? ( <ActivityIndicator size = "large" color = "blue"/> )
        : ( 
          <VerticalList
            list = {sessions}
            key_ = "_id"
            outerType = "sessionType"
            outerName = "sessionName"
            sublistName = "workoutRecords"
            sublistKey = "_id"
            deleteItem={(x) => handleDeleteSession(x)}
            addNewComponent ={ 
              <TouchableOpacity onPress={() => setModalVisible(true)} style = { styles.outerViewList }>
                <AntDesign name="pluscircleo" size={24} color="black" />
              </TouchableOpacity>
            }
          /> 
        )
      }
      <SlideModal 
        isVisible = {modalVisible} 
        onClose={() => setModalVisible(false)}
        textHeader="New Session"
      >
      <AddSessionForm></AddSessionForm>
      </SlideModal>
    </View>
  );
}

const styles = StyleSheet.create({
  outerViewList: { padding: 15, borderBottomWidth: 1, borderColor: "#ddd" },
  outerView : { flex : 1, padding : 20, backgroundColor: "#fff" },
  headerText : { fontSize: 24, fontWeight: "bold", marginBottom: 10 }
})