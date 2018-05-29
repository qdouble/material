/* tslint:disable: no-switch-case-fall-through */
import { createEntityAdapter, EntityState } from '@ngrx/entity';

import { TicketActions, TicketActionTypes } from '../features/support/ticket.actions';
import { Ticket } from '../features/support/ticket.model';

export const adapter = createEntityAdapter<Ticket>({
  selectId: (ticket: Ticket) => ticket.id
});

export interface State extends EntityState<Ticket> {
  ids: string[];
  added: boolean;
  adding: boolean;
  addedMessage: boolean;
  addingMessage: boolean;
  loading: boolean;
  loaded: boolean;
  selectedTicket: string | null;
  sortBy: { sortBy: string; reverse: boolean };
}

export const initialState: State = adapter.getInitialState({
  ids: [],
  added: false,
  adding: false,
  addedMessage: false,
  addingMessage: false,
  loading: false,
  loaded: false,
  selectedTicket: null,
  sortBy: { sortBy: 'createdAt', reverse: true }
});

export function ticketReducer(state = initialState, action: TicketActions): State {
  switch (action.type) {
    case TicketActionTypes.AddMessage:
      return { ...state, addingMessage: true, addedMessage: false };
    case TicketActionTypes.AddMessageFail:
      return { ...state, addingMessage: false, addedMessage: false };

    case TicketActionTypes.AddMessageSuccess: {
      const ticketMessage = action.payload.ticketMessage;
      const entries = action.payload.entries;
      const lastEntry = action.payload.lastEntry;
      const lastEntryBy = action.payload.lastEntryBy;
      if (!ticketMessage || !entries || !lastEntry || !lastEntryBy) {
        return { ...state, addingMessage: false, addedMessage: false };
      }

      return {
        ...adapter.updateOne(
          {
            id: ticketMessage.ticketId,
            changes: {
              messages: [...state.entities[ticketMessage.ticketId].messages, ticketMessage],
              entries: entries,
              lastEntry: lastEntry,
              lastEntryBy: lastEntryBy,
              updatedAt: lastEntry
            }
          },
          state
        ),
        loading: false,
        addedMessage: true,
        addingMessage: false
      };
    }

    case TicketActionTypes.AddTicket:
      return { ...state, adding: true, added: false };
    case TicketActionTypes.AddTicketFail:
      return { ...state, adding: true, added: false };

    case TicketActionTypes.AddTicketSuccess: {
      if (!action.payload.ticket || !action.payload.id)
        return { ...state, adding: true, added: false };
      const id = action.payload.id;
      const ticket = { ...action.payload.ticket, id: id };
      ticket.id = id;
      return {
        ...state,
        ids: [...state.ids, id],
        entities: { ...state.entities, [ticket.id]: ticket },
        added: true,
        adding: false
      };
    }

    case TicketActionTypes.CloseTicket:
      return { ...state, loading: true };
    case TicketActionTypes.CloseTicketFail:
      return { ...state, loading: false };

    case TicketActionTypes.CloseTicketSuccess: {
      const ticketId = action.payload.id;
      const ticketClosed = action.payload.closed;
      if (!ticketId) return { ...state, loading: false };

      const ticketsMod = { ...state.entities };
      ticketsMod[ticketId] = {
        ...ticketsMod[ticketId],
        closed: ticketClosed
      };

      return {
        ...state,
        entities: ticketsMod,
        loading: false
      };
    }

    case TicketActionTypes.GetTicket: {
      return {
        ...state,
        selectedTicket: action.payload,
        loading: true,
        loaded: false
      };
    }

    case TicketActionTypes.GetTicketFail:
      return { ...state, loading: false };

    case TicketActionTypes.GetTicketSuccess: {
      const ticket = action.payload.ticket;
      if (!ticket || !ticket.id) return { ...state, loading: false };

      return {
        ...adapter.upsertOne(
          {
            id: ticket.id,
            changes: ticket
          },
          state
        ),
        loading: false,
        loaded: true
      };
    }

    case TicketActionTypes.GetTickets:
      return { ...state, loading: true };
    case TicketActionTypes.GetTicketsFail:
      return { ...state, loading: false };

    case TicketActionTypes.GetTicketsSuccess: {
      const tickets = action.payload.tickets;
      if (!Array.isArray(tickets)) return { ...state, loading: false };

      return {
        ...adapter.addAll(tickets, state),
        loading: false,
        loaded: true
      };
    }

    case TicketActionTypes.MarkTicketAsRead:
      return { ...state, loading: true };
    case TicketActionTypes.MarkTicketAsReadFail:
      return { ...state, loading: false };

    case TicketActionTypes.MarkTicketAsReadSuccess: {
      const ticketId = action.payload.id;
      const mark = action.payload.mark;
      if (!ticketId) return { ...state, loading: false };

      return {
        ...adapter.updateOne(
          {
            id: ticketId,
            changes: { readByUser: mark }
          },
          state
        ),
        loading: false
      };
    }

    case TicketActionTypes.SortBy:
      const sortBy = action.payload;
      return { ...state, sortBy: sortBy };

    case TicketActionTypes.UpdateTicket: {
      const ticket: Ticket = action.payload.ticket;
      if (!ticket) return state;
      return {
        ...adapter.updateOne(
          {
            id: ticket.id,
            changes: ticket
          },
          state
        )
      };
    }

    default: {
      return state;
    }
  }
}

export const getAdded = (state: State) => state.added;

export const getAddedMessage = (state: State) => state.addedMessage;

export const getAdding = (state: State) => state.adding;

export const getAddingMessage = (state: State) => state.addingMessage;

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getSelectedTicket = (state: State) => state.selectedTicket;

export const getSortBy = (state: State) => state.sortBy;
