import * as Tweakpane from "tweakpane";
import { ImContainerApi } from "./ImContainerApi";
import { ImTabPageApi } from "./ImTabPageApi";

export class ImTabApi {
  public readonly tabApi: Tweakpane.TabApi;
  private __pages: { [title: string]: ImTabPageApi };

  public constructor(tabApi: Tweakpane.TabApi) {
    this.tabApi = tabApi;
    this.__pages = {};

    tabApi.pages.forEach((page) => {
      this.__pages[page.title] = new ImTabPageApi(page);
    });
  }

  public page(
    title: string,
    params?: Partial<Tweakpane.TabPageParams>,
  ): ImTabPageApi {
    if (this.__pages[title] == null) {
      const page = this.tabApi.addPage({ title, ...params });
      this.__pages[title] = new ImTabPageApi(page);
    }

    return this.__pages[title];
  }
}

// don't worry about it
ImContainerApi.imTabApiCtor = ImTabApi;
