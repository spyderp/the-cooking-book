import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe1',
  templateUrl: './recipe1.page.html',
  styleUrls: ['./recipe1.page.scss'],
})
export class Recipe1Page implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  save() {
    alert('guardar');
  }
}
