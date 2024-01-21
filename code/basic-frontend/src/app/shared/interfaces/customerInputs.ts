export interface NPDReview {
  _id: string;
  status: string;
  reviewNo: string;
  reviewDate: string;
  reviewBy: string;
  reviewOutput: string;
  technicalReview: technicalReview[];
}

interface technicalReview {
  orderNo: string;
  technicalQuestionnaire: string;
  questionnaire: string;
  isChecked: string;
  remarks: string;
}
