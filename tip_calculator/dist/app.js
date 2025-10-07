import * as readline from "readline/promises";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function roundTwoDigits(a) {
    const result = +(Math.round(a * 100) / 100).toFixed(2);
    return result;
}
try {
    let answerCheckAmount = await rl.question("How high is the check? (e.g., 50.00) ");
    while (isNaN(+answerCheckAmount)) {
        answerCheckAmount = await rl.question("Invalid Answer. Please enter a number. If there is a penny amount, please separate it with a dot. ");
    }
    const checkAmount = +answerCheckAmount;
    let answerPercentageTip = await rl.question("What percentage of tip will you give? (e.g., 15 for 15%) ");
    while (isNaN(+answerPercentageTip)) {
        answerPercentageTip = await rl.question("Invalid Answer. Please enter a number. If necessary please separate the numbers with a dot. ");
    }
    const percentageTip = +answerPercentageTip;
    const tipAmount = roundTwoDigits((checkAmount * percentageTip) / 100);
    const checkWithTip = roundTwoDigits(tipAmount + checkAmount);
    let answerSplitBill = await rl.question("Should the bill be split among multiple people? (yes/no) ");
    const firstOutput = `\n\n--- Tip Calculation Summary ---\nCheck Amount: $${checkAmount}\nTip Percentage: ${percentageTip}%\nTip Amount: $${tipAmount}\nTotal Bill: $${checkWithTip}`;
    let condition = true;
    while (condition) {
        switch (answerSplitBill.toLowerCase()) {
            case "yes":
                let answerAmountPeople = await rl.question("How many people will split the bill? ");
                while (isNaN(+answerAmountPeople) ||
                    !Number.isInteger(+answerAmountPeople)) {
                    answerAmountPeople = await rl.question("Please enter a full number. ");
                }
                const amountPeople = +answerAmountPeople;
                const secondOutput = `Divide among people: yes\nSplit between how many people: ${amountPeople}\nEach person pays: $${roundTwoDigits(checkWithTip / amountPeople)}\n-----------------------------`;
                console.log(firstOutput);
                console.log(secondOutput);
                condition = false;
                break;
            case "no":
                console.log(firstOutput);
                condition = false;
                break;
            default:
                answerSplitBill = await rl.question("Please enter yes or no. \nShould the bill be split among multiple people? (yes/no) ");
        }
    }
}
finally {
    rl.close();
}
