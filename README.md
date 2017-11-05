# Docker based minimal infrastructure

### Main Goal
Offer an easy way to migrate a wordpress website from a server to another, and also run a server side rendered ReactJS application.

You can use this project to easily set up or replicate a basic docker containers infrastructure, doing little adjusments to suit your needs.

### How To

#### Dependencies

* docker >= 1.13
* docker-compose >= 1.13

Instructions on how to install:
* [Docker installation instructions](https://docs.docker.com/engine/installation/)
* [Compose installation instructions](https://docs.docker.com/compose/install/)

### TL;DR

```sh
git clone https://github.com/heydemoura/docker-bare-infra.git --depth=1 myserver && cd myserver
docker-compose up -d
```

### MySQL setup

If you are migrating a mysql dependant application, is better if you dump your databases and put the .sql scripts inside the `mysql/scripts/` directory. MySQL docker entrypoint will run any scripts inside this folder upon initialization of the mysql docker container.

You can also edit the `docker-compose.yaml` file if you need to set up any other environment variables or change any volumes.

_If you are using Amazon Web Services, I suggest having a attached storaged only for your database volume. This way you can use the same database throughout your EC2 instances._

### Nginx setup

If you have any custom Nginx configuration you need to setup, throw your configuration into the `nginx/conf.d/` or `nginx/default.d/` directories, *docker-compose* will mount theses folders as volumes of the Nginx container.

Also a nginx.conf file is located in `nginx/nginx.conf` that will be mounted as the container's `/etc/nginx/nginx.conf` file. So if you need any additional setup, edit this file.

**Server Names**

In case you have a simple Nginx configuration, with only one server, you can change the **NGINX_HOST** environment variable on `docker-compose.yaml` to suite your need. There is a template that will be rewritten with your default _server_name_ for the default nginx configuration.

```yaml
...
  nginx:
    image: nginx:latest
    ports:
      - "80:80"
    environment:
      NGINX_HOST: 172.18.0.1
    volumes:
      - ./nginx/conf.d/:/etc/nginx/conf.d/
      - ./nginx/default.d/:/etc/nginx/default.d/
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
    command: /bin/bash -c "envsubst < /etc/nginx/conf.d/conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
...
```

### Wordpress setup

This is a basic wordpress setup, if you want to migrate from another server, you will have to backup your files and setup a volume on `docker-compose.yaml` containing you wordpress installation.

By default, this project uses `/blog` route on Nginx for the Wordpress installation. You can edit the `nginx/default.d/blog.conf` file if you want to change that (also remember to change the port in this file if you change the wordpress container port on `docker-compose.yaml`)


Setup your database name with the environment variables on `docker-compose.yaml` if you want to have a custom one, or if you are migrating from another server.

**Wordpress Admin**

By default, Wordpress default configuration rewrites the URL when you try to access `wp-admin`. For a Wordpress standalone server this is pretty OK, but for this purpose of running it on a container under a reverse proxy, this can be a pain, when you try to access `/blog/wp-admin` it keeps sending you to the admin but the URL is rewritten to `/wp-admin`.

Unfortunately I wasn't capable to setup wp-admin to preserve the URL when you access `/blog/wp-admin`. By default Nginx will redirect you to the container itself, accessing via the exposed port from wordpress container.

I could use Wordpress MultiSite, but for that i should be using port 80 for Wordpress, that i am not. But even in that case I could do some hacking like on [this page](https://benohead.com/wordpress-running-multisite-different-port/), but this hack could be reverted by a future Wordpress update.

For the same cause, if you are performing a clean Wordpress installation, you should proceed with the installation script accessing the container itself.

_Blog_

* mydomain.com:8080

_Home_

* mydomain.com:8081

After the installation process, update the **siteurl** for the containers to be: _mydomain.com/blog_ and _mydomain.com/hom_ respectively. Or esle it will not work correctly.

**Permalinks**

In order to enable permalinks for posts, `htaccess` files for each wordpress container, they are located in `wordpress/`. For the sake of this example to work properly, copy both files to the respective containers:

```sh
docker cp wordpress/blog_htaccess myserver_blog:/var/www/html/.htaccess
docker cp wordpress/home_htaccess myserver_home:/var/www/html/.htaccess
```

This should enable proper permalinks rewrite rules for those containers.

```yaml
...
  wordpress:
    depends_on:
      - db
    image: wordpress
    ports:
      - "8080:80"
    restart: always
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress
...
```

### Super Duper Server Side Rendered React App

Small and simple React app, server side rendered using Node and Express.
More details about this at the dedicated [README](https://github.com/heydemoura/docker-bare-infra/tree/master/app)

### License

[MIT](https://github.com/heydemoura/docker-bare-infra/blob/master/LICENSE) © Heyde Moura
