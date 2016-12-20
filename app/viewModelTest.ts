class ViewController {

    textField : TextField

    constructor() {
        this.textField = this.getTextField("Description");
    }

    getTextField(name : string): TextField {
        return new TextField();
    }
}

class TextField {

}