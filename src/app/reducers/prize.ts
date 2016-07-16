/* tslint:disable: no-switch-case-fall-through */
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import { Prize } from '../models';
import { PrizeActions } from '../actions';

export interface PrizeState {
  ids: string[];
  entities: { [id: string]: Prize };
  loading: boolean;
  loaded: boolean;
  selectedPrize: string | null;
};

const initialState: PrizeState = {
  ids: [],
  entities: {},
  loading: false,
  loaded: false,
  selectedPrize: null
};

export default function (state = initialState, action: Action): PrizeState {
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

export function getLoaded() {
  return (state$: Observable<PrizeState>) => state$
    .select(s => s.loaded);
}

export function getLoading() {
  return (state$: Observable<PrizeState>) => state$
    .select(s => s.loading);
}

export function getPrizeEntities() {
  return (state$: Observable<PrizeState>) => state$
    .select(s => s.entities);
}

export function getPrizes(prizeIds: string[]) {
  return (state$: Observable<PrizeState>) => state$
    .let(getPrizeEntities())
    .map(entities => prizeIds.map(id => entities[id]));
}

export function getPrizeIds() {
  return (state$: Observable<PrizeState>) => state$
    .select(s => s.ids);
}

export function getSelectedPrize() {
  return (state$: Observable<PrizeState>) => state$
    .select(s => s.selectedPrize);
}


