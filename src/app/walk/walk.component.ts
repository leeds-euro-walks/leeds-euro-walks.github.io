import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Elements } from '@kontent-ai/delivery-sdk';
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
    let locations = walk.elements.locations_of_walk;
    walk.elements.locations_of_walk = modifyLocationsForUI(locations);
    this.walk = walk;
  }
}
function modifyLocationsForUI(locations: Elements.LinkedItemsElement<WalkSingleLocation>): Elements.LinkedItemsElement<WalkSingleLocation> {
  const reg: RegExp = new RegExp(/https:\/\/\S*/g);
  locations.linkedItems.sort(orderLocations);
  locations.linkedItems.map(loc => {
    let infoText = loc.elements.information_about_location.value;
    const matches = infoText.match(reg);
    matches?.forEach(link => {
      infoText = infoText.replace(link, `<a href=${link}>this link</a>`)
    });
    loc.elements.information_about_location.value = infoText;
  })
  return locations;
}

function orderLocations(location1: WalkSingleLocation, location2: WalkSingleLocation) {
  return location1.elements.order.value! < location2.elements.order.value! ? -1 : 1;
}
