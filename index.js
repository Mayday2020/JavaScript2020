'use strict';
const start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.querySelector('.additional_income-value'),
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0];

const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];

const salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('input.income-title'), 
    expensesTitle = document.querySelector('input.expenses-title'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),        //  INPUT RANGE
    periodAmount = document.querySelector('.period-amount');        //  Период расчета. Число.

let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');

const isNumber = n => !isNaN(parseFloat(n)) && isFinite(n);

class AppData {
    constructor () {
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
    }
    start () {
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
        this.getInfoDeposit();
        this.getBudget();
    
        this.showResult();
        this.blocked();
    }
    reset () {
        location.reload();
    }
    blocked () {
        const inputText = document.querySelectorAll('input[type=text]');
        inputText.forEach(function(elem){
            elem.setAttribute('disabled', 'true');
        });
        start.style.display = 'none';
        cancel.style.display = 'block';
    }
    showResult () { // Заполняет поля справа данными
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcSavedMoney();
        
        
        
    }
    addExpensesBlock () { // Добавление Обязательных расходов по клику на кнопку + до 3х
        const cloneExpensesItem = expensesItems[0].cloneNode(true);                    
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3){
            expensesPlus.style.display = 'none';
            
        }
    }
    addIncomeBlock() {// Добавление дополнительных доходов по клику на кнопку + до 3х
        const cloneIncomeItems = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    }
    getExpenses() {
        const _this = this;
        expensesItems.forEach(function(item){
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                _this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }
    getIncome () {
        const _this = this;
        incomeItems.forEach(function(item) {
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                _this.income[itemIncome] = cashIncome;
            }
        });
    }
    getAddExpenses() {// Принимает данные с поля ввода - формирует массив
        const _this = this;
        const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== '') {
                _this.addExpenses.push(item);
            }
        });
    }
    getAddIncome() {// Принимает данные с поля ввода - формирует массив
        const _this = this;
        additionalIncomeItem.forEach(function(item) {
            const itemValue = item.value.trim();
            if (itemValue !== '') {
                _this.addIncome.push(itemValue);
            }
        });
    }
    getIncomeMonth() {// Доходы за месяц
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
        return this.incomeMonth;
    }
    getExpensesMonth() {// расходы в месяц
        for (let key in this.expenses){
            this.expensesMonth += +this.expenses[key];
        }
        return this.expensesMonth;
    }
    getBudget() {// доходы минус расходы
        let monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = Math.round(this.budget - this.expensesMonth + this.incomeMonth + (monthDeposit / 12));
        this.budgetDay = Math.round(this.budgetMonth / 30);
        return this.budgetMonth;
    }
    getTargetMonth() {// срок достижения цели
        return targetAmount.value / this.budgetMonth;
    }
    getStatusIncome() {// уровень дохода
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
    }
    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
        
    }
    rangeNumber () {
        periodAmount.textContent = periodSelect.value;
    }
    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }
    changePercent() {
        const valueSelect = this.value;
        if (valueSelect === 'other') {
            depositPercent.style.display = 'inline-block';
        } else {
            depositPercent.value = valueSelect;
            depositPercent.style.display = 'none';
        }
        depositPercent.addEventListener('change', ()=>{
            if (!isNumber(depositPercent.value) || depositPercent.value > 100){
                depositPercent.value = 0;
            }
        });
    }
    depositHandler () {
        if (depositCheck.checked){
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
    }
    eventListeners() {
        const _this = this;
        start.addEventListener('click', this.start.bind(this));
        cancel.addEventListener('click', this.reset.bind(this));
        expensesPlus.addEventListener('click', this.addExpensesBlock);
        incomePlus.addEventListener('click', this.addIncomeBlock);
        periodSelect.addEventListener('input', this.rangeNumber);
        periodSelect.addEventListener('input', function(){
            return _this.showResult();
        });
        depositCheck.addEventListener('change', this.depositHandler.bind(this));
    }
}

const appData = new AppData();
appData.eventListeners();
console.log(appData);



// 6) Запретить нажатие кнопки Рассчитать пока поле Месячный доход пустой, 
//    проверку поля Месячный доход в методе Start убрать.