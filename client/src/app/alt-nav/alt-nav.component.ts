import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-alt-nav',
  templateUrl: './alt-nav.component.html',
  styleUrls: ['./alt-nav.component.css']
})
export class AltNavComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
  }

}
