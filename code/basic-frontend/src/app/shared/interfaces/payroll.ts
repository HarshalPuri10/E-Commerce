import { Status } from "./status.enum";

export interface Payroll {
    _id: string;
    payrollForMonthYear: string;
    employeeId: string;
    employeeCode: string;
    employeeName: string;
    paidDays: string;
    department: string;
    gross: number;
    PF: number;
    ESIC: number;
    TDS: number;
    PT: number;
    advSalary: number;
    netPayable: number;
    status?: Status;
  }
