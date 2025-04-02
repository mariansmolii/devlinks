locals {
  node_pools = {
    "client" = {
      label = "client"
    },
    "server" = {
      label = "server"
    },
    "database" = {
      label = "db"
    },
  }

  apis = [
    "compute.googleapis.com",
    "container.googleapis.com",
  ]

}