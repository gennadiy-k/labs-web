const depositTimesByType = [
    [
        {title: '6 месяцев', rate: 20, yearPart: 0.5},
        {title: '1 год', rate: 22, yearPart: 1},
        {title: '1,5 года', rate: 15, yearPart: 1.5},
        {title: '2 года', rate: 10, yearPart: 2}
    ],
    [
        {title: '3 месяца', rate: 20, yearPart: 0.25},
        {title: '6 месяцев', rate: 22, yearPart: 0.5},
        {title: '9 месяцев', rate: 23, yearPart: 0.75},
        {title: '1 год', rate: 24, yearPart: 1},
        {title: '1,5 года ', rate: 18, yearPart: 1.5},
        {title: '2 года', rate: 15, yearPart: 2}
    ]
];

var depositType = document.getElementById("deposit-type");
depositType.addEventListener('change', function(){
    let i, L = document.getElementById("deposit-time").options.length - 1;
        for(i = L; i >= 0; i--) {
            document.getElementById("deposit-time").remove(i);
        }
    let selectedValue = this.value;
    let times = depositTimesByType[selectedValue - 1];
    if(selectedValue > 0) {
        for (i = 0; i < times.length; i++) {
            let item = times[i];
            let parent = document.querySelector("#deposit-time");
            let element = item.title;
            parent.options[parent.options.length] = new Option(element, i);
        }
    }   
});

document.getElementById("run-count").addEventListener('click', function(){
    let depositTime = Number(document.getElementById("deposit-time").value);
    let depositType = Number(document.getElementById("deposit-type").value);
    let depositAmount = Number(document.getElementById("deposit-amount").value);

    if (depositType <= 0) {
        document.getElementById("results").textContent = "Вы не выбрали вид вклада";
        return;
    }
    else if (depositTime == null) {
        document.getElementById("results").textContent = "Вы не выбрали срок вклада";
        return;
    }
    else if (Number.isNaN(depositAmount)) {
        document.getElementById("results").textContent = "Введенная сумма не является числом";
        return;
    }
    else if (depositAmount <= 0) {
        document.getElementById("results").textContent = "Вы не ввели сумму";
        return;
    }

    let depositTypeStr = depositType == 1 ? 'Пополняемый' : 'Срочный';
    let depositTimeObj = depositTimesByType[depositType - 1][depositTime];
    let depositTimeStr = depositTimeObj.title;
    let resultFirstStr = `Вклад "${depositTypeStr}" на срок "${depositTimeStr}" на сумму ${depositAmount} руб`;
    document.getElementById("results").innerHTML = resultFirstStr;
    let resultAmount = Math.round(depositAmount * (1 + depositTimeObj.rate * depositTimeObj.yearPart / 100));
    let resultSecondStr = `В конце срока вы получите ${resultAmount} руб.`;
    document.getElementById("results").innerHTML = resultSecondStr;
});