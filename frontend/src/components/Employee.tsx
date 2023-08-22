import React from "react";

interface EmployeeProps {
  employeeDetails: {
    address: string;
    age: number;
    birthdate: string;
    civilstat: string;
    contactnum: string;
    fullname: string;
    gender: string;
    isactive: string;
    recid: string;
    salary: number;
  };
}

const Employee: React.FC<EmployeeProps> = React.memo(({employeeDetails}) => {
  console.log(employeeDetails);
  const {} = employeeDetails;

  return <div className="employee"></div>;
});

export default Employee;
