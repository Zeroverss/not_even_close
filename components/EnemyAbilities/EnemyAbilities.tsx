﻿import { DungeonKey, dungeonsByKey, EnemyAbility } from '../../backend/dungeons'
import { EnemyAbilityCard } from './EnemyAbilityCard'
import Image from 'next/image'
import { Button } from '../Common/Button'
import { AbilityResult } from '../../backend/sim/simTypes'

interface Props {
  selectedDungeon: DungeonKey
  selectedAbility: EnemyAbility | null
  onSelect: (bossAbility: EnemyAbility) => void
  deselectDungeon: () => void
  results: AbilityResult[] | null
}

export function EnemyAbilities({
  selectedDungeon,
  selectedAbility,
  onSelect,
  deselectDungeon,
  results,
}: Props) {
  const dungeon = dungeonsByKey[selectedDungeon]

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <Button short bigText onClick={deselectDungeon} className="text-xl gap-2 px-2">
          <Image
            className={`rounded border-2 border-gray-600`}
            height={32}
            width={32}
            src={`https://wow.zamimg.com/images/wow/icons/large/${dungeon.icon}.jpg`}
            alt={dungeon.name}
          />
          {dungeon.name}
        </Button>
      </div>
      <div className="flex flex-col gap-x-2 gap-y-1 flex-wrap items-stretch">
        {dungeon.abilities.map((ability) => {
          const abilityResult = results?.find(
            (result) => result.enemyAbilityDetails.name === ability.name
          )

          return (
            <EnemyAbilityCard
              key={ability.name}
              ability={ability}
              onSelect={() => onSelect(ability)}
              selected={selectedAbility !== null && selectedAbility.name === ability.name}
              result={abilityResult}
            />
          )
        })}
      </div>
    </div>
  )
}
