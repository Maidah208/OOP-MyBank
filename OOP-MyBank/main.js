#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// BankAccount class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    withdraw(amount) {
        if (this.balance > amount) {
            this.balance -= amount;
            console.log(chalk.yellow(`You withdraw $${amount}`));
            console.log(chalk.yellow(`Your remaining balance: $${this.balance}\n`));
        }
        else {
            console.log(chalk.red(`Transaction Failed. You dont have enough balance.\n`));
        }
    }
    deposit(amount) {
        console.log(chalk.yellow(`Deposited Amount $${amount}`));
        if (amount >= 100) {
            amount -= 1;
        }
        this.balance += amount;
        console.log(chalk.yellow(`Bank Charges: $1`));
        console.log(chalk.yellow(`Your current balance: $${this.balance}\n`));
    }
    checkBalance() {
        console.log(chalk.yellow(`Your balance: $${this.balance}\n`));
    }
    accountInformation() {
        console.log(`Account Number: ${chalk.magenta(this.accountNumber)}`);
        console.log(`Balance: ${chalk.magenta(this.balance)}`);
    }
}
// Customer class
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
    customerInformation() {
        console.log(`Name: ${chalk.magenta(this.firstName)} ${chalk.magenta(this.lastName)}`);
        console.log(`Gender: ${chalk.magenta(this.gender)}`);
        console.log(`Age: ${chalk.magenta(this.age)}`);
        console.log(`Mobile Number: ${chalk.magenta(this.mobileNumber)}`);
        this.account.accountInformation();
    }
}
// Creating bankAcoounts
const accounts = [
    new BankAccount(1001, 5000),
    new BankAccount(1002, 10000),
    new BankAccount(1003, 15000),
];
// Creating Customers
const customers = [
    new Customer("Saad", "Hussain", "Male", 20, 923214569877, accounts[0]),
    new Customer("Hamza", "Ahmed", "Male", 24, 923219876547, accounts[1]),
    new Customer("Mirha", "Zaid", "Female", 22, 9232115963247, accounts[2])
];
console.log(chalk.rgb(212, 15, 110)(`\nWelcome to OOP My Bank\n`));
async function service() {
    while (true) {
        let input = await inquirer.prompt([
            {
                name: "accountNumber",
                type: "number",
                message: "Enter Your Account Number or press 0 to exit: "
            }
        ]);
        if (input.accountNumber === 0) {
            console.log(chalk.rgb(196, 46, 122)(`\n----------Thank you for using our service. Goodbye!----------`));
            break;
        }
        let customer = customers.find(customer => customer.account.accountNumber == input.accountNumber);
        if (customer) {
            console.log(chalk.rgb(51, 169, 157)(`\nHello ${customer.firstName} ${customer.lastName}\n`));
            let exit = true;
            while (exit) {
                let options = await inquirer.prompt([
                    {
                        name: "select",
                        type: "list",
                        choices: ["Account Information", "Withdraw", "Deposit", "Check Balance", "Log Out"],
                        message: "What do you want to do? "
                    }
                ]);
                if (options.select == "Account Information") {
                    customer.customerInformation();
                }
                else if (options.select == "Withdraw") {
                    let withdraw = await inquirer.prompt([
                        {
                            name: "amount",
                            type: "number",
                            message: "Enter the amount you want to Withdraw: "
                        }
                    ]);
                    customer.account
                        .withdraw(withdraw.amount);
                }
                else if (options.select == "Deposit") {
                    let deposit = await inquirer.prompt([
                        {
                            name: "amount",
                            type: "number",
                            message: "Enter the amount you want to deposit: "
                        }
                    ]);
                    customer.account.deposit(deposit.amount);
                }
                else if (options.select == "Check Balance") {
                    customer.account.checkBalance();
                }
                else if (options.select == "Log Out") {
                    console.log(chalk.rgb(110, 51, 169)(`\n----------You have been logged out----------\n`));
                    break;
                }
            }
        }
        else {
            console.log(chalk.red(`Acount not Found.`));
        }
    }
}
service();
