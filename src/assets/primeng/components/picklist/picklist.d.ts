import { ElementRef, AfterContentInit, AfterViewChecked, QueryList, TemplateRef, EventEmitter } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
import { ObjectUtils } from '../utils/objectutils';
export declare class PickList implements AfterViewChecked, AfterContentInit {
    el: ElementRef;
    domHandler: DomHandler;
    objectUtils: ObjectUtils;
    source: any[];
    target: any[];
    sourceHeader: string;
    targetHeader: string;
    responsive: boolean;
    filterBy: string;
    metaKeySelection: boolean;
    dragdrop: boolean;
    dragdropScope: string;
    style: any;
    styleClass: string;
    sourceStyle: any;
    targetStyle: any;
    showSourceControls: boolean;
    showTargetControls: boolean;
    sourceFilterPlaceholder: string;
    targetFilterPlaceholder: string;
    onMoveToSource: EventEmitter<any>;
    onMoveAllToSource: EventEmitter<any>;
    onMoveAllToTarget: EventEmitter<any>;
    onMoveToTarget: EventEmitter<any>;
    onSourceReorder: EventEmitter<any>;
    onTargetReorder: EventEmitter<any>;
    listViewSourceChild: ElementRef;
    listViewTargetChild: ElementRef;
    templates: QueryList<any>;
    itemTemplate: TemplateRef<any>;
    visibleOptionsSource: any[];
    visibleOptionsTarget: any[];
    selectedItemsSource: any[];
    selectedItemsTarget: any[];
    reorderedListElement: any;
    draggedItemIndexSource: number;
    draggedItemIndexTarget: number;
    dragOverItemIndexSource: number;
    dragOverItemIndexTarget: number;
    dragging: boolean;
    movedUp: boolean;
    movedDown: boolean;
    itemTouched: boolean;
    filterValueSource: string;
    filterValueTarget: string;
    fromListType: number;
    toListType: number;
    onListItemDroppoint: boolean;
    listHighlightTarget: boolean;
    listHighlightSource: boolean;
    constructor(el: ElementRef, domHandler: DomHandler, objectUtils: ObjectUtils);
    ngAfterContentInit(): void;
    ngAfterViewChecked(): void;
    onItemClick(event: any, item: any, selectedItems: any[]): void;
    onSourceItemDblClick(): void;
    onTargetItemDblClick(): void;
    onFilter(event: KeyboardEvent, data: any[], listType: number): void;
    activateFilter(data: any[], listType: number): void;
    isItemVisible(item: any, listType: number): boolean;
    isVisibleInList(data: any[], item: any, filterValue: string): boolean;
    onItemTouchEnd(event: any): void;
    moveUp(listElement: any, list: any, selectedItems: any, callback: any): void;
    moveTop(listElement: any, list: any, selectedItems: any, callback: any): void;
    moveDown(listElement: any, list: any, selectedItems: any, callback: any): void;
    moveBottom(listElement: any, list: any, selectedItems: any, callback: any): void;
    moveRight(): void;
    moveAllRight(): void;
    moveLeft(): void;
    moveAllLeft(): void;
    isSelected(item: any, selectedItems: any[]): boolean;
    findIndexInSelection(item: any, selectedItems: any[]): number;
    findIndexInList(item: any, list: any): number;
    onDragStart(event: DragEvent, index: number, listType: number): void;
    onDragOver(event: DragEvent, index: number, listType: number): void;
    onDragLeave(event: DragEvent, listType: number): void;
    onDrop(event: DragEvent, index: number, listType: number): void;
    onDragEnd(event: DragEvent): void;
    onListDrop(event: DragEvent, listType: number): void;
    insert(fromIndex: any, fromList: any, toIndex: any, toList: any): void;
    onListMouseMove(event: MouseEvent, listType: number): void;
    onListDragLeave(): void;
}
export declare class PickListModule {
}
