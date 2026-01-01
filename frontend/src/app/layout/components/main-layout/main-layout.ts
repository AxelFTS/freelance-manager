import { Component, inject, viewChild, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-main-layout',
  imports: [AsyncPipe, Header, Sidebar, RouterOutlet, MatSidenavModule],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
  private breakpointObserver = inject(BreakpointObserver);

  isDesktop$ = this.breakpointObserver
    .observe([
      Breakpoints.XLarge,
      Breakpoints.Large,
      Breakpoints.Medium,
      Breakpoints.Small,
    ])
    .pipe(map((result) => result.matches));

  sideNavElement = viewChild<MatSidenav>('sideNav');

  public toggleSidenav() {
    this.sideNavElement()?.toggle();
  }
}
