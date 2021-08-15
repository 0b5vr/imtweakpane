import * as Tweakpane from 'tweakpane';
import { ImBladeRackApi } from './ImBladeRackApi';

export class ImTabPageApi extends ImBladeRackApi<Tweakpane.TabPageApi> {
  public get folderApi(): Tweakpane.TabPageApi {
    return this.bladeRackApi;
  }

  public constructor( page: Tweakpane.TabPageApi ) {
    super( page );
  }
}
