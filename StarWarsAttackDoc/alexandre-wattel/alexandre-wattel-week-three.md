# Semaine 3 : Revue de code du TP2 par Alexandre Wattel

## Revue component -- views

**Fonctionnalité de vérification manquante dans Accueil.vue**

Dans Accueil.vue, les deux champs — nom et vaisseau — sont bien vérifiés lors de la tentative de création d’un personnage. Cependant, seul le champ du nom dispose d’un addEventListener. En conséquence, pour le champ du vaisseau, le message d’erreur ne disparaît pas même lorsqu’un choix valide est sélectionné.

Voici un exemple d’utilisation de addEventListener :

```js{4}
if (nameInput.value) {
    nameInput.value.addEventListener("input", () =>
      validateValue(name.value, errName.value, errNameMessage)
    );
  }
```

**Manque de variable dans la vérification pour jouer des sons dans Game.vue**

Les vérifications du nom du joueur pour jouer des sons spécifiques pourraient être stockées dans des variables au lieu d'être codées en dur dans Game.vue.

Voici le code :

```js{4}
if (mainPlayer.value.name == "Jimmy" || mainPlayer.value.name == "jimmy") {
    playJimmy();
  }
  if (mainPlayer.value.name == "Benjamin" || mainPlayer.value.name == "benjamin") {
    playBenjamin();
  }
  if (mainPlayer.value.name == "Steve" || mainPlayer.value.name == "steve") {
    playSteve();
  }
```

Voici une correction possible (la déclaration des variables n'est pas incluse dans l'exemple)

```js{4}
if (mainPlayer.value.name == nameJimmySound || mainPlayer.value.name == nameJimmySoundLowerCase) {
    playJimmy();
  }
  if (mainPlayer.value.name == nameBenjaminSound || mainPlayer.value.name == nameBenjaminSoundLowerCase) {
    playBenjamin();
  }
  if (mainPlayer.value.name == nameSteveSound || mainPlayer.value.name == nameSteveSoundLowerCase) {
    playSteve();
  }
```

De plus, les variables pourraient être placées dans un fichier .ts séparé, puis importées dans Game.vue afin de mieux organiser et séparer le code.

**Possibilité d'amélioration de la séparation du code dans Game.vue**

Les fonctions utilisées pour gérer la partie mathématique de la réparation pourraient être placées dans un fichier .ts séparé et importées dans la vue, afin d'améliorer la lisibilité et la séparation du code.

Les fonctions en question :

```js{4}
const getRepairCost = () => {
  return repairPercent.value * 2;
};

const confirmRepair = () => {
  const cost = getRepairCost();
  if (mainPlayer.value.score >= cost && cost > 0 && mainPlayer.value.hp > 0) {
    playRepair();
    const hpToAdd = Math.floor((repairPercent.value / 100) * 100);
    mainPlayer.value.hp = Math.min(mainPlayer.value.hp + hpToAdd, 100);
    mainPlayer.value.score -= cost;
    repairPercent.value = 0;
    if (missionNumber.value >= 5) {
      boolWonGame.value = true;
      afficherWinGame(mainPlayer.value.score, mainPlayer.value.name);
    } else {
      missionNumber.value++;
      selectNewEnemy();
    }
  }
};
```

**Possibilité d'amélioration de la séparation du code dans Ranking.vue**

Le code utilisé pour faire vérification de doublons dans la liste des gagnants pourrait être mise dans une fonction dans un fichier .ts pour mieux séparé le code.

Code en question :

```js{4}
players.value = await fetchPlayers();
  if (props.nameChosen && props.finalScore && !hasPlayerAdded.value)
  {
    const samePlayers = players.value.filter(players =>players.name == props.nameChosen && players.score == props.finalScore)

    let hasSuspiciousDuplicate = false

    if (samePlayers.length >= 2)
    {
      for (let i = 0; i < samePlayers.length; i++)
      {
        for (let j = 0; j < samePlayers.length; j++)
        {
          if (i !== j && samePlayers[i].id === samePlayers[j].id - 1)
          {
            hasSuspiciousDuplicate = true
            break
          }
        }
        if (hasSuspiciousDuplicate) break
      }
    }
    if (!hasSuspiciousDuplicate)
    {
      const newWinner: RankedPlayer = {
      id: getNextId(players.value),
      name: props.nameChosen,
      score: props.finalScore
    }
    saveWinner(newWinner);
    players.value = await fetchPlayers();
    hasPlayerAdded.value = true;
    }
  }
```

## Revue component -- scripts

**Présence d'import non utilisé dans databaseAcces.ts**

Des imports qui ne sont pas utilisés sont présent dans databaseAcces.ts et leur présence est donc inutile.

Import en question :

```js{4}
import { ref } from "vue";
import {
  errFetchShips,
  errFetchPlayers,
  errFetchEnnemy,
} from "../scripts/errMessage";
```

**Manque de professionnalisme dans soundEffects.ts**

Un commentaire témoigne dans manque de professionnalisme dans soudEffects.ts

```js{4}
export const playPewPew = () => {
    const audioPewPew = new Audio(pewpew)
    audioPewPew.play()
    //je sais que c'est pas efficace, mais c'est plus drole quand tu peux le spammer.
}
```

(J'aurais fait la même chose, mais c'est un point en plus dans la revue de code.)
