/* tslint:disable: no-switch-case-fall-through */
/* tslint:disable: variable-names */
import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { Action } from '@ngrx/store';

import { AppState } from './';
import { TicketActions } from '../features/support/ticket.actions';
import { Ticket, TicketMessage } from '../features/support/ticket.model';

export interface TicketState {
  ids: string[];
  entities: { [id: string]: Ticket };
  added: boolean;
  adding: boolean;
  addedMessage: boolean;
  addingMessage: boolean;
  loading: boolean;
  loaded: boolean;
  loadingTicket: boolean;
  sortBy: { sortBy: string, reverse: boolean };
};

export const initialState: TicketState = {
  ids: [],
  entities: {},
  added: false,
  adding: false,
  addedMessage: false,
  addingMessage: false,
  loading: false,
  loaded: false,
  loadingTicket: false,
  sortBy: { sortBy: 'createdAt', reverse: true }
};

export function ticketReducer(state = initialState, action: Action): TicketState {
  switch (action.type) {

    case TicketActions.ADD_TICKET:
      return Object.assign({}, state, { adding: true, added: false });
    case TicketActions.ADD_TICKET_FAIL:
      return Object.assign({}, state, { adding: true, added: false });

    case TicketActions.ADD_TICKET_SUCCESS: {
      if (!action.payload.ticket || !action.payload.id)
        return Object.assign({}, state, { adding: true, added: false });
      const id: string = action.payload.id;
      const ticket = Object.assign({}, action.payload.ticket, {
        id: id
      });
      ticket.id = id;
      return Object.assign({}, state, {
        ids: [...state.ids, id],
        entities: Object.assign({}, state.entities, {
          [ticket.id]: ticket
        }),
        added: true,
        adding: false
      });
    }

    case TicketActions.ADD_MESSAGE:
      return Object.assign({}, state, { addingMessage: true, addedMessage: false });
    case TicketActions.ADD_MESSAGE_FAIL:
      return Object.assign({}, state, { addingMessage: false, addedMessage: false });

    case TicketActions.ADD_MESSAGE_SUCCESS: {
      const ticketMessage: TicketMessage = action.payload.ticketMessage;
      const entries: number = action.payload.entries;
      const lastEntry: Date = action.payload.lastEntry;
      const lastEntryBy: string = action.payload.lastEntryBy;
      if (!ticketMessage || !entries || !lastEntry || !lastEntryBy) {
        return Object.assign({}, state, { addingMessage: false, addedMessage: false });
      }
      const ticketsMod = Object.assign({}, state.entities);
      ticketsMod[ticketMessage.ticketId] = Object.assign({}, ticketsMod[ticketMessage.ticketId],
        {
          addedMessage: true,
          addingMessage: false,
          messages: [...ticketsMod[ticketMessage.ticketId].messages, ticketMessage],
          entries: entries,
          lastEntry: lastEntry,
          lastEntryBy: lastEntryBy,
          updatedAt: lastEntry
        }
      );


      return Object.assign({}, state, {
        entities: ticketsMod,
        loadingTicket: false,
        addedMessage: true,
        addingMessage: false
      });
    }


    case TicketActions.CLOSE_TICKET:
      return Object.assign({}, state, { loading: true });
    case TicketActions.CLOSE_TICKET_FAIL:
      return Object.assign({}, state, { loading: false });

    case TicketActions.CLOSE_TICKET_SUCCESS: {
      const ticketId: string = action.payload.id;
      const ticketClosed: string = action.payload.closed;
      if (!ticketId) return Object.assign({}, state, { loading: false });

      const ticketsMod = Object.assign({}, state.entities);
      ticketsMod[ticketId] = Object.assign({}, ticketsMod[ticketId],
        { closed: JSON.parse(ticketClosed) });

      return Object.assign({}, state, {
        entities: ticketsMod,
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

      return Object.assign({}, state, {
        ids: [...state.ids, ticket.id],
        entities: Object.assign({}, state.entities, {
          [ticket.id]: ticket
        }),
        loading: false,
        loaded: true
      });
    }

    case TicketActions.GET_TICKETS:
      return Object.assign({}, state, { loading: true });
    case TicketActions.GET_TICKETS_FAIL:
      return Object.assign({}, state, { loading: false });

    case TicketActions.GET_TICKETS_SUCCESS: {
      const tickets: Ticket[] = action.payload.tickets;
      if (!Array.isArray(tickets)) return Object.assign({}, state, { loading: false });
      const newTicketIds: string[] = tickets.map(ticket => ticket.id || '');
      const newTicketEntities = tickets.reduce(
        (entities: { [id: string]: Ticket }, ticket: Ticket) => {
          if (ticket.id)
            return Object.assign(entities, {
              [ticket.id]: ticket
            });
        }, {});

      return Object.assign({}, state, {
        ids: newTicketIds,
        entities: Object.assign({}, state.entities, newTicketEntities),
        loading: false,
        loaded: true
      });
    }

    case TicketActions.MARK_TICKET_AS_READ:
      return Object.assign({}, state, { loadingTicket: true });
    case TicketActions.MARK_TICKET_AS_READ_FAIL:
      return Object.assign({}, state, { loadingTicket: false });

    case TicketActions.MARK_TICKET_AS_READ_SUCCESS: {
      const ticketId: string = action.payload.id;
      const mark: string = action.payload.mark;
      if (!ticketId) return Object.assign({}, state, { loadingTicket: false });

      const ticketsMod = Object.assign({}, state.entities);
      ticketsMod[ticketId] = Object.assign({}, ticketsMod[ticketId],
        { readByUser: JSON.parse(mark) });

      return Object.assign({}, state, {
        entities: ticketsMod,
        loadingTicket: false
      });
    }

    case TicketActions.SORT_BY:
      const sortBy: [string, boolean] = action.payload;
      return Object.assign({}, state, {
        sortBy: sortBy
      });

    default: {
      return state;
    }
  }
}

function _getAddedMessage() {
  return (state$: Observable<TicketState>) => state$
    .select(s => s.addedMessage);
}

function _getAddingMessage() {
  return (state$: Observable<TicketState>) => state$
    .select(s => s.addingMessage);
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

export function getTicketAddedMessage() {
  return compose(_getAddedMessage(), _getTicketState());
}

export function getTicketAddingMessage() {
  return compose(_getAddingMessage(), _getTicketState());
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

