window.addEventListener("load", () => {
    tsParticles.load("particles-js", {
        background: {
            color: "#f7f9fc"
        },
        particles: {
            number: {
            value: 50
            },
            color: {
            value: "#4a6fa5"
            },
            links: {
            enable: true,
            distance: 140,
            color: "#6fa8dc",
            opacity: 0.4,
            width: 1
            },
            move: {
            enable: true,
            speed: 0.6
            },
            opacity: {
            value: 0.5
            },
            size: {
            value: 3
            }
        },
        interactivity: {
            events: {
            onHover: {
                enable: true,
                mode: "grab"
            }
            },
            modes: {
            grab: {
                distance: 140,
                links: {
                opacity: 0.7
                }
            }
            }
        }
    })   
});