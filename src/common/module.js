import CalculatorTips from './CalculatorTips';

const form = document.getElementById('form');
const tipAmount = document.getElementById('tip-amount');
const totalPerson = document.getElementById('total-person');
const inputsRadio = document.querySelectorAll('.form-tips__input');

const tipCalculator = new CalculatorTips();

const calculateTip = (app) => {
  tipAmount.textContent = `$${app.tipAmountValue().toFixed(2)}`;
  totalPerson.textContent = `$${app.totalPersonValue().toFixed(2)}`;
};

const unCheckedRadioTip = () =>
  inputsRadio.forEach((input) => (input.checked = false));

form.addEventListener('input', (e) => {
  tipCalculator.setValor([e.target.name], parseFloat(e.target.value));

  e.target.classList.contains('form-tips__input--is-visible') &&
    unCheckedRadioTip();

  if (tipCalculator.validator()) {
    calculateTip(tipCalculator);
  } else {
    tipAmount.textContent = `$0.00`;
    totalPerson.textContent = `$0.00`;
  }
});
