/*!
 * @0b5vr/imtweakpane v0.1.1
 * Tweakpane but with immediate-y interface (actually not)
 *
 * Copyright (c) 2021 0b5vr
 * @0b5vr/imtweakpane is distributed under MIT License
 * https://github.com/0b5vr/imtweakpane/blob/master/LICENSE
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('tweakpane')) :
    typeof define === 'function' && define.amd ? define(['exports', 'tweakpane'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.IMTWEAKPANE = {}, global.Tweakpane));
}(this, (function (exports, Tweakpane) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var Tweakpane__namespace = /*#__PURE__*/_interopNamespace(Tweakpane);

    class ImBladeRackApi {
        constructor(bladeRack) {
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
        folder(title, params) {
            if (!ImBladeRackApi.imFolderApiCtor) {
                throw new Error('ImBladeRackApi.imFolderApiCtor is not set' );
            }
            if (this.__folders[title] == null) {
                const folder = this.bladeRackApi.addFolder(Object.assign({ title }, params));
                this.__folders[title] = new ImBladeRackApi.imFolderApiCtor(folder);
            }
            return this.__folders[title];
        }
        button(title, params) {
            if (this.__buttons[title] == null) {
                const button = this.bladeRackApi.addButton(Object.assign({ title }, params));
                this.__buttons[title] = button;
            }
            return this.__buttons[title];
        }
        tab(id, params) {
            if (!ImBladeRackApi.imTabApiCtor) {
                throw new Error('ImBladeRackApi.imTabApiCtor is not set' );
            }
            if (this.__tabs[id] == null) {
                const tab = this.bladeRackApi.addTab(params !== null && params !== void 0 ? params : { pages: [] });
                this.__tabs[id] = new ImBladeRackApi.imTabApiCtor(tab);
            }
            return this.__tabs[id];
        }
        separator(id, params) {
            if (this.__separators[id] == null) {
                const separator = this.bladeRackApi.addSeparator(params);
                this.__separators[id] = separator;
            }
            return this.__separators[id];
        }
        value(key, init, params) {
            this.input(key, init, params);
            return this.__params[key];
        }
        input(key, init, params) {
            if (this.__params[key] == null) {
                this.__params[key] = init;
                const input = this.bladeRackApi.addInput(this.__params, key, params);
                this.__inputs[key] = input;
            }
            return this.__inputs[key];
        }
        monitor(key, value, params) {
            if (this.__params[key] == null) {
                this.__params[key] = value;
                const monitor = this.bladeRackApi.addMonitor(this.__params, key, params);
                this.__monitors[key] = monitor;
            }
            if (value !== undefined && value !== this.__params[key]) {
                this.__params[key] = value;
            }
            return this.__monitors[key];
        }
        blade(id, params) {
            if (this.__blades[id] == null) {
                const blade = this.bladeRackApi.addBlade(params);
                this.__blades[id] = blade;
            }
            return this.__blades[id];
        }
    }

    class ImFolderApi extends ImBladeRackApi {
        get folderApi() {
            return this.bladeRackApi;
        }
        constructor(folder) {
            super(folder);
        }
    }
    // don't worry about it
    ImBladeRackApi.imFolderApiCtor = ImFolderApi;

    class ImPane extends ImBladeRackApi {
        get pane() {
            return this.bladeRackApi;
        }
        constructor(config) {
            super(new Tweakpane__namespace.Pane(config));
        }
    }

    class ImTabPageApi extends ImBladeRackApi {
        get folderApi() {
            return this.bladeRackApi;
        }
        constructor(page) {
            super(page);
        }
    }

    class ImTabApi {
        constructor(tabApi) {
            this.tabApi = tabApi;
            this.__pages = {};
            tabApi.pages.forEach((page) => {
                this.__pages[page.title] = new ImTabPageApi(page);
            });
        }
        page(title, params) {
            if (this.__pages[title] == null) {
                const page = this.tabApi.addPage(Object.assign({ title }, params));
                this.__pages[title] = new ImTabPageApi(page);
            }
            return this.__pages[title];
        }
    }
    // don't worry about it
    ImBladeRackApi.imTabApiCtor = ImTabApi;

    exports.ImBladeRackApi = ImBladeRackApi;
    exports.ImFolderApi = ImFolderApi;
    exports.ImPane = ImPane;
    exports.ImTabApi = ImTabApi;
    exports.ImTabPageApi = ImTabPageApi;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW10d2Vha3BhbmUuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9JbUJsYWRlUmFja0FwaS50cyIsIi4uL3NyYy9JbUZvbGRlckFwaS50cyIsIi4uL3NyYy9JbVBhbmUudHMiLCIuLi9zcmMvSW1UYWJQYWdlQXBpLnRzIiwiLi4vc3JjL0ltVGFiQXBpLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFR3ZWFrcGFuZSBmcm9tICd0d2Vha3BhbmUnO1xuaW1wb3J0IHsgQmxhZGVDb250cm9sbGVyLCBWaWV3IH0gZnJvbSAnQHR3ZWFrcGFuZS9jb3JlJzsgLy8gYnJ1dGFsIVxuaW1wb3J0IHR5cGUgeyBCbGFkZVJhY2tBcGkgfSBmcm9tICdAdHdlYWtwYW5lL2NvcmUvZGlzdC9janMvYmxhZGUvY29tbW9uL2FwaS9ibGFkZS1yYWNrJztcbmltcG9ydCB0eXBlIHsgSW1Gb2xkZXJBcGkgfSBmcm9tICcuL0ltRm9sZGVyQXBpJztcbmltcG9ydCB0eXBlIHsgSW1UYWJBcGkgfSBmcm9tICcuL0ltVGFiQXBpJztcblxuZXhwb3J0IGNsYXNzIEltQmxhZGVSYWNrQXBpPFRCbGFkZVJhY2tBcGkgZXh0ZW5kcyBCbGFkZVJhY2tBcGk+IHtcbiAgLyoqXG4gICAqIERvbid0IHdvcnJ5IGFib3V0IGl0XG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGltRm9sZGVyQXBpQ3Rvcj86IHR5cGVvZiBJbUZvbGRlckFwaTtcblxuICAvKipcbiAgICogRG9uJ3Qgd29ycnkgYWJvdXQgaXRcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgaW1UYWJBcGlDdG9yPzogdHlwZW9mIEltVGFiQXBpO1xuXG4gIHB1YmxpYyByZWFkb25seSBibGFkZVJhY2tBcGk6IFRCbGFkZVJhY2tBcGk7XG4gIHByaXZhdGUgcmVhZG9ubHkgX19wYXJhbXM6IHsgWyBrZXk6IHN0cmluZyBdOiBhbnkgfTtcbiAgcHJpdmF0ZSByZWFkb25seSBfX2ZvbGRlcnM6IHsgWyB0aXRsZTogc3RyaW5nIF06IEltRm9sZGVyQXBpIH07XG4gIHByaXZhdGUgcmVhZG9ubHkgX19idXR0b25zOiB7IFsgdGl0bGU6IHN0cmluZyBdOiBUd2Vha3BhbmUuQnV0dG9uQXBpIH07XG4gIHByaXZhdGUgcmVhZG9ubHkgX190YWJzOiB7IFsgaWQ6IHN0cmluZyBdOiBJbVRhYkFwaSB9O1xuICBwcml2YXRlIHJlYWRvbmx5IF9fc2VwYXJhdG9yczogeyBbIGlkOiBzdHJpbmcgXTogVHdlYWtwYW5lLlNlcGFyYXRvckFwaSB9O1xuICBwcml2YXRlIHJlYWRvbmx5IF9faW5wdXRzOiB7IFsga2V5OiBzdHJpbmcgXTogVHdlYWtwYW5lLklucHV0QmluZGluZ0FwaTx1bmtub3duLCBhbnk+IH07XG4gIHByaXZhdGUgcmVhZG9ubHkgX19tb25pdG9yczogeyBbIGtleTogc3RyaW5nIF06IFR3ZWFrcGFuZS5Nb25pdG9yQmluZGluZ0FwaTxhbnk+IH07XG4gIHByaXZhdGUgcmVhZG9ubHkgX19ibGFkZXM6IHsgWyBrZXk6IHN0cmluZyBdOiBUd2Vha3BhbmUuQmxhZGVBcGk8QmxhZGVDb250cm9sbGVyPFZpZXc+PiB9O1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggYmxhZGVSYWNrOiBUQmxhZGVSYWNrQXBpICkge1xuICAgIHRoaXMuYmxhZGVSYWNrQXBpID0gYmxhZGVSYWNrO1xuICAgIHRoaXMuX19wYXJhbXMgPSB7fTtcbiAgICB0aGlzLl9fZm9sZGVycyA9IHt9O1xuICAgIHRoaXMuX19idXR0b25zID0ge307XG4gICAgdGhpcy5fX3RhYnMgPSB7fTtcbiAgICB0aGlzLl9fc2VwYXJhdG9ycyA9IHt9O1xuICAgIHRoaXMuX19pbnB1dHMgPSB7fTtcbiAgICB0aGlzLl9fbW9uaXRvcnMgPSB7fTtcbiAgICB0aGlzLl9fYmxhZGVzID0ge307XG4gIH1cblxuICBwdWJsaWMgZm9sZGVyKCB0aXRsZTogc3RyaW5nLCBwYXJhbXM/OiBQYXJ0aWFsPFR3ZWFrcGFuZS5Gb2xkZXJQYXJhbXM+ICk6IEltRm9sZGVyQXBpIHtcbiAgICBpZiAoICFJbUJsYWRlUmFja0FwaS5pbUZvbGRlckFwaUN0b3IgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnID8gJ0ltQmxhZGVSYWNrQXBpLmltRm9sZGVyQXBpQ3RvciBpcyBub3Qgc2V0JyA6IHVuZGVmaW5lZCApO1xuICAgIH1cblxuICAgIGlmICggdGhpcy5fX2ZvbGRlcnNbIHRpdGxlIF0gPT0gbnVsbCApIHtcbiAgICAgIGNvbnN0IGZvbGRlciA9IHRoaXMuYmxhZGVSYWNrQXBpLmFkZEZvbGRlciggeyB0aXRsZSwgLi4ucGFyYW1zIH0gKTtcbiAgICAgIHRoaXMuX19mb2xkZXJzWyB0aXRsZSBdID0gbmV3IEltQmxhZGVSYWNrQXBpLmltRm9sZGVyQXBpQ3RvciggZm9sZGVyICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX19mb2xkZXJzWyB0aXRsZSBdO1xuICB9XG5cbiAgcHVibGljIGJ1dHRvbihcbiAgICB0aXRsZTogc3RyaW5nLFxuICAgIHBhcmFtcz86IFBhcnRpYWw8VHdlYWtwYW5lLkJ1dHRvblBhcmFtcz4sXG4gICk6IFR3ZWFrcGFuZS5CdXR0b25BcGkge1xuICAgIGlmICggdGhpcy5fX2J1dHRvbnNbIHRpdGxlIF0gPT0gbnVsbCApIHtcbiAgICAgIGNvbnN0IGJ1dHRvbiA9IHRoaXMuYmxhZGVSYWNrQXBpLmFkZEJ1dHRvbiggeyB0aXRsZSwgLi4ucGFyYW1zIH0gKTtcbiAgICAgIHRoaXMuX19idXR0b25zWyB0aXRsZSBdID0gYnV0dG9uO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9fYnV0dG9uc1sgdGl0bGUgXTtcbiAgfVxuXG4gIHB1YmxpYyB0YWIoXG4gICAgaWQ6IHN0cmluZyxcbiAgICBwYXJhbXM/OiBUd2Vha3BhbmUuVGFiUGFyYW1zLFxuICApOiBJbVRhYkFwaSB7XG4gICAgaWYgKCAhSW1CbGFkZVJhY2tBcGkuaW1UYWJBcGlDdG9yICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JyA/ICdJbUJsYWRlUmFja0FwaS5pbVRhYkFwaUN0b3IgaXMgbm90IHNldCcgOiB1bmRlZmluZWQgKTtcbiAgICB9XG5cbiAgICBpZiAoIHRoaXMuX190YWJzWyBpZCBdID09IG51bGwgKSB7XG4gICAgICBjb25zdCB0YWIgPSB0aGlzLmJsYWRlUmFja0FwaS5hZGRUYWIoIHBhcmFtcyA/PyB7IHBhZ2VzOiBbXSB9ICk7XG4gICAgICB0aGlzLl9fdGFic1sgaWQgXSA9IG5ldyBJbUJsYWRlUmFja0FwaS5pbVRhYkFwaUN0b3IoIHRhYiApO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9fdGFic1sgaWQgXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXBhcmF0b3IoXG4gICAgaWQ6IHN0cmluZyxcbiAgICBwYXJhbXM/OiBUd2Vha3BhbmUuQmFzZVBhcmFtcyxcbiAgKTogVHdlYWtwYW5lLlNlcGFyYXRvckFwaSB7XG4gICAgaWYgKCB0aGlzLl9fc2VwYXJhdG9yc1sgaWQgXSA9PSBudWxsICkge1xuICAgICAgY29uc3Qgc2VwYXJhdG9yID0gdGhpcy5ibGFkZVJhY2tBcGkuYWRkU2VwYXJhdG9yKCBwYXJhbXMgKTtcbiAgICAgIHRoaXMuX19zZXBhcmF0b3JzWyBpZCBdID0gc2VwYXJhdG9yO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9fc2VwYXJhdG9yc1sgaWQgXTtcbiAgfVxuXG4gIHB1YmxpYyB2YWx1ZTxUIGV4dGVuZHMgYW55PihcbiAgICBrZXk6IHN0cmluZyxcbiAgICBpbml0OiBULFxuICAgIHBhcmFtcz86IFR3ZWFrcGFuZS5JbnB1dFBhcmFtcyxcbiAgKTogVCB7XG4gICAgdGhpcy5pbnB1dCgga2V5LCBpbml0LCBwYXJhbXMgKTtcblxuICAgIHJldHVybiB0aGlzLl9fcGFyYW1zWyBrZXkgXSBhcyBUO1xuICB9XG5cbiAgcHVibGljIGlucHV0PFQgZXh0ZW5kcyBhbnk+KFxuICAgIGtleTogc3RyaW5nLFxuICAgIGluaXQ6IFQsXG4gICAgcGFyYW1zPzogVHdlYWtwYW5lLklucHV0UGFyYW1zLFxuICApOiBUd2Vha3BhbmUuSW5wdXRCaW5kaW5nQXBpPHVua25vd24sIFQ+IHtcbiAgICBpZiAoIHRoaXMuX19wYXJhbXNbIGtleSBdID09IG51bGwgKSB7XG4gICAgICB0aGlzLl9fcGFyYW1zWyBrZXkgXSA9IGluaXQ7XG4gICAgICBjb25zdCBpbnB1dCA9IHRoaXMuYmxhZGVSYWNrQXBpLmFkZElucHV0KCB0aGlzLl9fcGFyYW1zLCBrZXksIHBhcmFtcyApO1xuICAgICAgdGhpcy5fX2lucHV0c1sga2V5IF0gPSBpbnB1dDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fX2lucHV0c1sga2V5IF07XG4gIH1cblxuICBwdWJsaWMgbW9uaXRvcjxUPihcbiAgICBrZXk6IHN0cmluZyxcbiAgICB2YWx1ZTogVCxcbiAgICBwYXJhbXM/OiBUd2Vha3BhbmUuTW9uaXRvclBhcmFtcyxcbiAgKTogVHdlYWtwYW5lLk1vbml0b3JCaW5kaW5nQXBpPFQ+IHtcbiAgICBpZiAoIHRoaXMuX19wYXJhbXNbIGtleSBdID09IG51bGwgKSB7XG4gICAgICB0aGlzLl9fcGFyYW1zWyBrZXkgXSA9IHZhbHVlO1xuICAgICAgY29uc3QgbW9uaXRvciA9IHRoaXMuYmxhZGVSYWNrQXBpLmFkZE1vbml0b3IoIHRoaXMuX19wYXJhbXMsIGtleSwgcGFyYW1zICk7XG4gICAgICB0aGlzLl9fbW9uaXRvcnNbIGtleSBdID0gbW9uaXRvcjtcbiAgICB9XG5cbiAgICBpZiAoIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IHRoaXMuX19wYXJhbXNbIGtleSBdICkge1xuICAgICAgdGhpcy5fX3BhcmFtc1sga2V5IF0gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fX21vbml0b3JzWyBrZXkgXTtcbiAgfVxuXG4gIHB1YmxpYyBibGFkZShcbiAgICBpZDogc3RyaW5nLFxuICAgIHBhcmFtczogVHdlYWtwYW5lLkJhc2VCbGFkZVBhcmFtcyxcbiAgKTogVHdlYWtwYW5lLkJsYWRlQXBpPEJsYWRlQ29udHJvbGxlcjxWaWV3Pj4ge1xuICAgIGlmICggdGhpcy5fX2JsYWRlc1sgaWQgXSA9PSBudWxsICkge1xuICAgICAgY29uc3QgYmxhZGUgPSB0aGlzLmJsYWRlUmFja0FwaS5hZGRCbGFkZSggcGFyYW1zICk7XG4gICAgICB0aGlzLl9fYmxhZGVzWyBpZCBdID0gYmxhZGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX19ibGFkZXNbIGlkIF07XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFR3ZWFrcGFuZSBmcm9tICd0d2Vha3BhbmUnO1xuaW1wb3J0IHsgSW1CbGFkZVJhY2tBcGkgfSBmcm9tICcuL0ltQmxhZGVSYWNrQXBpJztcblxuZXhwb3J0IGNsYXNzIEltRm9sZGVyQXBpIGV4dGVuZHMgSW1CbGFkZVJhY2tBcGk8VHdlYWtwYW5lLkZvbGRlckFwaT4ge1xuICBwdWJsaWMgZ2V0IGZvbGRlckFwaSgpOiBUd2Vha3BhbmUuRm9sZGVyQXBpIHtcbiAgICByZXR1cm4gdGhpcy5ibGFkZVJhY2tBcGk7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IoIGZvbGRlcjogVHdlYWtwYW5lLkZvbGRlckFwaSApIHtcbiAgICBzdXBlciggZm9sZGVyICk7XG4gIH1cbn1cblxuLy8gZG9uJ3Qgd29ycnkgYWJvdXQgaXRcbkltQmxhZGVSYWNrQXBpLmltRm9sZGVyQXBpQ3RvciA9IEltRm9sZGVyQXBpO1xuIiwiaW1wb3J0ICogYXMgVHdlYWtwYW5lIGZyb20gJ3R3ZWFrcGFuZSc7XG5pbXBvcnQgeyBJbUJsYWRlUmFja0FwaSB9IGZyb20gJy4vSW1CbGFkZVJhY2tBcGknOyAvLyBvb1xuaW1wb3J0IHsgUGFuZUNvbmZpZyB9IGZyb20gJ3R3ZWFrcGFuZS9kaXN0L3R5cGVzL3BhbmUvcGFuZS1jb25maWcnO1xuXG5leHBvcnQgY2xhc3MgSW1QYW5lIGV4dGVuZHMgSW1CbGFkZVJhY2tBcGk8VHdlYWtwYW5lLlBhbmU+IHtcbiAgcHVibGljIGdldCBwYW5lKCk6IFR3ZWFrcGFuZS5QYW5lIHtcbiAgICByZXR1cm4gdGhpcy5ibGFkZVJhY2tBcGk7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IoIGNvbmZpZz86IFBhbmVDb25maWcgKSB7XG4gICAgc3VwZXIoIG5ldyBUd2Vha3BhbmUuUGFuZSggY29uZmlnICkgKTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVHdlYWtwYW5lIGZyb20gJ3R3ZWFrcGFuZSc7XG5pbXBvcnQgeyBJbUJsYWRlUmFja0FwaSB9IGZyb20gJy4vSW1CbGFkZVJhY2tBcGknO1xuXG5leHBvcnQgY2xhc3MgSW1UYWJQYWdlQXBpIGV4dGVuZHMgSW1CbGFkZVJhY2tBcGk8VHdlYWtwYW5lLlRhYlBhZ2VBcGk+IHtcbiAgcHVibGljIGdldCBmb2xkZXJBcGkoKTogVHdlYWtwYW5lLlRhYlBhZ2VBcGkge1xuICAgIHJldHVybiB0aGlzLmJsYWRlUmFja0FwaTtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggcGFnZTogVHdlYWtwYW5lLlRhYlBhZ2VBcGkgKSB7XG4gICAgc3VwZXIoIHBhZ2UgKTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVHdlYWtwYW5lIGZyb20gJ3R3ZWFrcGFuZSc7XG5pbXBvcnQgeyBJbUJsYWRlUmFja0FwaSB9IGZyb20gJy4vSW1CbGFkZVJhY2tBcGknO1xuaW1wb3J0IHsgSW1UYWJQYWdlQXBpIH0gZnJvbSAnLi9JbVRhYlBhZ2VBcGknO1xuXG5leHBvcnQgY2xhc3MgSW1UYWJBcGkge1xuICBwdWJsaWMgcmVhZG9ubHkgdGFiQXBpOiBUd2Vha3BhbmUuVGFiQXBpO1xuICBwcml2YXRlIF9fcGFnZXM6IHsgWyB0aXRsZTogc3RyaW5nIF06IEltVGFiUGFnZUFwaSB9O1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggdGFiQXBpOiBUd2Vha3BhbmUuVGFiQXBpICkge1xuICAgIHRoaXMudGFiQXBpID0gdGFiQXBpO1xuICAgIHRoaXMuX19wYWdlcyA9IHt9O1xuXG4gICAgdGFiQXBpLnBhZ2VzLmZvckVhY2goICggcGFnZSApID0+IHtcbiAgICAgIHRoaXMuX19wYWdlc1sgcGFnZS50aXRsZSBdID0gbmV3IEltVGFiUGFnZUFwaSggcGFnZSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIHB1YmxpYyBwYWdlKCB0aXRsZTogc3RyaW5nLCBwYXJhbXM/OiBQYXJ0aWFsPFR3ZWFrcGFuZS5UYWJQYWdlUGFyYW1zPiApOiBJbVRhYlBhZ2VBcGkge1xuICAgIGlmICggdGhpcy5fX3BhZ2VzWyB0aXRsZSBdID09IG51bGwgKSB7XG4gICAgICBjb25zdCBwYWdlID0gdGhpcy50YWJBcGkuYWRkUGFnZSggeyB0aXRsZSwgLi4ucGFyYW1zIH0gKTtcbiAgICAgIHRoaXMuX19wYWdlc1sgdGl0bGUgXSA9IG5ldyBJbVRhYlBhZ2VBcGkoIHBhZ2UgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fX3BhZ2VzWyB0aXRsZSBdO1xuICB9XG59XG5cbi8vIGRvbid0IHdvcnJ5IGFib3V0IGl0XG5JbUJsYWRlUmFja0FwaS5pbVRhYkFwaUN0b3IgPSBJbVRhYkFwaTtcbiJdLCJuYW1lcyI6WyJUd2Vha3BhbmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQU1hLGNBQWM7UUFxQnpCLFlBQW9CLFNBQXdCO1lBQzFDLElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO1lBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FB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
