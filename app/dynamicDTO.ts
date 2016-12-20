
export interface IDynamicDTO {

    typeName: String
    properties: IDTOProperty[]
    childSets: IDynamicDTOSet[]
}

export interface IDTOProperty {
    name: string
    display: string
    value: any
    type: number;
}

export interface IDynamicDTOSet {
    items: IDynamicDTO[]
    originProperty: string;
    itemPrototype: IDynamicDTO;
}

export interface ICollectionChangeHandler {
    onAdded(item : any) : void;
    onRemoved(item: any): void;
    onItemModified(item: any): void;
}

export class CollectionField {

    testdata: any[] = [];
    handler: ICollectionChangeHandler

    modifyIndex = 0;

    constructor() {
    }

    setItems(data : any[]) {
        this.testdata = data;
    }

    registerHandler(handler: ICollectionChangeHandler) {
        this.handler = handler;
    }

    add(item : any) {
        this.testdata.push(item);

        if (this.handler) {
            this.handler.onAdded(item);
        }
    }

    remove() {
        let item = this.testdata[0];
        this.testdata.splice(0, 1);

        if (this.handler) {
            this.handler.onRemoved(item);
        }
    }

    modifyItem() {
        let item = this.testdata[this.modifyIndex];
        item.description += "X";

        this.modifyIndex++;

        if (this.modifyIndex >= this.testdata.length) {
            this.modifyIndex = 0;
        }

        if (this.handler) {
            this.handler.onItemModified(item);
        }
    }
}


export class BaseModel {

    constructor(private dto: IDynamicDTO) {
    }

    getValue(propName: string): any {
        for (let x of this.dto.properties) {
            if (x.name == propName) {
                if (x.type == 11 || x.type == 10) {
                    return new Date(Number(x.value));
                }
                if (x.type == 1 || x.type == 2 || x.type == 3 || x.type == 4 || x.type == 14 || x.type == 15) {
                    return Number.parseInt(x.value);
                }
                else {
                    return x.value;
                }

            }
        }

    }

    setValue(propName: string, value : any): any {
        for (let x of this.dto.properties) {
            if (x.name == propName) {
                x.value = value;
            }
        }
    }

    getDisplay(propName: string): string {
        for (let x of this.dto.properties) {
            if (x.name == propName) {
                return x.display;
            }
        }

    }
}


export class ActivityLine extends BaseModel {

    constructor(dto: IDynamicDTO) {
        super(dto);
    }

    get id(): number {
        return this.getValue("WOD_ID");
    }

    get sequence(): number {
        return this.getValue("WOD_SEQ");
    }

    set sequence(val : number) {
        this.setValue("WOD_SEQ", val);
    }

    get description(): string {
        return this.getValue("WOD_DESCR");
    }

    set description(val : string) {
        this.setValue("WOD_DESCR", val);
    }
}




