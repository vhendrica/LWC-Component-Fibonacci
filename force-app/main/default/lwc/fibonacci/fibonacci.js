import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
/**
 * TODO: add correct path to the static resource
 * reference: https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.create_resources
 */
//import LOGO_FIBO from "@salesforce/resourceUrl/resourceReference";
export default class Fibonacci extends LightningElement {
    //loboFibo = LOGO_FIBO;
    _visible = true;
    get visible() {
        return this._visible;
    }
    _num = 0;
    _result = 0;
    get resultadoFibo() {
        return this._result;
    }
    set resultadoFibo(value) {
        this._result = value;
    }

    get msg() {
        return "FIBO(" + this._num + ") = " + this.resultadoFibo;
    }

    /** TODO:
     * add validation here
     */
    handleChange(event) {
        this._num = parseInt(event.target.value);
        this.resultadoFibo = '?';
    }

    run(n) {
        if (n === null || n < 0) {
            return null;
        } else if (n === 0) {
            return 0;
        } else if (n === 1) {
            return 1;
        }

        return this.run(n - 1) + this.run(n - 2);
    }

    previous() {
        this._num--;
        this.resultadoFibo = this.run(this._num);
    }

    next() {
        this._num++;
        this.resultadoFibo = this.run(this._num);
    }

    /**
     * TODO:
     * stop running validation like this
     * validate in the onChange, using the input validation
     * reference: https://developer.salesforce.com/docs/component-library/bundle/lightning-input/documentation
     * ctrl+f : Custom Validity Error Messages
     */
    handleClick() {
        this.resultadoFibo = this.run(this._num);
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
