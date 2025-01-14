FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm install
EXPOSE 3000
CMD ["npm", "run", "start:dev"]

# sudo docker build -t nest-prod -f Dockerfile.prod .
# sudo docker run -p 3000:3000 nest-prod
# sudo docker images 
# sudo docker ps
# sudo docker start <container_id>
# sudo docker stop <container_id>

# mysql -h 127.0.0.1 -P 3307 -u testuser -p -->(testuser123)

# sudo docker rmi <image_id>
# sudo docker rm <container_id>
# sudo docker exec -it <container_id> /bin/bash
# sudo docker logs <container_id>