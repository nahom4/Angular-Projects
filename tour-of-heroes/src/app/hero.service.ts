import { ErrorHandler, Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock_heros';
import { Observable,catchError,of, tap } from 'rxjs';
import { MessagesService } from './messages.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HerosDetailsComponent } from './heros-details/heros-details.component';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  heros = of(HEROES)
  private heroesUrl = 'api/heroes'; 
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private messageService : MessagesService,private http : HttpClient ) 
  {}
  getHeroes(): Observable<Hero[]> {
    this.log('HeroService: fetched heroes');
    return this.http.get<Hero[]>(this.heroesUrl).pipe(tap(_ => this.log("Fetched Heroes")),catchError(this.handleError("getHeroes",[])));
  }
  getHero(id : Number) : Observable<Hero>
  {
    var url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(tap(_ => this.log(`HeroService: fetched hero id=${id}`)),
    catchError(this.handleError("getHero",{} as Hero)));
  }
  

  log(message : string)
  {
    this.messageService.add(message);
  }
  
  handleError<T> (operation : string,result? : T)
  {
    return (error : any) : Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }  
  }

  updateHero(hero : Hero) : Observable<Hero>
  {
    return this.http.put<Hero>(this.heroesUrl,hero,this.httpOptions).pipe(tap(_ => this.log(`updated hero with Id ${hero.id}`)),
    catchError(this.handleError<any>("updateHero")))
  }
  addHero(name : string): Observable<Hero> 
  {
    var hero : Hero = {name : name}
    return this.http.post<Hero>(this.heroesUrl,hero,this.httpOptions).pipe(tap(_ => this.log(`A new user ${name} has been added`)),catchError(this.handleError<any>("addHero")));
  }
  deleteHero(id : Number) : Observable<Hero>
  {
    var deleteUrl = `${this.heroesUrl}/${id}s`;
    return this.http.delete<Hero>(deleteUrl).pipe(tap(_ => this.log(`The user with this Id ${id} has been deleted`)),catchError(this.handleError<any>("deleteHero")));
  }

  searchHero(term : string)
  {
    var url =  `${this.heroesUrl}/?name=${term}`
    term = term.trim();
    if (term == "")
      {
        return of([])
      }

      return this.http.get<Hero[]>(url,this.httpOptions).pipe(
        tap(res => res.length ? this.log("Found matching Users") : this.log("Found no matching users") ),
        catchError(this.handleError<any>('searchHero'))
      );
  }

}
