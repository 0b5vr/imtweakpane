import { Pane } from "tweakpane";
import { ImContainerApi } from "./ImContainerApi";
import { PaneConfig } from "tweakpane/dist/types/pane/pane-config";
export declare class ImPane extends ImContainerApi<Pane> {
    get pane(): Pane;
    constructor(config?: PaneConfig);
}
