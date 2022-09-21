import { useState, FC } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Text,
  Pressable,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../misc/Colors";
import { closeShowModal } from "../redux/slices/applicationSlice";
import { RootState } from "../redux/store";

const arrayShowTasks = ["Показывать все задания", "Выполненные", "Не выполненные"];

interface IShowModalProps {
  showTasks: string;
  changeShowTasks: (item: string) => void;
}

export const ShowModal: FC<IShowModalProps> = ({ showTasks, changeShowTasks }) => {
  const dispatch = useDispatch();

  const { showModalVisible } = useSelector((state: RootState) => state.applicationReducer);
  const [modalWidth, setModalWidth] = useState<number>(0);
  const [modalHeight, setModalHeight] = useState<number>(0);

  const closeModal = () => {
    dispatch(closeShowModal());
  };

  const handleChange = (item: string): void => {
    changeShowTasks(item);
    closeModal();
  };

  const onLayout = (event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setModalWidth(width);
    setModalHeight(height);
  };

  return (
    <Modal animationType="fade" transparent visible={showModalVisible}>
      <View
        onLayout={onLayout}
        style={[
          styles.modal,
          { transform: [{ translateX: -modalWidth / 2 }, { translateY: -modalHeight / 2 }] },
        ]}>
        {arrayShowTasks.map((item) => {
          const colorText = showTasks === item ? Colors.BLUE : "#c9c9c9";

          return (
            <Pressable onPress={() => handleChange(item)} key={item} style={styles.btn}>
              <Text style={[styles.title, { color: colorText }]}>{item}</Text>
            </Pressable>
          );
        })}
      </View>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.modalBg} />
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  modal: {
    width: width - 20,
    position: "absolute",
    top: "50%",
    left: "50%",
    overflow: "hidden",
    borderRadius: 16,
    backgroundColor: "#f6f6f6",
    zIndex: 1000,
  },
  title: {
    fontSize: 17,
    textAlign: "center",
  },
  btn: {
    borderBottomColor: Colors.WHITE,
    borderBottomWidth: 2,
    paddingVertical: 25,
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
