// js/chat.js

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("chat_button");

    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    btn.appendChild(canvas);

    // p5.js instance mode
    new p5((p) => {
        const nodes = [];
        const NODE_COUNT = 8;

        p.setup = () => {
            p.createCanvas(64, 64).parent("chat_button");
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
    });



    // === 1. Находим кнопку ===
    const chatButton = document.getElementById("chat_button");

    // === 2. Создаём окно чата ===
    const chatWindow = document.createElement("div");
    chatWindow.id = "chat_window";
    chatWindow.style.display = "none"; // скрыто по умолчанию

    // === 3. Создаём историю чата ===
    const chatHistory = document.createElement("div");
    chatHistory.id = "chat_history";

    // === 4. Создаём область ввода ===
    const chatInputArea = document.createElement("div");
    chatInputArea.id = "chat_input_area";

    // === 5. Поле ввода ===
    const chatInput = document.createElement("input");
    chatInput.id = "chat_input";
    chatInput.placeholder = "Ask me anything...";

    // === 6. Кнопка отправки ===
    const chatSend = document.createElement("div");
    chatSend.id = "chat_send";

    // === 7. Собираем структуру ===
    chatInputArea.appendChild(chatInput);
    chatInputArea.appendChild(chatSend);

    chatWindow.appendChild(chatHistory);
    chatWindow.appendChild(chatInputArea);

    // === 8. Вставляем окно чата в DOM ===
    document.body.appendChild(chatWindow);

    // === 9. Открытие окна при наведении на кнопку ===
    chatButton.addEventListener("mouseenter", () => {
        chatWindow.style.display = "flex";
    });

    // === 10. Закрытие окна при уходе мыши (опционально) ===
    chatWindow.addEventListener("mouseleave", () => {
        chatWindow.style.display = "none";
    });
});
