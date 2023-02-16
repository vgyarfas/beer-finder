export interface YesNoApiResponse {
  answer: YesNoApiAnswer;
  forced: boolean;
  image: string;
}

export enum YesNoApiAnswer {
  Yes = 'yes',
  No = 'no',
  Maybe = 'maybe',
}