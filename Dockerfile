FROM ubuntu:17.04
MAINTAINER Patryk Przekwas

RUN apt-get update && \
    apt-get install -y software-properties-common python && \
    apt-get install curl -y && \
    curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
    apt-get install -y nodejs && \
    mkdir /app/
ADD . /app/
WORKDIR /app/
CMD ["./run.sh"]
