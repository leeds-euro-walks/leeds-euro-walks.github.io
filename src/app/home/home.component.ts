import {Component, OnInit} from '@angular/core';
import {fetchWalks} from "../services/WalkService";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  walkItems : { title: string; pictureUrl: string; href: string; }[] | undefined;
  async ngOnInit() {
    const walks = await fetchWalks();
    this.walkItems = walks.map(walk => {return {
      title: walk.elements.title.value,
      pictureUrl: walk.elements.overview_picture.value[0].url,
      href: `/walks/${walk.elements.number.value}`
    }})
  }
}
