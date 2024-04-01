/* Selectors */
const transactionsList = document.querySelector('#transactions-list');
const addTransactionForm = document.querySelector('#addTransactionForm');

const incomeVal = document.querySelector('#income-value');
const expenseVal = document.querySelector('#expense-value');
const netVal = document.querySelector('#net-value');

/* DOM Manipulation */
// Refresh transactions display
async function refreshTransactions() {
  const transactions = await getTransactions();
  transactionsList.textContent = '';

  transactions.forEach((transaction) => {
    const transactionRow = createTransactionRowEls(transaction);
    transactionsList.append(transactionRow);
  });

  updateTotalsDisplay(transactions);
}

// Create row elements
function createTransactionRowEls(transaction) {
  const tr = document.createElement('tr');
  tr.classList.add('align-middle');
  tr.id = transaction.id;

  const date = document.createElement('td');
  date.setAttribute('scope', 'row');
  date.textContent = transaction.date.slice(0, 10);

  const name = document.createElement('td');
  name.textContent = transaction.name;

  const category = document.createElement('td');
  category.textContent = transaction.category;

  const inflow = document.createElement('td');
  const outflow = document.createElement('td');

  if (transaction.is_expense) {
    outflow.textContent = '$' + transaction.amount;
    outflow.classList.add('text-danger');
    inflow.textContent = '-';
  } else {
    inflow.textContent = '$' + transaction.amount;
    inflow.classList.add('text-success');
    outflow.textContent = '-';
  }

  const tdBtn = document.createElement('td');
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('btn', 'btn-danger');
  deleteBtn.textContent = 'Delete';
  tdBtn.append(deleteBtn);
  deleteBtn.addEventListener('click', handleDeleteBtn);

  tr.append(date);
  tr.append(name);
  tr.append(category);
  tr.append(inflow);
  tr.append(outflow);
  tr.append(tdBtn);

  return tr;
}

// update income, expense, and net total displays
function updateTotalsDisplay(transactions) {
  const { income, expenses, net } = calculateSums(transactions);

  incomeVal.textContent = `+ $${income}`;
  expenseVal.textContent = `- $${expenses}`;
  netVal.textContent = `$${net}`;
}

/* API calls */
async function getTransactions() {
  const response = await fetch('http://localhost:3000/transactions');
  const result = await response.json();

  return result;
}

async function deleteTransaction(id) {
  const response = await fetch(`http://localhost:3000/transactions/${id}`, {
    method: 'DELETE',
  });
  const result = response.json();
  return result;
}

async function addTransaction(transaction) {
  const categoryId = await findCategoryId(transaction.category);
  const transactionToAdd = {
    date: transaction.date,
    name: transaction.name,
    is_expense: transaction.type === 'outflow' ? true : false,
    category_id: categoryId,
    amount: transaction.amount,
  };

  const response = await fetch('http://localhost:3000/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transactionToAdd),
  });

  const result = await response.json();
  console.log(result);
  return result;
}

async function getCategories() {
  const response = await fetch('http://localhost:3000/categories');
  const result = await response.json();

  return result;
}

/* Utility functions */
async function findCategoryId(inputCategory) {
  const categories = await getCategories();

  const foundCategory = categories.find(
    (category) => category.category === inputCategory
  );
  const categoryId = foundCategory.id;

  return categoryId;
}

function calculateSums(transactions) {
  const inflows = transactions.filter((transaction) => !transaction.is_expense);
  const outflows = transactions.filter((transaction) => transaction.is_expense);

  const income = inflows
    .reduce(
      (accumulator, currentTransaction) =>
        accumulator + Number(currentTransaction.amount),
      0
    )
    .toFixed(2);

  const expenses = outflows
    .reduce(
      (accumulator, currentTransaction) =>
        accumulator + Number(currentTransaction.amount),
      0
    )
    .toFixed(2);

  const net = (income - expenses).toFixed(2);

  return { income, expenses, net };
}

/* Event handlers */
async function handleDeleteBtn(e) {
  const transactionId = e.target.parentElement.parentElement.id;
  await deleteTransaction(transactionId);
  await refreshTransactions();
}

async function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const formObj = Object.fromEntries(formData.entries());
  console.log(formObj);
  form.reset();

  await addTransaction(formObj);
  await refreshTransactions();
}

/* Event Listeners */
document.addEventListener('DOMContentLoaded', () => {
  addTransactionForm.addEventListener('submit', handleFormSubmit);
  refreshTransactions();
});
