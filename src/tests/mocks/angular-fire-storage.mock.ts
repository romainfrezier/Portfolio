import {of} from "rxjs";

export class AngularFireStorageMock {
  ref() {
    return {
      listAll: () => of({
        items: [
          { getDownloadURL: () => Promise.resolve('mock-download-url-1') },
          { getDownloadURL: () => Promise.resolve('mock-download-url-2') }
        ]
      }),
      getDownloadURL: () => of('mock-download-url')
    };
  }
}
