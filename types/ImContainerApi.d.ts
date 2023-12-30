import * as Tweakpane from "tweakpane";
import { BladeController, ContainerApi, View } from "@tweakpane/core";
import type { ImFolderApi } from "./ImFolderApi";
import type { ImTabApi } from "./ImTabApi";
export declare class ImContainerApi<TContainerApi extends ContainerApi> {
    /**
     * Don't worry about it
     */
    static imFolderApiCtor?: typeof ImFolderApi;
    /**
     * Don't worry about it
     */
    static imTabApiCtor?: typeof ImTabApi;
    readonly containerApi: TContainerApi;
    private readonly __params;
    private readonly __folders;
    private readonly __buttons;
    private readonly __tabs;
    private readonly __bindings;
    private readonly __blades;
    constructor(container: TContainerApi);
    folder(title: string, params?: Partial<Tweakpane.FolderParams>): ImFolderApi;
    button(title: string, params?: Partial<Tweakpane.ButtonParams>): Tweakpane.ButtonApi;
    tab(id: string, params?: Tweakpane.TabParams): ImTabApi;
    value<T extends any>(key: string, init?: T, params?: Tweakpane.BindingParams): T | null;
    binding<T extends any>(key: string, init?: T, params?: Tweakpane.BindingParams): Tweakpane.InputBindingApi<unknown, T> | null;
    blade(id: string, params?: Tweakpane.BaseBladeParams): Tweakpane.BladeApi<BladeController<View>> | null;
}
