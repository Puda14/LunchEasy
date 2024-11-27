const HomeButton = () => {

    const handleClick = () => {
        window.location.href = '/';
    };

    return (
        <div className="m-4">
            <button onClick={handleClick}>
                <img src="/navigators/Home.png" alt="Home" />
            </button>
        </div>
    );
};

export default HomeButton;
