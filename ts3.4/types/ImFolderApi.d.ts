import * as Tweakpane from 'tweakpane';
import { ImBladeRackApi } from './ImBladeRackApi';
export declare class ImFolderApi extends ImBladeRackApi<Tweakpane.FolderApi> {
    readonly folderApi: Tweakpane.FolderApi;
    constructor(folder: Tweakpane.FolderApi);
}
