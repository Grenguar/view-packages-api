# view-packages-api

REST API for checking what packages are installed in Ubuntu/Debian

## Instructions

Run `npm install && npm run prod` and go to one of the listed endpoints (better using Postman or curl).

## Endpoints

Basic REST

- GET /api/v1/packages/ - gives the list of installed packages
- GET /api/v1/packages/{package_name} - gives more detailed info about the package. Note: package should be from the list

HATEOAS implementation

- GET /api/v2/packages/ - gives the list of installed packages
- GET /api/v2/packages/{package_name} - gives more detailed info about the package. Note: package should be from the list

## Examples

- GET http://localhost:8080/api/v1/packages/
- GET http://localhost:8080/api/v1/packages/vim-common

- GET http://localhost:8080/api/v2/packages/
- GET http://localhost:8080/api/v2/packages/vim-common

## To run with Docker

- From root folder `docker build -t view_packages_api . && docker run --rm -i -p 8080:8080 --name=view_packages_api -t view_packages_api`
