import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

export interface ButtonParams {
    editUrl?: string;
    parent?: any;
}

@Component({
    selector: 'app-edit-button',
    template: `
        <!-- Edit -->
        <button
            class="mx-2"
            nz-button
            nzType="primary"
            (click)="edit($event)"
        >
            Edit
        </button>

        <!-- Delete -->
        <button 
            class="mx-2"
            nz-button
            nzType="primary"
            nzDanger
            nz-popconfirm
            nzPopconfirmTitle="Confirm delete"
            nzPopconfirmPlacement="top"
            (nzOnConfirm)="confirm()"
        >
            Delete
        </button>
    `,
    styles: [],
})
export class ActionButtonComponent implements OnInit, ICellRendererAngularComp {
    public id: number = 0;
    public editUrl: string = '';
    public parent: any;

    constructor() { }

    public agInit(params: ICellRendererParams & ButtonParams): void {
        this.id = params.value;
        this.editUrl = params.editUrl ?? this.editUrl;
        this.parent = params.parent;
    }

    public refresh(params: ICellRendererParams<any, any>): boolean {
        return false;
    }

    public ngOnInit(): void {
    }

    public edit(event: any): void {
        this.parent.open_edit_drawer(this.id);
    }

    public confirm(): void {
        this.parent.deleteRecord(this.id);
    }
}
