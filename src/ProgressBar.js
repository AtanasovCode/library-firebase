const ProgressBar = ({progress}) => {

    const parentStyle = {
        width: "100%",
        height: "15px",
        display: "flex",
        alignItems: "center",
        justifyContent: "centter",
        backgroundColor: "white",
        borderRadius: "25px",
    }

    const childStyle = {
        width: `${progress}%`,
        height: "75%",
        maxWidth: '99%',
        marginLeft: '2px',
        backgroundColor: "dodgerblue",
        borderRadius: "25px",
        transition: "all 1s ease-in-out",
    }

    return (
        <div className="progress-parent" style={parentStyle}>
            <div className="progress-child" style={childStyle}>
            </div>
        </div>
    );
}

export default ProgressBar;