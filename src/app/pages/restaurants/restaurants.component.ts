import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Address } from '../../models/address.model';
import { BusinessHour } from '../../models/business-hour.model';
import { Menu, MenuItem } from '../../models/menu.model';
import { Restaurant } from '../../models/restaurant.model';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
})
export class RestaurantsComponent implements OnInit {
  searchFormControl = new FormControl();

  restaurants!: Restaurant[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<Restaurant[]>(
        'https://dinehub-24505-default-rtdb.firebaseio.com/restaurants.json'
      )
      .subscribe((restaurants) => {
        this.restaurants = restaurants;
      });
  }
}