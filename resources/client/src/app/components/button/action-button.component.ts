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
        <i nz-icon nzType="edit"
            nzTheme="outline"
            (click)="edit()"
            class="mx-2 py-2"
        ></i>

        <!-- Delete -->
        <i nz-icon nzType="delete"
            nzTheme="outline"
            nz-popconfirm
            nzPopconfirmTitle="Confirm delete"
            nzPopconfirmPlacement="top"
            [nzIcon]="iconTpl"
            (nzOnConfirm)="confirm()"
            class="mx-2 py-2"
        ></i>
        <ng-template #iconTpl>
            <i nz-icon nzType="exclamation-circle-o" style="color: red;"></i>
        </ng-template>
    `,
    styles: [`i { cursor: pointer; }`],
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

    public edit(): void {
        this.parent.open_edit_drawer(this.id);
    }

    public confirm(): void {
        this.parent.deleteRecord(this.id);
    }
}
