/* tslint:disable: no-switch-case-fall-through */
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';

import { AppState } from '../reducers';
import { PrizeActions } from '../actions/prize';
import { Prize } from '../models/prize';

import { compareOrder } from '../helper/compare-order';

export interface PrizeState {
  ids: string[];
  entities: { [id: string]: Prize };
  loading: boolean;
  loaded: boolean;
  selectedPrize: string | null;
}

export const initialState: PrizeState = {
  ids: [],
  entities: {},
  loading: false,
  loaded: false,
  selectedPrize: null
};

export function prizeReducer (state = initialState, action: Action): PrizeState {
  switch (action.type) {

    case PrizeActions.GET_PRIZES:
      return Object.assign({}, state, { loading: true });

    case PrizeActions.GET_PRIZES_FAIL: {
      return Object.assign({}, state, { loading: false });
    }

    case PrizeActions.GET_PRIZES_SUCCESS: {
      const prizes: Prize[] = action.payload.prizes;
      if (!prizes) return Object.assign({}, state, { loading: false });
      const newPrizes: Prize[] = prizes.filter(prize => !state.entities[prize.id!]);
      const newPrizeIds: string[] = newPrizes.map(prize => prize.id!);
      const newPrizeEntities = newPrizes.reduce(
        (entities: { [id: string]: Prize }, prize: Prize) => {
          if (prize.id)
          return Object.assign(entities, {
            [prize.id]: prize
          });
        }, {});

      return {
        ids: [...state.ids, ...newPrizeIds],
        entities: Object.assign({}, state.entities, newPrizeEntities),
        loading: false,
        loaded: true,
        selectedPrize: state.selectedPrize
      };

    }

    case PrizeActions.SELECT_PRIZE:
      return Object.assign({}, state, { selectedPrize: action.payload });

    default: {
      return state;
    }
  }
}

function _getLoaded() {
  return (state$: Observable<PrizeState>) => state$
    .select(s => s.loaded);
}

function _getLoading() {
  return (state$: Observable<PrizeState>) => state$
    .select(s => s.loading);
}

function _getPrize(id: string) {
  return (state$: Observable<PrizeState>) => state$
    .select(s => s.entities[id]);
}

function _getPrizeEntities() {
  return (state$: Observable<PrizeState>) => state$
    .select(s => s.entities);
}

function _getPrizes(prizeIds: string[]) {
  return (state$: Observable<PrizeState>) => state$
    .let(_getPrizeEntities())
    .map(entities => prizeIds.map(id => entities[id]));
}

function _getPrizeIds() {
  return (state$: Observable<PrizeState>) => state$
    .select(s => s.ids);
}

function _getSelectedPrize() {
  return (state$: Observable<PrizeState>) => state$
    .select(s => s.selectedPrize);
}

function _getPrizeState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.prize);
}

export function getPrize(id: string) {
  return compose(_getPrize(id), _getPrizeState());
}

export function getPrizes(prizeIds: string[]) {
  return compose(_getPrizes(prizeIds), _getPrizeState());
}

export function getPrizeIds() {
  return compose(_getPrizeIds(), _getPrizeState());
}

export function getPrizeEntities() {
  return compose(_getPrizeEntities(), _getPrizeState());
}

export function getPrizeLoaded() {
  return compose(_getLoaded(), _getPrizeState());
}

export function getPrizeLoading() {
  return compose(_getLoading(), _getPrizeState());
}

export function getPrizeSelected() {
  return compose(_getSelectedPrize(), _getPrizeState());
}

export function getPrizeCollection() {
  return (state$: Observable<AppState>) => state$
    .let(getPrizeIds())
    .switchMap(prizeId => state$.let(getPrizes(prizeId)))
    .map(arr => arr.sort(compareOrder));
}
