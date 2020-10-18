' use strict';
let money = +prompt('Ваш месячный доход?', 16000),      // Доход за месяц
    income = 'Freelance',                               // Дополнительный доход
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'girlfriend, mobile, internet'),    // Дополнительный расходы
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 200000,                                   // Цель
    period = 1,                                         // Месяцев
    budgetDay = 0;                                      // Дневной доход

let expenses1 = prompt('Введите обязательную статью расходов?', 'oil'),
    amount1 = +prompt('Во сколько это обойдется?', 6000),
    expenses2 = prompt('Введите обязательную статью расходов?', 'credit'),
    amount2 = +prompt('Во сколько это обойдется?', 8800);

// расходы в месяц
const getExpensesMonth = function () {
    return amount1 + amount2;
};
console.log('Расходы в месяц: ' + getExpensesMonth());

// доходы минус расходы
const getAccumulatedMonth = function () {
    return money - getExpensesMonth();
};
let accumulatedMonth = getAccumulatedMonth();

// срок достижения цели
const getTargetMonth = function () {
    return Math.ceil(mission / accumulatedMonth);
};

// буджет на день
budgetDay = Math.round(accumulatedMonth / 30);

//тип данных
const showTypeOf = function(data){
    console.log(data, typeof data);
};
showTypeOf(money);
showTypeOf(deposit);
showTypeOf(income);

console.log('Период равен ' + getTargetMonth() + ' месяцев'); 
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
