pipeline {
    agent {
        node {label 'stage-ai-app-server'}
    }

    parameters{
        string(
            defaultValue: 'main', 
            name: 'ai_git_branch', 
            description: 'BCP project repository branch', 
            trim: true
        )
    }

    stages {
        stage('Git_clone/pull_repository') {
           steps {
                sh 'echo "Creating the necessary directories and clone/pull bcp project"'
                dir ('./') {
                    git branch: "${params.ai_git_branch}",
                        credentialsId: 'ai_jenkins_git',
                        url: 'git@github.com:InfusemediaTeam/infuse-ai-app.git'
                }

            }

        }
        stage('Build_docker_images') {
            steps {
                script {                    
                    sh 'echo "Run docker compose build"'
                    sh 'cd ./.deploy/ && docker compose -f ./docker-compose.yaml --project-directory ./  build'
                }
            }
        }
        stage('Deployment') {
            steps {
                script {                    
                    sh 'echo "Run docker compose up"'
                    sh 'cd ./.deploy/ && docker compose -f ./docker-compose.yaml --project-directory ./ up -d'
                }
            }
        }
    }

}
