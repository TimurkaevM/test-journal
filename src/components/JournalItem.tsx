import React from "react";
import { FC } from "react";
import { StyleSheet, Text, Pressable, View, Dimensions } from "react-native";
import { ITasks } from "../interfaces/tasks";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../misc/Colors";
import { useDispatch } from "react-redux";
import { changeTaskCheck } from "../redux/slices/tasksSlice";
import { openDeleteModal } from "../redux/slices/applicationSlice";

interface IJournalItemProps {
  item: ITasks;
}

export const JournalItem: FC<IJournalItemProps> = ({ item }) => {
  const { id, checked, lesson, homework } = item;

  const backgroundColorChecked = checked ? "green" : Colors.WHITE;
  const borderColorChecked = checked ? "green" : Colors.BLACK;

  const dispatch = useDispatch();

  const handleChange = (): void => {
    dispatch(changeTaskCheck(id));
  };

  const handleOpen = (): void => {
    dispatch(openDeleteModal(id));
  };

  return (
    <View style={styles.task}>
      <View style={styles.leftContainer}>
        <Pressable
          onPress={handleChange}
          style={[
            styles.checked,
            { backgroundColor: backgroundColorChecked, borderColor: borderColorChecked },
          ]}>
          <AntDesign name="check" size={20} color={checked ? Colors.WHITE : Colors.LIGHT} />
        </Pressable>
        <View>
          <Text style={styles.lesson}>{lesson}</Text>
          <Text
            style={[
              styles.homework,
              {
                textDecorationLine: checked ? "line-through" : "none",
                color: checked ? Colors.LIGHT : Colors.BLACK,
                textDecorationStyle: "solid",
                textDecorationColor: Colors.LIGHT,
              },
            ]}>
            {homework}
          </Text>
        </View>
      </View>
      <Pressable onPress={handleOpen} style={styles.rightContainer}>
        <View style={styles.delete}>
          <MaterialIcons name="delete-outline" size={20} color={Colors.LIGHT} />
        </View>
      </Pressable>
    </View>
  );
};

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  task: {
    flexDirection: "row",
    paddingVertical: 20,
    width: width - 40,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  rightContainer: {
    flexBasis: 50,
    alignItems: "flex-end",
    justifyContent: "center",
    marginLeft: 50,
  },
  checked: {
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginRight: 15,
    borderWidth: 1.7,
  },
  lesson: {
    fontSize: 20,
  },
  homework: {
    marginTop: 5,
    textDecorationLine: "none",
  },
  delete: {
    width: 37,
    height: 37,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#f6f6f6",
  },
});
