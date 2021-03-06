import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Routing Module
import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';

// App Root
import { AppComponent } from './app.component';

// Feature Modules
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { WebpageModule } from './modules/webpage/webpage.module';

// Services Providers
import { DataService } from './services/data/data.service';
import { ImageDataService } from './services/image-data/image-data.service';
import { ChartService } from './services/chart/chart.service';
import { GanttChartService } from './services/gantt-chart/gantt-chart.service';
import { GeneralTimelineService } from './services/general-timeline/general-timeline.service';
import { TagCloudProcessorService } from './services/tag-cloud-processor/tag-cloud-processor.service';
import { ThemeChangerService } from './services/theme-changer/theme-changer.service';
import { ExcelDateFormatterService } from './services/excel-date-formatter/excel-date-formatter.service';
import { SearchEngineService } from './services/search-engine/search-engine.service';
import { SearchHistoryService } from './services/search-history/search-history.service';
import { SearchTokenizerService } from './services/search-tokenizer/search-tokenizer.service';
import { DocumentService } from './services/document/document.service';

import { LogUpdateService } from './services/log-update/log-update.service';
import { PromptUpdateService } from './services/prompt-update/prompt-update.service';
import { CheckForUpdateService } from './services/check-for-update/check-for-update.service';

import { IsSecureGuardService } from './services/is-secure-guard/is-secure-guard.service';

import { ComponentOutletInjectorService } from './services/component-outlet-injector/component-outlet-injector.service';
import { Params } from './services/component-outlet-injector/params';

import { StylesheetsComponent } from './components/stylesheets/stylesheets.component';

// Connect Plotly
import { CommonModule } from '@angular/common';
import { PlotlyViaCDNModule } from 'angular-plotly.js';
// PlotlyViaCDNModule.plotlyVersion = 'latest';
// PlotlyViaCDNModule.plotlyBundle = 'geo';

/** The main application module. */
@NgModule({
  declarations: [
    AppComponent,
    StylesheetsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    FormsModule,
    HttpClientModule,

    PortfolioModule.forRoot(),
    WebpageModule,

    CommonModule,
    PlotlyViaCDNModule,

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    Title,

    DataService,
    ImageDataService,
    ChartService,
    GanttChartService,
    GeneralTimelineService,
    TagCloudProcessorService,
    ThemeChangerService,
    ExcelDateFormatterService,
    SearchEngineService,
    SearchHistoryService,
    SearchTokenizerService,
    DocumentService,
    ComponentOutletInjectorService, Params,

    LogUpdateService,
    PromptUpdateService,
    CheckForUpdateService,

    IsSecureGuardService
  ],
  exports: [FormsModule, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
