(La version v14.16.0 de NodeJS est nécessaire pour lancer les serveurs.)

## BACKEND

Pour l'installation, il y a 5 étapes:

1. **npm i**

2. **Ajouter un fichier ".env" avec le contenu suivant**:

```
PORT=3000
CLIENT_URL=http://localhost:8080

ADMINREGISTRATION=_Numéro de matricule de l'administrateur_
ADMINKEY=_Clé de réinitialisation de mot de passe de l'administrateur_
ADMINPASSWORD=_Mot de passe de l'administrateur_
```

TOKEN=_Clé du token_

3. **Remplir le fichier "./config/config.json" des informations consernant votre base de données**:

```
{
"development": {
"username": _identifiant_,
"password": _mot de passe_,
"database": _nom du dossier (développement) de la base de donnée_,
"host": "127.0.0.1",
"dialect": "mysql"
},
"test": {
"username": _identifiant_,
"password": _mot de passe_,
"database": _nom du dossier (test) de la base de donnée_,
"host": "127.0.0.1",
"dialect": "mysql"
},
"production": {
"username": _identifiant_,
"password": _mot de passe_,
"database": _nom du dossier (déploiement) de la base de donnée_,
"host": "127.0.0.1",
"dialect": "mysql"
}
}
```

(Le dossier de la base de donnée doit être existant avant le lancement du serveur)

4. **Ajouter un dossier "images" au dossier principal du BackEnd**

5. **npm start**

## FRONTEND

Pour l'installation, il y a 2 étapes:

1. **npm i**

2. **npm start**
