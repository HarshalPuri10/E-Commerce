import { Status } from "./status.enum";

export interface Attendance {
    _id: string;
    employeeCode: string;
    employeeName: string;
    monthDays: string;
    weeklyOff: string;
    paidHolidays: string;
    paidLeaves: string;
    presentDays: string;
    LOPDiff: string;
    status?: Status;
  }