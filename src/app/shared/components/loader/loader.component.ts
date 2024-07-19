import {Component, Input} from '@angular/core';

/**
 * @author Romain Frezier
 * @component
 * @description
 * This component displays a spinning loader
 */
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  /**
   * Size of the loader in pixels
   * @default 50px
   */
  @Input() size: string = "50px";
  /**
   * Border size of the loader in pixels
   * @default 10px
   */
  @Input() borderWidth: string = "10px";
}
