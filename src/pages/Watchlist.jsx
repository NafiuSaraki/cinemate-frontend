import React from 'react';
import { useFav } from '../context/FavContext';

const Watchlist = () => {
const { favorites } = useFav();
return (
<div className="p-4">
<h2 className="text-xl font-bold">My Watchlist</h2>
<ul>
{favorites.map((movie, idx) => (
<li key={idx}>{movie.title}</li>
))}
</ul>
</div>
);
};

export default Watchlist;

