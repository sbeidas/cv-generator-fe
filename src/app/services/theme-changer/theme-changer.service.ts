import { Injectable } from '@angular/core';
import { ThemeConfigVariable } from './theme-config-variable';

/**
 * Theme changer service
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeChangerService {

  /**
   * Construct the theme changer service
   */
  constructor() { }

  /** The app contrast enhancer getter */
  private get contrastEnhancer(): number {
    const ce = parseFloat(document.documentElement.style.getPropertyValue('--contrast-enhancer'));
    return ce;
  }
  /** The app contrast enhancer setter */
  private set contrastEnhancer(value: number) {
    document.documentElement.style.setProperty('--contrast-enhancer', value.toString());
  }

  /**
   * Extract and set the global contrast enhancer.
   * @param theme The new theme.
   * @param appThemeConfig The theme config.
   */
  public initContrastEnhancer(theme: string, appThemeConfig: { variables: ThemeConfigVariable[]; }) {
    let ce;
    try {
      const nameParts = theme.split('_');
      const candidate = nameParts[nameParts.length - 1];
      ce = parseFloat(candidate) / 100;
    } catch (e) {
      ce = 0;
    }

    if (isNaN(ce)) {
      ce = 0;
    }

    this.contrastEnhancer = ce;

    this.configTheme(ce, appThemeConfig);
  }

  /**
   * Load CSS custom variables from theme config.
   * @param ce The contrast enhancer.
   * @param appThemeConfig The theme config.
   */
  private configTheme( ce: number, appThemeConfig: { variables: ThemeConfigVariable[]; } ) {
    let sgnce = Math.sign(ce);
    sgnce = sgnce === 0 ? 1 : sgnce;

    const absce = Math.abs(ce);

    const variables = appThemeConfig.variables;

    variables.forEach((cssVariable: { components: any[]; name: any; }) => {
      cssVariable.components.forEach(component => {
        const cssVariableName = this.constructVariableName(cssVariable.name, component.name);
        const newCssValue = this.calcNewCssValue(sgnce, absce, component, variables);
        document.documentElement.style.setProperty(cssVariableName, newCssValue);

        // console.log('Debug: configTheme: %s: %s \
        //   (setting: %s > %s)',

        //   cssVariableName,
        //   document.documentElement.style.getPropertyValue(cssVariableName),
        //   ce.toFixed(4), newCssValue
        // );
      });
    });
  }

  /** Calculate a new config theme css value */
  private calcNewCssValue( sgnce: number, absce: number, component: any, variables: ThemeConfigVariable[] ): string {
    const base = this.calcModifiedOffsetBase(component, variables);

    const offset = this.fromPercentage(component.offset);

    let sgnOffset = Math.sign(offset);
    sgnOffset = sgnOffset === 0 ? 1 : sgnOffset;
    const modifiedOffset = this.linear(base, sgnOffset > 0 ? 1 : 0, Math.abs(offset));

    const cssValue = component.base ? modifiedOffset : offset;
    const lightnessDirection = component.name === 'a' ? (1 + sgnce) / 2 : (1 - sgnce) / 2;
    const newCssValue = this.toPercentage(this.linear(cssValue, lightnessDirection, absce));

    // console.log('Debug: calcNewCssValue: \
    //   offset: %s > %s, \
    //   sgnOffset: %s, lightnessDirection: %s : \
    //   setting: %s',

    //   component.offset, offset.toFixed(4),
    //   sgnOffset, lightnessDirection,
    //   newCssValue
    // );

    return newCssValue;
  }

  /** Calculate the modified offset base value */
  private calcModifiedOffsetBase( component: any, variables: ThemeConfigVariable[] ): number {
    let baseComponentValue = '0%';
    try {
      if (component.base) {
        baseComponentValue = variables
          .filter(_ => _.name === component.base)[0].components
          .filter(__ => __.name === component.name)[0].offset;
      } else {
        baseComponentValue = component.offset;
      }
    } catch (e) { }
    const base = this.fromPercentage(baseComponentValue);

    // console.log('Debug: calcModifiedOffsetBase: \
    //   base: %s > %s',

    //   baseComponentValue, base.toFixed(4),
    // );

    return base;
  }

  /** Variable name constructor */
  private constructVariableName(variableName: string, componentName: string) {
    return '--' + variableName + '-' + componentName;
  }

  /** Linear combination calculator */
  private linear(a: number, b: number, t: number) {
    return a * (1 - t) + b * t;
  }

  /** Percentage number string parser and normalizer */
  private fromPercentage(percentage: string) {
    return parseFloat(percentage.substr(0, percentage.length - 1)) / 100.0;
  }

  /** Percentage formatter */
  private toPercentage(value: number) {
    return (value * 100.0).toFixed(6) + '%';
  }
}
