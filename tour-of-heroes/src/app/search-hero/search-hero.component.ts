import { Component } from '@angular/core';
import { Hero } from '../hero';
import { Observable, Subject, debounce, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-search-hero',
  templateUrl: './search-hero.component.html',
  styleUrl: './search-hero.component.css'
})
export class SearchHeroComponent {

    heroes$! : Observable<Hero[]>;
    private searchTerm = new Subject<string>();
    
   constructor(private heroService : HeroService){}

    ngOnInit()
    {
      this.heroes$ = this.searchTerm.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => this.heroService.searchHero(term))

      )
    }

    search(term : string)
    {
      this.searchTerm.next(term)
    }
}
