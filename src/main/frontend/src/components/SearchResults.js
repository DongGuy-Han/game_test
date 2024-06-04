import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './css/SearchResults.css';
import NavBar from './NavBar'; // NavBar 컴포넌트 임포트

function SearchResults() {
    const location = useLocation();
    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const query = new URLSearchParams(location.search).get('q');

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await axios.get(`/games`, { params: { kw: query } });
                setGames(response.data.content);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch search results.');
                setLoading(false);
                console.error(err);
            }
        };

        fetchSearchResults();
    }, [query]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (games.length === 0) {
        return <div>No results found for "{query}"</div>;
    }

    return (
        <div className="search-results-page">
            <NavBar /> {/* NavBar 컴포넌트 추가 */}
            <h2>Search Results for "{query}"</h2>
            <div className="search-results">
                {games.map(game => (
                    <div key={game.id} className="search-result-item" onClick={() => navigate(`/game/${game.id}`)}>
                        <img src={game.thumb} alt={game.title} className="search-result-image" />
                        <div className="search-result-title">{game.title}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchResults;
