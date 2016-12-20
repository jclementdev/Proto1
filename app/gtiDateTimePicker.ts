import { Component, Input, ElementRef, OnInit, OnDestroy } from '@angular/core';

declare var $: any

@Component({
    selector: 'gti-datetime-picker',
    templateUrl: "app/gtiDateTimePicker.html"
})
export class GtiDateTimePicker implements OnInit, OnDestroy {
    constructor(private el: ElementRef) {
    }

    @Input('display') display: string;

    bindValue: Date;

    @Input('date')
    set date(date: Date) {
        this.bindValue = date;
        this.applyBindingValue();
    }

    pickerElem: any;

    public ngOnInit() {
        let self = this;

        this.pickerElem = $(this.el.nativeElement.querySelector('#datepicker'))

        this.pickerElem.kendoDateTimePicker({
            format: "yyyy-MM-dd H:mm",
            change: function () {
                self.bindValue = this.value();
                console.log(self.bindValue); //value is the selected date in the datetimepicker
            }
        });

        this.applyBindingValue();
    }

    private applyBindingValue() {
        if (this.pickerElem) {
            var datepicker = this.pickerElem.data("kendoDateTimePicker");
            datepicker.value(this.bindValue);
            datepicker.trigger("change");
        }
    }

    public ngOnDestroy() {
        //$(this.el.nativeElement).dropdown('destroy');
    }
}