import { Component,Inject, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import {CommonModule} from '@angular/common';
import { HousingService } from '../housing.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HousingLocationComponent,CommonModule],
  template: `
  <section>
    <form>
      <input type="text" placeholder="Filter by city" #filter>
      <button class="primary" type="button" (click) = "applyFilter(filter.value)">Search</button>
    </form>
  </section>
  <section class="results">
    <app-housing-location 
    *ngFor="let housingLocation of filteredHousingLocationList"
    [housingLocation]="housingLocation"></app-housing-location>
  </section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  housingService: HousingService = inject(HousingService);
  housingLocationList: HousingLocation[] = [];
  filteredHousingLocationList : HousingLocation[] = []

  constructor(){
    this.housingLocationList = this.housingService.getAllHousingLocations();
    this.filteredHousingLocationList = this.housingLocationList

  }

  applyFilter(cityName : string){
    this.filteredHousingLocationList = this.housingLocationList.filter((housingLocation) => {
      return housingLocation.city.toLowerCase().includes(cityName.toLowerCase())
  });

  }
}

