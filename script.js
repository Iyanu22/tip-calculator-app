
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

function calculate() {
       const peopleEmpty = peopleInput.value === '';
    const peopleZero = !peopleEmpty && numberOfPeople <= 0;

    resetButton.disabled =
        billInput.value === '' &&
        customTipInput.value === '' &&
        peopleEmpty &&
        tipPercentage === 0;

    errorMessage.style.display = peopleZero ? 'inline' : 'none';
    peopleInput.classList.toggle('invalid', peopleZero);

    if (peopleEmpty || peopleZero) {
        tipAmount.textContent = '$0.00';
        totalAmount.textContent = '$0.00';
        return;
    }

    const tipPerPerson = (billAmount * tipPercentage / 100) / numberOfPeople;
    const totalPerPerson = (billAmount / numberOfPeople) + tipPerPerson;

    tipAmount.textContent = `$${tipPerPerson.toFixed(2)}`;
    totalAmount.textContent = `$${totalPerPerson.toFixed(2)}`;

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
