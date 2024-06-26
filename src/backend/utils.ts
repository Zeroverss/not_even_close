﻿import type { Ability, SelectedAbility, StackOptions } from './ability'
import type { EnemyAbility } from './enemyAbilities/enemies'

import type { EnemyAbilityDetails } from './sim/simTypes'

export function roundTo(number: number, to: number) {
  return Math.round(number * 10 ** to) / 10 ** to
}

export function roundHundred(number: number) {
  return roundTo(number * 100, 2)
}

export function thousands(number: number) {
  return `${Math.round(number / 1000).toLocaleString('en-US')}K`
}

export function getSelectedAbility(
  spellId: number,
  selectedAbilities: SelectedAbility[],
) {
  return selectedAbilities.find(({ ability }) => ability.spellId === spellId)
}

export function isAbilitySelected(spellId: number, selectedAbilities: SelectedAbility[]) {
  return !!getSelectedAbility(spellId, selectedAbilities)
}

export function findMatchingAbility(spellId: number, abilities: Ability[]) {
  return abilities.find((ability) => ability.spellId === spellId)
}

export function defaultStacks(stacks: StackOptions) {
  return stacks?.default ?? stacks.max
}

function augmentAbility(
  abilityToAugment: Ability,
  { ability: { abilityAugmentations }, stacks }: SelectedAbility,
  selectedAbilities: SelectedAbility[],
) {
  if (
    !abilityAugmentations ||
    !isAbilitySelected(abilityToAugment.spellId, selectedAbilities)
  )
    return

  abilityAugmentations.forEach(({ otherSpellId, field, absorbField, value }) => {
    if (otherSpellId !== abilityToAugment.spellId) return

    if (field === 'absorb') {
      const absorb = abilityToAugment.absorb
      if (!absorb || !absorbField) return

      abilityToAugment.absorb = { ...absorb }

      abilityToAugment.absorb[absorbField] ??= 0
      if (absorbField === 'healthMultiplier') {
        abilityToAugment.absorb[absorbField]! *= 1 + value * (stacks ?? 1)
      } else {
        abilityToAugment.absorb[absorbField]! += value * (stacks ?? 1)
      }
    } else {
      abilityToAugment[field] ??= 0
      abilityToAugment[field]! += value * (stacks ?? 1)
    }
  })
}

export function augmentAbilities(
  abilitiesToAugment: Ability[],
  selectedAbilities: SelectedAbility[],
) {
  return abilitiesToAugment.map<Ability>((ability) => {
    const augmentedAbility = { ...ability }

    selectedAbilities.forEach((augmentingAbility) =>
      augmentAbility(augmentedAbility, augmentingAbility, selectedAbilities),
    )

    return augmentedAbility
  })
}

export function augmentSelectedAbilities(
  abilitiesToAugment: SelectedAbility[],
  selectedAbilities: SelectedAbility[],
) {
  return abilitiesToAugment.map<SelectedAbility>((ability) => {
    const augmentedAbility = { ...ability.ability }

    selectedAbilities.forEach((augmentingAbility) =>
      augmentAbility(augmentedAbility, augmentingAbility, selectedAbilities),
    )

    return { ...ability, ability: augmentedAbility }
  })
}

export function isAbilityAvailable(ability: Ability, availableAbililties: Ability[]) {
  return availableAbililties.some(
    (availableAbility) => availableAbility.spellId === ability.spellId,
  )
}

export function enemyAbilityToDetails(ability: EnemyAbility): EnemyAbilityDetails {
  let damage = ability.damage
  if (ability.variance) damage = Math.round(damage * (1 + ability.variance))

  return { ...ability, damage }
}
