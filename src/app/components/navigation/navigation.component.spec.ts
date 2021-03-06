import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common';

import { NavigationComponent } from './navigation.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        NavigationComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check lifecycle hooks', () => {
    expect(() => {
      TestingCommon.checkLifecycleHooks(component);
    }).not.toThrowError();
  });

  it('should check public interface', () => {
    expect(() => {
      let readAll;
      readAll = component.componentName;
      readAll = component.linkToThisSymbol;
      readAll = component.linkToThisText;

      readAll = component.tabName('tabName');

      component.portfolioService.entities = {
        ...(Object(component.portfolioService.entities)),
        ...{
          'Badges': {
            'node': 'Badges',
            'section': 'Badges',
            'parent': '',
            'class': 'hsl9b',
            'main': 'true'
          }
        }
      };
      const key = 'Badges';
      readAll = component.decorateMain(key);
      component.portfolioService.entities[key].section = component.portfolioService.entities[key].node;
      readAll = component.decorateMain(key);
      component.portfolioService.entities[key].section = '';
      readAll = component.decorateMain(key);
      component.portfolioService.entities[key].main = 'false';
      readAll = component.decorateMain(key);
      component.portfolioService.entities[key].section = component.portfolioService.entities[key].node;
      readAll = component.decorateMain(key);

      readAll = component.nonBreaking('nonBreaking');
      readAll = component.nonBreaking('');
      readAll = component.trackByFn(0, 0);
    }).not.toThrowError();
  });
});
