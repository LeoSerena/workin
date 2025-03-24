import { AxiosResponse } from 'axios';
import { memo, useRef } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { GestureHandlerRootView, Pressable } from 'react-native-gesture-handler';
import ReanimatedSwipeable, { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated'; 

const dragValue = 50;
const padding = 3;

type Props = {
    list: any[],
    key_: any,
    outerName: string,
    outerType: string,
    sublistName: string,
    sublistKey: string,
    deleteItem: (item: any) => void,
    addNewComponent: any
}

function RightAction(
    prog: SharedValue<number>, 
    drag: SharedValue<number>,
    itemId: string,
    deleteItem: (itemId: string) =>  void
) {
    const styleAnimation = useAnimatedStyle(() => {
      console.log('[R] showRightProgress:', prog.value);
      console.log('[R] appliedTranslation:', drag.value);
  
      return {
        transform: [{ translateX: drag.value + dragValue }],
      };
    });
  
    return (
      <Reanimated.View style={styleAnimation}>
        <Pressable style={styles.deleteTouchable} onPress={() => deleteItem(itemId)}>
          <Text style={styles.deleteText}>Delete</Text>
        </Pressable>
      </Reanimated.View>
    );
}

const ListItem = ({ item, deleteItem }: any) => {

    const reanimatedRef = useRef<SwipeableMethods>(null);

    return (
        <GestureHandlerRootView>
            <ReanimatedSwipeable
                ref = {reanimatedRef}
                containerStyle={styles.swipeable}
                friction = {2}
                enableTrackpadTwoFingerGesture = {true}
                rightThreshold = { dragValue }
                overshootLeft={false}
                overshootRight={false}
                renderRightActions={ (prog, drag) => RightAction(prog, drag, item._id, deleteItem) }
            >
                <View style={styles.outerViewList}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>{item.sessionType} {item.sessionName} {new Date(item.createdAt).toLocaleDateString()}</Text>
                    </View>
                    {
                        item.workoutRecords && item.workoutRecords.length > 0 ?
                            (
                                <FlatList
                                    data={item.workoutRecords}
                                    keyExtractor={(x) => x._id}
                                    renderItem={({ item: rec }) => (<Text>{JSON.stringify(rec)}</Text>)}
                                ></FlatList>
                            ) : (<Text> No Entries </Text>)
                    }
                </View>
            </ReanimatedSwipeable>
        </GestureHandlerRootView>
    );
};

const MemoizedListItem = memo(ListItem);

export default function VerticalList(props: Props) {
    return (
        <FlatList
            data={props.list}
            keyExtractor={(x) => x[props.key_]}
            ListHeaderComponent={props.addNewComponent}
            renderItem={({ item }) => (
                <MemoizedListItem 
                    item={item} 
                    onSwipe={() => props.deleteItem(item)}
                    deleteItem={props.deleteItem}
                />
            )}
        ></FlatList>
    );
}

const styles = StyleSheet.create({
    outerViewList: { 
        padding: padding, 
        borderBottomWidth: 1, 
        borderColor: "#ddd",
        height: dragValue
    },
    header: { flexDirection: "row", marginTop: 1, alignItems: "center" },
    headerText: { fontSize: 18, fontWeight: "bold", color: "black" },
    subItemText: { fontSize: 14, color: "gray" },
    addWorkoutText: { fontSize: 14, color: "blue", fontStyle: "italic" },
    deleteTouchable: { 
        borderRadius: 5, 
        backgroundColor: 'red', 
        justifyContent: 'center', 
        alignItems: 'center',
        width: 50,
        height: 50
        //marginTop: padding
    },
    deleteText: { color: 'white', fontWeight: 'bold' },
    swipeTextContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' },
    swipeText: { color: 'white', fontWeight: 'bold', padding: 20 },
    swipeable: { padding: padding, backgroundColor: 'white' },
    leftAction: { width: 50, height: 50, backgroundColor: 'crimson' },
    rightAction: { width: 50, height: 50, backgroundColor: 'purple' },
});