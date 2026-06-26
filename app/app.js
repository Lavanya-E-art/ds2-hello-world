const express = require('express');
const app = express();
const PORT = 8080;

// Main endpoint returning a styled, interactive HTML dashboard page
app.get('/', (req, res) => {
    const htmlResponse = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>DS2 DevOps Dashboard</title>
        <style>
            :root {
                --primary: #2563eb;
                --primary-hover: #1d4ed8;
                --background: #f8fafc;
                --card-bg: #ffffff;
                --text-main: #0f172a;
                --text-muted: #64748b;
                --success: #10b981;
            }

            * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }

            body {
                background-color: var(--background);
                color: var(--text-main);
                display: flex;
                flex-direction: column;
                min-height: 100vh;
            }

            header {
                background-color: var(--card-bg);
                border-bottom: 1px solid #e2e8f0;
                padding: 1.5rem 2rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-shadow: 0 1px 3px rgba(0,0,0,0.05);
            }

            .logo-area h1 {
                font-size: 1.5rem;
                color: var(--primary);
                font-weight: 700;
            }

            .logo-area p {
                font-size: 0.85rem;
                color: var(--text-muted);
            }

            .badge {
                background-color: rgba(16, 185, 129, 0.1);
                color: var(--success);
                padding: 0.4rem 0.8rem;
                border-radius: 2rem;
                font-size: 0.85rem;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 0.4rem;
            }

            .pulse {
                width: 8px;
                height: 8px;
                background-color: var(--success);
                border-radius: 50%;
                display: inline-block;
                animation: blink 1.5s infinite ease-in-out;
            }

            @keyframes blink {
                0% { opacity: 0.4; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.2); }
                100% { opacity: 0.4; transform: scale(1); }
            }

            main {
                flex: 1;
                max-width: 800px;
                width: 100%;
                margin: 3rem auto;
                padding: 0 1.5rem;
            }

            .welcome-card {
                background: var(--card-bg);
                border-radius: 1rem;
                padding: 2.5rem;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
                border: 1px solid #e2e8f0;
                text-align: center;
            }

            .welcome-card h2 {
                font-size: 2.2rem;
                margin-bottom: 1rem;
                color: var(--text-main);
            }

            .welcome-card .subtitle {
                font-size: 1.1rem;
                color: var(--text-muted);
                margin-bottom: 2rem;
                line-height: 1.6;
            }

            .interactive-section {
                background: #f1f5f9;
                border-radius: 0.75rem;
                padding: 1.5rem;
                margin-bottom: 2rem;
                border: 1px dashed #cbd5e1;
            }

            .btn {
                background-color: var(--primary);
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                font-size: 1rem;
                font-weight: 600;
                border-radius: 0.5rem;
                cursor: pointer;
                transition: background-color 0.2s, transform 0.1s;
                box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
            }

            .btn:hover {
                background-color: var(--primary-hover);
            }

            .btn:active {
                transform: scale(0.98);
            }

            #demo-counter {
                font-size: 1.2rem;
                font-weight: bold;
                color: var(--primary);
                margin-top: 1rem;
            }

            .tech-stack {
                display: flex;
                justify-content: center;
                gap: 1rem;
                flex-wrap: wrap;
                margin-top: 2rem;
            }

            .tech-badge {
                background: #e2e8f0;
                color: #334155;
                padding: 0.3rem 0.75rem;
                border-radius: 0.25rem;
                font-size: 0.85rem;
                font-weight: 500;
            }

            footer {
                text-align: center;
                padding: 2rem;
                color: var(--text-muted);
                font-size: 0.85rem;
                border-top: 1px solid #e2e8f0;
                background-color: var(--card-bg);
            }
        </style>
    </head>
    <body>

        <header>
            <div class="logo-area">
                <h1>DS2 DevOps Deployment</h1>
                <p>Digital Systems 2 — Project</p>
            </div>
            <div class="badge">
                <span class="pulse"></span> Production Active
            </div>
        </header>

        <main>
            <div class="welcome-card">
                <h2>Welcome to DS2 Project!</h2>
                <p class="subtitle">
                    This Node.js & Express application was dynamically compiled, tested, and deployed entirely automatically using an end-to-end GitOps CI/CD pipeline.
                </p>

                <div class="interactive-section">
                    <p style="margin-bottom: 0.5rem; font-weight: 500;">Live Interaction Counter</p>
                    <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1rem;">
                        Click below to verify client-side JS runtime operational stability inside this Docker container.
                    </p>
                    <button class="btn" id="click-btn">Click Me!</button>
                    <div id="demo-counter">Total Clicks: 0</div>
                </div>

                <p style="font-size: 0.9rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
                    Engineered Using
                </p>
                <div class="tech-stack">
                    <span class="tech-badge">Node.js</span>
                    <span class="tech-badge">Express Framework</span>
                    <span class="tech-badge">Docker Containers</span>
                    <span class="tech-badge">Docker Compose</span>
                    <span class="tech-badge">GitHub Actions</span>
                    <span class="tech-badge">AWS EC2 (Ubuntu 26.04)</span>
                </div>
            </div>
        </main>

        <script>
            // Client-side interactive capability script
            let count = 0;
            const btn = document.getElementById('click-btn');
            const display = document.getElementById('demo-counter');

            btn.addEventListener('click', () => {
                count++;
                display.innerText = 'Total Clicks: ' + count;
                
                // Add a small bounce effect on click
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => { btn.style.transform = 'scale(1)'; }, 100);
            });
        </script>
    </body>
    </html>
    `;
    res.send(htmlResponse);
});

// Health check endpoint for Docker/CI-CD
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});