import { Component, Injector, AfterViewInit } from '@angular/core';

import { PortfolioComponent } from '../portfolio/portfolio.component';

import { ProjectIndexComponent } from '../project-index/project-index.component';
import { ProjectListComponent } from '../project-list/project-list.component';
import { ProjectCardComponent } from '../project-card/project-card.component';

import { StringExService } from '../../services/string-ex/string-ex.service';
import { DataService } from '../../services/data/data.service';
import { GanttChartService } from '../../services/gantt-chart/gantt-chart.service';
import { ComponentOutletInjectorService } from '../../services/component-outlet-injector/component-outlet-injector.service';

/**
 * Project component
 */
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements AfterViewInit {
  /** Frequencies divider object delegate. */
  private readonly frequenciesDivider;

  /** Main component name delegate */
  private readonly componentName;

  /** Entities delegate. */
  public get entities() { return this.portfolioComponent.entities; }

  /** Count cache delegate. */
  public get countCache() { return this.portfolioComponent.countCache; }

  /** Filtered projects delegate. */
  public get filteredProjects() { return this.portfolioComponent.filteredProjects; }

  /** Link to this symbol delegate. */
  public get linkToThisSymbol() { return this.portfolioComponent.linkToThisSymbol; }
  /** Link to this text delegate. */
  public get linkToThisText() { return this.portfolioComponent.linkToThisText; }

  /** Project index component ComponentOutlet hook */
  private ProjectIndexComponent = ProjectIndexComponent;
  /** Project list component ComponentOutlet hook */
  private ProjectListComponent = ProjectListComponent;
  /** Project card component ComponentOutlet hook */
  private ProjectCardComponent = ProjectCardComponent;

  /** The gantt chart data */
  private ganttChart: any;

  /** The injector cache holder */
  private injectorCache = {};
  /** Injector getter delegate */
  getInjector(propertyName, i?): Injector { return this.componentOutletInjectorService.getInjector(propertyName, i); }

  /**
   * Constructs the Project component.
   * @param portfolioComponent The common portfolio component injected dependency.
   * @param dataService The data service injected dependency.
   * @param ganttChartService The gantt chart service injected dependency.
   * @param injector The injector injected dependency.
   * @param componentOutletInjectorService The component outlet injector service injected dependency.
   * */
  constructor(
    public portfolioComponent: PortfolioComponent,
    private dataService: DataService,
    private ganttChartService: GanttChartService,
    public injector: Injector,
    private componentOutletInjectorService: ComponentOutletInjectorService) {
    componentOutletInjectorService.init(injector, this.injectorCache);
    this.frequenciesDivider = portfolioComponent.frequenciesDivider;
    this.componentName = portfolioComponent.componentName;
    portfolioComponent.searchTokenChanged.subscribe(_ => this.onSearchTokenChanged(_));
  }

  /** Initialization */
  ngAfterViewInit() {
    ['Project Portfolio', 'General Timeline'].forEach(_ => this.restoreToggle(document, _));
    ['Gantt Chart', 'List', 'Index', 'Projects'].forEach(_ => this.restoreToggle(document, _));

    this.getGanttChart();
  }

  /** Search token changed event handler. */
  private onSearchTokenChanged(value: string) {
    this.drawProjectGanttChart();
  }

  /** Draws the gantt chart */
  private drawProjectGanttChart() {
    const chartType = 'Project Gantt';
    const data = this.ganttChart;
    if (data != null) {
      this.portfolioComponent.drawChart(chartType, this.ganttChartService.addChart(data, this.filteredProjects));
    }
  }

  /** Loads the gantt chart */
  private getGanttChart(): void {
    this.dataService.getGanttChart().subscribe((ganttChart) => {
      this.ganttChart = ganttChart;
      this.drawProjectGanttChart();
    });
  }

  /** Tab name delegate. */
  tabName(key: string): string {
    return this.portfolioComponent.tabName(key);
  }

  /** Get decrypted project period delegate. */
  private getDecryptedProjectPeriod(project): string {
    return this.portfolioComponent.getDecryptedProjectPeriod(project);
  }

  /** Save toggle delegate */
  saveToggle(event) {
    this.portfolioComponent.saveToggle(event);
  }

  /** Restore toggle delegate */
  private restoreToggle(document, typeName, contentName?) {
    this.portfolioComponent.restoreToggle(document, typeName, contentName);
  }

  /** To title case delegate. */
  public toTitleCase(str) { return StringExService.toTitleCase(str); }
}
