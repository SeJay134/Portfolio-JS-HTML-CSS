document.addEventListener("DOMContentLoaded", () => {
    const chatButton = document.getElementById("chat_button");

    // --- p5 animation ---
    const sketch = (p) => {
        const nodes = [];
        const NODE_COUNT = 8;

        p.setup = () => {
            const canvas = p.createCanvas(64, 64);
            canvas.parent(chatButton); // keep it inside but not scaling with transform
            canvas.style.pointerEvents = "none"; // prevent click interference

            for (let i = 0; i < NODE_COUNT; i++) {
                nodes.push({
                    x: p.random(16, 48),
                    y: p.random(16, 48),
                    dx: p.random(-0.05, 0.05),
                    dy: p.random(-0.05, 0.05)
                });
            }
        };

        p.draw = () => {
            p.background(15);
            p.stroke(0, 200, 255, 120);
            p.strokeWeight(1);

            for (let i = 0; i < NODE_COUNT; i++) {
                for (let j = i + 1; j < NODE_COUNT; j++) {
                    const n1 = nodes[i];
                    const n2 = nodes[j];
                    const d = p.dist(n1.x, n1.y, n2.x, n2.y);
                    if (d < 30) {
                        const alpha = p.map(d, 0, 30, 180, 0);
                        p.stroke(0, 200, 255, alpha);
                        p.line(n1.x, n1.y, n2.x, n2.y);
                    }
                }
            }

            for (let n of nodes) {
                n.x += n.dx;
                n.y += n.dy;

                if (n.x < 12 || n.x > 52) n.dx *= -1;
                if (n.y < 12 || n.y > 52) n.dy *= -1;

                const pulse = 3 + p.sin(p.frameCount * 0.05 + n.x * 0.1) * 1.5;

                p.noStroke();
                p.fill(0, 220, 255);
                p.circle(n.x, n.y, pulse + 2);

                p.fill(0, 120, 255);
                p.circle(n.x, n.y, pulse);
            }
        };
    };
    new p5(sketch);

    // --- chat window ---
    const chatWindow = document.createElement("div");
    chatWindow.id = "chat_window";

    const chatHistory = document.createElement("div");
    chatHistory.id = "chat_history";


    const chatInputArea = document.createElement("div");
    chatInputArea.id = "chat_input_area";

    const chatInput = document.createElement("textarea");
    chatInput.id = "chat_input";
    chatInput.placeholder = "Ask me anything...";
    chatInput.maxLength = 300;
    chatInput.rows = 1;
    chatInput.style.resize = "none";
    chatInput.style.overflowY = "hidden";
    chatInput.style.lineHeight = "20px";

    const maxHeight = 20 * 4;

    chatInput.addEventListener("input", () => {
        chatInput.style.height = "auto";
        const newHeight = Math.min(chatInput.scrollHeight, maxHeight);
        chatInput.style.height = newHeight + "px";
        chatInput.style.overflowY = chatInput.scrollHeight > maxHeight ? "auto" : "hidden";
    });

    // --- message pipeline ---
    function sendMessage(text) {
        if (!text.trim()) return;

        const bubble = document.createElement("div");
        bubble.className = "user_message";
        bubble.textContent = text;
        chatHistory.appendChild(bubble);

        chatHistory.scrollTop = chatHistory.scrollHeight;
        console.log("Send:", text);
    }

    // --- Enter / Shift+Enter ---
    chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage(chatInput.value);
            chatInput.value = "";
            chatInput.style.height = "20px";
        }
    });

    chatInputArea.appendChild(chatInput);
    chatWindow.appendChild(chatHistory);
    chatWindow.appendChild(chatInputArea);
    document.body.appendChild(chatWindow);

    // --- toggle ---
    let isOpen = false;

    chatButton.addEventListener("click", () => {
        isOpen = !isOpen;
        chatWindow.classList.toggle("open", isOpen);
        chatButton.style.transform = isOpen ? "scale(0.55)" : "scale(1)";
    });

    // --- outside click ---
    document.addEventListener("click", (e) => {
        if (!chatWindow.contains(e.target) && !chatButton.contains(e.target)) {
            isOpen = false;
            chatWindow.classList.remove("open");
            chatButton.style.transform = "scale(1)";
        }
    });
});
