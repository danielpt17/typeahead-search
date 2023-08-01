import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewChild } from "@angular/core";
import { VirtualScroller } from "primeng/virtualscroller";

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultsComponent {
    BATCH_SIZE = 25;
    @Input() results: string[] | null = [];
    virtualResults: string[] = [];
    @ViewChild('vs') vs!: VirtualScroller;

    constructor(private cdr: ChangeDetectorRef){}

    ngOnChanges() {
        this.virtualResults = this.results!.slice(0, this.BATCH_SIZE);
        this.vs.scrollToIndex(0, 'smooth');
    }

    loadResultsLazy(event: any) {
        setTimeout(() => {
            const startIndex = event.first; 
            const endIndex = startIndex + event.rows; 
            if (endIndex >= this.virtualResults.length) {
                const nextBatchStart = this.virtualResults.length;
                const nextBatchEnd = Math.min(nextBatchStart + this.BATCH_SIZE, this.results!.length);

                const nextBatchData = this.results!.slice(nextBatchStart, nextBatchEnd);

                this.virtualResults = [...this.virtualResults, ...nextBatchData];
            }
            event.forceUpdate!();
            this.cdr.markForCheck();
        }, 1000);
    }


}