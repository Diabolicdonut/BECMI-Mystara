# Smoking Pillar of Lan Yu — BECMI/B/X Rules Audit

Build audited: **v0.3.67**  
Audit date: **2026-09-04**  
Deterministic regression result: **211/211 passing**

## Verdict

The self-contained *Smoking Pillar of Lan Yu* campaign is playable from party creation at Shipwreck Beach through exploration, settlement play, expeditions, the Temple of the Flame, ward restoration or failure, and a recorded return-to-Talamau victory or island-destruction defeat.

This is not a claim that the file is a complete digital implementation of every rule in the entire Rules Cyclopedia. The module's required Basic/Expert play loop is deterministic, and the campaign can now continue into name-level stronghold and dominion play. Optional mass-combat/siege systems and inherently open-ended magic remain either disabled, outside this module's scope, or referee-mediated.

The most important audit correction is the spell claim: all 164 listed Magic-User and Cleric spells are registered, learnable or granted, preparable, castable, and persistently recorded, but not all 164 have bespoke deterministic simulations. Common bounded effects do. Open-ended, transformational, planar, and world-altering spells require referee interpretation of the exact fictional result.

## Sources and precedence

The audit compared the engine against:

1. *D&D BECMI Omnibus* — Basic and Expert procedures.
2. *D&D B/X Omnibus* — cross-check for the original Basic/Expert expedition loop.
3. *D&D Rules Cyclopedia* — consolidated tables, classes, equipment, spells, movement, encounters, and combat.
4. *The Smoking Pillar of Lan Yu* — module-specific facts and exceptions.
5. *AD&D 1e Dungeon Masters Guide*, Appendices A–C — secondary inspiration for dungeon geometry, physical obstacles, treasure containers, wilderness transitions, and encounter-table structure only.
6. *AC9 D&D Creature Catalogue* and *DMR2 Creature Catalog* — the indexed Basic D&D creature roster, revised descriptions, and published monster statistics.
7. *Arms Across Eras Canonical v3.2.0* — Matrix attack scales, three-scale target sizing, Soft/Hard protection, and melee/ranged distance bands.
8. *FlexAI* — role, stance, outcome, and target-selection ideas used only to inform opponent decisions.

When B/X and Mentzer/Rules Cyclopedia procedures differ, this project follows Mentzer BECMI/Rules Cyclopedia unless the in-game help explicitly identifies a B/X import or campaign ruling. Module text overrides generic procedure for keyed content. AD&D material never overrides B/X/BECMI mechanics or established Mystaran/module facts.

## Status key

| Status | Meaning |
|---|---|
| Deterministic | The engine resolves the procedure and persists the result. |
| Adapted | The engine resolves a declared campaign-scale conversion or house procedure. |
| Referee-mediated | The engine records the action/state, but exact fictional adjudication remains open-ended. |
| Optional off | Published optional system is deliberately disabled. |
| Outside module | Valid wider-campaign rule that is not needed for this low-level island module. |

## Consolidated audit matrix

### Character creation and classes

| Procedure | Status | Audit result |
|---|---|---|
| Ability scores | Deterministic | 3d6 in order, manual entry, score validation, and legal 2-for-1 prime-requisite adjustment are supported. |
| Class eligibility | Deterministic | Fighter, Cleric, Magic-User, Thief, Dwarf, Elf, and Halfling requirements are enforced. Fire Priest is locked until discovered. |
| Alignment | Adapted | Weighted generation produces Neutral most often, then Lawful, then Chaotic; class changes the weights. Manual alignment remains possible. |
| Languages | Deterministic | Common, alignment tongue, and class/racial languages are assigned and saved. |
| Hit points | Deterministic | Class Hit Dice and Constitution apply through 9th level; fixed class gains apply afterward. |
| Armor and weapons | Deterministic | Class restrictions, AC, shield, Dexterity, equipped weapon, and individual ownership are enforced. |
| Starting money and kit | Deterministic | Coin, class equipment, torches, rations, rope, waterskins, tinderbox, backpack, and expedition basics are physically assigned. |
| Dwarf abilities | Deterministic | 60-foot infravision, languages, saves, and 1-in-3 stonework/heavy-construction detection are active. |
| Elf abilities | Deterministic | 60-foot infravision, languages, spellcasting, saves, and 1–2 on 1d6 secret-door searching are active. |
| Halfling abilities | Deterministic | Saves, +1 missile attack, −2 AC against larger-than-man-sized foes, and 90% woodland/33% indoor motionless hiding are active. Individual-initiative +1 is irrelevant while group initiative is used. |
| Cleric Turning Undead | Deterministic | Full result ladder, success rolls, 2d6/3d6/4d6 Hit-Dice budgets, turning/destruction, and once-per-group attempts are active. |
| Thief abilities | Deterministic | Complete level 1–36 percentages for OL/FT/RT/CW/MS/HS/PP/HN, Read Languages, scroll threshold, and +4/double-damage backstab are active. |
| Fire Priest | Adapted | Unlock, character-creation availability after discovery, qualified class conversion, gifts, spell progression, and persistence are campaign-specific. |

### Experience and advancement

| Procedure | Status | Audit result |
|---|---|---|
| Monster, treasure, and goal XP | Deterministic | Awards enter an expedition ledger; duplicate keyed treasure awards are prevented. |
| Prime-requisite adjustment | Deterministic | Class-specific −20%, −10%, +5%, and +10% adjustments apply where appropriate. |
| Safe-haven settlement | Adapted | XP remains pending until `settle xp` in a safe settlement hub or the party's completed fortification. This intentionally reinforces expedition play. A private fortification is physically safe without being a political stronghold. |
| Level tables | Deterministic | Human XP tables run through level 36; Dwarf 12, Elf 10, and Halfling 8 caps are enforced. |
| THAC0 and saves | Deterministic | Full attack-rank/THAC0 and class saving-throw bands are recalculated on advancement. |
| Spell slots | Deterministic | Human caster slots run through level 36; Elf casting stops at the class ceiling. |
| Retainer XP | Adapted | Retainers receive the project's established half share and remain subject to wages, morale, and employer capacity. |

### Equipment, inventory, and logistics

| Procedure | Status | Audit result |
|---|---|---|
| Individual inventory | Deterministic | Every PC, retainer, employee, mount, and vessel has a physical manifest. There is no magical group capacity. |
| Encumbrance | Deterministic | Coin-weight encumbrance changes encounter and overland movement at the BECMI breakpoints. |
| Intelligent distribution | Adapted | `inventory optimize` balances ordinary supplies, coin, and treasure without silently moving personal class gear. |
| Ammunition | Deterministic | Arrows, quarrels, and sling stones are counted and consumed. |
| Consumable weapons | Deterministic | Holy water is expended for 1d8 damage only against undead. Burning oil requires a lit source, is expended, and burns for 1d8 in each of two rounds. |
| Mounts | Deterministic | Mule, pony, draft horse, riding horse, and war horse movement/load limits affect the expedition. |
| Talamau market | Deterministic | The module's 20% availability, local price policy, provisions, smith/chandlery, ship services, and population limits are active. |
| Advanced RC weapon special effects | Referee-mediated | Net, bola, whip, blackjack, blowgun poison, and uncommon shield-weapon special tables are not all bespoke combat conditions. Their ordinary attack/damage profiles exist. |

### Dungeon and site exploration

| Procedure | Status | Audit result |
|---|---|---|
| Exploration turns | Deterministic | Dungeon actions use 10-minute turns. |
| Light | Deterministic | Torches last 6 turns, lantern fills 24 turns, partial fuel is preserved, and darkness blocks ordinary human navigation. Infravision guides but does not become reading light. |
| Wandering monsters | Deterministic | The Temple and current-generation procedural dungeons check every second exploration turn; their site-specific wandering creatures instantiate as actual encounters. |
| Doors | Deterministic | Locked, stuck, braced, wedged, keyed, picked, magically opened, and physically defeated states persist. |
| Search and secret doors | Deterministic | Turn cost, ordinary 1-in-6, Elf 2-in-6, keyed results, and persistent discoveries are active. |
| Traps | Deterministic | Find/Remove Traps, one attempt per level, triggered failure, dwarf stonework detection, and improvised remote triggering are active. Generated traps inherit the same discover/remove/trigger procedures and persist with the site. |
| Listening | Deterministic | Thief Hear Noise percentages and ordinary/demihuman 1d6 procedures are active. |
| Falling and climbing | Deterministic | Thief wall checks and fall damage are resolved. Ordinary unusual climbs remain part of the physical-action adjudicator. |
| Generated interiors | Deterministic | New dungeon-form sites follow the Moldvay/Mentzer sequence: coherent scenario and setting, form-appropriate geometry, planned signature encounter, then B/X two-roll stocking of remaining areas. Theme-specific history constrains inhabitants, wandering ecology, traps, specials, obstructions, treasure containers, and rewards. Towers rise through compact floors; caves branch through natural chambers; manors preserve domestic/service structure. All results remain canonical in the save. Outdoor camps use site-specific stocking instead of the dungeon table. |
| Published locations | Deterministic | Module sites remain fixed content. The Pirate Camp and Sorrowful Gull are the published scenario, not procedural replacements. |

### Wilderness, time, survival, and navigation

| Procedure | Status | Audit result |
|---|---|---|
| Day/night clock | Deterministic | All travel, work, rest, light, spell, weather, and encounter procedures use the same campaign clock. |
| Half-mile hex conversion | Adapted | BECMI movement rates are converted into minutes per half-mile by terrain, encumbrance, weather, trail, mount, or vessel. |
| Daily travel period | Deterministic | Normal movement uses eight hours. The party cannot continue indefinitely without completing overnight rest. |
| Forced march | Deterministic | Movement can extend to twelve hours; using the extension creates a mandatory full rest day. |
| Long-distance fatigue | Adapted | Every six unrested travel days gives cumulative attack/damage and movement penalties until a full rest day. |
| Camping and rest | Deterministic | Overnight rest, interrupted camp progress, secure camps, full rest days, spell recovery, fatigue clearing, and B/X 1–3 hp healing are active. |
| Rations | Adapted | Food and drinking water are one ration person-day. No ration causes 1d2 hp loss/day, blocks ordinary healing, and applies graded movement/attack/rest penalties from HP lost. |
| Foraging | Deterministic | Travel foraging uses 1–3 on 1d6 and two-thirds movement; a full forage day automatically gathers sufficient food and is not rest. |
| Getting lost | Deterministic/Adapted | One hidden opportunity per calendar day occurs on the first truly unanchored wilderness move. Roads, trails, rivers, coasts, visible fixed landmarks, and Heinrich prevent it. RAW secret direction displacement is the default. The optional Map-Safe Lost Time mode keeps the confirmed hex fixed but consumes the rest of the movement period with ordinary exposure, encounter, rest, and ration timing. |
| Weather | Deterministic | A climate profile supplies tropical land weather, visibility, wind, movement changes, shipping water, and gale procedures while remaining extensible to other Mystaran climates. |
| Temporary trails | Adapted | Blazed routes use 1d6+3 inactive days; cut paths use 2d6+7, take longer to make, speed future travel, prevent loss while followed, and decay secretly. |
| Temporary landmarks | Adapted | Signs and cairns establish orientation; their 1d6+3 or 2d6+7 inactive lifetimes are secret and refreshed by use. |
| Sparse discoveries | Adapted | A preplanned low-density first-entry system produces only a few persistent sites/events across Kai Besil instead of checking independently until the map floods. Published Kai Besil and future Mystara geography remains authoritative; the generator only infills otherwise unkeyed space. |

### Encounters and combat

| Procedure | Status | Audit result |
|---|---|---|
| Encounter checks and distance | Deterministic | Terrain/time checks, surprise, encounter distance, and actual monster instantiation are active. |
| Player-visible Matrix inputs | Deterministic | Every encountered creature is described and labeled with Small/Medium/Large at Monster, Vessel, and Structure scales plus Soft/Hard protection. These are never hidden referee statistics. |
| Equipped-weapon distance | Deterministic | Each ready weapon reports exact separation from every target. Melee-capable weapons show Close/Normal/Far only after engagement; missile/throwable weapons show Short/Medium/Long whenever ready. Hybrid weapons can show both simultaneously. |
| Reactions | Deterministic | 2d6 reactions and Charisma adjustments support NPC, encounter, hireling, and retainer decisions. |
| Evasion and pursuit | Deterministic | Encounter evasion/pursuit procedures use relative force, speed, terrain, and persistent outcomes. |
| Initiative | Deterministic/Adapted | RAW side initiative is available. The default phased presentation preserves the movement/missile/magic/melee structure and multi-side ordering. Ordinary named groups remain one side; only an adjudicated surround can create two attacking fronts against one surrounded side, for three initiatives maximum. |
| Surround maneuver | Adapted | Either force may declare a two-front attempt before initiative while at melee contact. Space, relative encounter speed, and numbers affect a recorded d6 check. Corridors and tight approaches can forbid the attempt; failure preserves the original sides; success grants separate initiatives/phases to the two fronts and the surrounded force. |
| Encounter movement | Deterministic | Encumbrance-based movement, approach, regroup, fighting withdrawal, retreat, and legal melee contact are enforced. |
| Missile combat | Deterministic | Range bands, Dexterity, ammunition, engagement restrictions, and thrown weapons are active. |
| Melee combat | Deterministic | THAC0, AC, Strength, magic, damage, death at 0 hp, targeting, and persistent combat state are active. |
| Set Spear vs. Charge | Deterministic | Fighters and demihumans can ready spear/pike/lance/sword shield; a 20-yard-or-longer charge is received before the attack and doubles weapon dice before modifiers. |
| Lance Attack | Outside module | Mounts exist for travel, but individual mounted-combat position and the 20-yard lance maneuver are not a required Kai Besil procedure. |
| Morale | Deterministic | First hit, first death, half disabled, individual checks, automatic ML 2/12 behavior, flight, and persistence are active. |
| FlexAI-informed behavior | Deterministic/Referee-mediated | Each opponent order records a tactical role, current stance, d20 outcome category, target method, and selected target. JavaScript then resolves the action through BECMI. Inappropriate results are rejected or reinterpreted; FlexAI's own resolution, surge, and lull mechanics are not substituted for D&D. |
| High-level Fighter Combat Options | Outside module | Smash, Parry, Disarm, and high-level multiple attacks are not required by this low-level module and are not presented as implemented. |
| Optional Weapon Mastery | Optional off | The data is retained for future use, but the optional subsystem is disabled. |

### Creature catalogue coverage

| Procedure | Status | Audit result |
|---|---|---|
| Indexed roster | Deterministic | The game loads 641 indexed names and variants from the Rules Cyclopedia, DMR2 revised catalogue, and AC9-only index records, with Kai Besil/module profiles overriding matching generic entries. Every loaded key can be instantiated through the encounter engine. |
| Standard combat fields | Deterministic | Every profile supplies a name, AC, Hit Dice/HP expression, movement, THAC0, morale, intelligence, alignment, XP, save target, one or more attack expressions, kind, and tactical role. |
| Matrix classification | Adapted | Every profile has best-judgment Monster/Vessel/Structure size values and Soft/Hard protection derived from printed size, scale, body material, worn protection, shell, hide, and structural character. The source books do not provide these Arms Across Eras classifications directly. |
| Description diversity | Deterministic | A same-type group receives one shared creature/classification statement plus distinguishing visible details for individuals; the encounter does not print one identical paragraph six times. |
| Source transcription quality | Referee-mediated | 97 rows are direct parsed blocks and 386 are source-page matched OCR blocks. The remaining 158 unreadable/index-only entries are clearly marked `provisional-source-index-fallback` and receive conservative usable combat fields rather than being omitted. `dev monster catalog <query>` exposes the source page and quality flag. This is the principal remaining data-quality limitation. |
| Unusual powers and ecology | Referee-mediated | Catalog creatures can always fight with their standard routine. Unusual immunities, spell-like abilities, special movement, lairs, treasure, and ecological behavior use the published entry and AI referee unless a dedicated deterministic handler exists. Module-critical creatures retain curated handlers. |

### Magic

| Procedure | Status | Audit result |
|---|---|---|
| Spell lists and slots | Deterministic | All 108 Magic-User spells and 56 Cleric spells are registered at their levels; slot tables and class ceilings are present. |
| Magic-User acquisition | Deterministic | Starting spells, Read Magic, found scrolls, copying into spellbooks, teacher access, known-spell persistence, and preparation are active. |
| Cleric acquisition | Deterministic | Clerical access follows class/level access rather than spellbook copying. |
| Daily preparation | Deterministic | Duplicate preparations, slot validation, current versus next-rest plans, use, loss by disruption, and recovery are active. |
| Common combat/restoration spells | Deterministic | Sleep, Charm Person, Magic Missile, Shield, major direct-damage profiles, healing, raising, poison/disease/curse removal, food/water, and several controls have direct effects. |
| Open-ended spells | Referee-mediated | Information, illusion, transformation, broad movement, creation, planar, wish, and world-altering effects are recorded with caster/target/duration but need exact referee interpretation. |
| Spell completeness claim | Corrected | “Registered and castable” is accurate. “Every spell has a bespoke deterministic effect” is not. In-game help now states the distinction. |

### Settlements, NPCs, retainers, and personnel

| Procedure | Status | Audit result |
|---|---|---|
| Talamau profile | Deterministic | Population about 400, village scale, development, economy, leadership, supplies, recruitment depth, and defense are player-visible. |
| NPC interaction | Adapted | NPC trust, topics, claims, commitments, and dialogue history persist; deterministic offline dialogue exists. |
| Retainers | Deterministic | Four-hour search, limited candidates, Charisma capacity, reaction offers, wages, shares, equipment, morale, payroll, and dismissal are active. |
| Mercenaries and specialists | Deterministic | Applicable porters, camp hands, mercenaries, sailors, rowers, and a coastal captain have local availability, wages, load capacity, and task restrictions. |
| Physical construction eligibility | Deterministic/Adapted | A fortification is a physical manor, tower, barbican, keep, castle, stockade, or similar built base. The engine permits any living adventurer to finance one at any level when the land, money, material, and labor are available. This general access extends the published early Fighter/Halfling permissions so ownership of a building is not confused with Name-level political authority. |
| Fortification vs. stronghold | Deterministic | A private fortification is a secure hub and safe haven but provides no noble title, territorial rule, subjects, tax or resource income, ruler XP, or ordinary Name-level followers. “Stronghold” is reserved for a completed fortification established at Name level as a dominion seat. A suitable early Halfling clan holding can still attract the published clan community without becoming a Sheriff domain. |
| Fortification construction | Deterministic/Adapted | The component catalog supplies gp cost, structural hp, and War Machine BR bonus. A timber square keep costs 15,000 gp and a timber barbican 7,400 gp—20% of the corresponding stone price—without a second timber or settled-area discount. Both are weaker than masonry and explicitly vulnerable to fire. There is no `minor timber stronghold` preset. Construction takes one day per 500 gp. Masonry, mixed, and advanced works use one 750 gp/month engineer per 100,000 gp or fraction. On primitive Kai Besil, an all-timber/earthwork project may instead use one tribal master builder per 100,000 gp or fraction at 50 gp per 30 days in coin or equivalent barter. This reduced supervisor is a declared campaign adaptation, not a General Skills, Dwarf, charm, or coerced-labor exception to RAW. |
| Stronghold followers | Deterministic | Clerical loyal troops/assistants, fighter applicants, magic-user pupils/trainees, thief apprentices, and demihuman clan households use their published dice and employment conditions. |
| Dominion foundation | Deterministic | A completed recognized Name-level stronghold establishes a 24-mile campaign tract, terrain class, family population, 1–4 animal/vegetable/mineral resources, title, and d100+150 plus ruler-ability confidence base. Private fortifications never start this accounting automatically. Any completed fortification remains a physical safe haven. |
| Dominion month | Deterministic | Each 30-day cycle resolves RAW population growth plus local 1d10 change; 10 gp/family standard service, resource income, and 1 gp/family tax; 20% liege share, 10% tithe, staff costs, total/liquid treasury, and ruler-only XP from resource plus tax income. |
| Confidence and events | Deterministic | The 1–500 confidence bands modify income and unrest. Each game year resets the base confidence and generates 1d4 terrain/context-sensitive events from the Rules Cyclopedia natural/unnatural event lists. |
| Stronghold staff | Deterministic | Artillerist, castellan, chaplain, engineer, guard captain, herald, magist, magistrate, reeve, sage, seneschal, and steward appointments use published monthly salaries. |
| Armies, War Machine, and Siege Machine | Outside module | Stronghold structural values and BR bonuses are stored, but army-scale battle and detailed siege resolution remain the next high-level layer. |

### Water travel

| Procedure | Status | Audit result |
|---|---|---|
| Published water map | Deterministic | Every module D/C/R ocean, coastal-water, and reef cell is present and navigable. |
| Vessel classes | Deterministic | Canoe through war galley rows include daily rates, encounter movement, capacities, crews, hull dice, AC, and propulsion. |
| Wind and water movement | Deterministic | The 2d6 table handles becalming, sail/oar multipliers, shipping water, gale direction, and sinking/wreck procedures. |
| Crew and cargo | Deterministic | Vessels cannot sail without required stations or above cargo capacity. PCs may fill ordinary stations; specialists fill skilled ones. |
| Repair | Deterministic | Talamau repair and limited at-sea repair are active. |
| Reefs | Deterministic | Reef entry applies the module's hull danger and Cursed Reef procedure. |
| Swimming | Deterministic/Adapted | All characters can surface-swim at one-fifth outdoor running speed; over 400 en prevents it. A wreck can hold recoverable excess loads. Rough/reef water uses Constitution checks, support, exhaustion, and rest. |
| Full drowning sequence | Referee-mediated | Breath holding and round-by-round drowning are only needed for a deliberately staged underwater emergency; ordinary and wreck-escape swimming no longer strands the campaign. |

### Module content and end state

| Procedure | Status | Audit result |
|---|---|---|
| Shipwreck Beach start | Deterministic | Coastal, immediately adjacent to Talamau, and migrated from older inland coordinates. |
| Talamau and island sites | Deterministic | Published locations, local services, NPCs, hazards, encounters, and treasure persist. |
| Pirate Camp | Deterministic | Fixed module scenario with camp, beach, Sorrowful Gull, Harshaw, repair shore, portable valuables, negotiation/combat/control states. |
| Temple of the Flame | Deterministic | Room graph, doors, encounters, traps, treasures, hazards, Golden Lantern states, ritual sequencing, and eruption clock are active. |
| Victory | Deterministic | Restore the wards, survive, and return to Talamau. The game records a completed victory. |
| Defeat | Deterministic | Ritual failure and elapsed eruption countdown can destroy Kai Besil and record defeat. |

### Player reference and development controls

| Procedure | Status | Audit result |
|---|---|---|
| Embedded player handbook | Deterministic | A searchable, closeable in-game reference describes the mechanics and commands actually present in this build, including physical mapping aids, the full expedition loop, explicit Matrix classification/range information, surround adjudication, options, campaign adaptations, fortification terminology, and the distinction between registered spells and bespoke effects. |
| Developer command registry | Deterministic | The searchable Developer Commands window is generated from the same live command registry that dispatches the commands. It covers isolated encounters, full monster-catalog search, forced party/enemy surround results, levels, HP, spells, preparations, equipment, treasury, time, wind, location teleportation, map revelation, forced themed site/dungeon generation, fortification construction, and Name-level conversion. |
| Developer Mode gate | Deterministic | Every `dev …` state-changing command is rejected without mutation when Developer Mode is off. Legacy `encounter <count> <monster>` test syntax is likewise gated. Developer actions are explicitly labeled in the transcript. |
| Procedural-generation testing | Deterministic | `dev generate dungeon <theme> [at <q> <r>]` invokes the production Moldvay/Mentzer generator, not a mock generator, and refuses to overwrite a published or already keyed site. |

## Declared campaign rulings

These are deliberate and should not be mistaken for transcription errors:

- Kai Besil uses half-mile hexes; published daily movement is converted to time per crossing.
- Getting lost is checked at most once per day, deferred until the first unanchored wilderness movement.
- RAW getting-lost displacement remains the default. `getting lost mode lost time` is the player-map-safe alternative; it changes only the failure consequence, not probability or eligibility. On failure, the player is explicitly told that the party became lost and knowingly remained in the same mapped hex.
- Heinrich prevents getting lost while he is an active guide.
- Food and potable water are one ration person-day; utility waterskins still exist for hazards and improvised actions.
- One day without rations costs 1d2 hp; ordinary healing is blocked until fed.
- XP and level advancement are settled only at a safe settlement hub or the party's completed fortification; political stronghold status is not required for physical safety.
- Retainers receive a half XP share.
- The contextual weapon matrix is the default, but `weapon mode raw` restores listed Rules Cyclopedia damage.
- The default phased combat display is an interface presentation; `initiative mode raw` remains available.
- FRONT/REAR are exposure roles, not literal rows on a tactical grid.
- Target size at Monster/Vessel/Structure scales and Soft/Hard protection are explicit player decision inputs under Arms Across Eras, even though ordinary monster statistics remain hidden.
- Ordinary party or monster groups do not gain additional initiative merely by splitting. A successful contextual surround is the sole two-front exception; it abstracts all directions into two attackers and one surrounded center, never more than three sides in a physical melee.
- FlexAI provides behavior prompts and targeting discipline only. BECMI morale, movement, initiative, attacks, damage, and saves remain the rules engine.

## Beginning-to-end acceptance path

The following flow is covered by deterministic procedures and regression tests:

1. Create and equip a legal party.
2. Search the coastal wreck and enter Talamau.
3. Learn the settlement's population, services, rumors, NPCs, and expedition opportunities.
4. Buy and distribute provisions; optionally recruit Heinrich, personnel, or retainers.
5. Leave Talamau and travel under the clock, encumbrance, weather, ration, rest, encounter, and getting-lost procedures.
6. Discover or revisit persistent fixed and procedural locations; new dungeon-form sites retain their scenario, history, B/X room stock, physical form, and site-specific wandering table.
7. Negotiate, evade, pursue, fight, retreat, camp, recover, and return with treasure.
8. Settle XP in Talamau and level up; Magic-Users can expand spellbooks from established sources.
9. Reach and explore the Temple of the Flame under dungeon-turn, light, trap, door, encounter, and combat procedures.
10. Recover the ritual requirements and either restore the wards or allow the eruption clock to expire.
11. Return safely to Talamau to record victory, or record Kai Besil's destruction as defeat.
12. If desired, any adventurer may finance a private fortification before Name level, including a 15,000 gp timber keep or 7,400 gp timber barbican supervised on Kai Besil by the campaign-adapted 50 gp/month tribal master builder. A suitable early Halfling holding may attract a community, but no private base receives formal dominion accounting. At Name level, obtain the appropriate class recognition, establish that existing fortification as a stronghold and dominion seat, and run its monthly/yearly economy and confidence cycle.

## Remaining work for a larger Mystara engine

These are not blockers for *The Smoking Pillar of Lan Yu*, but they are the correct next layers before calling the engine a complete Rules Cyclopedia world simulator:

1. Bespoke deterministic implementations for every open-ended spell.
2. Individual mounted combat and Lance Attack.
3. Advanced special-weapon condition tables.
4. High-level Fighter Combat Options and demihuman attack ranks beyond what this module can reach naturally.
5. Army organization, War Machine mass battles, and detailed Siege Machine assaults; stronghold BR and structural values are already stored for that layer.
6. Optional General Skills and Weapon Mastery as explicit campaign toggles.
7. Full round-by-round underwater combat, breath, rescue, and drowning.
8. Wider-world markets, law, travel networks, climate regions, languages, and settlement scaling.
9. Manual verification and bespoke special-power handlers for the 158 catalogue entries whose scan/index statistics are presently flagged provisional.

## Validation conclusion

For this module's intended scope, the core game loop is complete and internally connected. No required beginning-to-end campaign step depends on an unimplemented high-level or optional rule. The engine now distinguishes deterministic coverage from referee-mediated coverage instead of overstating completeness.
