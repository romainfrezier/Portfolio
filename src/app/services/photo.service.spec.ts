import {TestBed} from '@angular/core/testing';
import {PhotoService} from './photo.service';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AngularFireStorageMock} from "@tests/mocks/angular-fire-storage.mock";

/**
 * @author Romain Frezier
 * @test
 */
describe('PhotoService', () => {
  let service: PhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PhotoService,
        {provide: AngularFireStorage, useClass: AngularFireStorageMock},
        {provide: 'angularfire2.app.options', useValue: {}}
      ]
    });
    service = TestBed.inject(PhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
