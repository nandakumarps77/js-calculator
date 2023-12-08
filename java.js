let incomeItems = [];
let expenseItems = [];

const incat = document.getElementById("incat");
const inamt = document.getElementById("inamt");
const excat = document.getElementById("excat");
const examt = document.getElementById("examt");

document.getElementById("income-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const incomeCategory = document.getElementById("income-category").value;
    const incomeAmount = parseFloat(document.getElementById("income-amount").value);

    let errorCountcat = 0;
    let errorAmount = 0;

    if(
      incomeCategory === " " ||
      incomeCategory.length < 3 ||
      /\d/.test(incomeCategory) ||
      /[@?]{3,}/.test(incomeCategory)
    ){
      incat.innerHTML = "You have to give atleast 3 Letters";
      errorCountcat = 1;
    }

    if(
      isNaN(incomeAmount) || incomeAmount < 0) {
        inamt.innerHTML = "You have to enter a valid amount";
        errorAmount = 1;
      }
      if(errorCountcat === 1 || errorAmount === 1){
        e.preventDefault();
        return
      }

      errorCountcat.innerHTML = "";
      errorAmount.innerHTML = "";
          

    if (!isNaN(incomeAmount)) {
        incomeItems.push({ category: incomeCategory, amount: incomeAmount });

        const incomeTable = document.getElementById("income-table");

        const newRow = incomeTable.insertRow(-1);

        const categoryCell = newRow.insertCell(0);
        const amountCell = newRow.insertCell(1);

        categoryCell.textContent = incomeCategory;
        amountCell.textContent = incomeAmount;

        document.getElementById("income-category").value = "";
        document.getElementById("income-amount").value = "";

        updateTotal();
    }
});

document.getElementById("expense-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const expenseCategory = document.getElementById("expense-category").value;
    const expenseAmount = parseFloat(document.getElementById("expense-amount").value);

    let experrorCountcat = 0;
    let experrorAmount = 0;

    if(
     expenseCategory === " " ||
     expenseCategory.length < 3 ||
      /\d/.test(expenseCategory) ||
      /[@?]{3,}/.test(expenseCategory)
    ){
      excat.innerHTML = "You have to give atleast 3 Letters";
      experrorCountcat = 1;
    }

    if(
      isNaN(expenseAmount) || expenseAmount < 0) {
        examt.innerHTML = "You have to enter a valid amount";
        experrorAmount = 1;
      }
      if(experrorCountcat === 1 || experrorAmount === 1){
        e.preventDefault();
        return
      }

      experrorCountcat.innerHTML = "";
      experrorAmount.innerHTML = "";
      

    if (!isNaN(expenseAmount)) {
        expenseItems.push({ category: expenseCategory, amount: expenseAmount });

        const expenseTable = document.getElementById("expense-table");

        const newRow = expenseTable.insertRow(-1);

        const categoryCell = newRow.insertCell(0);
        const amountCell = newRow.insertCell(1);

        categoryCell.textContent = expenseCategory;
        amountCell.textContent = expenseAmount;

        document.getElementById("expense-category").value = "";
        document.getElementById("expense-amount").value = "";

        updateTotal();
    }
});

function updateTotal() {
    const totalIncomeDisplay = document.getElementById("total-income");
    totalIncomeDisplay.textContent = incomeItems.reduce((total, item) => total + item.amount, 0);
 
    const totalExpenseDisplay = document.getElementById("total-expense");
    totalExpenseDisplay.textContent = expenseItems.reduce((total, item) => total + item.amount, 0);

    const totalDisplay = document.getElementById("total");
    totalDisplay.textContent = totalIncomeDisplay.textContent - totalExpenseDisplay.textContent;
    
    piechart(totalExpenseDisplay.textContent,totalIncomeDisplay.textContent,totalDisplay.textContent);

}
updateTotal();

const totalIncomeDisplay = document.getElementById("total-income").textContent
const totalExpenseDisplay = document.getElementById("total-expense").textContent

function piechart (a,b,c){
var xValues = ["Expense", "Income","Balance"];
var yValues = [a,b,c];
var barColors = [
  "#b91d47",
  "#069a12",
  "#0140c4"
];

new Chart("myChart", {
  type: "pie",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    title: {
      display: true,
    }
  }
});

}

