// Define variables.
// TODO: Customise these values. Must match the values in the deployment.yaml file.
def app_name = "sms-api"
def environment = "prod"
def major_version = "1"
def minor_version = "1"
def namespace = "services"
def cluster_context = "irembo-cluster"

pipeline {
    agent any
    stages {
        stage('ECR login') {
            steps {
            
                sh '$(aws ecr get-login --no-include-email --region us-east-1)'          
            }
        }
        stage('Create & tag image') {
            steps {
                // TODO: Replace app name
                sh "docker build --no-cache -t ${app_name} ." 
                // TODO: Replace app name, environment, major and minor versions.
                sh "docker tag ${app_name}:latest 126480227765.dkr.ecr.us-east-1.amazonaws.com/${app_name}:${environment}_v${major_version}.${minor_version}" 
            }
        }
        stage('ECR push image') {
            steps {
                // TODO: Replace app name, environment, major and minor versions.
                sh "docker push 126480227765.dkr.ecr.us-east-1.amazonaws.com/${app_name}:${environment}_v${major_version}.${minor_version}"
            }
        }
        // TODO: create multiline to improve readability. 
        stage('Deployment to k8') {
            steps {
                // if deployment does not exist, create it via the deployment file.
                    sh "[ ! -z \"\$(kubectl --context=${cluster_context} get deployment --namespace=${namespace} ${app_name}-deployment-${environment} -o name 2>/dev/null)\" ] || kubectl --kubeconfig ~ubuntu/.kube/config apply -f ./deployment-${environment}.yaml --context=${cluster_context}"

                // if deployment already exists, perform rolling update with new image.
                    sh "[ -z \"\$(kubectl --context=${cluster_context} get deployment --namespace=${namespace} ${app_name}-deployment-${environment} -o name 2>/dev/null)\" ] || kubectl --kubeconfig ~ubuntu/.kube/config set image deployment ${app_name}-deployment-${environment} ${app_name}-container=126480227765.dkr.ecr.us-east-1.amazonaws.com/${app_name}:${environment}_v${major_version}.${minor_version} --namespace=${namespace}  --context=${cluster_context}"
            }
        }
    }
}

// https://github.com/eldada/jenkins-pipeline-kubernetes/blob/master/Jenkinsfile
