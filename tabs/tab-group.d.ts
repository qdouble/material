import { ModuleWithProviders, NgZone, QueryList, ElementRef, Renderer } from '@angular/core';
import { MdTabLabelWrapper } from './tab-label-wrapper';
import { MdInkBar } from './ink-bar';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { MdTab } from './tab';
/** A simple change event emitted on focus or selection changes. */
export declare class MdTabChangeEvent {
    index: number;
    tab: MdTab;
}
/**
 * Material design tab-group component.  Supports basic tab pairs (label + content) and includes
 * animated ink-bar, keyboard navigation, and screen reader.
 * See: https://www.google.com/design/spec/components/tabs.html
 */
export declare class MdTabGroup {
    private _zone;
    private _renderer;
    _tabs: QueryList<MdTab>;
    _labelWrappers: QueryList<MdTabLabelWrapper>;
    _inkBar: MdInkBar;
    _tabBodyWrapper: ElementRef;
    /** Whether this component has been initialized. */
    private _isInitialized;
    /** The tab index that should be selected after the content has been checked. */
    private _indexToSelect;
    /** Snapshot of the height of the tab body wrapper before another tab is activated. */
    private _tabBodyWrapperHeight;
    /** Whether the tab group should grow to the size of the active tab */
    private _dynamicHeight;
    dynamicHeight: boolean;
    /** The index of the active tab. */
    private _selectedIndex;
    selectedIndex: number;
    /** Output to enable support for two-way binding on `selectedIndex`. */
    readonly selectedIndexChange: Observable<number>;
    private _onFocusChange;
    readonly focusChange: Observable<MdTabChangeEvent>;
    private _onSelectChange;
    readonly selectChange: Observable<MdTabChangeEvent>;
    private _focusIndex;
    private _groupId;
    constructor(_zone: NgZone, _renderer: Renderer);
    /**
     * After the content is checked, this component knows what tabs have been defined
     * and what the selected index should be. This is where we can know exactly what position
     * each tab should be in according to the new selected index, and additionally we know how
     * a new selected tab should transition in (from the left or right).
     */
    ngAfterContentChecked(): void;
    /**
     * Waits one frame for the view to update, then updates the ink bar
     * Note: This must be run outside of the zone or it will create an infinite change detection loop
     * TODO: internal
     */
    ngAfterViewChecked(): void;
    /**
     * Determines if an index is valid.  If the tabs are not ready yet, we assume that the user is
     * providing a valid index and return true.
     */
    isValidIndex(index: number): boolean;
    /** Tells the ink-bar to align itself to the current label wrapper */
    private _updateInkBar();
    /**
     * Reference to the current label wrapper; defaults to null for initial render before the
     * ViewChildren references are ready.
     */
    private readonly _currentLabelWrapper;
    /** Tracks which element has focus; used for keyboard navigation */
    /** When the focus index is set, we must manually send focus to the correct label */
    focusIndex: number;
    handleKeydown(event: KeyboardEvent): void;
    /**
     * Moves the focus left or right depending on the offset provided.  Valid offsets are 1 and -1.
     */
    moveFocus(offset: number): void;
    /** Increment the focus index by 1 until a valid tab is found. */
    focusNextTab(): void;
    /** Decrement the focus index by 1 until a valid tab is found. */
    focusPreviousTab(): void;
    private _createChangeEvent(index);
    /** Returns a unique id for each tab label element */
    _getTabLabelId(i: number): string;
    /** Returns a unique id for each tab content element */
    _getTabContentId(i: number): string;
    /**
     * Sets the height of the body wrapper to the height of the activating tab if dynamic
     * height property is true.
     */
    _setTabBodyWrapperHeight(tabHeight: number): void;
    /** Removes the height of the tab body wrapper. */
    _removeTabBodyWrapperHeight(): void;
}
export declare class MdTabsModule {
    static forRoot(): ModuleWithProviders;
}
