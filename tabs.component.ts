import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Current selected city
  selectedCity: string = 'London';

  // Controls the visibility of tab content
  tabContentVisible: Record<string, boolean> = {
    London: true,
    Paris: false,
    Tokyo: false
  };

  // Order of tabs
  tabOrder: string[] = ['London', 'Paris', 'Tokyo'];

  // Index of the currently selected tab
  currentTabIndex: number = 0;

  // Handle the selection of a city tab
  selectCity(cityName: string): void {
    this.selectedCity = cityName;
    this.hideAllTabs();
    this.tabContentVisible[cityName] = true;
  }

  // Hide all tab content
  private hideAllTabs(): void {
    for (const city in this.tabContentVisible) {
      this.tabContentVisible[city] = false;
    }
  }

  // Handle keyboard events
  handleKeyboardEvent(event: KeyboardEvent): void {
    // Navigate between tabs using ArrowLeft and ArrowRight keys
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      this.navigateTabs(event.key === 'ArrowLeft' ? 'left' : 'right');
    }
    // Navigate between tabs using Shift + Tab and Tab keys
    else if (event.key === 'Tab' && event.shiftKey) {
      event.preventDefault();
      this.navigateTabs('left');
    } else if (event.key === 'Tab') {
      event.preventDefault();
      this.navigateTabs('right');
    }
  }

  // Navigate between tabs
  private navigateTabs(direction: 'left' | 'right'): void {
    if (direction === 'left') {
      this.currentTabIndex = (this.currentTabIndex - 1 + this.tabOrder.length) % this.tabOrder.length;
    } else {
      this.currentTabIndex = (this.currentTabIndex + 1) % this.tabOrder.length;
    }

    // Select the city corresponding to the new tab index
    this.selectCity(this.tabOrder[this.currentTabIndex]);
  }
}
