# Cargo site demo

## Project Structure
1. /cms/client - Web app for web site frontend built on React Router. The entry web site built with React Router. CSS styling and site mobile responsive are powered by Tailwind CSS library.

2. /cms/server - A CMS for content management built on Strapi (https://strapi.io). Strapi is a Open Source Headless CMS. It is included in design to all site admin to manage articles, Hero Banner, header and footer links.
Site content for demostration is already migrated to CMS DB during building docker container.

3. /dbapi - Spring-boot web app for API. Sprint-boot Web app for API to query Flight search result from mongoDB. 

4. /db - MongoDB, Application database for Flight lists. Data for demo is migrated to DB during building docker container.


## Build instruction
### 1. Build Sprint-boot application
```
$ cd ./dbap
$ ./mvnw clean package
```

### 2. Build Docker containers
Docker image building and deployment for all component are managed by ./docker-compose.yml with docker compose in one go.

```
$ cd ./ # return to project root
$ docker compose up --build -d
```
Enjoy :-)

## Application designs
Deployed Containers
1. cargo-app - React Web app container
2. spring-boot-app - Spring-boot API container
3. cargodb - Application DB with MongoDB
4. strapi-app - CMS container
5. postgres-db - CMS database

Application URL:
Web app URL: http://localhost:3000/

Following pages are implemented for demostration

**Home Page**: http://localhost:3000/

**Flight Page**: http://localhost:3000/flights

**CMS URL**: http://localhost:1337/

**API URL**: http://localhost:8080/api/

**API Endpoint**:

1. POST /search-cargo

Content-Type: application/json

Request Payload Example:
```
 {
        "carrierCode": "CX",
        "flightNo": "171",
        "origin": "HKG",
        "flightDate": "2025-12-15"
      
}
```


## Assumptions
Due to time limitation (I built them in 2 days from scratch), following requirements are not implemented.

1. No Localization / i18N ready
2. There is development configuration only, no configuration for Production / UAT environment implemented, please add environments in application.yaml of /dbapi.
3. No bonus feature implemented.
4. Cache is not implemented.
5. Some security library for API is not implemented, such as OWASP
6. No nginx for containers installed, nginx.conf in /cms/client/nginx is fake and incomplete.
7. Only docker version for local development and demo is ready, not deployed to any cloud or k8s yat.
8. Multiple API layer is not demostrated here dure to time limitation (and resolving cross API calling with proxy and gateways are troublesome)
9. Strapi CMS and MongoDB are selected in this project due to their lightweight.
10. Documentation is not yet ready, I may update it in future here.

Thanks.


