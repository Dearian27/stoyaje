import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'


export type InputsParams = {value: string, right: boolean, wrongPlace: boolean};

export interface GameState {
  inputs: InputsParams[][],
  word: string,
  currentRow: number,
  rightValues: [string] | [],
  attempts: number,
}

const initialState: GameState = {
  word: 'Rock',
  inputs: [[]],
  currentRow: 0,
  rightValues: [],
  attempts: 6,
}

export const gameSlice:any = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setInputs: (state: RootState, action: PayloadAction<InputsParams>) => {
      state.inputs = action.payload;
    },
    changeInputs: (state: RootState, action: PayloadAction<{right:[[string, string]], wrongPlaced:[[string, string]]}>) => {
      action.payload.wrongPlaced?.map((position) => {
        state.inputs[position[0]][position[1]].wrongPlace = true;
      })
      action.payload.right?.map((position) => {
        state.inputs[position[0]][position[1]].right = true;
        state.inputs[position[0]][position[1]].wrongPlace = false;
      })
    },
    setCurrentRow: (state: RootState, action: PayloadAction<number>) => {
      state.currentRow = action.payload;
    },
    setRightValues: (state: RootState, action: PayloadAction<[string]>) => {
      state.rightValues = action.payload;
    },
    addRightValues: (state: RootState, action: PayloadAction<[[string, string]]>) => {
      action.payload?.map((element: [string, string]) => {
        state.rightValues[element[0]] = element[1];
      })
    },
    initInputs: (state: any) => {
      const array: any = [];
      for (let i = 0; i < state.attempts; i++) {
        const row = [];
        for (let i = 0; i < state.word.length; i++) {
          row.push({value: '', right: false, wrongPlace: false});
        }
        array.push(row);
      }
      state.inputs = array;
    }
  },
})

export const { setInputs, setCurrentRow, setRightValues, initInputs, changeInputs, addRightValues } = gameSlice.actions;
export default gameSlice.reducer;