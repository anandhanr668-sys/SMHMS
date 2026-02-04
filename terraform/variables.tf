variable "project_name" {
  description = "Project name"
  type        = string
  default     = "hms-platform"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "development"
}

variable "region" {
  description = "Deployment region"
  type        = string
  default     = "us-east-1"
}
