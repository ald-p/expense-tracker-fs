/* Selectors */
const transactionsList = document.querySelector('#transactions-list');

/* DOM Manipulation */
// Refresh transactions display
async function refreshTransactions() {
  const transactions = await getTransactions();
  transactionsList.textContent = '';

  transactions.forEach((transaction) => {
    const transactionRow = createTransactionRowEls(transaction);
    transactionsList.append(transactionRow);
  });
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

/* Event handlers */
async function handleDeleteBtn(e) {
  const transactionId = e.target.parentElement.parentElement.id;
  await deleteTransaction(transactionId);
  await refreshTransactions();
}

/* Event Listeners */
document.addEventListener('DOMContentLoaded', () => {
  refreshTransactions();
});
