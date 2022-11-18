pipeline{
    agent any
    stages{
        stage('pull'){
            steps{
              git poll: false, url: 'https://github.com/MOBOUTACHAGOMurielle/jenkins-helloworld.git'
            }
        }
        stage('build'){
            steps {
              sh 'javac Main.java'
            }
        }
        stage('run'){
            steps {
                sh 'java Main'
            }
        }
    }
}