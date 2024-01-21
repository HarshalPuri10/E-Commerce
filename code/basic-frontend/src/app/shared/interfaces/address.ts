export interface Address {
    _id: string;
    line1: string;
    line2: string;
    line3: string;
    line4?: string;
    state: string;
    city: string;
    district?: string;
    pinCode: string;
    country: string;
  }