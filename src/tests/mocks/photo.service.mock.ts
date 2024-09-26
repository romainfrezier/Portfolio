import {Observable, of} from "rxjs";
import {Injectable} from "@angular/core";
import {PhotoService} from "@services/photo.service";

export const fakeUrls = ['mock-url-1', 'mock-url-2'];

@Injectable()
export class PhotoServiceMock extends PhotoService {
  override getImages(): Observable<string[]> {
    return of(fakeUrls);
  }
}
