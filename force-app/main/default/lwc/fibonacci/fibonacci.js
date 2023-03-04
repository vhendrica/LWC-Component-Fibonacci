import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
/**
 * TODO: add correct path to the static resource
 * reference: https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.create_resources
 */
//import LOGO_FIBO from "@salesforce/resourceUrl/resourceReference";
export default class Fibonacci extends LightningElement {
    //loboFibo = LOGO_FIBO;
    _memory = {};
    _visible = true;
    _num = 0;
    _result = 0;

    get visible() {
        return this._visible;
    }
    get resultadoFibo() {
        return this._result;
    }
    get memory() {
        return this._memory;
    }
    get msg() {
        return "FIBO(" + this.num + ") = " + this.resultadoFibo;
    }
    get num() {
        return this._num;
    }

    set memory(value) {
        this._memory = value;
    }
    set resultadoFibo(value) {
        this._result = value;
    }
    set num(value) {
        this._num = value;
    }


    /** TODO:
     * add validation here
     */
    handleChange(event) {
        this.num = parseInt(event.target.value);
        this.resultadoFibo = '?';
    }

    run(n) {
        if (n === null || n < 0) {
            return null;
        } else if (n === 0 || n === 1) {
            return n;
        } else if (this.memory[n]) {
            return this.memory[n];
        }
        this.memory[n] = this.run(n - 1) + this.run(n - 2);
        
        return this.memory[n];
    }

    previous() {
        this.resultadoFibo = this.run(--this.num);
    }

    next() {
        this.resultadoFibo = this.run(++this.num);
    }

    /**
     * TODO:
     * stop running validation like this
     * validate in the onChange, using the input validation
     * reference: https://developer.salesforce.com/docs/component-library/bundle/lightning-input/documentation
     * ctrl+f : Custom Validity Error Messages
     */
    handleClick() {
        this.resultadoFibo = this.run(this.num);
    }

    showToast(title, msg, variant) {
        const toast = new ShowToastEvent({
            title: title,
            message: msg,
            variant: variant
        });
        this.dispatchEvent(toast);
    }
}
