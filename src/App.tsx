import { useRef, useState } from "react";
import "./App.css";

const word = "Rocket";

const array = [];
for (let i = 0; i < word.length; i++) {
  const row = [];
  for (let i = 0; i < 6; i++) {
    row.push("");
  }
  array.push(row);
}

function App() {
  const [currentRow, setCurrentRow] = useState(0);
  const [inputs, setInputs] = useState(array);
  const [rightValues, setRightValues] = useState([]);
  const refs = [];

  const createRefs = () => {
    inputs.forEach((row, index) => {
      refs[index] = new Array(row.length);
      row.map((el, index2) => {
        refs[index][index2] = useRef(null);
      });
    });
  };
  createRefs();
  const changeInput = (event, index, index2) => {
    if (!/[a-z]/i.test(event.key)) {
      event.target.value = "";
    } else if (event.target.value !== "") {
      if (index2 + 1 > 5) {
        refs[index + 1][0].current.focus();
      } else {
        refs[index][index2 + 1].current.focus();
      }
    }
  };

  const checkValues = (currentRow) => {
    refs[currentRow].map((el, index) => {
      if (el.current.value == word[index]) {
        el.current.classList.add("right");
        setRightValues((prev) => {
          const newRightValues = prev;
          newRightValues[index] = el.current.value;
          return newRightValues;
        });
        console.log(rightValues);
      }
    });
    setCurrentRow(currentRow + 1);
  };

  const click = () => checkValues(currentRow);

  return (
    <>
      <h1>{word}</h1>
      <div className="container">
        {inputs.map((row, index) => {
          return (
            <div className="row" key={index}>
              {row.map((i, index2) => (
                <input
                  disabled={currentRow === index ? false : true}
                  key={index + "" + index2}
                  ref={refs[index][index2]}
                  onChange={(event) => changeInput(event, index, index2)}
                  maxLength={1}
                  type="text"
                  className="letter"
                  placeholder={
                    rightValues[index2] && index === currentRow
                      ? `${rightValues[index2]}`
                      : ""
                  }
                />
              ))}
            </div>
          );
        })}
      </div>

      <button onClick={click}>Click</button>
    </>
  );
}

export default App;
