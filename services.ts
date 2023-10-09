interface Employee {
  id: number;
  name: string;
  email: string;
  mobile: number;
  landline: number;
  website: string;
  address: string;
}
class employeeService {
   employees: Employee[] = [
  {
    id: 1,
    name: "Raja Damireddy",
    email: "rajadamireddy@healthonus.com",
    mobile: 9292929292,
    landline: 4046144130,
    website: "http://www.healthonus.com",
    address: "Dwaraka icons, 2nd floor, kavuri hills, madhapur",
  },
  {
    id: 2,
    name: "Raheem Shaik",
    email: "raheemshaik@healthonus.com",
    mobile: 9292929292,
    landline: 4046144130,
    website: "http://www.healthonus.com",
    address: "Dwaraka icons, 2nd floor, kavuri hills, madhapur",
  },
  {
    id: 3,
    name: "Venkat Kamireddy",
    email: "venkatkamireddy@healthonus.com",
    mobile: 8971577966,
    landline: 4046144130,
    website: "http://www.healthonus.com",
    address: "Dwaraka icons, 2nd floor, kavuri hills, madhapur",
  },
  {
    id: 4,
    name: "Jeevan Kumar Karimindla",
    email: "jeevankumar@healthonus.com",
    mobile: 7729003222,
    landline: 4046144130,
    website: "http://www.healthonus.com",
    address: "Dwaraka icons, 2nd floor, kavuri hills, madhapur",
  },
];

 localStorageName = "Employees";

   getAllEmployees(): Employee[] {
    const emps = localStorage.getItem(this.localStorageName);
    if (emps) {
      this.employees = JSON.parse(emps);
    } else {
      localStorage.setItem(this.localStorageName, JSON.stringify(this.employees));
    }
    return this.employees;
  }

    addEmployee(employee: Employee) {
    employee.id = Math.floor(Math.random() * 10000);
    this.employees.push(employee);
    localStorage.setItem(this.localStorageName, JSON.stringify(this.employees));
    return employee;
  }

  deleteEmployee(id: number): boolean {
    this.employees = this.employees.filter((employee) => employee.id !== id);
    localStorage.setItem(this.localStorageName, JSON.stringify(this.employees));
    return true;
  }

getEmployee(id: number) {

let data = this.employees.find((employee) => employee.id === id);

    console.log('find Data:', data);

    return data;

}

  updateEmployee(updatedEmployee: Employee): boolean {
    this.employees = this.employees.map((employee) =>employee.id === updatedEmployee.id ? updatedEmployee : employee);
    localStorage.setItem(this.localStorageName, JSON.stringify(this.employees));
    return true;
}

}
 
