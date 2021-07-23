import CalculatorTips from './CalculatorTips';

const form = document.getElementById('form');
const tipAmount = document.getElementById('tip-amount');
const totalPerson = document.getElementById('total-person');
const inputsRadio = document.querySelectorAll('.form-tips__input');

//Object of instance
const tipCalculator = new CalculatorTips();

//Calculate Tips
const calculateTip = (app) => {
  tipAmount.textContent = `$${app.tipAmountValue().toFixed(2)}`;
  totalPerson.textContent = `$${app.totalPersonValue().toFixed(2)}`;
};

//unChecked Radio Input
const unCheckedRadioTip = () =>
  inputsRadio.forEach((input) => (input.checked = false));

//Reset form $0.00
const resetForm = () => {
  tipAmount.textContent = `$0.00`;
  totalPerson.textContent = `$0.00`;
};

//Event listener Reset form
form.addEventListener('reset', resetForm);

//Event listener Input form
form.addEventListener('input', (e) => {
  tipCalculator.setValor([e.target.name], parseFloat(e.target.value));

  e.target.classList.contains('form-tips__input--is-visible') &&
    unCheckedRadioTip();

  if (tipCalculator.validator()) {
    calculateTip(tipCalculator);
  } else {
    resetForm();
  }
});
