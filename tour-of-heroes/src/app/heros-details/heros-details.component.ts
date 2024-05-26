import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
@Component({
  selector: 'app-heros-details',
  templateUrl: './heros-details.component.html',
  styleUrl: './heros-details.component.css'
})
export class HerosDetailsComponent {
  hero : Hero = {} as Hero;
  constructor(private heroService : HeroService,private route : ActivatedRoute,private location : Location)
  {

  }

  ngOnInit()
  {
    this.getHero()
  }

  getHero()
  {
    var id = Number(this.route.snapshot.paramMap.get("id"));
    this.heroService.getHero(id).subscribe((data) => {this.hero = data});
  }
  goBack()
  {
    this.goBack();
  }
  save()
  {
    this.heroService.updateHero(this.hero).subscribe(_ => this.location.back());
  }
}
