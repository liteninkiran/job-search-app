import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

export interface ButtonParams {
    editUrl?: string;
    parent?: any;
}

@Component({
    selector: 'app-edit-button',
    template: `
        <!-- Edit -->
        <button
            class="btn btn-dark btn-sm"
            (click)="edit($event)"
        >
            Edit
        </button>

        <!-- Delete -->
        <button 
            class="btn btn-danger btn-sm mx-2"
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

    constructor(
        private router: Router,
        private nzMessageService: NzMessageService,
    ) { }

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
        this.router.navigateByUrl(`${this.editUrl}${this.id}`);
    }

    public delete(event: any): void {
        this.parent.deleteRecord(this.id);
    }

    public confirm(): void {
        this.parent.deleteRecord(this.id);
    }
}
