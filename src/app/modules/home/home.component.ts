import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addSuggestion, setResults } from 'src/app/store/actions/typeahead-search.actions';
import { SearchState } from 'src/app/store/reducers/typeahead-search.reducers';
import { selectResults, selectSuggestions } from 'src/app/store/selectors/typeahead-search.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  results$ = this.store.select(selectResults);
  suggestions$ = this.store.select(selectSuggestions);
  constructor(private store: Store<SearchState>){}


  onSearchResults(response: {total:string, result:any[]}){
    const results = response.result.map((res)=>res.value);
    this.store.dispatch(setResults({results}));
    
  }
   onSearchQuery(query: string){
    this.store.dispatch(addSuggestion({suggestion:query}));
  }

}
