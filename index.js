'use strict';
let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
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


const AppData = function() {
    this.budget = 0;          // Доход в месяц
    this.budgetDay = 0;           // Бюджет на день
    this.budgetMonth = 0;         // Бюджет на месяц
    this.expensesMonth = 0;       // Расходы в месяц
    this.income = {};            // Доп. доходы
    this.incomeMonth = 0;
    this.addIncome = [];         // Массив с возможными расходами
    this.expenses = {};          // Доп. расходы
    this.addExpenses = [];       // Массив с возможными расходами
    this.deposit = false;         // Вклад
    this.percentDeposit = 0;      // Процент вклада
    this.moneyDeposit = 0;        // Сумма вклада
};
AppData.prototype.start = function() {
    if (salaryAmount.value === '') {
        alert('Ошибка. Поле "Месячный доход" должно быть заполнено!');
        return;
    }
    this.budget = salaryAmount.value;
    
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getIncomeMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();

    this.showResult();
    this.blocked();
};
AppData.prototype.reset = function(){
    location.reload();
};
AppData.prototype.blocked = function() {
    let inputText = document.querySelectorAll('input[type=text]');
    inputText.forEach(function(elem){
        elem.setAttribute('disabled', 'true');
    });
    start.style.display = 'none';
    cancel.style.display = 'block';
};
AppData.prototype.showResult = function(){// Заполняет поля справа данными
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSavedMoney();
    
    
    
};
AppData.prototype.addExpensesBlock = function() {// Добавление Обязательных расходов по клику на кнопку + до 3х
    let cloneExpensesItem = expensesItems[0].cloneNode(true);                    
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3){
        expensesPlus.style.display = 'none';
        
    }
};
AppData.prototype.addIncomeBlock = function() {// Добавление дополнительных доходов по клику на кнопку + до 3х
    let cloneIncomeItems = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
        incomePlus.style.display = 'none';
    }
};
AppData.prototype.getExpenses = function() {
    const _this = this;
    expensesItems.forEach(function(item){
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            _this.expenses[itemExpenses] = cashExpenses;
        }
    });
};
AppData.prototype.getIncome = function () {
    const _this = this;
    incomeItems.forEach(function(item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
            _this.income[itemIncome] = cashIncome;
        }
    });
};
AppData.prototype.getAddExpenses = function() {// Принимает данные с поля ввода - формирует массив
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
        item = item.trim();
        if (item !== '') {
            _this.addExpenses.push(item);
        }
    });
};
AppData.prototype.getAddIncome = function() {// Принимает данные с поля ввода - формирует массив
    const _this = this;
    additionalIncomeItem.forEach(function(item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            _this.addIncome.push(itemValue);
        }
    });
};
AppData.prototype.getIncomeMonth = function() {// Доходы за месяц
    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
    return this.incomeMonth;
};
AppData.prototype.getExpensesMonth = function() {// расходы в месяц
    for (let key in this.expenses){
        this.expensesMonth += +this.expenses[key];
    }
    return this.expensesMonth;
};
AppData.prototype.getBudget = function() {// доходы минус расходы
    this.budgetMonth = this.budget - this.expensesMonth + this.incomeMonth ;
    this.budgetDay = Math.round(this.budgetMonth / 30);
    return this.budgetMonth;
};
AppData.prototype.getTargetMonth = function() {// срок достижения цели
    return targetAmount.value / this.budgetMonth;
};
AppData.prototype.getStatusIncome = function() {// уровень дохода
    if (this.budgetDay >= 1200) {
        return ('У вас высокий уровень дохода');
    }
    else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
        return ('У вас средний уровень дохода');
    }
    else if (this.budgetDay < 600 && this.budgetDay >= 0) {
        return ('К сожалению у вас уровень дохода ниже среднего');
    }
    else if (this.budgetDay < 0) {
        return ('Что то пошло не так...');
    }
};
AppData.prototype.getInfoDeposit = function() {
    this.deposit = confirm('Есть ли у вас депозит в банке?');
    if (this.deposit) {
        do{this.percentDeposit = prompt('Какой годовой процент?', '10');}
        while(!isNumber(this.percentDeposit));
        do{this.moneyDeposit = prompt('Какая сумма заложена?', 10000);}
        while(!isNumber(this.moneyDeposit));
    }
};
AppData.prototype.calcSavedMoney = function() {
    return this.budgetMonth * periodSelect.value;
    
};
AppData.prototype.rangeNumber = function () {
    periodAmount.textContent = periodSelect.value;
};
AppData.prototype.eventListeners = function() {
    const _this = this;
    start.addEventListener('click', this.start.bind(this));
    cancel.addEventListener('click', this.reset.bind(this));
    expensesPlus.addEventListener('click', this.addExpensesBlock);
    incomePlus.addEventListener('click', this.addIncomeBlock);
    periodSelect.addEventListener('input', this.rangeNumber);
    periodSelect.addEventListener('input', function(){
        return _this.showResult();
    });
};

const appData = new AppData();
appData.eventListeners();
console.log(appData);



// 6) Запретить нажатие кнопки Рассчитать пока поле Месячный доход пустой, 
//    проверку поля Месячный доход в методе Start убрать.