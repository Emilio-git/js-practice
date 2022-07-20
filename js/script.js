// Практическое занятие №5
/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const personalMovieDB = {
   count: 0,
   movies: {},
   actors: {},
   genres: [],
   privat: false,
   start: function() {
        personalMovieDB.count = +prompt("Сколько фильмов вы уже посмотрели?", '');

        while (personalMovieDB.count == '' || personalMovieDB.count == null || isNaN(personalMovieDB.count)) {
            personalMovieDB.count = +prompt("Сколько фильмов вы уже посмотрели?", "");
        }
    },
   rememberMyFilms: function() {
        for (let i = 0; i < 2; i++) {
            const a = prompt('Один из последних просмотренных фильмов?').trim();
            const b = prompt('На сколько оцените его?');
            
            if (a != null && b != null && a != "" && b != "" && a.length <= 50) {
                personalMovieDB.movies[a] = b;
            } else {
                i--;
            }
        }
    },
   detectPersonalLevel: function() {
        if (personalMovieDB.count < 10) {
            console.log ("Просмотрено довольно мало фильмов");
        } else if ( personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
            console.log ("Вы классический зритель");
        } else if (personalMovieDB.count >= 30) {
            console.log ("Вы киноман");
        } else {
            console.log ("Произошла ошибка");
        }
    },
    showMyDB: function(hidden) {
        if (!hidden) {
            console.log (personalMovieDB);
        }
    },
    toggleVisibleMyDB: function() {
        if (personalMovieDB.privat) {
            personalMovieDB.privat = false;
        } else {
            personalMovieDB.privat = true;
        }
    },
    writeYourGenres: function() {
        for (let i = 1; i < 2; i++) {
            let genres = prompt (`Напишите Ваши любимые жанры через запятую`, "");

            if (genres === '' || genres == null) {
                i--;
            } else {
                personalMovieDB.genres = genres.split(', ');
                personalMovieDB.genres.sort();
            }
        }
        personalMovieDB.genres.forEach((item, i) => {
           console.log(`Любимый жанр #${i + 1} - это ${item}`);
        });
    },
};

const adv = document.querySelector(".promo__adv"),
      poster = document.querySelector('.promo__bg'),
      genre = poster.querySelector('.promo__genre'),
      movieList = document.querySelector('.promo__interactive-list');

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

adv.querySelectorAll('img').forEach(item => {
    item.remove();
});

genre.textContent = 'драма';

poster.style.background = `url('../img/bg.jpg') center center/cover no-repeat`;

movieList.innerHTML = "";

movieDB.movies.sort();

movieDB.movies.forEach((film, i) => {
    movieList.innerHTML += `
    <li class="promo__interactive-item">${i + 1} ${film}
        <div class="delete"></div>
    </li>
    `;
});