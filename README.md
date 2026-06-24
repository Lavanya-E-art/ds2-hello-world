# DevOps Project: Automated Node.js + Express CI/CD Pipeline

[cite_start]A fully automated, individual continuous integration and continuous deployment (CI/CD) infrastructure designed for the Digital Systems 2 module[cite: 1]. This project showcases production-level containerization, orchestration, and automated server deployment using modern cloud practices.

---

## 🛠 Project Architecture Flow

The workflow operates on a modern "GitOps" push-to-deploy strategy. The automatic system lifecycle runs as follows:

```text
[ Local Laptop ] --- git push ---> [ GitHub Repository ]
                                           │
                                    (Triggers Actions)
                                           │
                                           ▼
                                  [ GitHub Runner Machine ]
                                  ├── Build Docker Image
                                  └── Test App Status & Health
                                           │
                                    (If Tests Pass)
                                           │
                                           ▼
                                 [ Production AWS EC2 ]
                                  ├── Secure File Copy (SCP)
                                  ├── SSH Remote Control
                                  └── Docker Compose Production Up

1. Local Development: Code changes are made and pushed to the main branch.  
2. CI Stage (Build & Test): GitHub Actions spins up a clean Ubuntu environment, builds the Docker image, spins up a test container, and tests the active routes using curl.  
3. CD Stage (Secure Deployment): If tests pass, GitHub safely authenticates with the AWS EC2 instance using stored repository secrets. It securely transfers the orchestration configuration and project files via SCP, connects over SSH, builds the new application context, and launches the application. 

Project Structure:
├── app/
│   └── app.js           # Core Express server (routing, port bindings, and endpoint logic)
├── .github/workflows/
│   └── deploy.yml       # Complete multi-stage automated workflow pipeline file
├── .dockerignore        # Optimizes image builds by excluding bulky developer directories
├── .gitignore           # Crucial security barrier preventing local secrets from reaching git
├── compose.yml          # Local multi-container development environment config
├── docker-compose.prod.yml  # Strict production orchestration layout (restart limits, logging)
├── Dockerfile           # Multi-layered build definition for lightweight production Node image
├── package.json         # Explicit application metadata and ecosystem dependency declarations
└── package-lock.json    # Strict dependency lockfile enforcing deterministic reproducible builds

How to Run Locally:
Make sure you have Docker and Desktop Compose installed on your machine.
Instructions

 Clone the repository to your machine:
 Bash
    git clone <your-repository-url>
    cd ds2-hello-world
    Launch the application in detached local development mode using Docker Compose:

 Bash
    docker compose up -d
    Open your browser and navigate to:
        Main View: http://localhost:8080/
        Health Check: http://localhost:8080/health

 To shut down the local environment:
 Bash
    docker compose down

# Production Cloud Infrastructure
The application runs on a remote cloud infrastructure hosted via Amazon Web Services (AWS). 
    Server Host: AWS EC2 Instance   
    Operating System: Ubuntu Server 26.04 LTS (Resolute Raccoon)
    Hardware Type: t2.micro (Free-Tier Eligible)   
    Security Group Rules 
      Inbound:Port 22 (SSH): Open for administrative secure runner automation.  
      Port 8080 (Custom TCP): Open to the public internet to expose the active Express application.  

# Security Strategy & Secrets Management
To maintain enterprise-level security, no plain passwords, private host IP addresses, or sensitive authentication parameters are stored directly inside the code repository.  
Authentication is decoupled using 
  GitHub Repository Secrets:  
    SERVER_IP: Stores the hidden targeted Public IPv4 address of the production server.  SERVER_USER: Stores the standard remote cloud login handle (ubuntu).  
    SERVER_SSH_KEY: Securely retains the text of the private cryptography key (.pem file).  
The .gitignore and .dockerignore files are intentionally hardcoded with protective rules (*.pem, .env, node_modules/) ensuring administrative keys and local files are never exposed to public version tracking. 


# Automated Operations
When connecting back to the infrastructure or during operational audits, utilize these reference commands:  
Connecting directly to the ServerBash
    ssh -i ds2-key.pem ubuntu@<YOUR-EC2-PUBLIC-IP>
Checking Active Runtime Status on ServerBash
    # View active container processes
        docker ps

    # Stream live multi-container engine runtime logs
        docker compose -f ~/deploy/docker-compose.prod.yml logs -f

    # Force manual rebuild/restart of production stacks
        cd ~/deploy && docker compose -f docker-compose.prod.yml up -d --build
