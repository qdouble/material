var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { NgModule, ContentChild, ViewChild, Component, Input, Output, ViewChildren, NgZone, EventEmitter, QueryList, ContentChildren, TemplateRef, ViewContainerRef, trigger, state, style, animate, transition, ElementRef, Renderer, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule, TemplatePortal, RIGHT_ARROW, LEFT_ARROW, ENTER, coerceBooleanProperty, PortalHostDirective, Dir } from '../core';
import { MdTabLabel } from './tab-label';
import { MdTabLabelWrapper } from './tab-label-wrapper';
import { MdTabNavBar, MdTabLink, MdTabLinkRipple } from './tab-nav-bar/tab-nav-bar';
import { MdInkBar } from './ink-bar';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { MdRippleModule } from '../core/ripple/ripple';
/** Used to generate unique ID's for each tab component */
var nextId = 0;
/** A simple change event emitted on focus or selection changes. */
export var MdTabChangeEvent = (function () {
    function MdTabChangeEvent() {
    }
    return MdTabChangeEvent;
}());
export var MdTab = (function () {
    function MdTab(_viewContainerRef) {
        this._viewContainerRef = _viewContainerRef;
        /** The plain text label for the tab, used when there is no template label. */
        this.textLabel = '';
        this._contentPortal = null;
        this._disabled = false;
    }
    MdTab.prototype.ngOnInit = function () {
        this._contentPortal = new TemplatePortal(this._content, this._viewContainerRef);
    };
    Object.defineProperty(MdTab.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTab.prototype, "content", {
        get: function () {
            return this._contentPortal;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        ContentChild(MdTabLabel), 
        __metadata('design:type', MdTabLabel)
    ], MdTab.prototype, "templateLabel", void 0);
    __decorate([
        ViewChild(TemplateRef), 
        __metadata('design:type', TemplateRef)
    ], MdTab.prototype, "_content", void 0);
    __decorate([
        Input('label'), 
        __metadata('design:type', String)
    ], MdTab.prototype, "textLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], MdTab.prototype, "disabled", null);
    MdTab = __decorate([
        Component({selector: 'md-tab',
            template: "<!-- Create a template for the content of the <md-tab> so that we can grab a reference to this TemplateRef and use it in a Portal to render the tab content in the appropriate place in the tab-group. --> <template><ng-content></ng-content></template> ",
        }), 
        __metadata('design:paramtypes', [ViewContainerRef])
    ], MdTab);
    return MdTab;
}());
/**
 * Material design tab-group component.  Supports basic tab pairs (label + content) and includes
 * animated ink-bar, keyboard navigation, and screen reader.
 * See: https://www.google.com/design/spec/components/tabs.html
 */
export var MdTabGroup = (function () {
    function MdTabGroup(_zone, _renderer) {
        this._zone = _zone;
        this._renderer = _renderer;
        this._isInitialized = false;
        /** Snapshot of the height of the tab body wrapper before another tab is activated. */
        this._tabBodyWrapperHeight = 0;
        /** Whether the tab group should grow to the size of the active tab */
        this._dynamicHeight = false;
        /** The index of the active tab. */
        this._selectedIndex = 0;
        this._onFocusChange = new EventEmitter();
        this._onSelectChange = new EventEmitter();
        this._focusIndex = 0;
        this._groupId = nextId++;
    }
    Object.defineProperty(MdTabGroup.prototype, "dynamicHeight", {
        set: function (value) {
            this._dynamicHeight = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTabGroup.prototype, "selectedIndex", {
        get: function () {
            return this._selectedIndex;
        },
        set: function (value) {
            this._tabBodyWrapperHeight = this._tabBodyWrapper.nativeElement.clientHeight;
            if (value != this._selectedIndex && this.isValidIndex(value)) {
                this._selectedIndex = value;
                if (this._isInitialized) {
                    this._onSelectChange.emit(this._createChangeEvent(value));
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTabGroup.prototype, "selectedIndexChange", {
        /** Output to enable support for two-way binding on `selectedIndex`. */
        get: function () {
            return this.selectChange.map(function (event) { return event.index; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTabGroup.prototype, "focusChange", {
        get: function () {
            return this._onFocusChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTabGroup.prototype, "selectChange", {
        get: function () {
            return this._onSelectChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Waits one frame for the view to update, then updates the ink bar
     * Note: This must be run outside of the zone or it will create an infinite change detection loop
     * TODO: internal
     */
    MdTabGroup.prototype.ngAfterViewChecked = function () {
        var _this = this;
        this._zone.runOutsideAngular(function () {
            window.requestAnimationFrame(function () {
                _this._updateInkBar();
            });
        });
        this._isInitialized = true;
    };
    /**
     * Determines if an index is valid.  If the tabs are not ready yet, we assume that the user is
     * providing a valid index and return true.
     */
    MdTabGroup.prototype.isValidIndex = function (index) {
        if (this._tabs) {
            var tab = this._tabs.toArray()[index];
            return tab && !tab.disabled;
        }
        else {
            return true;
        }
    };
    /** Tells the ink-bar to align itself to the current label wrapper */
    MdTabGroup.prototype._updateInkBar = function () {
        this._inkBar.toArray()[0].alignToElement(this._currentLabelWrapper);
    };
    Object.defineProperty(MdTabGroup.prototype, "_currentLabelWrapper", {
        /**
         * Reference to the current label wrapper; defaults to null for initial render before the
         * ViewChildren references are ready.
         */
        get: function () {
            return this._labelWrappers && this._labelWrappers.length
                ? this._labelWrappers.toArray()[this.selectedIndex].elementRef.nativeElement
                : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTabGroup.prototype, "focusIndex", {
        /** Tracks which element has focus; used for keyboard navigation */
        get: function () {
            return this._focusIndex;
        },
        /** When the focus index is set, we must manually send focus to the correct label */
        set: function (value) {
            if (this.isValidIndex(value)) {
                this._focusIndex = value;
                if (this._isInitialized) {
                    this._onFocusChange.emit(this._createChangeEvent(value));
                }
                if (this._labelWrappers && this._labelWrappers.length) {
                    this._labelWrappers.toArray()[value].focus();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    MdTabGroup.prototype.handleKeydown = function (event) {
        switch (event.keyCode) {
            case RIGHT_ARROW:
                this.focusNextTab();
                break;
            case LEFT_ARROW:
                this.focusPreviousTab();
                break;
            case ENTER:
                this.selectedIndex = this.focusIndex;
                break;
        }
    };
    /**
     * Moves the focus left or right depending on the offset provided.  Valid offsets are 1 and -1.
     */
    MdTabGroup.prototype.moveFocus = function (offset) {
        if (this._labelWrappers) {
            var tabs = this._tabs.toArray();
            for (var i = this.focusIndex + offset; i < tabs.length && i >= 0; i += offset) {
                if (this.isValidIndex(i)) {
                    this.focusIndex = i;
                    return;
                }
            }
        }
    };
    /** Increment the focus index by 1 until a valid tab is found. */
    MdTabGroup.prototype.focusNextTab = function () {
        this.moveFocus(1);
    };
    /** Decrement the focus index by 1 until a valid tab is found. */
    MdTabGroup.prototype.focusPreviousTab = function () {
        this.moveFocus(-1);
    };
    MdTabGroup.prototype._createChangeEvent = function (index) {
        var event = new MdTabChangeEvent;
        event.index = index;
        if (this._tabs && this._tabs.length) {
            event.tab = this._tabs.toArray()[index];
        }
        return event;
    };
    /** Returns a unique id for each tab label element */
    MdTabGroup.prototype._getTabLabelId = function (i) {
        return "md-tab-label-" + this._groupId + "-" + i;
    };
    /** Returns a unique id for each tab content element */
    MdTabGroup.prototype._getTabContentId = function (i) {
        return "md-tab-content-" + this._groupId + "-" + i;
    };
    /**
     * Sets the height of the body wrapper to the height of the activating tab if dynamic
     * height property is true.
     */
    MdTabGroup.prototype._setTabBodyWrapperHeight = function (tabHeight) {
        if (!this._dynamicHeight) {
            return;
        }
        this._renderer.setElementStyle(this._tabBodyWrapper.nativeElement, 'height', this._tabBodyWrapperHeight + 'px');
        // This conditional forces the browser to paint the height so that
        // the animation to the new height can have an origin.
        if (this._tabBodyWrapper.nativeElement.offsetHeight) {
            this._renderer.setElementStyle(this._tabBodyWrapper.nativeElement, 'height', tabHeight + 'px');
        }
    };
    /** Removes the height of the tab body wrapper. */
    MdTabGroup.prototype._removeTabBodyWrapperHeight = function () {
        this._renderer.setElementStyle(this._tabBodyWrapper.nativeElement, 'height', '');
    };
    __decorate([
        ContentChildren(MdTab), 
        __metadata('design:type', QueryList)
    ], MdTabGroup.prototype, "_tabs", void 0);
    __decorate([
        ViewChildren(MdTabLabelWrapper), 
        __metadata('design:type', QueryList)
    ], MdTabGroup.prototype, "_labelWrappers", void 0);
    __decorate([
        ViewChildren(MdInkBar), 
        __metadata('design:type', QueryList)
    ], MdTabGroup.prototype, "_inkBar", void 0);
    __decorate([
        ViewChild('tabBodyWrapper'), 
        __metadata('design:type', ElementRef)
    ], MdTabGroup.prototype, "_tabBodyWrapper", void 0);
    __decorate([
        Input('md-dynamic-height'), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], MdTabGroup.prototype, "dynamicHeight", null);
    __decorate([
        Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], MdTabGroup.prototype, "selectedIndex", null);
    __decorate([
        Output(), 
        __metadata('design:type', Observable)
    ], MdTabGroup.prototype, "selectedIndexChange", null);
    __decorate([
        Output(), 
        __metadata('design:type', Observable)
    ], MdTabGroup.prototype, "focusChange", null);
    __decorate([
        Output(), 
        __metadata('design:type', Observable)
    ], MdTabGroup.prototype, "selectChange", null);
    MdTabGroup = __decorate([
        Component({selector: 'md-tab-group',
            template: "<div class=\"md-tab-header\" role=\"tablist\" (keydown)=\"handleKeydown($event)\"> <div class=\"md-tab-label\" role=\"tab\" md-tab-label-wrapper md-ripple *ngFor=\"let tab of _tabs; let i = index\" [id]=\"_getTabLabelId(i)\" [tabIndex]=\"selectedIndex == i ? 0 : -1\" [attr.aria-controls]=\"_getTabContentId(i)\" [attr.aria-selected]=\"selectedIndex == i\" [class.md-tab-label-active]=\"selectedIndex == i\" [class.md-tab-disabled]=\"tab.disabled\" (click)=\"focusIndex = selectedIndex = i\"> <!-- If there is a label template, use it. --> <template [ngIf]=\"tab.templateLabel\"> <template [portalHost]=\"tab.templateLabel\"></template> </template> <!-- If there is not a label template, fall back to the text label. --> <template [ngIf]=\"!tab.templateLabel\">{{tab.textLabel}}</template> </div> <md-ink-bar></md-ink-bar> </div> <div class=\"md-tab-body-wrapper\" #tabBodyWrapper> <md-tab-body role=\"tabpanel\" *ngFor=\"let tab of _tabs; let i = index\" [id]=\"_getTabContentId(i)\" [attr.aria-labelledby]=\"_getTabLabelId(i)\" [class.md-tab-body-active]=\"selectedIndex == i\" [md-tab-body-position]=\"i - selectedIndex\" [md-tab-body-content]=\"tab.content\" (onTabBodyCentered)=\"_removeTabBodyWrapperHeight()\" (onTabBodyCentering)=\"_setTabBodyWrapperHeight($event)\"> </md-tab-body> </div> ",
            styles: [":host { display: flex; flex-direction: column; font-family: Roboto, \"Helvetica Neue\", sans-serif; } .md-tab-header { overflow: hidden; position: relative; display: flex; flex-direction: row; flex-shrink: 0; } .md-tab-label { line-height: 48px; height: 48px; padding: 0 12px; font-size: 14px; font-family: Roboto, \"Helvetica Neue\", sans-serif; font-weight: 500; cursor: pointer; box-sizing: border-box; color: currentColor; opacity: 0.6; min-width: 160px; text-align: center; position: relative; } .md-tab-label:focus { outline: none; opacity: 1; } @media (max-width: 600px) { .md-tab-label { min-width: 72px; } } :host[md-stretch-tabs] .md-tab-label { flex-basis: 0; flex-grow: 1; } md-ink-bar { position: absolute; bottom: 0; height: 2px; transition: 500ms cubic-bezier(0.35, 0, 0.25, 1); } .md-tab-body-wrapper { position: relative; overflow: hidden; display: flex; transition: height 500ms cubic-bezier(0.35, 0, 0.25, 1); } md-tab-body { position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: block; overflow: hidden; } md-tab-body.md-tab-body-active { position: relative; overflow-x: hidden; overflow-y: auto; z-index: 1; flex-grow: 1; } :host[md-dynamic-height] md-tab-body.md-tab-body-active { overflow-y: hidden; } .md-tab-disabled { cursor: default; pointer-events: none; } /*# sourceMappingURL=tab-group.css.map */ "]
        }), 
        __metadata('design:paramtypes', [NgZone, Renderer])
    ], MdTabGroup);
    return MdTabGroup;
}());
export var MdTabBody = (function () {
    function MdTabBody(_elementRef, _dir) {
        this._elementRef = _elementRef;
        this._dir = _dir;
        /** Event emitted when the tab begins to animate towards the center as the active tab. */
        this.onTabBodyCentering = new EventEmitter();
        /** Event emitted when the tab completes its animation towards the center. */
        this.onTabBodyCentered = new EventEmitter();
    }
    Object.defineProperty(MdTabBody.prototype, "position", {
        set: function (v) {
            if (v < 0) {
                this._position = this.getLayoutDirection() == 'ltr' ? 'left' : 'right';
            }
            else if (v > 0) {
                this._position = this.getLayoutDirection() == 'ltr' ? 'right' : 'left';
            }
            else {
                this._position = 'center';
            }
            if (this._position === 'center' && !this._portalHost.hasAttached() && this._content) {
                this._portalHost.attach(this._content);
            }
        },
        enumerable: true,
        configurable: true
    });
    MdTabBody.prototype.ngOnInit = function () {
        if (this._position == 'center' && !this._portalHost.hasAttached()) {
            this._portalHost.attach(this._content);
        }
    };
    MdTabBody.prototype._onTranslateTabStarted = function (e) {
        if (e.fromState != 'void' && e.toState == 'center') {
            this.onTabBodyCentering.emit(this._elementRef.nativeElement.clientHeight);
        }
    };
    MdTabBody.prototype._onTranslateTabComplete = function (e) {
        if ((e.toState == 'left' || e.toState == 'right') && this._position !== 'center') {
            // If the end state is that the tab is not centered, then detach the content.
            this._portalHost.detach();
        }
        if ((e.toState == 'center') && this._position == 'center') {
            this.onTabBodyCentered.emit();
        }
    };
    /** The text direction of the containing app. */
    MdTabBody.prototype.getLayoutDirection = function () {
        return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
    };
    __decorate([
        ViewChild(PortalHostDirective), 
        __metadata('design:type', PortalHostDirective)
    ], MdTabBody.prototype, "_portalHost", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], MdTabBody.prototype, "onTabBodyCentering", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], MdTabBody.prototype, "onTabBodyCentered", void 0);
    __decorate([
        Input('md-tab-body-content'), 
        __metadata('design:type', TemplatePortal)
    ], MdTabBody.prototype, "_content", void 0);
    __decorate([
        Input('md-tab-body-position'), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], MdTabBody.prototype, "position", null);
    MdTabBody = __decorate([
        Component({selector: 'md-tab-body',
            template: "<div class=\"md-tab-body-content\" [@translateTab]=\"_position\" (@translateTab.start)=\"_onTranslateTabStarted($event)\" (@translateTab.done)=\"_onTranslateTabComplete($event)\"> <template portalHost></template> </div> ",
            animations: [
                trigger('translateTab', [
                    state('left', style({ transform: 'translate3d(-100%, 0, 0)' })),
                    state('center', style({ transform: 'translate3d(0, 0, 0)' })),
                    state('right', style({ transform: 'translate3d(100%, 0, 0)' })),
                    transition('* => *', animate('500ms cubic-bezier(0.35, 0, 0.25, 1)')),
                ])
            ]
        }),
        __param(1, Optional()), 
        __metadata('design:paramtypes', [ElementRef, Dir])
    ], MdTabBody);
    return MdTabBody;
}());
export var MdTabsModule = (function () {
    function MdTabsModule() {
    }
    MdTabsModule.forRoot = function () {
        return {
            ngModule: MdTabsModule,
            providers: []
        };
    };
    MdTabsModule = __decorate([
        NgModule({
            imports: [CommonModule, PortalModule, MdRippleModule],
            // Don't export MdInkBar or MdTabLabelWrapper, as they are internal implementation details.
            exports: [MdTabGroup, MdTabLabel, MdTab, MdTabNavBar, MdTabLink, MdTabLinkRipple],
            declarations: [MdTabGroup, MdTabLabel, MdTab, MdInkBar, MdTabLabelWrapper,
                MdTabNavBar, MdTabLink, MdTabBody, MdTabLinkRipple],
        }), 
        __metadata('design:paramtypes', [])
    ], MdTabsModule);
    return MdTabsModule;
}());

//# sourceMappingURL=tabs.js.map
