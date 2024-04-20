import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchValueSubject$ = new BehaviorSubject<string>('');
  public searchValue$: Observable<string> =
    this.searchValueSubject$.asObservable();

  public setSearchValue(search: string) {
    this.searchValueSubject$.next(search);
  }
}
