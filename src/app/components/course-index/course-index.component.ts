import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { PropertyComponent } from '../property/property.component';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { DataService } from '../../services/data/data.service';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';
import { Params } from '../../services/component-outlet-injector/params';

/**
 * Course index component
 * ~extends {@link PropertyComponent}
 */
@Component({
  selector: 'app-course-index',
  templateUrl: './course-index.component.html',
  styleUrls: ['./course-index.component.scss']
})
export class CourseIndexComponent extends PropertyComponent {
  /** Index when part of a collection */
  @Input() i = 0;

  /** A clickable element. */
  @ViewChild('clickable') clickable?: ElementRef;

  /** The key. */
  get key() { return 'Name'; }

  /** Frequencies divider object delegate. */
  public get frequenciesDivider() { return this.uiService.frequenciesDivider; }

  /** Update search token delegate. */
  public updateSearchToken(newValue: string) { this.portfolioService.updateSearchToken(newValue); }

  /**
   * Constructs the Course index component.
   * @param portfolioService The portfolio service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param dataService The data service injected dependency.
   * @param excelDateFormatterService The Excel date formatter service injected dependency.
   * @param params The inherited injector params injected dependency.
   */
  constructor(
    public portfolioService: PortfolioService,
    public inputService: InputService,
    public uiService: UiService,
    public dataService: DataService,
    public excelDateFormatterService: ExcelDateFormatterService,
    public params?: Params) {
    super(portfolioService, uiService, dataService, excelDateFormatterService, params);
    if (this.params !== undefined) {
      this.i = this.params.i;
    }
  }

  /** Search token getter delegate. */
  get SearchToken(): string {
    return this.portfolioService.SearchToken;
  }
  /** Search token setter delegate. */
  @Input() set SearchToken(value: string) {
    this.portfolioService.SearchToken = value;
  }

  /** Match frequency for the template to the precalculated cache. */
  get frequency() {
    let frequency;

    try {
      frequency = this.getFrequenciesCache(this.key).find(_ => _[0] === this.propertyName[this.key]);
    } catch (ex) {
      frequency = [
        this.propertyName[this.key],
        {
          'Count': 1,
          'Percentage': 100,
          'Lightness': 0,
          get Label() { return ''; }
        }
      ];
    }

    return frequency;
  }

  /** Get frequencies cache delegate. */
  getFrequenciesCache(propertyName: string): any[] {
    if (this.portfolioService.checkToggleCollapsed(propertyName)) { return []; }

    return this.portfolioService.getFrequenciesCache(propertyName);
  }

  /** Simulate keyboard clicks delegate. */
  keypress(event: KeyboardEvent) {
    this.inputService.keypress(event);
 }
}
