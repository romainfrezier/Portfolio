import {TestBed} from '@angular/core/testing';
import {PhotoService} from './photo.service';

/**
 * @author Romain Frezier
 * @test
 */
describe('PhotoService', () => {
  let service: PhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhotoService]
    });
    service = TestBed.inject(PhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
