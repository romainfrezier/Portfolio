import {TestBed} from '@angular/core/testing';
import {SafePipe} from './safe.pipe';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

describe('SafePipe', () => {
  let fixture: SafePipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    jest.clearAllMocks();
    sanitizer = TestBed.inject(DomSanitizer);
    fixture = new SafePipe(sanitizer);
  });

  it('should create an instance', () => {
    expect(fixture).toBeTruthy();
  });

  it('should sanitize a valid YouTube URL', () => {
    jest.spyOn(sanitizer, 'bypassSecurityTrustResourceUrl');
    const validUrl: string = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    const sanitizedUrl: SafeResourceUrl = fixture.transform(validUrl);
    expect(sanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalled();
    expect(sanitizedUrl).toEqual(sanitizer.bypassSecurityTrustResourceUrl(validUrl));
  });

  it('should sanitize an invalid URL to about:blank', () => {
    jest.spyOn(sanitizer, 'bypassSecurityTrustResourceUrl');
    console.error = jest.fn();
    const invalidUrl: string = 'https://www.example.com';
    const sanitizedUrl: SafeResourceUrl = fixture.transform(invalidUrl);
    expect(sanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('URL is not valid:', invalidUrl);
    expect(sanitizedUrl).toEqual(sanitizer.bypassSecurityTrustResourceUrl('about:blank'));
  });

  it('should return a safe URL for valid YouTube URL', () => {
    jest.spyOn(sanitizer, 'bypassSecurityTrustResourceUrl');
    const validUrl: string = 'https://youtu.be/dQw4w9WgXcQ';
    const sanitizedUrl: SafeResourceUrl = fixture.transform(validUrl);
    expect(sanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(validUrl);
    expect(sanitizedUrl).toEqual(sanitizer.bypassSecurityTrustResourceUrl(validUrl));
  });

  it('should log an error for invalid URL', () => {
    console.error = jest.fn();
    const invalidUrl: string = 'https://www.invalidurl.com';
    fixture.transform(invalidUrl);
    expect(console.error).toHaveBeenCalledWith('URL is not valid:', invalidUrl);
  });

  it('should validate YouTube URLs correctly', () => {
    const validUrls: string[] = [
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      'https://youtu.be/dQw4w9WgXcQ'
    ];
    const invalidUrls: string[] = [
      'https://www.example.com',
      'https://vimeo.com/123456'
    ];

    validUrls.forEach(url => {
      expect(fixture['isValidYoutubeUrl'](url)).toBe(true);
    });

    invalidUrls.forEach(url => {
      expect(fixture['isValidYoutubeUrl'](url)).toBe(false);
    });
  });
});
