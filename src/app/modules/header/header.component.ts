import { Component, OnInit,ElementRef } from '@angular/core';
import { Router, RouterModule,ActivatedRoute, Params } from '@angular/router';
declare var $: any
@Component({
  selector: 'lst-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _router:Router,private el: ElementRef) { }

  ngOnInit() {
  	$(".button-collapse").sideNav();
  }
}
