import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
export default class Fibonacci extends LightningElement {
    visible = false;
    num = 0;
    resultadoFibo;

    pegarValor(event) {
        const nome = event.target.name;
        if (nome === "numero") {
            this.num = event.target.value;
        }
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
