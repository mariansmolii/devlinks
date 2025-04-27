locals {
  gke_secrets_map = nonsensitive(var.gke_secrets)
}

resource "google_secret_manager_secret" "secrets" {
  for_each  = local.gke_secrets_map
  secret_id = each.key

  replication {
    auto {}
  }
}

resource "google_secret_manager_secret_version" "secrets_version" {
  for_each = local.gke_secrets_map

  secret         = google_secret_manager_secret.secrets[each.key].id
  secret_data_wo = each.value
}
