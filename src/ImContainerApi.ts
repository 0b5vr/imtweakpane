import * as Tweakpane from 'tweakpane';
import { BladeController, BindingApi, ContainerApi, View } from '@tweakpane/core';
import type { ImFolderApi } from './ImFolderApi';
import type { ImTabApi } from './ImTabApi';

export class ImContainerApi<TContainerApi extends ContainerApi> {
  /**
   * Don't worry about it
   */
  public static imFolderApiCtor?: typeof ImFolderApi;

  /**
   * Don't worry about it
   */
  public static imTabApiCtor?: typeof ImTabApi;

  public readonly containerApi: TContainerApi;
  private readonly __params: { [ key: string ]: any };
  private readonly __folders: { [ title: string ]: ImFolderApi };
  private readonly __buttons: { [ title: string ]: Tweakpane.ButtonApi };
  private readonly __tabs: { [ id: string ]: ImTabApi };
  private readonly __bindings: { [ key: string ]: BindingApi<unknown, any, any> };
  private readonly __blades: { [ key: string ]: Tweakpane.BladeApi<BladeController<View>> };

  public constructor( container: TContainerApi ) {
    this.containerApi = container;
    this.__params = {};
    this.__folders = {};
    this.__buttons = {};
    this.__tabs = {};
    this.__bindings = {};
    this.__blades = {};
  }

  public folder( title: string, params?: Partial<Tweakpane.FolderParams> ): ImFolderApi {
    const path = title.split( '/' );
    if ( path.length > 1 ) {
      const folder = path[ 0 ];
      const remainingPath = path.slice( 1 ).join( '/' );
      return this.folder( folder ).folder( remainingPath, params );
    }

    if ( !ImContainerApi.imFolderApiCtor ) {
      throw new Error( process.env.NODE_ENV === 'development' ? 'ImContainerApi.imFolderApiCtor is not set' : undefined );
    }

    if ( this.__folders[ title ] == null ) {
      const folder = this.containerApi.addFolder( { title, ...params } );
      this.__folders[ title ] = new ImContainerApi.imFolderApiCtor( folder );
    }

    return this.__folders[ title ];
  }

  public button(
    title: string,
    params?: Partial<Tweakpane.ButtonParams>,
  ): Tweakpane.ButtonApi {
    const path = title.split( '/' );
    if ( path.length > 1 ) {
      const folder = path[ 0 ];
      const remainingPath = path.slice( 1 ).join( '/' );
      return this.folder( folder ).button( remainingPath, params );
    }

    if ( this.__buttons[ title ] == null ) {
      const button = this.containerApi.addButton( { title, ...params } );
      this.__buttons[ title ] = button;
    }

    return this.__buttons[ title ];
  }

  public tab(
    id: string,
    params?: Tweakpane.TabParams,
  ): ImTabApi {
    const path = id.split( '/' );
    if ( path.length > 1 ) {
      const folder = path[ 0 ];
      const remainingPath = path.slice( 1 ).join( '/' );
      return this.folder( folder ).tab( remainingPath, params );
    }

    if ( !ImContainerApi.imTabApiCtor ) {
      throw new Error( process.env.NODE_ENV === 'development' ? 'ImContainerApi.imTabApiCtor is not set' : undefined );
    }

    if ( this.__tabs[ id ] == null ) {
      const tab = this.containerApi.addTab( params ?? { pages: [] } );
      this.__tabs[ id ] = new ImContainerApi.imTabApiCtor( tab );
    }

    return this.__tabs[ id ];
  }

  public value<T extends any>(
    key: string,
    init?: T,
    params?: Tweakpane.BindingParams,
  ): T | null {
    const path = key.split( '/' );
    if ( path.length > 1 ) {
      const folder = path[ 0 ];
      const remainingPath = path.slice( 1 ).join( '/' );
      return this.folder( folder ).value( remainingPath, init, params );
    }

    this.binding( key, init, params );

    return ( this.__params[ key ] as T | undefined ) ?? null;
  }

  public binding<T extends any>(
    key: string,
    init?: T,
    params?: Tweakpane.BindingParams,
  ): Tweakpane.InputBindingApi<unknown, T> | null {
    const path = key.split( '/' );
    if ( path.length > 1 ) {
      const folder = path[ 0 ];
      const remainingPath = path.slice( 1 ).join( '/' );
      return this.folder( folder ).binding( remainingPath, init, params );
    }

    if ( init != null ) {
      if ( this.__params[ key ] == null ) {
        this.__params[ key ] = init;
        const binding = this.containerApi.addBinding( this.__params, key, params );
        this.__bindings[ key ] = binding;
      } else if ( params?.readonly ) {
        this.__params[ key ] = init;
      }
    }

    return this.__bindings[ key ] ?? null;
  }

  public blade(
    id: string,
    params?: Tweakpane.BaseBladeParams,
  ): Tweakpane.BladeApi<BladeController<View>> | null {
    const path = id.split( '/' );
    if ( path.length > 1 ) {
      const folder = path[ 0 ];
      const remainingPath = path.slice( 1 ).join( '/' );
      return this.folder( folder ).blade( remainingPath, params );
    }

    if ( this.__blades[ id ] == null && params != null ) {
      const blade = this.containerApi.addBlade( params );
      this.__blades[ id ] = blade;
    }

    return this.__blades[ id ];
  }
}
