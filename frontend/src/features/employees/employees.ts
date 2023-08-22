import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

interface Employee {
  fullname: string;
  gender: string;
  address: string;
  contactnum: string;
  civilstat: string;
  salary: number;
  isactive: string;
  birthdate: string;
  age: number;
  recid: number;
}

interface EmployeesState {
  isFetchAllLoading: boolean;
  isFetchAllError: boolean;
  employees: Employee[];
  isCreateLoading: boolean;
  isCreateError: boolean;
  isAddEmployeeOpen: boolean;
  displayMessage: string;
  isDisplayMessageOpen: boolean;
  isDeleteModalOpen: boolean;
  selectedEmployee: Employee | null;
  isEditModalOpen: boolean;
}

const initialState: EmployeesState = {
  isFetchAllLoading: false,
  isFetchAllError: false,
  employees: [],
  isCreateLoading: false,
  isCreateError: false,
  isAddEmployeeOpen: false,
  displayMessage: "",
  isDisplayMessageOpen: false,
  isDeleteModalOpen: false,
  selectedEmployee: null,
  isEditModalOpen: false,
};

interface CreateEmployeeArgs {
  employee: any; // Replace with your actual employee data type
}

interface DeleteEmployeeArgs {
  recid: number; // Replace with the appropriate type for recid
}

interface EditEmployeeArgs {
  recid: number; // Replace with the appropriate type for recid
  updatedEmployee: any; // Replace with your actual employee data type
}

export const getAllEmployees = createAsyncThunk<
  Employee[], // Specify the resolved value type
  void // Adjust this type based on your actual parameter
>("/employees/getAllEmployees", async (_, {rejectWithValue}) => {
  try {
    const url = "http://localhost/LSTV/backend/getAllEmployees.php";
    const {data: res} = await axios.get(url);
    return res;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error);
  }
});

export const createEmployee = createAsyncThunk(
  "/employees/createEmployee",
  async ({employee}: CreateEmployeeArgs, {rejectWithValue}) => {
    console.log(employee);

    try {
      const url = "http://localhost/LSTV-TS/backend/createEmployee.php";

      const {data: res} = await axios.post(url, employee, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return res;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error);
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "/employees/deleteEmployee",
  async ({recid}: DeleteEmployeeArgs, {rejectWithValue}) => {
    try {
      const url = "http://localhost/LSTV/backend/deleteEmployee.php";
      const {data: res} = await axios.delete(url, {
        data: {recid}, // Pass the data payload containing recid
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editEmployee = createAsyncThunk(
  "/employees/editEmployee",
  async ({recid, updatedEmployee}: EditEmployeeArgs, {rejectWithValue}) => {
    try {
      console.log(recid, updatedEmployee);
      const url = "http://localhost/LSTV/backend/editEmployee.php";
      const {data: res} = await axios.put(
        url,
        {
          recid,
          ...updatedEmployee,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    handleAddEmployees: (state) => {
      state.isAddEmployeeOpen = !state.isAddEmployeeOpen;
    },
    handleRemoveMessage: (state) => {
      state.isDisplayMessageOpen = false;
      console.log("testing");
    },
    handleDeleteModal: (state, action) => {
      state.isDeleteModalOpen = !state.isDeleteModalOpen;
      if (action.payload?.employee) {
        const {employee} = action.payload;
        state.selectedEmployee = employee;
      }
    },
    handleEditModal: (state, action) => {
      state.isEditModalOpen = !state.isEditModalOpen;
      if (action.payload?.employee) {
        const {employee} = action.payload;
        state.selectedEmployee = employee;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllEmployees.pending, (state) => {
        state.isFetchAllLoading = true;
        state.isFetchAllError = false;
      })
      .addCase(getAllEmployees.fulfilled, (state, action) => {
        state.isFetchAllLoading = false;
        state.isFetchAllError = false;
        state.employees = [...action.payload];
      })
      .addCase(getAllEmployees.rejected, (state) => {
        state.isFetchAllLoading = false;
        state.isFetchAllError = true;
      });
    // Define other cases for createEmployee, deleteEmployee, and editEmployee
    builder
      .addCase(createEmployee.pending, (state) => {
        state.isFetchAllLoading = true;
        state.isFetchAllError = false;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        const {employees} = action.payload;
        console.log(employees);
        state.isFetchAllLoading = false;
        state.isFetchAllError = false;
        state.employees = [...employees];
        state.isAddEmployeeOpen = false;
        state.displayMessage = "Employee added successfully";
        state.isDisplayMessageOpen = true;
      })
      .addCase(createEmployee.rejected, (state) => {
        state.isFetchAllLoading = false;
        state.isFetchAllError = true;
        state.displayMessage = "Something went wrong";
        state.isDisplayMessageOpen = true;
      });
    // delete
    builder
      .addCase(deleteEmployee.pending, (state) => {
        state.isFetchAllLoading = true;
        state.isFetchAllError = false;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.isFetchAllLoading = false;
        state.isFetchAllError = false;
        state.employees = [...action.payload];
        state.isDeleteModalOpen = false;
        state.displayMessage = "Employee Deleted Successfully";
        state.isDisplayMessageOpen = true;
      })
      .addCase(deleteEmployee.rejected, (state) => {
        state.isFetchAllLoading = false;
        state.isFetchAllError = true;
        state.isDeleteModalOpen = false;
        state.displayMessage = "Something went wrong";
        state.isDisplayMessageOpen = true;
      });
    // edit
    builder
      .addCase(editEmployee.pending, (state) => {
        state.isFetchAllLoading = true;
        state.isFetchAllError = false;
      })
      .addCase(editEmployee.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isFetchAllLoading = false;
        state.isFetchAllError = false;
        state.employees = [...action.payload];
        state.displayMessage = "Employee Updated Successfully";
        state.isDisplayMessageOpen = true;
        state.isEditModalOpen = false;
      })
      .addCase(editEmployee.rejected, (state) => {
        state.isFetchAllLoading = false;
        state.isFetchAllError = true;
        state.displayMessage = "Something went wrong";
        state.isDisplayMessageOpen = true;
        state.isEditModalOpen = false;
      });
  },
});

export const {
  handleAddEmployees,
  handleRemoveMessage,
  handleDeleteModal,
  handleEditModal,
} = employeesSlice.actions;

export default employeesSlice.reducer;
