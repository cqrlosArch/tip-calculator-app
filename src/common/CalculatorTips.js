class CalculatorTips {
  constructor() {
    this.bill = '';
    this.tip = '';
    this.person = '';
  }

  setValor(name, valor) {
    this[name] = valor;
  }

  validator() {
    return this.bill !== '' &&
      !isNaN(this.bill) &&
      this.tip !== '' &&
      this.person > 0
      ? true
      : false;
  }
  tipPerson() {
    return this.bill / this.person;
  }
  tipAmountValue() {
    return (this.tipPerson() * this.tip) / 100;
  }
  totalPersonValue() {
    return this.tipAmountValue() + this.tipPerson();
  }
}

export default CalculatorTips;
