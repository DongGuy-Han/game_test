import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './css/GameDetailPage.css';
import NavBar from './NavBar'; // NavBar 컴포넌트 임포트

function GameDetailPage() {
    const { gameId } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGameDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/games/${gameId}`);
                setGame(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch game data.');
                setLoading(false);
                console.error(err);
            }
        };

        fetchGameDetails();
    }, [gameId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!game) {
        return <div>Game not found</div>;
    }

    // Ensure the reviews list is not undefined or null
    const reviews = game.reviewList || [];
    const averageRating = reviews.length > 0
        ? reviews.reduce((acc, review) => acc + review.starPoint, 0) / reviews.length
        : 0;

    const ratingCounts = {};
    reviews.forEach(review => {
        ratingCounts[review.starPoint] = (ratingCounts[review.starPoint] || 0) + 1;
    });

    const maxReviews = Math.max(0, ...Object.values(ratingCounts));

    function generateStars(rating) {
        return "★".repeat(rating) + "☆".repeat(5 - rating);
    }

    return (
        <div className="App">
            <NavBar /> {/* NavBar 컴포넌트를 추가 */}
            <div className="game-detail">
                <div className="game-data">
                    <div className="first-row">
                        <div className="game-banner">
                            <img src={game.thumb} alt={`Cover of ${game.title}`} />
                        </div>
                    </div>
                    <div className="second-row">
                        <div className="game-info">
                            <h1>{game.title}</h1>
                            <h4>출시일 : {new Date(game.releaseDate).toLocaleDateString()} | {game.publisher}</h4>
                            <p>{game.description}</p>
                        </div>
                        <div className="game-rating">
                            <div className="total-rating">
                                평균 별점: {averageRating.toFixed(1)} {generateStars(Math.round(averageRating))}
                            </div>
                            <div className="rating-bar-container">
                                {Object.entries(ratingCounts).map(([rating, count]) => (
                                    <div key={rating} className="rating-bar"
                                         style={{ height: `${(count / maxReviews) * 100}%` }}>
                                        <span className="rating-text">{rating} Star ({count})</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="game-reviews">
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={index} className="review-item">
                                <h3>{review.username}</h3>
                                <p>{review.content}</p>
                                <p>Rating: {generateStars(review.starPoint)}</p>
                            </div>
                        ))
                    ) : (
                        <div>No reviews yet.</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GameDetailPage;
