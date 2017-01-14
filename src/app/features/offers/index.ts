import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { CustomPipesModule } from '../../pipes';
import { FooterModule } from '../footer';
import { PagesModule } from '../../components/pages';

import { OfferCard } from './offer-card';
import { OfferDetailsComponent, OfferDetailsCard } from './offer-details';
import { OfferRedirect } from './offer-redirect';
import { OfferRows } from './offer-rows';
import { Offers } from './offers';
import { routes } from './offers.routing';

@NgModule({
  imports: [
    CommonModule,
    CustomPipesModule,
    FooterModule,
    FormsModule,
    MaterialModule,
    PagesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    OfferCard,
    OfferDetailsCard,
    OfferDetailsComponent,
    OfferRedirect,
    OfferRows,
    Offers
  ]
})

export class OffersModule { }
