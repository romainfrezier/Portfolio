import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Pipe({
  name: 'safe',
})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url: string): SafeResourceUrl {
    if (this.isValidYoutubeUrl(url)) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } else {
      console.error('URL is not valid:', url);
      return this.sanitizer.bypassSecurityTrustResourceUrl('about:blank');
    }
  }

  private isValidYoutubeUrl(url: string): boolean {
    const youtubePattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/i;
    return youtubePattern.test(url);
  }
}
