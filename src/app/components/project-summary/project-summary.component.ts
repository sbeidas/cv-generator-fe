import { Component, AfterViewInit, Input, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { PortfolioComponent } from '../portfolio/portfolio.component';

/**
 * Project summary component
 * ~implements {@link AfterViewInit}
 */
@Component({
  selector: 'app-project-summary',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.scss']
})
export class ProjectSummaryComponent implements AfterViewInit {
  /** Header link template reference. */
  @Input() headerLink?: TemplateRef<any>;

  /** Section counter template reference. */
  @Input() sectionCounter?: TemplateRef<any>;

  /** A clickable element. */
  @ViewChild('clickable') clickable?: ElementRef;

  /** Entities delegate. */
  public get entities() { return this.portfolioComponent.entities; }
  /** UI delegate. */
  public get ui() { return this.portfolioComponent.ui; }

  /** Count cache delegate. */
  public get countCache() { return this.portfolioComponent.countCache; }

  /** Link-to-this symbol delegate. */
  public get linkToThisSymbol() { return this.portfolioComponent.linkToThisSymbol; }
  /** Link-to-this text delegate. */
  public get linkToThisText() { return this.portfolioComponent.linkToThisText; }

  /** Tag cloud display mode delegate. */
  public get tagCloudDisplayMode() { return this.portfolioComponent.tagCloudDisplayMode; }

  /** Decorations delegate. */
  public get decorations() { return this.portfolioComponent.decorations; }

  /**
   * Constructs the Project summary component.
   * @param portfolioComponent The common portfolio component injected dependency.
   */
  constructor(
    public portfolioComponent: PortfolioComponent) {
  }

  /** Tag cloud delegate. */
  get tagCloud() {
    return this.portfolioComponent.tagCloud;
  }

  /** Initialization */
  ngAfterViewInit() {
    this.Initialize();
  }

  /** Initialization */
  Initialize() {
    ['Project Summary'].forEach(_ => this.restoreToggle(document, _));
    ['Areas of Expertise', 'Skills', 'Job Functions'].forEach(_ => this.restoreToggle(document, _));
  }

  /** Tab name delegate. */
  tabName(key: string): string {
    return this.portfolioComponent.tabName(key);
  }

  /** Save toggle delegate. */
  saveToggle(event: MouseEvent) {
    this.portfolioComponent.saveToggle(event);
  }

  /** Restore toggle delegate. */
  private restoreToggle(document: Document, typeName: string) {
    this.portfolioComponent.restoreToggle(document, typeName);
  }

  /** Get frequencies cache delegate. */
  getFrequenciesCache(propertyName: string): any[] {
    return this.portfolioComponent.getFrequenciesCache(propertyName);
  }

  /** Simulate keyboard clicks delegate. */
  keypress(event: KeyboardEvent) {
    this.portfolioComponent.keypress(event);
 }
}
