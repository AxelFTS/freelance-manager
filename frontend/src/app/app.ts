import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { MainLayout } from './layout/components/main-layout/main-layout';
@Component({
  selector: 'app-root',
  imports: [MatButtonModule, MainLayout],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('frontend');
}
