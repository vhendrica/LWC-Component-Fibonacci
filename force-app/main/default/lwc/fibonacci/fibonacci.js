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

    handleClick() {
        if (this.num.trim() < 0) {
            this.handleError();
        } else if (isNaN(this.num)) {
            this.NaNError();
        } else if (!this.num.trim()) {
            this.nullError();
        } else {
            this.visible = true;
            this.resultadoFibo = this.run(this.num.trim());
        }
    }

    handleError() {
        const error = new ShowToastEvent({
            title: "Erro",
            message: "O número inserido não pode ser negativo.",
            variant: "error"
        });
        this.dispatchEvent(error);
    }

    NaNError() {
        const error = new ShowToastEvent({
            title: "Erro",
            message: "Por favor, insira somente números.",
            variant: "error"
        });
        this.dispatchEvent(error);
    }

    nullError() {
        const error = new ShowToastEvent({
            title: "Erro",
            message: "Por favor, insira um número.",
            variant: "error"
        });
        this.dispatchEvent(error);
    }
}
