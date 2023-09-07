import React, { useState, useRef } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import bgImage from "assets/images/doctors.jpg";
import bgImage2 from "assets/images/marie.jpg";
import "./style.css"; // Make sure to specify the correct path to your CSS file

const Image = () => {
    const containerRef = useRef(null);
    const sliderRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [sliderPosition, setSliderPosition] = useState(50);

    const handleMouseDown = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (event) => {
        if (!isDragging) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const sliderRect = sliderRef.current.getBoundingClientRect();

        const newPosition = ((event.clientX - containerRect.left) / containerRect.width) * 100;

        if (newPosition >= 0 && newPosition <= 100) {
            setSliderPosition(newPosition);
        }
    };

    const sliderHandleStyles = {
        position: "relative",
        left: "-20px",
        top: "50%",
        transform: "translateY(-50%)",
        width: "40px",
        height: "40px",
        background: "white",
        borderRadius: "50%",
        boxShadow: isDragging ? "0 4px 8px rgba(0, 0, 0, 0.3)" : "none",
        transition: "box-shadow 0.3s",
        cursor: isDragging ? "grabbing" : "grab",
        zIndex: 3,
    };

    const iconStyles = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "22px",
        color: "#333", // Icon color
    };

    return (
        <DashboardLayout style={{ height: '100vh', overflowY: 'scroll' }}>
            <div
                className="image-container"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                ref={containerRef}
            >
                <img
                    src={bgImage}
                    alt="Image 1"
                    className="image"
                    style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                />
                <img
                    src={bgImage2}
                    alt="Image 2"
                    className="image"
                    style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
                />
                <div
                    className="image-slider"
                    style={{ left: `${sliderPosition}%` }}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onTouchStart={handleMouseDown}
                    onTouchEnd={handleMouseUp}
                    ref={sliderRef}
                >
                    <div style={sliderHandleStyles}>
                        <div style={iconStyles}>
                            ↔️
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Image;
