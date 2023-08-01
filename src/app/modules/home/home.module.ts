import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { FormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TypeaheadSearchComponent } from './components/typehead-search/typeahead-search.component';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { searchReducer } from 'src/app/store/reducers/typeahead-search.reducers';
import { ResultsComponent } from './components/results/results.component';
import { VirtualScrollerModule } from 'primeng/virtualscroller';


@NgModule({
  declarations: [
    HomeComponent,
    ResultsComponent,
    TypeaheadSearchComponent
  ],
  providers: [ApiService],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    HttpClientModule,
    AutoCompleteModule,
    VirtualScrollerModule,
    StoreModule.forFeature('search', searchReducer)
  ],
  exports: []
})
export class HomeModule {
}
