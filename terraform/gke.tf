data "google_project" "project" {
  project_id = var.project_id
}

resource "google_container_cluster" "primary" {
  name                     = "${var.project_id}-gke"
  location                 = var.zone
  remove_default_node_pool = true
  initial_node_count       = 1
  network                  = google_compute_network.vpc.self_link
  subnetwork               = google_compute_subnetwork.private.self_link
  networking_mode          = "VPC_NATIVE"
  deletion_protection      = false

  addons_config {
    http_load_balancing {
      disabled = true
    }
    horizontal_pod_autoscaling {
      disabled = false
    }
  }

  ip_allocation_policy {
    cluster_secondary_range_name  = "pods-range"
    services_secondary_range_name = "services-range"
  }

  release_channel {
    channel = "REGULAR"
  }

  private_cluster_config {
    enable_private_nodes    = true
    enable_private_endpoint = false
    master_ipv4_cidr_block  = "192.168.0.0/28"
  }

  workload_identity_config {
    workload_pool = "${data.google_project.project.project_id}.svc.id.goog"
  }
}

resource "google_container_node_pool" "primary_nodes" {
  for_each = local.node_pools

  name       = "${each.key}-node-pool"
  cluster    = google_container_cluster.primary.id
  location   = google_container_cluster.primary.location
  node_count = 1

  management {
    auto_upgrade = true
    auto_repair  = true
  }

  node_config {
    machine_type = var.machine_type
    disk_size_gb = var.disk_size_gb
    labels = {
      "app" = each.value.label
    }

    tags = ["${var.project_id}-gke-node"]

    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform",
    ]
  }
}

