import * as Tweakpane from 'tweakpane';
import { BladeController, View } from '@tweakpane/core'; // brutal!
import type { BladeRackApi } from '@tweakpane/core/dist/cjs/blade/common/api/blade-rack';
import type { ImFolderApi } from './ImFolderApi';
import type { ImTabApi } from './ImTabApi';

export class ImBladeRackApi<TBladeRackApi extends BladeRackApi> {
  /**
   * Don't worry about it
   */
  public static imFolderApiCtor?: typeof ImFolderApi;

  /**
   * Don't worry about it
   */
  public static imTabApiCtor?: typeof ImTabApi;

  public readonly bladeRackApi: TBladeRackApi;
  private readonly __params: { [ key: string ]: any };
  private readonly __folders: { [ title: string ]: ImFolderApi };
  private readonly __buttons: { [ title: string ]: Tweakpane.ButtonApi };
  private readonly __tabs: { [ id: string ]: ImTabApi };
  private readonly __separators: { [ id: string ]: Tweakpane.SeparatorApi };
  private readonly __inputs: { [ key: string ]: Tweakpane.InputBindingApi<unknown, any> };
  private readonly __monitors: { [ key: string ]: Tweakpane.MonitorBindingApi<any> };
  private readonly __blades: { [ key: string ]: Tweakpane.BladeApi<BladeController<View>> };

  public constructor( bladeRack: TBladeRackApi ) {
    this.bladeRackApi = bladeRack;
    this.__params = {};
    this.__folders = {};
    this.__buttons = {};
    this.__tabs = {};
    this.__separators = {};
    this.__inputs = {};
    this.__monitors = {};
    this.__blades = {};
  }

  public folder( title: string, params?: Partial<Tweakpane.FolderParams> ): ImFolderApi {
    const path = title.split( '/' );
    if ( path.length > 1 ) {
      const folder = path[ 0 ];
      const remainingPath = path.slice( 1 ).join( '/' );
      return this.folder( folder ).folder( remainingPath, params );
    }

    if ( !ImBladeRackApi.imFolderApiCtor ) {
      throw new Error( process.env.NODE_ENV === 'development' ? 'ImBladeRackApi.imFolderApiCtor is not set' : undefined );
    }

    if ( this.__folders[ title ] == null ) {
      const folder = this.bladeRackApi.addFolder( { title, ...params } );
      this.__folders[ title ] = new ImBladeRackApi.imFolderApiCtor( folder );
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
      const button = this.bladeRackApi.addButton( { title, ...params } );
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

    if ( !ImBladeRackApi.imTabApiCtor ) {
      throw new Error( process.env.NODE_ENV === 'development' ? 'ImBladeRackApi.imTabApiCtor is not set' : undefined );
    }

    if ( this.__tabs[ id ] == null ) {
      const tab = this.bladeRackApi.addTab( params ?? { pages: [] } );
      this.__tabs[ id ] = new ImBladeRackApi.imTabApiCtor( tab );
    }

    return this.__tabs[ id ];
  }

  public separator(
    id: string,
    params?: Tweakpane.BaseParams,
  ): Tweakpane.SeparatorApi {
    const path = id.split( '/' );
    if ( path.length > 1 ) {
      const folder = path[ 0 ];
      const remainingPath = path.slice( 1 ).join( '/' );
      return this.folder( folder ).separator( remainingPath, params );
    }

    if ( this.__separators[ id ] == null ) {
      const separator = this.bladeRackApi.addSeparator( params );
      this.__separators[ id ] = separator;
    }

    return this.__separators[ id ];
  }

  public value<T extends any>(
    key: string,
    init?: T,
    params?: Tweakpane.InputParams,
  ): T | null {
    const path = key.split( '/' );
    if ( path.length > 1 ) {
      const folder = path[ 0 ];
      const remainingPath = path.slice( 1 ).join( '/' );
      return this.folder( folder ).value( remainingPath, init, params );
    }

    this.input( key, init, params );

    return ( this.__params[ key ] as T | undefined ) ?? null;
  }

  public input<T extends any>(
    key: string,
    init?: T,
    params?: Tweakpane.InputParams,
  ): Tweakpane.InputBindingApi<unknown, T> | null {
    const path = key.split( '/' );
    if ( path.length > 1 ) {
      const folder = path[ 0 ];
      const remainingPath = path.slice( 1 ).join( '/' );
      return this.folder( folder ).input( remainingPath, init, params );
    }

    if ( this.__params[ key ] == null && init != null ) {
      this.__params[ key ] = init;
      const input = this.bladeRackApi.addInput( this.__params, key, params );
      this.__inputs[ key ] = input;
    }

    return this.__inputs[ key ] ?? null;
  }

  public monitor<T>(
    key: string,
    value?: T,
    params?: Tweakpane.MonitorParams,
  ): Tweakpane.MonitorBindingApi<T> | null {
    const path = key.split( '/' );
    if ( path.length > 1 ) {
      const folder = path[ 0 ];
      const remainingPath = path.slice( 1 ).join( '/' );
      return this.folder( folder ).monitor( remainingPath, value, params );
    }

    if ( this.__params[ key ] == null && value != null ) {
      this.__params[ key ] = value;
      const monitor = this.bladeRackApi.addMonitor( this.__params, key, params );
      this.__monitors[ key ] = monitor;
    }

    if ( value !== undefined && value !== this.__params[ key ] ) {
      this.__params[ key ] = value;
    }

    return this.__monitors[ key ] ?? null;
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
      const blade = this.bladeRackApi.addBlade( params );
      this.__blades[ id ] = blade;
    }

    return this.__blades[ id ];
  }
}
