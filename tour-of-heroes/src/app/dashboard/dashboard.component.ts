import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  heros : Hero[] = [];

  constructor(private heroService : HeroService){}

  ngOnInit()
  {
    this.getHeros()
  }

  getHeros()
  {
    this.heroService.getHeroes().subscribe((data) => {
      this.heros = data.slice(0,5);
    })
  }

}
