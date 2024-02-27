import Inputs from "../../components/Inputs";
import Keyboard from "../../components/Keyboard";
import { initInputs, setInputs } from "../../redux/slices/gameSlice";
import { useDispatch } from "react-redux";

const Game = () => {
  const dispatch = useDispatch();

  dispatch(initInputs());
  return (
    <main>
      <Inputs />
      <Keyboard />
    </main>
  );
};

export default Game;
