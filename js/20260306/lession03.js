function startCountdown(seconds) {

    function countdown(n) {

        if (n === 0) {
            console.log("Hết giờ!");
            return;
        }

        console.log(n);

        setTimeout(() => {
            countdown(n - 1);
        }, 1000);
    }

    countdown(seconds);
}

startCountdown(5);