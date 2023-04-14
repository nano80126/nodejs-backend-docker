FROM mariadb:10.11

ENV MARIADB_ROOT_PASSWORD=0000
ENV MARIADB_DATABASE=youtube_player
ENV MARIADB_USER=danielKe
ENV MARIADB_PASSWORD=80126

# COPY ./50-server.cnf /etc/mysql/mariadb.conf.d/50-server.cnf
# COPY ./50-mysql-clients.cnf /etc/mysql/mariadb.conf.d/50-mysql-clients.cnf

# grant all on *.* to 'cross'@'%' identified by '123456'  require ssl;
# mysql -h 127.0.0.1 -u cross -p 123456 --ssl-ca=/etc/mysql/ssl/ca-cert.pem --ssl-cert=/etc/mysql/ssl/client-cert.pem --ssl-key=/etc/mysql/ssl/client-key.pem -e 'status'