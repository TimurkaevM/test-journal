import { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../misc/Colors";
import { closeCreateModal } from "../redux/slices/applicationSlice";
import { addTask } from "../redux/slices/tasksSlice";
import { RootState } from "../redux/store";

export const CreateModal = () => {
  const dispatch = useDispatch();

  const { createModalVisible } = useSelector((state: RootState) => state.applicationReducer);

  const [lesson, setLesson] = useState<string>("");
  const [homework, setHomework] = useState<string>("");
  const [lessonError, setLessonError] = useState<string | null>(null);
  const [homeworkError, setHomeworkError] = useState<string | null>(null);

  const changeLessonError = () => {
    if (lessonError) {
      setLessonError(null);
    }
  };

  const changeHomeworkError = () => {
    if (homeworkError) {
      setHomeworkError(null);
    }
  };

  const closeModal = () => {
    dispatch(closeCreateModal());
  };

  const handleSave = () => {
    if (!lesson.length) {
      setLessonError("Обязательное поле");
      return;
    }
    if (!homework.length) {
      setHomeworkError("Обязательное поле");
      return;
    }
    setHomework("");
    setLesson("");
    dispatch(addTask({ lesson, homework }));
    closeModal();
  };

  return (
    <Modal animationType="fade" transparent visible={createModalVisible}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.centeredView}>
          <View style={styles.modal}>
            <Text style={styles.title}>Добавить предмет</Text>
            <Text style={styles.subTitle}>Укажите заголовок и задание</Text>
            <TextInput
              style={styles.input}
              value={lesson}
              onChangeText={setLesson}
              placeholder="Заголовок"
              onChange={changeLessonError}
            />
            {lessonError && <Text style={styles.inputError}>{lessonError}</Text>}
            <TextInput
              style={styles.input}
              value={homework}
              onChangeText={setHomework}
              placeholder="Задание"
              onChange={changeHomeworkError}
            />
            {homeworkError && <Text style={styles.inputError}>{homeworkError}</Text>}
            <View style={styles.modalBtns}>
              <Pressable
                onPress={closeModal}
                style={[styles.btn, { borderRightWidth: 1, borderRightColor: Colors.WHITE }]}>
                <Text style={[styles.btnText, { color: Colors.LIGHT }]}>Отмена</Text>
              </Pressable>
              <Pressable onPress={handleSave} style={styles.btn}>
                <Text style={styles.btnText}>Сохранить</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.MODAL_BG,
  },
  modal: {
    overflow: "hidden",
    paddingTop: 20,
    borderRadius: 16,
    backgroundColor: "#f6f6f6",
    alignItems: "center",
  },
  title: {
    fontSize: 17,
    textAlign: "center",
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#c9c9c9",
    marginBottom: 5,
  },
  input: {
    width: 270,
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  inputError: {
    marginTop: 5,
    color: "red",
  },
  modalBtns: {
    width: 300,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    marginTop: 30,
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
});
