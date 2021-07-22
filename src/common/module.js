const form = document.getElementById('form');
const tipAmount = document.getElementById('tip-amount');
const totalPerson = document.getElementById('total-person');

let Values = {
  bill: '',
  tip: '',
  person: '',
  totalPerson: '0.00',
  tipAmount: '0.00',
  tipPerson() {
    return this.bill / this.person;
  },
  tipAmountValue() {
    this.tipAmount = (this.tipPerson() * this.tip) / 100;
  },
  totalPersonValue() {
    this.totalPerson = this.tipAmount + this.tipPerson();
  },
  validator() {
    return this.bill !== '' &&
      !isNaN(this.bill) &&
      this.tip !== '' &&
      this.person > 0
      ? true
      : false;
  }
};

const calculateTip = (obj) => {
  obj.tipAmountValue();
  obj.totalPersonValue();
  tipAmount.textContent = `$${obj.tipAmount.toFixed(2)}`;
  totalPerson.textContent = `$${obj.totalPerson.toFixed(2)}`;
};

form.addEventListener('input', (e) => {
  Values = { ...Values, [e.target.name]: parseFloat(e.target.value) };
  const tipCalculator = Object.create(Values);
  tipAmount.textContent = `$${tipCalculator.tipAmount}`;
  totalPerson.textContent = `$${tipCalculator.totalPerson}`;
  if (tipCalculator.validator()) {
    calculateTip(tipCalculator);
  }
});
