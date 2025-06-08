import './Content.css'
import { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from "react-router-dom";

function Content() {
    const [games, setGames] = useState([]);

    const [genres, setGenre] = useState({
        'MMORPG': false,
        'Shooter': false,
        'Strategy': false,
        'Action RPG': false,
        'Battle Royale': false,
        'Fighting': false,
        'MOBA': false,
        'Card Game': false,
        'RPG': false,
        'Sports': false,
        'Social': false,
    });

    const [seeFavorites, setSeeFavorites] = useState(false);

    const [userSearch, setUserSearch] = useState(" ");

    const favorites = localStorage.getItem("favorites").split(",");

    // see all genres that are selected as array
    function selectedGenres() {
        let activeGenre = [];

        Object.keys(genres).forEach(curentGenre => {
            if (genres[curentGenre] == true) activeGenre.push(curentGenre);
        });

        return activeGenre;
    }

    // add games from api (useState, setGames)
    function getGames() {
        let gameList = [];
        let fav = true;
        fetch("/api/games?")
            .then(response => response.json())
            .then(data => {
                data.forEach(game => {
                    if (selectedGenres() != 0 || seeFavorites) {

                        if (seeFavorites) {
                            fav = false;
                            favorites.forEach(favorit => {
                                if (favorit == game['id']) fav = true
                            });
                        }
                        else fav = true;

                        selectedGenres().forEach(genre => {
                            if (genre == game['genre'] && fav && isSearchMatch(game['title'])) gameList.push(game);
                        })

                        if (selectedGenres() == 0 && fav && isSearchMatch(game['title'])) {
                            gameList.push(game)
                        }
                    }
                    else if (isSearchMatch(game['title'])) gameList.push(game)
                });
                setGames(gameList);
            })
            .catch(error => console.error(error));
    }
        
    function handleChange(key) {
        setGenre((prev) => ({ ...prev, [key]: !prev[key] }));
    }

    function isSearchMatch(game = "") {
        if (game.toLowerCase().includes(userSearch.toLowerCase()) || userSearch == "") {
            return true;
        }
        return false;
    }

    // generate a "randome" value from int that is > max.
    function lessThan(int, max) {
        if (int <= max + 1) {
            return int;
        }

        if (int % 2) return lessThan(int/2, max);
        if (int % 3) return lessThan(int/3, max);
        if (int % 5) return lessThan(int/5, max);
        if (int % 7) return lessThan(int/7, max);
        if (int % 11) return lessThan(int/11, max);
        else return lessThan(Math.round(int)/2, max)
    }

    // generate a "randome" rgb value from str
    function strToRGB(str) {
        let seed = 150;
        for (let pos = 0; pos < str.length; pos++) {
            seed += str.charCodeAt(pos) + pos
        }

        let r = lessThan(seed, 255);
        let g = lessThan(seed/5, 255);
        let b = lessThan(seed/3, 255);

        if (r < g && r < b) r = 0;
        else if (g < r && g < b) g = 0;
        else b = 0;

        return("rgb(" + r + "," + g + "," + b + ")")
    }
    
    useEffect(() => {
        getGames();
    }, [genres, seeFavorites, userSearch]);

    if (useLocation().pathname != '/') return <Outlet />
    return(
        <>
            <div className='sidebar'>
                <h3>Filter Setings</h3>

                <form>
                    <hr />
                    <p className='genre'>
                        <label key="seeFavorites">
                            See favorites
                            <input
                                checked={seeFavorites}
                                onChange={() => setSeeFavorites(!seeFavorites)}
                                type="checkbox"
                            />
                        </label>
                    </p>
                    <hr />
                    {Object.entries(genres).map(([key, value]) => (
                        <p key={key} className='genre'>
                            <label>
                                {key}
                                <input
                                    checked={genres[key]}
                                    onChange={() => handleChange(key)}
                                    type="checkbox"
                                />
                            </label>
                        </p>
                    ))}
                    <hr />
                </form>
            </div>

            <form className='search'>
                <label>Search: </label>
                <input
                    type="text"
                    placeholder="Search for a game..."
                    onChange={(e) => setUserSearch(e.target.value)}
                />
            </form>

            <div className="content">
                {games.map((game, i) => (
                    <Link key={i} to={"/" + game['id']}>
                        <div key={i} className='thumnail'>
                            <img src={game['thumbnail']}></img>
                            <h3>{game['title']}</h3>
                            <p className='description'>{game['short_description']}</p>
                            <p className='genre' style={{backgroundColor: strToRGB(game['genre'])}}>{game['genre']}</p>
                            <p className='platform'>{game['platform']}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}

export default Content