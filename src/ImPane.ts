import * as Tweakpane from 'tweakpane';
import { ImBladeRackApi } from './ImBladeRackApi'; // oo
import { PaneConfig } from 'tweakpane/dist/types/pane/pane-config';

export class ImPane extends ImBladeRackApi<Tweakpane.Pane> {
  public get pane(): Tweakpane.Pane {
    return this.bladeRackApi;
  }

  public constructor( config?: PaneConfig ) {
    super( new Tweakpane.Pane( config ) );
  }
}
