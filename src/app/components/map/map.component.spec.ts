import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        MapComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', () => {
    expect(() => { component.Initialize(); }).not.toThrowError();
  });

  it('should drawMap', async () => {
    (await expect(async () => {
      await component.drawMap(
        'test',
        { 'key': 'Country' },
        [
          [
            'Bulgaria',
            {
              'Count': 15,
              'Percentage': 44,
              'Lightness': 0
            }
          ],
          [
            'Norway',
            {
              'Count': 10,
              'Percentage': 29,
              'Lightness': 20
            }
          ]
        ]);
    })).not.toThrowError();
  });

  it('should resize window', () => {
    expect(() => {
      window.dispatchEvent(new Event('resize'));
    }).not.toThrowError();
  });

  it('should check all public properties', () => {
    expect(() => {
      let readAll;
      readAll = component.key;
      readAll = component.map;
      readAll = component.mapHTMLElement;
      readAll = component.entities;
      readAll = component.getFrequenciesCache(component.key);
    }).not.toThrowError();
  });

  it('should check onResize', () => {
    expect(() => {
      const readAll = component.onResize();
    }).not.toThrowError();
  });

  it('should check onBeforePrint', () => {
    expect(() => {
      const readAll = component.onBeforePrint({});
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard', () => {
    expect(() => {
      component.clickable.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });
});
