import { Component, Input, ElementRef, OnInit, OnDestroy } from '@angular/core';

declare var $: any

@Component({
    selector: 'gti-text',
    templateUrl: "app/gtiTextInput.html"
})
export class GtiTextInput implements OnInit, OnDestroy {
    constructor(private el: ElementRef) {
    }

    @Input('display') display : String;
    @Input('text') text: String;

    public ngOnInit() {
    }

    public ngOnDestroy() {
    }
}