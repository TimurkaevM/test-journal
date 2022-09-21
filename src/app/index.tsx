import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Header } from "../components/Header";
import { JournalList } from "../components/JournalList";
import { StatusBarPlaceHolder } from "../misc/StatusBarPlaceHolder";
import { CreateModal } from "../modals/CreateModal";
import { DeleteModal } from "../modals/DeleteModal";
import { ShowModal } from "../modals/ShowModal";

export const Journal = () => {
  const [showTasks, setShowTasks] = useState<string>("Показывать все задания");

  const changeShowTasks = (item: string): void => {
    setShowTasks(item);
  };

  return (
    <View style={styles.container}>
      <StatusBarPlaceHolder />
      <Header showTasks={showTasks} />
      <JournalList showTasks={showTasks} />
      <DeleteModal />
      <CreateModal />
      <ShowModal showTasks={showTasks} changeShowTasks={changeShowTasks} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
