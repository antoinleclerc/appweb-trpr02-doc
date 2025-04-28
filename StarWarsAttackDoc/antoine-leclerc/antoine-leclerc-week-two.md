# Semaine 2 : Revue de code du TP2 par Antoine Leclerc


**Améliorer la séparation du code**

***séparation générale***
Dans game, on pourrait séparer plus de truc, genre ennemie joueur et information de la mission au lieu de tous avoir dans game. ça rendrait le code plus lisible et rendre la classe game moins grande.

***séparation des modals***
on a pour l'instant un seul modal, mais on risque d'en avoir plusieurs, donc on pourrait tous les séparé dans des classes vues différentes et le mettre dans un dossier différent, car les modals prennent beaucoup d'espace dans un template.

**simplifier des fonctions**
Dans la méthode attack on a du code incomplet qui sert a dire comment réagir quand un joueur ou un ennemi prend des dégats ou est KO, cependant on pourrait faire des fonctions pour gérer cela au lieu de laisser du code libre dans la fonction

```js{4}
//Game.vue
const attack = () => {
  if (!selectedEnemy.value) return;

  const playerDamage = getPlayerAttackValue();
  const enemyDamage = getEnnemyAttackValue(selectedEnemy);

  if (playerDamage > 0) {
    selectedEnemy.value.ship.vitality -= playerDamage;
  }

  if (enemyDamage > 0) {
    mainPlayer.value.hp -= enemyDamage;
  }

  if (mainPlayer.value.hp <= 0)
  {
    mainPlayer.value.hp = 0;

  }

  if (selectedEnemy.value.ship.vitality <= 0)
  {
    selectedEnemy.value.ship.vitality = 0;
    
  }
};
```
Au lieu on pourrait faire.
```js{4}
//Game.vue
const attack = () => {
  if (!selectedEnemy.value) return;

  const playerDamage = getPlayerAttackValue();
  const enemyDamage = getEnnemyAttackValue(selectedEnemy);

  giveEnemyDamage(playerDamage);
  givePlayerDamage(enemyDamage);

};
```

**Utilisation de constantes**
Dans le code de Game.vue on utilise a plusieurs reprises des chiffres libres sans constantes, ce qui pourrait améliorer le lisibilté du code

```js{4}
//Game.vue
const mainPlayer = ref<Player>({
  id: 1,
  name: props.nameChosen,
  shipName: props.ship,
  hp: 100,
  experience: "Maître",
  score: 0,
});
```
Améliorer ça en ...

```js{4}
//Game.vue
const mainPlayer = ref<Player>({
  id: 1,
  name: props.nameChosen,
  shipName: props.ship,
  hp: HP_MAIN_PLAYER_START,
  experience: PLAYER_EXPERIENCE,
  score: STARTING_SCORE,
});
```