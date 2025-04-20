[![CI](https://github.com/mariansmolii/devlinks/actions/workflows/ci.yaml/badge.svg)](https://github.com/mariansmolii/devlinks/actions)

# Fullstack Kubernetes Deployment

This project demonstrates how to deploy a fullstack application on a Kubernetes cluster in Google Cloud Platform. It covers the entire flow: from infrastructure provisioning with Terraform, continuous integration via GitHub Actions, to automated deployment with FluxCD.

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Local Development](#local-development)
- [Infrastructure Deployment](#infrastructure-deployment)
- [Kubernetes Setup](#kubernetes-setup)

## Overview

This project uses a combination of tools and services to automate the deployment and management of a fullstack application on GKE:

- **Terraform —** infrastructure as code for GKE on GCP.
- **GitHub Actions —** CI/CD pipeline: test, build & push Docker images.
- **FluxCD —** GitOps: applies new manifests from GitHub and manages new image releases.
- **Sealed Secrets —** manages Kubernetes secrets securely via Git.
- **ExternalDNS + Cloudflare —** automated DNS record management..
- **Cert-Manager + Let’s Encrypt —** automated TLS certificates.
- **Database —** MongoDB deployed via the Bitnami Helm Chart.
- **Ingress —** for routing external traffic.
- **Prometheus + Grafana —** monitoring stack, with custom MongoDB dashboard.
- **Docker Compose —** for local development.

## Project Structure

```
├── .github                  # GitHub Actions Workflows
├── client                   # Frontend (Vite + React)
├── server                   # Backend (Node.js + Express)
├── terraform                # Infrastructure as Code (GCP provisioning)
├── kubernetes               # Kubernetes manifests
│   ├── apps
│   │   └── base
│   │       ├── client
│   │       ├── database
│   │       ├── ingress
│   │       └── server
│   ├── clusters
│   │   └── my-cluster
│   │       ├── flux-system
│   │       ├── apps-kustomization.yaml
│   │       ├── devlinks-policy.yaml
│   │       ├── devlinks-registry.yaml
│   │       ├── devlinks-source.yaml
│   │       ├── flux-system-automation.yaml
│   │       ├── infra-kustomization.yaml
│   │       └── monitoring-kustomization.yaml
│   ├── infrastructure
│   │   ├── configs
│   │   └── controllers
│   └── monitoring
│       ├── configs
│       └── controllers

```

## Local Development

### Clone the repository:

```bash
git clone https://github.com/mariansmolii/devlinks.git
cd devlinks
```

Before running the app locally, create `.env.local` file for the client and `.env` file for the server.

#### Sample `.env.local` for Client

```bash
VITE_BACKEND_URL=
VITE_FRONTEND_URL=
```

#### Sample `.env` for Server

```bash
PORT=
DB_HOST=
JWT_SECRET=
CLOUDINARY_FOLDER_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_CLOUD_NAME=
```

### Option 1 — Docker Compose

Run the full stack locally using **Docker Compose**.

#### Run Command

```bash
docker-compose up -d
```

#### This will spin up:

- db
- server
- client

### Option 2 — Manual

#### Start Client:

```bash
cd client
npm install
npm run dev
```

#### Start Server:

```bash
cd server
npm install
npm run dev
```

## Infrastructure Deployment

Provision the Kubernetes cluster using Terraform.

### Required Variables

Create a file named `terraform.tfvars` and fill in your values:

```hcl
project_id        = "your-gcp-project-id"
region            = "your-gcp-region"
zone              = "your-gcp-zone"
subnet_cidr_range = "10.0.0.0/20"    # or customize
machine_type      = "e2-medium"      # or customize
disk_size_gb      = 30               # or customize
```

### Deploy Cluster

To deploy the Kubernetes cluster, run the following commands:

```bash
cd terraform
terraform init
terraform apply
```

## Kubernetes Setup

After provisioning the infrastructure, this section covers applying Kubernetes manifests and setting up GitOps via FluxCD.

### GitOps Deployment with FluxCD

FluxCD automatically syncs changes from your GitHub repository to the Kubernetes cluster.

Flux deploys the following components:

- **Application Manifests** — from `kubernetes/apps/`
- **Infrastructure Controllers** — from `kubernetes/infrastructure/`
- **Monitoring Stack** — from `kubernetes/monitoring/`
- **Container Image Updates** — tracked via `ImageRepository`, `ImagePolicy`, and `ImageUpdateAutomation`

### FluxCD Bootstrap

To enable GitOps, bootstrap your GKE cluster with Flux and point it to this repository.

#### 1. Export GitHub credentials:

```bash
export GITHUB_TOKEN=<your-personal-access-token>
export GITHUB_USER=<your-github-username>
```

#### 2. Run Flux bootstrap:

```bash
flux bootstrap github \
  --components-extra=image-reflector-controller,image-automation-controller \
  --owner=$GITHUB_USER \
  --repository=your-repo \
  --branch=main \
  --path=kubernetes/clusters/my-cluster \
  --read-write-key \
  --personal
```
