import { Injectable } from '@angular/core';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';
import { StringExService } from '../string-ex/string-ex.service';

/**
 * Tag cloud processor service
 */
@Injectable({
  providedIn: 'root'
})
export class TagCloudProcessorService {

  /**
   * Construct the tag cloud processor service
   * @param excelDateFormatterService An Excel date formatter dependency service.
   */
  constructor(private excelDateFormatterService: ExcelDateFormatterService) { }

  /** The base percentage for the tag lightness. 0 - for darkest, 100 - for lightest. */
  private readonly lightnessBase = parseFloat(document.documentElement.style.getPropertyValue('--tag-cloud-lightness-base-color-l'));

  /** The top percentage for the tag lightness. 0 - for darkest, 100 - for lightest. */
  private readonly lightnessTop = parseFloat(document.documentElement.style.getPropertyValue('--black-color-l'));

  /** The key. */
  private get courseIndexKey() { return 'Name'; }

  /**
   * Preprocesses and then calculates the frequency of occurrence of any value parts in a collection objects' property
   * based on a splitter character/string.
   *
   * @param collection The collection of objects to process.
   * @param propertyName The name of the property to process.
   * @param splitter The splitter character/string. Optional.
   * @param ai Whether to apply lexical analysis euristics when parsing each value encountered. Optional.
   *
   * @description
   * For a given object property name in the collection of objects, extracts the values, concatenates them and then calculates
   * the frequency of occurrence of any value parts based on the splitter character/string.
   *
   * @returns An array of key/value pairs of value part and an object containing its statistics including count, percentage
   * and lightness value when rendered.
   */
  public calcFrequencies(collection: any, propertyName: string, splitter: string = ', ', ai: boolean = false): [string, {}][] {
    if ((typeof collection === 'undefined')) {
      return [];
    }

    let frequencies = '';

    for (const property of collection) {
      let propertyValue = property[propertyName];

      propertyValue = this.excelDateFormatterService.formatDates(['From', 'To'], propertyName, propertyValue);

      // apply lexical analysis euristics when parsing each value encountered
      if (ai) {
        this.applyLexicalAnalysisEuristics(propertyValue, splitter);
      }

      frequencies = frequencies.concat(propertyValue, splitter);
    }

    let data = frequencies.split(splitter);
    data = data.filter(_ => _ !== '');

    if (ai) {
      data = data.map(_ => this.capitalize(_.trim()));
    }

    return this.calcPreprocessedFrequencies(data, collection, propertyName);
  }

  /**
   * Apply lexical analysis euristics to a token.
   * @param token The token to process.
   * @param splitter The splitter character/string. Optional.
   */
  private applyLexicalAnalysisEuristics(token: string, splitter: string = ', '): void {
    // conjunctions
    [' and ', '; ', 'of the ', 'mainly'].forEach(_ =>
      token = this.replaceAll(token, _, splitter));

    // skip trash words
    [' incl.', ' parts', 'on-going ', '-related'].forEach(_ =>
      token = this.replaceAll(token, _, ''));

    // skip circumstances endings
    [' at '].forEach(_ => {
      const occurrence = token.indexOf(_);
      if (occurrence > -1) {
        token = token.substr(0, occurrence);
      }
    });
  }

  /**
   * Calculates the frequency of occurrence of any value parts in a collection objects' property based on a splitter character/string.
   *
   * @param data The preprocessed collection data to process.
   * @param collection The collection of objects to process.
   * @param propertyName The name of the property to process.
   *
   * @description
   * For a given object property name in the collection of objects, extracts the values, concatenates them and then calculates
   * the frequency of occurrence of any value parts based on the splitter character/string.
   *
   * @returns An array of key/value pairs of value part and an object containing its statistics including count, percentage
   * and lightness value when rendered.
   */
  private calcPreprocessedFrequencies(data: string[], collection: any, propertyName: string): [string, {}][] {
    const wordCount: any = {};
    const length = 0;
    const min = 0;
    const max = 0;
    const ctx = { wordCount, length, min, max };

    if (propertyName === this.courseIndexKey) {
      this.processCollection(collection, ctx);
    } else {
      this.processData(data, ctx);
    }

    return this.normalizeFrequencies(ctx.wordCount, ctx.length, ctx.min, ctx.max, propertyName);
  }

  /**
   * Processes the initial collection.
   * @param collection The collection of objects to process.
   * @param ctx The context of optimisation parameters.
   *
   * @returns The modified context.
   */
  processCollection(collection: any, ctx: any): any {
    const propertyNameKey = this.courseIndexKey;
    const propertyNameValue = 'Strength';

    for (const iterator of collection) {
      const value = iterator[propertyNameValue];

      ctx.length += value;
      if (value < ctx.min) { ctx.min = value; }
      if (value > ctx.max) { ctx.max = value; }

      const newValue = value;
      ctx.wordCount[iterator[propertyNameKey]] = newValue;
    }

    return ctx;
  }

  /**
   * Processes the preprocessed collection.
   * @param data The preprocessed collection data to process.
   * @param ctx The context of optimisation parameters.
   *
   * @returns The modified context.
   */
  processData(data: string[], ctx: any): any {
    for (const iterator of data) {
      const value = ctx.wordCount[iterator];

      if (value < ctx.min) { ctx.min = value; }
      if (value > ctx.max) { ctx.max = value; }

      const newValue = (typeof value === 'undefined') ? 1 : value + 1;
      ctx.wordCount[iterator] = newValue;
    }
    ctx.length = data.length;

    return ctx;
  }

  /**
   * Normalizes frequencies and adds display properties.
   * @param wordCount The raw frequencies data array.
   * @param length The length of the array processed.
   * @param min The minimum value.
   * @param max The maximum value.
   * @param propertyName The key of the object processed.
   *
   * @returns An array of key/value pairs of value part and an object containing its statistics including count,
   * percentage and lightness value when rendered.
   */
  normalizeFrequencies(wordCount: any, length: number, min: number, max: number, propertyName: string): [string, {}][] {
    if (min === max) {
      min -= 100;
    }

    for (const i in wordCount) {
      if (wordCount.hasOwnProperty(i)) {
        wordCount[i] = {
          'Count': wordCount[i],
          'Percentage': Math.round(wordCount[i] / length * 1000) / 10,
          'Lightness': Math.round(
            ((max - wordCount[i] + 1) * this.lightnessBase + (wordCount[i] - 1 - min) * this.lightnessTop ) / (max - min)),
          get Label() {
            return StringExService.splitLine(
              i + ': ' +
              this.Count +
              (propertyName === this.courseIndexKey ? '%' : ' (' + this.Percentage + '%)')
            ).join('\n');
          }
        };
      }
    }

    return Object.entries(wordCount);
  }

  /** Replace all delegate. */
  public replaceAll(str: string, search: string | RegExp, replacement: any): string {
    return StringExService.replaceAll(str, search, replacement);
  }
  /** Capitalize delegate. */
  private capitalize(str: string): string { return StringExService.capitalize(str); }
}
