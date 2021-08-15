import * as Tweakpane from 'tweakpane';
import { ImBladeRackApi } from './ImBladeRackApi';
export declare class ImTabPageApi extends ImBladeRackApi<Tweakpane.TabPageApi> {
    get folderApi(): Tweakpane.TabPageApi;
    constructor(page: Tweakpane.TabPageApi);
}
