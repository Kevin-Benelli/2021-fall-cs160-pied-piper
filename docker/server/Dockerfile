FROM node:15.13-alpine
WORKDIR '/stocked-express-backend'
ENV PATH="./node_modules/.bin:$PATH"

COPY . . 
CMD ["nodemon", "start"]
