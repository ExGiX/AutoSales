import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { OffersService } from 'src/app/services/offers.service';
import { UserService } from 'src/app/services/user.service';
import { IOffer } from 'src/app/shared/interfaces/offer';
import { IUser } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  carID : string;
  data  : IOffer;
  images = [];
  creator : IUser;
  isLoading : boolean;
  constructor(private offersService : OffersService , private router : ActivatedRoute , private userService : UserService) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.router.params.subscribe(x => {
      this.carID = x['id'];
    })

    this.userService.getCurrentUserData().subscribe(x => { 
      this.creator = x;
      console.log(this.creator);
      
    })

   this.offersService.getOfferDetails(this.carID).subscribe(x => {
     this.data = x;
     this.images = x.imageURLs;
     this.isLoading = false;
   })
  }



}
