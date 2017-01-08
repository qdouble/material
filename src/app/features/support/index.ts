import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';
// import { EffectsModule } from '@ngrx/effects';

import { FooterModule } from '../footer';
import { SelectInputModule } from '../../components/input-fields/select-input';
import { TextareaInputModule } from '../../components/input-fields/textarea-input';

// import { CreditRequestActions } from './credit-request.actions';
// import { CreditRequestEffects } from './credit-request.effects';
// import { CreditRequestService } from './credit-request.service';
// import { TicketActions } from './ticket.actions';
// import { TicketEffects } from './ticket.effects';
// import { TicketService } from './ticket.service';

import { CreditRequestComponent } from './credit-request';
import { CreditRequestTable } from './common/credit-request-table';
import { SupportTicket } from './common/support-ticket';
import { SupportTicketFormComponent } from './common/support-ticket-form';
import { SupportTicketMessageComponent } from './common/support-ticket-message';
import { SupportTicketTable } from './common/support-ticket-table';
import { Support } from './support';
import { ViewTicket } from './view-ticket';

import { routes } from './support.routing';

@NgModule({
  imports: [
    CommonModule,
    FooterModule,
    ReactiveFormsModule,
    // EffectsModule.run(CreditRequestEffects),
    // EffectsModule.run(TicketEffects),
    MaterialModule,
    RouterModule.forChild(routes),
    SelectInputModule,
    TextareaInputModule
  ],
  declarations: [
    CreditRequestComponent,
    CreditRequestTable,
    Support,
    SupportTicket,
    SupportTicketFormComponent,
    SupportTicketMessageComponent,
    SupportTicketTable,
    ViewTicket
  ],
  providers: [
    // CreditRequestActions,
    // CreditRequestService,
    // TicketActions,
    // TicketService
  ]
})

export class SupportModule { }
