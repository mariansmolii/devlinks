resource "kubernetes_namespace" "ns" {
  metadata {
    name = var.external_secrets_ns
  }

  depends_on = [
    google_container_cluster.primary,
    google_container_node_pool.primary_nodes
  ]
}

resource "kubernetes_service_account" "external_secret_sa" {
  metadata {
    name      = var.external_secrets_sa_name
    namespace = kubernetes_namespace.ns.metadata[0].name
    annotations = {
      "iam.gke.io/gcp-service-account" = google_service_account.external_secrets_sa.email
    }
  }

  depends_on = [
    kubernetes_namespace.ns,
    google_container_cluster.primary,
    google_container_node_pool.primary_nodes
  ]
}
