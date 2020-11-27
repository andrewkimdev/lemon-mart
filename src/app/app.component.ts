import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button><mat-icon>menu</mat-icon></button>
      <mat-icon svgIcon="lemon"></mat-icon>
      <a mat-button routerLink="/home">
        <h1>Lemon Mart</h1>
      </a>
      <span class="flex-spacer"></span>
      <button mat-icon-button>
        <mat-icon>account_circle</mat-icon>
      </button>
      <button mat-icon-button>
        <mat-icon>lock_open</mat-icon>
      </button>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'lemon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/lemon.svg')
    );
  }
}
