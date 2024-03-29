import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Elements } from '@kontent-ai/delivery-sdk';
import {Walk} from "../Models/content-types/walk";
import { WalkSingleLocation } from '../Models/content-types/walk_single_location';
import {fetchWalks} from "../services/WalkService";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-walk',
  templateUrl: './walk.component.html',
  styleUrls: ['./walk.component.css']
})
export class WalkComponent implements OnInit {

  walk: Walk | undefined;
  slideIndexes: { [locationNumber: number]: number; } = {};
  alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V"];

  constructor(private route: ActivatedRoute) { }

  async ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const walkNumberFromRoute = Number(routeParams.get('walkNumber'));

    const walks = await fetchWalks();

    // Find the walk that correspond with the id provided in route.
    const walk = walks.find(walk => walk.elements.number.value === walkNumberFromRoute);
    if (!walk) {
      throw new Error;
    }
    let locations = walk.elements.locations_of_walk.linkedItems;
    locations = modifyLocationsForUI(locations);
    locations
      .filter(loc => !!loc.elements.picture.value)
      .forEach(loc => {
        this.slideIndexes[loc.elements.order.value!] = 0
      });
    walk.elements.locations_of_walk.linkedItems = locations;
    this.walk = walk;
  }

  plusSlides(locationNumber: number|null, moveTo: number) {
    const locationPictures = this.walk?.elements.locations_of_walk.linkedItems
      .find(loc => loc.elements.order.value === locationNumber)?.elements.picture.value;
    if (!locationNumber || !locationPictures || locationPictures.length < 2) {
      return;
    }
    const maxIndex = locationPictures.length - 1;
    const newIndex = this.slideIndexes[locationNumber] + moveTo;
    const newIndexNormalised = newIndex > maxIndex ? 0 : newIndex < 0 ? maxIndex : newIndex;
    const newImgSrc = locationPictures[newIndexNormalised].url;
    const img = document.getElementById("location-image-" + locationNumber) as HTMLImageElement;
    img.src = newImgSrc;
    this.slideIndexes[locationNumber] = newIndexNormalised;
  }

  getGMapsEmbedUrl() {
    return `https://www.google.com/maps/d/${this.walk!.elements.embed_link.value}`;
  }

  getGMapsFullscreenUrl() {
    return `https://www.google.com/maps/d/u/0/${this.walk!.elements.embed_link.value.replace("embed", "viewer")}`;
  }

  printThisPage() {
    window.print();
  }
}

function modifyLocationsForUI(locations: WalkSingleLocation[]): WalkSingleLocation[] {
  const reg: RegExp = new RegExp(/https{0,1}:\/\/\S*/g);
  locations.sort(orderLocations);
  locations.map(loc => {
    let infoText = loc.elements.information_about_location.value;
    const matches = infoText.match(reg);
    matches?.forEach(link => {
      infoText = infoText.replace(link, `<a target="_blank" href=${link}>${link}</a>`)
    });
    loc.elements.information_about_location.value = infoText;
  })
  return locations;
}

function orderLocations(location1: WalkSingleLocation, location2: WalkSingleLocation) {
  return location1.elements.order.value! < location2.elements.order.value! ? -1 : 1;
}
