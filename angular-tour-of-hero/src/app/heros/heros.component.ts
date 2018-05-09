import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css']
})
export class HerosComponent implements OnInit {
  heros = HEROES;
  selectedHero: Hero;

  constructor() { }


  onSelect(hero: Hero): void {
    this.selectedHero = hero; 
  }

  ngOnInit() {
  }

}
