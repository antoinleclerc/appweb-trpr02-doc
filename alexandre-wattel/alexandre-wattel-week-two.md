# Semaine 2 : Revue de code du TP2 par Alexandre Wattel

## Revue component -- views

**Amélioration possible dans la séparation du code de Game.vue**

Dans Game.vue, le modal utilisé pourrait être déplacé dans un composant Vue séparé afin d'alléger le code de Game.vue.

```js{4}
<div
    class="modal fade"
    id="leaveModal"
    tabindex="-1"
    aria-labelledby="leaveGameModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="leaveGameModalLabel">
            Quitter la partie ?
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          Vous êtes sur le point de quitter le jeu. Toute progression sera
          perdue. Continuer ?
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Rester
          </button>
          <button type="button" class="btn btn-danger" @click="confirmLeave">
            Quitter la partie
          </button>
        </div>
      </div>
    </div>
  </div>
```

Suggestion : La création d'un fichier nommé ModalQuitGame.vue serait approprié.

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

## Revue component -- scripts

**Mauvaise utilisation d'un message d'erreur dans atabaseAcces.ts**

Dans la fonction de récupération des ennemis, le message d’erreur utilisé est celui destiné à la récupération des joueurs. Il est nécessaire d’utiliser un message d’erreur spécifique à la récupération des ennemis afin d’éviter toute confusion en cas de problème lors de l’exécution de cette fonction.

```js{4}
export const fetchEnemy = async () => {
  const databasePlayers = ref<Enemy[]>([]);
  try {
    const response = await fetch("http://127.0.0.1:3000/characters");
    if (!response.ok) {
        //Code a corrigé si dessous
      throw new Error(errFetchPlayers);
        //Code a corrigé si dessus
    }
    databasePlayers.value = await response.json();
    return databasePlayers.value;
  } catch (error) {
    console.error(error);
    return [];
  }
};
```
