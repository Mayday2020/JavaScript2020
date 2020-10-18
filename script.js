
let money = prompt('Ваш месячный доход?', 16000),       // Доход за месяц
    income = 'Freelance',                               // Дополнительный доход
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'girlfriend, mobile, internet'),    // Дополнительный расходы
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 200000,                                   // Цель
    period = 1,                                         // Месяцев
    budgetDay = 0;                 // Дневной доход

let expenses1 = prompt('Введите обязательную статью расходов?', 'oil'),
    amount1 = +prompt('Во сколько это обойдется?', 6000),
    expenses2 = prompt('Введите обязательную статью расходов?', 'credit'),
    amount2 = +prompt('Во сколько это обойдется?', 8800);

let budgetMonth = money - (amount1 + amount2);
console.log('budgetMonth: ', budgetMonth);
period = Math.ceil(mission / budgetMonth),
console.log('period: ' + period);
budgetDay = Math.round(budgetMonth / 30);

console.log(typeof money);
console.log(typeof deposit);
console.log(typeof income);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев'); 
console.log('Цель заработать ' + mission + ' рублей');


console.log(addExpenses.toLowerCase().split(', '));
console.log('budgetDay: ', budgetDay);

if (budgetDay >= 1200) {
    alert('У вас высокий уровень дохода');
}
else if (budgetDay >= 600 && budgetDay < 1200) {
    alert('У вас средний уровень дохода');
}
else if (budgetDay < 600 && budgetDay >= 0) {
    alert('К сожалению у вас уровень дохода ниже среднего');
}
else if (budgetDay < 0) {
    alert('Что то пошло не так...');
}