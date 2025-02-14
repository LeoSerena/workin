import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';


type Props = {
    list : any[],
    key_ : any,
    outerName : string,
    sublistName : string,
    sublistKey : string,
    deleteItem : (item : any) => void
}


export default function VerticalList( props : Props ){
    return(
        <FlatList
            data = {props.list}
            keyExtractor={(x) => x[props.key_]}
            renderItem = {
                ({ item }) => (
                    <View style = {styles.outerViewList }>
                        <Text> {item[props.outerName]} -- {item[props.key_]}</Text>
                        <Text>Created: {new Date(item.createdAt).toLocaleDateString()}</Text>
                        {
                            item[props.sublistName] && item[props.sublistName].length > 0 ?
                            (
                                <FlatList
                                    data = {item[props.sublistName]}
                                    keyExtractor={(x) => x[props.sublistKey]}
                                    renderItem={ ({item: rec}) => (<Text> { JSON.stringify(rec) } </Text>) }
                                ></FlatList>
                                
                            ) : ( <Text>Add Workout</Text> )
                        }
                        <View style = {{ flexDirection : "row", marginTop: 10 }}>
                             
                        <TouchableOpacity
                            onPress={() => { console.log(item)} }
                            style={{ padding: 10, backgroundColor: "blue", marginRight: 10, borderRadius: 5 }}
                        >
                            <Text style = {{color : "white"}}>Edit</Text>
                        </TouchableOpacity>
        
                        <TouchableOpacity
                            onPress={() => props.deleteItem(item[props.key])}
                            style={{ padding: 10, backgroundColor: "red", borderRadius: 5 }}
                        >
                            <Text style={{ color: "white" }}>Delete</Text>
                        </TouchableOpacity>

                        </View>
                    </View>
                    
                )
            }
        ></FlatList>
    )
}

const styles = StyleSheet.create({
    outerViewList: { padding: 15, borderBottomWidth:1, borderColor: "#ddd" }
})