import { createSlice } from "@reduxjs/toolkit";
import { IDeleteModal } from "../../interfaces/deleteModal";

export interface applicationState {
  showModalVisible: boolean;
  createModalVisible: boolean;
  deleteModal: IDeleteModal;
}

const initialState: applicationState = {
  showModalVisible: false,
  createModalVisible: false,
  deleteModal: {
    deleteModalVisible: false,
    id: null,
  },
};

export const applicationSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    openShowModal: (state) => {
      state.showModalVisible = true;
    },
    closeShowModal: (state) => {
      state.showModalVisible = false;
    },
    openCreateModal: (state) => {
      state.createModalVisible = true;
    },
    closeCreateModal: (state) => {
      state.createModalVisible = false;
    },
    openDeleteModal: (state, action) => {
      state.deleteModal = {
        deleteModalVisible: true,
        id: action.payload,
      };
    },
    closeDeleteModal: (state) => {
      state.deleteModal = {
        deleteModalVisible: false,
        id: null,
      };
    },
  },
});

export const {
  openShowModal,
  openCreateModal,
  openDeleteModal,
  closeCreateModal,
  closeDeleteModal,
  closeShowModal,
} = applicationSlice.actions;

export default applicationSlice.reducer;
