import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common';

import { ProjectSummaryComponent } from './project-summary.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

describe('ProjectSummaryComponent', () => {
  let component: ProjectSummaryComponent;
  let debugComponent: any;
  let fixture: ComponentFixture<ProjectSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        ProjectSummaryComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSummaryComponent);
    component = fixture.componentInstance;
    debugComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', () => {
    expect(() => { component.Initialize(); }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard', () => {
    expect(() => {
      component.clickable?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });

  it('should check keypress event handler', () => {
    expect(() => {
      let readAll;
      readAll = component.keypress(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });

  it('should check lifecycle hooks', () => {
    expect(() => {
      TestingCommon.checkLifecycleHooks(component);
    }).not.toThrowError();
  });

  it('should check public interface', () => {
    expect(() => {
      let readAll;
      readAll = component.entities;
      readAll = component.ui;
      readAll = component.countCache;
      readAll = component.linkToThisSymbol;
      readAll = component.linkToThisText;
      readAll = component.decorations;
      readAll = component.tagCloud;

      readAll = component.TagCloudDisplayMode;

      readAll = component.tabName('');
      readAll = component.saveToggle(new MouseEvent('click'));

      const propertyName = 'Responsibilities';
      readAll = component.getFrequenciesCache(propertyName);

      const typeName = 'Project Summary';
      readAll = debugComponent.restoreToggle(document, typeName);
    }).not.toThrowError();
  });
});
