import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Walk} from "../Models/content-types/walk";
import {getWalks} from "../services/WalkService";

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

    const walks = await getWalks();

    // Find the product that correspond with the id provided in route.
    this.walk = walks.find(walk => walk.elements.number.value === walkNumberFromRoute);
  }
}
