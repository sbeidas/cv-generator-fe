import { Component, AfterViewInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { AccomplishmentsService } from '../../services/accomplishments/accomplishments.service';
import { EntitiesService } from '../../services/entities/entities.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { DocumentService } from '../../services/document/document.service';
import { PersistenceService } from '../../services/persistence/persistence.service';
import { DataService } from '../../services/data/data.service';
import { StringExService } from '../../services/string-ex/string-ex.service';
import { MockDataService } from '../../services/mock-data/mock-data.service';

import { TagCloudDisplayMode } from '../../enums/tag-cloud-display-mode.enum';

/**
 * Portfolio component
 * ~implements {@link AfterViewInit}
 */
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements AfterViewInit {
  /** Header link default template reference. */
  @ViewChild('defaultHeaderLink') defaultHeaderLink?: TemplateRef<any>;

  /** Section counter default template reference. */
  @ViewChild('defaultSectionCounter') defaultSectionCounter?: TemplateRef<any>;

  /** The tag cloud element. */
  @ViewChild('tagCloudElement') tagCloudElement?: ElementRef;

  /** The chart tag cloud element. */
  @ViewChild('chartElement') chartElement?: ElementRef;

  /** The both tag cloud element. */
  @ViewChild('bothElement') bothElement?: ElementRef;

  /** Curriculum Vitae clickable element. */
  @ViewChild('clickableCurriculumVitae') clickableCurriculumVitae?: ElementRef;

  /** A clickable element. */
  @ViewChild('clickable') clickable?: ElementRef;

  /** Decorations decorated clickable element. */
  @ViewChild('clickableDecorationsDecorated') clickableDecorationsDecorated?: ElementRef;

  /** Decorations clickable element. */
  @ViewChild('clickableDecorations') clickableDecorations?: ElementRef;

  /** Pagination decorated clickable element. */
  @ViewChild('clickablePaginationDecorated') clickablePaginationDecorated?: ElementRef;

  /** Pagination clickable element. */
  @ViewChild('clickablePagination') clickablePagination?: ElementRef;

  /** Gantt chart map clickable element. */
  @ViewChild('clickableGanttChartMap') clickableGanttChartMap?: ElementRef;

  /** Project summary clickable element. */
  @ViewChild('clickableProjectSummary') clickableProjectSummary?: ElementRef;

  /** Mode decorated clickable element. */
  @ViewChild('clickableModeDecorated') clickableModeDecorated?: ElementRef;

  /** Mode clickable element. */
  @ViewChild('clickableMode') clickableMode?: ElementRef;

  /** Tag cloud clickable element. */
  @ViewChild('clickableTagCloud') clickableTagCloud?: ElementRef;

  /** Chart clickable element. */
  @ViewChild('clickableChart') clickableChart?: ElementRef;

  /** Both clickable element. */
  @ViewChild('clickableBoth') clickableBoth?: ElementRef;

  /** Project portfolio clickable element. */
  @ViewChild('clickableProjectPortfolio') clickableProjectPortfolio?: ElementRef;

  /** Go to top clickable element. */
  @ViewChild('clickableGoToTop') clickableGoToTop?: ElementRef;

  /** The decorations element. */
  @ViewChild('decorationsElement') decorationsElement?: ElementRef;

  /** The pagination element. */
  @ViewChild('paginationElement') paginationElement?: ElementRef;

  /** The projects accomplishment target element. */
  @ViewChild('projectsAccomplishment') projectsAccomplishment?: ElementRef;

  /** Tag cloud display mode. */
  public TagCloudDisplayMode = TagCloudDisplayMode;

  /**
   * Constructs the Portfolio component.
   * ~constructor
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param accomplishmentsService The accomplishments service injected dependency.
   * @param entitiesService The entities service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param documentService The document service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   * @param accomplishmentsService The accomplishments service injected dependency.
   * @param dataService The data service injected dependency.
   * @param excelDateFormatterService The Excel date formatter service injected dependency.
   */
  constructor(
    public portfolioService: PortfolioService,
    public accomplishmentsService: AccomplishmentsService,
    public entitiesService: EntitiesService,
    public inputService: InputService,
    public uiService: UiService,
    public documentService: DocumentService,
    public persistenceService: PersistenceService,
    private dataService: DataService
  ) {
    // console.log('Debug: PortfolioComponent: constructor: constructing...');
  }

  /**
   * Initialization
   * @param mockDataService The mock data service for testing.
   */
  ngAfterViewInit(mockDataService?: MockDataService) {
    this.LoadData(mockDataService);
  }

  /**
   * Load data
   * @param mockDataService The mock data service for testing.
   */
  public LoadData(mockDataService?: MockDataService) {
    if (mockDataService) { this.dataService = mockDataService; }

    this.portfolioService.LoadData();

    // ['Curriculum Vitae', 'Project Summary', 'Project Portfolio', 'General Timeline']
    //   .forEach(_ => this.persistenceService.restoreToggle(document, _));

    globalThis.onscroll = _ => this.documentService.scrollFunction();
  }

  /** Replace all delegate. */
  public replaceAll(str: string | undefined, search: string | RegExp, replacement: any): string {
    if (!str) { return ''; }
    return StringExService.replaceAll(str, search, replacement);
  }
}
