import {Observable, of} from "rxjs";
import {fakeUrls} from "@tests/mocks/photo.service.mock";

export type MockStorageRef = {
  listAll: () => Observable<{ items: { getDownloadURL: () => Promise<string> }[] }>;
};

export type MockAngularFireStorage = {
  ref: () => MockStorageRef;
};

export const mockStorageRef: MockStorageRef = {
  listAll: () => of({
    items: [
      { getDownloadURL: () => Promise.resolve(fakeUrls[0]) },
      { getDownloadURL: () => Promise.resolve(fakeUrls[1]) }
    ]
  })
};

export const mockAngularFireStorage: MockAngularFireStorage = {
  ref: () => mockStorageRef
};
