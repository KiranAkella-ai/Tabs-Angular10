import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { AppModule } from './app.module';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  [tabs: string]: any;
  public tablistNode!: ElementRef;

  public tabs: ElementRef[] = [];
  public tabpanels: ElementRef[] = [];

  public firstTab: ElementRef | null = null;
  public lastTab: ElementRef | null = null;

  constructor(public elementRef: ElementRef,
    public renderer: Renderer2) {}

  ngOnInit(): void {
    this.tablistNode = this.elementRef.nativeElement;

    this.tabs = Array.from(this.tablistNode.nativeElement.querySelectorAll('[role=tab]')) as ElementRef[];
    this.tabpanels = [];

    this.tabs.forEach((tab) => {
      const tabId = tab.nativeElement.getAttribute('aria-controls');
      const tabpanel = this.renderer.selectRootElement(`#${tabId}`);

      if (tabpanel) {
        tab.nativeElement.tabIndex = -1;
        tab.nativeElement.setAttribute('aria-selected', 'false');
        this.tabpanels.push(tabpanel);
      }
      tab.nativeElement.addEventListener('keydown', this.onKeydown.bind(this));
      tab.nativeElement.addEventListener('click', this.onClick.bind(this));

      if (!this.firstTab) {
        this.firstTab = tab;
      }
      this.lastTab = tab;
    });

    this.setSelectedTab(this['nativeElement'].firstTab);
  }

  setSelectedTab(currentTab: ElementRef): void {
    this.tabs.forEach((tab, i) => {
      if (currentTab.nativeElement === tab.nativeElement) {
        tab.nativeElement.setAttribute('aria-selected', 'true');
        tab.nativeElement.removeAttribute('tabindex');
        this.tabpanels[i].nativeElement.classList.remove('is-hidden');
      } else {
        tab.nativeElement.setAttribute('aria-selected', 'false');
        tab.nativeElement.tabIndex = -1;
        this.tabpanels[i].nativeElement.classList.add('is-hidden');
      }
    });
  }

  moveFocusToTab(currentTab: ElementRef): void {
    currentTab.nativeElement.focus();
  }

  moveFocusToPreviousTab(currentTab: ElementRef): void {
    const index = this.tabs.findIndex(
      (tab) => currentTab.nativeElement === tab.nativeElement
    );

    if (index === 0) {
      this.moveFocusToTab(this['nativeElement'].lastTab);
    } else {
      this.moveFocusToTab(this.tabs[index - 1]);
    }
  }

  moveFocusToNextTab(currentTab: ElementRef): void {
    const index = this.tabs.findIndex(
      (tab) => currentTab.nativeElement === tab.nativeElement
    );

    if (index === this.tabs.length - 1) {
      this.moveFocusToTab(this['nativeElement'].is.firstTab);
    } else {
      this.moveFocusToTab(this.tabs[index + 1]);
    }
  }

  onKeydown(event: KeyboardEvent): void {
    const tgt = event.currentTarget as HTMLElement;  
    const tabElementRef = new ElementRef(tgt); 
    let flag = false;
  
    switch (event.key) {
      case 'ArrowLeft':
        this.moveFocusToPreviousTab(tabElementRef);
        flag = true;
        break;
  
      case 'ArrowRight':
        this.moveFocusToNextTab(tabElementRef);
        flag = true;
        break;
  
      case 'Home':
        this.moveFocusToTab(this.firstTab?.nativeElement || null);
        flag = true;
        break;
  
      case 'End':
        this.moveFocusToTab(this.lastTab?.nativeElement || null);
        flag = true;
        break;
  
      default:
        break;
    }
  
    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }
  
  onClick(event: Event): void {
    const target = event.currentTarget as HTMLElement; // Cast to HTMLElement
    const tabElementRef = new ElementRef(target);  
    this.setSelectedTab(tabElementRef);
  }
  // Add a public method to check if a tab panel is hidden
  public isTabPanelHidden(index: number): boolean {
    return !this.tabpanels[index].nativeElement.classList.contains('is-hidden');
  }
}
