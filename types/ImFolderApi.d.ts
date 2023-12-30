import * as Tweakpane from "tweakpane";
import { FolderApi } from "@tweakpane/core";
import { ImContainerApi } from "./ImContainerApi";
export declare class ImFolderApi extends ImContainerApi<FolderApi> {
    get folderApi(): Tweakpane.FolderApi;
    constructor(folder: Tweakpane.FolderApi);
}
