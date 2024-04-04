import { EnemyAbility } from '../../dungeons'

const lavaSpray: EnemyAbility = {
  name: 'Lava Spray',
  id: 375251,
  icon: 'spell_shaman_lavasurge',
  baseDamage: 375251,
  isAoe: true,
  timeBetweenCasts: 30,
  counterplay: {
    combatDrop: 'cancel',
    outrange: 40,
  },
}

const volatileMutation: EnemyAbility = {
  name: 'Volatile Mutation',
  id: 374365,
  icon: 'ability_rhyolith_magmaflow_whole',
  baseDamage: 273563,
  isAoe: true,
  timeBetweenCasts: 33,
}

const dragonStrike: EnemyAbility = {
  name: 'Dragon Strike',
  id: 373733,
  icon: 'spell_warrior_wildstrike',
  baseDamage: 328276,
  isAoe: false,
  isPhysical: true,
  timeBetweenCasts: 57,
}

const groundingSpear: EnemyAbility = {
  name: 'Grounding Spear',
  id: 373424,
  icon: 'inv_spear_11',
  baseDamage: 291801,
  isAoe: true,
  isPhysical: true,
  timeBetweenCasts: 57,
}

const blazingAegis: EnemyAbility = {
  name: 'Blazing Aegis',
  id: 374839,
  icon: 'inv_shield_1h_dragondungeon_c_01',
  baseDamage: 218851 + 65655 * 4,
  isAoe: true,
  periodicDamage: true,
  timeBetweenCasts: 31,
  counterplay: {
    combatDrop: 'cancel',
  },
}

const scorchingFusillade: EnemyAbility = {
  name: 'Scorching Fusillade',
  id: 373084,
  icon: 'inv_gizmo_supersappercharge',
  baseDamage: 273563,
  isAoe: true,
  isTrashAbility: true,
  timeBetweenCasts: 23,
}

const candescentTempest: EnemyAbility = {
  name: 'Candescent Tempest',
  id: 381663,
  icon: 'spell_fire_burnout',
  baseDamage: (54713 + 91188) * 3,
  isAoe: true,
  isTrashAbility: true,
  periodicDamage: true,
  timeBetweenCasts: 28,
}

export const nelthAbilities = [
  lavaSpray,
  volatileMutation,
  dragonStrike,
  groundingSpear,
  blazingAegis,
  scorchingFusillade,
  candescentTempest,
]
