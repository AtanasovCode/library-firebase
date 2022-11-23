const ProgressBar = ({progress}) => {

    const parentStyle = {
        width: "100%",
        height: "15px",
        display: "flex",
        alignItems: "center",
        justifyContent: "centter",
        backgroundColor: "var(--progress-bg)",
        borderRadius: "25px",
    }

    const childStyle = {
        width: `${progress}%`,
        height: "75%",
        maxWidth: '99%',
        marginLeft: '2px',
        backgroundColor: "var(--progress-filled-bg)",
        borderRadius: "25px",
        transition: "all 2s ease-in-out",
    }

    return (
        <div className="progress-parent" style={parentStyle}>
            <div className="progress-child" style={childStyle}>
            </div>
        </div>
    );
}

export default ProgressBar;