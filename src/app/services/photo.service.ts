import {Injectable} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {from, Observable, switchMap} from "rxjs";

/**
 * @author Romain Frezier
 * @service
 * @description
 * Service for getting blog images from firebase storage
 */
@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  /**
   * @constructor
   * @param storage The firebase storage service
   */
  constructor(private storage: AngularFireStorage) {
  }

  /**
   * Get all images from the storage
   */
  public getImages(): Observable<string[]> {
    const storageRef = this.storage.ref('/');
    return storageRef.listAll().pipe(
      switchMap(result => {
        const urlPromises = result.items.map(itemRef => itemRef.getDownloadURL());
        return from(Promise.all(urlPromises));
      })
    );
  }
}
