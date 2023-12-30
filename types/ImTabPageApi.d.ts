import * as Tweakpane from "tweakpane";
import { ImContainerApi } from "./ImContainerApi";
export declare class ImTabPageApi extends ImContainerApi<Tweakpane.TabPageApi> {
    get folderApi(): Tweakpane.TabPageApi;
    constructor(page: Tweakpane.TabPageApi);
}
