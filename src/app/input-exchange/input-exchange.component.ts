import { Component, OnInit } from '@angular/core'
import * as currencies from './../currencies.json'
import { currenciesModel } from '../models/currencies'

@Component({
  selector: 'input-exchange',
  templateUrl: './input-exchange.component.html',
  styleUrls: ['./input-exchange.component.scss']
})
export class InputExchangeComponent implements OnInit {
  public currenciesObject: Array<currenciesModel> = Object.values(currencies)
  public sourceInput: string
  public destinationInput: string
  public sourceCurrency: string = "THB"
  public destinationCurrency: string = "USD"
  constructor() {}
  ngOnInit(): void {}
  inputCalculate(type: string) {
    if(type == 'source' && this.sourceInput == "") {
      this.destinationInput = ""
    }
    else if(type == 'destination' && this.destinationInput == "") {
      this.sourceInput = ""
    }
    else {
      this.calculate(type)
    }
  }
  calculate(type: string) {
    let sourceExchangeRate: any = this.currenciesObject.find(ss => ss.code == this.sourceCurrency)?.exchangeRate
    let destinationExchangeRate: any = this.currenciesObject.find(ss => ss.code == this.destinationCurrency)?.exchangeRate

    if(type == 'source') {
      this.destinationInput = String(((Number(this.sourceInput)*destinationExchangeRate)/sourceExchangeRate).toFixed(3))
    }
    else {
      this.sourceInput = String(((Number(this.destinationInput)*sourceExchangeRate)/destinationExchangeRate).toFixed(2))
    }
  }
}
