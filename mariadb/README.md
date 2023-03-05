# MariaDB 啟用 SSL / Set up MariaDB SSL

## Create the CA certificate (TLS/SSL)

```
# 產生 CA 私鑰 / create new CA key
openssl genrsa 2048 > ca-key.pem

# 產生 CA 證書 / generate the certificate 
openssl req -new -x509 -nodes -days 365000 -key ca-key.pem -out ca-cert.pem
```
## Create the server SSL certificate
```
# 產生伺服器私鑰 / to create the server key
openssl req -newkey rsa:2048 -days 365000 -nodes -keyout server-key.pem -out server-req.pem

# 轉成 rsa 類型私鑰 / process the server RSA key
openssl rsa -in server-key.pem -out server-key.pem

# 利用 CA 證書, 私鑰 > 產生 server 證書 / sign the server certificate
openssl x509 -req -in server-req.pem -days 365000 -CA ca-cert.pem -CAkey ca-key.pem -set_serial 01 -out server-cert.pem
```

## Create the client TLS/SSL certificate
```
# 產生 client 私鑰 / create the client key
openssl req -newkey rsa:2048 -days 365000 -nodes -keyout client-key.pem -out client-req.pem

# 轉成 rsa 類型私鑰 / process client RSA key
openssl rsa -in client-key.pem -out client-key.pem

# 利用 CA 證書, 私鑰 > 產生 client 證書 / sign the client certificate
openssl x509 -req -in client-req.pem -days 365000 -CA ca-cert.pem -CAkey ca-key.pem -set_serial 01 -out client-cert.pem
```

## How do I verify the certificates
```
# 驗證憑證的正確性
openssl verify -CAfile ca-cert.pem server-cert.pem client-cert.pem
```

## Configure the MariaDB server to use SSL
```
# update & install vim
apt-get update
apt-get install vim
```

```
vim /etc/mysql/mariadb.conf.d/50-server.cnf
```
#### Append in [mysqld] section: 

---
```
### MySQL Server ###
## Securing the Database with ssl option and certificates ##
## There is no control over the protocol level used. ##
##  mariadb will use TLSv1.0 or better.  ##
#ssl
ssl-ca=/etc/mysql/ssl/ca-cert.pem
ssl-cert=/etc/mysql/ssl/server-cert.pem
ssl-key=/etc/mysql/ssl/server-key.pem
## Set up TLS version here. For example TLS version 1.2 and 1.3 ##
tls_version = TLSv1.2,TLSv1.3
```
---

```
chown -Rv mysql:mysql /etc/mysql/ssl
```
#### Then restart container

## Configure the MariaDB client to use SSL
```
vim /etc/mysql/mariadb.conf.db/50-mysql-clients.cnf
```

#### Append in [mysql] section:

---
```
## MySQL Client Configuration ##
ssl-ca=/etc/mysql/ssl/ca-cert.pem
ssl-cert=/etc/mysql/ssl/client-cert.pem
ssl-key=/etc/mysql/ssl/client-key.pem
##  Force TLS version for client too
#tls_version = TLSv1.2,TLSv1.3
### This option is disabled by default ###
### ssl-verify-server-cert ###
```
---


## Verififcation
```
mysql -h localhost -u root -p{password}

SHOW VARIABLES LIKE '%ssl%'

or 

status
```