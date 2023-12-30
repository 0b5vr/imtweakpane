import { Pane } from 'tweakpane';
import { ImContainerApi } from './ImContainerApi';
import { PaneConfig } from 'tweakpane/dist/types/pane/pane-config';

export class ImPane extends ImContainerApi<Pane> {
  public get pane(): Pane {
    return this.containerApi;
  }

  public constructor( config?: PaneConfig ) {
    super( new Pane( config ) );
  }
}
