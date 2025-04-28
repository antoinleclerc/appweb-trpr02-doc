# Semaine 3 : Revue de code du TP2 par Antoine Leclerc

**Améliorer l'interface**

Quand le jeu se lance et que le joueur attaque, si il manque ou si l'ennemi manque, il n'y a rien pour le dire, rien pour le faire savoir au joueur qu'il y a une fonctionnalité de chance de rater son attaque, avec plus de temps j'aurais pu faire une fonction qui fait aparaitre un texte rouge qui dit "manquer" a coter du bouton d'attaque.

**Réduire la grosseur du fichier Game.vue**

il y a tellement de fonction et de code dans la section scripts de Game.vue que ça prend 157 ligne de la classe. La majorité de tous ça aurait pu être mis dans un classe typescript.

**Problème impossible à régler**

Quand tu lance l'application, La musique d'intro devrait se lancer, mais le problème étant quelle ne se lance pas. Dans la console, je recois ce message d'erreurs :

Uncaught (in promise) NotAllowedError: play() failed because the user didn't interact with the document first.

Après fait un peu de recherche, la plupart des navigateurs, empehce des fichiers d'etre joueur tant que l'utilisateur na pas intéragi avec le site, donc dans notre cas, j'aurais pu me faire un bouton pour commencer la musique, mais je trouvais que rajouter un bouton juste pour ça aurait servit a pas grand chose.


```js{4}
<template>
  <Header />

    <button @click="JoueMusique" >
        Commencer la musique
    </button>
    <!-- Le reste du code-->
<template/>
```

**Séparation des typescript dans le dossier script**

Dans le dossier script, nous avons 11 fichier différent, pour mieux organiser ça on aurait pu avoir des dossiers dans le dossier scripts pour mieux séparer tous ça, on aurait pu en avoir un "entity" contenant enemie.ts, player.ts et rankedPlayer.ts. Juste avec ça on a trois fichier en moins qui sont plus organiser.

**Utilisation de constantes**

Dans la majorité du projet, nous avons pas utiliser de constantes, ce qui aurait été préférable pour la lisibilité du code.

Voici plusieurs example :

```js{4}
if (missionNumber.value >= 5) {
      boolWonGame.value = true;
      afficherWinGame(mainPlayer.value.score, mainPlayer.value.name);
    } else {
      missionNumber.value++;
      selectNewEnemy();
    }
```
Amélioration :

```js{4}
if (missionNumber.value >= NB_MISSION_POUR_WIN) {
      boolWonGame.value = true;
      afficherWinGame(mainPlayer.value.score, mainPlayer.value.name);
    } else {
      missionNumber.value++;
      selectNewEnemy();
    }
```

```js{4}
const getRepairCost = () => {
  return repairPercent.value * 2;
};
```
Amélioration :

```js{4}
const getRepairCost = () => {
  return repairPercent.value * NB_CREDIT_PAR_POURCENTAGE;
};
```
