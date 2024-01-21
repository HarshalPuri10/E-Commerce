export interface SODetails {
  SOLineNumber: string;
  SKU: string;
  SKUNo: string;
  SKUName: string;
  SKUDescription: string;
  UOM: string;
  SOLineTargetDate: string;
  lineValue: number;
  standardRate: number;
  discount: number;
  netRate: number;
  orderedQty: number;
  invoicedQty: number;
  balancedQty: number;
  canceledQty: number;
  canceledReason: any;
  PONo: any;
  PODate: any;
  monthlyOffTake: any;
  POValidDate: any;
  dispatchCount: any;
  dispatchSchedule: any;
}
