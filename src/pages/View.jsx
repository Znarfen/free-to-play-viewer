import './View.css'
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

function View() {

    const gameId = useLocation().hash.split("#")[1];

    const [game, setGame] = useState({});
    const [gameImg, setGameImg] = useState({});
    const [gameImgIndex, setGameImgIndex] = useState(1);
    const [gameImgLength, setGameImgLength] = useState(0);
    const [favoritText, setFavoritText] = useState(saveOrRemoveFavorites(true) ? "Add to favorites" : "Remove from favorites");
    const [favoritColor, setFavoritColor] = useState(saveOrRemoveFavorites(true) ? "Green" : "Red");

    // call api to get game data
    function getGame(id) {
        fetch("/api/game?id=" + id)
            .then(response => response.json())
            .then(data => {
                setGame(data);
                setGameImg(data["screenshots"][0]["image"]);
                setGameImgLength(data["screenshots"].length);
            })
            .catch(error => console.error(error));
    }

    // function to change the image in the screenshots div
    function nextImage(direction = 'next') {
        if (direction == 'prev') {
            setGameImgIndex(gameImgIndex - 1)
            if (gameImgIndex <= 0) setGameImgIndex(gameImgLength - 1);
        }
        else if (direction == 'next') {
            setGameImgIndex(gameImgIndex + 1)
            if (gameImgIndex >= gameImgLength - 1) setGameImgIndex(0);
        }
        else {
            console.error("Invalid direction: " + direction + ". Use 'prev' or 'next'.");
            return;
        }
        setGameImg(game["screenshots"][gameImgIndex]["image"]);
    }

    // function to save or remove the game from favorites (favorits is in localStorage). Return true if already in favorites if look is true.
    function saveOrRemoveFavorites(look = false) {
        let favorites = "";

        if (localStorage.getItem("favorites") != null) {
            favorites = localStorage.getItem("favorites");
        }

        let addToFavorites = true;
        favorites.split(",").forEach(favorit => {
            if (favorit == gameId) addToFavorites = false;
        });

        if (look) return addToFavorites;

        if (addToFavorites) {
            localStorage.setItem("favorites", favorites + gameId + ",");
            setFavoritText("Remove from favorites");
            setFavoritColor("Red");
        }
        else {
            favorites = favorites.replace(gameId + ",", "");
            localStorage.setItem("favorites", favorites);
            setFavoritText("Add to favorites");
            setFavoritColor("Green");
        }

        return addToFavorites;
    }

    useEffect(() => {
        getGame(gameId);
    }, [])

    return (
        <>
            <h1>{game["title"]}</h1>

            <div className='screenshots'>
                <img src={gameImg} alt="screenshot" />
                <div>
                    <button onClick={() => {nextImage('prev')}}>&larr;</button>
                    <button onClick={() => {nextImage('next')}}>&rarr;</button>
                </div>
            </div>

            <div className='user-select'>
                <a href={game["game_url"]} className='user-select-button'>Play: {game["title"]}</a>
                <p></p>
                <button className='user-select-button' onClick={() => {saveOrRemoveFavorites()}} style={{color: favoritColor}}>{favoritText}</button>
            </div>

            <p className='view-description'>{game["description"]}</p>
        </>
    )
}

export default View;