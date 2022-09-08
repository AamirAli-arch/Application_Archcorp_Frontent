import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-technical-cards',
  templateUrl: './technical-cards.component.html',
  styleUrls: ['./technical-cards.component.scss']
})
export class TechnicalCardsComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

  mechanical(){
    this.router.navigate(["pages/mechanical"]);
  }

  apartment(){
    this.router.navigate(["pages/apartment"]);
  }

  freshmodule(){
    this.router.navigate(["pages/fresh"]);
  }
}

