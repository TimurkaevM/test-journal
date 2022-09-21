import { useState } from "react";
import { View, StyleSheet, Modal, TouchableWithoutFeedback, Text, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../misc/Colors";
import { closeDeleteModal } from "../redux/slices/applicationSlice";
import { deleteTask } from "../redux/slices/tasksSlice";
import { RootState } from "../redux/store";

export const DeleteModal = () => {
  const dispatch = useDispatch();

  const { deleteModal } = useSelector((state: RootState) => state.applicationReducer);
  const [modalWidth, setModalWidth] = useState<number>(0);
  const [modalHeight, setModalHeight] = useState<number>(0);

  const closeModal = () => {
    dispatch(closeDeleteModal());
  };

  const handleDelete = () => {
    dispatch(deleteTask(deleteModal?.id));
    closeModal();
  };

  const onLayout = (event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setModalWidth(width);
    setModalHeight(height);
  };

  return (
    <Modal animationType="fade" transparent visible={deleteModal.deleteModalVisible}>
      <View
        onLayout={onLayout}
        style={[
          styles.modal,
          { transform: [{ translateX: -modalWidth / 2 }, { translateY: -modalHeight / 2 }] },
        ]}>
        <Text style={styles.title}>Удалить предмет</Text>
        <View style={styles.modalBtns}>
          <Pressable
            onPress={closeModal}
            style={[styles.btn, { borderRightWidth: 1, borderRightColor: Colors.WHITE }]}>
            <Text style={[styles.btnText, { color: Colors.LIGHT }]}>Отмена</Text>
          </Pressable>
          <Pressable onPress={handleDelete} style={styles.btn}>
            <Text style={styles.btnText}>Удалить</Text>
          </Pressable>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.modalBg} />
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    overflow: "hidden",
    paddingTop: 20,
    borderRadius: 16,
    backgroundColor: "#f6f6f6",
    zIndex: 1000,
  },
  title: {
    fontSize: 17,
    textAlign: "center",
    marginBottom: 20,
  },
  modalBtns: {
    width: 300,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: Colors.WHITE,
  },
  btn: {
    width: "50%",
    paddingVertical: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontSize: 21,
    color: Colors.BLUE,
  },
  modalBg: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: Colors.MODAL_BG,
  },
});
