import { Provider } from "react-redux";
import { Journal } from "./src/app";
import { store } from "./src/redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <Journal />
    </Provider>
  );
}
