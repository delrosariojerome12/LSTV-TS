import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  handleDeleteModal,
  handleRemoveMessage,
} from "../features/employees/employees";
import {deleteEmployee} from "../features/employees/employees";
const DeleteModal = React.memo(() => {
  const {selectedEmployee} = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  const {
    fullname,
    birthdate,
    gender,
    contactnum,
    civilstat,
    age,
    address,
    salary,
    isactive,
    recid,
  } = selectedEmployee;
  return (
    <>
      <div className="overlay"></div>
      <div className="delete-modal">
        <div className="employee-details">
          <h4>Are you sure to Delete this Employee? </h4>
          <p>ID: #{recid}</p>
          <p>Full Name: {fullname}</p>
          <p>BirthDate: {birthdate}</p>
          <p>Gender: {gender}</p>
          <p>Age: {age}</p>
          <p>Civil Status: {civilstat}</p>
          <p>Contact Number{contactnum}</p>
          <p>Address: {address}</p>
          <p>Salary: {salary}</p>
          <p>Is Active: {isactive == 1 ? "True" : "False"}</p>
        </div>
        <div className="btn-container">
          <button
            onClick={() => {
              dispatch(handleDeleteModal({employee: null}));
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              dispatch(deleteEmployee({recid}));
              const timer = setTimeout(
                () => dispatch(handleRemoveMessage()),
                3000
              );
              return () => clearTimeout(timer);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
});

export default DeleteModal;
