FROM mongo:4.2

USER root

WORKDIR /root

MAINTAINER <Aashrey Sharma> aashreysh@gmail.com
# Auth Configuration. Modify as needed.
# These environment variables can also be specified through command line or docker-compose configuration

ENV AUTH yes

ENV MONGODB_ADMIN_USER root
ENV MONGODB_ADMIN_PASS root

ENV MONGODB_APPLICATION_DATABASE labworksjs
ENV MONGODB_APPLICATION_USER admin2
ENV MONGODB_APPLICATION_PASS admin2



ADD ./run.sh /run.sh
ADD ./set_mongodb_password.sh /set_mongodb_password.sh

RUN chmod +x /run.sh
RUN chmod +x /set_mongodb_password.sh

RUN /run.sh

EXPOSE 27017:27017

