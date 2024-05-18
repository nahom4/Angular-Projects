import { Component,Inject, inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  activatedRoute : ActivatedRoute = inject(ActivatedRoute);
  housingService : HousingService = inject(HousingService);
  housingLocationId : number = -1
  housingLocation? : HousingLocation = {} as HousingLocation;

  applyForm = new FormGroup(
    {firstName : new FormControl(""),
      lastName : new FormControl(''),
      email : new FormControl('')
    }
  )

  constructor(){
    this.housingLocationId = Number(this.activatedRoute.snapshot.params['id']);
    this.housingService.getHousingLocationById(this.housingLocationId).then(((housingLocation) => {  
      this.housingLocation = housingLocation;
    }));
  }

  submitForm(){
    this.housingService.submitApplication(this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '', this.applyForm.value.email ?? '');
    
  }
}
