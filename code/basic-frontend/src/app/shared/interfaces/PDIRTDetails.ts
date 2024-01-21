export interface PDIRTDetails {
  _id: string;
  inspectionParameter: string;
  inspectionParameterName: string;
  inspectionMethod: string;
  inspectionMethodName: string;
  standardRequirement: string;
}


  export interface InspectionParameter {
      _id: string;
      company: string;
      createdBy: string;
      updatedBy: string;
      IPCode: string;
      IPName: string;
      isActive: boolean;
  
  }

  export interface InspectionMethod {
      _id: string;
      company: string;
      createdBy: string;
      updatedBy: string;
      IMCode: string;
      IMName: string;
      isActive: boolean;
  
  }

  export interface PDIRTDetails2 {
      inspectionParameter: InspectionParameter;
      inspectionMethod: InspectionMethod;
      standardRequirement: string;
      _id: string;
  }



