import { Action } from '@ngrx/store';

import { GetPrizesResponse } from '../models/prize';

export enum PrizeActionTypes {
  GetPrizes = '[Prize] Get Prizes',
  GetPrizesFail = '[Prize] Get Prizes Fail',
  GetPrizesSuccess = '[Prize] Get Prizes Success',
  SelectPrize = '[Prize] Select Prize',
}

export class GetPrizes implements Action {
  readonly type = PrizeActionTypes.GetPrizes;
}

export class GetPrizesFail implements Action {
  readonly type = PrizeActionTypes.GetPrizesFail;

  constructor(public payload: Error) { }
}

export class GetPrizesSuccess implements Action {
  readonly type = PrizeActionTypes.GetPrizesSuccess;

  constructor(public payload: GetPrizesResponse) { }
}

export class SelectPrize implements Action {
  readonly type = PrizeActionTypes.SelectPrize;

  constructor(public payload: string) { }
}

export type PrizeActions =
  | GetPrizes
  | GetPrizesFail
  | GetPrizesSuccess
  | SelectPrize;
