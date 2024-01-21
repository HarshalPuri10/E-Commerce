export interface subModuleManagement {
  _id: string;
  order: number;
  isDisplay: boolean;
  title: string;
  displayName: string;
  disabled: boolean;
  url: string;
  roles: string[];
  items: any[];
}
