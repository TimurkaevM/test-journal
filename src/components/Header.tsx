import React, { FC } from "react";
import { StyleSheet, Text, Pressable, View, Dimensions } from "react-native";
import { useDispatch } from "react-redux";
import { Colors } from "../misc/Colors";
import { openShowModal } from "../redux/slices/applicationSlice";

interface IHeaderProps {
  showTasks: string;
}

export const Header: FC<IHeaderProps> = ({ showTasks }) => {
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(openShowModal());
  };

  return (
    <View style={styles.header}>
      <Pressable onPress={handleOpen} style={styles.headerBtn}>
        <Text style={styles.headerBtnText}>{showTasks}</Text>
      </Pressable>
    </View>
  );
};

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 0.8,
    borderBottomColor: "#e1e1e1",
  },
  headerBtn: {
    width: width - 40,
    borderColor: Colors.BLUE,
    borderWidth: 1.4,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  headerBtnText: {
    color: Colors.BLUE,
  },
});
