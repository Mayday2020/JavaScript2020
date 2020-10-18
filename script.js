
let money = 16000,                          // Доход за месяц
    income = 'Freelance',                   // Дополнительный доход
    addExpenses = 'Credit, Oil, Mobile',    // Дополнительный расходы
    deposit = true,
    mission = 200000,                       // Цель
    period = 6,                             // Месяцев
    budgetDay = Math.round(money / 30);                 // Дневной доход
    


console.log(typeof money);
console.log(typeof deposit);
console.log(typeof income);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев'); 
console.log('Цель заработать ' + mission + ' рублей');


console.log(addExpenses.toLowerCase().split(', '));
console.log('budgetDay: ', budgetDay);