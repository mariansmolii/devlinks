resource "google_container_cluster" "primary" {
  name                     = "${var.project_id}-gke"
  location                 = var.zone
  remove_default_node_pool = true
  initial_node_count       = 1
  network                  = google_compute_network.vpc_network.name
  subnetwork               = google_compute_subnetwork.subnet.name
  networking_mode          = "VPC_NATIVE"
  deletion_protection      = false

  release_channel {
    channel = "REGULAR"
  }

  ip_allocation_policy {
    cluster_secondary_range_name  = "pods-range"
    services_secondary_range_name = "services-range"
  }
}

resource "google_container_node_pool" "primary_nodes" {
  for_each = local.node_pools

  name       = "${each.key}-node-pool"
  cluster    = google_container_cluster.primary.name
  location   = google_container_cluster.primary.location
  node_count = 1

  node_config {
    machine_type = var.machine_type
    disk_size_gb = var.disk_size_gb
    labels = {
      "app" = each.value.label
    }
    tags = ["${var.project_id}-gke-node"] 
  }
}

