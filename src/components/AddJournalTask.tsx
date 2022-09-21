import React from "react";
import { StyleSheet, Text, Pressable, View, Dimensions } from "react-native";
import { useDispatch } from "react-redux";
import { Colors } from "../misc/Colors";
import { openCreateModal } from "../redux/slices/applicationSlice";

export const AddJournalTask = () => {
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(openCreateModal());
  };

  return (
    <View style={styles.addBtnContainer}>
      <Pressable onPress={handleOpen} style={styles.addBtn}>
        <Text style={styles.addBtnText}>Добавить</Text>
      </Pressable>
    </View>
  );
};

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  addBtnContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  addBtn: {
    width: width - 40,
    backgroundColor: Colors.BLUE,
    paddingVertical: 25,
    alignItems: "center",
    borderRadius: 15,
  },
  addBtnText: {
    color: Colors.WHITE,
  },
});
