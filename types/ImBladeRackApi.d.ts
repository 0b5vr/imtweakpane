import * as Tweakpane from 'tweakpane';
import { BladeController, View } from '@tweakpane/core';
import type { BladeRackApi } from '@tweakpane/core/dist/cjs/blade/common/api/blade-rack';
import type { ImFolderApi } from './ImFolderApi';
import type { ImTabApi } from './ImTabApi';
export declare class ImBladeRackApi<TBladeRackApi extends BladeRackApi> {
    /**
     * Don't worry about it
     */
    static imFolderApiCtor?: typeof ImFolderApi;
    /**
     * Don't worry about it
     */
    static imTabApiCtor?: typeof ImTabApi;
    readonly bladeRackApi: TBladeRackApi;
    private readonly __params;
    private readonly __folders;
    private readonly __buttons;
    private readonly __tabs;
    private readonly __separators;
    private readonly __inputs;
    private readonly __monitors;
    private readonly __blades;
    constructor(bladeRack: TBladeRackApi);
    folder(title: string, params?: Partial<Tweakpane.FolderParams>): ImFolderApi;
    button(title: string, params?: Partial<Tweakpane.ButtonParams>): Tweakpane.ButtonApi;
    tab(id: string, params?: Tweakpane.TabParams): ImTabApi;
    separator(id: string, params?: Tweakpane.BaseParams): Tweakpane.SeparatorApi;
    value<T extends any>(key: string, init: T, params?: Tweakpane.InputParams): T;
    input<T extends any>(key: string, init: T, params?: Tweakpane.InputParams): Tweakpane.InputBindingApi<unknown, T>;
    monitor<T>(key: string, value: T, params?: Tweakpane.MonitorParams): Tweakpane.MonitorBindingApi<T>;
    blade(id: string, params: Tweakpane.BaseBladeParams): Tweakpane.BladeApi<BladeController<View>>;
}
