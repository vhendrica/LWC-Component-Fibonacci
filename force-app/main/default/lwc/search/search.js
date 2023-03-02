import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class Search extends LightningElement 
{
  visible = false;
  num = 0;
  resultadoFibo;


    pegarValor(event)
    {
    const nome = event.target.name;
        if(nome === 'numero'){
            this.num = event.target.value;

        }
    }


    Fibo(n) 
    {
        if (n < 0) 
        {
            return null;
        } 
        else if (n === 0)
        {
            return 0;
        } 
        else if (n === 1)
        {
            return 1;
        } 
        else
        {
            return this.Fibo(n - 1) + this.Fibo(n - 2);
        }
    }

    previous() {
        this.num--;
        this.resultadoFibo = this.Fibo(this.num);
    }

    next() {
        this.num++;
        this.resultadoFibo = this.Fibo(this.num);
    }


    handleClick() {
        
        if (this.num.trim() < 0)
        {
        this.handleError();
        }
        else if (isNaN(this.num))
        {
            this.NaNError();
        }
        else if (!this.num.trim()) {
            this.nullError();
        }
        else
        {   
            this.visible = true;
        this.resultadoFibo = this.Fibo(this.num.trim());
        } 
    }


    handleError() {
        const error = new ShowToastEvent({
            title: 'Erro',
            message: 'O número inserido não pode ser negativo.',
            variant: 'error',
        });
        this.dispatchEvent(error);

        }

    NaNError()
     {
            const error = new ShowToastEvent({
                title: 'Erro',
                message: 'Por favor, insira somente números.',
                variant: 'error',
            });
            this.dispatchEvent(error);
        
    }

    nullError()
     {
            const error = new ShowToastEvent({
                title: 'Erro',
                message: 'Por favor, insira um número.',
                variant: 'error',
            });
            this.dispatchEvent(error);
        
    }


}