import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

/**
 * @author Romain Frezier
 * @pipe
 * @description
 * A pipe that sanitizes YouTube URLs to be safely used in resource contexts.
 */
@Pipe({
  name: 'safe',
})
export class SafePipe implements PipeTransform {
  /**
   * @constructor
   * @param sanitizer - The DomSanitizer service used to bypass Angular's security.
   */
  constructor(private sanitizer: DomSanitizer) {}

  /**
   * Transforms the input URL into a safe resource URL if it is a valid YouTube URL.
   * @param url - The URL to be sanitized.
   * @returns A SafeResourceUrl if the URL is valid; otherwise, a SafeResourceUrl pointing to 'about:blank'.
   */
  transform(url: string): SafeResourceUrl {
    if (this.isValidYoutubeUrl(url)) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } else {
      console.error('URL is not valid:', url);
      return this.sanitizer.bypassSecurityTrustResourceUrl('about:blank');
    }
  }

  /**
   * Validates if the provided URL is a valid YouTube URL.
   * @param url - The URL to be validated.
   * @returns A boolean indicating whether the URL is a valid YouTube URL.
   */
  private isValidYoutubeUrl(url: string): boolean {
    const youtubePattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/i;
    return youtubePattern.test(url);
  }
}
