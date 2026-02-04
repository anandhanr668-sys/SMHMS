terraform {
  required_version = ">= 1.5.0"

  required_providers {
    null = {
      source  = "hashicorp/null"
      version = ">= 3.2.0"
    }
  }
}

provider "null" {}

resource "null_resource" "platform" {
  triggers = {
    project     = var.project_name
    environment = var.environment
  }

  provisioner "local-exec" {
    command = "echo HMS Platform Terraform initialized"
  }
}

output "status" {
  value = "HMS Terraform base initialized successfully"
}
