/* tslint:disable: no-switch-case-fall-through */
import { createEntityAdapter, EntityState } from '@ngrx/entity';

import { PrizeActionTypes, PrizeActions } from '../actions/prize';
import { Prize } from '../models/prize';

import { compareOrder } from '../helper/compare-order';

export const adapter = createEntityAdapter<Prize>({
  selectId: (prize: Prize) => prize.id,
  sortComparer: compareOrder
});

export interface State extends EntityState<Prize> {
  ids: string[];
  loading: boolean;
  loaded: boolean;
  selectedPrize: string | null;
}

export const initialState: State = adapter.getInitialState({
  ids: [],
  loading: false,
  loaded: false,
  selectedPrize: null
});

export function prizeReducer(state = initialState, action: PrizeActions): State {
  switch (action.type) {

    case PrizeActionTypes.GetPrizes:
      return { ...state, loading: true };

    case PrizeActionTypes.GetPrizesFail: {
      return { ...state, loading: false };
    }

    case PrizeActionTypes.GetPrizesSuccess: {
      const prizes = action.payload.prizes;
      if (!prizes) return { ...state, loading: false };
      const newPrizes = prizes.filter(prize => !state.entities[prize.id!]);
      const newPrizeIds = newPrizes.map(prize => prize.id!);
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

    case PrizeActionTypes.SelectPrize:
      return { ...state, selectedPrize: action.payload };

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getSelectedPrize = (state: State) => state.selectedPrize;
