resource "google_compute_network" "vpc_network" {
  name                    = "${var.project_id}-vpc"
  auto_create_subnetworks = false

  depends_on = [google_project_service.api]
}

resource "google_compute_subnetwork" "subnet" {
  name          = "${var.project_id}-subnet"
  region        = var.region
  network       = google_compute_network.vpc_network.name
  ip_cidr_range = var.subnet_cidr_range

  secondary_ip_range {
    range_name    = "pods-range"
    ip_cidr_range = "10.1.0.0/20"
  }

  secondary_ip_range {
    range_name    = "services-range"
    ip_cidr_range = "10.2.0.0/20"
  }
}