var employeeService = /** @class */ (function () {
    function employeeService() {
        this.employees = [
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
        this.localStorageName = "Employees";
    }
    employeeService.prototype.getAllEmployees = function () {
        var emps = localStorage.getItem(this.localStorageName);
        if (emps) {
            this.employees = JSON.parse(emps);
        }
        else {
            localStorage.setItem(this.localStorageName, JSON.stringify(this.employees));
        }
        return this.employees;
    };
    employeeService.prototype.addEmployee = function (employee) {
        employee.id = Math.floor(Math.random() * 10000);
        this.employees.push(employee);
        localStorage.setItem(this.localStorageName, JSON.stringify(this.employees));
        return employee;
    };
    employeeService.prototype.deleteEmployee = function (id) {
        this.employees = this.employees.filter(function (employee) { return employee.id !== id; });
        localStorage.setItem(this.localStorageName, JSON.stringify(this.employees));
        return true;
    };
    employeeService.prototype.getEmployee = function (id) {
        var data = this.employees.find(function (employee) { return employee.id === id; });
        console.log('find Data:', data);
        return data;
    };
    employeeService.prototype.updateEmployee = function (updatedEmployee) {
        this.employees = this.employees.map(function (employee) { return employee.id === updatedEmployee.id ? updatedEmployee : employee; });
        localStorage.setItem(this.localStorageName, JSON.stringify(this.employees));
        return true;
    };
    return employeeService;
}());
//   updateEmployee(updatedEmployee: Employee): boolean {
//     const updatedEmployees = this.employees.map((employee) => {
//       if (employee.id === updatedEmployee.id) {
//         return updatedEmployee;
//       }
//       return employee;
//     });
//     this.employees = updatedEmployees;
//     localStorage.setItem(this.localStorageName, JSON.stringify(this.employees));
//     return true;
// }
