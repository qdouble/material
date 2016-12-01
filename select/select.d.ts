import { AfterContentInit, ElementRef, EventEmitter, NgZone, OnDestroy, QueryList, Renderer } from '@angular/core';
import { MdOption } from './option';
import { ListKeyManager } from '../core/a11y/list-key-manager';
import { Dir } from '../core/rtl/dir';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { ConnectedOverlayPositionChange } from '../core/overlay/position/connected-position';
export declare class MdSelect implements AfterContentInit, ControlValueAccessor, OnDestroy {
    private _element;
    private _renderer;
    private _dir;
    _control: NgControl;
    private _ngZone;
    /** Whether or not the overlay panel is open. */
    private _panelOpen;
    /** The currently selected option. */
    private _selected;
    /** Subscriptions to option events. */
    private _subscriptions;
    /** Subscription to changes in the option list. */
    private _changeSubscription;
    /** Subscription to tab events while overlay is focused. */
    private _tabSubscription;
    /** Whether filling out the select is required in the form.  */
    private _required;
    /** Whether the select is disabled.  */
    private _disabled;
    /** Manages keyboard events for options in the panel. */
    _keyManager: ListKeyManager;
    /** View -> model callback called when value changes */
    _onChange: (value: any) => void;
    /** View -> model callback called when select has been touched */
    _onTouched: () => void;
    /** The IDs of child options to be passed to the aria-owns attribute. */
    _optionIds: string;
    /** The value of the select panel's transform-origin property. */
    _transformOrigin: string;
    /**
     * This position config ensures that the top "start" corner of the overlay
     * is aligned with with the top "start" of the origin by default (overlapping
     * the trigger completely). If the panel cannot fit below the trigger, it
     * will fall back to a position above the trigger.
     */
    _positions: {
        originX: string;
        originY: string;
        overlayX: string;
        overlayY: string;
    }[];
    trigger: ElementRef;
    options: QueryList<MdOption>;
    placeholder: string;
    disabled: any;
    required: any;
    onOpen: EventEmitter<{}>;
    onClose: EventEmitter<{}>;
    constructor(_element: ElementRef, _renderer: Renderer, _dir: Dir, _control: NgControl, _ngZone: NgZone);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /** Toggles the overlay panel open or closed. */
    toggle(): void;
    /** Opens the overlay panel. */
    open(): void;
    /** Closes the overlay panel and focuses the host element. */
    close(): void;
    /**
     * Sets the select's value. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     */
    writeValue(value: any): void;
    /**
     * Saves a callback function to be invoked when the select's value
     * changes from user input. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     */
    registerOnChange(fn: (value: any) => void): void;
    /**
     * Saves a callback function to be invoked when the select is blurred
     * by the user. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     */
    registerOnTouched(fn: () => {}): void;
    /**
     * Disables the select. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     */
    setDisabledState(isDisabled: boolean): void;
    /** Whether or not the overlay panel is open. */
    readonly panelOpen: boolean;
    /** The currently selected option. */
    readonly selected: MdOption;
    _isRtl(): boolean;
    /** The width of the trigger element. This is necessary to match
     * the overlay width to the trigger width.
     */
    _getWidth(): number;
    /** The animation state of the placeholder. */
    _getPlaceholderState(): string;
    /** The animation state of the overlay panel. */
    _getPanelState(): string;
    /** Ensures the panel opens if activated by the keyboard. */
    _handleKeydown(event: KeyboardEvent): void;
    /**
     * When the panel is finished animating, emits an event and focuses
     * an option if the panel is open.
     */
    _onPanelDone(): void;
    /**
     * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
     * "blur" to the panel when it opens, causing a false positive.
     */
    _onBlur(): void;
    /** Returns the correct tabindex for the select depending on disabled state. */
    _getTabIndex(): string;
    /**
     * Sets the transform-origin property of the panel to ensure that it
     * animates in the correct direction based on its positioning.
     */
    _updateTransformOrigin(pos: ConnectedOverlayPositionChange): void;
    /** Sets up a key manager to listen to keyboard events on the overlay panel. */
    private _initKeyManager();
    /** Drops current option subscriptions and IDs and resets from scratch. */
    private _resetOptions();
    /** Listens to selection events on each option. */
    private _listenToOptions();
    /** Unsubscribes from all option subscriptions. */
    private _dropSubscriptions();
    /** Records option IDs to pass to the aria-owns property. */
    private _setOptionIds();
    /** When a new option is selected, deselects the others and closes the panel. */
    private _onSelect(option);
    /** Deselect each option that doesn't match the current selection. */
    private _updateOptions();
    /** Focuses the selected item. If no option is selected, it will focus
     * the first item instead.
     */
    private _focusCorrectOption();
    /** Focuses the host element when the panel closes. */
    private _focusHost();
    /** Gets the index of the provided option in the option list. */
    private _getOptionIndex(option);
}
