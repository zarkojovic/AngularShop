import { Component } from '@angular/core';
import {INavItem} from "../../../interfaces/i-nav-item";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isShown: boolean = false;
  displayMobileNav: boolean = false;
  navItems : INavItem[] = [
    {
      route:"",
      text:"Home",
    },
    {
      route:"shop",
      text:"Shop"
    },
    {
      route:"contact",
      text:"Contact"
    },
    {
      route:"author",
      text:"Author"
    }
  ];

  toggleDropdown(): void {
    this.isShown = !this.isShown;
  }

  toggleMobileNav(): void {
    this.displayMobileNav = !this.displayMobileNav;
  }



}
