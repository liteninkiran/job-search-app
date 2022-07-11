import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Router } from '@angular/router';

export interface ButtonParams {
    editUrl?: string;
}

@Component({
    selector: 'app-edit-button',
    template: `
    <button class="btn btn-dark btn-sm" (click)="edit($event)">Edit</button>
    <button class="btn btn-danger btn-sm" style="margin-left:10px;" (click)="delete($event)">Delete</button>
    `,
    styles: [],
})
export class ActionButtonComponent implements OnInit, ICellRendererAngularComp {

    public id: number = 0;
    public editUrl: string = '';

    constructor(private router: Router) { }

    public agInit(params: ICellRendererParams & ButtonParams): void {
        this.id = params.value;
        this.editUrl = params.editUrl ?? this.editUrl;
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
        this.router.navigateByUrl(`${this.editUrl}${this.id}`);
    }
}
