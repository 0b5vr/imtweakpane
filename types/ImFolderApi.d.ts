import * as Tweakpane from 'tweakpane';
import { ImBladeRackApi } from './ImBladeRackApi';
export declare class ImFolderApi extends ImBladeRackApi<Tweakpane.FolderApi> {
    get folderApi(): Tweakpane.FolderApi;
    constructor(folder: Tweakpane.FolderApi);
}
