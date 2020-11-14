'use strict';
let start = document.getElementById('start'),
    incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.querySelector('.additional_income-value'),
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0];

let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];

let salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('input.income-title'), 
    expensesTitle = document.querySelector('input.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),        //  INPUT RANGE
    incomeItems = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount');        //  Период расчета. Число.

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
    budget: 0,          // Доход в месяц
    budgetDay: 0,           // Бюджет на день
    budgetMonth: 0,         // Бюджет на месяц
    expensesMonth: 0,       // Расходы в месяц
    income: {},             // Доп. доходы
    incomeMonth: 0,
    addIncome: [],          // Массив с возможными расходами
    expenses: {},           // Доп. расходы
    addExpenses: [],        // Массив с возможными расходами
    deposit: false,         // Вклад
    percentDeposit: 0,      // Процент вклада
    moneyDeposit: 0,        // Сумма вклада
    start: function() {
        if (salaryAmount.value === '') {
            alert('Ошибка. Поле "Месячный доход" должно быть заполнено!');
            return;
        }
        appData.budget = salaryAmount.value;

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getIncomeMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();
    },
    showResult: function(){// Заполняет поля справа данными
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcSavedMoney();
        periodSelect.addEventListener('input', function(){
            console.log('showresult gooo');
            return appData.showResult();
        });
        
    },
    addExpensesBlock: function() {// Добавление Обязательных расходов по клику на кнопку + до 3х
        let cloneExpensesItem = expensesItems[0].cloneNode(true);                    
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3){
            expensesPlus.style.display = 'none';
            
        }
    },
    addIncomeBlock: function() {// Добавление дополнительных доходов по клику на кнопку + до 3х
        let cloneIncomeItems = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
        console.dir(appData);
    },
    getIncome: function () {
        incomeItems.forEach(function(item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }
        });
    },
    getAddExpenses: function() {// Принимает данные с поля ввода - формирует массив
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {// Принимает данные с поля ввода - формирует массив
        additionalIncomeItem.forEach(function(item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
        
    },
    getIncomeMonth: function() {// Доходы за месяц
        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
        return appData.incomeMonth;
    },
    getExpensesMonth: function() {// расходы в месяц
        for (let key in appData.expenses){
            appData.expensesMonth += +appData.expenses[key];
        }
        return appData.expensesMonth;
    },
    
    getBudget: function() {// доходы минус расходы
        appData.budgetMonth = appData.budget - appData.expensesMonth + appData.incomeMonth ;
        appData.budgetDay = Math.round(appData.budgetMonth / 30);
        return appData.budgetMonth;
    },
    getTargetMonth: function() {// срок достижения цели
        return targetAmount.value / appData.budgetMonth;
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
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        if (appData.deposit) {
            do{appData.percentDeposit = prompt('Какой годовой процент?', '10');}
            while(!isNumber(appData.percentDeposit));
            do{appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);}
            while(!isNumber(appData.moneyDeposit));
        }
    },
    calcSavedMoney: function() {
        return appData.budgetMonth * periodSelect.value;
    },
    rangeNumber: function () {
        periodAmount.textContent = periodSelect.value;
    }
};



start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.rangeNumber);

// 6) Запретить нажатие кнопки Рассчитать пока поле Месячный доход пустой, 
//    проверку поля Месячный доход в методе Start убрать.