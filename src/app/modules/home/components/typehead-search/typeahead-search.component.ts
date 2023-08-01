import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Subject, Subscription, catchError, debounceTime, distinctUntilChanged, of, switchMap } from "rxjs";
import { ApiService } from "../../services/api.service";

@Component({
    selector: 'app-typeahead-search',
    templateUrl: './typeahead-search.component.html',
    styleUrls: ['./typeahead-search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class TypeaheadSearchComponent implements OnInit {
    @Input() suggestions:string[] | null = [];
    @Output() searchResults = new EventEmitter< {total:string, result:any[]}>();
    @Output() searchQuery = new EventEmitter<string>();
    searchTerm = '';
    filteredSuggestions:string[] | null = [];
    private searchSubject = new Subject<string>();
    private searchSubscription = new Subscription();
    
    constructor(private readonly apiService: ApiService) {}

    ngOnInit(){
      this.subscribeToSeachInput();
    }


    search(event: any): void {
      this.searchSubject.next(this.searchTerm);
    }

    select(value: string){
      this.searchSubject.next(value);
    }

    filterSuggestions(event: any){
      if(this.suggestions && this.suggestions.length > 0){
        this.filteredSuggestions = this.suggestions!.filter(suggestion => suggestion.toLowerCase().startsWith(event.query));
      }
    }
  
    subscribeToSeachInput() {
      this.searchSubscription.add(this.searchSubject.pipe(
        debounceTime(1500),
        distinctUntilChanged(),
        switchMap((query: string) => this.apiService.searchData(query).pipe(
              catchError((error) => {
              console.error('Error in API call:', error);
              return of({ total: 0, result: [] });
            })
        ))
      ).subscribe((res: any) => {
        if(res.total > 0 && !this.suggestions?.includes(this.searchTerm)){
          this.searchQuery.emit(this.searchTerm)
        }
        this.searchResults.emit(res);
      }));
    }

    ngOnDestroy(){
      this.searchSubscription.unsubscribe();
    }
  }