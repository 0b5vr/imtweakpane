import * as Tweakpane from 'tweakpane';
import { ImTabPageApi } from './ImTabPageApi';
export declare class ImTabApi {
    readonly tabApi: Tweakpane.TabApi;
    private __pages;
    constructor(tabApi: Tweakpane.TabApi);
    page(title: string, params?: Partial<Tweakpane.TabPageParams>): ImTabPageApi;
}
