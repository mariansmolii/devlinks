variable "project_id" {
  type        = string
  description = "The ID of the project in which the resources will be created."
}

variable "region" {
  type        = string
  description = "The region in which the resources will be created."
}

variable "zone" {
  type        = string
  description = "The zone in which the resources will be created."
}

variable "subnet_cidr_range" {
  type        = string
  description = "The CIDR range for the VPC network."
  default     = "10.0.0.0/20"
}

variable "machine_type" {
  type        = string
  description = "node machine type"
  default     = "e2-medium"
}

variable "disk_size_gb" {
  type        = number
  description = "node disk size in GB"
  default     = 30
}

variable "external_secrets_ns" {
  type        = string
  description = "The namespace in which External Secrets will be installed."
  default     = "external-secrets"
}

variable "external_secrets_sa_name" {
  type        = string
  description = "The name of the External Secrets service account."
  default     = "external-secrets-sa"
}

variable "gke_secrets" {
  type        = map(string)
  description = "A map of GKE secrets to be created. The keys are the names of the secrets, and the values are the secret data."
  sensitive   = true
}
