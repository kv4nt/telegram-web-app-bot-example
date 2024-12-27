var levelCost = 10000;
money = 0;
moneyup = 1;
msec = 0;
upcost = 10000;
upown = 0;
upadd = 1;
uboost = 1;
discount = 0;

$(document).ready(function () {
    checkDiscount(0);
    checkAdWatched();
    getLevelPrice();

    Telegram.WebApp.CloudStorage.getItem('money', function (err, value) {
        if (!err) {
            if (value && localStorage.getItem("moneyup")) {
                load();
            }
        }
    })
    // reloadall();
    // setTimeout(function () {
    //     reloadall();
    // },500);
})

//save before exiting
function gotoAds() {
    window.location.href = 'ad-watching.html';
}

function gotoMain() {
    window.location.href = 'index.html'
}

function setDiscount(val) {
    Telegram.WebApp.CloudStorage.getItem('discount', function (discountErr, discountValue) {
        discountValue = parseInt(discountValue);
        Telegram.WebApp.CloudStorage.setItem('discount', discountValue + parseInt(val));
        localStorage.setItem("discount", discountValue + parseInt(val));
        Telegram.WebApp.CloudStorage.setItem('money', money);
        localStorage.setItem("money", money);
        window.location.reload();
    });
}

function watchAd() {
    window.show().then(() => {
        //Telegram.WebApp.CloudStorage.setItem('ad-watched',1);
        localStorage.setItem("ad-watched", 1);
        window.location.reload();
        console.log('tma ad played');
    }).catch(e => {
        iziToast.show({
            id: 'ads-watching-reward',
            theme: 'dark',
            icon: 'ico-success',
            title: 'Упс :(',
            displayMode: 2,
            message: 'Что-то не так с просмотреом рекламы',
            position: 'topCenter',
            transitionIn: 'flipInX',
            transitionOut: 'flipOutX',
            progressBarColor: 'rgb(0, 255, 184)',
            image: 'images/cat-crying-cat.gif',
            timeout: 4000,
            imageWidth: 70,
            layout: 2,
            onClosing: function () {
                console.info('onClosing');
            },
            onClosed: function (instance, toast, closedBy) {
                window.location.reload();
                console.info('Closed | closedBy: ' + closedBy);
            },
            iconColor: 'rgb(0, 255, 184)'
        });

        console.error('ad error', e);
    })
}

function checkAdWatched() {
    //Telegram.WebApp.CloudStorage.getItem('ad-watched',function (err,value) {
    var value = localStorage.getItem("ad-watched");
    if (value == 1) {
        //Telegram.WebApp.CloudStorage.getItem('discount', function (discountErr, discountValue) {
        var discountValue = localStorage.getItem("discount");
        discountValue = parseInt(discountValue);
        if (discountValue >= 90) {
            localStorage.setItem("ad-watched", 0);
            //Telegram.WebApp.CloudStorage.setItem('ad-watched', 0);
            alert('У вас уже применена максимальная скидка на покупку лапки 90% ');
            return;
        }
        //Telegram.WebApp.CloudStorage.setItem('discount', discountValue + 10);
        localStorage.setItem("discount", discountValue + 10);
        localStorage.setItem("ad-watched", 0);
        //Telegram.WebApp.CloudStorage.setItem('ad-watched', 0);
        $('#discount').text(discountValue + 10);
        iziToast.show({
            id: 'ads-watching-reward',
            theme: 'dark',
            icon: 'ico-success',
            title: 'Ура!',
            displayMode: 2,
            message: 'Вы получили дополнительную скидку +10% на покупку лапки',
            position: 'topCenter',
            transitionIn: 'flipInX',
            transitionOut: 'flipOutX',
            progressBarColor: 'rgb(0, 255, 184)',
            image: 'images/cat-crying-cat.gif',
            timeout: 4000,
            imageWidth: 70,
            layout: 2,
            onClosing: function () {
                console.info('onClosing');
            },
            onClosed: function (instance, toast, closedBy) {
                reloadall();
                console.info('Closed | closedBy: ' + closedBy);
            },
            iconColor: 'rgb(0, 255, 184)'
        });
        load();
        //});
    }
    //     });
}

function checkDiscount(watch = 0) {

    //Telegram.WebApp.CloudStorage.getItem('discount',function (err,value) {
    var value = localStorage.getItem('discount');
    $('#discount').text(value ?? '0');
    //Telegram.WebApp.shareToStory('https://kv4nt.github.io/telegram-web-app-bot-example/images/cat.png',{widget_link:{url:'https://t.me/rostov_gamer_bot'}});
    if (watch) {
        if (value >= 90) {
            alert('У вас уже применена максимальная скидка на покупку лапки 90%');
            return;
        }
        watchAd();
    }
    // Telegram.WebApp.CloudStorage.setItem('discount',50);
    // discount = 50;
    // if(discount==50) {
    //     upcost = upcost/2;
    // }
    // document.getElementById("upgrade").innerHTML =
    //     "Купить лапку | "+addcomma(upown) + " уровень |  Цена: " + addcomma(upcost) + " | +" + "1 монета/клик";
    //});
}

function resetDiscount() {
    $('#discount').text('0');
    //Telegram.WebApp.CloudStorage.setItem('discount',0);
    localStorage.setItem("discount", 0);
    window.location.reload();
}

function closingCode() {
    if (confirm("Точно закрыть окно? Может сохранимся?") === true) {
        save();
        return null;
    }
}

function addcomma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

//updates all values
function reloadall() {
    getLevelPrice();
    document.getElementById("click").innerHTML =
        "Монет/клик: " + addcomma(moneyup);
    document.getElementById("level").innerHTML =
        "Уровень: " + addcomma(upown);
    document.getElementById("total").innerHTML = "Монет: " + addcomma(money);
    document.getElementById("upgrade").innerHTML =
        "Купить лапку | Цена: " + addcomma(upcost) + " монет | +1 монета/клик";
    $('#discount').text(discount);
    if (discount >= 90) {
        $('#discount-button').addClass('btn-danger').removeClass('btn-success').removeClass('btn-secondary');
    } else {
        $('#discount-button').addClass('btn-success').removeClass('btn-danger').removeClass('btn-secondary');
    }

}

//overwrites save file
function save() {
    Telegram.WebApp.CloudStorage.setItem('money', money);
    Telegram.WebApp.CloudStorage.setItem('moneyup', moneyup);
    Telegram.WebApp.CloudStorage.setItem('msec', msec);
    Telegram.WebApp.CloudStorage.setItem('upcost', upcost);
    Telegram.WebApp.CloudStorage.setItem('upown', upown);
    Telegram.WebApp.CloudStorage.setItem('upadd', upadd);
    Telegram.WebApp.CloudStorage.setItem('uboost', uboost);
    Telegram.WebApp.CloudStorage.setItem('discount', discount);
    localStorage.setItem("discount", discount);
    localStorage.setItem("money", money);
    localStorage.setItem("moneyup", moneyup);
    localStorage.setItem("msec", msec);
    localStorage.setItem("upcost", upcost);

    localStorage.setItem("upown", upown);
    localStorage.setItem("upadd", upadd);
    localStorage.setItem("uboost", uboost);
}

//loads save file
function load() {
    //getAllValues();
    //getLevelPrice();
    money = parseInt(localStorage.getItem("money"));
    moneyup = parseInt(localStorage.getItem("moneyup"));
    msec = parseInt(localStorage.getItem("msec"));
    upcost = parseInt(localStorage.getItem("price")) | 10000;
    upown = parseInt(localStorage.getItem("upown"));
    upadd = parseInt(localStorage.getItem("upadd"));
    uboost = parseInt(localStorage.getItem("uboost"));
    discount = parseInt(localStorage.getItem("discount"));

    reloadall();
}

function getAllValues() {
    Telegram.WebApp.CloudStorage.getItem('money', function (err, value) {
        if (!err) {
            localStorage.setItem("money", value);
        }
    });
    Telegram.WebApp.CloudStorage.getItem('moneyup', function (err, value) {
        if (!err) {
            localStorage.setItem("moneyup", value);
        }
    });
    Telegram.WebApp.CloudStorage.getItem('msec', function (err, value) {
        if (!err) {
            localStorage.setItem("msec", value);
        }
    });
    Telegram.WebApp.CloudStorage.getItem('upcost', function (err, value) {
        if (!err) {
            localStorage.setItem("upcost", value);
        }
    });
    Telegram.WebApp.CloudStorage.getItem('upown', function (err, value) {
        if (!err) {
            localStorage.setItem("upown", value);
        }
    });
    Telegram.WebApp.CloudStorage.getItem('upadd', function (err, value) {
        if (!err) {
            localStorage.setItem("upadd", value);
        }
    });
    Telegram.WebApp.CloudStorage.getItem('uboost', function (err, value) {
        if (!err) {
            localStorage.setItem("uboost", value);
        }
    });
    Telegram.WebApp.CloudStorage.getItem('discount', function (err, value) {
        if (!err) {
            localStorage.setItem("discount", value);
        }
    });
}

function getDiscountValue() {
    Telegram.WebApp.CloudStorage.getItem('discount', function (err, value) {
        if (!err) {
            localStorage.setItem("discount", value);
        }
    })
}

function getMoneyValue() {
    Telegram.WebApp.CloudStorage.getItem('money', function (err, value) {
        if (!err) {
            localStorage.setItem("money", value);
        }
    })
}

//resets all values
function reset() {
    // Telegram.WebApp.CloudStorage.setItem('money',0);
    // Telegram.WebApp.CloudStorage.setItem('moneyup',1);
    // Telegram.WebApp.CloudStorage.setItem('msec',0);
    // Telegram.WebApp.CloudStorage.setItem('upcost',10000);
    // Telegram.WebApp.CloudStorage.setItem('upown',0);
    // Telegram.WebApp.CloudStorage.setItem('upadd',1);
    // Telegram.WebApp.CloudStorage.setItem('uboost',1);
    // Telegram.WebApp.CloudStorage.setItem('discount',0);
    localStorage.setItem("discount", 0);
    localStorage.setItem("money", 0);
    localStorage.setItem("moneyup", 1);
    localStorage.setItem("msec", 0);
    localStorage.setItem("upcost", 10000);
    localStorage.setItem("upown", 0);
    localStorage.setItem("upadd", 1);
    localStorage.setItem("uboost", 1);
    save();
    money = 0;
    moneyup = 1;
    msec = 0;
    upcost = 10000;
    upown = 0;
    upadd = 1;
    uboost = 1;
    discount = 0;
    // window.location.reload();
    reloadall();
}

//timer
function myTimer() {
    money += msec;
    document.getElementById("total").innerHTML = "Монет: " + addcomma(money);
}

setInterval(myTimer, 1000);

//what happens when button is clicked
function clicked() {
    money += moneyup;
    document.getElementById("total").innerHTML = "Монет: " + addcomma(money);
    if (money >= localStorage.getItem("price")) {
        $('#upgrade').addClass('btn-success').removeClass('btn-danger').removeClass('btn-secondary');
    } else {
        $('#upgrade').addClass('btn-danger').removeClass('btn-success').removeClass('btn-secondary');
    }
}

//upgrade function
function upgrade(name) {
    if (name == "upgrade") {
        getLevelPrice();
        upcost = parseInt(localStorage.getItem("price"))
        //alert(upcost);
        if (money >= upcost) {
            // if(discount) {
            //     upcost = upcost-(upcost*(discount/100));
            // }
            moneyup += 1;
            money -= upcost;
            upadd++;
            uboost = 1;
            upown += 1;
            document.getElementById("upgrade").innerHTML =
                "Купить лапку | Цена: " + addcomma(upcost) + " | +" + "1 монета/клик";
            upcost = 10000;
            discount = 0;
            //Telegram.WebApp.CloudStorage.setItem('discount',0);
            localStorage.setItem("discount", 0);
            //Telegram.WebApp.CloudStorage.setItem('upcost',10000);
            localStorage.setItem("upcost", 10000);
            document.getElementById("level").innerHTML = "Уровень: " + addcomma(upown);
            //checkDiscount(0);
            successMessage('Новый уровень!', 'Вы получили новый уровень и теперь зарабатываете больше!');
            successMessage('Скидка сброшена', 'После покупки уровня скидка сбрасывается');
            checkDiscount(0);
            setTimeout(function () {
                reloadall();
            }, 500);
        } else {
            errorMessage('Упс!', 'Не хватает монет для покупки лапки');
        }
    }

    document.getElementById("click").innerHTML =
        "Монет/клик: " + addcomma(moneyup);
    document.getElementById("total").innerHTML = "Монет: " + addcomma(money);
}

function getLevelPrice() {
    var discount = parseInt(localStorage.getItem("discount"));
    price = levelCost - (levelCost * (discount / 100));
    localStorage.setItem("price", price);
    upcost = price;
    // Telegram.WebApp.CloudStorage.getItem('discount',function (err,discount) {
    //     if(!err && discount) {
    //         var discount = parseInt(discount);
    //         price = levelCost-(levelCost*(discount/100));
    //         localStorage.setItem("price", price);
    //         upcost=price;
    //         //alert(price);
    //     }
    // })
}

function successMessage(title = 'Ура!', text = 'Вы получили дополнительную скидку +10% на покупку лапки') {
    iziToast.show({
        id: 'success-message-'+Math.floor(Math.random() * 101),
        theme: 'dark',
        icon: 'ico-success',
        title: title,
        displayMode: 2,
        message: text,
        position: 'topCenter',
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
        progressBarColor: 'rgb(0, 255, 184)',
        image: 'images/cat-crying-cat.gif',
        timeout: 4000,
        imageWidth: 70,
        layout: 2,
        onClosing: function () {
            console.info('onClosing');
        },
        onClosed: function (instance, toast, closedBy) {
            reloadall();
            console.info('Closed | closedBy: ' + closedBy);
        },
        iconColor: 'rgb(0, 255, 184)'
    });
}

function errorMessage(title = 'Упс!', text = 'Что-то пошло не так') {
    iziToast.show({
        id: 'error-message-'+Math.floor(Math.random() * 101),
        theme: 'dark',
        icon: 'ico-error',
        title: title,
        displayMode: 2,
        message: text,
        position: 'topCenter',
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
        progressBarColor: 'rgb(0, 255, 184)',
        image: 'images/cat-crying-cat.gif',
        timeout: 4000,
        imageWidth: 70,
        layout: 2,
        onClosing: function () {
            console.info('onClosing');
        },
        onClosed: function (instance, toast, closedBy) {
            reloadall();
            console.info('Closed | closedBy: ' + closedBy);
        },
        iconColor: 'rgb(0, 255, 184)'
    });
}