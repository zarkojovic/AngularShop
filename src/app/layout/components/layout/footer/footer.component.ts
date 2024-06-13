import { Component } from '@angular/core';
import {INavItem} from "../../../interfaces/i-nav-item";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

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



}
