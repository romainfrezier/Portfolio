import {TestBed} from '@angular/core/testing';
import {PhotoService} from './photo.service';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {of} from "rxjs";
import {fakeUrls} from "@tests/mocks/photo.service.mock";
import {mockAngularFireStorage, mockStorageRef} from "@tests/mocks/firebase.storage.mock";
import DoneCallback = jest.DoneCallback;

/**
 * @author Romain Frezier
 * @test
 */
describe('PhotoService', () => {
  let service: PhotoService;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      providers: [
        PhotoService,
        {provide: AngularFireStorage, useValue: mockAngularFireStorage},
        {provide: 'angularfire2.app.options', useValue: {}}
      ]
    });
    service = TestBed.inject(PhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of image URLs', (done: DoneCallback): void => {
    service.getImages().subscribe((images: string[]): void => {
      expect(images.length).toBe(2);
      expect(images).toEqual(fakeUrls);
      done();
    });
  });

  it('should return an empty array if no images are found', (done: DoneCallback): void => {
    mockStorageRef.listAll = () => of({ items: [] });

    service.getImages().subscribe((images: string[]) => {
      expect(images.length).toBe(0);
      done();
    });
  });
});
