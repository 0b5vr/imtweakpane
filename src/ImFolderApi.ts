import * as Tweakpane from 'tweakpane';
import { ImBladeRackApi } from './ImBladeRackApi';

export class ImFolderApi extends ImBladeRackApi<Tweakpane.FolderApi> {
  public get folderApi(): Tweakpane.FolderApi {
    return this.bladeRackApi;
  }

  public constructor( folder: Tweakpane.FolderApi ) {
    super( folder );
  }
}

// don't worry about it
ImBladeRackApi.imFolderApiCtor = ImFolderApi;
