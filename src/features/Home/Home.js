import React from "react";

const Home = () => {

    const name = localStorage.getItem('userName');

    return (
        <div>
            Hello {name}
        </div>
    )
}

export default Home