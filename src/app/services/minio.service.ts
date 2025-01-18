import {Inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {ToastService} from "@services/toast.service";
import {HttpClient} from "@angular/common/http";
import {MINIO_ENDPOINT_TOKEN} from "@app/tokens";

/**
 * @author Romain Frezier
 * @service
 * @description
 * Service for getting blog images from firebase storage
 */
@Injectable({
  providedIn: 'root'
})
export class MinioService {
  private readonly minioEndpoint: string;

  /**
   * @constructor
   * @param toastService The toast service to display errors
   * @param http The HTTP client to do requests
   * @param minioEndpoint
   */
  constructor(
    private toastService: ToastService,
    private http: HttpClient,
    @Inject(MINIO_ENDPOINT_TOKEN) minioEndpoint: string
  ) {
    this.minioEndpoint = minioEndpoint;
  }

  /**
   * List all objects in a bucket
   * @param bucket
   * @returns An observable of the list of objects in the bucket
   */
  public listAllObjects(bucket: string): Observable<string[]> {
    const url = `${this.minioEndpoint}/${bucket}?list-type=2`;

    return this.http.get(url, { responseType: 'text' }).pipe(
      map((xmlText: string): string[] => {
        const parser = new DOMParser();
        const xmlDoc: Document = parser.parseFromString(xmlText, 'application/xml');

        const keyNodes: HTMLCollectionOf<Element> = xmlDoc.getElementsByTagName('Key');
        const keys: string[] = [];

        for (let i = 0; i < keyNodes.length; i++) {
          keys.push(keyNodes.item(i)?.textContent || '');
        }

        return keys;
      })
    );
  }

  /**
   * Get an object from a bucket
   * @param bucket
   * @param key
   * @returns An observable of the object
   */
  public getObject(bucket: string, key: string): Observable<Blob> {
    const url = `${this.minioEndpoint}/${bucket}/${key}`;

    return this.http.get(url, { responseType: 'blob' }).pipe(
      map((blob: Blob): Blob => {
        if (!blob) {
          this.toastService.showError('Error when loading images from server');
        }
        return blob;
      })
    );
  }
}
