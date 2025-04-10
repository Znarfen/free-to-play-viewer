import './Content.css'
import { useEffect, useState } from 'react';

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

    const selectedGenres = () => {
        let activeGenre = [];

        Object.keys(genres).forEach(curentGenre => {
            if (genres[curentGenre] == true) activeGenre.push(curentGenre);
        });

        return activeGenre;
    }
    
    function handleChange(key) {
        setGenre((prev) => ({ ...prev, [key]: !prev[key] }));
    }
    
    function onSubmit(event) {
        event.preventDefault();
    }

    
    useEffect(() => {
        let gameList = [];
        fetch("/api/games?")
            .then(response => response.json())
            .then(data => {
                data.forEach(game => {
                    if (selectedGenres() != 0) {
                        selectedGenres().forEach(genre => {
                            if (genre == game['genre']) gameList.push(game);
                        })
                    }
                    else gameList.push(game)
                });
                setGames(gameList);
            })
            .catch(error => console.error(error));
    })

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

    // generate a "randome" rgb value from str, dark is max value for r, g and b.
    function strToRGB(str, dark = 255) {
        let seed = 150;
        for (let pos = 0; pos < str.length; pos++) {
            seed += str.charCodeAt(pos) + pos
        }

        let r = lessThan(seed, dark);
        let g = lessThan(seed/5, dark);
        let b = lessThan(seed/3, dark);

        if (r < g && r < b) r = 0;
        else if (g < r && g < b) g = 0;
        else b = 0;

        return("rgb(" + r + "," + g + "," + b + ")")
    }

    return(
        <>
            <div className='sidebar'>
                <form>
                    {Object.entries(genres).map(([key, value]) => (
                        <p className='genre'>
                            <label key={key}>
                                {key}
                                <input
                                    checked={genres[key]}
                                    onChange={() => handleChange(key)}
                                    type="checkbox"
                                />
                            </label>
                        </p>
                    ))}
                </form>
            </div>

            <div className="content">
                {games.map((game, i) => (
                    
                    <div key={i} className='thumnail'>
                        <img src={game['thumbnail']}></img>
                        <h3>{game['title']}</h3>
                        <p className='description'>{game['short_description']}</p>
                        <p className='genre' style={{backgroundColor: strToRGB(game['genre'], 255)}}>{game['genre']}</p>
                        <p className='platform'>{game['platform']}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Content