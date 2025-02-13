# Kubernetes Deployment for React, Node.js, MongoDB Application

## Project Overview

This project demonstrates the deployment of a full-stack application consisting of a React frontend, Node.js backend, and MongoDB database on a Kubernetes cluster. The deployment leverages GitHub Actions for CI, FluxCD for GitOps-based deployments, Sealed Secrets for secure secret management, dynamic DNS management with Cloudflare and ExternalDNS, automated SSL/TLS certificate handling with Cert-Manager and Let's Encrypt. For local development, Docker Compose is used.

## Technologies Used

- **Client:** A client-side application built with React.
- **Server:** A RESTful API server built with Node.js.
- **MongoDB:** The NoSQL database used to store application data.
- **Kubernetes:** Container orchestration
- **GitHub Actions:** CI pipeline for testing, building, and pushing Docker images
- **FluxCD:** GitOps continuous delivery tool for Kubernetes that automatically ensures that the state of a cluster matches the configuration in Git.
- **Sealed Secrets:** Securely stores and decrypts Kubernetes secrets.
- **External-DNS + Cloudflare:** Automatically updates DNS records.
- **Cert-Manager + Let's Encrypt:** Automated TLS/SSL certificate management
- **Ingress Controller:** Manages external access to the services within the cluster.

## Folder Structure

```plaintext
📦 devlinks 
├── 📂 client  
├── 📂 server  
└── 📂 k8s  
    ├── 📂 apps  
    │   ├── 📂 client  
    │   ├── 📂 db  
    │   └── 📂 server  
    ├── 📂 clusters  
    │   └── 📂 my-cluster  
    │       └── 📂 flux-system  
    └── 📂 infrastructure  
        ├── 📂 configs  
        ├── 📂 controllers  
        └── 📂 ingress  
```
