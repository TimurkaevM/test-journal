import React from "react";
import { FC } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { ITasks } from "../interfaces/tasks";
import { RootState } from "../redux/store";
import { AddJournalTask } from "./AddJournalTask";
import { JournalItem } from "./JournalItem";

interface IRenderTasksProps {
  item: ITasks;
}

interface IJournalListProps {
  showTasks: string;
}

const renderTasks: FC<IRenderTasksProps> = ({ item }) => {
  return <JournalItem item={item} />;
};

export const JournalList: FC<IJournalListProps> = ({ showTasks }) => {
  const { tasks } = useSelector((state: RootState) => state.tasksReducer);

  let currentRenderTasks: ITasks[] = [];

  if (showTasks === "Показывать все задания") {
    currentRenderTasks = tasks;
  }
  if (showTasks === "Выполненные") {
    currentRenderTasks = tasks.filter((task) => task.checked);
  }
  if (showTasks === "Не выполненные") {
    currentRenderTasks = tasks.filter((task) => !task.checked);
  }

  return (
    <View style={styles.tasks}>
      <FlatList
        data={currentRenderTasks}
        extraData={tasks}
        renderItem={renderTasks}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={<AddJournalTask />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tasks: {
    alignItems: "center",
    flex: 1,
  },
});
