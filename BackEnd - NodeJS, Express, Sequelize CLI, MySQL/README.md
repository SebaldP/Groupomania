# INSTALLATION

(La version v14.16.0 de NodeJS est nécessaire pour lancer les serveurs.)

## BACKEND

Pour l'installation, il y a 6 étapes:

### 1. _npm i_

### 2. _Ajouter un fichier "**./.env**" avec le contenu suivant_:

```
PORT=3000
CLIENT_URL=http://localhost:8080

ADMINREGISTRATION= (Numéro de matricule de l'administrateur) (REGEX = /^G\d{3}[A-Z]{2}\d{3}\D{1}$/)
ADMINKEY= (Clé de réinitialisation de mot de passe de l'administrateur) (REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@#%&*€¤])(?!.*[{}[\]()\/\'"`~,;:.<>\s])(?=.{8,})/)
ADMINPASSWORD= (Mot de passe de l'administrateur) (REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@#%&*€¤])(?!.*[{}[\]()\/\'"`~,;:.<>\s])(?=.{8,})/)

TOKEN= (Clé du token)

MYSQL_HOST=localhost
MYSQL_USER= (Identifiant)
MYSQL_PASSWORD= (Mot de passe)
MYSQL_DATABASE= (Nom de la base de données)
```

### 3. _Remplir le fichier "**./config/config.json**" conportant des informations sur votre base de données_:

```
{
"development": {
"username": (identifiant),
"password": (mot de passe),
"database": (nom du dossier (développement) de la base de donnée),
"host": "127.0.0.1",
"dialect": "mysql"
},
"test": {
"username": (identifiant),
"password": (mot de passe),
"database": (nom du dossier (test) de la base de donnée),
"host": "127.0.0.1",
"dialect": "mysql"
},
"production": {
"username": (identifiant),
"password": (mot de passe),
"database": (nom du dossier (déploiement) de la base de donnée),
"host": "127.0.0.1",
"dialect": "mysql"
}
}
```

(Le dossier de la base de donnée doit être existant avant le lancement du serveur)

### 4. _Lancer les commandes suivantes dans votre terminal (depuis le dossier principal):_

1. Générer les différentes tables dans les bases de données

```
npx sequelize-cli db:migrate
```

2. Générer le compte de l'administrateur

```
npx sequelize-cli db:seed:all
```

### 5. _npm start_
