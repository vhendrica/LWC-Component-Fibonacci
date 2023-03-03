import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
/**
 * TODO: add correct path to the static resource
 * reference: https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.create_resources
 */
//import LOGO_FIBO from "@salesforce/resourceUrl/resourceReference";
export default class Fibonacci extends LightningElement {
    state = {
        images: {
            /** TODO: 
             * add static resource to the org
             * add static resource in the repository
             * uncomment next line 
             * remove the another line
             */
            //logoFibo: LOGO_FIBO
            logoFibo: 'blabla'
        },
        visibility: {
            visible: false
        },
        num: 0,
        result: 0
    };

    setVisible(value) {
        this.state.visibility.visible = value;
    }
    getVisible() {
        return this.state.visible;
    }
    getNum() {
        return this.state.num;
    }
    setNum(value) {
        this.state.num = value;
    }
    getResultadoFibo() {
        return this.state.result;
    }
    setResultadoFibo(value) {
        this.state.result = value;
    }
    getImg() {
        return this.state.images.logoFibo;
    }
    getMsg() {
        return "FIBO(" + this.num + ") = " + this.resultadoFibo;
    }

    run(n) {
        if (!n || n < 0) {
            return null;
        } else if (n === 0) {
            return 0;
        } else if (n === 1) {
            return 1;
        }

        return this.run(n - 1) + this.run(n - 2);
    }

    previous() {
        this.num--;
        this.resultadoFibo = this.run(this.num);
    }

    next() {
        this.num++;
        this.resultadoFibo = this.run(this.num);
    }

    /**
     * TODO:
     * stop running validation like this
     * validate in the onChange, using the input validation
     * reference: https://developer.salesforce.com/docs/component-library/bundle/lightning-input/documentation
     * ctrl+f : Custom Validity Error Messages
     */
    handleClick() {
        if (this.num.trim() < 0) {
            this.showToast('Error', 'Negative number is not valid.', 'error')
        } else if (isNaN(this.num)) {
            this.showToast('Error', 'Only numbers are allowed.', 'error')
        } else if (!this.num.trim()) {
            this.showToast('Error', 'Please, type a number.', 'error')
        } else {
            this.visible = true;
            this.resultadoFibo = this.run(this.num.trim());
        }
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