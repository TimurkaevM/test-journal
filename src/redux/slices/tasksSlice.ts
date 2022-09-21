import { createSlice } from "@reduxjs/toolkit";
import { ITasks } from "../../interfaces/tasks";

export interface TasksState {
  tasks: ITasks[];
}

const initialState: TasksState = {
  tasks: [
    {
      id: 1,
      lesson: "Математика",
      homework: "стр. 4, упр. 36 а, б.",
      checked: false,
    },
    {
      id: 2,
      lesson: "Русский язык",
      homework: "стр. 4, упр. 36 а, б.",
      checked: true,
    },
    {
      id: 3,
      lesson: "ИЗО",
      homework:
        "Подготовить клей, ножницы, вл. салфетки, цветную бумагу, ножницы, шерстяные нитки.",
      checked: false,
    },
    {
      id: 4,
      lesson: "Литература",
      homework: "стр. 4, упр. 36 а, б.",
      checked: true,
    },
  ],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTodo = {
        id: Math.random(),
        lesson: action.payload.lesson,
        homework: action.payload.homework,
        checked: false,
      };

      state.tasks.push(newTodo);
    },
    changeTaskCheck: (state, action) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload) {
          return {
            ...task,
            checked: !task.checked,
          };
        }

        return task;
      });
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTask, changeTaskCheck, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
