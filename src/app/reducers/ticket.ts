/* tslint:disable: no-switch-case-fall-through */
/* tslint:disable: variable-names */
import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { Action } from '@ngrx/store';

import { AppState } from './';
import { TicketActions } from '../actions';
import { Ticket } from '../models';

export interface TicketState {
  ids: string[];
  entities: { [id: string]: Ticket };
  loading: boolean;
  loaded: boolean;
};

const initialState: TicketState = {
  ids: [],
  entities: {},
  loading: false,
  loaded: false
};

export function ticketReducer (state = initialState, action: Action): TicketState {
  switch (action.type) {

    case TicketActions.CLOSE_TICKET:
      return Object.assign({}, state, { loading: true });
    case TicketActions.CLOSE_TICKET_FAIL:
      return Object.assign({}, state, { loading: false });

    case TicketActions.CLOSE_TICKET_SUCCESS: {
      const ticketId: string = action.payload.id;
      if (!ticketId) return Object.assign({}, state, { loading: false });

      const entitiesMod = state.entities;
      delete entitiesMod[ticketId];

      return Object.assign({}, state, {
        ids: state.ids.filter(id => id !== ticketId),
        entities: entitiesMod,
        loading: false
      });
    }

    case TicketActions.GET_TICKET:
      return Object.assign({}, state, {
        loading: true,
        loaded: false
      });

    case TicketActions.GET_TICKET_FAIL:
      return Object.assign({}, state, { loading: false });

    case TicketActions.GET_TICKET_SUCCESS: {
      const ticket: Ticket = action.payload.ticket;
      if (!ticket || !ticket.id)
        return Object.assign({}, state, { loading: false });

      if (state.ids.includes(ticket.id)) {
        return Object.assign({}, state, {
          entities: Object.assign({}, state.entities, {
            [ticket.id]: ticket
          }),
          loading: false,
          loaded: true
        });
      }

      return {
        ids: [...state.ids, ticket.id],
        entities: Object.assign({}, state.entities, {
          [ticket.id]: ticket
        }),
        loading: false,
        loaded: true
      };
    }

    case TicketActions.GET_TICKETS:
      return Object.assign({}, state, { loading: true });
    case TicketActions.GET_TICKETS_FAIL:
      return Object.assign({}, state, { loading: false });

    case TicketActions.GET_TICKETS_SUCCESS: {
      const tickets: Ticket[] = action.payload.tickets;
      if (!Array.isArray(tickets)) return Object.assign({}, state, { loading: false });
      const newTickets: Ticket[] = tickets.filter(ticket => !state.entities[ticket.id || '']);
      const newTicketIds: string[] = newTickets.map(ticket => ticket.id || '');
      const newTicketEntities = newTickets.reduce(
        (entities: { [id: string]: Ticket }, ticket: Ticket) => {
          if (ticket.id)
            return Object.assign(entities, {
              [ticket.id]: ticket
            });
        }, {});

      return {
        ids: [...state.ids, ...newTicketIds],
        entities: Object.assign({}, state.entities, newTicketEntities),
        loading: false,
        loaded: true
      };
    }

    case TicketActions.SUBMIT_TICKET:
      return Object.assign({}, state, { loading: true });
    case TicketActions.SUBMIT_TICKET_FAIL:
      return Object.assign({}, state, { loading: false });

    case TicketActions.SUBMIT_TICKET_SUCCESS: {
      if (!action.payload.ticket || !action.payload.id)
        return Object.assign({}, state, { loading: false });
      const id: string = action.payload.id;
      const ticket = Object.assign({}, action.payload.ticket, {
        id: id
      });
      ticket.id = id;
      return {
        ids: [...state.ids, id],
        entities: Object.assign({}, state.entities, {
          [ticket.id]: ticket
        }),
        loading: false,
        loaded: false
      };
    }

    default: {
      return state;
    }
  }
}

function _getTicketEntities() {
  return (state$: Observable<TicketState>) => state$
    .select(s => s.entities);
}

function _getTicket(id: string) {
  return (state$: Observable<TicketState>) => state$
    .select(s => s.entities[id]);
}

function _getTickets(ticketIds: string[]) {
  return (state$: Observable<TicketState>) => state$
    .let(_getTicketEntities())
    .map(entities => ticketIds.map(id => entities[id]));
}

function _getTicketIds() {
  return (state$: Observable<TicketState>) => state$
    .select(s => s.ids);
}

function _getTicketCollection() {
  return (state$: Observable<TicketState>) => state$
    .let(_getTicketIds())
    .switchMap((userId) => state$.let(_getTickets(userId))
    );
}

function _getTicketState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.ticket);
}

export function getTicket(ticketId: string) {
  return compose(_getTicket(ticketId), _getTicketState());
}

export function getTickets(ticketIds: string[]) {
  return compose(_getTickets(ticketIds), _getTicketState());
}

export function getTicketCollection() {
  return compose(_getTicketCollection(), _getTicketState());
}

