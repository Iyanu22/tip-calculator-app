
const tipButtons = document.querySelectorAll('.tip_button');
const customTipInput = document.getElementById('custom-tip');
const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('people');
const tipAmount = document.getElementById('tip_amount');
const totalAmount = document.getElementById('total_amount');
const resetButton = document.getElementById('reset');
const errorMessage = document.getElementById('error_message');
let billAmount = 0;
let tipPercentage = 0;
let numberOfPeople = 1;
// let customTipPercentage = 0;

function calculate() {
    if (numberOfPeople <= 0) {
        errorMessage.style.display = 'inline';
        peopleInput.classList.add('invalid');
        tipAmount.textContent = '$0.00';
        totalAmount.textContent = '$0.00';
        return;                     
    }

    errorMessage.style.display = 'none';
    peopleInput.classList.remove('invalid');

    const tipPerPerson = (billAmount * tipPercentage / 100) / numberOfPeople;
    const totalPerPerson = (billAmount / numberOfPeople) + tipPerPerson;

    tipAmount.textContent = `$${tipPerPerson.toFixed(2)}`;
    totalAmount.textContent = `$${totalPerPerson.toFixed(2)}`;

    const untouched= billAmount === 0 && tipPercentage === 0 && numberOfPeople === 1;
    resetButton.disabled = untouched;
}

tipButtons.forEach(button => {
    button.addEventListener('click', () => {
    tipPercentage = Number(button.getAttribute('data-tip'));
    customTipInput.value = '';
    tipButtons.forEach(btn => btn.classList.remove('active')); // Remove 'selected' class from all buttons
    button.classList.add('active'); // Add 'selected' class to the clicked button
    calculate(); 
    });
});
customTipInput.addEventListener('input', (e) => {
    tipPercentage = Number(e.target.value);
   
   tipButtons.forEach(btn => btn.classList.remove('active'));
    calculate();
});
peopleInput.addEventListener('input', () => {
    numberOfPeople = Number(peopleInput.value);
    calculate();
});
billInput.addEventListener('input', () => {
    billAmount = Number(billInput.value);
    calculate();
});

resetButton.addEventListener('click', () => {
    billInput.value = '';
    peopleInput.value = '';
    customTipInput.value = '';
    tipButtons.forEach(btn => btn.classList.remove('active'));
    billAmount = 0;
    tipPercentage = 0;
    numberOfPeople = 1;
    calculate();
    
});


calculate(); // Initial calculation to set default values
