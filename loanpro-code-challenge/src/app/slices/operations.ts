import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Operation {
  id: number;
  userId: number;
  operation_id: number;
  operation_response: string;
  cost: number;
  date: string
}

type OperationResult = string | number | null

interface OperationsState {
  operationRecords: Operation[];
  result: OperationResult;
  selectedOperation: string;
  firstNum: number;
  secondNum: number,
  requestedPage: number,
  filter: string
}

const initialState: OperationsState = {
  operationRecords: [],
  result: null,
  selectedOperation: "addition",
  firstNum: 0,
  secondNum: 0,
  requestedPage:1,
  filter: "all"
};

const operationsSlice = createSlice({
  name: 'operations',
  initialState,
  reducers: {
    setOperationRecords: (state, action: PayloadAction<Operation[]>) => {
      state.operationRecords = action.payload;
    },
    setOperationResult: (state, action: PayloadAction<OperationResult>) => {
        state.result = action.payload
    },
    clearOperationResult: (state) => {
      state.result = null
    },
    setSelectedOperation: (state, action: PayloadAction<string>) => {
      state.selectedOperation = action.payload
    },
    setFirstNum: (state, action: PayloadAction<number>) => {
      state.firstNum = action.payload
    },
    setSecondNum: (state, action: PayloadAction<number>) => {
      state.secondNum = action.payload
    },
    setRequestedPage: (state, action: PayloadAction<number>) => {
      state.requestedPage = action.payload
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload
    }
  },
});

export const { 
  setOperationRecords, 
  setOperationResult, 
  clearOperationResult,
  setSelectedOperation, 
  setFirstNum, 
  setSecondNum,
  setRequestedPage,
  setFilter,
 } = operationsSlice.actions;

export default operationsSlice.reducer;