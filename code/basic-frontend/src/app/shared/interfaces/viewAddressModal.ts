export interface ViewAddressModal {
  title?: string;
  addressA?: IAddress;
  addressB?: IAddress;
}

export interface IAddress {
  label?: string;
  address?: AddressElement[];
}

export interface AddressElement {
  line1?: string;
  line2?: string;
  line3?: string;
  state?: string;
  city?: string;
  district?: string;
  pinCode?: string;
  country?: string;
  _id?: null;
}
