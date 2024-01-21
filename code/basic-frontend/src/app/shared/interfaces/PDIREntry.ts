export interface PDIREntry {
  SKU: string;
  partNumber: string;
  SKUName: string;
  productDescription: string;
  batchDate: Date;
  invoicedQty: number;
  disposition: string;
  approvedBy: string;
  PDIRTemplateId: string;
  reportTemplate: string;
  PDIRTDetails: PDIRTDetail[];
}

interface PDIRTDetail {
  inspectionParameter: string;
  inspectionMethod: string;
  inspectionStandard: string;
  inspectionObservations: string;
customerFeedback: string;
}

