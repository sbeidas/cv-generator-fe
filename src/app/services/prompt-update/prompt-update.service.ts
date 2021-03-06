import { Injectable } from '@angular/core';
import { SwUpdate, UpdateAvailableEvent } from '@angular/service-worker';
import { take } from 'rxjs/operators';

/**
 * The progressive web app update prompt service.
 */
@Injectable({
  providedIn: 'root'
})
export class PromptUpdateService {

  /**
   * Constructs the update prompt.
   * ~constructor
   * @param swUpdate The injected software updater.
   */
  constructor(private swUpdate: SwUpdate) {
    swUpdate.available.pipe(take(1)).subscribe(event => {
      if (this.promptUser(event)) {
        swUpdate.activateUpdate()
          .then(() => {
            // console.log('Debug: [App] activateUpdate completed');
            document.location.reload();
          })
          .catch(err => {
            // console.error(err);
          });
      }
    });
  }

  /**
   * Prompt the user.
   * @param event The event to notify about.
   *
   * @returns User consent.
   */
  private promptUser(event: UpdateAvailableEvent): boolean { return true; }
}
