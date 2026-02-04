import { Component, output, signal, effect } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, MatButtonModule, MatToolbarModule, MatTooltipModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  menuClick = output<void>();

  // Theme state - default to dark
  isDarkMode = signal<boolean>(true);

  constructor() {
    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkMode.set(savedTheme === 'dark');
    }

    // Apply theme on init and when it changes
    effect(() => {
      this.applyTheme();
    });
  }

  onMenuClick() {
    this.menuClick.emit();
  }

  toggleTheme() {
    this.isDarkMode.update(current => !current);
  }

  private applyTheme() {
    const theme = this.isDarkMode() ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
}
