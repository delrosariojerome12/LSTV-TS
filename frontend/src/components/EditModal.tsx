import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  editEmployee,
  handleEditModal,
  handleRemoveMessage,
} from "../features/employees/employees";
import RadioButton from "./RadioButton";
import CivilStatusComboBox from "./CivilStatusComboBox";
import {RootState} from "../store"; // Import your RootState type

const EditModal = React.memo(() => {
  const {selectedEmployee} = useSelector((state: RootState) => state.employees);
  const dispatch = useDispatch();

  const [fullname, setFullName] = useState<string | null>(
    selectedEmployee?.fullname || null
  );
  const [gender, setGender] = useState<string | null>(
    selectedEmployee?.gender || null
  );
  const [age, setAge] = useState<number | null>(selectedEmployee?.age || null);
  const [birthdate, setBirthDate] = useState<string | null>(
    selectedEmployee?.birthdate || null
  );
  const [address, setAddress] = useState<string | null>(
    selectedEmployee?.address || null
  );
  const [contactnumber, setContactNumber] = useState<string | null>(
    selectedEmployee?.contactnum || null
  );
  const [civilstatus, setCivilStatus] = useState<string | null>(
    selectedEmployee?.civilstat || null
  );
  const [salary, setSalary] = useState<number | null>(
    selectedEmployee?.salary || null
  );
  const [isactive, setIsActive] = useState<boolean | null>(
    selectedEmployee?.isactive === "1" || false
  );

  const [isNumberValid, setNumberValid] = useState<boolean>(true);
  const [isFullNameValid, setFullNameValid] = useState<boolean>(true);
  const [isSubmitFine, setIsSubmitFine] = useState<boolean | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isFullNameValid && isNumberValid && civilstatus) {
      console.log("Submit");
      setIsSubmitFine(true);

      const updatedEmployee: any = {
        // Define the Employee properties based on your interface
        recid: selectedEmployee?.recid ?? 0,
        fullname,
        gender,
        age,
        birthdate,
        salary,
        isactive: isactive ? "1" : "0", // Convert boolean to "1" or "0"
        address,
        contactnum: contactnumber,
        civilstat: civilstatus,
      };
      dispatch(
        editEmployee({
          recid: selectedEmployee?.recid as any,
          updatedEmployee,
        }) as any
      );
      const timer = setTimeout(() => dispatch(handleRemoveMessage()), 3000);
      return () => clearTimeout(timer);
    } else {
      console.log("submit not working");
      setIsSubmitFine(false);
    }
  };
  const handleOnChange = (value: any, id: any) => {
    switch (id) {
      case "fullname":
        setFullName(value);
        const fullNameRegex = /^[A-Za-z\s]+$/;
        const isFullNameValid = fullNameRegex.test(value);
        isFullNameValid ? setFullNameValid(true) : setFullNameValid(false);
        console.log(isFullNameValid);
        return;
      case "age":
        setAge(value);
        return;
      case "birthdate":
        setBirthDate(value);
        return;
      case "contactnum":
        setContactNumber(value);
        const passwordRegex = /^(09|\+639)\d{9}$/;
        let isConctactValid = passwordRegex.test(value);
        isConctactValid ? setNumberValid(true) : setNumberValid(false);
        return;
      case "salary":
        setSalary(value);
        return;
      case "address":
        setAddress(value);
        return;

      default:
        return;
    }
  };

  const getEighteenYearsAgo = () => {
    const today = new Date();
    const eighteenYearsAgo = new Date(today);
    eighteenYearsAgo.setFullYear(today.getFullYear() - 18);
    return eighteenYearsAgo.toISOString().split("T")[0];
  };

  return (
    <>
      <div className="overlay"></div>
      <div className="edit-modal crud">
        <header>
          <h3>Edit Employee</h3>
          {isSubmitFine === false && (
            <h4 style={{color: "red"}}>Fill the fields with proper inputs!</h4>
          )}
        </header>
        <form onSubmit={handleSubmit}>
          <div className="input-contain">
            <input
              id="fullname"
              type="text"
              value={fullname || ""}
              required
              onChange={(e) => {
                handleOnChange(e.target.value, e.target.id);
              }}
            />
            <div className="placeholder-container">
              <label
                className={
                  fullname ? "placeholder-text active" : "placeholder-text"
                }
              >
                <div className={"text"}>FullName</div>
              </label>
            </div>
            {!isFullNameValid && fullname && fullname.length > 0 && (
              <p className="error-message">Invalid Input</p>
            )}
          </div>
          <div className="input-contain">
            <input
              id="address"
              type="text"
              value={address || ""}
              required
              onChange={(e) => {
                handleOnChange(e.target.value, e.target.id);
              }}
            />
            <div className="placeholder-container">
              <label
                className={
                  address ? "placeholder-text active" : "placeholder-text"
                }
              >
                <div className={"text"}>Address</div>
              </label>
            </div>
          </div>

          <div className="input-contain">
            <input
              id="birthdate"
              type="date"
              value={birthdate || ""}
              required
              max={getEighteenYearsAgo()} // Set max to 18 years ago
              onChange={(e) => {
                handleOnChange(e.target.value, e.target.id);
              }}
            />
            <div className="placeholder-container">
              <label
                className={
                  birthdate ? "placeholder-text active" : "placeholder-text"
                }
              >
                <div className={"text"}>Birth Date</div>
              </label>
            </div>
          </div>

          <div className="input-contain">
            <input
              id="age"
              type="number"
              value={age || 18}
              required
              min={18}
              max={60}
              onChange={(e) => {
                handleOnChange(e.target.value, e.target.id);
              }}
            />
            <div className="placeholder-container">
              <label
                className={age ? "placeholder-text active" : "placeholder-text"}
              >
                <div className={"text"}>Age</div>
              </label>
            </div>
          </div>

          <div className="input-contain">
            <input
              id="contactnum"
              type="text"
              value={contactnumber || ""}
              required
              onChange={(e) => {
                handleOnChange(e.target.value, e.target.id);
              }}
            />

            <div className="placeholder-container">
              <label
                className={
                  contactnumber ? "placeholder-text active" : "placeholder-text"
                }
              >
                <div className={"text"}>Contact Number</div>
              </label>
            </div>
            {!isNumberValid && contactnumber && contactnumber.length > 0 && (
              <p className="error-message">Invalid Number</p>
            )}
          </div>

          <div className="input-contain">
            <input
              min={10000}
              id="salary"
              type="number"
              value={salary || ""}
              required
              onChange={(e) => {
                handleOnChange(e.target.value, e.target.id);
              }}
            />
            <div className="placeholder-container">
              <label
                className={
                  salary ? "placeholder-text active" : "placeholder-text"
                }
              >
                <div className={"text"}>Salary</div>
              </label>
            </div>
          </div>

          <RadioButton gender={gender || ""} setGender={setGender} />
          <CivilStatusComboBox
            civilstatus={civilstatus || ""}
            setCivilStatus={setCivilStatus}
          />

          <div className="isactive-container">
            <label>Is Active:</label>
            <input
              type="checkbox"
              name="isactive"
              checked={isactive ?? false}
              onChange={() => setIsActive(!isactive)}
            />
          </div>
          <div className="btn-container">
            <button
              onClick={() => dispatch(handleEditModal({employee: null}))}
              type="button"
            >
              Cancel
            </button>
            <button type="submit">Edit</button>
          </div>
        </form>
      </div>
    </>
  );
});

export default EditModal;
