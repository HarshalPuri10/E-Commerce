export interface GRNDetails {
  GRNLineNumber: string;
  POLineNumber: string;
  item: string;
  itemCode: string;
  itemName: string;
  itemDescription: string;
  UOM: string;
  conversionOfUnits: string;
  GRNQty?: number;
  standardRate: number;
  purchaseRate: number;
  invoicedQty: number;
  balancedQty: number;
  rejectedQty: number;
  canceledQty: number;
  canceledReason: string;
  lineRemarks: string;
  batchDate: string;
}
