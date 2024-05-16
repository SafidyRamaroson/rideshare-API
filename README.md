**Rideshre API**

### Fonctionalites implémentées 
-  Gestion des utilisateurs
-  Gestion des voyages
-  Gestion de reservation 
-  Enregistrement de voyage
- Commentaire sur un post | Feedback

#### Gestion des utilisateurs

> 1 - Création de compte à l'aide d'une Email | App tiers comme Facebook.

> 2 - Connexion avec Rideshare

> 3 - récuperer les infos sur un utilisateur à partir de son Id 

> 4 - Mise à jour profil.

> 5 - Supprimer le compte après confirmation.

> 6 - Gestion de mot de passe (mot de passe oublie  et nouveau mot de passe ).

#### Gestion des voyages 

> 1 - Seul l'utilsateur qui possède  un compte Rideshare peut créer une voyage .

> 2 - Seul l'utilisateur qui a crée le voyage peut annuler le voyage .

> 3 - Chercher une voyage en remplissant l'un des elements suivants(Destination , Départ , Date Départ ,nombre de passager).

> 4 - Seul l'utilsateur qui a crée le trip peut faire la mise 
à jour de son trajet.

> 5 - On  peut récuperer à partir de cette API , les trajets 
crées par un utilsateur .

> 6 - Récuperer les détails d'une voyage à l'aide de 
de l'Id voyage.

> 7 - Mise à jour d'une vooyage faite par l'utilisateur 
qui a crée le voyage .

> 8 - et enfin , on peut récuperer les voyages qui 
sont disponibles au jour meme (en utilisant la 
pagination pour que ce soit plus rapide ).


#### Gestion de réservation

> Création d'une réservation en verifiant 
si le voyage est encore disponible et que 
le nombre de place reservé est <= nombre de place 
disponible au voyage 

#### Enregistrement de voyage:

> 1 - L'utilisateur peut enregistrer des 
voyages (c'est comme archive ) et après 
il pourra les consulter .

> 2 - Supprimer les archives .

> 3 - lister les archives stocker par un utilisateur.


#### Feedback
> 1 - liste des feedbacks sur une poste de voyage.
> 2 - Ajouter de feedback à une post Trip.
> 3 - Supprimer son commentaire sur une poste de voyage
> 4 - Màj  de son commentaire.


### Endpoints de routes
> - Auth Route
> - user Route | profile route
> - trip Router 
> - reservation Route
> - save Post  Route |  Archive
> - Feedback Route

#### Explication de chaque route

- **Auth Route**


 






