export interface DRNDetails {
  FGINOptions: FGINOption[];
  DRNLineNumber: number;
  SOId: string;
  SONumber: string;
  currency: string;
  SODate: string;
  SKU: string;
  UOM: string;
  standardRate: string;
  netRate: string;
  SKUNo: string;
  SKUName: string;
  SKUDescription: string;
  FGINId: string;
  FGINMfgDate: string;
  FGINQty: number;
  dispatchQty: number;
  SOBalancedQty: number;
  invoicedQty: number;
  canceledQty: number;
  canceledReason: string;
  FGStockDetails: string;
  tBatchNo: string;
  totalDispatchQty: string;
}

export interface FGINOption {
  _id: string;
  FGINNo: string;
  manufacturingDate: string;
  FGINQuantity: string;
}
