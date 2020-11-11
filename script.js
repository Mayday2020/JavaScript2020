' use strict';
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,                                      // Доход за месяц
    start = function() {
        do{money = prompt('Ваш месячный доход?', 30000);}
        while(!isNumber(money));
    };
start();

let appData = {
    budget: money,          // Доход в месяц
    budgetDay: 0,           // Бюджет на день
    budgetMonth: 0,         // Бюджет на месяц
    expensesMonth: 0,       // Расходы в месяц
    income: {},             // Доп. доходы
    addIncome: [],          // Массив с возможными расходами
    expenses: {},           // Доп. расходы
    addExpenses: [],        // Массив с возможными расходами
    deposit: false,         // Вклад
    percentDeposit: 0,      // Процент вклада
    moneyDeposit: 0,        // Сумма вклада
    mission: 50000,         // Цель
    period: 3,              // Срок
    asking: function() {

        if(confirm('Есть ли у вас дополнительный источник заработка?')) {
            let cashIncome,
                itemIncome;
                do{itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');}
                while(!toString(itemIncome.trim));
            do{cashIncome = prompt('Сколько в месяц зарабатываете на этом?', 15000);}
            while(!isNumber(cashIncome));
            appData.income[itemIncome] = cashIncome;
        }
        let addExpenses = prompt('Перечислите возможные расходы', 'girlfriend, mobile, internet');
            
            appData.addExpenses = addExpenses.toLowerCase().split(', ');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
            for (let i = 0; i < 2; i++) {
                appData.expenses[prompt('Введите обязательную статью расходов?', 'oil')] = +prompt('Во сколько это обойдется?', 6000);
            }
    },
    getExpensesMonth: function() {// расходы в месяц
        for (let key in appData.expenses){
            appData.expensesMonth += appData.expenses[key];
        }
        return appData.expensesMonth;
    },

    getBudget: function() {// доходы минус расходы
        appData.budgetMonth = money - appData.expensesMonth;
        appData.budgetDay = Math.round(appData.budgetMonth / 30);
        return appData.budgetMonth;
    },
    getTargetMonth: function() {// срок достижения цели
        appData.period = Math.ceil(appData.mission / appData.budgetMonth);
        if (appData.period < 0){
            console.log('Цель не будет достигнута');
        } else {
            console.log('Цель будет достигнута за ' + appData.period + ' месяцев'); 
        }
    },
    getStatusIncome: function() {// уровень дохода
        if (appData.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        }
        else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
            return ('У вас средний уровень дохода');
        }
        else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        }
        else if (appData.budgetDay < 0) {
            return ('Что то пошло не так...');
        }
    },
    getInfoDeposit: function() {
        if (appData.deposit) {
            do{appData.percentDeposit = prompt('Какой годовой процент?', '10');}
            while(!isNumber(appData.percentDeposit));
            do{appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);}
            while(!isNumber(appData.moneyDeposit));
        }
    },
    calcSavedMoney: function() {
        return appData.budgetMonth * appData.period;
    }

};
appData.asking();
console.log('Расходы в месяц: ' + appData.getExpensesMonth());
appData.getBudget();
appData.getTargetMonth();
                                                
console.log(appData.getStatusIncome());
/*for (let key in appData){
    console.log('Наша программа включает в себя данные:' + key + ' :' + appData[key]);
}*/
