import * as Tweakpane from 'tweakpane';
import { ImBladeRackApi } from './ImBladeRackApi';
export declare class ImTabPageApi extends ImBladeRackApi<Tweakpane.TabPageApi> {
    readonly folderApi: Tweakpane.TabPageApi;
    constructor(page: Tweakpane.TabPageApi);
}
