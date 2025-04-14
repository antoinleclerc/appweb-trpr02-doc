# Semaine 1 : Revue de code du TP2 par Alexandre Wattel

## Revue component -- views

**Amélioration possible dans la séparation du code**

Dans Accueil.vue et dans Ranking.vue, les fonctions permettant d'aller chercher les données présentes dans la base de données peuvent être placées dans un fichier .ts afin de simplifier l’accès à la base de données et d’éviter de réécrire le même code.

```js{4}
//Acceuil.vue
const fetchShips = async () => {
  const response = await fetch("http://127.0.0.1:3000/ships");
  ships.value = await response.json();
};
```

```js{4}
//Ranking.vue
const fetchPlayers = async () => {
  try {
    const response = await fetch("http://127.0.0.1:3000/ranking");
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des joueurs");
    }
    players.value = await response.json();
  } catch (error) {
    console.error(error);
  }
};
```

Aussi, une gestion d’erreur devrait être ajoutée à la fonction fetchShips. Un exemple de gestion d’erreur est présent dans la fonction fetchPlayers.

## Revue component -- scripts

**Création d'un fichier regroupant les messages erreurs**

Pour faciliter la compréhension et la modification rapide des messages d’erreur, la création d’un fichier .ts regroupant l’ensemble des messages d’erreur serait une bonne idée.

Par exemple :

```js{4}
//errMessage.ts
export const errFetchPlayers = "Erreur lors de la récupération des joueurs";
export const errFetchShips = "Erreur lors de la récupération des vaisseaux";
```
