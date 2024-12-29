import { Component } from '@angular/core';
import { HeroesService } from "../../services/heroes.service";
import { FormControl } from "@angular/forms";
import {Hero} from "../../interfaces/hero.interface";
import {map} from "rxjs";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent {
  public searchInput = new FormControl('');
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  constructor(private heroesService: HeroesService) {}

  searchHero() {
    const query = this.searchInput.value || '';
    this.heroesService.getSuggestions(query).pipe(
      map(heroes => heroes.filter(hero => hero.superhero.toLowerCase().includes(query.toLowerCase())))
    ).subscribe(heroes => this.heroes = heroes);
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.selectedHero = undefined;
      return;
    }
    this.searchInput.setValue(event.option.value.superhero);
    this.selectedHero = event.option.value as Hero;
  }
}
