import { Component } from '@angular/core';
import { TestService } from './testService'
import * as Model from './dynamicDTO'


@Component({
    selector: 'my-app',
    templateUrl : "app/app.html",
    providers: [TestService]
})
export class AppComponent  {
    name = 'Result = ';
    dateVal = new Date(2016, 10, 22);
    worId: number = 359764;

    d1 = "Display1";
    t1 = "text2";
    d2 = "Display2";
    t2 = "text2";
    d3 = "Display3";
    t3 = new Date();

    gridData = new Model.CollectionField();
    lineSet : Model.IDynamicDTOSet

    constructor(private testService : TestService) {     
    }

    onClickUpdate() {
        this.testService.getData(this.worId).then((x) => {
            let m = new Model.BaseModel(x);
            this.d1 = m.getDisplay("WOR_NO");
            this.t1 = m.getValue("WOR_NO"); 

            this.d2 = m.getDisplay("WOR_DESCR");
            this.t2 = m.getValue("WOR_DESCR");   

            this.d3 = m.getDisplay("WOR_ISSUE_DATE");
            this.t3 = m.getValue("WOR_ISSUE_DATE");  


            let activityLines = new Array<Model.ActivityLine>();
            let abc = new Model.CollectionField();

            for (let set of x.childSets) {
                if (set.originProperty == "WO_DETAIL") {
                    this.lineSet = set;
                    for (let item of set.items) {
                        activityLines.push(new Model.ActivityLine(item));
                    }
                }
            }

            abc.setItems(activityLines);
            this.gridData = abc;
        });
    }

    addItem() {
        var cloned = JSON.parse(JSON.stringify(this.lineSet.itemPrototype));
        var cloneLine = new Model.ActivityLine(cloned)
        cloneLine.sequence = 99;
        cloneLine.description = "new line";

        this.gridData.add(cloneLine);
    }

    removeItem() {
        this.gridData.remove();
    }

    modifyItem() {
        this.gridData.modifyItem();
    }
}


