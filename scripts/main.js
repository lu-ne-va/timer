var timer = (function () {
    /**
     * @constant
     * @type {number}
     */
    var womanPensionAge = 55;
    /**
     * @constant
     * @type {number}
     */
    var manPensionAge = 60;

    var $weeks = $('#weeks');
    var $days = $('#days');
    var $hours = $('#hours');
    var $minutes = $('#minutes');
    var $seconds = $('#seconds');
    var $timer = $('.timer-container');

    return {
        /**
         * Парсит общее кол-во секунд и возвращает объект с кол-вом дней, часов, минут, секунд
         * @param count
         * @param years
         * @returns {{}}
         */
        getTimer: function (count, years) {
            var timer = {};
            timer.seconds = count % 60;
            count = (count - timer.seconds) / 60;
            timer.minutes = count % 60;
            count = (count - timer.minutes) / 60;
            timer.hours = count % 24;
            count = (count - timer.hours) / 24;
            timer.days = count % 7;
            timer.weeks = (count - timer.days) / 7;
            return timer;
        },

        /**
         * Выводит таймер на страницу
         * @param timer
         */
        showTimer: function (timer) {
            $weeks.text(
                (timer.weeks < 1000 ? '0' : '') +
                (timer.weeks < 100 ? '0' : '') +
                (timer.weeks < 10 ? '0' : '') +
                timer.weeks.toString()
            );
            $days.text(
                (timer.days < 10 ? '0' : '') +
                timer.days.toString()
            );
            $hours.text(
                (timer.hours < 10 ? '0' : '') +
                timer.hours.toString()
            );
            $minutes.text(
                (timer.minutes < 10 ? '0' : '') +
                timer.minutes.toString()
            );
            $seconds.text(
                (timer.seconds < 10 ? '0' : '') +
                timer.seconds.toString()
            );
            $timer.addClass('show');
        },

        /**
         * GO-GO-GO
         * @param e
         */
        daysCounter: function (e) {
            e.preventDefault();
            var $successText = $('#success-text');
            var $form = $('#data-form');

            //Сохраняем день рождения из формы
            var birthday = new Date($('#birthday').val());
            var now = new Date();
            //В зависимости от пола определяем пенсионный возраст
            var pensionAge = $('#sex').prop("checked") ? womanPensionAge : manPensionAge;
            //Определяем год выхода на пенсию
            var pensionYear = birthday.getFullYear() + pensionAge;
            //Определяем дату выхода на пенсию
            var pensionDate = new Date(pensionYear, birthday.getMonth(), birthday.getDate(), 0, 0, 0, 0);

            // Кол-во милисекунд до пенсии
            var counter = pensionDate - now;
            // Милисекунды до синхронного вывода целых секунд
            var timeout = counter % 1000;
            // Кол-во секунд до пенсии
            counter = (counter - timeout) / 1000;
            // Лет до пенсии
            var yearsTillPension = pensionYear - now.getFullYear();

            if (counter > 0) {
                $form.addClass('hidden');
                // Синхронный вывод 1-й целой секунды
                timer.showTimer(timer.getTimer(counter, yearsTillPension));
                var intervalID = setInterval(function () {
                    counter--;
                    if (counter > 0) {
                        // Синхронный вывод n-й целой секунды
                        timer.showTimer(timer.getTimer(counter, yearsTillPension));
                    } else {
                        clearInterval(intervalID);
                        $successText.addClass('show');
                        $timer.removeClass('show');
                    }
                }, 1000);
            } else {
                $successText.addClass('show');
                $form.addClass('hidden');
            }
        }
    }
})();


$('#data-form').on('submit', timer.daysCounter);
