import {TestBed} from '@angular/core/testing';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {MinioService} from './minio.service';
import {ToastService} from '@services/toast.service';
import {MINIO_ENDPOINT_TOKEN} from "@app/tokens";
import {fakeBlob, fakeBucket, fakeMinioUrl, fakeUrls, mockedXML} from "@tests/mocks/minio.service.mock";

describe('MinioService', () => {
  let service: MinioService;
  let httpMock: HttpTestingController;
  let toastServiceMock: jest.Mocked<ToastService>;

  beforeEach(() => {
    toastServiceMock = {
      showError: jest.fn(),
    } as unknown as jest.Mocked<ToastService>;

    TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting(),
        {provide: ToastService, useValue: toastServiceMock},
        {provide: MINIO_ENDPOINT_TOKEN, useValue: fakeMinioUrl},
        MinioService,
      ],
    });

    service = TestBed.inject(MinioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('should list all objects from the bucket', (done) => {
    service.listAllObjects(fakeBucket).subscribe((keys) => {
      expect(keys).toEqual(fakeUrls);
      done();
    });

    const req = httpMock.expectOne(`${fakeMinioUrl}/${fakeBucket}?list-type=2`);
    expect(req.request.method).toBe('GET');

    req.flush(mockedXML);
  });

  it('should get an object from the bucket', (done) => {
    service.getObject(fakeBucket, 'image1.jpg').subscribe((blob) => {
      expect(blob).toBeInstanceOf(Blob);
      done();
    });

    const req = httpMock.expectOne(`${fakeMinioUrl}/${fakeBucket}/image1.jpg`);
    expect(req.request.method).toBe('GET');

    req.flush(fakeBlob);
  });

  it('should call toastService.showError when blob is empty', (done) => {
    service.getObject(fakeBucket, 'image2.jpg').subscribe((blob) => {
      expect(toastServiceMock.showError).toHaveBeenCalledWith('Error when loading images from server');
      expect(blob).toBeNull();
      done();
    });

    const req = httpMock.expectOne(`${fakeMinioUrl}/${fakeBucket}/image2.jpg`);
    expect(req.request.method).toBe('GET');

    req.flush(null);
  });
});
