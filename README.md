# Full Stack Demo (NX, NestJS, Angular 8, Prisma 2, and GraphQL)
This is a demonstration of how you can use Typescript and NX to build a
full stack development environment. 

## Setup
* Prerequisites: 
    * **Prisma2:** npm install -g prisma2
    * **Nest.js CLI:** npm i -g @nestjs/cli
    * **Angular CLI:** npm i -g @angular/cli
* Setup Environment:
    * **Docker:** docker-compose up -d
    * **Dependencies:** npm install
* Start Services: 
    * **Prisma Admin:** cd libs/api/photon && prisma2 dev
    * **API:** npm start api
    * **Web:** npm start web
* Run Application: 
    * **Prisma Admin:** http://localhost:5555/
    * **API:** http://localhost:3333/graphql/
    * **Web:** http://localhost:4200/
