# Todo Web App - AWS Cloud Deployment

## Overview
A responsive todo web application deployed on AWS with automated CI/CD pipeline and infrastructure as code.

**Live Demo**: http://todo-env-new.eba-ysmyupg7.us-east-1.elasticbeanstalk.com/

## Architecture
```
GitHub Repository → AWS CodePipeline → Elastic Beanstalk → Production
```

## Technologies Used
**Frontend**: HTML5, CSS3, JavaScript ES6+  
**Cloud**: AWS (Beanstalk, EC2, S3, IAM, CodePipeline)  
**DevOps**: Terraform, AWS CLI  
**Platform**: Apache Tomcat, Amazon Linux 2  

## Infrastructure & Deployment
- **Platform**: AWS Elastic Beanstalk (Tomcat 9)
- **Compute**: EC2 t3.micro instance  
- **Storage**: Amazon S3 for deployment artifacts
- **Security**: IAM roles with least-privilege access
- **Automation**: Terraform Infrastructure as Code
- **CI/CD**: AWS CodePipeline with GitHub integration

## Project Structure
```
├── app/
│   ├── index.html          # Main application
│   ├── style.css           # Application styling
│   └── script.js           # Todo functionality
└── README.md               # Project documentation
```

## Deployment Process
1. **Code Push** → GitHub repository
2. **Pipeline Trigger** → AWS CodePipeline detects changes  
3. **Build & Package** → Application bundled for deployment
4. **Deploy** → Elastic Beanstalk updates production environment
5. **Live** → Application accessible at AWS endpoint

## Images
<img src="https://github.com/quocm1nh238/aws-devops-project/blob/main/images/todo-app.png" width="720">
