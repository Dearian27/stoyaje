import "./App.css";
import Game from "./pages/Game";

function App() {
  // const createRefs = () => {
  //   inputs.forEach((row, index) => {
  //     refs[index] = new Array(row.length);
  //     row.map((el, index2) => {
  //       refs[index][index2] = useRef(null);
  //     });
  //   });
  // };
  // createRefs();

  return (
    <>
      {/* <h1>{word}</h1> */}
      <Game />
    </>
  );
}

export default App;
