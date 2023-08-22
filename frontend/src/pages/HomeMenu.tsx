import React, {useEffect, useMemo} from "react";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../store";
import {getAllEmployees} from "../features/employees/employees";
import Navbar from "../components/Navbar";
import {FaTrash, FaEdit} from "react-icons/fa";
import CreateEmployee from "../components/CreateEmployee";
import {useTable} from "react-table";

import {
  handleAddEmployees,
  handleDeleteModal,
  handleEditModal,
} from "../features/employees/employees";
import DeleteModal from "../components/DeleteModal";
import EditModal from "../components/EditModal";

const HomeMenu: React.FC = React.memo(() => {
  const {
    employees,
    isFetchAllLoading,
    isFetchAllError,
    isAddEmployeeOpen,
    displayMessage,
    isDisplayMessageOpen,
    isDeleteModalOpen,
    isEditModalOpen,
  } = useSelector((state: RootState) => state.employees);
  const dispatch = useDispatch();

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "recid",
      },
      {
        Header: "Full Name",
        accessor: "fullname",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Birth Date",
        accessor: "birthdate",
      },
      {
        Header: "Civil Status",
        accessor: "civilstat",
      },
      {
        Header: "Contact",
        accessor: "contactnum",
      },
      {
        Header: "Salary",
        accessor: "salary",
      },
      {
        Header: "isActive",
        accessor: "isactive",
      },
    ],
    []
  );
  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
    useTable({
      columns,
      data: employees,
    });

  const handleEdit = (employee: any) => {
    console.log("Edit:", employee);
    dispatch(handleEditModal({employee}));
  };

  const handleDelete = (employee: any) => {
    console.log("Delete:", employee);
    dispatch(handleDeleteModal({employee}));
  };

  useEffect(() => {
    dispatch(getAllEmployees() as any);
  }, []);

  return (
    <section className="home-menu">
      <Navbar />
      <div className="middle-bar">
        <button
          onClick={() => {
            dispatch(handleAddEmployees());
          }}
        >
          Add Employee
        </button>
      </div>

      {isFetchAllLoading ? (
        <h1>Loading...</h1>
      ) : isFetchAllError ? (
        <h1>Error fetching data from the server.</h1>
      ) : employees.length === 0 ? (
        <h1>No employees</h1>
      ) : (
        <div className="employees-container">
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup: any) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column: any) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                  <th>Actions</th>
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row: any) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell: any) => (
                      <td {...cell.getCellProps()}>
                        {cell.column.Header === "isActive"
                          ? cell.value === "1"
                            ? "Yes"
                            : "No"
                          : cell.render("Cell")}
                      </td>
                    ))}
                    <td>
                      <button onClick={() => handleEdit(row.original)}>
                        <FaEdit />
                        Edit
                      </button>
                      <button onClick={() => handleDelete(row.original)}>
                        <FaTrash />
                        <p>Delete</p>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {isAddEmployeeOpen && <CreateEmployee />}
      {isDeleteModalOpen && <DeleteModal />}
      {isEditModalOpen && <EditModal />}

      <div
        className={
          isDisplayMessageOpen ? "success-modal showed" : "success-modal"
        }
      >
        <h1>{displayMessage}</h1>
      </div>
    </section>
  );
});

export default HomeMenu;
