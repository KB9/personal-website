terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }
}

provider "aws" {
  profile = "default"
  region  = "eu-west-1"
}

resource "aws_instance" "personal_website" {
  ami           = "ami-08bac620dc84221eb"
  instance_type = "t2.nano"

  tags = {
    Name = "PersonalWebsite"
  }
}