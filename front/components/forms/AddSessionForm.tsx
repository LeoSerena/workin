import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Picker } from "@react-native-picker/picker";
import { addSession } from "@/utils/call_backend";

const sessionTypes = ['Running', 'Weight']

const inputSchema = yup
    .object()
    .shape({ 
        sessionName : yup.string(),
        sessionType : yup.mixed<NonNullable<(typeof sessionTypes)[number]>>()
            .oneOf(sessionTypes, "not among available session types")
            .required('Session type is required')
    })
    .required()

  
export default function AddSessionForm(){
    const { control, handleSubmit } = useForm({ 
        resolver: yupResolver(inputSchema),
        defaultValues: { sessionName : "", sessionType : "Weight" }
    });

    return (<View style={styles.container}>
        <Text style={styles.label}></Text>
        <Controller
        control={control}
        name="sessionName"
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
            />
        )}
        />

        <Text style={styles.label}>Session Type</Text>
        <Controller
            control={control}
            name="sessionType"
            render={({ field: { onChange, value } }) => (
            <Picker
                selectedValue={value}
                onValueChange={(itemValue) => onChange(itemValue)}
                style={styles.picker}
            >
                {sessionTypes.map((type) => (
                <Picker.Item key={type} label={type} value={type} />
                ))}
            </Picker>
            )}
        />
        <Button title="Submit" onPress={handleSubmit((data) => addSession(data))} />
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#f5f5f5",
    },
    label: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 5,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
      },
    picker: {
        height: 50,
        marginBottom: 20,
      },
  });