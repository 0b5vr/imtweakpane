import * as Tweakpane from 'tweakpane';
import { FolderApi } from '@tweakpane/core';
import { ImContainerApi } from './ImContainerApi';

export class ImFolderApi extends ImContainerApi<FolderApi> {
  public get folderApi(): Tweakpane.FolderApi {
    return this.containerApi;
  }

  public constructor( folder: Tweakpane.FolderApi ) {
    super( folder );
  }
}

// don't worry about it
ImContainerApi.imFolderApiCtor = ImFolderApi;
