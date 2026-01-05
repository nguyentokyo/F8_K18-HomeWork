// Lesson 6: Household Electricity Bill Calculation
// Assume the electricity tariff for a household is calculated using the progressive method (tiered pricing) as follows:
//     Tier 1: For the first 50 kWh: 1,678 VND/kWh.
//     Tier 2: From the 51st to 100th kWh: 1,734 VND/kWh.
//     Tier 3: From the 101st to 200th kWh: 2,014 VND/kWh.
//     Tier 4: Above 200 kWh: 2,536 VND/kWh.
//
//     Write a function to calculate the electricity bill
// Input: electricity consumption (kWh)
// Output: amount to pay
//
// ANSWER
const tier1 = 1678;
const tier2 = 1734;
const tier3 = 2014;
const tier4 = 2536;

const maxPayTier1 = 50 * tier1;
const maxPayTier2 = 50 * tier2;
const maxPayTier3 = 100 * tier3;

const getElectricityBill = (kWh) => {
    if (typeof kWh !== 'number' || kWh < 0) {
        return 'Invalid kWh';
    }

    if (kWh === 0) {
        return 'No electricity bill';
    }

    let tierUsed;
    let pay;

    if (kWh > 200) {
        tierUsed = 4;
        pay = maxPayTier1 + maxPayTier2 + maxPayTier3 + (kWh - 200) * tier4;
    } else if (kWh > 100) {
        tierUsed = 3;
        pay = maxPayTier1 + maxPayTier2 + (kWh - 100) * tier3;
    } else if (kWh > 50) {
        tierUsed = 2;
        pay = maxPayTier1 + (kWh - 50) * tier2;
    } else {
        tierUsed = 1;
        pay = kWh * tier1;
    }

    return `Tier used: ${tierUsed}, Total amount: ${pay} VND`;
}

console.log(getElectricityBill("10z"))        //Invalid kWh ⇒ ok
console.log(getElectricityBill(-10))          //Invalid kWh ⇒ ok
console.log(getElectricityBill(0))            //No electricity bill
console.log(getElectricityBill(45))           //Tier used: 1, Total amount: 75510 VND
console.log(getElectricityBill(90))           //Tier used: 2, Total amount: 153260 VND
console.log(getElectricityBill(150))          //Tier used: 3, Total amount: 271300 VND
console.log(getElectricityBill(300))          //Tier used: 4, Total amount: 625600 VND

