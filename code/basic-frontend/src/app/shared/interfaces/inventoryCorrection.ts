
export interface InventoryCorrectionDetails {
  ICDate: Date;
  GINDate: Date;
  itemSubCategory: string;
  _id: string;
  company: string
  GINNumber: string;
  // MRNNumber: Number;
  MRN: MRN;
  ICStatus: string;
  ginLineNumber: number;
  UOM: string;
  item: Item;
  // itemCode: string;
  itemType: string;
  openIRQty: number;
  updatedQty: number;
  closedIRQty: number;
  standardRate: number;
  purchaseRate: number;
  purchaseRateUSD: number;
  purchaseRatINR: number;
  lineValueINR: number;
  releasedQty: number;
  rejectedQty: number;
  batchDate: Date;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
}
interface MRN {
  _id: string;
  MRNNumber: string;
}
interface GINNumber {
  GINDate: Date;
  supplierInvoiceDate: Date;
  _id: string;
  company: string;
  createdBy: string;
  updatedBy: string;
  MRNNumber: string;
  purchaseCategory: string;
  supplier: string;
  supplierInvoice: string;
  currency: string;
  FXRateINR: string;
  GINStatus: string;
}
interface Item {
  itemSubCategory: string;
  _id: string;
  itemType: string;
  itemCode: string;
  itemName: string;
  itemDescription: string;
}
