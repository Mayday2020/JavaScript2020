' use strict';
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
let money,      // Доход за месяц
    income = 'Freelance',                               // Дополнительный доход
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'girlfriend, mobile, internet'),    // Дополнительный расходы
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 200000,                                   // Цель
    period = 1,                                         // Месяцев
    budgetDay = 0;                                      // Дневной доход

let expenses = []; 

let start = function() {
    do{money = prompt('Ваш месячный доход?', 30000);}
    while(!isNumber(money));
};
start();

// расходы в месяц
const getExpensesMonth = function () {
    let sum = 0;
    for (let i = 0; i < 2; i++){
        expenses[i] = prompt('Введите обязательную статью расходов?', 'oil');
        let sum1 = 0;
        do{sum1 = prompt('Во сколько это обойдется?', 6000);}
        while(!isNumber(sum1));
        sum += +sum1;
    }
    console.log(expenses);
    return sum;
};
let expensesAmount = getExpensesMonth();
console.log('Расходы в месяц: ' + expensesAmount);

// доходы минус расходы
const getAccumulatedMonth = function () {
    return money - expensesAmount;
};
let accumulatedMonth = getAccumulatedMonth();

// срок достижения цели
const getTargetMonth = function () {
    return Math.ceil(mission / accumulatedMonth);
};
if (getTargetMonth() < 0){
    console.log('Цель не будет достигнута');
} else {
    console.log('Цель буде достигнута за ' + getTargetMonth() + ' месяцев'); 
}

// буджет на день
budgetDay = Math.round(accumulatedMonth / 30);
console.log(addExpenses.toLowerCase().split(', '));
console.log('budgetDay: ', budgetDay);

// уровень дохода
const getStatusIncome = function () {
    if (budgetDay >= 1200) {
        return ('У вас высокий уровень дохода');
    }
    else if (budgetDay >= 600 && budgetDay < 1200) {
        return ('У вас средний уровень дохода');
    }
    else if (budgetDay < 600 && budgetDay >= 0) {
        return ('К сожалению у вас уровень дохода ниже среднего');
    }
    else if (budgetDay < 0) {
        return ('Что то пошло не так...');
    }
};
console.log(getStatusIncome());

//тип данных
const showTypeOf = function(data){
    console.log(data, typeof data);
};
showTypeOf(money);
showTypeOf(deposit);
showTypeOf(income);
