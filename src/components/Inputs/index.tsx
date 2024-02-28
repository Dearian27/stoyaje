import React, { useRef, MutableRefObject, RefObject, useEffect } from "react";
import "./styles.scss";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import {
  InputsParams,
  addRightValues,
  changeInputs,
  initInputs,
  setCurrentRow,
  setRightValues,
} from "../../redux/slices/gameSlice";

const Inputs = () => {
  const { inputs, word, currentRow, rightValues } = useSelector(
    (state: RootState) => state.game
  );
  const dispatch = useDispatch();

  const tableRef = useRef<HTMLDivElement>(null);

  const changeInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    index2: number
  ) => {
    if (!/[a-z]/i.test(event.target.value)) {
      event.target.value = "";
    } else if (event.target.value !== "") {
      if (index2 + 1 < word.length) {
        tableRef.current!.children[index].children[index2 + 1]?.focus();
      } else {
        tableRef.current!.children[index + 1]?.children[0]?.focus();
      }
    }
  };
  const checkValues = (currentRow: number) => {
    // const newInputs = [...inputs];
    const newRightValues = [];
    const right = [];
    const wrongPlaced = [];

    const row = tableRef.current?.children[currentRow];
    for (let i = 0; i < (row?.children?.length || 0); i++) {
      const el = row?.children[i];
      if (el?.value.toLowerCase() == word[i].toLowerCase()) {
        right.push([currentRow, i]);
        newRightValues.push([i, el?.value]);
      } else if (
        word.toLowerCase().split("").includes(el?.value.toLowerCase()) &&
        word.toLowerCase().split("")[i] != el?.value.toLowerCase()
      ) {
        wrongPlaced.push([currentRow, i]);
        // newInputs[currentRow][i].wrongPlace = true;
      }
    }
    dispatch(changeInputs({ right, wrongPlaced }));
    dispatch(addRightValues(newRightValues));
    dispatch(setCurrentRow(currentRow + 1));
  };

  let count = 0;
  rightValues.map((el) => {
    if (el) count++;
  });
  if (count === word.length) {
    console.log("finish");
  }
  console.log(rightValues, rightValues.length);
  const click = () => checkValues(currentRow);
  console.log(rightValues);
  return (
    <>
      <div className="container" ref={tableRef}>
        {inputs.map((row: InputsParams[], index: number) => {
          return (
            <div className="row" key={`row${index}`}>
              {row.map((input: InputsParams, index2: number) => (
                <input
                  disabled={currentRow === index ? false : true}
                  key={`input_${index}_${index2}`}
                  onChange={(event) => changeInput(event, index, index2)}
                  maxLength={1}
                  type="text"
                  className={`letter ${index === currentRow ? "current" : ""}
                    ${
                      input.right
                        ? "right"
                        : input.wrongPlace
                        ? "wrong-place"
                        : ""
                    }
                    `}
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
        <button onClick={click}>Click</button>
      </div>
    </>
  );
};

export default Inputs;
