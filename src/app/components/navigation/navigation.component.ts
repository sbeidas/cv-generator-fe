import { Component, OnInit, Input } from '@angular/core';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { StringExService } from '../../services/string-ex/string-ex.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  private readonly componentName;

  private readonly menuDivider = '|';

  @Input() position: any;

  public get entities() { return this.portfolioComponent.entities; }

  constructor(
    public portfolioComponent: PortfolioComponent) {
    this.componentName = portfolioComponent.componentName;
  }

  ngOnInit() {
  }

  private tabName(key: string): string {
    return this.portfolioComponent.tabName(key);
  }

  private decorateMain(key: string) {
    return this.entities[key] && this.entities[key].main
      ? this.entities[key].section
        ? this.entities[key].section.toUpperCase()
        : ''
      : this.entities[key].section
        ? this.entities[key].section
        : '';
  }

  private nonBreaking(sectionName: string) {
    return sectionName ? this.replaceAll(sectionName, ' ', String.fromCharCode(160)) : ''; // &nbsp;
  }

  private replaceAll(str, search, replacement) { return StringExService.replaceAll(str, search, replacement); }
}