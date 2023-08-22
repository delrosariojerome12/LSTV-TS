import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./features/auth/auth";
import employeesReducer from "./features/employees/employees";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
