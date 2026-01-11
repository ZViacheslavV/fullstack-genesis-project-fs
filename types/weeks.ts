// ---------- BABY ----------
export interface BabyState {
  analogy: string | null;
  babySize: number;
  babyWeight: number;
  image: string;
  babyActivity: string;
  babyDevelopment: string;
  interestingFact: string;
}

// ---------- MOM ----------
export interface MomFeelings {
  sensationDescr: string;
  states: string[];
}

export interface MomComfortTip {
  tip: string;
}

export interface MomState {
  comfortTips: MomComfortTip[];
  feelings: MomFeelings;
}

// ---------- WEEKS ----------
//   export interface WeeksResponse {
//     weekNumber: number;
//     daysLeftToBirth: number;
//     babyState: BabyState;
//     momState: MomState;
//   }
export interface WeeksData {
  weekNumber: number;
  daysLeftToBirth: number;
  babyState: BabyState;
  momState: MomState;
}

export interface WeeksApiResponse {
  status: number;
  message: string;
  data: WeeksData;
}
