import * as Tweakpane from 'tweakpane';
import { ImBladeRackApi } from './ImBladeRackApi';
import { PaneConfig } from 'tweakpane/dist/types/pane/pane-config';
export declare class ImPane extends ImBladeRackApi<Tweakpane.Pane> {
    readonly pane: Tweakpane.Pane;
    constructor(config?: PaneConfig);
}
