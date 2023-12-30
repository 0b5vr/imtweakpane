import * as Tweakpane from "tweakpane";
import { ImContainerApi } from "./ImContainerApi";

export class ImTabPageApi extends ImContainerApi<Tweakpane.TabPageApi> {
  public get folderApi(): Tweakpane.TabPageApi {
    return this.containerApi;
  }

  public constructor(page: Tweakpane.TabPageApi) {
    super(page);
  }
}
