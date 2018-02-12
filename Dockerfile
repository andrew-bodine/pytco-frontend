FROM ubuntu:latest

RUN apt-get autoclean \
 && apt-get update \
 && apt-get install -y \
    curl \
    git-core \
    ruby \
    ruby-dev \
    build-essential \
    dh-autoreconf

# Sass
RUN gem install sass --no-ri --no-rdoc

# Node.js
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash - \
 && apt-get install -y nodejs

RUN apt-get autoclean

RUN npm install -g bower grunt

WORKDIR /opt/pytco

COPY package.json bower.json .bowerrc ./
RUN npm install
RUN bower install --allow-root

COPY . .

RUN grunt build

EXPOSE 8000

ENTRYPOINT ["node_modules/http-server/bin/http-server"]
CMD ["-a", "0.0.0.0", "-p", "8000", "-c-1", ".build/dev"]
