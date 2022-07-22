/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавитения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесу */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    
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
        movieList = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'),
        addInput = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type="checkbox"]');

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    addForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let newFilm = addInput.value;
        const favorite = checkbox.checked;

        if (newFilm.length > 21) {
            newFilm = `${newFilm.substring(0, 21)}...`;
        }
        if (favorite) {
            console.log('Добавляем дюбимый фильм');
        }

        movieDB.movies.push(newFilm);
        sortArr(movieDB.movies);
        
        createMovieList(movieDB.movies, movieList);
        
        e.target.reset();
    });

    const deleteAdv = (arr) => {
        arr.querySelectorAll('img').forEach(item => {
        item.remove();
    });
    };

    const makeChanges = () => {
        genre.textContent = 'драма';

        poster.style.background = `url('../img/bg.jpg') center center/cover no-repeat`;
    };

    const sortArr = (arr) => {
        arr.sort();
    }

    function createMovieList(films, parent) {
        parent.innerHTML = "";
        sortArr(films);

        films.forEach((film, i) => {
            parent.innerHTML += `
            <li class="promo__interactive-item">${i + 1} ${film}
                <div class="delete"></div>
            </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                createMovieList(films, parent);
            });
        });
    }

    deleteAdv(adv);
    makeChanges();
    createMovieList(movieDB.movies, movieList);

});