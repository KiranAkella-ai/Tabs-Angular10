import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //selectedCity: string | null = null;
  selectedCity: string = 'London'; // Set 'London' as the default selected city

  selectCity(cityName: string): void {
    this.selectedCity = cityName;
  }
  openCity(evt: any, cityName: string): void {
    // Declare all variables
    let i: number;
    let tabcontent: HTMLCollectionOf<Element>;
    let tablinks: HTMLCollectionOf<Element>;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent") as HTMLCollectionOf<Element>;
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].setAttribute("style", "display: none");
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks") as HTMLCollectionOf<Element>;
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    const selectedCity = document.getElementById(cityName);
    if (selectedCity) {
      selectedCity.setAttribute("style", "display: block");
    }
    evt.currentTarget.className += " active";
  }
}
