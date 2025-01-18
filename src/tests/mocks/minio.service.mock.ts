import {Observable, of} from "rxjs";
import {Injectable} from "@angular/core";
import {MinioService} from "@services/minio.service";

export const fakeMinioUrl = 'http://fake-minio:9000';
export const fakeUrls = ['mock-url-1', 'mock-url-2'];
export const fakeBucket = 'my-bucket';
export const fakeBlob = new Blob(['Test data'], {type: 'text/plain'});
export const mockedXML = `
    <ListBucketResult>
      <Contents>
        <Key>${fakeUrls[0]}</Key>
      </Contents>
      <Contents>
        <Key>${fakeUrls[1]}</Key>
      </Contents>
    </ListBucketResult>
  `;

@Injectable()
export class MinioServiceMock extends MinioService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override listAllObjects(bucket: string): Observable<string[]> {
    return of(fakeUrls);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override getObject(bucket: string, key: string): Observable<Blob> {
    return of(fakeBlob);
  }
}
