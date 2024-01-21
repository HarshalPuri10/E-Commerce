export interface SPODetails {
    _id?: string;
    SPOLineNumber: string;
    serviceMaster: string;
    serviceCode: string;
    serviceDescription: string;
    SPOQty: number;
    standardRate: number;
    purchaseRate: number;
    lineValue: number;
    linePPV: number;
    deliveryDate: string;
    gst: string;
    igst: string;
    cgst: string;
    sgst: string;
    lineRemarks: string;
    receivedQty: number;
    invoicedQty: number;
    balancedQty: number;
    previousGRNQty: number;
    canceledQty: number;
    canceledReason: string;
    markedForAlternateSupplier: string;
  }