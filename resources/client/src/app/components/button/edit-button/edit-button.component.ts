import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Router } from '@angular/router';

export interface ButtonParams {
    buttonText?: string;
}

@Component({
    selector: 'app-edit-button',
    template: `<button (click)="onClick($event)">{{ buttonText }} {{ id }}</button>`,
    styles: [`button { border: 1px solid; }`],
})
export class EditButtonComponent implements OnInit, ICellRendererAngularComp {

    public id: number = 0;
    public buttonText: string = 'Button';

    constructor(private router: Router) { }

    public agInit(params: ICellRendererParams & ButtonParams): void {
        this.id = params.value;
        this.buttonText = params.buttonText ?? this.buttonText;
    }

    public refresh(params: ICellRendererParams<any, any>): boolean {
        return false;
    }

    public ngOnInit(): void {
    }

    public onClick(event: any): void {
        this.router.navigateByUrl(`job_types/edit/${this.id}`);
    }
}
