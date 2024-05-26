import { Component} from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock_heros';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrl: './heros.component.css'
})
export class HerosComponent {
  selectedHero? : Hero;
  heros : Hero[] = []
  constructor(private heroService : HeroService){
    this.heroService = heroService
  }
  
  ngOnInit()
  {
    this.getHeros()
  }

  onSelect(hero: Hero): void
  {
    this.selectedHero = hero;
  }

  getHeros()
  {
    this.heroService.getHeroes().subscribe((value) => {
      this.heros = value
    })
  }
  add(name : string)
  {
    name = name.trim();
    this.heroService.addHero(name).subscribe(hero => this.heros.push(hero as Hero));
  }
  delete(hero : Hero)
  {
    this.heros = this.heros.filter(h => h != hero);
    this.heroService.deleteHero(hero.id!).subscribe();
  }
}
