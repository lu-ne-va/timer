// Парсит общее кол-во секунд и возвращает объект с кол-вом дней, часов, минут, секунд ------------
function getTimer( count, years ){
    var timer = {};
    timer.seconds = count % 60;
    count = (count - timer.seconds) / 60;
    timer.minutes = count % 60;
    count = (count - timer.minutes) / 60;
    timer.hours = count % 24;
    count = (count - timer.hours) / 24;
    timer.days = count % 7;
    //count = (count - timer.days) / 7;
    timer.weeks = (count - timer.days) / 7;
    //timer.years = years;
    return timer;
}

// Выводит таймер на страницу ---------------------------------------------------------------------
function showTimer( timer ){
    $('#data-form').addClass('hidden');
    $('#weeks').text(
        (timer.weeks < 10 ? '0' : '') +
        timer.weeks.toString()
    );
    $('#days').text(
        (timer.days < 10 ? '0' : '') +
        timer.days.toString()
    );
    $('#hours').text(
        (timer.hours < 10 ? '0' : '') +
        timer.hours.toString()
    );
    $('#minutes').text(
        (timer.minutes < 10 ? '0' : '') +
        timer.minutes.toString()
    );
    $('#seconds').text(
        (timer.seconds < 10 ? '0' : '') +
        timer.seconds.toString()
    );
    $('.timer-container').addClass('show');
}


// GO-GO-GO ---------------------------------------------------------------------------------------
var daysCounter = function(e){
    e.preventDefault();
    debugger;
    var birthday = new Date($('#birthday').val());
    var now = new Date();
    var pensionAge = $('#sex').prop("checked") ? 55 : 60;
    var pensionYear = birthday.getFullYear() + pensionAge;
    var birthdayInThisYear = new Date(now.getFullYear(), birthday.getMonth(), birthday.getDate(), 0, 0, 0, 0);
    var pensionDate = new Date(pensionYear, birthday.getMonth(), birthday.getDate(), 0, 0, 0, 0);

    var counter = pensionDate.getTime() - now.getTime();             // Кол-во милисекунд до пенсии
    var timeout = counter % 1000;                                    // Милисекунды до синхронного вывода целых секунд
    counter = (counter - timeout) / 1000;                            // Кол-во секунд до дня рождения в текущем году
    var yearsTillPension = pensionYear - now.getFullYear();          // Лет до пенсии

    showTimer(getTimer(counter + 1, yearsTillPension));              // Вывод ближайшей целой секунды
    setTimeout(function(){
        showTimer(getTimer(counter,  yearsTillPension));             // Синхронный вывод 1-й целой секунды
        var intervalID = setInterval(function(){
            counter--;
            if( counter > 0 ){
                showTimer(getTimer(counter, yearsTillPension));      // Синхронный вывод n-й целой секунды
            }else{
                clearInterval(intervalID);
                $('#timer').text('Ура!!!');
            }
        }, 1000);
    }, timeout);

};


$('#data-form').on('submit', daysCounter);
