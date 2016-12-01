var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectionStrategy, Component, ElementRef, NgModule, ViewEncapsulation } from '@angular/core';
import { MdChip } from './chip';
export var MdChipList = (function () {
    function MdChipList(_elementRef) {
        this._elementRef = _elementRef;
    }
    MdChipList.prototype.ngAfterContentInit = function () { };
    MdChipList = __decorate([
        Component({selector: 'md-chip-list',
            template: "<ng-content></ng-content>",
            host: {
                // Properties
                'tabindex': '0',
                'role': 'listbox',
                'class': 'md-chip-list'
            },
            styles: [".md-chip-list { padding: 12px; } .md-chip { display: inline-block; padding: 8px 12px 8px 12px; border-radius: 24px; font-size: 13px; line-height: 16px; } /*# sourceMappingURL=chips.css.map */ "],
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [ElementRef])
    ], MdChipList);
    return MdChipList;
}());
export var MdChipsModule = (function () {
    function MdChipsModule() {
    }
    MdChipsModule.forRoot = function () {
        return {
            ngModule: MdChipsModule,
            providers: []
        };
    };
    MdChipsModule = __decorate([
        NgModule({
            imports: [],
            exports: [MdChipList, MdChip],
            declarations: [MdChipList, MdChip]
        }), 
        __metadata('design:paramtypes', [])
    ], MdChipsModule);
    return MdChipsModule;
}());

//# sourceMappingURL=chip-list.js.map
