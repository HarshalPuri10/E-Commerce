export interface SPDetails {
  SPLineNumber: number;
  DRNLineNumber: number;
  SOId: string;
  SONumber: string;
  SODate: string;
  SKU:string;
  SKUNo: string;
  SKUName: string;
  SKUDescription: string;
  UOM: string;
  FGINMfgDate: string;
  FGINQty: number;
  standardRate: number;
  purchaseRate: number;
  discount: number;
  netRate: number;
  dispatchQty: number;
  currency: string;
  lineValue:number;
  SPVLine: number;
  invoicedQty: number;
  canceledQty: number;
  canceledReason: string;
}

