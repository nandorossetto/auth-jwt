FROM node:23.11.1
WORKDIR /auth-jwt
COPY . .
RUN rm -rf node_modules
RUN npm i
CMD ["npm", "start"]
EXPOSE 3000