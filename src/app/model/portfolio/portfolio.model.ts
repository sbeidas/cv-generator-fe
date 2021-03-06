import { Injectable } from '@angular/core';

import { Cv as CV } from '../../classes/cv/cv';
import { Entities } from '../../classes/entities/entities';
import { Ui as UI } from '../../classes/ui/ui';

import { Indexable } from '../..//interfaces/indexable';
import { ProfessionalExperience } from '../../interfaces/cv/professional-experience';
import { Education } from '../../interfaces/cv/education';
import { Course } from '../../interfaces/cv/course';
import { Publication } from '../../interfaces/cv/publication';
import { Project} from '../../interfaces/project/project';

/**
 * A portfolio model.
 */
@Injectable({
  providedIn: 'root'
})
export class PortfolioModel {
  /** CV data. */
  public cv = new CV();
  /** Entities data. */
  public entities = new Entities();
  /** Projects data. */
  public projects = new Array<Project>();
  /** UI data. */
  public ui = new UI();

  /** Aggregation count cache. */
  public countCache: Indexable = {};

  /** Filtered professional experience for the current search context. */
  public filteredProfessionalExperience: ProfessionalExperience[] = [];
  /** Filtered education for the current search context. */
  public filteredEducation: Education[] = [];

  /** Filtered certifications for the current search context. */
  public filteredCertifications: Course[] = [];
  /** Filtered accomplishments for the current search context. */
  public filteredAccomplishments: Course[] = [];
  /** Filtered publications for the current search context. */
  public filteredPublications: Publication[] = [];

  /** Filtered projects for the current search context. */
  public filteredProjects: Project[] = [];

  /** Search query string expression. */
  public searchToken = '';

  /**
   * Constructs the portfolio model.
   * ~constructor
   */
  constructor(
  ) {
  }
}
