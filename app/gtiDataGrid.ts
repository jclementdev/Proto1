/// <reference path="../kendoUI/typescript/kendo.all.d.ts" />

//@JCL Il faut aussi referencer le .d.ts de jquery pour avoir les extension definie par kendo

import { Directive, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';
import * as Model from './dynamicDTO'


declare var $: any

@Directive({
    selector: '[gtiDataGrid]'
})
export class GtiDataGrid implements OnInit, OnDestroy, Model.ICollectionChangeHandler {

    gridData: Model.CollectionField;

    @Input('gridData')
    set date(data: Model.CollectionField) {
        this.gridData = data;
        this.applyDataSource();

        this.gridData.registerHandler(this);
    }

    gridElem: any;
    
    constructor(private el: ElementRef) {
    }

    public ngOnInit() {
        this.gridElem = $(this.el.nativeElement);

        this.gridElem.kendoGrid({
            dataSource: {
                data: this.gridData.testdata
            },
            groupable: true,
            sortable: true,
            columns: [{
                field: "sequence",
                title: "Séquence",
                format: "{0:n0}",
                width: 240
            }, {
                field: "description",
                title: "Description",
                width: 240
            }]
        });
    }

    private applyDataSource() {
        if (this.gridElem) {
            var grid = this.gridElem.data("kendoGrid");

            let newDataSource = new kendo.data.DataSource({
                data: this.gridData.testdata
            });

            grid.setDataSource(newDataSource);
        }   
    }

    onAdded(item: any): void {
        if (this.gridElem) {
            var grid = this.gridElem.data("kendoGrid");
            grid.dataSource.add(item);
        }
    }

    onRemoved(item: any): void {
        if (this.gridElem) {
            var grid = this.gridElem.data("kendoGrid");
            var data = grid.dataSource.data();

            for (let x of data) {
                if (x.id == item.id) {
                    grid.dataSource.remove(x);
                }
            }          
        }
    }

    onItemModified(item: any): void {
        if (this.gridElem) {
            var grid = this.gridElem.data("kendoGrid");
            var data = grid.dataSource.data();

            for (let i in data) {
                if (data[i].id == item.id) {
                    grid.dataSource.remove(data[i]);
                    grid.dataSource.insert(i, item);
                }
            }        
        }
    }

    public ngOnDestroy() {
        //$(this.el.nativeElement).dropdown('destroy');
    }
}

