pipeline {
    agent any
    // "agent any" means run on any available Jenkins agent/node
    
    stages {
        // Stages are the main steps of your pipeline
        
        stage('Checkout') {
            // Stage 1: Get code from GitHub
            steps {
                echo 'Pulling code from GitHub...'
                // Jenkins does this automatically, this just prints a message
            }
        }
        
        stage('Build') {
            // Stage 2: Build/prepare your application
            steps {
                echo 'Building application...'
                
                // ADD YOUR BUILD COMMANDS HERE based on your project type:
                
                // For Node.js projects:
                // bat 'npm install'
                // bat 'npm run build'
                
                // For Python projects:
                // bat 'pip install -r requirements.txt'
                
                // For Java/Maven projects:
                // bat 'mvn clean install'
                
                // For static websites (HTML/CSS/JS):
                // No build needed, just echo message
            }
        }
        
        stage('Deploy') {
            // Stage 3: Deploy your application
            steps {
                echo 'Deploying application...'
                
                // ADD YOUR DEPLOYMENT COMMANDS HERE:
                
                // Example 1: Copy files to a web server folder
                // bat 'xcopy /E /I /Y . C:\\inetpub\\wwwroot\\myapp'
                
                // Example 2: Start a Node.js server
                // bat 'pm2 restart myapp || pm2 start server.js --name myapp'
                
                // Example 3: Copy to a deployment folder
                // bat 'robocopy . C:\\deployment\\myapp /MIR'
            }
        }
    }
}
