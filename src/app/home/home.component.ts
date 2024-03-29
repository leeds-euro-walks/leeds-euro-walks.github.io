import {Component, OnInit} from '@angular/core';
import {fetchHomepageText, fetchOtherEurowalks, fetchWalks} from "../services/WalkService";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  walkItems : { title: string; pictureUrl: string; href: string; miles: number; number: number;}[] | undefined;
  welcomeText: string | undefined;
  otherEurowalkWebsites: {title: string, url: string}[] | undefined;

  async ngOnInit() {
    const welcomeText = await fetchHomepageText();
    this.welcomeText = welcomeText[0].elements.text.value;

    const otherEurowalkWebsites = await fetchOtherEurowalks();
    this.otherEurowalkWebsites = otherEurowalkWebsites.map(eu => {
      return {title: eu.elements.title.value, url: eu.elements.website_url.value}
    });

    const walks = await fetchWalks();
    let walkItems = walks.map(walk => {return {
      number: walk.elements.number.value!,
      title: walk.elements.title.value,
      pictureUrl: walk.elements.overview_picture.value[0].url,
      href: `/walks/${walk.elements.number.value}`,
      miles: walk.elements.miles.value!
    }});
    walkItems.forEach((w, i) => {
      w.number = i + 1;
    })
    this.walkItems = walkItems;
  }
}
