import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Walk} from "../Models/content-types/walk";
import { WalkSingleLocation } from '../Models/content-types/walk_single_location';
import {fetchWalks} from "../services/WalkService";

@Component({
  selector: 'app-walk',
  templateUrl: './walk.component.html',
  styleUrls: ['./walk.component.css']
})
export class WalkComponent implements OnInit {

  walk: Walk | undefined;

  constructor(private route: ActivatedRoute) { }

  async ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const walkNumberFromRoute = Number(routeParams.get('walkNumber'));

    const walks = await fetchWalks();

    // Find the product that correspond with the id provided in route.
    const walk = walks.find(walk => walk.elements.number.value === walkNumberFromRoute);
    if (!walk) {
      throw new Error;
    }
    walk.elements.locations_of_walk.linkedItems = walk.elements.locations_of_walk.linkedItems.sort(orderLocations)
    this.walk = walk;
  }
}

function orderLocations(location1: WalkSingleLocation, location2: WalkSingleLocation) {
  return location1.elements.order.value! < location2.elements.order.value! ? -1 : 1;
}
