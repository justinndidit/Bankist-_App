'use strict';

// BANKIST APP

// Data - from API...lol
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-06-25T18:49:59.371Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const closeOverlay = document.querySelector('.overlay');
const MovementBtn = document.querySelector('.movements');
const openMovement = document.querySelector('.history');
const sort = document.querySelector('.btn--sort');
const logInBtn = document.querySelector('.In');
const login = document.querySelector('.login');
const logout = document.querySelector('.out');

// DRY!!!!
// logInBtn.addEventListener('click', () => {
//   if (inputLoginPin.value === '' || inputLoginUsername.value === '') {
//     alert('Please enter credentials before continuing');
//   } else {
//   }
// });

logout.addEventListener('click', () => {
  logOut();
});

// Opacity or Display ? ....I need it Vanished so Display
openMovement.addEventListener('click', () => {
  closeOverlay.style.display = 'block';
  MovementBtn.style.display = 'block';
  sort.style.display = 'block';
});

closeOverlay.addEventListener('click', () => {
  closeOverlay.style.display = 'none';
  MovementBtn.style.display = 'none';
  sort.style.display = 'none';
});
//const locale = navigator.language; // gets language of browser
let currentAccount;

////////
//App functionalities
function createUserNames(accounts) {
  accounts.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
}
createUserNames(accounts);

//Logging In functionality
btnLogin.addEventListener('click', e => {
  e.preventDefault();

  const now = new Date();
  // labelDate.textContent = '';
  // labelDate.textContent = `${now.getDate().toString().padStart(2, 0)}/${(
  //   now.getMonth() + 1
  // )
  //   .toString()
  //   .padStart(2, 0)}/${now.getFullYear()}, ${now
  //   .getHours()
  //   .toString()
  //   .padStart(2, 0)}:${now.getMinutes().toString().padStart(2, 0)}`;

  var option = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  };

  // labelDate.textContent = new Intl.DateTimeFormat(option).format(now);

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  labelDate.textContent = new Intl.DateTimeFormat(
    currentAccount.locale,
    option
  ).format(now);

  //else statement does not woek....has something to do with locale
  if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {
    logIn();
  }
  // currentAccount && currentAccount.pin === Number(inputLoginPin.value)
  //   ? logIn()
  //   : console.log('Please enter correct Credentials');
});

function logIn() {
  containerApp.style.opacity = 100;

  labelWelcome.textContent = `Welcome back, ${
    currentAccount.owner.split(' ')[0]
  }`;
  inputLoginUsername.value = inputLoginPin.value = '';

  displayUI();

  inputLoginUsername.blur();
  inputLoginPin.blur();

  login.style.display = 'none';
  logout.style.display = 'block';
}
function displayUI() {
  displayMovements(currentAccount);
  displayBalance(currentAccount);
  displaySummary(currentAccount);
}

//format movement time

function formatDate(date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(date, new Date());

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} Days Ago`;
  return Intl.DateTimeFormat(locale).format(date);
}

function formatCurrency(currency, locale, mov) {
  const option = {
    style: 'currency',
    currency: currency,
  };

  return new Intl.NumberFormat(locale, option).format(Math.abs(mov));
}

//Display Movement
function displayMovements(account) {
  containerMovements.textContent = '';
  clearInterval();
  startTimer();

  account.movements.forEach((Movement, index) => {
    const type = Movement > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(account.movementsDates[index]);
    const displayDate = formatDate(date, currentAccount.locale);

    const formatMov = formatCurrency(
      account.currency,
      account.locale,
      Movement
    );
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formatMov} </div>
    </div>;`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

function displayBalance(account) {
  account.balance = account.movements.reduce((sum, movement) => sum + movement);

  labelBalance.textContent = formatCurrency(
    account.currency,
    account.locale,
    account.balance
  );
}

function displaySummary(account) {
  const deposits = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov);

  labelSumIn.textContent = formatCurrency(
    account.currency,
    account.locale,
    deposits
  );

  const withdrawals = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = formatCurrency(
    account.currency,
    account.locale,
    withdrawals
  );

  const interest = (account.balance * account.interestRate) / 1000;

  labelSumInterest.textContent = formatCurrency(
    account.currency,
    account.locale,
    interest
  );
}

btnTransfer.addEventListener('click', e => {
  e.preventDefault();

  const receiver = accounts.find(acc => acc.username === inputTransferTo.value);
  const amount = Number(inputTransferAmount.value);
  currentAccount.movementsDates.push(new Date());
  receiver.movementsDates.push(new Date());

  if (
    receiver &&
    receiver !== currentAccount &&
    amount > 0 &&
    amount <= currentAccount.balance
  ) {
    inputTransferTo.value = inputTransferAmount.value = '';
    inputTransferAmount.blur();
    inputTransferTo.blur();
    receiver.movements.push(amount);
    currentAccount.movements.push(-amount);
    displayUI();
  }
});

btnClose.addEventListener('click', e => {
  e.preventDefault();

  const index = accounts.findIndex(
    acc => acc.username === inputCloseUsername.value
  );

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    accounts.splice(index, 1);
    // containerApp.style.opacity = 0;
    logOut();
    inputClosePin.value = inputCloseUsername.value = '';
  }
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  currentAccount.movementsDates.push(new Date());

  //Update the condition for accepting Loan and also that of the interest
  setTimeout(() => {
    if (amount > 0 && currentAccount.movements.some(mov => amount >= mov)) {
      currentAccount.movements.push(amount);
      displayUI();

      inputLoanAmount.value = '';
      inputLoanAmount.blur();
    }
  }, 5000);
});

//Learn Timers....Copy Paste isnt the best way to learn

let timer;
const startTimer = () => {
  let time = 300;

  clearInterval(timer);

  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      // labelWelcome.textContent = 'Login to get started';
      // containerApp.style.opacity = 0;
      // closeOverlay.style.display = none;

      logOut();
    }
    time--;
  };

  tick();
  timer = setInterval(tick, 1000);
};

function logOut() {
  labelWelcome.textContent = 'Login to get started';
  containerApp.style.opacity = 0;
  closeOverlay.style.display = 'none';
  login.style.display = 'block';
  logout.style.display = 'none';
}

//Jonas won't be Proud but this code works...
//COME BACK TO THIS

let isSorted = false; //state of sortBTN

btnSort.addEventListener('click', () => {
  isSorted = !isSorted;

  const second = [...currentAccount.movements];
  const first = [...currentAccount.movements];

  const dateFirst = [...currentAccount.movementsDates];
  const dateSecond = [...currentAccount.movementsDates];
  const dateReturn = [];

  currentAccount.movements = isSorted ? first.sort((a, b) => a - b) : second;

  for (let i = 0; i < dateFirst.length; i++) {
    const index = second.findIndex(mov => mov === first[i]);
    dateReturn.push(dateFirst[index]);
  }

  currentAccount.movementsDates = dateReturn;

  displayUI();
  currentAccount.movements = second;
  currentAccount.movementsDates = dateSecond;
});

// const arr = [43, 5, 7, 4, 2, 6];
// console.log(sortMovement(arr, false));
// console.log(sortMovement(arr));

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
