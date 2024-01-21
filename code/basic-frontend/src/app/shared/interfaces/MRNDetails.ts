export interface MRNDetails {
  MRNLineNumber: string;
  GRNLineNumber: string;
  item: string;
  itemCode: string;
  itemName: string;
  itemDescription: string;
  UOM: string;
  standardRate: number;
  purchaseRate: number;
  GRNQty: number;
  releasedQty: number;
  rejectedQty: number;
  lineRemarks: string;
  batchDate: string;
  batchNo: any;
  QCLevels: any;
  QCLevelsDetails: any;
}
