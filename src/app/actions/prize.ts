/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Action } from '@ngrx/store';

import { Prize } from '../models/prize';

@Injectable()

export class PrizeActions {
  static GET_PRIZES = '[Prize] Get Prizes';
  getPrizes(): Action {
    return {
      type: PrizeActions.GET_PRIZES
    };
  }

  static GET_PRIZES_FAIL = '[Prize] Get Prizes Fail';
  getPrizesFail(res: Response): Action {
    return {
      type: PrizeActions.GET_PRIZES_FAIL
    };
  }

  static GET_PRIZES_SUCCESS = '[Prize] Get Prizes Success';
  getPrizesSuccess(prizes: Prize): Action {
    return {
      type: PrizeActions.GET_PRIZES_SUCCESS,
      payload: prizes
    };
  }

  static SELECT_PRIZE = '[Prize] Select Prize';
  selectPrize(prize: Prize): Action {
    return {
      type: PrizeActions.SELECT_PRIZE,
      payload: prize
    };
  }
}
