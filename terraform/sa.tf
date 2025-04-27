resource "google_service_account" "external_secrets_sa" {
  account_id   = "external-secrets-sa"
  display_name = "External Secrets Service Account"
}

resource "google_project_iam_member" "secret_accessor" {
  member  = "serviceAccount:${google_service_account.external_secrets_sa.email}"
  project = var.project_id
  role    = "roles/secretmanager.secretAccessor"
}

resource "google_service_account_iam_member" "workload_identity_user" {
  service_account_id = google_service_account.external_secrets_sa.name
  role               = "roles/iam.workloadIdentityUser"
  member             = "serviceAccount:${var.project_id}.svc.id.goog[${var.external_secrets_ns}/external-secrets-sa]"
}