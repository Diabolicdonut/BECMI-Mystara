# Known World BECMI Engine Audit

Build: **0.4.119**  
Primary authority reviewed: **Mentzer D&D - BECM.pdf**, consolidating Mentzer Basic Player, Basic Dungeon Master, Expert, Companion Player, Companion Dungeon Master, Master Player, and Master Dungeon Master.  
Secondary authority: **Rules Cyclopedia.pdf** is used for consolidation/clarification where compatible; it does not replace or override Mentzer BECM when the two differ.  
Audit date: 2026-09-21

## v0.4.119 — Cleric Name-level / stronghold-order closure

This checkpoint is deliberately limited to the **9th-level Cleric land-owning/traveling choice and its existing fortification, dominion, and stronghold-follower integration**. It does not begin the Magic-User, Thief, Mystic, demihuman, or exceptional-monster endgame work.

### The 9th-level institutional path is now persistent

A 9th-level Cleric (and the project’s Cleric-derived Fire Priest) now records one of the source-defined high-level paths instead of automatically becoming a territorial ruler merely for owning a fortification:

- **land-owning cleric** — records the clerical order and the church superior or political ruler who grants the land;
- **traveling cleric, civilized route** — remains mobile within civilized lands and cannot rise through the land-owning hierarchy while that status remains;
- **traveling cleric, wilderness route** — remains mobile in the wilderness, likewise without sanctioned land-owning authority.

A traveling Cleric may still construct and own a private fortification under the project’s general building rules, but that building does **not** automatically become a sanctioned clerical stronghold or dominion seat. A land-owning Cleric becomes eligible only after the order and the represented land grant are recorded. This preserves Mentzer’s requirement that the Cleric report to a superior—church official or political ruler—and obtain land before establishing the high-level holding.

The Rules Cyclopedia clarification that land-owning/traveling status should not be changed casually is represented as a workflow guard: changing from one branch to the other requires an explicit `; major` declaration. This does not invent a new penalty; it simply forces the campaign to acknowledge the major development the source says should accompany such a change.

### Church construction aid no longer defaults automatically to 50%

The previous engine automatically paid half of every recognized Cleric stronghold. That was too coarse for the primary Mentzer procedure.

Mentzer distinguishes three cases: if severe alignment-play punishment has **ever** been required, the church does not participate in castle construction; if the Cleric has been played very well at all times, the church pays **half**; intermediate good/average/fair play can receive **any portion up to 50%**. The engine therefore no longer judges the player’s role-playing by itself. A referee records an approved percentage from **0–50%** with `cleric stronghold aid`; the chosen share is then applied to the represented structure cost. A historical punishment record permanently closes that ordinary aid branch, matching the source’s “ever been needed” condition.

Construction supervision remains a separate payable project contract in the existing construction engine. This pass does not reinterpret the church-aid paragraph as an automatic payment of unrelated monthly engineer/master-builder wages.

### Clerical followers now honor the punishment condition

A completed recognized Cleric stronghold still attracts **50–300 loyal troops**. The primary Mentzer procedure identifies them as same-alignment, mostly Normal Men with Fighter leaders up to 3rd level, requiring **no pay** and never checking Morale. The stronghold record continues to keep the exact troop composition as a referee decision rather than fabricating archers/cavalry/equipment.

The assistant-cleric branch is now conditional rather than unconditional. If alignment punishment has ever been needed, **no assistant clerics arrive**. Otherwise the stronghold attracts **1d6 clerics of levels 1–3**, of the same alignment. The engine stores the count but deliberately does not auto-generate names, personalities, backgrounds, goals, or spell selections; the compatible Rules Cyclopedia explicitly leaves those individuals to the DM and describes them as stronghold staff rather than ordinary adventuring companions.

### Stronghold authority no longer assigns an unsupported clerical barony title

The common dominion routine previously labeled any non-Halfling recognized ruler a Baron/Baroness. That is appropriate to the Fighter branch, but it is not the Cleric’s printed institutional procedure. A recognized Cleric domain is now recorded descriptively as a **Clerical Dominion** with the ruler styled simply as **Cleric** unless the campaign later supplies a separate political title. This avoids manufacturing a noble rank while preserving the existing population, income, confidence, and dominion-accounting machinery.

The land-owning status also records the compatible Rules Cyclopedia property/access clarification: the sanctioned stronghold remains the Cleric’s property, but members of the order are owed access to its facilities. There is no generic “deny entry to institution” action in the engine, so this remains persistent campaign-state guidance rather than a fabricated access roll.

### Commands and persistence

The bounded commands added by this pass are:

```text
cleric path <name>: landowner <order> via <superior/ruler>
cleric path <name>: traveling civilized
cleric path <name>: traveling wilderness
cleric path <name>: ... ; major
cleric order standing <name>: punished [note]
cleric order standing <name>: restored [note]
cleric stronghold aid <name>: <0-50>%
cleric endgame <name>
```

The structured `clericEndgame` record survives member normalization/save-load reconstruction and is included in the Comb of the Korrigans class snapshot/reversal fields, so temporary Elf conversion cannot erase a Cleric’s institutional history.

### Regression validation

Two new focused regression groups, plus the corrected pre-existing church-aid regression, raise the integrated suite from **740 to 742 tests**. They verify discretionary 0–50% church aid, traveling-Cleric denial of sanctioned territorial authority, major-development path switching, the historical-punishment aid/follower boundary, and persistence of order/grant state through character normalization.

```text
Build: 0.4.119
Tests: 742 / 742 passed
Failures: 0
State isolation: preserved
Fresh Chromium processes: 3 / 3 clean
Runtime exceptions/page errors: 0
Console/log errors: 0
JavaScript syntax: clean
```

### Next bounded checkpoint

Proceed with **v0.4.120 — Magic-User Name-level tower / proclamation / apprentice closure only**. Keep that pass limited to the source-defined high-level Magic-User stronghold procedure, ruler proclamation/noninterference, assistance boundary, and tower followers; do not combine it with the Thief, Mystic, demihuman, or exceptional-monster endgames.

## v0.4.118 — Avenger entourage + Knight/Avenger Sanctuary closure

This checkpoint is deliberately limited to the remaining **traveling-Fighter entourage and Sanctuary procedures** left open by v0.4.117. It does not begin the Cleric, Magic-User, Thief, Mystic, or demihuman endgame branches and does not broaden the combat engine into a new allied-monster initiative model.

### An active Avenger can no longer be the employer of human/demihuman hirelings

Mentzer states directly that **an Avenger may not have human or demi-human hirelings**. The personnel and adventuring-retainer systems now preserve an employer identity for new hires. An active Avenger is excluded from ordinary human/demihuman employer selection; if another eligible party member is present, that character may still employ ordinary personnel or retainers. A Fighter who already has directly attributed human/demihuman hirelings cannot enter Avenger status until those hires are released or reassigned.

Older saves may contain party-level personnel created before employer attribution existed. Those legacy rows are not silently assigned to the Avenger, because the old data cannot establish who hired them. This is an explicit save-migration boundary rather than retroactive invention.

### Chaotic monster hirelings are persistent, temporary, and nonrenewable

An active Avenger may attempt the printed persuasion procedure on a represented **Chaotic monster** that is not immediately hostile, or on one that has surrendered. Food, treasure, threats, and surrender are recorded as the approach, but the engine does **not** invent a numerical bonus for any of them: Mentzer supplies none. The normal 2d6 reaction procedure is used, including the Avenger's ordinary Charisma reaction adjustment, and only a result that actually indicates **friendship** establishes the hireling relationship.

The resulting follower occupies a persistent Avenger monster-hireling roster. The compatible Rules Cyclopedia clarification is used for the explicit maximum: the number of active Chaotic monster hirelings cannot exceed the Avenger's normal **Charisma retainer limit**. Once an active slot is lost, another creature can be sought.

Mentzer says the effect lasts for a duration identical to **Charm Person** and cannot be renewed when it ends. The engine therefore reuses the existing Charm intelligence-duration table and periodic saving-throw lifecycle rather than inventing a fixed number of days. It also exposes the Charm rule's extra save when the follower is placed in danger without the controller through the explicit `danger` command. A successful duration/danger save ends the relationship and marks that exact persuasion as **nonrenewable**.

The follower roster preserves source creature identity and saving-throw data across the campaign clock. This pass does not invent a new allied-monster combat side/initiative architecture; when a monster follower must act tactically, its orders remain referee-controlled until the project's common allied-NPC combatant model is extended. That is a combat-data-model issue, not an unimplemented Avenger duration/recruitment rule.

### Knight Sanctuary now has a real three-day campaign state

A Knight can request Sanctuary only where the campaign/referee has established that the local **Knight Sanctuary custom applies**. The engine deliberately does not assume that custom in every culture, because the source explicitly leaves its presence to the DM outside the usual medieval-style setting.

When recognized, Sanctuary now records the host, stronghold/site, start time, and a maximum expiration **three days** later. It carries the printed food-and-drink provision and reciprocal protection: the host may not challenge or attack the Knight, and the Knight may not challenge or attack the host or the host's court/family without ending Sanctuary. The guest's included food/drink is connected to the ordinary daily-provision pipeline so that the protected Fighter does not consume a packed ration while the stay is active. The stay expires automatically at the three-day maximum, may end early, and can be explicitly marked breached; a breach ends the host's reciprocal protection.

### Avenger Sanctuary distinguishes the two printed branches

A known **intelligent Chaotic ruler** of a castle, ruin, or dungeon grants an active Avenger Sanctuary through the alignment-tongue demand branch. This does not require the Avenger to pretend to be a Knight.

For rulers of other alignments, the Avenger may instead attempt to pass as a Knight. Forewarning or represented magical revelation prevents that deception. Where ordinary Knight Sanctuary custom applies, a normal reaction is made. A **friendly** result is sufficient to resolve the ruler as deceived and grant normal Sanctuary; attack/aggressive results refuse it. For the middle cautious/neutral reactions, the source says the ruler *may* be deceived but gives no separate deception roll or numeric threshold, so the engine leaves that outcome referee-resolved instead of manufacturing one. The referee may also explicitly confirm or reject the deception when campaign facts already decide it.

### Commands

The new bounded campaign commands are:

```text
fighter entourage <avenger>
fighter entourage <avenger>: persuade <monster> with food
fighter entourage <avenger>: persuade <monster> with treasure
fighter entourage <avenger>: persuade <monster> with threat
fighter entourage <avenger>: persuade <monster> with surrender
fighter entourage <avenger>: danger <monster>
fighter entourage <avenger>: lose <monster>

fighter sanctuary <name>: request <host> at <site>; custom
fighter sanctuary <avenger>: request <host> at <site>; alignment=chaotic; intelligent; known
fighter sanctuary <name>: end [reason]
fighter sanctuary <name>: breach [reason]
```

The structured `fighterEndgame` record is advanced to version 3 and now persists the monster-hireling roster, sequence, active Sanctuary state, and Sanctuary history. Its normalizer was also changed to preserve object identity while filling defaults; this prevents nested endgame transactions from accidentally writing to a stale pre-normalization object.

### Regression validation

Three new focused regression groups raise the integrated core suite from **737 to 740 tests**. They verify that an active Avenger cannot be the human/demihuman employer while another party member still can; that a friendly Chaotic monster enters the Charisma-limited, Charm-duration roster and becomes nonrenewable after a successful periodic save; and that Knight/Avenger Sanctuary preserves the three-day stay, provision benefit, reciprocal protection/breach state, and direct Chaotic-ruler branch.

```text
Build: 0.4.118
Tests: 740 / 740 passed
Failures: 0
State isolation: preserved
Fresh Chromium processes: 3 / 3 clean
Runtime exceptions/page errors: 0
Console/log errors: 0
JavaScript syntax: clean
```

### Next bounded checkpoint

Proceed with **v0.4.119 — Cleric Name-level / stronghold-order closure only**. Keep that pass bounded to the source-defined Cleric high-level institutional/stronghold procedures and their existing dominion/retainer integration; do not combine it with Magic-User, Thief, Mystic, demihuman, or exceptional-monster work.

## v0.4.117 — Paladin / Avenger derived clerical-ability bridge

This checkpoint is deliberately limited to the **live derived clerical abilities of human Paladins and Avengers** created by the v0.4.116 traveling-Fighter path. It does not begin the Cleric, Magic-User, Thief, Mystic, or demihuman endgame branches, and it does not yet implement the Avenger's separate Chaotic-monster hireling/Sanctuary procedures.

### One-third Fighter level is now a live clerical profile

An active Paladin or Avenger now derives a clerical level equal to **one-third of actual Fighter level, fractions rounded down**. This profile is used by the common spell-slot, prepared-spell, spell-effect, and Turn Undead systems without changing the character's actual class from Fighter.

Both subclasses gain **Turn Undead** at the derived clerical level regardless of Wisdom. **Clerical spellcasting requires Wisdom 13 or greater**. Paladins automatically receive the clerical prayer access supported by the derived level after training with their order; the printed order refuses compensation for that training. Avengers must instead complete a represented allied-order training transaction. The exact Avenger price remains a referee choice as printed; the engine displays the text's recommendation of **at least 10,000 gp per clerical spell level gained** but does not falsely convert the recommendation into a mandatory fixed fee.

The common spell resolver temporarily evaluates a Paladin/Avenger's clerical spell at the derived cleric level for range, duration, spell-level access, and other class-sensitive spell rules, then restores the character's Fighter identity immediately after resolution. Daily meditation/rest preparation uses the same derived clerical slots.

### Detect Evil is an at-will subclass action

Paladins and Avengers may now use their printed **Detect Evil** ability once per round by concentration, at **120 feet**, and cannot attack in the same round. The action reuses the clerical spell's actual detection scope: represented evilly enchanted things and creatures that presently want to harm the detecting character can glow; Chaotic alignment alone does not count, and traps/poison are not treated as evil merely because they are dangerous. Existing Prismatic detection blocking remains in the path.

### Avenger turning can become undead control

When an Avenger receives a successful Turn or Destroy result, the order can now choose **control** instead. The affected undead become charmed/obedient to the Avenger for **one turn per actual Avenger level**. If that duration expires normally, the undead flee as though turned.

A cleric can still turn or destroy an Avenger-controlled undead. Doing so immediately breaks the represented control before the clerical result is resolved and marks that control as nonrenewable by the same Avenger. Controlled/charmed undead remain addressable by the turning target parser so the control state cannot make the printed clerical countermeasure unreachable.

### Paladin hireling cap is enforced at travel boundaries

A Paladin may travel with no more hirelings than the character's derived clerical level. The engine enforces that cap when ordinary personnel or retainers are added and again before wilderness travel. Because the expedition data model stores many hired personnel at party level rather than assigning each worker to an individual employer, the cap conservatively counts active expedition personnel plus living adventuring retainers traveling with the party. That counting rule is an explicit engine bookkeeping convention; the source supplies the cap but not a modern party-database ownership model.

### Commands and deliberate remaining Fighter-subclass boundaries

The live subclass bridge recognizes commands such as:

```text
Aldric detects evil
Varek turns the skeletons and controls them
Varek controls the skeletons
fighter divine training Varek: 20000 gp
```

The Avenger's separate rule forbidding human/demihuman hirelings, the temporary persuasion of Chaotic monster hirelings, and subclass Sanctuary procedures remain outside this checkpoint. Those are still Fighter-subclass endgame work rather than being silently treated as complete.

### Regression validation

Three focused regression groups raise the integrated core suite from **734 to 737 tests**. They verify the Paladin's derived Detect Evil/turning/spell slots/hireling cap; Wisdom-gated and referee-priced Avenger clerical training; and the Avenger turn-to-control lifecycle including clerical disruption and the nonrenewal marker. The pre-existing first-level Cleric preparation regression was also preserved while generalizing the common clerical spell-list path.

```text
Build: 0.4.117
Tests: 737 / 737 passed
Failures: 0
State isolation: preserved
Fresh Chromium processes: 3 / 3 clean
Runtime exceptions/page errors: 0
Console/log errors: 0
JavaScript syntax: clean
```

### Next bounded checkpoint

Proceed with **v0.4.118 — Fighter subclass entourage / Sanctuary closure only**: the Avenger prohibition on human/demihuman hirelings, source-bounded persuasion and duration of Chaotic monster hirelings, and the remaining deterministic Knight/Avenger Sanctuary state. Do not begin the Cleric endgame in the same pass.

## v0.4.116 — Fighter Name-level/endgame path closure

This checkpoint is deliberately limited to the **human Fighter's 9th-level Name-level branch, political status, and source-defined Fighter Combat Option qualification**. It does not start the Cleric, Magic-User, Thief, or demihuman endgames, and it does not yet wire the Paladin/Avenger's derived clerical powers into live spellcasting, Detect Evil, turning, or undead-control actions.

### Name level is now a persistent choice instead of an automatic barony

A Fighter reaching 9th level is now recorded as **Lord** or **Lady** as the source's community status, without silently treating that style as a formal noble title. The player must choose one of the two printed paths: **land-owning Fighter** or **traveling Fighter**. A pre-existing home or castle can still exist before Name level, but it remains private property and does not by itself create territorial authority.

The land-owning path is split into the two source procedures instead of collapsing them together:

- **Fealty / land grant** — the Fighter names the greater ruler to whom the character is in fealty. A represented stronghold can then receive political recognition and establish its dominion. Within an existing country the engine retains the project's established minimum **Baron/Baroness** title and normal liege-share bookkeeping.
- **Independent rule** — the Fighter claims a wilderness dominion outside an existing country. This route carries no invented liege share and does not fabricate a royal land grant. The engine records the Fighter's Lord/Lady status or a referee/player-supplied self-style rather than pretending that the source grants a specific formal independent title.

The independent route is rejected in represented settled territory unless the campaign/referee changes the territorial facts; the engine does not silently transform an existing country's land into unclaimed wilderness.

### Traveling Fighter status and obligations are persistent campaign state

A Name-level traveling Fighter can now record **Paladin, Knight, or Avenger** status with the printed alignment and patron requirements. Paladin requires a Lawful Fighter and a named Lawful clerical order; Avenger requires a Chaotic Fighter and a named Chaotic clerical order; Knight requires a named prince, king, emperor, or equivalent liege. The state records the patron/liege, whether special benefits remain active, pending summons/Call-to-Arms duties, and duty history.

This checkpoint implements the bounded obligation consequences that the source states numerically. A Knight who refuses a summons from the Knight's own liege loses **three experience levels**. The Knight text does not separately prescribe the resulting XP position or reconstruct old Hit-Die rolls, so the engine deliberately reuses the project's common BECMI lost-level bookkeeping convention: XP is placed at the midpoint of the resulting level; deterministic post-Name Fighter hit points are removed; any pre-Name rolled-HP history that an old save cannot reconstruct is flagged for referee resolution instead of inventing dice. Broader consequences such as execution orders, reputation, banishment, confiscation, or whether a Call to Arms was legally issued remain campaign/referee facts unless represented explicitly.

An Avenger who refuses the allied order's summons loses the recorded Avenger benefits immediately, as printed. A later restoration through another order remains a campaign transaction rather than an automatic timer. Paladin service obligations and the broader moral/faction consequences are stored as duties, but this pass does not invent a numeric penalty where the class text supplies none.

### Fighter Combat Options now follow the Companion qualification exactly

The previous engine treated several high-level Fighter states too generously. The qualification check now distinguishes the printed categories:

- a **traveling Fighter** qualifies through active Paladin, Knight, or Avenger status;
- a **land-owning Fighter** qualifies only after swearing fealty to a ruler and receiving represented recognized status;
- an **independent land-owning Fighter does not automatically gain Fighter Combat Options** merely for reaching level 12 or owning a castle;
- the already-implemented demihuman qualification rules remain unchanged.

This removes the old implicit assumption that every high-level human Fighter receives the Companion combat options just from level. The separate level thresholds for multiple attacks remain unchanged once the character actually qualifies.

### Commands and compatibility

The source-bounded campaign commands added in this pass are:

```text
fighter path <name>: traveling
fighter path <name>: landowner independent
fighter path <name>: landowner fealty <ruler>
fighter status <name>: paladin <order>
fighter status <name>: knight <liege>
fighter status <name>: avenger <order>
fighter duty <name>: summon <issuer>
fighter duty <name>: call to arms <issuer>
fighter duty <name>: obey
fighter duty <name>: refuse
fighter endgame <name>
```

Older `fighterCombatStatus` / `fighterFealtySworn` save fields are migrated into the structured `fighterEndgame` record so existing saves do not break. The Comb of the Korrigans' class-conversion snapshot was also extended to preserve and restore this new Fighter endgame state.

The Paladin/Avenger source profiles are recorded, including the one-third-Fighter-level clerical relationship and Wisdom 13 spellcasting threshold, but **their action-level Detect Evil / clerical casting / turning / Avenger undead-control bridge is intentionally not claimed complete in v0.4.116**. That is the next bounded Fighter-related checkpoint.

### Regression validation

Two focused regressions were added. One proves that a fealty-based landowner can establish the recognized barony and qualify for Fighter Combat Options while an unsupported independent/automatic route does not inherit that status. The second proves traveling-status prerequisites and the distinct Knight/Avenger disobedience consequences. Three older stronghold regressions were updated to declare the Fighter's source-required land-owning choice rather than relying on the removed automatic-barony assumption.

```text
Build: 0.4.116
Tests: 734 / 734 passed
Failures: 0
State isolation: preserved
Fresh Chromium runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console/log errors: 0
JavaScript syntax: clean
```

### Next bounded checkpoint

Proceed with **v0.4.117 — Paladin / Avenger derived clerical-ability bridge only**: Detect Evil, the printed one-third-level turning relationship, Wisdom-gated clerical spellcasting, Avenger turn-vs.-control choice/duration, and the Paladin hireling cap. Do not begin the Cleric/Magic-User/Thief endgame branches in the same pass.

## v0.4.115 — Residual artifact integration: Comb of the Korrigans final conversion transaction

This checkpoint follows the v0.4.105 rebaseline and is deliberately limited to the **Comb of the Korrigans' final 1st-level-Elf transformation/reversal transaction**. It does not begin mortal class-endgame work or exceptional-monster batches, and no unrelated artifact geometry producer was bundled into the pass.

### Printed handicap boundary

Mentzer Master gives the Comb a specific first-use handicap: the user **starts turning into an elf (1st level)** when the first power is used; the process takes **three months**, minor changes become apparent after **two weeks**, relinquishing the artifact stops further change immediately, and the return to normal takes **three months**. The existing engine already tracked the two-week milestone, the three-month clock, and the relinquishment/reversal clock. The remaining defect was that full completion merely produced a referee warning instead of actually changing the represented character class.

At the completion timestamp, the engine now performs one atomic conversion transaction. It snapshots the original class state inside the artifact's persistent source runtime and changes the character to **Elf 1**, with XP reset to the beginning of that temporary Elf progression. The live advancement fields are refreshed from the existing Elf tables: role, THAC0, saving throws, spell slots, matrix size, XP bonus, and demihuman Weapon Mastery basic-all access. Existing learned weapon-mastery ranks are retained rather than erased because the artifact text says nothing about loss of learned weapon skill.

The character gains the normal Elf language set while transformed without deleting already learned languages. The pre-transformation language state is part of the reversible snapshot, so the magical Elf-language additions disappear when the printed return to normal completes.

### Spellbook bridge is explicit about the source's missing selection detail

A prior Magic-User or Elf keeps the compatible magical spellbook knowledge while operating at Elf-1 slot limits. A transformed character without a compatible magical spellbook receives the engine's normal beginning-Elf spellbook framework: **Read Magic** plus one stable choice from the same beginning attack/protection choices already used by the character creator (`Charm Person`, `Magic Missile`, `Sleep`, or `Shield`). This is an **engine convention**, not a power named by the Comb. The normal Mentzer/RC beginning-caster procedure makes Read Magic the first lesson and leaves the additional beginning spell under DM control; the Comb itself does not select that spell. The convention is stored in `elfSpellbookConvention` so it is never mistaken for artifact-source text.

Only the legal Elf-1 daily preparation capacity is made ready. Old incompatible clerical/special-class spell state is snapshotted for restoration rather than left active through the temporary class change.

### Hit points deliberately remain source-bounded

The Comb says the user becomes a **1st-level Elf**, but it does not say to reroll, reset, proportionally convert, heal, or reduce current/max hit points. Any of those choices would add an unprinted damage/healing rule and would create difficult reversal exploits. Therefore v0.4.115 changes the class and level but **does not silently reroll or rescale hit points**. The transaction records that decision in `hpTreatment` as an explicit RAW boundary. A campaign that wants a harsher HP interpretation can still adjudicate it, but the core engine does not pretend the artifact supplied one.

### The three-month return to normal now restores the original class safely

If the artifact is relinquished after full transformation, the existing three-month reversal clock continues. At its completion the engine restores the original class snapshot, including original class, level, XP, XP bonus, languages, spellbook/preparation state, class-specific status, and Weapon Mastery record. It then refreshes derived advancement fields.

XP and spellbook changes earned during the temporary Elf phase are archived in `elfPhaseArchive` before restoration rather than silently transferred into the old class. The artifact gives no cross-class XP or spell-learning transfer rule, so automatic conversion of that advancement would be invented. The archive keeps the information available to the referee without corrupting the restored character.

Physical inventory is never deleted by the class restoration. If the character acquired/readied equipment that the restored class cannot legally use, that gear is **unequipped and retained in inventory**. This closes the equipment-legality edge without turning the magical transformation into an item-destruction rule.

A partial transformation that is interrupted before the three-month completion still follows the earlier behavior: it reverses over three months and never performs the Elf-1 class conversion.

### Save/load persistence

The existing transformation progress/minor-change/completion markers are now explicitly retained by `normalizeMember()`. The class snapshot and reversal archive already live in the Known Artifact `sourceRuntime`, which is deep-normalized for saved campaign data. This prevents a save/reload during the three-month handicap from losing the visible transformation status or the class-restoration transaction.

### Validation

Two focused deterministic regressions raise the integrated core suite from **730 to 732 tests**. They verify full Fighter-to-Elf-1 conversion without an invented HP reset, refreshed Elf advancement fields, Elf languages and demihuman basic-all Weapon Mastery, safe original-class snapshotting, compatible spell state, full three-month reversal to an original Magic-User, archival rather than transfer of Elf-phase XP, and class-illegal sword/plate/shield equipment being unequipped without being deleted.

The extracted final inline JavaScript passes `node --check`. The complete deterministic core harness was executed in **three fresh headless Chromium processes** against the exact final self-contained document:

```text
Build: 0.4.115
Tests: 732 / 732 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Next small checkpoint

Proceed to **v0.4.116 — Fighter Name-level/endgame path closure only**. Keep the pass bounded to the source-defined Fighter high-level path choices, status/title/fealty obligations, and their existing stronghold/dominion integration; do not combine it with Cleric/Magic-User/Thief endgames or exceptional-monster work.

## v0.4.114 — Elemental transformation + planar encounter hook

This checkpoint follows the v0.4.105 rebaseline and is deliberately limited to the two remaining source-bounded Elemental-plane edges promised by v0.4.113: **wormhole-arrival elemental transformation/protection** and a **non-random planar encounter candidate hook**. It does not begin residual artifact integration, invent Outer-Plane laws, or add a generic planar wandering-monster table.

### Wormhole arrival now resolves the printed elemental conversion instead of leaving every traveler pending

Mentzer Companion's vortex/wormhole procedure says that creatures and things in a wormhole are **magically changed into the “proper” element when they reach the Elemental Plane, unless protected by powerful magic**. The previous implementation correctly refused to invent a protection roll, but as a result it also stopped short of applying the source's default result to plainly unprotected travelers.

`completeWormholeTransit()` now resolves that default directly. On arrival at Air, Earth, Fire, or Water:

- every living traveler without an explicitly confirmed qualifying protection receives persistent `planarElementalForm` metadata for the destination element;
- represented items actually carried in that traveler's personal inventory receive matching elemental-form metadata, preserving the rule's “creatures and things” wording;
- the conversion is recorded in bounded `planarState.elementalTransformations` history with time, element, source Gate, traveler status, and affected carried things;
- no invented AC, Hit Dice, attacks, immunities, encumbrance change, or elemental-monster stat block is granted merely from the conversion. The source establishes the change of elemental substance/form but does not supply a universal replacement character stat line.

The transformation marker survives normal character normalization/save-style reconstruction.

### “Powerful magic” remains an explicit referee boundary rather than an invented spell list

The source does **not** define a universal spell level, saving throw, percentage, or list of effects that count as “powerful magic” for preventing the wormhole conversion. Existing Elemental-plane survival protections therefore remain separate. In particular, `Survival`, `Create Air`, `Water Breathing`, fire protection, elemental-adaptation items, and Talismans are **not silently promoted** into transformation immunity merely because they help a visitor survive the destination environment.

`planarProtectionRecord()` now has a distinct `transformationProtection` flag. The referee may set or clear it with:

```text
dev plane protect <name> on transformation
dev plane protect <name> off transformation
```

That flag means the referee has already determined that the represented magic is sufficiently powerful **and covers that traveler plus the carried things represented on that character**. The engine does not decide what unnamed magic qualifies. This keeps the deterministic default (unprotected things transform) while preserving the exact source ambiguity where it belongs.

### Elemental-form visitors expose the printed reaction shift

The Rules Cyclopedia states that elementals normally recognize Prime-plane visitors by smell and apply a **-1 reaction penalty**, while visitors appearing in elemental form receive a **+1 reaction bonus instead of -1**. `elementalVisitorReactionModifier()` now exposes that per-traveler distinction for the current Elemental Plane. A traveler converted by the wormhole therefore presents the +1 elemental-form case; a traveler explicitly protected from conversion remains the recognizable Prime visitor and presents -1.

This helper does not invent a single mixed-party reaction modifier. If a group contains both transformed and protected travelers, the per-traveler facts remain available for the actual social encounter/referee procedure.

### Planar encounter support is a source-eligible candidate hook, not a fabricated random table

The core Elemental-plane chapter says that Elemental-plane creatures are described in the monster material and that adventuring can proceed with new encounters, but the reviewed text does **not** supply one universal Elemental-plane encounter frequency or weighted random table. The engine therefore does not roll one.

`planarEncounterHook()` now queries the authoritative **600-entry monster worksheet** and returns only records whose authoritative `Terrain` field explicitly names the current Elemental Plane or `Elemental Planes` generally. It reports that the pool is source-bounded, non-random, and requires referee selection. Prime-only creatures do not leak into the pool merely because their support text mentions an element or another plane.

The developer/referee command:

```text
dev plane encounters
```

lists the current plane's eligible catalogue entries with monster ID, printed `No. Appearing`, and Terrain. It deliberately does **not** roll frequency, weighting, distance, surprise, reaction, or number appearing beyond displaying the source field. Those procedures can be connected later when a specific campaign/adventure supplies the missing encounter table or the referee selects an entry.

The already-implemented Gate spell's printed **10% per turn** other-planar wanderer check remains unchanged; this checkpoint does not reinterpret that Gate-specific rule as a general Elemental-plane encounter frequency.

### Validation

Two net-new deterministic regressions raise the integrated core suite from **728 to 730 tests** while the old Gate/wormhole transformation regression is upgraded to assert the resolved behavior. The new coverage verifies that ordinary planar-survival magic does not automatically block wormhole conversion, explicit referee-confirmed powerful magic does, transformed carried things are represented, the elemental-form/Prime-visitor reaction distinction is available, and the encounter hook filters the authoritative catalogue without consuming RNG or inventing a table.

The extracted final inline JavaScript passes `node --check`. The complete deterministic core harness was executed in **three fresh headless Chromium processes** against the exact final self-contained document:

```text
Build: 0.4.114
Tests: 730 / 730 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Next small checkpoint

Proceed to **v0.4.115 — Residual artifact integration only**. Keep that pass bounded to the **Comb of the Korrigans' final safe 1st-level-elf conversion transaction** plus at most one tightly related deterministic artifact object/container/geometry edge; do not combine it with class-endgame or exceptional-monster batches.

## v0.4.113 — Astral navigation only

This checkpoint follows the v0.4.105 rebaseline and is deliberately limited to **Astral navigation state and lost/found adjudication**. It does not begin the separate Elemental transformation/encounter pass, and it does not pretend that the source supplies a percentage chance to become lost when none is printed.

The compatible Master-era Astral procedure, consolidated in the Rules Cyclopedia, establishes three concrete facts the engine can use without invention. From the Astral Plane the **Ethereal boundary appears as an unmistakable dull gray**. Ordinary Astral travel is normally by flight, with only minor gravity near solid matter. For destinations toward inner or outer planes, however, **there are no signposts**, so inexperienced travelers can easily become lost; the text suggests that a Wish or magical navigation aid may be critically important. The supplied rule does **not** give a universal lost percentage, ability check, distance unit, travel time, or definition of when a traveler becomes “experienced.”

### Persistent Astral course state

`planarState` now carries a normalized `astralNavigation` record with:

- a monotonically numbered current course;
- the named destination being sought;
- course status (`pending_referee`, `located`, or `lost`);
- start/resolution campaign timestamps;
- a snapshot of any explicitly represented navigation guidance;
- a bounded navigation history suitable for save/load campaign persistence.

Leaving the Astral Plane ends the active course so stale Astral navigation state cannot continue to masquerade as an active route on another plane. The historical navigation log remains available.

### The visible Ethereal boundary is the one deterministic navigation case

A course aimed at the **Ethereal boundary** resolves to `located` immediately. This is not a new navigation roll or engine convenience; it follows the printed statement that the boundary is unmistakable from the Astral side.

Locating it does **not** automatically cross it. The party remains on the Astral Plane until an appropriate spell, Gate, or other represented planar-travel procedure actually moves them across the boundary.

### Other Astral destinations preserve the source's referee judgment

A course toward an outer plane, inner-plane route, or other named Astral destination is stored as `pending_referee`. No d6, percentile roll, Wisdom check, Survival check, or invented travel interval is generated. The rules warn that getting lost is easy but do not define a universal mechanic, so the engine exposes the unresolved state directly.

The referee can resolve the represented attempt as `found` or `lost`; either result is recorded persistently and **does not itself change planes**. “Found” means the destination/route has been located in Astral space, not that the party has bypassed whatever Gate, Wish, vortex, wormhole, or other access rule the destination still requires.

### Explicit navigation aids are recorded, not fabricated

Developer/referee support adds:

```text
dev plane astral guide <description|off>
dev plane astral navigate <destination>
dev plane astral resolve <found|lost> [note]
```

The first command records a source-authorized aid already present in the campaign—for example a Wish-based direction or some adventure-specific magical navigation aid. The engine does not create such an item, assign it a bonus, or guarantee success, because the core Astral text supplies none of those details. The aid is copied onto the active course so later referee adjudication preserves what guidance was actually available at the time.

`dev plane status` now reports the active Astral course, its status, whether referee lost/found adjudication is pending, and any represented navigation aid.

### Deliberately still open

This checkpoint does **not** claim to finish every Astral rule. The separate rule that mortal three-dimensional magic becomes two-dimensional and that a caster can learn to rotate such an effect after **3–6 castings** still requires a general geometry integration across the area's spell producers. That work remains a plane-specific magic edge rather than being silently approximated in this navigation checkpoint. Likewise, this pass does not add planar encounter tables, Elemental transformation automation, or Outer-Plane local laws.

### Validation

Two new deterministic regressions raise the integrated core suite from **726 to 728 tests**. They verify that the visible Ethereal boundary is located without an invented lost roll or automatic plane crossing, and that an unsignposted destination preserves a pending referee state with any represented Wish/navigation aid, accepts an explicit lost/found result, and keeps the party on the Astral Plane.

The extracted final inline JavaScript passes `node --check`. The complete deterministic core harness was executed in **three fresh headless Chromium processes** against the exact final self-contained document:

```text
Build: 0.4.113
Tests: 728 / 728 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Next small checkpoint

Proceed to **v0.4.114 — Elemental transformation + planar encounter hook only**. Keep that pass bounded to source-defined Elemental wormhole-arrival transformation/protection and the planar encounter hook; do not combine it with residual artifact integration or Outer-Plane campaign-law authoring.

## v0.4.112 — Weapon Mastery net/bola ownership and repair

This checkpoint follows the v0.4.105 rebaseline and is deliberately limited to **the physical lifecycle of thrown bolas and nets**. It does not begin Astral navigation or any later planar work. Mentzer Master explicitly says that when a bola victim makes the saving throw, the bola is removed; the victim may spend a round destroying it with an edged weapon, and otherwise the bola falls to the floor undamaged. Mentzer also says a net is easily damaged by an edged weapon, claw, or bite, is useless while damaged, and can be repaired when rope or cord is available with **1–3 turns of undisturbed work**. The compatible Rules Cyclopedia adds the familiar dagger-net escape detail: a netted victim with a dagger gains +4 to the escape save, and success means cutting out of the net and destroying it.

### Thrown bolas and nets now leave the wielder's inventory

A missile attack with a bola or `net_medium` now detaches **one actually owned weapon** from the attacker's carried inventory when the throw is committed. If that was the wielder's last carried copy, the stale equipped-weapon reference is cleared. The combat stores one physical `masteryThrownWeapons` record with the item type, original owner, target, throw round, and current disposition.

This closes the old bookkeeping gap in which one equipped bola or net could be thrown repeatedly without ever leaving the wielder's possession.

The record follows the weapon through the existing Mastery procedure:

- a miss, an initial successful save, or ordinary later removal leaves the intact weapon on the represented battlefield;
- an entangle, slow, or strangling result marks that same weapon as physically **binding** the victim;
- the existing helper-removal procedure releases an intact bola when the victim's +2 assisted saving throw succeeds;
- deliberate edged-weapon destruction of a bola permanently destroys that physical bola;
- the net escape path keeps the existing dagger-specific +4 procedure and now records the cut net as an unusable damaged-net repair entry rather than silently returning a usable net to inventory.

The last bullet is an explicit engine interpretation at a wording boundary. The Cyclopedia calls the successful dagger escape “destroying” the net, while Mentzer separately says edged-weapon damage to a net is repairable. Neither supplied passage states whether that particular cut is beyond repair. For campaign utility, this build treats the cut escape as **damaged/unusable but repairable**, rather than inventing a second unpriced category of irrecoverably destroyed net. The audit records that interpretation instead of presenting it as a quoted RAW distinction.

### Post-combat recovery is ownership bookkeeping, not a new BECMI roll

When combat ends in a clean party victory, an intact thrown bola or net that is still represented on the battlefield is returned to its recorded owner. A binding weapon carried away by a fleeing target is marked lost instead. A deliberately destroyed bola and a damaged net are never auto-restored as usable equipment.

The books establish that an undestroyed bola can remain on the floor or in someone's possession and that an escaped net is thrown aside, but they do not print a post-battle search/recovery roll. Automatic recovery after an uncontested victory is therefore an **engine bookkeeping convention** for an item whose represented location is already known, not a new claimed BECMI rule. Adventure circumstances can still remove the item by having its target flee or by other explicit world-state changes.

### Damaged nets persist and use the printed repair time

`damagedNets` is now part of normalized member state, so a cut/damaged net survives save/load-style member normalization instead of vanishing between sessions. A damaged net cannot be equipped or auto-recovered as a functioning `net_medium`.

Outside combat, the existing player command:

```text
<name> repairs net
```

now routes through a common repair procedure. It requires at least one represented supply of **rope or cord** on the character or in party inventory, advances campaign time by **1d3 turns (10–30 minutes)**, removes one damaged-net entry, and restores one usable medium net. It is refused during combat because the source requires undisturbed work.

The source requires rope or cord to be available but does not state how many feet, cn, or inventory units are consumed by one repair. The engine therefore checks for the material but does **not** decrement an invented quantity. If a campaign wants exact cord expenditure, the referee can record it separately once an adventure/source supplies a quantity.

### Validation

Two new deterministic regression groups raise the integrated core suite from **724 to 726 tests**. They verify that one thrown bola leaves inventory, remains tied to its binding target, returns to its owner only when intact and accessible, and stays gone when deliberately destroyed. They also verify damaged-net persistence, non-recovery as usable gear, the 1d3-turn repair interval, required rope/cord availability, restoration of one usable net, and the deliberate absence of an invented rope-consumption quantity.

The extracted final inline JavaScript passes `node --check`. The complete deterministic core harness was executed in **three fresh headless Chromium processes** against the exact final self-contained document:

```text
Build: 0.4.112
Tests: 726 / 726 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Next small checkpoint

Proceed to **v0.4.113 — Astral navigation only**. Keep that pass limited to the source-defined Astral movement/navigation procedure and its persistent campaign state; do not combine it with the separate elemental/Outer-Plane follow-up or residual artifact integration.

## v0.4.111 — Weapon Mastery poison logistics: blowgun darts and treated-ammunition consumption

This checkpoint follows the v0.4.105 rebaseline and is deliberately limited to **blowgun poison acquisition/application bookkeeping and ammunition consumption**. It does not begin the separate net/bola ownership, rescue, destruction, or repair pass. The compatible Rules Cyclopedia equipment table gives the concrete ammunition values that can be automated without invention: a blowgun normally uses a load of **5 darts**, replacement darts cost **1 gp per 5**, and **5 darts weigh 1 cn**. The blowgun description separately says that the darts themselves cause no damage, are usually treated with poison, and deliver their result through a saving throw vs. poison; undead and other poison-immune creatures cannot be harmed by the blowgun poison.

### Blowgun darts are now ordinary persistent ammunition

Both short and long blowguns now use a shared `darts5` ammunition record. A standard five-dart load is a purchasable weaponsmith item at the printed 1 gp / 1 cn values, and each missile attack consumes exactly one dart before its attack roll, just like the existing arrow, quarrel, and sling-stone ledgers. The combat ammunition summary reports the total remaining darts and, when relevant, how many of those darts are already poison-treated.

This closes the former state in which a blowgun had a poison special-effect handler but no actual dart ammunition to consume.

### Poison is attached to individual prepared darts rather than to the weapon forever

The old compatibility path accepted a coarse `weaponPoisoned` / equipped-weapon `poisoned` flag. Such a flag could make every later blowgun shot poisonous indefinitely. v0.4.111 removes that behavior from blowgun resolution. Poison is now stored as a count of **prepared remaining darts** on the ammunition record. A shot prefers a prepared dart when one is available, consumes that single prepared dose with the dart, and then falls back to plain darts once the prepared supply is exhausted. A plain blowgun dart continues to inflict no direct damage and does not invoke the poison special-effect table.

The existing Companion/Mastery victim-HD table, poison saving throw, and poison-immunity logic are otherwise unchanged. The poison-immunity message is now reached only when the shot actually consumed a poisoned dart, so a harmless plain dart is no longer described as poison that the target resisted or ignored.

### Acquisition is referee-authored where BECMI supplies no universal poison market rule

The cited BECMI material permits the DM to forbid player poison use and discusses legal/alignment concerns, but it does **not** supply a universal player poison price, dose cost, preparation duration, or ordinary acquisition procedure. The engine therefore does not invent one.

A new developer/referee command records an explicitly authorized number of **dart treatments**:

```text
dev poison supply <name>: <dart treatments> [source/note]
```

No money is automatically charged. The optional note can identify the adventure source, harvested venom, NPC supplier, treasure entry, or other referee-determined provenance. This record survives save/member normalization.

Outside combat, a player can apply that recorded supply with either form:

```text
<name> poisons <N> blowgun darts
poison <N> blowgun darts for <name>
```

The engine requires enough untreated darts and enough authorized treatments before changing state; it does not partially fulfill an oversized request. Because the source does not state a universal application time, the engine records no invented elapsed time. Attempting to prepare poison during active combat is refused with a referee-boundary message rather than silently assigning an action cost. `poison status <name>` reports ordinary darts, prepared poisoned darts, remaining treatment supply, and the referee provenance note.

For Lawful characters the engine emits the source-backed caution that deadly poison use is not a good act and can be illegal, but it does not automatically alter alignment or invent local law.

### Validation

Two new deterministic regression groups raise the integrated core suite from **722 to 724 tests**. They verify the printed five-dart load/cost/encumbrance, persistent preparation and one-shot-at-a-time poison consumption, save-style persistence of the referee-authored poison record, successful integration of a consumed treated dart with the existing blowgun poison procedure, and rejection of the old inexhaustible weapon-level poison flag.

The extracted final inline JavaScript passes `node --check`. The complete deterministic core harness was executed in **three fresh headless Chromium processes** against the exact final self-contained document:

```text
Build: 0.4.111
Tests: 724 / 724 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Next small checkpoint

Proceed to **v0.4.112 — net/bola ownership and repair only**. Keep that pass limited to physical ownership after throws, assisted rescue, deliberate destruction, and source-bounded recovery/repair behavior; do not combine it with Astral navigation or later planar work.

## v0.4.110 — unusual Anti-Magic geometry closure

This checkpoint follows the v0.4.105 rebaseline and is deliberately limited to **directional magical-area clipping plus one permanent-item boundary regression**. It does not begin Weapon Mastery poison logistics or broaden the Anti-Magic system into source-unsupported shapes. The governing Master Anti-Magic rule remains the existing percentage-area procedure. The compatible Rules Cyclopedia Beholder text supplies the important spatial behavior: the central-eye ray temporarily turns off magic within 60 feet in front of the beholder; a spell cast outside the field is ruined when its effect reaches the field; magical weapons/items function again after leaving; and existing duration effects resume once the ray is directed elsewhere. The printed Beholder entry does **not** provide an exact ray width, so the project's existing 10-foot finite-cylinder width remains an explicit engine convention rather than a claimed Mentzer measurement.

### Directional cone and line effects now clip per recipient path

The artifact **Fire Breath**, **Ice Breath**, and **Acid Breath** handlers previously used a target-level Anti-Magic check. That meant a distant selected target standing in or beyond Anti-Magic could cancel the *entire* represented breath, including creatures closer to the wielder that the breath reached before encountering the field. This contradicted the already implemented Lightning Bolt/Fire Ball principle that an instantaneous magical effect can function normally until it actually reaches a cancelling Anti-Magic boundary.

v0.4.110 separates the **activation point** from the **downrange magical path**. Anti-Magic covering the wielder can still cancel the whole artifact-power activation. Otherwise, the cone or line is resolved against each represented victim's straight magical path from the wielder. All paths in the same activation share each field's percentage result, so a partial Anti-Magic zone is rolled once for that single magical effect rather than being rerolled independently for every creature. A victim before the cancelling field is affected normally; a victim whose path enters a cancelling field is not affected beyond that boundary. The existing Prismatic trajectory checks remain independent and continue to apply after Anti-Magic path resolution.

**Blasting** now uses the same rule. Its 60-foot widening cone is no longer globally erased merely because one farther recipient lies across an Anti-Magic field. Near-side recipients resolve normally while paths that enter a cancelling field are clipped. This closes the deterministic instantaneous cone/line cases identified by the rebaseline without inventing a universal voxel simulation for every persistent cloud or campaign-authored irregular magical volume.

### Permanent-item attack/radiated distinction is now regression-locked

The existing permanent-weapon runtime already implemented the source distinction correctly, but v0.4.110 adds an explicit cross-system regression so later geometry changes cannot silently collapse it. A **radiated** Anti-Magic field does not suppress the permanent magical plus of an equipped weapon merely because the weapon is a permanent item. An **attack-form** Anti-Magic field can suppress that permanent magic while the wielder remains inside the field, and the magical bonus returns immediately after leaving.

This does not claim universal permanent-item routing for every unmodeled item category. It closes the explicit equipped-weapon case named by the source and preserves the common distinction needed by future item integrations.

### Validation

Two new deterministic regression groups raise the integrated core suite from **720 to 722 tests**. The first verifies near-side versus far-side clipping for both the widening Fire Breath cone and the line-shaped Acid Breath. The second verifies the same per-recipient clipping for Blasting and locks the radiated-versus-attack Anti-Magic behavior of a permanent magical weapon, including immediate restoration after exit.

The extracted final inline JavaScript passes `node --check`. The complete deterministic core harness was executed in **three fresh headless Chromium processes** against the exact final self-contained document:

```text
Build: 0.4.110
Tests: 722 / 722 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Next small checkpoint

Proceed to **v0.4.111 — Weapon Mastery poison logistics only**. Keep that pass limited to acquisition, preparation/application, persistence/consumption, and the source-defined poison use procedure; do not combine it with net/bola ownership and repair, which remains the separate v0.4.112 checkpoint.

## v0.4.109 — Anti-Magic normalization: Feeblemind / Confusion mental-state bridge

This checkpoint follows the v0.4.105 rebaseline and is deliberately limited to **one bounded family of ongoing magical mental states**. It does not attempt the remaining unusual Anti-Magic geometry, blanket permanent-item suppression, or a universal conversion of every artifact power. The existing Master Anti-Magic core remains authoritative for attack-form versus radiated Anti-Magic, percentage checks, suppression, and resumption. The compatible Rules Cyclopedia clarification is especially useful at this integration boundary: attack-form Anti-Magic can turn off all magic including permanent items while they remain in the field; radiated Anti-Magic affects temporary magic; and temporary magic explicitly includes **spell-like effects produced by permanent magical items**. Ordinary Dispel Magic does not destroy a magical item, but it may dispel an effect produced by that item.

### Ordinary Feeblemind now obeys temporary Anti-Magic suppression in its live action gates

The full Feeblemind procedure was already represented by a persistent `activeSpellEffects` row, but several live character gates still treated the legacy `feebleminded` boolean as permanently authoritative. That meant a target could have its Feeblemind effect correctly marked as Anti-Magic-suppressed while still being treated as Intelligence 2, helpless, unable to move, and unable to cast.

v0.4.109 replaces those direct checks with a common **operational Feeblemind predicate**. If the Feeblemind row is active, the established Intelligence-2/helpless state applies. If attack-form or radiated Anti-Magic has suppressed the row, the condition temporarily stops operating without deleting the underlying spell record or consuming its remaining duration. When attack-form Anti-Magic is left, the same Feeblemind record becomes operational again and its restrictions resume. Legacy non-normalized Feeblemind flags remain supported so older saves are not silently stripped of state.

### Ordinary Confusion no longer leaves a stale round directive while suppressed

Ordinary Confusion was already stored in the common spell-effect registry, so the round processor naturally skipped it while the row was suppressed. However, the target's most recently rolled `confused` / `rawConfusionAction` state could remain behind and continue to look active during Anti-Magic.

The Anti-Magic lifecycle now clears that **transient current-round directive** when the Confusion effect is suppressed. It does not delete the spell effect. Once the magic is operational again, the normal Confusion round processor rolls the next represented save/action from the remaining duration.

### Artifact Feeblemind and Confusion now expose common 40th-level magic-effect bridges

The deterministic Table A2 artifact implementations for **Feeblemind** and **Confusion** previously created bespoke subject/artifact flags only. Their initial activation already checked Anti-Magic, but an already-running effect could not subsequently enter the common Anti-Magic lifecycle and ordinary Dispel Magic could not discover the item-produced magical effect.

Both powers now create a shadow/common magic-effect record at the project's established **artifact caster level 40**, while retaining their artifact-specific runtime record where one is needed:

- Artifact **Feeblemind** links its helpless/Intelligence-2 state to an indefinite common effect. Anti-Magic can suppress the produced magic without curing it; ordinary Dispel Magic can destroy the produced effect, clearing the linked condition while leaving the artifact itself intact.
- Artifact **Confusion** links each twelve-round artifact target record to a two-minute common magic-effect row. Its per-round Confusion procedure only operates while that bridge is operational. Dispel Magic deactivates the linked artifact Confusion record and clears the target's current directive, but does not destroy or deactivate the artifact vessel itself.
- **Cureall** now removes either ordinary or artifact-backed Feeblemind through the same represented-effect cleanup path, including a temporarily Anti-Magic-suppressed row.
- Normal expiration/deactivation of the artifact Confusion record also removes its common bridge so no orphaned dispellable effect remains.

This deliberately does **not** normalize the rest of the artifact mental/control table yet. Charm, Geas, Hold, Sleep, Fear, Open Mind, and the control families remain candidates for later cross-system normalization only if a subsequent completion audit shows that their bespoke state still bypasses a required common rule.

### Validation

Two new deterministic regression groups raise the integrated core suite from **718 to 720 tests**. They verify that ordinary Feeblemind and Confusion turn off inside a represented 100% attack-form Anti-Magic field and resume after it is left without losing the underlying effect, and that artifact-produced Feeblemind/Confusion are represented as 40th-level common magic effects that ordinary Dispel Magic can remove without harming the artifact.

The extracted final inline JavaScript passes `node --check`. The complete deterministic core harness was executed in **three fresh headless Chromium processes** against the exact final self-contained document:

```text
Build: 0.4.109
Tests: 720 / 720 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Next small checkpoint

Proceed to **v0.4.110 — unusual Anti-Magic geometry closure**. Keep that pass bounded to the remaining ray/cone/irregular geometry and area/path clipping cases identified by the rebaseline; do not combine it with the later Weapon Mastery, planar, artifact, or class-endgame domains.

## v0.4.108 — Contingency / Timestop timing closure

This checkpoint is deliberately limited to two timing edges from the v0.4.105 rebaseline. It does not reopen the ninth-level spell implementations generally. The source hierarchy remains unchanged: **Mentzer D&D - BECM is primary**, with **Rules Cyclopedia** used only as compatible consolidation. The consolidated Contingency text says that the stored spell triggers **automatically and immediately** when its specified local situation occurs, explicitly gives **“touched or struck”** and **“about to be damaged”** as examples, and requires the contingent event to pertain to something within 120 feet. The Timestop procedure separately allows non-instantaneous spells to be created during stopped time but delays their operation and their durations until normal time resumes.

### Successful hand-to-hand contact is now a native Contingency event

The common melee-hit pipelines now emit a deterministic local contact event after a successful hand-to-hand hit has been established. An active structured Contingency may therefore match either `touched` or `struck` without requiring a referee to inject the event manually. The event carries the represented attacker, alignment/living status, attack name, and zero-foot contact distance so the existing Contingency matcher can continue to enforce structured predicates rather than guessing free-form prose.

Timing is intentionally distinct from the already-implemented `about_to_be_damaged` event. A successful `struck` event fires **at contact after the hit is established**; the contingent spell resolves immediately, but it does not retroactively erase the already-landed hit or cancel its damage packet. By contrast, an explicit `about_to_be_damaged` Contingency is still evaluated by the pre-damage hook and can move/protect the subject before that pending packet resolves. This preserves the source's meaningful distinction between the two example trigger wordings instead of collapsing them into one damage event.

### Timestop now delays spell-effect-start Contingency events until the effect actually exists

Persistent represented spell effects now emit a native `spell_effect_started` Contingency event at the moment their active effect record is actually established. Creating the Contingency effect itself is excluded so a newly prepared Contingency cannot self-trigger during setup.

This integrates cleanly with the existing Timestop deferred-spell queue. A non-instantaneous spell cast during stopped time is queued and does **not** emit a false spell-start event while normal time is frozen. When Timestop ends, the queued casting is released, the spell effect is actually created, its duration begins at that moment, and only then does the native spell-start event become eligible to trigger a stored Contingency.

The regression case uses **Fly** as the deferred spell and **Invisibility** as the contingent spell. Neither Fly nor the Contingency trigger occurs during stopped time; when normal time resumes, Fly begins and immediately triggers the stored Invisibility, with both effects beginning on the release minute.

This checkpoint does not attempt to parse arbitrary natural-language Contingency conditions. Free-form trigger wording that is not represented by a supported structured event remains a referee-observed boundary rather than being guessed by the engine.

### Validation

Two new deterministic regression groups raise the integrated core suite from **716 to 718 tests**. They verify native successful-melee `struck` activation and the ordering of a Timestop-deferred spell-effect-start event.

The extracted final inline JavaScript passes `node --check`. The complete deterministic core harness was executed in **three fresh headless Chromium processes** against the exact final self-contained document:

```text
Build: 0.4.108
Tests: 718 / 718 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Next small checkpoint

Proceed to **v0.4.109 — Anti-Magic normalization**. Keep that pass limited to one bounded family of bespoke spell/item states that still bypass the common Anti-Magic/Dispel lifecycle; do not combine it with unusual Anti-Magic geometry, which remains the separate v0.4.110 checkpoint.

## v0.4.107 — Shapechange exceptional-form bridge: petrifying natural attacks and Troll regeneration

This checkpoint is deliberately narrow and continues the v0.4.105 rebaseline rather than reopening the spell lists. The governing Shapechange rule says that the caster becomes the chosen creature or object in all respects except **mind, hit points, and saving throws**, taking the form's Armor Class, attack rolls, **special attack forms, immunities, and all other details**, including weaknesses as well as strengths. The engine already inherited form AC, THAC0, ordinary natural attacks, movement, several common immunities, and dragon/giant category predicates. v0.4.107 adds two deterministic exceptional-form bridges where the existing monster catalogue supplies enough structured BECMI data to resolve the rule without inventing behavior.

### Shapechange can inherit a petrifying natural attack without granting it to Polymorph Self

The canonical Basilisk profile already separates its ordinary **1d10 bite** from the source-defined gaze and marks the bite itself as petrifying. v0.4.107 routes that structured attack trait through a Shapechanged character's natural-attack procedure. When the Shapechanged caster's Basilisk bite hits a represented creature, the target now makes the ordinary **Turn to Stone** saving throw; failure establishes persistent petrification and ends immediate hostility in the same way as the engine's other represented petrification procedures.

This bridge is explicitly gated to **Shapechange**. The fourth-level **Polymorph Self** handler continues to grant natural physical attacks while denying special abilities and special immunities, so a Polymorph Self Basilisk bite remains ordinary physical damage only. This prevents the new common attack-trait consumer from accidentally upgrading the weaker transformation spell.

The Basilisk's gaze is not silently generalized here. Shapechange still exposes the form's source-defined special-attack identifier, but gaze targeting, eye-aversion choices, surprise, mirrors, and line-of-sight procedure remain a separate exceptional bridge rather than being inferred from the bite flag.

### Troll form now carries its delayed regeneration and fire/acid flaw

The canonical Troll profile now exposes the source-backed regeneration packet: **three rounds after injury, regenerate 3 hit points per round**, while **fire and acid damage do not regenerate**. When a living Shapechanged caster in Troll form takes actual hit-point damage, the common PC damage pipeline records only regenerable damage. Fire- or acid-tagged damage is kept outside that pool.

At the end of combat rounds, the shared Shapechange exceptional processor begins healing the recorded ordinary wound after the printed three-round delay and restores at most 3 hit points per round, never above the caster's unchanged maximum hit points. Changing form clears the form-specific regeneration queue; the engine therefore does not manufacture latent Troll regeneration after the caster has ceased to be a Troll.

This is intentionally bounded to a **living caster with positive hit points**. The engine does not use Troll regeneration as an undeclared resurrection procedure after the preserved caster hit-point total reaches zero, and severed-body-part behavior remains a separate exceptional-monster boundary.

### Validation

Two deterministic regression groups raise the integrated core suite from **714 to 716 tests**. They verify that a Shapechanged Basilisk bite uses the represented petrification procedure while Polymorph Self does not inherit it, and that Troll-form ordinary wounds begin regenerating at 3 hit points per round after the three-round delay while fire damage remains outside the regeneration pool.

The exact final inline JavaScript passes `node --check`. The complete deterministic core harness was executed in **three fresh headless Chromium processes** against the exact final self-contained document:

```text
Build: 0.4.107
Tests: 716 / 716 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Next small checkpoint

The next rebaselined checkpoint is **v0.4.108 — Contingency / Timestop timing closure**. It should remain a small cross-system timing pass rather than starting another broad spell audit.

## v0.4.106 — Fire Ball / Delayed Blast Fire Ball empty-point geometry and Prismatic interception

This is the first implementation checkpoint after the v0.4.105 rebaseline and is deliberately narrow. It does **not** reopen the spell lists or attempt to generalize every point-selected spell at once. It closes one concrete geometry family shared by **Fire Ball** and **Delayed Blast Fire Ball**: both can now be placed at a represented empty point rather than requiring a creature to occupy the desired center, and the magical path to that point now participates in the existing Anti-Magic and Prismatic Wall trajectory layers.

### Fire Ball can burst at a represented empty point

The ordinary Fire Ball handler previously centered the 20-foot-radius blast on a represented creature, which was an engine convenience rather than a source requirement. v0.4.106 adds a shared point parser that accepts a structured 3D point (`pointVector`, `targetPoint`, `targetVector`, `centerVector`, or `point`) and a compact textual `point x,y,z` form. Fire Ball now:

- accepts an empty represented point as its center;
- enforces the printed 240-foot caster-to-point range;
- checks the caster-to-point segment against represented Anti-Magic before the explosion is created;
- checks the same segment against Prismatic Wall's general-magic interception, so a surviving violet layer can stop the spell before the blast appears beyond the wall;
- preserves the existing 20-foot-radius area, individual saving throws, Immunity handling, and Anti-Magic blast clipping once the explosion exists.

A creature target remains valid and simply supplies the point through its represented combat coordinates, so existing creature-targeted calls continue to work.

### Delayed Blast Fire Ball uses the same empty-point placement path

Delayed Blast Fire Ball can now seed its delayed magical gem at a represented empty point within 240 feet. The point is stored directly on the persistent delayed-blast record together with the selected 0–60-round countdown. The magical placement path is checked before the gem is created: cancelling Anti-Magic or a surviving violet Prismatic layer can stop the magic from being established beyond the barrier while still consuming the cast. The existing delayed detonation procedure remains unchanged once a gem has actually been placed.

This remains intentionally bounded. **Meteor Swarm** and other source-defined point/area placement procedures are not silently generalized by this checkpoint; they remain separate audit targets where their targeting semantics differ.

### Spell-backed artifact Fire Ball keeps the wielder as the geometric origin

The new point/range logic exposed a real compatibility edge in the older spell-backed artifact adapter. Artifact powers invoke ordinary spell procedures through a virtual level-40 caster, but that virtual record is not itself a represented combat body and therefore has no 3D coordinate. v0.4.106 passes the actual artifact wielder/origin into the ordinary spell order as `artifactOriginName`. Fire Ball can therefore apply its 240-foot range and Prismatic/Anti-Magic trajectory from the real wielder rather than rejecting the spell-backed artifact use for lack of a virtual-caster coordinate. Autonomous artifact spell use receives the same origin handoff.

### Validation

Two new deterministic regression groups raise the integrated core suite from **712 to 714 tests**. They verify that Fire Ball can explode at an empty represented point and is stopped by a surviving violet Prismatic layer, and that Delayed Blast Fire Ball can place a timed gem at an empty represented point but cannot seed that gem through violet.

The first full run also caught the spell-backed artifact-origin regression described above and two invalid test-wall fixtures whose requested 30-by-30-foot flat walls exceeded Prismatic Wall's 500-square-foot limit. The implementation and fixtures were corrected before the measured validation runs.

The exact final inline JavaScript passes `node --check`. The complete deterministic core harness was then executed in **three fresh headless Chromium processes** against the exact final self-contained document:

```text
Build: 0.4.106
Tests: 714 / 714 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Next small checkpoint

Proceed to **v0.4.107 — Shapechange exceptional-form bridge**. Keep that checkpoint limited to a small representative set of source-defined exceptional monster attacks/defenses/vulnerabilities and the shared transformation profile; do not fold the rest of the high-magic backlog into the same pass.

## v0.4.105 — Remaining-work rebaseline audit

This checkpoint deliberately changes **no game mechanics**. It re-reads the accumulated audit through v0.4.104 and replaces the now-stale historical completion sequence with a current, bounded roadmap. Earlier `Next` sections remain below as historical records of what was open at those versions; **this v0.4.105 section supersedes them for current planning**.

The central finding is that the project is much closer to BECM mechanical closure than the older completion gate implies. The ordinary mortal spell-list pass is already closed: every printed Mentzer Magic-User spell level 1–9 and Cleric spell level 1–7 has a registered source-bounded RAW procedure, and the later v0.4.61–v0.4.104 work completed the targeted first-through-fifth-level **Immunity** interaction pass. Continuing with Aerial Servant, Animate Objects, and the rest of the sixth-/seventh-level Cleric lists one spell at a time would therefore duplicate completed registry/procedure work rather than advance the true completion gates.

Likewise, the Master Artifact tables are no longer a large missing subsystem. Table 2 is complete at bounded registry level, Table 3A/3B/3C are complete, all sixteen published Known Artifacts are represented, their principal deterministic source-event procedures are live, and v0.4.39–v0.4.40 closed the principal named integration edges. Remaining artifact work is now a narrow cross-system layer rather than another artifact catalog pass.

### What is already substantially closed

The rebaseline treats the following as **not requiring another sequential audit pass** unless a later integration test exposes a defect:

- ordinary Magic-User spell levels 1–9 and Cleric spell levels 1–7;
- the explicit first-through-fifth-level Immunity review completed through v0.4.104;
- core Basic/Expert exploration, wilderness travel, weather, provisions, evasion/pursuit, ordinary combat, saving throws, spell preparation, advancement, retainers, water travel, and dungeon stocking;
- Fighter Combat Options, the central unarmed-combat procedures, and the main Weapon Mastery chassis;
- Dominion economy, War Machine, and the implemented Siege Machine bridge;
- the 600-authority / 607-runtime creature data layer and ordinary creature combat;
- Master Artifact Table 2 and Table 3 registries, artifact lifecycle/self-defense, all sixteen Known Artifact records, and their principal deterministic source-event procedures.

These systems can still receive bug fixes or cross-system hooks. They are no longer broad missing catalogs.

### Current BECM completion gates

The remaining work is concentrated in the following domains.

| Priority | Domain | Current state | Actual remaining work |
|---:|---|---|---|
| 1 | High-magic cross-system integration | **PARTIAL / narrow** | Finish residual Prismatic Wall routing for unusual detection/gaze/matter/general-magic producers and nonstandard gaze-posture cases; finish source-defined empty-point/geometry paths where the engine still requires a creature anchor; extend Shapechange into deterministic exceptional monster abilities and form-specific vulnerabilities; add the remaining useful native Contingency triggers and verify all deferred Timestop releases use the common timing layer. |
| 2 | Master Anti-Magic / Dispel | **PARTIAL / implemented core** | Normalize remaining bespoke spell/item states through the common magic layer, finish cone/irregular field and unusual-area clipping, and close the remaining artifact/permanent-item interactions. Fire Ball, Lightning Bolt, spherical/ray A-M, ordinary Dispel, Touch Dispel, Staff of Dispelling, and Ring of Spell Storing are already live. |
| 3 | Master Weapon Mastery edges | **PARTIAL / mature** | Implement the full poison acquisition/application workflow; finish physical ownership, cutting, recovery, and repair bookkeeping for nets/bolas and related binding weapons; close magical binding-weapon/shield interactions and any source-specific special-effect leftovers. Core mastery progression, training, H/M, shields, bastard-sword modes, Ignite, polearms, rare throwing, Despair, monster mastery, and principal special rows are already represented. |
| 4 | Companion/Master planar procedures | **PARTIAL / implemented core** | Complete Astral orientation/rotation learning and navigation/lost procedures; resolve protection-aware elemental transformation using represented magic; add planar encounter generation; model source-defined Outer-Plane local laws where the campaign supplies them; finish remaining plane-specific spell alterations. |
| 5 | Residual artifact integration | **PARTIAL / narrow** | Finish the Comb of the Korrigans' final safe class-conversion transaction and any remaining uncommon object/container/geometry producers that can be deterministic. Campaign-authored legendary destruction methods and narrative Immortal responses remain referee-authored because the source itself does not supply a universal procedure. |
| 6 | Mortal class endgames | **PARTIAL** | Complete the remaining high-level class choices, titles, obligations, political/stronghold branches, and other mortal endgame benefits. Immortal-set play remains explicitly out of scope. |
| 7 | Exceptional monster procedures | **PARTIAL automation** | Continue converting deterministic unusual monster text into dedicated handlers. All 607 profiles are spawnable and ordinary combat-ready; the gap is exceptional powers, not creature identity/stat data. |
| 8 | Treasure and Known World encounter deployment | **PARTIAL** | Finish exact magical-item selection/special treasure routing where deterministic, universal lair-treasure attachment, and regional/terrain/climate/rarity deployment of the complete creature catalog across the Known World. |

### Timeout-resistant checkpoint plan

The next work should remain in small, independently validated checkpoints. A practical sequence is:

1. **v0.4.106 — Prismatic / point-target geometry cleanup**: one tightly bounded set of remaining Prismatic producers plus empty-point targeting needed by the same geometry layer.
2. **v0.4.107 — Shapechange exceptional-form bridge**: route a small representative set of deterministic special attacks/defenses/vulnerabilities through the common transformation profile, then generalize only what the source data actually supports.
3. **v0.4.108 — Contingency / Timestop timing closure**: add a small set of native trigger events and verify the deferred-spell queue against them.
4. **v0.4.109 — Anti-Magic normalization**: one bounded class of bespoke spell/item states through the shared A-M/Dispel layer.
5. **v0.4.110 — Anti-Magic unusual geometry**: cone/irregular-area clipping and one explicit artifact/permanent-item interaction set.
6. **v0.4.111 — Weapon Mastery poison logistics** only.
7. **v0.4.112 — Net/bola/binding ownership and repair** only, including magical edge cases that use the same physical-state model.
8. **v0.4.113 — Astral navigation/orientation** only.
9. **v0.4.114 — Elemental transformation + planar encounter hook** only; keep Outer-Plane campaign law separate where it requires authored plane data.
10. **v0.4.115 — Residual artifact integration**: Korrigans final conversion plus one small group of deterministic object/geometry edges.
11. **v0.4.116 onward — Mortal class endgames**, split by class/family rather than one giant pass.
12. **Then exceptional-monster handler batches**, grouped by shared mechanic (gaze, poison/energy drain, swallow/grab, unusual movement, spell-like powers) rather than by alphabetical creature order.
13. **Then treasure + regional encounter deployment**, followed by one final full BECM compliance audit.

The exact version count after v0.4.115 is intentionally not fixed. The monster-handler and class-endgame passes may require several small checkpoints each. The realistic remaining scale is still approximately **10–20 meaningful implementation checkpoints plus a final closure audit**, not another long spell-by-spell sequence.

### Rebased completion rule

The engine should be labeled **full mortal Mentzer BECM** only when the eight domains above are either mechanically closed or reduced to explicit referee decisions that the printed rules themselves leave open. A historical `PARTIAL` label below this section does not by itself reopen a completed subsystem; the rebaseline distinguishes **missing rules** from **bounded referee judgment**, **cross-system integration**, and **optional Known World extensions**.

The project continues to preserve the optional 3D positional layer, phase-based initiative, FlexAI guidance, and Arms Across Eras matrix. Those extensions are not BECM completion blockers so long as the RAW procedures remain selectable and intact.

### Validation

Because this is an audit/replanning checkpoint, no engine behavior was intentionally changed. `APP_VERSION` advances to **0.4.105** so the checkpoint can be identified independently; the deterministic suite remains **712 tests**. The exact final document passes extracted inline JavaScript syntax validation with `node --check`. The complete core harness was then executed in **three fresh Chromium contexts** against the exact v0.4.105 HTML through direct page-content loading:

```text
Build: 0.4.105
Tests: 712 / 712 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Next small checkpoint

Begin with **Prismatic / point-target geometry cleanup only**. Do not reopen the sixth-level Cleric spell list as a sequential implementation pass.

## v0.4.104 — Fifth-level Cleric closure audit

This deliberately narrow checkpoint performs the promised **closure audit of all eight fifth-level Cleric spells and their reversals** and does **not** begin sixth-level spell implementation. The primary Mentzer list is Commune, Create Food, Cure Critical Wounds*, Dispel Evil, Insect Plague, Quest*, Raise Dead*, and Truesight. The governing Master-level **Immunity** rule remains unchanged: fifth-level effects operate at one-half normal on a protected recipient, or one-quarter normal after a successful saving throw when a measurable residual effect remains; quantifiable effects are reduced and fractions are rounded in the recipient's favor.

The audit confirmed that the v0.4.97–v0.4.103 recipient/world-effect classifications are internally consistent and source-bounded. Two concrete RAW gaps were found in the underlying ordinary spell handlers and corrected here.

### Create Food now honors the cleric's choice to create less than the maximum

The spell creates enough food for **12 men and their mounts for one day**, plus another twelve for every caster level above 8th, but the consolidated source explicitly says the cleric **does not have to create the maximum amount**. The previous handler always created the maximum level-based quantity.

v0.4.104 now accepts a represented lesser `peopleAndMounts` / `personDays` / `amount` request and clamps it to the legal level-based maximum. If no lesser amount is specified, the existing maximum-quantity behavior remains the default. The created food still expires after 24 hours under the existing consolidated logistics rule, and caster Immunity still does not reduce the food because the provisions are an external-world creation rather than a personal spell effect.

### Cure Critical Wounds now heals any represented living creature

The printed target is **any one living creature**. The prior handler correctly allowed Cause Critical Wounds to damage a represented living monster but artificially restricted the healing form to player characters. That restriction was an engine limitation, not a source rule.

v0.4.104 removes that restriction. A represented living monster or NPC can now receive the same **3d6+3** Cure Critical Wounds healing as a living player character, subject to its represented maximum hit points, Cause Disease healing block, range, and recipient-side fifth-level Immunity scaling. Dead and undead recipients remain ineligible for the cure form.

### Fifth-level Cleric closure status

The complete fifth-level Cleric list is now closed at the current RAW STRICT standard:

- **Commune** — recipient-side question allowance and finite duration are quantifiably reduced by Immunity; supernatural answers remain referee-supplied.
- **Create Food** — external creation, full level-based maximum unless the cleric elects a lesser legal amount; caster Immunity does not shrink the created provisions.
- **Cure / Cause Critical Wounds** — one living creature, 3d6+3 healing/damage, no save for Cause, hostile touch attack where required; recipient Immunity scales the packet.
- **Dispel Evil** — creature-side save penalty, saved-flight duration, and binary destruction/banishment are separated from charm/curse removal.
- **Insect Plague** — full external swarm state, with the no-save sub-3-HD drive-off resolved recipient by recipient.
- **Quest / Remove Quest** — source-defined save/chance procedures are preserved; indefinite compulsion/removal remain explicit binary half-effect boundaries when Immunity supplies no meaningful partial state.
- **Raise Dead / Finger of Death** — resurrection/death/destruction boundaries are separated from quantifiable greater-undead damage and undead healing.
- **Truesight** — self-recipient duration and 120-foot revelation reach are quantifiably reduced; truth categories remain intact within the resulting envelope.

No sixth-level spell behavior was changed in this checkpoint.

### Validation

Two closure regressions raise the deterministic suite from **710 to 712 tests**. They verify that Create Food can intentionally create a lesser legal quantity without exceeding the level-based maximum, and that Cure Critical Wounds heals a represented living monster instead of incorrectly rejecting all non-PC recipients.

The exact final `index_v0.4.104.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic core harness was then executed in **three fresh Chromium contexts** against the exact final self-contained document content:

```text
Build: 0.4.104
Tests: 712 / 712 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Next small checkpoint

The fifth-level Cleric closure is complete. Continue the broader BECM RAW spell audit with **Aerial Servant only**, the first sixth-level Cleric spell, without bundling Animate Objects or any other sixth-level entry into the same checkpoint.

## v0.4.103 — Fifth-level Cleric Immunity, small checkpoint 7: Truesight

This deliberately narrow checkpoint reviews **Truesight only**. The printed fifth-level Cleric spell is self-only (**Range 0**), lasts **1 turn + 1 round per caster level**, and lets the cleric perceive all represented things within **120 feet**: hidden, invisible, and ethereal objects/creatures; secret doors; creatures or things not in their true form; alignment; and experience/power. The engine continues to honor its existing representation boundary: Truesight reveals facts already present in campaign state and does not manufacture secret doors, hidden creatures, or other unknown world content.

### Immunity now halves the measurable self-recipient effect

Truesight is a direct fifth-level spell received by the cleric. Its truth categories are binary descriptions of what the spell can reveal, but two parts of the effect are directly measurable: **duration** and the **120-foot revelation reach**. Under active Immunity, v0.4.103 therefore reduces both to **one-half normal**, rounding in the protected recipient's favor.

For example, a 10th-level cleric normally receives **70 rounds** of Truesight (one 10-minute turn plus ten 10-second rounds) with **120-foot** reach. With Immunity active, the represented effect is **35 rounds** with **60-foot** reach. The spell still reveals the same kinds of truth inside that reduced envelope; the engine does not invent a nonsensical partial state such as a creature being “half invisible” or only partly in its true form.

A party-controlled cleric may deliberately suppress Immunity for the casting. In that case, the full printed duration and 120-foot revelation distance are restored, while the ongoing Immunity spell resumes afterward under the existing suppression procedure.

### Live invisible-target perception now honors Truesight's represented reach

The ordinary unseen-target predicate previously treated any active Truesight spell as sufficient to perceive an invisible represented target, regardless of target distance. v0.4.103 routes the raw Truesight contribution through a target-aware range check. A target outside the active Truesight effect's current `rangeFeet` no longer becomes visible merely because the spell is running. Existing represented Prismatic green/violet detection blocking remains in force.

This is important for the Immunity interaction: a protected Truesight with 60-foot reach cannot expose an invisible opponent 80 feet away, while the same opponent becomes perceptible after moving inside 60 feet or after the cleric voluntarily lowers Immunity and casts the full 120-foot version.

### Validation

One new deterministic regression group raises the suite from **709 to 710 tests**. It verifies the level-10 **70 → 35 round** duration reduction, **120 → 60 foot** revelation reduction, actual invisible-target range enforcement, and voluntary Immunity suppression restoring the full spell without removing the continuing ward.

The exact final `index_v0.4.103.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic core harness was then executed in **three fresh Chromium pages** against the exact final document content:

```text
Build: 0.4.103
Tests: 710 / 710 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Next small checkpoint

The individual fifth-level Cleric Immunity implementations are now complete. The next deliberately small pass should be a **fifth-level Cleric closure audit only**: re-check all eight fifth-level entries and their reversals against the source and current regression coverage, correct only any discrepancy found, and do **not** begin sixth-level spells in the same checkpoint.

## v0.4.102 — Fifth-level Cleric Immunity, small checkpoint 6: Raise Dead / Finger of Death

This deliberately narrow checkpoint reviews **Raise Dead** and its reverse, **Finger of Death**, only. Mentzer gives Raise Dead a **120-foot range** and a permanent result on the body of one human or demihuman: an eligible recent corpse returns with **1 hit point** and then suffers **two full weeks of complete-bed-rest restrictions**. The same spell may instead be cast on one undead creature. Ordinary undead are slain on a failed Spell save made at **-2**; a vampire that fails is forced back to its coffin in gaseous form. The Companion addition gives undead more powerful than a vampire a **3d10 damage** branch with a Spell save for half damage. Finger of Death has **60-foot range**, kills one living creature on a failed Death Ray save, is restricted for Lawful clerics to life-or-death situations, and the Companion addition causes it to **cure 3d10 damage** on undead of 10 or more Hit Dice instead of harming them.

### A still-protected corpse now keeps Raise Dead at the binary return-to-life boundary

The primary result of Raise Dead on a dead human or demihuman is binary: the recipient is either dead or alive. Mentzer supplies no half-alive state. When the engine still has an operational fifth-level **Immunity** effect on the corpse, v0.4.102 therefore records an explicit RAW STRICT half-effect boundary and leaves the body dead rather than silently applying the complete resurrection.

This interaction deliberately does **not** use the normal `dropImmunityFor` convenience. Immunity's own rule requires the recipient to lower the ward by concentrating; a dead recipient cannot perform that action. The source does not separately state that death automatically terminates Immunity, so the engine does not invent that termination rule. If the ward is still represented as active, it must expire or be removed by another valid procedure before Raise Dead can resolve normally. If no active Immunity remains, the existing full Raise Dead procedure is unchanged: the recipient returns at 1 hp and receives the fourteen-day recovery state.

### Raise Dead versus undead now separates binary destruction from quantifiable damage

For the ordinary undead branch, active fifth-level Immunity reduces the printed **-2 Spell-save penalty to -1**. A successful save still avoids the destructive result normally. A failed save would ordinarily destroy the undead, or force a vampire into gaseous retreat to its coffin; both are all-or-nothing outcomes, so protected failed-save targets now remain at an explicit binary half-effect boundary rather than being fully destroyed or fully forced away.

The greater-undead branch is numerical and therefore scales cleanly. Raise Dead still rolls its printed **3d10** packet and the undead still makes its normal Spell save. Under Immunity, a failed-save recipient takes **one-half of the full 3d10 roll**; a successful-save recipient takes **one-quarter of the full roll**. Damage is rounded down in the protected recipient's favor, and the packet is marked as already Immunity-resolved so the common damage pipeline cannot reduce it a second time.

### Finger of Death now resolves living death and 10+ HD undead healing separately

A living creature still makes the ordinary Saving Throw vs. Death Ray. Success means no lethal effect, exactly as before. On a failed save, active Immunity now leaves the binary death result at a RAW STRICT half-effect boundary instead of silently killing the protected recipient. A living party-controlled recipient may voluntarily lower Immunity before the casting; if that recipient then fails the Death Ray save, the normal full death result resolves and the ongoing Immunity spell remains otherwise intact.

Against **10+ HD undead**, Finger of Death's Companion addition is a quantifiable beneficial spell effect: it cures **3d10** hit points. Active Immunity now reduces that healing to **one-half**, rounded up in the protected recipient's favor. This branch does not use the living-creature death save because the source explicitly substitutes healing for the death-ray effect on qualifying undead.

The pre-existing Lawful-cleric restriction remains unchanged: Finger of Death still requires a represented life-or-death situation for a Lawful caster.

### Validation

Three focused regression groups raise the deterministic suite from **706 to 709 tests**. They verify: (1) a dead human/demihuman with still-active Immunity stays dead at the binary Raise Dead boundary and cannot use named voluntary suppression while dead; (2) protected greater undead receive the correct one-half damage packet while lesser undead use the Immunity-reduced -1 save penalty and binary destruction boundary; and (3) Finger of Death keeps failed-save living death binary, restores the ordinary death result after valid living-recipient suppression, and halves its 3d10 healing on protected 10+ HD undead.

The exact final inline JavaScript passes `node --check`. The complete deterministic core harness was then executed in **three fresh Chromium contexts** against the exact final self-contained document:

```text
Build: 0.4.102
Tests: 709 / 709 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Next small checkpoint

Continue with **Truesight only**. That final fifth-level Cleric checkpoint should review its self-only information effect under Immunity without bundling any sixth-level spell work into the same pass.

## v0.4.101 — Fifth-level Cleric Immunity, small checkpoint 5: Quest / Remove Quest

This deliberately narrow checkpoint reviews **Quest** and its reverse, **Remove Quest**, only. Mentzer gives Quest **Range 30 feet**, **Duration: Special**, and an effect that compels **one living creature** to perform a caster-stated task. The victim may save vs. Spells to avoid the spell. Impossible or suicidal tasks have no effect; completing the task ends the spell; refusing to continue brings a referee-chosen curse that may be up to double normal strength. Remove Quest can dispel an unwanted quest or a quest-related curse. Its base success chance is **50%**, reduced by **5% for every caster level the removing cleric is below the original Quest caster**.

### Quest now treats failed-save Immunity as a binary half-effect boundary

Quest has no finite duration, numerical penalty, movement distance, or other source-defined magnitude that can sensibly represent one-half of the compulsion. A successful saving throw still avoids the spell completely; the engine does not invent a quarter-strength Quest after a save that normally negates it.

When the victim **fails** the normal Quest save while fifth-level Immunity remains active, v0.4.101 therefore records an explicit **RAW STRICT binary half-effect boundary** and does not silently impose the full indefinite compulsion. The caster-authored task is preserved in the boundary record so the referee can see exactly what the full spell would have required.

A party-controlled recipient may be named in `dropImmunityFor`. In that case the ward is voluntarily suppressed for the casting and the normal full Quest takes hold. The Quest record is marked as already Immunity-resolved so generic active-effect scaling cannot later reinterpret the indefinite compulsion. The underlying Immunity spell remains in place and resumes normally.

### Remove Quest keeps the printed success chance before resolving Immunity

Remove Quest's **50% base chance**, including the printed **-5% per level** when the removing cleric is below the original caster, is a source-defined resolution procedure rather than a spell-effect magnitude. v0.4.101 therefore does not halve that percentage merely because the recipient has Immunity.

If the Remove Quest roll fails, nothing is removed as usual. If the roll succeeds while fifth-level Immunity remains active on the recipient, the resulting removal is still an all-or-nothing outcome: the Quest is either present or gone. Because the source gives no half-removed Quest state, RAW STRICT leaves the existing Quest in place and records a binary half-effect boundary. Named voluntary suppression allows the successful source roll to remove the Quest normally.

The existing support for a represented **quest-related refusal curse** is also preserved: if such a state is explicitly present, Remove Quest may target it using the same printed success procedure rather than requiring an active Quest object.

### Validation

Two focused regression groups raise the deterministic suite from **704 to 706 tests**. The first verifies that a failed-save Quest does not impose its full indefinite compulsion through active Immunity, while named voluntary suppression restores the ordinary Quest and preserves the ongoing ward. The second verifies that Remove Quest retains the printed **50%-5%/level** success calculation, leaves a successful binary removal at the Immunity boundary, and removes the Quest normally once the recipient lowers Immunity.

The exact final inline JavaScript passes `node --check`. The complete deterministic core harness was then executed in **three fresh Chromium contexts** against the exact final self-contained document:

```text
Build: 0.4.101
Tests: 706 / 706 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Next small checkpoint

Continue with **Raise Dead / Finger of Death only**. Keep Truesight for the following checkpoint.

## v0.4.100 — Fifth-level Cleric Immunity, small checkpoint 4: Insect Plague

This deliberately narrow checkpoint reviews **Insect Plague only**. Mentzer gives the spell **Range 480 feet**, **Duration 1 day**, and a **30-foot-radius** summoned swarm. The swarm obscures vision, drives off creatures of **less than 3 Hit Dice with no saving throw**, and may move up to **20 feet per round** while the cleric directs it. Control requires the cleric to concentrate without moving; if the caster is disturbed, the insects scatter and the spell ends. The spell works only outdoors and above ground.

### The swarm remains a full external world effect

The summoned insects and their geometry exist in the represented world rather than being a personal spell state placed on the cleric. v0.4.100 therefore marks the swarm record as externally anchored for Immunity purposes. Personal Immunity on the caster does **not** halve the one-day lifetime, 30-foot radius, 480-foot operating range, 20-foot-per-round movement, visual obscuration, or concentration requirement, and an unnecessary generic request to lower the caster's ward is ignored.

This follows the same external-world split already used for Cloudkill, walls, created provisions, and terrain magic: the persistent world object remains complete, while each creature-side consequence is evaluated separately.

### The no-save drive-off result is resolved per recipient

A creature below 3 Hit Dice inside the represented swarm is the recipient of the spell's forced **drive-off** consequence. Because Insect Plague is fifth level, ordinary Immunity reduces that recipient-side effect to one-half normal. Unlike damage, duration, a bonus, or a penalty, however, the printed result is binary: the creature is driven off or it is not. The source gives no distance, duration, morale modifier, movement fraction, or other measurable quantity from which a half-strength drive-off can be derived.

v0.4.100 therefore treats an Immunity-protected sub-3-HD creature as an explicit **RAW STRICT binary half-effect boundary** instead of silently imposing the full no-save flight. The target is not marked as driven off merely because it occupies the swarm. The swarm itself remains fully present and continues to obscure vision around that creature.

There is no successful-save quarter-effect branch for this interaction because Insect Plague explicitly gives creatures below 3 Hit Dice **no saving throw** against being driven off.

### Voluntary suppression restores the ordinary no-save outcome

A party-controlled recipient named in `dropImmunityFor` may deliberately suppress Immunity for that round. If the creature is below 3 Hit Dice and within the swarm, the full printed drive-off result then applies with no saving throw. The underlying Immunity spell is suspended rather than removed and resumes according to its normal end-of-round rule.

The combat-round consumer now performs the same recipient-local check on later exposures, so a protected creature entering or remaining in a moving swarm does not bypass this rule after the initial casting round. Boundary state is also cleared when the Insect Plague effect itself ends.

### Validation

Two focused regression groups raise the deterministic suite from **702 to 704 tests**. The first confirms that a protected sub-3-HD creature remains at the binary drive-off boundary while the external swarm retains its full radius, range, one-day duration, movement, and visual-obscuration state under personal Immunity. It also verifies that caster-side Immunity is not unnecessarily lowered. The second confirms that named voluntary suppression for a party-controlled low-HD recipient restores the ordinary no-save drive-off while preserving the ongoing Immunity spell.

The exact final inline JavaScript passes `node --check`. The complete deterministic core harness was then executed in **three fresh Chromium contexts** against the exact final self-contained document using direct page-content loading:

```text
Build: 0.4.100
Tests: 704 / 704 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Next small checkpoint

Continue with **Quest / Remove Quest only**. Keep that pass separate from Raise Dead / Finger of Death and Truesight.

## v0.4.99 — Fifth-level Cleric Immunity, small checkpoint 3: Dispel Evil

This deliberately narrow checkpoint reviews **Dispel Evil only**. Mentzer gives the spell **Range 30 feet**, **Duration 1 turn**, and three distinct uses: it may affect undead and enchanted monsters within range; it may remove the curse from one cursed item; or it may remove a magical charm. Against creatures, each victim saves vs. Spells; when only one creature is targeted, that save carries a **-2 penalty**. A failed save destroys an undead/enchanted monster, or banishes a creature from another plane. A successful save still forces the victim to flee and remain away while the caster concentrates without moving.

### Creature-side Dispel Evil now receives recipient-local Immunity scaling

Against an undead, summoned, controlled, animated, or other-planar creature, Dispel Evil is a direct fifth-level spell effect on that recipient. v0.4.99 therefore applies the existing Master-level **Immunity** rule before and after the source-defined saving throw.

The printed **-2 single-target saving-throw penalty** is itself a quantifiable penalty. Active Immunity reduces that fifth-level penalty to **-1**, rounding toward the protected recipient's favor. If the saving throw then succeeds, Immunity's successful-save rule reduces the remaining fifth-level effect to **one-quarter normal**. The spell can otherwise require flight for up to one turn while concentration continues, so the engine records a protected successful-save victim as required to flee for at most **2 minutes**: one quarter of the 10-minute turn, rounded down in the recipient's favor. The caster's ordinary concentration requirement remains intact.

A failed-save destruction or planar banishment is different. Those outcomes are binary; Mentzer supplies no half-destroyed or half-banished state. If active Immunity reduces that failed-save fifth-level effect to one-half normal, RAW STRICT now leaves the creature alive/present and records an explicit **binary half-effect referee boundary** instead of silently imposing the full destruction or banishment. The ongoing Immunity spell itself remains intact.

### Curse and charm removal remain effect-targeted rather than creature-targeted

Dispel Evil's cursed-item mode targets the **item's curse**, not the protected creature carrying it. Its charm-removal mode likewise removes the **existing magical charm influence**. v0.4.99 therefore keeps those branches in the same effect-targeting category as the project's earlier Dispel Magic treatment: personal Immunity on the caster or charmed creature does not shelter the separate curse/charm effect and does not require the ward to be lowered.

### Validation

Two focused regression groups raise the deterministic suite from **700 to 702 tests**. The first uses a deterministic single-target save whose result differs between a -2 and -1 modifier, confirming that Immunity halves Dispel Evil's printed penalty and then quarters the successful-save flight duration. The second verifies that a protected failed-save undead is not silently destroyed by a half-strength fifth-level effect and that magical charm removal still operates through personal Immunity because the charm itself is the spell target.

The exact final inline JavaScript passes `node --check`. The complete deterministic core harness was then executed in **three fresh Chromium contexts** against the exact final self-contained document using direct page-content loading:

```text
Build: 0.4.99
Tests: 702 / 702 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Next small checkpoint

Continue with **Insect Plague only**. That pass should keep the external swarm geometry and movement separate from creature-side Immunity, then review the no-save forced-flight effect on creatures below 3 HD without combining the work with Quest, Raise Dead, or Truesight.

## v0.4.98 — Fifth-level Cleric Immunity, small checkpoint 2: Cure / Cause Critical Wounds

This deliberately narrow checkpoint reviews only **Cure Critical Wounds** and its reverse, **Cause Critical Wounds**. The printed fifth-level clerical spell is **Range: Touch**, **Duration: Permanent**, affects **one living creature**, and uses a **3d6+3 (6–21)** hit-point packet. The reversed form inflicts the same amount of damage, allows **no saving throw**, and requires the caster to make the normal attack roll to deliver the hostile touch.

### Cure Critical Wounds now uses the same recipient-local Immunity procedure as the fourth-level cure

The healing packet is directly quantifiable. A recipient protected by **Immunity** therefore receives **one-half of the rolled 3d6+3 healing**, rounded upward when necessary because values are rounded in the protected recipient's favor. The implementation now uses the recipient-local suppression helper introduced for area and multi-recipient spell work, so a party-controlled recipient can be named in `dropImmunityFor` and receive the full healing without deleting the ongoing Immunity spell.

This also closes an older targeting gap. The handler now enforces the spell's printed **living creature** requirement before applying either form. The automated healing path remains bounded to represented player characters; healing an NPC/monster continues to require referee mediation rather than silently inventing recovery state for creatures whose full healing model is not represented.

### Cause Critical Wounds now resolves Immunity once, before the common damage pipeline

The reversed spell's 3d6+3 damage is likewise a measurable fifth-level spell effect. Under active Immunity, the engine halves the rolled damage and rounds downward in the victim's favor. A named party-controlled recipient may voluntarily suppress Immunity for that casting, restoring the full damage packet while the ward resumes afterward.

Previously, Cause Critical Wounds relied on the generic damage pipeline to notice fifth-level spell damage. That produced the right ordinary half-damage result, but it did not provide the same recipient-local voluntary-suppression path as newer spell handlers. v0.4.98 now resolves the recipient's Immunity explicitly before damage is applied and marks the packet `rawImmunityResolved`, preventing the common damage pipeline from reducing it a second time.

The normal hostile touch attack remains required in represented combat, and no saving throw is introduced.

### Validation

Two focused regression groups raise the deterministic suite from **698 to 700 tests**. The first verifies half-strength Cure and Cause Critical Wounds, recipient-favorable rounding, named voluntary suppression for both forms, and persistence of the ongoing Immunity spell. The second verifies that neither form affects an undead/nonliving target.

The exact final inline JavaScript passes `node --check`. The complete deterministic core harness was then executed in **three fresh Chromium contexts** against the exact final self-contained document using direct page-content loading:

```text
Build: 0.4.98
Tests: 700 / 700 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Next small checkpoint

Continue with **Dispel Evil only**. That pass should review its creature-destruction/banishment/flee procedure, the single-target -2 saving-throw modifier, curse/charm removal branches, and how fifth-level recipient Immunity interacts with those binary outcomes without combining the work with Insect Plague or later fifth-level Cleric spells.

## v0.4.97 — Fifth-level Cleric Immunity, small checkpoint 1: Commune and Create Food

This deliberately small checkpoint begins the fifth-level Cleric **Immunity** review with only **Commune** and **Create Food**, following the new timeout-resistant implementation policy. Mentzer remains primary. His Expert/Companion clerical text gives Commune a **3-turn duration** and **3 yes/no questions**, limits ordinary use to **once per week**, and permits **twice the normal number of questions once per year**. Create Food produces enough food for **12 people and their mounts for one day**, plus another twelve for every cleric level above 8th. The Rules Cyclopedia's compatible clarification that created food spoils after 24 hours remains in the existing provision record.

### Commune now halves its measurable recipient-side effect

Commune is range 0 and acts through the cleric, so the cleric is the represented recipient of this fifth-level spell. Its question allowance and duration are both explicit numerical benefits. Under active **Immunity**, the engine now applies the published one-half effect to both values, rounding in the protected recipient's favor: an ordinary Commune becomes **2 yes/no questions over 15 minutes** instead of 3 questions over 3 turns. The once-per-week restriction is a casting-frequency limit rather than recipient-side spell magnitude and is not halved. Likewise, the once-yearly doubled use still exists; Immunity scales the resulting question allowance rather than changing how often that privilege is available.

A cleric may voluntarily suppress Immunity for the casting. When `dropImmunity` is used, Commune returns to the full **3 questions / 3 turns** without deleting the ongoing Immunity spell. The actual answers remain a referee/greater-power boundary exactly as before; the engine never invents divine answers.

### Create Food remains a full external creation

Create Food produces provisions in the world; it does not bestow a personal fifth-level condition on the cleric. It is therefore now explicitly classified with the engine's wholly external world spells. Personal Immunity on the caster does not halve the created quantity and does not need to be lowered.

At 10th level the existing formula still creates provisions for **36 people and 36 mounts for one day**. The created-food record remains available to the ordinary ration pipeline and retains its existing **24-hour spoil time**. v0.4.97 adds explicit external-world Immunity metadata so later generalized scaling cannot reinterpret those provisions as a personal spell effect.

### Validation

Two focused regression groups raise the deterministic suite from **696 to 698 tests**. One verifies Commune's 3-to-2 question reduction, 30-to-15-minute duration reduction, and voluntary suppression path. The other verifies that a protected level-10 cleric still creates the full 36-person/36-mount food allotment and that an unnecessary `dropImmunity` request does not lower the caster's ward.

The exact final inline JavaScript passes `node --check`. The complete deterministic core harness was then executed in **three fresh Chromium contexts** against the exact final self-contained document:

```text
Build: 0.4.97
Tests: 698 / 698 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Next small checkpoint

Continue with **Cure Critical Wounds / Cause Critical Wounds only**. That pass should verify the fifth-level **3d6+3** healing/damage packet against recipient Immunity, voluntary suppression, rounding in the protected recipient's favor, and protection against double application in the common damage pipeline. Do not combine it with Dispel Evil or later fifth-level Cleric spells in the same implementation pass.

## v0.4.96 — Fourth-level Cleric Immunity closure: external creations, serious wounds, poison, and plant speech

This bounded checkpoint completes the remaining **fourth-level Cleric recipient-side Immunity review** while preserving the already-reviewed Dispel Magic and Protection from Evil 10' Radius behavior. The governing Master rule remains the same: fourth- and fifth-level spells have **one-half normal effect** on a protected recipient, with source-defined quantifiable values reduced and rounded in the recipient's favor. Where a spell instead creates or transforms something external in the world, personal Immunity on the caster is not treated as the recipient. Where the printed creature-side outcome is genuinely binary and supplies no measurable half-state, RAW STRICT records that boundary rather than inventing a new rule.

### Animate Dead, Create Water, and Sticks to Snakes remain full external world effects

The Cleric version of **Animate Dead** is now explicitly covered by the same external-corpse-animation classification already used for the Magic-User version. The spell acts on represented remains, not on the protected cleric, so caster-side Immunity does not reduce the available Hit Dice, alter skeleton/zombie statistics, or require the caster to lower the ward.

**Create Water** creates a magical spring in the world for **6 turns**. At 8th level it supplies enough water for 12 people and their mounts for a day, with another twelve supported for each cleric level above 8th. v0.4.96 marks the spring as an external creation so personal Immunity cannot halve its one-hour lifetime or created-water capacity merely because the cleric is protected.

**Sticks to Snakes** transforms **2d8 sticks** into snakes for **6 turns**, with each snake independently having a 50% chance to be poisonous. The sticks/snakes are the spell targets. Personal Immunity on the cleric therefore does not halve the number created or their lifetime, and an unnecessary request to lower the caster's ward is ignored rather than suspending protection.

### Cure / Cause Serious Wounds uses the explicit 2d6+2 packet

**Cure Serious Wounds** restores **2d6+2 hit points** to one living creature. Because that healing packet is directly quantifiable, ordinary Immunity reduces the rolled amount to one-half, rounding upward when necessary because the protected recipient benefits from the healing. The reversed **Cause Serious Wounds** is likewise a fourth-level quantifiable spell effect; its 2d6+2 damage is halved and rounded downward in the protected victim's favor.

This pass also fixes the recipient-suppression path for the Cure/ Cause pair. A party-controlled recipient named in `dropImmunityFor` may now deliberately lower Immunity for that casting and receive the full spell packet without removing the ongoing ward. The reversed damage packet is marked as already Immunity-resolved before it enters the common damage pipeline, preventing accidental double reduction.

### Neutralize Poison / Create Poison stays binary on creatures but external on objects

**Neutralize Poison** makes all poison currently present in a creature, container, or object harmless, and can revive a poison-killed victim if cast within the printed ten-round window. On a creature, that result is fundamentally binary: the source does not define a creature as "half neutralized" or "half revived." A protected creature that keeps fourth-level Immunity active therefore retains the represented poison at an explicit RAW STRICT half-effect boundary. If the recipient deliberately lowers Immunity, the ordinary full neutralization/revival procedure resolves.

The reverse **Create Poison** is handled symmetrically. A successful Poison save still negates the creature-side effect normally. On a failed save, active Immunity prevents the engine from inventing or imposing a full instant-death result from a half-strength spell; the victim remains alive at an explicit binary referee boundary. Voluntary suppression restores the ordinary failed-save death result. Poison placed on a represented container is an external object effect and remains full-strength because the container—not the cleric—is the spell target.

### Speak with Plants now scales both of its measurable self-recipient values

**Speak with Plants** is a range-0 spell on the cleric, normally lasting **3 turns** and allowing communication with plants within **30 feet**. Both the duration and communication radius are explicit quantifiable parts of the spell's effect. Under active Immunity, v0.4.96 therefore reduces the spell to **15 minutes** and a **15-foot** communication radius. Deliberately lowering Immunity for the casting restores the full 3-turn / 30-foot effect.

The open-ended content of plant replies and requested favors remains referee-authored exactly as before; the engine scales only the published measurable values and does not invent new plant knowledge or motives.

### Fourth-level Cleric Immunity sweep closed

With the existing Dispel Magic and Protection from Evil 10' Radius work preserved, all eight printed fourth-level Cleric entries now have explicit source-bounded Immunity behavior: Animate Dead, Create Water, Cure Serious Wounds / Cause Serious Wounds, Dispel Magic, Neutralize Poison / Create Poison, Protection from Evil 10' Radius, Speak with Plants, and Sticks to Snakes.

### Validation

Four new deterministic regression groups raise the suite from **692 to 696 tests**. They verify full-strength external Animate Dead/Create Water/Sticks to Snakes behavior under caster Immunity; half-strength Cure/Cause Serious Wounds plus named voluntary suppression; the Neutralize/Create Poison binary boundaries and their suppression escape path; and the halved duration/radius of Speak with Plants.

The exact final `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic core harness was then executed in **three fresh Chromium contexts** against the exact final document content using direct page-content loading:

```text
Build: 0.4.96
Tests: 696 / 696 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Next batched checkpoint

The fourth-level Cleric Immunity review is now closed. The next bounded pass should complete the **fifth-level Cleric** list as one group: **Commune, Create Food, Cure Critical Wounds / Cause Critical Wounds, Dispel Evil, Insect Plague, Quest / Remove Quest, Raise Dead / Finger of Death, and Truesight**. That batch can separate external information/provision/summoning effects from direct creature-side healing, control, death/revival, and self-recipient perception before the audit returns to any remaining non-Immunity BECM procedures.

## v0.4.95 — Fifth-level Magic-User Immunity closure: Cloudkill and Dissolve/Harden

This bounded checkpoint completes the remaining **fifth-level Magic-User recipient-side Immunity review** with the two mixed world/victim cases left by v0.4.94: **Cloudkill** and **Dissolve/Harden**. The governing Master rule is unchanged: fourth- and fifth-level spells have **one-half normal effect** on a protected recipient, or **one-quarter normal effect after a successful saving throw**, for any effect that can actually be quantified; values are rounded in the recipient's favor. The engine continues to distinguish an external magical object or terrain change from a direct effect imposed on a creature standing within it.

### Cloudkill remains a full external moving cloud while each exposed creature resolves Immunity locally

Mentzer's consolidated Cloudkill creates a **30-foot-wide, 20-foot-tall** poisonous cloud next to the caster for **6 turns**, moving **60 feet per turn / 20 feet per round**. All living creatures within it take **1 point of damage per round**, and victims below 5 Hit Dice must also save vs. Poison or be killed by the vapors.

v0.4.95 now stores the cloud itself as an explicitly external world effect. Personal Immunity does not shrink the cloud, shorten its six-turn lifetime, slow its movement, or require the caster to lower the ward merely to create it. The spell's starting geometry is also corrected to match the already-established artifact Cloudkill implementation: the center begins one cloud radius (**15 feet**) away from the caster in the chosen direction, instead of only one foot away.

The creature-side consequences are then resolved separately for every represented living creature in the cloud:

- poison immunity is checked before poison damage or a poison-death save is applied;
- the printed **1 point** of fifth-level spell damage is quantifiable, so ordinary Immunity reduces it to one-half (or one-quarter after a successful Poison save for a sub-5-HD victim) and recipient-favorable rounding reduces that packet to **0 hit points**;
- the failed-save **death** result is binary. The source supplies no half-dead state or reduced death duration, so a protected failed-save victim is left at an explicit RAW STRICT referee boundary instead of silently receiving the full death result;
- if Immunity is voluntarily suppressed for that round, the ordinary 1-point damage and failed-save death procedure resolve at full strength.

This also corrects the previous exposure order, which applied the 1-point poison packet before checking whether the subject was poison-immune.

### Dissolve and Harden keep their complete terrain transformations

**Dissolve** changes up to **3,000 square feet** of rock into a morass up to **10 feet deep/thick** for **3d6 days**. Creatures entering that represented mud are slowed to **10% of normal movement at best** and may become stuck. The reversed **Harden** changes the same volume of mud permanently into rock.

Those transformations are magic placed on the terrain rather than personal spell states bestowed on the caster or on every creature crossing the area. v0.4.95 therefore classifies Dissolve/Harden terrain state as external-world magic: caster-side Immunity does not halve the 3,000-square-foot area, 10-foot depth, 3d6-day Dissolve duration, permanent Harden result, or the physical movement consequence of traversing the created morass.

Harden has one distinct creature-side rule: a victim already in the mud may make a **Saving Throw vs. Spells to avoid being trapped** when it becomes rock. That entrapment is now resolved separately from the terrain change. A successful save avoids it normally. On a failed save, active fifth-level Immunity leaves the binary trap at the same explicit half-effect referee boundary used for other all-or-nothing fourth-/fifth-level outcomes; the engine does not invent a "half trapped" condition. A party-controlled recipient may deliberately suppress Immunity for the round, after which a failed save creates the normal persistent trapped state.

The Harden handler also now accepts an explicit represented `victimName`/`victim` separate from the terrain target, so a mud volume and the creature caught inside it no longer have to be conflated into one target string.

### Fifth-level Magic-User Immunity sweep closed

With v0.4.95, all twelve printed fifth-level Magic-User entries have now received a source-bounded Immunity classification: Animate Dead, Cloudkill, Conjure Elemental, Contact Outer Plane, Dissolve/Harden, Feeblemind, Hold Monster, Magic Jar, Pass-Wall, Telekinesis, Teleport, and Wall of Stone. Combined with v0.4.93, the fourth- and fifth-level Magic-User Immunity sweep is closed at the project's current RAW STRICT standard.

### Validation

Two new deterministic regression groups raise the suite from **690 to 692 tests**. They verify that Cloudkill retains full external geometry while a protected sub-5-HD failed-save victim is not given an invented full death result, and that Dissolve/Harden retain their complete terrain state while Harden entrapment is recipient-bounded by Immunity and restored by voluntary suppression.

The exact final `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic core harness was then executed in **three fresh Chromium pages** against the exact final document content:

```text
Build: 0.4.95
Tests: 692 / 692 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Next batched checkpoint

The fourth-/fifth-level **Magic-User** Immunity review is now complete. The next bounded pass should move to the remaining **fourth-level Cleric** interactions as a group rather than inventing any sixth-level Immunity scaling: **Animate Dead, Create Water, Cure Serious Wounds, Neutralize Poison, Speak with Plants, and Sticks to Snakes**, while preserving the already-reviewed fourth-level Cleric Dispel Magic and Protection from Evil 10' Radius behavior. That batch can separate external creations/world effects from quantifiable healing and binary cure/recipient outcomes before proceeding to the fifth-level Cleric list.

## v0.4.94 — Fifth-level creation/world-state Immunity batch: Animate Dead, Conjure Elemental, Contact Outer Plane, Pass-Wall, Wall of Stone

This grouped checkpoint advances the remaining **fifth-level Magic-User Immunity review** without reopening the already-complete spell implementations. The governing Master rule remains the same: **Immunity** gives total protection from 1st–3rd-level spells, while 4th- and 5th-level spell effects are reduced to **one-half normal effect** (or one-quarter after a successful saving throw when a save applies) wherever the effect is actually quantifiable. The recipient may deliberately lower Immunity for one round. The implementation therefore distinguishes magic placed on a protected creature from magic that creates or alters something external in the world.

### Animate Dead and Conjure Elemental remain full external creation/summoning effects

**Animate Dead** acts on represented remains and creates enchanted skeletons or zombies; the caster is not the recipient of that fifth-level Magic-User effect. Personal Immunity on the caster therefore does not halve the created undead's Hit Dice, reduce the number that can be animated, or require the caster to lower the ward. The active spell record is now explicitly tagged as an external corpse-animation effect so generic recipient-side scaling cannot later reinterpret it as a personal buff.

**Conjure Elemental** likewise summons a separate 16-HD elemental into the represented world. Personal Immunity does not reduce the elemental to 8 HD, alter its AC/damage, shorten its concentration relationship, or force voluntary suppression. The existing one-elemental-of-each-type-per-day and permanent-loss-of-control procedures remain unchanged. Its spell record is now explicitly tagged as external summoning.

### Pass-Wall and Wall of Stone remain full external geometry effects

**Pass-Wall** creates an opening in represented solid stone rather than placing a spell effect on the caster. Personal Immunity therefore leaves the existing full aperture and three-turn duration intact. **Wall of Stone** similarly creates permanent external geometry; the protected caster still creates the complete represented wall and need not lower Immunity. Both effects now carry explicit external-world Immunity metadata so later common scaling cannot halve their geometry merely because the creator is protected.

### Contact Outer Plane now applies Immunity to its explicit quantifiable self-effect

**Contact Outer Plane** is different: its range is 0 and the caster is the direct spell recipient. Its printed effect is explicitly numerical—the number of questions equals the chosen planar distance. Under active Immunity, that fifth-level question allowance is now reduced to **one-half**, rounding in the recipient's favor. Thus a distance-6 contact permits three questions rather than six. Deliberately suppressing Immunity restores the full question allowance.

The contacted plane itself does **not** change. Knowing, lying, and insanity chances remain those of the actual selected plane; the engine does not manufacture a nearer plane or alter the source table as a substitute for half effect. If the caster nevertheless becomes insane, the printed recovery time (weeks equal to planar distance) is a quantifiable harmful duration and is likewise halved in the protected recipient's favor. The once-per-month casting limit is a restriction on spell use rather than an effect on the recipient and remains unchanged.

### Validation

Three new regression groups raise the deterministic suite from **687 to 690 tests**. They cover full-strength Animate Dead under caster Immunity; full-strength Conjure Elemental, Pass-Wall, and Wall of Stone as external effects; and Contact Outer Plane's halved question allowance plus voluntary suppression.

The exact final `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic core harness was then executed **three consecutive times in installed Chromium** against the exact final document content using direct page content loading:

```text
Build: 0.4.94
Tests: 690 / 690 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Next batched checkpoint

The next bounded group is the remaining fifth-level **victim/terrain interaction pair: Cloudkill and Dissolve/Harden**. Cloudkill needs recipient-side Immunity applied to its per-round damage and poison-death consequence without shrinking the external cloud itself; Dissolve/Harden needs the external terrain transformation separated from any direct creature-side trapping consequence.

## v0.4.93 — Fourth-level Magic-User Immunity closure: Ice Storm/Wall of Ice, Massmorph, Wall of Fire, Wizard Eye

This grouped checkpoint finishes the remaining **fourth-level Magic-User recipient-side Immunity review**. The governing Master-level rule remains unchanged: a creature protected by **Immunity** receives only **one-half normal effect** from fourth- and fifth-level spells, or **one-quarter normal effect after a successful saving throw**, for spell effects that can actually be quantified. Where the spell instead creates a wall or remote sensor in the world, personal Immunity is not treated as a ward against the caster's own external magic. Where a creature-side outcome is binary and the source gives no measurable half-state, RAW STRICT continues to preserve an explicit referee boundary rather than invent one.

### Ice Storm now uses the printed one-half / one-quarter Immunity damage directly

**Ice Storm** fills a 20-foot cube and rolls **1d6 cold damage per caster level** as one shared damage packet. Each victim may save vs. Spells for half damage; fire-type creatures take a -4 penalty to that save, while cold-type creatures are unaffected.

The previous handler resolved the ordinary save correctly but did not explicitly connect this spell's alternate name, **Ice Storm / Wall of Ice**, to the common Immunity level lookup. v0.4.93 now evaluates each represented victim's Immunity locally after the saving throw: a protected failed-save victim takes **one-half of the full rolled packet**, while a protected successful-save victim takes **one-quarter of the full rolled packet**. The resolved damage packet is then marked as already processed for RAW Immunity so the common damage pipeline cannot halve or quarter it a second time.

Voluntary suppression remains recipient-local through the same controlled `dropImmunityFor` mechanism used by other area spells. One protected creature lowering Immunity does not lower another creature's ward.

### Wall of Ice remains a full external barrier

The alternate **Wall of Ice** form creates an opaque wall of up to **1,200 square feet** for **12 turns**. That wall is magic placed in the world; the caster is not the spell recipient merely because the caster created it. Personal Immunity therefore does not cut the wall to 600 square feet, shorten it to 6 turns, or require the caster to lower the ward.

The wall record now carries explicit external-wall Immunity metadata and preserves the source spell level on its break-through damage. A creature of 4+ HD that later breaks through is still the recipient of the wall's 1d6 damage (2d6 for fire-type creatures), so that damage remains eligible for the common fourth-level recipient-side reduction when a live crossing consumer resolves it. Creatures below 4 HD remain unable to break through. Universal wall-crossing geometry is still a separate combat-integration boundary; this checkpoint does not claim to add a new generic wall-collision engine.

### Massmorph handles Immunity per willing recipient

**Massmorph** may disguise up to 100 human/man-sized willing creatures within one 240-foot-diameter area, making them appear to be an orchard or dense woods until the spell is dispelled, the caster drops it, or an individual leaves the affected area. The source defines the recipient's result as a complete disguise; there is no duration, penalty, or partial-opacity value that meaningfully represents "half Massmorph."

v0.4.93 therefore evaluates Immunity separately for each willing recipient. An unprotected recipient receives the ordinary full illusion. A protected recipient who keeps Immunity active remains visually unchanged at an explicit binary half-effect boundary; that recipient does **not** cancel or weaken Massmorph for anyone else. A party-controlled recipient may voluntarily lower Immunity for the casting and receive the normal full disguise while the ongoing Immunity spell remains intact afterward.

### Wall of Fire remains external while crossing damage stays recipient-side

**Wall of Fire** creates up to **1,200 square feet** of opaque fire within 60 feet and lasts only while the caster concentrates without moving. Creatures below 4 HD cannot break through; creatures of 4+ HD take **1d6** damage crossing it, doubled for undead or cold-using creatures.

The wall itself is now explicitly classified as an **external-world spell effect**. Personal Immunity on the caster does not halve the wall's area or otherwise interfere with its concentration lifetime, and an unnecessary `dropImmunity` request is not consumed merely to create the barrier. As with Wall of Ice, the record retains fourth-level crossing-damage metadata so a creature's own Immunity remains relevant to the damage packet when that crossing is actually resolved.

### Wizard Eye is an external sensor, not a personal buff

**Wizard Eye** creates a movable invisible eye for **6 turns**. It can move **120 feet per turn**, must remain within **240 feet** of the caster, cannot pass through solid objects, has **60-foot infravision**, and requires the caster to concentrate without moving in order to see through it.

The prior generic active-effect scaler could treat the caster as the recipient merely because the effect record was anchored to the caster, shortening the eye to three turns under Immunity. v0.4.93 corrects that classification. The eye itself is the created magical sensor; the caster is its viewer. Personal Immunity therefore does not shorten the six-turn duration and does not need to be lowered. The existing Prismatic Wall rule that can stop represented Wizard Eye movement through green/violet layers remains unchanged.

### Validation

Four new deterministic regression groups raise the steady-state suite from **683 to 687 tests**. They verify: (1) Ice Storm deals one-half normal damage to a protected failed-save victim and one-quarter normal damage after a successful save, while Wall of Ice retains its full external geometry/duration; (2) Massmorph leaves only the protected recipient outside the disguise unless that recipient lowers Immunity; (3) Wall of Fire retains full external barrier state under personal Immunity; and (4) Wizard Eye remains a full six-turn external sensor while the caster's Immunity stays active.

The exact final inline JavaScript passes `node --check`. The deterministic Node/minimal-DOM harness was given its established one-time normalization warm-up and then passed **687/687 tests for 3 consecutive isolated runs**, with state isolation preserved on all three measured runs. A fresh headless Chromium attempt was also made, but Chromium stalled in this environment before producing DOM output, so no new browser-run claim is made for v0.4.93; **v0.4.92 remains the latest fresh Chromium-validated baseline**.

```text
Build: 0.4.93
Tests: 687 / 687 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean (deterministic Node/minimal-DOM harness after normalization warm-up)
JavaScript syntax: clean
Fresh Chromium validation: not completed; process stalled before DOM output
```

### Next grouped checkpoint

The fourth-level Magic-User Immunity sweep is now closed at the project's source-bounded standard. The next batch should move into the remaining **fifth-level creation/world-state spells** rather than returning to one spell per version. A useful grouped pass is **Animate Dead, Conjure Elemental, Contact Outer Plane, Pass-Wall, and Wall of Stone**, separating external creations and world alterations from personal recipient effects. The remaining mixed victim-side cases, especially **Cloudkill** and **Dissolve**, can then be handled together in a following batch.

## v0.4.92 — Batched transformation and terrain Immunity: Polymorph Others/Self, Growth/Shrink Plants, Hallucinatory Terrain

This checkpoint continues the grouped fourth-level **Immunity** pass with two creature transformations and two terrain-facing spell families. The governing rule remains the Master-level instruction that fourth- and fifth-level spell effects operate at **one-half normal effect** while Immunity is active, with quantifiable values reduced in the protected recipient's favor. As in the preceding batches, RAW STRICT scales a source-defined quantity when one exists and records a boundary rather than inventing a half-state when the printed outcome is fundamentally binary. Spells whose printed recipient is terrain rather than a creature are kept outside personal recipient-side Immunity.

### Polymorph Others no longer creates a full permanent form through half-strength Immunity

**Polymorph Others** changes one living creature into another living creature, preserves the victim's hit points, grants the new creature's abilities/tendencies/behavior, allows a Saving Throw vs. Spells, and lasts **until dispelled or death**. The new form may have no more than twice the victim's original Hit Dice.

That creates a genuine binary interaction with Immunity. The spell has no finite duration to halve and the source gives no procedure for becoming "half polymorphed." v0.4.92 therefore evaluates the recipient's Immunity before the transformation is committed. A successful source-defined saving throw still negates the spell normally. If the victim fails the save while fourth-level Immunity remains active, the engine leaves the victim in the original form and reports an explicit referee boundary instead of silently applying the full permanent transformation. A party-controlled recipient may deliberately lower Immunity for the casting, in which case the ordinary full polymorph resolves and the ongoing Immunity spell remains intact afterward.

### Polymorph Self uses its directly quantifiable duration as the half-effect

**Polymorph Self** is self-only and normally lasts **6 turns + 1 turn per caster level**. The caster keeps Armor Class, hit points, Hit rolls, and saving throws, gains the new form's natural physical abilities, does not gain its special abilities or immunities, and cannot cast spells while transformed.

Its duration is directly quantifiable, so v0.4.92 now makes that duration the represented Immunity reduction. An 8th-level caster therefore receives **7 turns** rather than the normal 14 while Immunity remains active. Voluntary suppression restores the full duration for that casting. The engine does **not** invent a "half anatomy" form by cutting a creature profile's inherited movement, natural attacks, or physical morphology in half; those traits remain the represented form while the source-defined spell duration is reduced. This is a deliberately bounded interpretation of the quantifiable-effect rule rather than a claim that every conceivable physical trait of a polymorphed body has a published half-strength procedure.

The previous generic active-effect scaler already knew how to halve a fourth-level finite duration; this checkpoint adds the missing explicit voluntary-suppression path so `dropImmunity` actually restores the full Polymorph Self duration instead of being rescaled again after the cast.

### Growth of Plants / Shrink Plants stay external terrain magic

**Growth of Plants** affects up to **3,000 square feet of normal brush or woods** within 120 feet, making the vegetation impassable except to giant-sized creatures until Shrink Plants or Dispel Magic removes the effect. **Shrink Plants** makes normal vegetation passable and can negate represented Growth of Plants; plant-like monsters are explicitly unaffected.

These spells alter the vegetation itself. They do not bestow a personal fourth-level state on the caster or on a creature standing in the area. v0.4.92 therefore classifies both forms as **external-world terrain effects**. Personal Immunity on the caster neither halves the 3,000-square-foot terrain change nor requires the caster to lower the ward. The spell records now carry explicit external-world Immunity metadata so a later generalized recipient gate cannot accidentally reinterpret the terrain as a personal buff/debuff.

### Hallucinatory Terrain stays an external terrain illusion

**Hallucinatory Terrain** changes or hides a terrain feature within 240 feet and persists until an intelligent creature physically touches the illusion or Dispel Magic removes it. The spell changes the represented **appearance of terrain**; it does not place an individual charm/phantasm record on each observer.

Accordingly, personal Immunity on the caster does not halve or suppress the terrain illusion and does not need to be voluntarily lowered. The existing touch/dispel ending rule remains intact, and the engine still does not invent what an unrepresented observer believes. This classification is intentionally different from **Phantasmal Force**, where the engine already models a specific creature-side illusory consequence and therefore evaluates recipient Immunity separately.

### Validation

Four new deterministic regression groups raise the integrated suite from **679 to 683 tests**. They verify: (1) failed-save Polymorph Others remains a binary referee boundary under active Immunity but resolves fully after recipient suppression; (2) level-8 Polymorph Self is reduced from 14 turns to 7 and returns to 14 turns when Immunity is lowered; (3) Growth/Shrink Plants retain their full 3,000-square-foot external terrain behavior without lowering the caster's Immunity; and (4) Hallucinatory Terrain remains a full external terrain illusion under personal Immunity.

The exact final inline JavaScript passes `node --check`. Fresh headless Chromium validation was run against the exact final self-contained document by loading the complete HTML directly into the browser. The deterministic core harness passed **683/683 tests for 3 consecutive runs**, with state isolation preserved and no page or console errors.

```text
Build: 0.4.92
Tests: 683 / 683 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Next grouped checkpoint

The next batch should finish the remaining **fourth-level Magic-User Immunity interactions** together: **Ice Storm / Wall of Ice, Massmorph, Wall of Fire, and Wizard Eye**. That group mixes recipient-side spell damage, a binary willing-recipient illusion, external barriers with creature contact damage, and a self-anchored information spell with a finite duration. Completing it should close the fourth-level Magic-User Immunity sweep before the audit moves into the remaining fifth-level creation/world-state cases.

## v0.4.91 — Batched movement and possession Immunity: Dimension Door, Magic Jar, Telekinesis, Teleport

This checkpoint continues the grouped fourth-/fifth-level Immunity pass with four movement/possession spells: **Dimension Door** at fourth level and **Magic Jar, Telekinesis, and Teleport** at fifth level. The governing rule is still the Master-level **Immunity** instruction that fourth- and fifth-level spell effects operate at one-half normal effect, or one-quarter where a successful saving throw normally leaves a measurable result. The implementation scales source-defined quantities where the spell actually provides a quantity; where the printed spell is an all-or-nothing state with no meaningful half form, RAW STRICT records an explicit referee boundary instead of inventing a new mechanic. A saving throw that normally negates a spell continues to negate it completely.

### Dimension Door halves its transport magnitude to 180 feet

**Dimension Door** transports one creature up to **360 feet** and is therefore unusually clean to scale. A protected recipient may now be transported at most **180 feet** while Immunity remains active. The spell's 10-foot recipient range is unchanged because that is the caster-to-target range, not the magnitude of the transport effect. A requested destination beyond 180 feet resolves as a reduced spell that does not reach the chosen destination; the engine does not invent a different landing point. Voluntarily lowering Immunity restores the full 360-foot transport allowance.

An unwilling recipient still receives the spell's normal Saving Throw vs. Spells. A successful save already means no transport, so the engine does not manufacture a quarter-distance result after a successful save. Prismatic Wall transport blocking and solid-destination failure remain downstream of the Immunity scaling.

### Magic Jar possession remains binary at half effect

**Magic Jar** first moves the caster's life force into an inanimate receptacle within 30 feet, then allows an attempt to possess a living creature within 120 feet of the jar. The victim's saving throw is all-or-nothing, and the resulting possession has no printed duration, penalty, bonus, movement rate, or other quantity that can honestly be halved.

Accordingly, a protected victim still makes the normal possession save. On a successful save, the attempt fails normally and the one-turn retry restriction applies. On a failed save under active Immunity, the engine does **not** create a fictional “half possession”: the caster remains in the jar, the victim remains unpossessed, and the active Magic Jar record is marked as a referee boundary. If the protected recipient voluntarily lowers Immunity, ordinary full possession proceeds.

### Telekinesis halves all three represented recipient-side quantities

**Telekinesis** supplies three directly measurable spell effects: it can move up to **200 cn per caster level**, at up to **20 feet per round**, for **6 rounds**. Against a creature protected by Immunity, v0.4.91 now reduces all three quantities to one-half: **100 cn per level**, **10 feet per round**, and **3 rounds**.

If the requested first-round destination is farther than the reduced 10-foot movement allowance, the creature moves only 10 feet toward that represented destination for the current round. If the creature is too heavy for the reduced weight allowance, it does not move. An unwilling creature still gets the normal saving throw, which negates the spell completely on success. Telekinesis cast directly on an object remains unaffected by a nearby creature's personal Immunity because the object, not the creature, is the spell recipient.

### Teleport stays a binary referee boundary under half effect

**Teleport** is an instantaneous relocation to any unoccupied destination on the same plane, with no finite maximum transport distance and no duration to halve. Its destination-knowledge table changes the chance of arriving correctly, but the source never says that half-strength Teleport should move a creature halfway, alter the mishap probabilities, or create some partial relocation state.

RAW STRICT therefore treats a failed-save Teleport against an Immunity-protected recipient as a **binary half-effect boundary**: the recipient stays in place and the mishap table is not rolled. Voluntarily lowering Immunity permits the ordinary complete Teleport and normal destination-knowledge roll. An unwilling recipient's successful saving throw still negates Teleport in the ordinary way.

### Validation

Four new deterministic regression groups raise the integrated suite from **675 to 679 tests**. They verify the reduced 180-foot Dimension Door ceiling and full effect after voluntary suppression; Magic Jar's protected failed-save possession boundary and full possession after suppression; Telekinesis reducing weight capacity, movement, and duration together; and Teleport remaining stationary without even rolling its mishap table until Immunity is lowered.

The exact final inline JavaScript passes `node --check`. Fresh headless Chromium validation was run against the exact final self-contained document by loading the complete HTML directly into the browser. The deterministic core harness passed **679/679 tests for 3 consecutive runs**, with state isolation preserved and no page or console errors.

```text
Build: 0.4.91
Tests: 679 / 679 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Next grouped checkpoint

The next batch should cover the remaining **fourth-/fifth-level transformation and terrain/creation interactions** that have direct Immunity questions, rather than returning to one spell per version. A useful next group is **Polymorph Others, Polymorph Self, Growth of Plants/Shrink Plants, and Hallucinatory Terrain**, separating creature-recipient effects from external-world terrain magic.

## v0.4.90 — Batched fourth-/fifth-level mental control Immunity: Charm Monster, Confusion, Feeblemind, Hold Monster

This checkpoint begins the grouped fourth-/fifth-level Immunity pass promised by v0.4.89. It covers four related mental/control spells together: **Charm Monster** and **Confusion** at fourth level, plus **Feeblemind** and **Hold Monster / Free Monster** at fifth level. The governing Master-level Immunity rule remains unchanged: fourth- and fifth-level spell effects operate at **one-half normal effect**, or one-quarter where a successful save would normally leave a measurable effect; quantifiable durations, bonuses, penalties, damage, and similar values are reduced with fractions rounded in the protected recipient's favor. A normal successful save that already negates a spell is still a complete negation—the engine does not invent a quarter-strength effect after a source-defined successful save.

### Charm Monster halves the measurable persistence of the charm

Charm Monster remains a fourth-level charm using the ordinary Charm Person procedure: eligible living creatures save vs. Spells; creatures of 3 HD or less may be affected in the spell's 3d6 quantity, while a higher-HD victim must be the sole target. Its duration is the charm system's Intelligence-based repeat-save schedule rather than a fixed number of turns.

For a protected recipient who fails the initial save, v0.4.90 leaves the binary **charmed / not charmed** result intact but halves the source-defined, quantifiable interval until the next repeat save. Thus an Intelligence 16-17 victim, normally entitled to another save after one day, receives that next save after **12 hours** while Immunity remains the applicable reduction. The common charm interval helper now also reads player-character Intelligence, not only monster Intelligence, so represented PCs receive the same published schedule. Voluntary Immunity suppression restores the normal interval for that casting. A successful initial Charm Monster save still means no charm at all.

### Confusion becomes six rounds for protected recipients

Confusion normally lasts **12 rounds** in a 60-foot-diameter area. Victims below 2+1 HD receive no save; stronger victims save every round and act normally in any round whose save succeeds. The spell's persistent duration is directly quantifiable, so a protected recipient now receives a **6-round** Confusion record while an unprotected creature in the same area still receives the normal 12 rounds. This is recipient-local: one creature's Immunity neither shortens nor cancels the shared spell for anyone else.

The ordinary round-by-round save rule is preserved. A successful save already means the creature is not confused that round, so no artificial quarter-strength action state is invented. Recipient-specific `dropImmunityFor` continues to allow a party-controlled creature to accept the full spell without lowering another creature's ward.

### Feeblemind scales both its save penalty and its Intelligence reduction

Feeblemind is a fifth-level spell affecting Magic-Users, Elves, and spell-casting monsters. The normal spell applies a **-4 penalty to the Saving Throw vs. Spells**; on failure it lowers Intelligence to **2**, making the victim helpless and unable to cast spells until Dispel Magic succeeds or Cureall removes the condition.

Under active Immunity, both measurable parts are now reduced before state is committed:

- the printed **-4 saving-throw penalty becomes -2**;
- on a failed save, the amount of the Intelligence reduction toward 2 is halved, rounding in the recipient's favor.

For example, a represented Intelligence 18 victim is reduced to **Intelligence 10**, not 2. Because the source describes the helpless / unable-to-cast condition as functioning "as if" Intelligence 2, a half-strength Feeblemind that does not reach Intelligence 2 does **not** silently impose the full binary helplessness and spellcasting lock. The reduced effective Intelligence is stored on the continuing Feeblemind effect and is visible to common Intelligence consumers such as Maze. If a spell-casting monster lacks a numeric pre-spell Intelligence score, the engine records a partial Feeblemind but leaves the exact reduced score as a referee boundary rather than inventing one.

A successful Feeblemind save still negates the spell completely. Voluntarily lowering Immunity permits the full Intelligence-2 helpless state and does not remove the underlying Immunity spell.

### Hold Monster halves the save penalty and paralysis duration; Free Monster stays binary

Hold Monster normally lasts **6 turns + 1 turn per caster level**, affects one to four living creatures, and gives a lone target a **-2 penalty** on its saving throw. For an Immunity-protected lone target, the save penalty is now **-1**. If the save fails, the paralysis duration is halved. A 10th-level caster therefore produces **8 turns** of paralysis rather than the normal 16. Group targets, which have no printed save penalty, simply receive the half-duration rule individually.

The reversed **Free Monster** is different: it either removes Hold Person / Hold Monster paralysis or it does not. The source gives no half-release procedure. On a protected recipient, the engine therefore leaves the paralysis intact and reports an explicit referee boundary rather than inventing partial mobility, a 50% removal chance, or some other unsourced result. If the recipient voluntarily lowers Immunity, Free Monster removes the paralysis normally.

### Validation

Four new deterministic regression groups raise the suite from **671 to 675 tests**. They verify: (1) Charm Monster halves an Intelligence-based repeat-save interval; (2) Confusion shortens only the protected recipient from 12 to 6 rounds; (3) Feeblemind changes the -4 save penalty to -2 and reduces Intelligence 18 to 10 without imposing full helplessness, while voluntary suppression restores the complete effect; and (4) Hold Monster changes the lone-target save penalty from -2 to -1, halves a level-10 duration from 16 to 8 turns, and keeps half-strength Free Monster at an explicit binary referee boundary.

The exact final inline JavaScript passes `node --check`. Fresh headless Chromium validation was run against the exact final self-contained document. The complete deterministic core harness passed **675/675 tests for 3 consecutive runs**, with state isolation preserved and no page or console errors.

```text
Build: 0.4.90
Tests: 675 / 675 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Next grouped checkpoint

The next batch should stay with direct recipient-state interactions but move out of pure mental control: **Dimension Door, Magic Jar, Telekinesis, and Teleport** form a useful fourth-/fifth-level movement/possession group. Their Immunity interactions are deliberately mixed—some have quantifiable movement or duration, while others are binary transport/possession outcomes—so they should be classified together rather than one spell per version.

## v0.4.89 — Batched third-level Cleric Immunity closure: Striking and Speak with the Dead

This checkpoint adopts the new **batched cadence** and closes the two remaining third-level Cleric Immunity classifications together instead of spending one version on each spell. Mentzer defines **Striking** as magic placed on one weapon within 30 feet for one turn, adding **1d6 damage per successful attack** with no Hit-roll bonus. **Speak with the Dead** instead lets the cleric question a **deceased spirit** while its body is within 10 feet, for **one round per cleric level**, with at most three questions and the existing age/alignment knowledge limits. Ninth-level **Immunity** protects its creature recipient from low-level spell effects; neither spell is properly modeled as a third-level personal effect bestowed on the living caster or weapon wielder.

### Striking is now explicitly an external weapon enchantment

The ordinary Striking handler already created the correct one-turn +1d6 weapon state, but the effect record was attached to the wielder for lookup convenience. That representation could make a future generic Immunity pass mistake the weapon enchantment for a low-level personal buff. v0.4.89 makes the source target explicit.

- **Striking is classified as an external-world spell for Immunity purposes.** The magic is on the represented weapon, not on the creature holding it.
- Ordinary Immunity on either the **Cleric caster** or the **weapon wielder** does not negate, halve, or shorten the enchantment.
- An unnecessary `dropImmunity:true` request is ignored for this interaction; the caster and wielder keep their wards active because neither needs to lower personal protection merely to enchant the weapon.
- The Striking effect record is tagged `ignoreRawImmunityScaling:true` and `immunityInteraction:'external_world_effect'` so later common effect-scaling work cannot accidentally reduce its one-turn duration because the lookup target happens to be the wielder.
- Existing Striking behavior remains unchanged: +1d6 magical damage per successful attack, no Hit-roll bonus, and the source-specific ability for the magical Striking packet to hurt a creature that ordinary weapons cannot. The previously tracked edge remains: every monster-specific weapon-immunity exception has not yet been exhaustively routed through that special “only the 1d6 applies” case.

### Speak with the Dead is now explicitly a deceased-spirit information channel

Speak with the Dead is not a personal sensory buff on the cleric. The printed effect is contact with a **deceased spirit**, using the corpse only as the required range anchor. v0.4.89 records that distinction directly rather than allowing generic recipient logic to infer that the living caster is receiving a third-level spell effect.

- Personal Immunity on the **cleric** does not block or shorten Speak with the Dead.
- The spell retains its full source duration of **one round per cleric level**, its **three-question** limit, the existing death-age limits, and the alignment-dependent answer style.
- The effect is tagged `ignoreRawImmunityScaling:true` with `immunityInteraction:'deceased_spirit_information'`.
- A common `rawImmunitySpellHasNoLivingCreatureRecipient` classification now prevents future generic recipient-side gates from incorrectly requiring the cleric to lower Immunity before contacting a dead spirit.
- The engine does **not** invent a rule that a lingering Immunity record on a corpse protects the contacted spirit; the source does not state such an interaction. The corpse remains the represented body/range anchor while the information source is the deceased spirit.
- The existing referee boundary is unchanged: the engine stores the three-question window and knowledge cutoff but does not fabricate private facts known by the dead character.

This completes the remaining **third-level Cleric recipient-side Immunity review**. The next Immunity work can therefore move in grouped fourth-/fifth-level batches rather than continuing the one-spell-at-a-time sequence.

### Validation

Two new deterministic regression groups raise the suite from **669 to 671 tests**. They verify that: (1) Striking keeps its complete one-turn +1d6 weapon enchantment while both caster and wielder retain ordinary Immunity; and (2) Speak with the Dead keeps its full three-question/deceased-spirit information window while the cleric remains protected by Immunity.

The exact final inline JavaScript passes `node --check`. Fresh headless Chromium validation was run against the exact final self-contained document. After page initialization, the complete deterministic core harness passed **671/671 tests for 3 consecutive runs**, with state isolation preserved and no page or console errors.

```text
Build: 0.4.89
Tests: 671 / 671 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Next grouped checkpoint

The next pass should begin the **fourth-/fifth-level mental and control batch** rather than return to one-spell micro-checkpoints: **Charm Monster, Confusion, Feeblemind, and Hold Monster** are the natural first group. The implementation should apply Immunity's one-half/one-quarter rule only where the printed effect is actually quantifiable, preserve ordinary successful-save negation, and keep binary or exceptional outcomes explicit instead of inventing partial conditions.


## v0.4.88 — Growth of Animals now respects total third-level Immunity before transformation state

This checkpoint continues the deliberately small **third-level Cleric recipient-side Immunity audit** and changes only ordinary **Growth of Animals**. The spell has **Range: 120'**, **Duration: 12 turns**, and **Effect: doubles the size of one animal**. It applies only to a normal or giant animal; the recipient gains twice normal strength, normal damage, and carrying capacity, while behavior, Armor Class, and hit points remain unchanged. Ninth-level **Immunity** gives its recipient total immunity to 1st-, 2nd-, and 3rd-level spells unless the recipient deliberately lowers that protection for the round.

### Recipient Immunity now resolves before the growth record is created

The dedicated Growth of Animals handler now checks the eligible animal recipient's ordinary Immunity immediately after the existing target, range, and animal-eligibility validation and **before** any transformation state is committed.

- An animal protected by active ordinary Immunity receives **no Growth of Animals state at all** because the Cleric spell is third level.
- The blocked cast does not create a zero-strength or zero-duration transformation record that could later be mistaken for active growth.
- If the recipient deliberately lowers Immunity for the round, Growth of Animals resolves at its full source-defined strength: size, strength, normal damage, and carrying capacity each double for the full **12 turns**.
- Voluntary suppression does **not** remove the ninth-level Immunity spell. In combat its existing record is merely marked suspended for the current round and can resume automatically afterward.
- Existing source boundaries are unchanged: this build still targets represented normal/giant animals in combat and does not fabricate persistent wilderness herds, mount records, or otherwise-unrepresented animals simply to satisfy the spell.

This is a straightforward recipient-side case rather than a quantifiable fourth-/fifth-level scaling problem: because the Cleric spell is third level, the correct active-Immunity result is complete negation, not a half-sized animal or shortened duration.

### Validation

Two new deterministic regression groups raise the suite from **667 to 669 tests**. They verify that: (1) active ordinary Immunity blocks third-level Growth of Animals before any `growth_animal` transformation state is created; and (2) deliberate one-round suppression permits the complete doubling profile while preserving the underlying Immunity spell record.

The exact final inline JavaScript passes `node --check`. Fresh headless Chromium validation was completed against the exact final self-contained document by loading the document content directly. The complete deterministic core harness passed **669/669 tests for 3 consecutive runs**, with state isolation preserved and no page or console errors.

```text
Build: 0.4.88
Tests: 669 / 669 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Next bounded checkpoint

The next small pass should review **Striking vs. ordinary Immunity**. Striking enchants a represented weapon rather than directly bestowing its +1d6 packet on the wielder, so the pass should explicitly classify that external weapon effect before the recipient-side Immunity audit moves on to the less ordinary Speak with the Dead case.


## v0.4.87 — Remove Curse / Curse now respect class-specific Immunity levels without inventing a half-removal

This checkpoint continues the deliberately small **recipient-side Immunity audit** and changes only ordinary **Remove Curse** and its reversed form, **Curse**. The spell text defines Remove Curse as **Range: Touch**, **Duration: Permanent**, **Effect: Removes any one curse**; its reverse allows a Saving Throw vs. Spells and provides bounded example curses such as **-4 on attack rolls**, **-2 on saving throws**, **prime requisite reduced to half normal**, and the compatible Rules Cyclopedia example **-4 on reaction rolls**. The same spell pair occupies different spell levels by class: the Cleric form is third level, while the Magic-User/Elf form is fourth level. Ninth-level **Immunity** completely negates 1st- through 3rd-level spells and reduces 4th- and 5th-level effects to one-half normal unless the recipient deliberately lowers the protection.

### Third-level Cleric Remove Curse and Curse now resolve Immunity before state or saves

The common Remove Curse handler now performs recipient-side Immunity resolution before either branch changes the target.

- **Cleric Remove Curse:** active Immunity completely negates the beneficial third-level spell before any represented curse flag or curse spell effect is removed.
- The recipient may deliberately lower Immunity for the casting; Remove Curse then removes one represented curse normally while the ninth-level Immunity itself remains intact afterward.
- **Cleric Curse:** active Immunity completely negates the reversed third-level spell **before the Saving Throw vs. Spells is rolled** and before any curse state is created.
- Deliberately lowering Immunity restores the ordinary save and, on failure, the full selected source-bounded curse.

This preserves the same pre-commit ordering used by Cure Blindness and Cure/ Cause Disease: a spell that is completely negated by Immunity does not consume recipient-side saving-throw or affliction randomness merely to arrive at a zero effect later.

### Fourth-level Magic-User/Elf Curse is reduced quantitatively

The Magic-User/Elf form is fourth level, so Immunity does not erase it outright. For the printed safe curse forms that have a deterministic numeric magnitude, the engine now applies the one-half spell-effect rule after a failed save:

- **-4 Hit rolls** becomes **-2**;
- **-2 saving throws** becomes **-1**;
- **-4 reaction rolls** becomes **-2**;
- **prime requisite reduced to one-half normal** becomes **75% of normal**, representing one-half of the normal 50% reduction.

These values are written directly once and marked as already Immunity-scaled so the common active-effect recorder does not halve them a second time. A successful ordinary Curse saving throw still produces no curse at all; the engine does not invent a quarter-strength curse where the underlying spell already says the victim avoids the effect.

### Fourth-level Remove Curse remains explicit where “half of one permanent removal” has no source-defined meaning

The fourth-level Magic-User/Elf Remove Curse presents a different problem: the printed result is binary—**one curse is removed permanently**—and the source text does not define a partial removal state. With active Immunity, the common scalar correctly identifies a one-half fourth-level spell effect, but this build does **not** fabricate a 50% removal chance, temporary duration, weakened curse, or other substitute rule.

Accordingly, a fourth-level Remove Curse aimed at an Immunity-protected creature leaves the represented curse intact and reports the interaction as a **referee boundary**. If the recipient voluntarily lowers Immunity, the full Remove Curse resolves normally. Existing item/area curse limitations are unchanged; this checkpoint only hardens the represented creature-recipient path.

### Validation

Three new deterministic regression groups raise the suite from **664 to 667 tests**. They verify that: (1) third-level Cleric Remove Curse cannot clear a curse until the recipient lowers Immunity; (2) third-level Cleric Curse is stopped before its saving throw or curse state, while voluntary suppression restores the full spell; and (3) fourth-level Magic-User Curse is reduced to one-half numeric magnitude while fourth-level Remove Curse does not invent a partial binary cure and resolves fully only after voluntary suppression.

The exact final inline JavaScript passes `node --check`. Fresh headless Chromium validation was completed against the exact final self-contained document by loading the document content directly. The complete deterministic core harness passed **667/667 tests for 3 consecutive runs**, with state isolation preserved and no page or console errors.

```text
Build: 0.4.87
Tests: 667 / 667 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Next bounded checkpoint

The next small pass should review **Growth of Animals vs. ordinary Immunity**. It is another third-level creature-targeting Cleric effect and can be gated cleanly before transformation state is created without expanding this checkpoint into unrelated information or weapon spells.


## v0.4.86 — Cure Disease / Cause Disease now respect total third-level Immunity before state or save resolution

This checkpoint continues the deliberately small **third-level Cleric recipient-side Immunity audit** and changes only ordinary **Cure Disease** and its reversed form, **Cause Disease**. The compatible consolidated spell text defines Cure Disease as a third-level Cleric spell with **Range: 30'**, **Duration: Permanent**, and **Effect: One living creature within range**. It cures one disease and, when cast by an 11th-level-or-higher cleric, can also cure lycanthropy. The reverse, Cause Disease, allows a Saving Throw vs. Spells; on failure the victim suffers **-2 on attack rolls**, cannot have wounds magically cured, heals naturally at half the normal rate, and dies in **2d12 days** unless Cure Disease removes the infection. Ninth-level **Immunity** gives its recipient total immunity to all 1st-, 2nd-, and 3rd-level spells unless the recipient deliberately drops the protection for the round.

### Immunity now resolves before either cure or infection commits state

The dedicated Cure Disease handler now evaluates ordinary Immunity immediately after normal target/range validation and before either branch changes the recipient.

- **Cure Disease:** active Immunity completely negates the beneficial third-level spell before any represented disease, rabies, parasite infection, Pileus Rot, or eligible lycanthropy state is removed.
- A recipient may deliberately lower Immunity for the casting. Cure Disease then resolves normally, including the existing 11th-level lycanthropy rule, while the ongoing Immunity spell remains intact afterward.
- **Cause Disease:** active Immunity completely negates the reversed third-level spell **before the Saving Throw vs. Spells is rolled** and before either the 2d12-day fatal timer or any persistent disease/effect record is created.
- Deliberately lowering Immunity allows Cause Disease to use its ordinary saving throw and, on failure, its existing wasting-disease procedure.
- The pass does not change disease eligibility, natural disease acquisition, monster disease attacks, artifact disease powers, or the disease-healing consequences themselves. It only fixes the ordering and recipient-side Immunity gate for the ordinary third-level Cleric spell pair.

### Validation

Two new deterministic regression groups raise the suite from **662 to 664 tests**. They verify that: (1) active Immunity prevents Cure Disease from clearing represented disease until the recipient voluntarily lowers the ward; and (2) active Immunity prevents Cause Disease **before any save roll, disease-duration dice, or persistent disease state**, while voluntary suppression restores the normal failed-save infection path.

The exact final inline JavaScript passes `node --check`. A fresh Chromium validation was also completed against the exact final self-contained document by loading the document content directly into headless Chromium. The complete deterministic core harness passed **664/664 tests for 3 consecutive runs**, with state isolation preserved and no page or console errors.

```text
Build: 0.4.86
Tests: 664 / 664 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Next bounded checkpoint

The next small pass should review **Remove Curse / Curse vs. ordinary Immunity**. Both forms directly affect a creature in the common handler, but the beneficial cure and harmful reversed curse need separate pre-commit gating while preserving the spell's existing save, item/area boundaries, and referee-bounded curse strength.


## v0.4.85 — Cure Blindness now respects total third-level Immunity before curing

This checkpoint continues the deliberately small **third-level Cleric recipient-side Immunity audit** and changes only ordinary **Cure Blindness**. Mentzer defines Cure Blindness as a third-level Cleric spell with **Range: Touch**, **Duration: Permanent**, and **Effect: One living creature**. It cures nearly any form of blindness, including blindness from normal or continual light/darkness magic, but it does not cure blindness caused by a curse. Ninth-level **Immunity** gives its recipient total immunity to all 1st-, 2nd-, and 3rd-level spells unless the recipient deliberately drops the protection for the round.

The engine already had a dedicated Cure Blindness procedure, including the Master-level **Power Word Blind** exception: Cure Blindness (or Cureall) cannot remove blindness from Power Word Blind unless the curing cleric is at least the original caster's level. The missing interaction was that Cure Blindness could remove represented blindness state before checking ordinary Immunity.

### Recipient Immunity now gates the cure before any blindness state changes

The dedicated Cure Blindness handler now evaluates the touched recipient's ordinary Immunity immediately after range validation and **before** any blindness record or flag is removed.

- An active Immunity spell completely negates Cure Blindness because Cure Blindness is a third-level spell acting directly on that creature.
- When negated, the engine leaves ordinary `blinded` state and represented Light/Darkness blindness spell records untouched.
- A recipient may deliberately lower Immunity for the casting through the existing bounded suppression procedure. Cure Blindness then resolves normally, and the ongoing Immunity spell remains in place afterward.
- The change does **not** reinterpret curse-caused blindness: Cure Blindness still cannot remove it.
- Voluntarily lowering Immunity does **not** bypass Power Word Blind's separate caster-level restriction. A lower-level cleric still cannot cure that eighth-level effect; a cleric of equal or higher level can remove it once Immunity is lowered.
- No new living-creature eligibility subsystem is introduced in this checkpoint. The pass is intentionally limited to the Immunity gate and preservation of the already represented blindness exceptions.

### Validation

Two new deterministic regression groups raise the suite from **660 to 662 tests**. They verify that: (1) ordinary Immunity completely prevents third-level Cure Blindness from removing a represented continual-light blindness state; and (2) deliberate Immunity suppression permits the cure to resolve, but a lower-level cleric still cannot remove Power Word Blind while an equal-level cleric can.

The exact final inline JavaScript passes `node --check`. The deterministic Node/minimal-DOM harness passed **662/662 tests for 3 consecutive runs** with state isolation preserved, plus a clean warm-up run.

```text
Build: 0.4.85
Tests: 662 / 662 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
JavaScript syntax: clean
```

A fresh Chromium page/console validation is not claimed in this checkpoint. Headless Chromium again stalled in the current environment, so **v0.4.66 remains the latest fresh Chromium-validated baseline**.

### Next bounded checkpoint

The next small pass should review **Cure Disease / Cause Disease vs. ordinary Immunity**. Cure Disease is another third-level creature-side spell, while its reversed form directly imposes a disease after a saving throw; both should be checked against total third-level Immunity before any cure, save, or disease state is committed.

## v0.4.84 — Dispel Magic targets spell effects; recipient Immunity does not shelter them

This checkpoint continues the deliberately small **third-level Immunity audit** and is limited to the interaction between ordinary **Dispel Magic** and ninth-level **Immunity**. The primary Mentzer text defines Magic-User Dispel Magic as a third-level spell whose effect is **"Destroys spells in a 20' cube"**: it destroys *other spell effects* according to the relative caster levels and explicitly does not affect magic items themselves. Cleric Dispel Magic is the same procedure on the fourth-level Cleric list. Immunity, meanwhile, protects its **recipient** from low-level spells and reduces fourth-/fifth-level spell effects on that recipient.

The books do not separately state a special Dispel Magic/Immunity exception. v0.4.84 therefore records a narrow source-bounded classification from the printed target/effect language: **Dispel Magic targets existing spell effects, not the creature who happens to be carrying or standing inside those effects.** Recipient Immunity consequently does not become a protective shell around separate dispellable spell records.

### Spell-effect-targeting classification

The common Immunity layer now distinguishes a third category in addition to personal recipient effects and wholly external world/object effects:

- **Dispel Magic is explicitly classified as `spell_effect_targeting`.** A future generic low-level Immunity gate cannot accidentally treat a protected creature as the recipient of Dispel Magic merely because the 20-foot cube is centered on that creature.
- A Magic-User under personal Immunity does **not** need to lower that protection merely to cast Dispel Magic on other spell effects.
- A creature protected by Immunity does **not** shield other eligible spell effects on itself from the ordinary Dispel Magic caster-level procedure.
- The **Immunity spell itself remains an ordinary dispellable spell effect** unless another rule marks it otherwise. If it lies in the selected cube, it is tested by exactly the same caster-level rule as other tracked spells; Immunity does not recursively make its own spell record immune to Dispel Magic.
- Magic-User Dispel Magic being third level does not cause the protected creature's Immunity to negate the dispel, because the protected creature is not the spell's mechanical recipient.
- Cleric Dispel Magic being fourth level likewise does **not** turn a successful dispel into a fabricated "half-dispel." The printed Dispel Magic result is binary per spell effect: the effect is destroyed or it resists according to caster-level difference. The generic fourth-level one-half scalar therefore is not applied to that separate spell-effect target.
- The existing rule that normal Dispel Magic **does not affect magical items themselves** is unchanged. The compatible Rules Cyclopedia clarification that an *effect produced by* a magical item may be dispelled remains dependent on that effect being represented in the common spell/effect layer.

This checkpoint deliberately does not change Touch Dispel, Staff of Dispelling effective level, Ring of Spell Storing effective level, Prismatic Wall's indigo remedy, Anti-Magic behavior, or the caster-level success formula. It only prevents recipient-side Immunity logic from being applied to the wrong target category.

### Validation

Two new deterministic regression groups raise the suite from **658 to 660 tests**. They verify that: (1) equal-level Magic-User Dispel Magic can destroy both a lower-level Fly and the ordinary Immunity spell itself on the same protected recipient, rather than having the third-level dispel rejected by that recipient's Immunity; and (2) fourth-level Cleric Dispel Magic retains the full ordinary spell-effect destruction procedure against a protected recipient rather than being converted into an invented half-strength result.

The exact final inline JavaScript passes `node --check`. The deterministic Node/minimal-DOM harness passed **660/660 tests for 3 consecutive runs** with state isolation preserved, plus a clean warm-up run.

```text
Build: 0.4.84
Tests: 660 / 660 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
JavaScript syntax: clean
```

A fresh Chromium page/console validation is not claimed in this checkpoint; **v0.4.66 remains the latest fresh Chromium-validated baseline**.

### Next bounded checkpoint

The next small pass should begin the remaining **third-level Cleric recipient-side Immunity review** with **Cure Blindness**. That handler directly removes represented blindness states and therefore should check total third-level Immunity before curing the recipient, while preserving the existing Power Word Blind caster-level exception.

## v0.4.83 — Fire Ball / Lightning Bolt total Immunity now resolves before victim saves

This checkpoint continues the deliberately small **third-level recipient-side Immunity audit** and changes only the ordinary **Fire Ball** and **Lightning Bolt** victim paths. Both spells already had their represented geometry, friendly fire, individual Saving Throws vs. Spells, damage, Anti-Magic interaction, and the Mentzer 20-die maximum. The common damage pipeline also already reduced a third-level spell's damage to zero when ordinary ninth-level **Immunity** protected the recipient. The remaining defect was **timing**: the area resolvers could still roll the protected victim's saving throw before the later damage pipeline reduced the packet to zero.

That was not a complete implementation of the printed total immunity. A 1st–3rd-level spell that is completely negated for its recipient should not first ask that recipient to resolve a saving throw. Besides consuming RNG unnecessarily, the premature save could also feed other save-coupled engine state even though the protected creature should never have been affected by the spell in the first place.

### Ordinary Immunity now gates each represented victim before the save

The Fire Ball and Lightning Bolt area loops now evaluate **ordinary spell Immunity per represented subject after geometry/Anti-Magic establishes that the subject is actually in the spell, but before any Saving Throw vs. Spells is rolled**.

- A recipient whose ninth-level Immunity remains active takes **no Fire Ball or Lightning Bolt damage and rolls no saving throw** against that third-level spell.
- The spell itself is not cancelled globally. It continues through its ordinary represented area/line and can affect other creatures normally; Immunity is a recipient protection, not an Anti-Magic field.
- Existing **Fire Ball spherical geometry, friendly fire, blast clipping, and damage roll** are unchanged.
- Existing **Lightning Bolt 60-foot × 5-foot line, solid-surface rebound, friendly fire, and Anti-Magic interception** are unchanged.
- The later common damage-pipeline Immunity check remains as defense in depth for other direct spell-damage producers, but these two live area handlers no longer rely on that later layer to represent total third-level immunity.
- The separate artifact-Immunity path remains intact and is still evaluated independently after the ordinary ninth-level spell gate where applicable.

### Voluntary suppression is recipient-local

Area magic exposed one additional safety requirement. The common `dropImmunity` instruction cannot be allowed to lower every protected creature inside a Fire Ball or Lightning Bolt simply because one spell order contains that flag.

v0.4.83 therefore adds a bounded recipient-order helper for area spells:

- a generic `dropImmunity:true` / `allowThroughImmunity:true` can lower **only the caster's own** ordinary Immunity when the caster is also an affected represented recipient;
- `dropImmunityFor` can identify individual **party-controlled** recipients who deliberately lower their own Immunity for that round;
- the same caster-side list **cannot switch off an enemy's Immunity**;
- every other protected recipient remains fully immune and does not make a saving throw.

This does not create a new general consent system. It only prevents an area-spell order from accidentally converting one character's voluntary suppression into a global suppression of unrelated creatures.

### Validation

Two new deterministic regression groups raise the suite from **656 to 658 tests**. They verify that: (1) Fire Ball against two ordinary-Immunity-protected represented victims consumes only the spell's five damage dice and never rolls either victim's saving throw; and (2) Lightning Bolt allows a named party recipient to lower Immunity for the round, resolves that recipient's ordinary save/damage, but refuses to lower a protected enemy from the same `dropImmunityFor` list and therefore rolls no enemy save.

The exact final inline JavaScript passes `node --check`. The deterministic Node/minimal-DOM harness passed **658/658 tests for 3 consecutive runs** with state isolation preserved (plus a clean warm-up run).

```text
Build: 0.4.83
Tests: 658 / 658 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
JavaScript syntax: clean
```

A fresh Chromium page/console validation is not claimed in this checkpoint; **v0.4.66 remains the latest fresh Chromium-validated baseline**.

### Next bounded checkpoint

The next small pass should review **Dispel Magic vs. ordinary Immunity**. That interaction needs a source-bounded classification because Dispel Magic operates on represented magical effects in an area rather than simply placing a third-level effect on one creature; the checkpoint should determine exactly what recipient Immunity can and cannot protect without widening into the rest of the spell system.

## v0.4.82 — Entangle source-hierarchy correction; no RC-only spell promotion

This checkpoint is deliberately a **source-correction pass**, not a new spell-mechanics tranche. The v0.4.81 "Next bounded checkpoint" note incorrectly described **Entangle** as a second-level external vegetation effect to be integrated with Immunity. That description was wrong for this project in two separate ways.

First, the project's primary **Mentzer BECM** second-level Magic-User list contains exactly twelve spells: **Continual Light, Detect Evil, Detect Invisible, ESP, Invisibility, Knock, Levitate, Locate Object, Mirror Image, Phantasmal Force, Web, and Wizard Lock**. **Entangle is not on that primary list.** The later **Rules Cyclopedia** expands the second-level magical list by adding **Entangle**, but this project has consistently treated Mentzer BECM as primary and the Cyclopedia as secondary only where compatible; Cyclopedia-only additions are not silently promoted into `RAW_STRICT`.

Second, the Rules Cyclopedia's Entangle is not an area of animated vegetation. Its printed effect is **"Controls ropes"**: living or once-living rope-like material such as roots, vines, leather rope, or plant-fibre rope can be ordered to coil, knot, loop, tie, and reverse those commands. The prior vegetation-area description therefore resembled a different edition's spell concept rather than the BECMI-family text actually under review.

### RAW_STRICT now makes this source exclusion explicit

The runtime already omitted Entangle from the Mentzer-primary `MAGIC_USER_SPELLS` registry. v0.4.82 hardens that existing source decision so it cannot drift later:

- `RAW_SOURCE_EXCLUDED_SPELLS` records **Entangle** as a Rules Cyclopedia-only Magic-User/Elf level-2 addition that is absent from the Mentzer BECM primary list.
- `rawSourceExcludedSpellInfo()` exposes that provenance to deterministic rules code.
- A direct call into `resolveBecmiSpellEffect()` under `RAW_STRICT` now refuses a source-excluded Entangle **before Anti-Magic checks, RNG use, active-effect creation, or other represented state changes**. The warning explains that the spell belongs to the later Cyclopedia expansion rather than claiming that it is an unimplemented Mentzer spell.
- Entangle remains absent from normal Magic-User/Elf spell preparation and from the RAW handler registry. No vegetation volume, rope-control state, or Immunity interaction has been invented for the Mentzer-primary rules profile.

This is consistent with earlier audit decisions that exclude Cyclopedia-only additions such as **Steelform** from the strict Mentzer registry. It also closes the second-level recipient-first Immunity review without adding a thirteenth spell that does not belong to the primary source list.

### Validation

Two new deterministic regressions raise the suite from **654 to 656 tests**. They verify that: (1) Entangle is explicitly recorded as a level-2 Rules Cyclopedia source exclusion while remaining absent from both Magic-User and Elf preparation/handler registries; and (2) a direct `RAW_STRICT` Entangle resolution attempt is refused without changing RNG, active spell state, or caster hit points.

The exact final inline JavaScript passes `node --check`. The deterministic Node/minimal-DOM harness passed **656/656 tests for 3 consecutive runs** with state isolation preserved.

```text
Build: 0.4.82
Tests: 656 / 656 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
JavaScript syntax: clean
```

A fresh Chromium page/console validation is not claimed in this checkpoint; **v0.4.66 remains the latest fresh Chromium-validated baseline**.

### Next bounded checkpoint

The next small pass should move to the **remaining third-level Immunity interaction audit**, beginning with the direct-damage path shared by **Fire Ball / Lightning Bolt**. The goal is to verify that total 1st–3rd-level Immunity is applied before their represented damage packets and saving-throw side effects, without widening this checkpoint into the rest of third-level magic.

## v0.4.81 — Hold Portal is portal magic, not a creature-side Immunity effect

This checkpoint continues the deliberately small **recipient-first Immunity integration pass** and changes only the first-level Magic-User **Hold Portal** interaction. The printed spell has **Range 10'**, **Duration 2d6 turns**, and **Effect: One door, gate, or similar portal**. It magically holds that portal shut. **Knock** opens it without removing the magic, and a creature with at least three more Hit Dice than the caster—or a character at least three levels higher—can break the held portal open in one round; if the portal closes while the spell still lasts, the magical hold takes effect again. Ninth-level **Immunity**, by contrast, protects its *recipient* from 1st–3rd-level spells and does not state that the recipient loses the ability to cast low-level magic on unrelated objects or that an Immunity-protected creature can ignore magic attached to a door.

### Hold Portal now has an explicit external-world Immunity classification

v0.4.81 therefore hardens **Hold Portal** as magic placed on the represented portal rather than on the caster or on a creature later trying to force the door.

- **Personal Immunity on the caster does not prevent Hold Portal from being cast.** The caster does not need to suppress Immunity to place the first-level spell on a represented door, gate, or similar portal.
- The active `hold_portal` record is now explicitly tagged `immunityInteraction: 'external_world_effect'` and `ignoreRawImmunityScaling: true`. The common recipient-side Immunity scaler therefore cannot cancel or shorten the spell merely because the caster is protected.
- An unnecessary `dropImmunity:true` request is ignored for this wholly external spell; the caster's ongoing Immunity remains active.
- **Immunity on a creature trying to force the portal grants no bypass and creates no extra prohibition.** The existing printed threshold remains authoritative: the creature/character must be at least three Hit Dice/levels above the Hold Portal caster.
- A qualifying protected opener still creates only the existing temporary passage bypass; the Hold Portal effect itself remains and can reassert when the portal closes before its 2d6-turn duration expires.
- No change was made to Knock, ordinary physical lock state, Wizard Lock, or the existing Hold Portal duration/door cleanup. This checkpoint only closes the Immunity classification boundary.

This also closes the remaining first-level Magic-User spell in the current recipient-side Immunity review: the other first-level creature-side or external-world cases already have explicit handling in prior checkpoints.

### Validation

Two new deterministic regression groups raise the steady-state suite from **652 to 654 tests**. They verify that: (1) a personally Immunity-protected Magic-User can cast Hold Portal at its full 2d6-turn duration without lowering Immunity and the effect carries explicit external-world metadata; and (2) Immunity on a later opener neither blocks a character exactly three levels above the caster nor lets an under-qualified character bypass the printed threshold.

The exact final inline JavaScript passes `node --check`. The deterministic Node/minimal-DOM harness again performs its known one-time state/default normalization warm-up; after that warm-up, the exact final build passed **654/654 tests for 3 consecutive runs** with state isolation preserved.

```text
Build: 0.4.81
Steady-state tests: 654 / 654 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean after one-time harness normalization warm-up
JavaScript syntax: clean
```

A fresh Chromium page/console validation is not claimed in this checkpoint unless separately noted; **v0.4.66 remains the latest fresh Chromium-validated baseline**.

### Next bounded checkpoint

The next small recipient-first Immunity item should be **Entangle**, because it is a second-level external vegetation effect that then restrains creatures inside the area. It should use the same external-volume/per-recipient distinction already established for Web rather than a blanket caster-side Immunity gate.

## v0.4.80 — Phantasmal Force separates the external illusion from recipient-side Immunity

This checkpoint continues the deliberately small **recipient-first Immunity integration pass** and changes only the second-level Magic-User **Phantasmal Force** interaction. The printed spell creates or changes appearances inside a **20-foot × 20-foot × 20-foot** volume within **240 feet** and lasts only while the caster concentrates. A non-attack illusion disappears when touched; an illusory monster is AC 9 and disappears when hit; and an attack illusion gives its victim a Saving Throw vs. Spells. A successful save means the victim is unaffected and realizes that the attack is an illusion. The spell never inflicts real damage: apparent death produces unconsciousness and apparent petrification produces paralysis for 1d4 turns. Ninth-level **Immunity** gives its recipient total immunity to 1st-, 2nd-, and 3rd-level spells and may be deliberately lowered for one round.

The books do **not** give an explicit Phantasmal Force-versus-Immunity example, so this checkpoint uses the narrowest source-bounded interpretation consistent with both rules: **the phantasm is an external magical appearance that can continue to exist for other observers, while Immunity prevents the protected recipient from suffering the second-level spell's perceptual/consequence effect.**

### Immunity now applies to the observer/victim without erasing the shared phantasm

- Casting Phantasmal Force is not blocked merely because the caster has personal Immunity; the spell's 20-foot cube is not a buff placed on the caster.
- The active Phantasmal Force record is now tagged `immunityInteraction: 'external_illusion_recipient_effect'` and carries a separate `immuneObservers` collection.
- When a specifically represented creature protected by Immunity is the Phantasmal Force subject, the **illusion remains active**, but that creature is unaffected by the second-level spell. An attack illusion therefore does **not** roll the normal Saving Throw vs. Spells and cannot create the spell's unreal unconsciousness/paralysis consequence on that protected recipient.
- Immunity is **not** treated as a successful disbelief save. The creature is recorded in `immuneObservers`, not `recognizedBy`, because the Immunity text says the spell has no effect on the recipient but does not separately say that this automatically teaches the creature that the appearance is an illusion. That fictional recognition remains a referee/perception question unless the creature actually succeeds on Phantasmal Force's own save.
- If the recipient deliberately lowers Immunity for the casting/round, Phantasmal Force returns to its ordinary procedure: the normal spell save is rolled, and a failed save can create the usual unreal aftereffect. The ongoing Immunity spell itself remains in place and resumes normally.
- This checkpoint only resolves a **named represented subject**. It does not yet attempt a global observer sweep for every creature that might see an area illusion, nor does it invent line-of-sight/disbelief behavior for unrepresented observers.

### Validation

Two new deterministic regression groups raise the steady-state suite from **650 to 652 tests**. They verify that: (1) an Immunity-protected attack-illusion target does not roll the Phantasmal Force save, receives no unreal consequence, and does not cause the shared phantasm to vanish; and (2) deliberate Immunity suppression restores the normal save/consequence path without deleting the ongoing Immunity spell.

The exact final inline JavaScript passes `node --check`. The project's deterministic Node/minimal-DOM harness still performs its known one-time normalization on the first invocation; after that warm-up, the exact final build passed **652/652 tests for 3 consecutive runs** with state isolation preserved.

```text
Build: 0.4.80
Steady-state tests: 652 / 652 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean after one-time harness normalization warm-up
JavaScript syntax: clean
```

A fresh Chromium page/console validation is not claimed in this checkpoint; **v0.4.66 remains the latest fresh Chromium-validated baseline**.

### Next bounded checkpoint

The next small recipient-first Immunity item should be **Hold Portal**, confirming that its low-level magic is attached to the represented portal rather than to the caster or the creature later trying to open it, without broadening this pass into other second-level spells.

## v0.4.79 — Wizard Lock is portal magic, not a creature-side Immunity effect

This checkpoint continues the deliberately small **recipient-first Immunity integration pass** and changes only the second-level Magic-User **Wizard Lock** interaction. The printed spell has **Range 10'**, **Duration: Permanent**, and **Effect: One portal or lock**. It works on any lock, lasts until magically dispelled, can be opened temporarily by **Knock**, and can also be opened by the original caster or by a magic-using character/creature at least three levels/Hit Dice higher than the caster; those openings do not remove the magic, and the lock reasserts itself after the portal closes. Ninth-level **Immunity**, by contrast, protects its *recipient* from 1st–3rd-level spells and does not state that the recipient loses the ability to cast low-level magic on unrelated objects in the world.

### Wizard Lock now has an explicit external-world Immunity classification

v0.4.79 therefore hardens **Wizard Lock** as magic placed on the represented portal/lock rather than on the caster or on someone later trying to open the portal.

- **Personal Immunity on the caster does not prevent Wizard Lock from being cast.** The caster does not have to suppress Immunity to enchant a represented portal.
- The permanent `wizard_lock` effect is explicitly tagged `immunityInteraction: 'external_world_effect'` and `ignoreRawImmunityScaling: true`, so the common recipient-side Immunity scaler cannot accidentally shorten, suppress, or erase it merely because the caster is protected.
- **An Immunity-protected character trying to open a Wizard-Locked portal gains no special bypass and suffers no special prohibition.** The ordinary Wizard Lock authorization rule still decides the result: the original caster, Knock, or a magic-user/eligible creature at least three levels/Hit Dice higher can open it without dispelling the lock.
- An unnecessary `dropImmunity:true` request on the Wizard Lock cast is ignored for Immunity purposes. The external cast does not lower, suspend, or remove the caster's ninth-level protection.
- No change was made to **Knock**, **Dispel Magic**, relocking after closure, or the already-implemented persistent door-state cleanup. This checkpoint only closes the Immunity classification boundary.

This is the same distinction already used for **Knock**, **Floating Disc**, and **Ventriloquism**: a low-level spell that operates wholly on an external object/location is not itself a spell effect bestowed on the Immunity recipient.

### Validation

Two new deterministic regression groups raise the steady-state suite from **648 to 650 tests**. They verify that: (1) a personally Immunity-protected Magic-User can cast permanent Wizard Lock on a represented portal without lowering Immunity, and the effect retains its explicit external-world metadata; and (2) Immunity on a later door opener neither blocks a legitimately qualified opener nor bypasses the printed three-level qualification when the opener is under-qualified.

The exact final inline JavaScript passes `node --check`. The project's deterministic Node/minimal-DOM harness still performs its known one-time normalization on the first invocation; after that warm-up, the exact final build passed **650/650 tests for 3 consecutive runs** with state isolation preserved.

```text
Build: 0.4.79
Steady-state tests: 650 / 650 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean after one-time harness normalization warm-up
JavaScript syntax: clean
```

A fresh Chromium page/console validation is not claimed in this checkpoint; **v0.4.66 remains the latest fresh Chromium-validated baseline**.

### Next bounded checkpoint

The next small recipient-first Immunity item should be **Phantasmal Force**, because it is neither a simple personal buff nor a purely external object spell: it creates an illusion whose consequences are perceived by creatures. That interaction should be classified before applying a generic Immunity gate.

## v0.4.78 — Web now separates the external web volume from recipient-side Immunity

This checkpoint continues the deliberately small **recipient-first Immunity integration pass** and changes only the second-level Magic-User **Web** interaction. The printed Web procedure creates a **10-foot × 10-foot × 10-foot** mass of sticky strands within **10 feet** for **48 turns**; the strands normally block the affected area, great-strength creatures can break through in 2 rounds, average Strength 9–12 takes 2d4 turns, Gauntlets of Ogre Power permit escape in 4 rounds, and flame destroys the web in 2 rounds while burning creatures inside for 1d6 damage. Ninth-level **Immunity** gives its recipient total immunity to all 1st-, 2nd-, and 3rd-level spells and can be deliberately lowered for one round.

The books do not give a dedicated Web-versus-Immunity example, so this checkpoint keeps the interpretation narrow and anchored to those two printed facts: **Web creates a persistent external area, while Immunity protects a particular recipient from the second-level spell's direct effect**. The engine therefore no longer treats creation of the web and restraint of each creature as the same state transition.

### Web now has one shared area record plus recipient-specific restraint

v0.4.78 adds a represented `web_volume` state for the external strands and leaves the existing `web` state as the creature-specific restraint. In practical terms:

- **personal Immunity on the caster does not prevent Web from being created**, because the caster is not the recipient of the external 10-foot cube;
- the shared web volume is recorded for the full **48 turns** even when one or every represented creature in the initial target selection is protected by Immunity;
- every represented creature that would acquire the `webbed` restraint is checked **independently** against ordinary Immunity before the restraint state is written;
- an Immunity-protected creature receives no target-specific `web` effect and no `webbed` movement restriction from that casting, but its protection does **not** erase the external strands or cancel restraint on an unprotected creature in the same represented cube;
- a single protected target may deliberately accept Web with the existing `dropImmunity:true` / `allowThroughImmunity:true` path. For a multi-target Web, `dropImmunityFor` identifies exactly which protected recipient lowers Immunity, preventing one request from silently lowering every ward in the area;
- once a creature deliberately accepts Web while its Immunity is lowered, the existing accepted spell state remains when Immunity returns on the following round, matching the engine's already established treatment of beneficial low-level spells accepted during voluntary suppression;
- the external `web_volume` record stores the printed **10-foot cube**, **48-turn duration**, flame-destruction timing, and **1d6** burn metadata without fabricating a new saving throw or changing the existing Strength-based escape procedure;
- the target-specific Web effect links back to the shared volume so a later geometry/fire pass can reconcile contact, destruction, and trapped-creature cleanup without having to infer which web created the restraint.

This pass intentionally does **not** implement creatures entering an already-created Web after the casting moment, automatic collision/path blocking against the cube, the two-round flame-destruction sequence, or automated 1d6 burning of every creature physically inside the strands. Those are external-area lifecycle/geometry tasks and remain separate rather than being folded into this recipient-Immunity checkpoint.

### Validation

Three deterministic regression groups increase the steady-state core suite from **645 to 648 tests**. They verify: (1) personal Immunity on the caster does not suppress the external 48-turn Web volume or its restraint of an unprotected target; (2) an Immunity-protected creature in a mixed target selection does not receive the second-level restraint while another unprotected creature is still trapped and the shared web remains; and (3) multi-recipient voluntary suppression through `dropImmunityFor` lowers only the named recipient's ward, with Immunity returning on the next round without erasing the already accepted Web state.

The exact final `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The deterministic Node/minimal-DOM harness again showed the known one-time state/default normalization warm-up; after that warm-up, the exact final build passed **three consecutive isolated runs**:

```text
Build: 0.4.78
Tests: 648 / 648 passed
Failures: 0
State isolation: preserved
Runs after warm-up: 3 / 3 clean
JavaScript syntax: clean
```

This checkpoint does not claim a fresh Chromium page/console run. **v0.4.66 at 621/621** remains the latest fresh Chromium-validated baseline; later checkpoints, including v0.4.78, are additionally covered by exact-script syntax checks and the deterministic Node harness.

### Next small checkpoint

Review **Wizard Lock vs. ordinary Immunity** next. Like Knock, Wizard Lock acts on a portal rather than a creature, but the next pass should explicitly harden both sides of that distinction: personal Immunity should not stop a caster from placing Wizard Lock on a door, and a creature's personal Immunity should not by itself make that externally locked portal open for them.

## v0.4.77 — Knock is now explicitly classified as an external-world spell under ordinary Immunity

This checkpoint continues the deliberately small **recipient-first Immunity integration pass** and changes only the second-level Magic-User **Knock** interaction. Mentzer gives Knock a **60-foot range** and an **Effect: One lock or bar**. It opens normal or magically locked doors, found secret doors, gates, treasure chests, and barred doors; when Hold Portal or Wizard Lock is involved, the locking magic remains and can take effect again when the door closes. Ordinary ninth-level **Immunity**, by contrast, protects its **recipient** from 1st-, 2nd-, and 3rd-level spells and may be deliberately lowered by that recipient for one round.

### Knock now has an executable whole-external-world classification

The existing Knock handler already performed the correct physical portal procedure: it removed ordinary locking/bracing state, opened both a lock and bar when both were present, and temporarily bypassed Hold Portal/Wizard Lock without dispelling the underlying magic. What remained unaudited was whether later recipient-side Immunity refactoring could accidentally treat the protected **caster** as Knock's spell recipient simply because the caster was the character invoking the handler.

v0.4.77 adds a small common classification for spells whose entire represented effect is external to creatures:

- `Floating Disc`, `Knock`, and `Ventriloquism` are now recognized by `rawImmunitySpellIsWhollyExternalWorld` as **whole external-world spells**;
- `rawImmunityNegatesSpellForSubject` returns before recipient-side Immunity suppression or negation for those spells, so personal Immunity cannot accidentally cancel them;
- the Knock handler deliberately routes through that common Immunity query before altering the represented portal. This makes the classification executable rather than merely documentary and ensures a future generic low-level spell gate cannot silently break Knock;
- because the return happens **before** voluntary suppression handling, an unnecessary `dropImmunity:true` request does not lower personal Immunity merely to cast Knock;
- Knock continues to alter the represented **lock/bar/gate/chest/door**, not the caster and not a creature standing near or carrying the portal;
- the existing Hold Portal/Wizard Lock behavior is unchanged: Knock bypasses the magical closure for the represented opening window but does **not** erase the persistent locking spell;
- mixed-target spells such as Light/Continual Light are intentionally **not** placed in the whole-external set because their creature-directed eye forms and object/area forms have different Immunity interactions.

No Knock range/geometry expansion, artifact Knock change, Hold Portal rewrite, Wizard Lock rewrite, or unrelated second-level spell is included in this checkpoint. The existing site-mode representation remains the deterministic requirement for selecting the affected lock/bar/portal.

### Validation

Two deterministic regression groups increase the steady-state core suite from **643 to 645 tests**. They verify: (1) a Magic-User protected by personal Immunity can still use Knock to open a represented normal lock/bar while the ninth-level ward remains active; and (2) the same external-world classification remains in force when Knock is used against a represented Wizard Lock, including an unnecessary `dropImmunity:true` request, while the original Wizard Lock effect remains present and is only temporarily bypassed rather than dispelled.

The exact final `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The deterministic Node/minimal-DOM harness again showed the known one-time state/default normalization warm-up; after that warm-up, the exact final build passed **three consecutive isolated runs**:

```text
Build: 0.4.77
Tests: 645 / 645 passed
Failures: 0
State isolation: preserved
Runs after warm-up: 3 / 3 clean
JavaScript syntax: clean
```

This checkpoint does not claim a fresh Chromium page/console run. **v0.4.66 at 621/621** remains the latest fresh Chromium-validated baseline; later checkpoints, including v0.4.77, are additionally covered by exact-script syntax checks and the deterministic Node harness.

### Next small checkpoint

Review **Web vs. ordinary Immunity** next. Unlike Knock, Web creates an external area but directly restrains creatures that contact it, so the next pass should determine whether Immunity changes the web's creation, only the protected creature's restraint, or neither under the printed wording before any code is broadened.

## v0.4.76 — Locate Object now respects ordinary Immunity on the sensing caster

This checkpoint continues the deliberately small **recipient-first Immunity integration pass** and changes only the low-level **Locate Object** procedure. The Magic-User/Elf form is a **second-level** spell with a range of **60 feet + 10 feet per caster level**, lasts **2 turns**, and points toward the nearest designated object within range without revealing distance. The Cleric form is a **third-level**, **range-0** spell lasting **6 turns** that senses one known object within **120 feet**, likewise giving direction rather than distance and explicitly not locating creatures. Ordinary ninth-level **Immunity** gives its recipient total immunity to all 1st-, 2nd-, and 3rd-level spells unless that recipient deliberately lowers the protection for the round.

### Locate Object's information recipient is now gated before any search occurs

Locate Object names an object as the thing being sought, but its operative magical benefit is directional information delivered to the spellcaster. This is especially explicit in the Cleric form: its printed **Range: 0** means the spell is used on the caster, while its Effect line separately identifies the object detected within 120 feet. The Magic-User form reaches outward farther as the caster gains levels, but the spell still "points" the caster toward the object rather than altering the object or its carrier.

The previous handler already modeled the two class versions, represented-object search, nearest matching carried/site object, direction-not-distance result, and the existing Prismatic green/violet detection barrier. It did not ask whether the **sensing caster** was protected by ordinary Immunity before creating the informational state and searching represented objects.

v0.4.76 adds only that missing bridge:

- the engine validates that the player supplied an object description, then evaluates `rawImmunityNegatesSpellForSubject` on the **caster before any represented object search is performed**;
- an Immunity-protected Magic-User/Elf therefore gains **no second-level Locate Object state or directional information**;
- the same gate applies to the **third-level Cleric** form because it is also within Immunity's total-negation band;
- the object being sought is **not** treated as the spell recipient. Immunity on a creature merely carrying the object does not turn that carried object into an anti-detection ward; the spell's recipient-side Immunity check remains on the caster who receives the sensing benefit;
- no saving throw, shortened duration, or reduced range is invented, because 1st- through 3rd-level spells are completely negated rather than partially reduced;
- `dropImmunity:true` / `allowThroughImmunity:true` uses the existing voluntary-suppression path. A protected caster who deliberately accepts the spell receives its full normal effect;
- for the Magic-User/Elf form, the existing level-scaled range and **2-turn** duration are unchanged; for the Cleric form, the existing **120-foot** sensing limit and **6-turn** duration are unchanged;
- accepting Locate Object does not dispel or consume the ninth-level Immunity spell. The ward resumes after the bounded suppression window;
- the previously implemented Prismatic Wall detection check remains separate and unchanged. A caster who successfully has Locate Object active still cannot sense a represented object through a surviving green detection-blocking layer (or violet general-magic layer).

No artifact Locate Object power, unrelated detection spell, or object-location rule is changed in this checkpoint.

### Validation

Two deterministic regression groups increase the defined core suite from **641 to 643 tests**. They verify: (1) an Immunity-protected Magic-User receives no `locate_object` information state when attempting the second-level spell while Immunity remains active; and (2) deliberate suppression allows an Immunity-protected Cleric to receive the complete **6-turn, 120-foot** third-level Locate Object sensing state while preserving the continuing ninth-level Immunity ward.

The exact final `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The deterministic Node/minimal-DOM harness showed the same one-time state-default normalization warm-up seen in recent checkpoints; after that warm-up, the complete core suite passed **three consecutive times**:

```text
Build: 0.4.76
Tests: 643 / 643 passed
Failures: 0
State isolation: preserved
Runs after warm-up: 3 / 3 clean
JavaScript syntax: clean
```

This checkpoint does not claim a fresh Chromium page/console run. Local headless Chromium did not complete the page load within the available execution window, so **v0.4.66 at 621/621** remains the latest fresh Chromium-validated baseline; v0.4.67-v0.4.76 are additionally covered by exact-script syntax checks and the deterministic Node harness.

### Next small checkpoint

Review **Knock vs. ordinary Immunity** next as a bounded external-world classification. Knock acts on a represented lock, bar, gate, chest, or door rather than bestowing a personal spell state on the caster, so it can be audited without expanding into unrelated second-level control or area spells.

## v0.4.75 — Levitate now respects ordinary Immunity

This checkpoint continues the deliberately small **recipient-first Immunity integration pass** and changes only the second-level Magic-User **Levitate** procedure. The spell has **range 0**, lasts **6 turns + 1 turn per caster level**, affects **the spellcaster only**, and permits vertical movement at **20 feet per round** without self-propelled lateral movement; sideways travel requires pushing or pulling against a surface. Ordinary ninth-level **Immunity** gives its recipient total immunity to all 1st-, 2nd-, and 3rd-level spells unless that recipient deliberately lowers the protection for the round.

### The self-only movement state is now gated before commit

The existing Levitate handler already created the level-scaled duration, 20-foot-per-round vertical movement, and push/pull-only lateral restriction. It did not, however, ask whether the caster was currently protected by ordinary Immunity before committing that personal movement state.

v0.4.75 adds only that missing bridge:

- `rawImmunityNegatesSpellForSubject` now evaluates the **caster**, who is also Levitate's sole recipient, before the engine creates either the active `levitate` spell record or the linked `rawLevitate` movement state;
- an Immunity-protected caster therefore gains **no levitation movement at all** from the second-level spell;
- no shortened duration or reduced movement rate is invented, because Immunity totally negates qualifying 1st- through 3rd-level spells rather than partially reducing them;
- `dropImmunity:true` / `allowThroughImmunity:true` uses the existing voluntary-suppression path. If the caster deliberately accepts Levitate, the full **6 + caster level turns** and **20 feet per round** vertical rate apply;
- accepting Levitate does not dispel or consume the ninth-level Immunity spell. The ward remains in force after the bounded voluntary suppression window;
- the existing Levitate movement restrictions are otherwise unchanged. The spell still provides no self-propelled horizontal movement.

No other movement spell or second-level spell handler is changed in this checkpoint.

### Validation

Two deterministic regression groups increase the defined core suite from **639 to 641 tests**. They verify: (1) active Immunity prevents both the active Levitate record and linked vertical-movement state from being created while leaving Immunity intact; and (2) voluntary Immunity suppression permits the full level-scaled spell, including the printed 20-foot-per-round vertical rate and the push/pull-only lateral restriction, while preserving the continuing Immunity ward.

The exact final `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The deterministic Node/minimal-DOM harness was then executed over the final script logic; after the isolated runner's one-time state-default normalization warm-up, the complete core suite passed **three consecutive times**:

```text
Build: 0.4.75
Tests: 641 / 641 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
JavaScript syntax: clean
```

This checkpoint does not claim a fresh Chromium page/console run. The latest fresh Chromium-validated baseline remains **v0.4.66 at 621/621**; v0.4.67-v0.4.75 are additionally covered by the deterministic Node harness and syntax validation.

### Next small checkpoint

Review **Locate Object vs. ordinary Immunity** next. Its Magic-User/Elf form and Cleric form are both low-level information spells centered on the caster's sensing ability, so they can be audited as one bounded recipient-gating change without expanding into unrelated object-location or Prismatic geometry work.

## v0.4.74 — Mirror Image now respects ordinary Immunity

This checkpoint continues the deliberately small **recipient-first Immunity integration pass** and changes only the second-level Magic-User **Mirror Image** procedure. The spell has **range 0**, lasts **6 turns**, affects **the spellcaster only**, and creates **1d4 additional images** that remain within 3 feet of the caster. Successful ordinary attacks remove images before they can harm the caster, while an area attack removes the images and still affects the real caster. Ordinary ninth-level **Immunity** gives its recipient total immunity to all 1st-, 2nd-, and 3rd-level spells unless that recipient deliberately lowers the protection for the round.

### The self-only image state is now gated before the 1d4 roll

The existing Mirror Image handler already created the printed 1d4 false images for six turns and fed them into the common attack/damage paths. It did not, however, ask whether the caster was currently protected by ordinary Immunity before committing that personal spell state.

v0.4.74 adds only that missing bridge:

- `rawImmunityNegatesSpellForSubject` now evaluates the **caster**, who is also Mirror Image's sole recipient, before the engine rolls the number of images or creates the six-turn `mirror_image` record;
- an Immunity-protected caster therefore gains **no false images at all** from the second-level spell;
- no saving throw or partial image count is invented, because Immunity totally negates qualifying 1st- through 3rd-level spells rather than reducing them;
- `dropImmunity:true` / `allowThroughImmunity:true` uses the existing voluntary-suppression path. If the caster deliberately accepts Mirror Image, the normal **1d4 images for the full six turns** are created;
- accepting Mirror Image does not dispel or consume the ninth-level Immunity spell. The ward remains in force after the bounded voluntary suppression window;
- the already-implemented attack behavior is unchanged once Mirror Image exists: ordinary successful attacks consume images one at a time and represented area attacks remove all remaining images.

No other second-level spell handler is changed in this checkpoint.

### Validation

Two deterministic regression groups increase the defined core suite from **637 to 639 tests**. They verify: (1) active Immunity prevents any Mirror Image record from being created on the protected caster while leaving Immunity intact; and (2) voluntary Immunity suppression permits the full six-turn spell with a legal **1d4** image count while preserving the continuing Immunity ward.

The exact final `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic core harness was then executed against the exact final script in the isolated Node/minimal-DOM environment **three consecutive times**:

```text
Build: 0.4.74
Tests: 639 / 639 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
JavaScript syntax: clean
```

This checkpoint does not claim a fresh Chromium page/console run. The latest fresh Chromium-validated baseline remains **v0.4.66 at 621/621**; v0.4.67-v0.4.74 are additionally covered by the exact-script deterministic Node harness and syntax validation.

### Next small checkpoint

Review **Levitate vs. ordinary Immunity** as the next bounded second-level self-only spell. Its persistent movement state can be gated before commit without expanding this pass into unrelated movement or aerial-combat rules.

## v0.4.73 — Protection from Evil 10' Radius now applies Immunity per recipient

This checkpoint keeps the Immunity work narrow and changes only the shared **Protection from Evil 10' Radius** procedure. The Magic-User/Elf form is a **third-level** spell; the Cleric form is **fourth-level**. The printed effect is not a one-recipient buff: it creates an invisible **10-foot-radius moving barrier around the caster for 12 turns**, and creatures currently within that barrier receive the saving-throw bonus, opposed-alignment attack penalty, and enchanted-creature melee-contact protection. Ordinary ninth-level **Immunity** protects its own recipient from lower-level spell effects, so the correct integration boundary is the creature currently receiving the barrier's benefit rather than the existence or duration of the shared barrier itself.

### The barrier now exists independently of any one beneficiary

The old implementation treated the two class forms inconsistently. The Magic-User form stored one area effect on the caster but did not filter individual beneficiaries through Immunity, while the Cleric form duplicated one active effect for every creature standing inside the radius at cast time. That duplicated representation also allowed one recipient's Immunity to scale the duration of what is actually a shared moving barrier.

v0.4.73 replaces that with one common area representation:

- both class forms now create **one 12-turn barrier record centered on the caster**;
- the barrier itself is marked as external area magic for Immunity purposes and is not cancelled or shortened merely because the caster or another creature inside it has Immunity;
- each creature is checked dynamically when the engine asks whether that creature receives the radius protection;
- for the **third-level Magic-User/Elf form**, active Immunity gives a scalar of zero to that creature, so it receives **no +1 saving-throw bonus, no -1 protection against opposed-alignment attack rolls, and no enchanted-creature melee-contact block** while Immunity remains active;
- another creature's Immunity does not cancel the barrier. Unprotected creatures standing within 10 feet continue to receive the spell normally;
- if a third-level recipient lowers Immunity for the current combat round, the already-existing barrier immediately protects that recipient for that round. When Immunity automatically returns on the following round, the radius benefits are suppressed again without destroying the barrier;
- the **fourth-level Cleric form** now evaluates the recipient's ordinary Immunity as a one-half spell-effect scalar without shortening the shared barrier. Its printed +1 saving-throw bonus and -1 enemy attack penalty both remain one point after fractional reduction is rounded in the protected recipient's favor, and the non-quantified enchanted-contact barrier remains represented. The area record still lasts the printed 12 turns.

The contact-breaking rule remains geometric and shared. If anyone physically inside the barrier attacks a particular enchanted creature, that creature is added to the barrier's existing broken-contact list as before. Immunity changes whether a particular subject receives the barrier's protection; it does not rewrite who is standing inside the magical boundary.

This also **supersedes the older v0.4.50 regression assumption** that a Cleric protected by Immunity should reduce the entire fourth-level radius barrier to six turns. That behavior incorrectly treated a moving area spell as if its caster-targeted storage record were the sole spell recipient. The deterministic regression has been updated to require one full 12-turn barrier plus per-recipient half-effect classification instead.

### Validation

Three new deterministic regression groups increase the defined core suite from **634 to 637 tests**. They verify: (1) an Immunity-protected Magic-User caster can still create the third-level moving barrier while personally receiving none of its benefits and leaving an unprotected ally protected; (2) a protected ally gains the existing radius benefits only during a combat round in which that ally actually suppresses Immunity, with the benefits disappearing again when Immunity returns; and (3) the fourth-level Cleric form creates only one full 12-turn barrier, reports a one-half Immunity scalar for the protected recipient, and preserves the printed +1/-1/contact protections after recipient-favorable rounding.

The exact final `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic core harness was then executed against the exact final script in the isolated Node/minimal-DOM environment **three consecutive times**:

```text
Build: 0.4.73
Tests: 637 / 637 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
JavaScript syntax: clean
```

This checkpoint does not claim a fresh Chromium page/console run. The latest fresh Chromium-validated baseline remains **v0.4.66 at 621/621**; v0.4.67-v0.4.73 are additionally covered by the exact-script deterministic Node harness and syntax validation.

### Next small checkpoint

Review **Mirror Image vs. ordinary Immunity** as the next bounded second-level self-protection case. That can be completed without reopening the radius-area logic or combining unrelated spell families in the same pass.

## v0.4.72 — Water Breathing now respects ordinary Immunity

This checkpoint continues the deliberately small **recipient-first Immunity integration pass** and changes only the third-level Magic-User **Water Breathing** procedure. The spell has a **30-foot range**, lasts **one day (24 hours)**, and affects **one air-breathing creature**. It lets that recipient breathe underwater at any depth without altering movement and without interfering with ordinary air breathing. The existing ninth-level **Immunity** procedure gives its recipient total immunity to 1st-, 2nd-, and 3rd-level spells unless that recipient deliberately lowers the protection for the round.

### The one-day breathing state is now gated before commit

The existing Water Breathing handler already enforced its represented 30-foot combat range, one-day duration, underwater-breathing predicate, any-depth flag, unchanged-movement flag, and continued air-breathing flag. It did not, however, ask whether the intended recipient was protected by ordinary Immunity before writing the persistent `water_breathing` record.

v0.4.72 adds only that missing bridge:

- target selection and represented combat range still resolve before the new Immunity check;
- `rawImmunityNegatesSpellForSubject` now evaluates the **recipient** before any one-day Water Breathing state is created;
- an Immunity-protected recipient receives **no** `water_breathing` record and therefore does not acquire the engine's underwater-breathing predicate from this spell;
- no saving throw is invented, because Immunity totally negates qualifying 1st- through 3rd-level magic rather than granting an additional save;
- `dropImmunity:true` / `allowThroughImmunity:true` uses the existing voluntary-suppression path. If the recipient deliberately allows Water Breathing through, the complete one-day effect is created;
- successful casting still preserves the spell's existing source-bounded semantics: breathing works at any depth, movement is unchanged, and breathing ordinary air remains possible;
- the underlying ninth-level Immunity spell is not removed by accepting the beneficial spell and resumes normally after the voluntary suppression window.

No other spell handler is changed in this checkpoint. The existing air-breathing-recipient classification is also left as a separate validation concern rather than broadening this pass beyond the intended Immunity bridge.

### Validation

Two deterministic regression groups increase the defined core suite from **632 to 634 tests**. They verify: (1) an Immunity-protected recipient gains no `water_breathing` state and therefore no spell-granted underwater-breathing predicate; and (2) deliberate Immunity suppression allows the full one-day, any-depth Water Breathing effect through while preserving unchanged movement, continued air breathing, and the ongoing ninth-level Immunity ward.

The exact final `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic core harness was then executed against the exact final script in the isolated Node/minimal-DOM test environment **three consecutive times**, after the same one-time startup/default normalization used by the preceding checkpoints:

```text
Build: 0.4.72
Tests: 634 / 634 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
JavaScript syntax: clean
```

This checkpoint does not claim a fresh Chromium page/console run. The latest fresh Chromium-validated baseline remains **v0.4.66 at 621/621**; v0.4.67-v0.4.72 are additionally covered by the exact-script deterministic Node harness and syntax validation.

### Next small checkpoint

Review **Protection from Evil, 10' Radius** against ordinary Immunity as a bounded area-effect case. Unlike the single-recipient protections just completed, its benefits are applied through a moving barrier and need per-recipient classification rather than blindly reusing the one-target gate.

## v0.4.71 — Protection from Normal Missiles now respects ordinary Immunity

This checkpoint continues the deliberately small **recipient-first Immunity integration pass** and changes only the third-level Magic-User **Protection from Normal Missiles** procedure. The spell is a **30-foot-range**, **12-turn** protection bestowed on **one creature**; while active, small nonmagical missiles automatically miss, while magical missiles and large projectiles remain unaffected. The existing ninth-level **Immunity** procedure gives its recipient total immunity to 1st-, 2nd-, and 3rd-level spells unless that recipient deliberately lowers the protection for the round.

### The missile ward is now gated before persistent state is created

The existing Protection from Normal Missiles handler already enforced its represented 30-foot combat range, 12-turn duration, and the live distinction between ordinary small missiles versus magical or large missiles. It did not, however, ask whether the intended recipient was protected by ordinary Immunity before creating the `protection_normal_missiles` record.

v0.4.71 adds only that missing bridge:

- target selection and represented combat range still resolve first;
- after those validity checks, `rawImmunityNegatesSpellForSubject` evaluates the **recipient** before any 12-turn protection state is committed;
- an Immunity-protected creature receives **no** Protection from Normal Missiles effect, so the ordinary missile-blocking predicate does not see a phantom or zero-value ward;
- no extra saving throw is created, because Immunity totally negates qualifying 1st- through 3rd-level magic rather than granting another save;
- `dropImmunity:true` / `allowThroughImmunity:true` uses the existing voluntary-suppression path. If the recipient deliberately allows the spell through, the full 12-turn ward is created;
- the ordinary ward's scope is unchanged after successful casting: small nonmagical missiles are stopped, but magical missiles and large/siege projectiles remain outside this spell's protection;
- the underlying ninth-level Immunity spell is not removed by accepting the beneficial spell and resumes normally after the voluntary suppression window.

No other third-level spell handler is changed in this checkpoint.

### Validation

Two deterministic regression groups increase the defined core suite from **630 to 632 tests**. They verify: (1) an Immunity-protected recipient gains no `protection_normal_missiles` state and therefore no small-missile blocking from the third-level spell; and (2) deliberate Immunity suppression allows the complete 12-turn ward through while preserving its normal/nonmagical versus magical/large missile distinctions and the continuing ninth-level Immunity effect.

The exact final `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic core harness was then executed against the exact final script in the isolated Node/minimal-DOM test environment **three consecutive times**, after the same one-time startup/default normalization used by the preceding checkpoints:

```text
Build: 0.4.71
Tests: 632 / 632 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
JavaScript syntax: clean
```

This checkpoint does not claim a fresh Chromium page/console run. The latest fresh Chromium-validated baseline remains **v0.4.66 at 621/621**; v0.4.67-v0.4.71 are additionally covered by the exact-script deterministic Node harness and syntax validation.

### Next small checkpoint

Apply the same recipient-first low-level Immunity gate to **Water Breathing**. That is another bounded third-level, one-recipient protection effect and can be handled without expanding into unrelated spell families.

## v0.4.70 — Infravision now respects ordinary Immunity

This checkpoint continues the deliberately small **recipient-first Immunity integration pass** and changes only the third-level Magic-User **Infravision** procedure. Mentzer defines Infravision as a **touch-range**, **one-day** spell affecting **one living creature** and granting 60-foot heat vision in darkness. The existing ninth-level **Immunity** procedure gives its recipient total immunity to 1st-, 2nd-, and 3rd-level spells unless that recipient deliberately lowers the protection for the round.

### The one-day sensory state is now gated before commit

The old Infravision handler already enforced the printed living-creature requirement, touch range in represented combat, one-day duration, 60-foot range, heat-vision semantics, and interference from normal or magical light. It did not, however, ask whether the intended recipient was protected by ordinary Immunity before writing the one-day `infravision` state.

v0.4.70 adds that one missing bridge:

- target validity still resolves first: a dead creature remains an invalid recipient and represented combat still requires touch range;
- after those source-validity checks, the common `rawImmunityNegatesSpellForSubject` gate now evaluates the **recipient** before any persistent sensory state is created;
- an Immunity-protected creature receives **no** `infravision` effect and therefore gains no temporary 60-foot heat vision from the spell;
- no saving throw is invented, because the Master Immunity spell completely negates qualifying 1st- through 3rd-level magic rather than granting an additional save;
- `dropImmunity:true` / `allowThroughImmunity:true` continues to use the existing voluntary-suppression path. When the recipient deliberately allows the spell through, the full one-day Infravision effect is created and the underlying Immunity spell remains in place afterward;
- innate racial infravision is untouched. A dwarf or elf does not lose a natural class/racial sense merely because an Immunity spell is active; only the **third-level spell effect** is gated.

No other third-level spell handler is changed in this checkpoint.

### Validation

Two deterministic regression groups increase the defined core suite from **628 to 630 tests**. They verify: (1) an Immunity-protected recipient gains no one-day Infravision state; and (2) deliberate Immunity suppression allows the complete 60-foot, one-day heat-vision effect through while preserving the ongoing Immunity ward.

The exact final `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic core harness was then executed against the exact final script in the isolated Node/minimal-DOM test environment **three consecutive times**, after the same one-time startup/default normalization used by the preceding checkpoints:

```text
Build: 0.4.70
Tests: 630 / 630 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
JavaScript syntax: clean
```

This checkpoint does not claim a fresh Chromium page/console run. The latest fresh Chromium-validated baseline remains **v0.4.66 at 621/621**; v0.4.67-v0.4.70 are additionally covered by the exact-script deterministic Node harness and syntax validation.

### Next small checkpoint

Apply the same recipient-first low-level Immunity gate to **Protection from Normal Missiles**. That is another bounded third-level, one-recipient effect and can be completed without expanding into area protection or Water Breathing in the same pass.

## v0.4.69 — Invisibility 10' Radius now applies Immunity per recipient

This checkpoint keeps the **Immunity** integration narrow and applies it only to the third-level Magic-User **Invisibility 10' Radius** procedure. Mentzer's spell makes the named recipient and every other creature within 10 feet invisible at the instant of casting; a non-anchor recipient that later moves more than 10 feet from the named recipient becomes visible and cannot regain the spell merely by returning. The invisibility otherwise follows ordinary Invisibility, including carried equipment and the attack/spell break condition. Mentzer's ninth-level **Immunity** gives the protected creature total immunity to 1st-, 2nd-, and 3rd-level spells and allows that creature to deliberately lower the protection for a round.

### Area resolution now gates each creature independently

The old handler gathered every represented creature in the initial 10-foot area and wrote an `invisibility_10_radius` effect to all of them without asking whether an individual recipient was protected by Immunity. v0.4.69 changes only that commit step.

- Every represented creature in the initial area is checked independently through the common low-level Immunity gate before an invisibility record is created.
- An Immunity-protected creature receives **no** radius-invisibility state, while unprotected creatures in the same casting still receive the spell normally.
- This remains true when the protected creature is the **named radius recipient**. Its personal Immunity does not function like an Anti-Magic Shell and therefore does not cancel the area spell for nearby creatures; those creatures can still receive invisibility while the named recipient remains visible.
- Existing radius behavior is unchanged for creatures that actually receive the spell: carried gear becomes invisible, attacking or casting a spell breaks the recipient's invisibility, and a non-anchor recipient that moves more than 10 feet from the named recipient becomes visible and cannot regain the spell by returning.
- No saving throw is invented. Immunity is resolved before persistent state is written, exactly as with the other completely negated 1st- through 3rd-level recipient effects.

### Voluntary Immunity suppression is local to the creature choosing it

A multi-recipient spell made the existing single `dropImmunity:true` order flag potentially ambiguous. v0.4.69 deliberately prevents that flag from lowering every protected creature's ward merely because all of them happen to stand in the same area.

- `dropImmunity:true` / `allowThroughImmunity:true` on this spell applies to the **named radius recipient** only.
- Additional protected creatures may be explicitly named through the bounded `dropImmunityFor` order field when their own protection is also meant to be lowered.
- A protected bystander does not lose Immunity because another recipient chose to suppress it.
- In combat, a creature that deliberately lowers Immunity remains unprotected for that round and its existing Immunity automatically returns on the following round, preserving the already-live Master spell lifecycle.

This is an engine-ordering clarification, not a new spell rule: the spell's 120-foot targeting range, 10-foot initial inclusion radius, permanent-until-broken duration, carried-item behavior, and movement break logic are unchanged.

### Validation

Two deterministic regression groups increase the defined core suite from **626 to 628 tests**. They verify: (1) an Immunity-protected **radius recipient** remains visible while unprotected creatures inside the same initial 10-foot area still become invisible; and (2) deliberate suppression by the named recipient allows that recipient to receive the area spell without lowering a different nearby creature's Immunity, which then remains fully protected.

The exact final `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic core harness was then executed against the exact final script in the isolated Node/minimal-DOM test environment **three consecutive times** after the same one-time startup-default normalization used by the preceding checkpoints:

```text
Build: 0.4.69
Tests: 628 / 628 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
JavaScript syntax: clean
```

This checkpoint does not claim a new Chromium page/console run. The latest fresh Chromium-validated baseline remains **v0.4.66 at 621/621**; v0.4.67-v0.4.69 are covered by the exact-script deterministic Node harness in addition to syntax validation.

### Next small checkpoint

Apply the same recipient-first low-level Immunity gate to ordinary third-level **Infravision**. That pass can stay bounded to the one-day, touch-range creature effect without expanding into other third-level spells.

## v0.4.68 — Ordinary Invisibility now respects recipient Immunity

This checkpoint keeps the low-level **Immunity** integration deliberately narrow and applies it to the ordinary second-level Magic-User **Invisibility** spell only. Invisibility has a **240-foot range**, affects **one creature or object**, and is **permanent until broken**; a creature's carried and worn items share the invisibility, and the creature remains invisible until it attacks or casts a spell. Ninth-level **Immunity** gives its recipient total immunity to **1st-, 2nd-, and 3rd-level spells**, with the printed option to concentrate and lower the protection for one round when the recipient deliberately wants a spell to affect it.

### Creature-targeted Invisibility is gated before persistent state is created

The represented-creature branch now calls the common `rawImmunityNegatesSpellForSubject` gate after target/range/Appear-lock validation but **before** `recordActiveSpellEffect` creates the permanent invisibility record.

- An Immunity-protected creature does **not** gain an `invisibility` effect from the second-level spell.
- No hidden zero-effect/persistent record is left behind for later visibility predicates to misread.
- The existing attack/spell break lifecycle is unchanged for recipients that actually receive Invisibility.
- The existing **Appear** one-turn invisibility suppression and 240-foot combat range checks remain earlier target-validity gates and are not bypassed by this change.
- `dropImmunity:true` / `allowThroughImmunity:true` continues to use the common voluntary-suppression path. In noncombat resolution the protection is suppressed only long enough for the casting; in combat it is dropped for that round and then returns automatically.
- After voluntary suppression, the full ordinary Invisibility effect is created: no finite expiration, carried/worn gear shares the effect, and attacking or casting a spell breaks it.

### Object-target boundary remains explicit

The source also permits Invisibility to affect one **object**, including the printed touch/drop handling for unattached invisible objects. The current deterministic ordinary-spell handler intentionally requires a represented creature target because the engine does not yet have a general unattached-object visibility lifecycle. v0.4.68 therefore does **not** fabricate an Immunity interaction for an unrepresented object. Personal Immunity is only consulted when a represented creature is actually the spell recipient.

### Validation

Two deterministic regression groups increase the defined core suite from **624 to 626 tests**. They verify: (1) second-level Invisibility is completely negated before any persistent invisibility state is created on an Immunity-protected creature; and (2) deliberate Immunity suppression allows the complete permanent-until-broken Invisibility state through while leaving the ongoing Immunity spell intact.

The exact final `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic core harness was then executed against the exact final script in an isolated Node runtime with a minimal DOM shim **three consecutive times**:

```text
Build: 0.4.68
Tests: 626 / 626 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
JavaScript syntax: clean
```

As in v0.4.67, this checkpoint does not substitute the Node harness for a browser page/console claim. The last fresh Chromium-validated baseline remains **v0.4.66 at 621/621**; all v0.4.67–0.4.68 deterministic engine tests are additionally covered by the isolated exact-script harness described above.

### Next small checkpoint

Review **Invisibility 10' Radius** against ordinary Immunity as one bounded third-level multi-recipient spell. The key question is per-recipient gating: each represented creature receiving the area invisibility should be checked independently, without silently treating one protected creature as cancelling the entire spell for everyone else.

## v0.4.67 — Immunity targeting split for Continual Light and Continual Darkness

This checkpoint applies the same bounded recipient-versus-external distinction from v0.4.66 to **Continual Light / Continual Darkness**. Under the BECMI spell text, Continual Light is a permanent 60-foot-diameter globe that may be placed on an object, but when aimed at a creature's eyes it instead creates a saving-throw branch that can permanently blind the victim. The reversed Continual Darkness creates a permanent 30-foot-radius darkness that defeats ordinary light and infravision and likewise can blind when aimed at the eyes. Ninth-level **Immunity** completely negates 1st- through 3rd-level spell effects on its recipient unless the recipient deliberately lowers the protection for the round.

### Eye-directed permanent blindness now stops at Immunity before the save

The two offensive eye-targeting branches now call the common low-level Immunity gate before any Spell saving throw or blindness state is written.

- **Continual Light at the eyes** is completely negated by active Immunity. The target is not blinded, and because the spell never reaches its saving-throw branch, the engine does not manufacture the normal successful-save fallback globe at the target location.
- **Continual Darkness at the eyes** follows the same order of operations: Immunity negates the low-level recipient effect before the save, so neither permanent blindness nor the successful-save fallback darkness is created.
- The shared implementation is class-aware. Continual Light / Continual Darkness is second level for Magic-Users and third level for Clerics, and both lie inside Immunity's total-protection band. The regression coverage deliberately exercises Magic-User Continual Light and Cleric Continual Darkness.
- The existing voluntary Immunity-suppression mechanism remains available where the protected recipient actually chooses to lower the defense for that round; this checkpoint does not invent a new bypass.

### Permanent object-carried volumes remain external world effects

The ordinary non-eye use of Continual Light may be attached to an object. As with ordinary Light/Darkness, this engine represents the enchanted moving object by using a creature as the carrier anchor; that carrier is not treated as the recipient of the spell itself.

- moving **Continual Light** records are now explicitly marked `ignoreRawImmunityScaling:true` and `immunityInteraction:'external_world_effect'`;
- moving **Continual Darkness** records carry the same external-world classification while retaining their 30-foot radius, infravision blocking, and ordinary-light blocking flags;
- the static fallback globe/darkness created after a successful eye-target save is also classified as an external world effect;
- personal Immunity on the represented carrier does not cancel, shorten, or require suppression for these permanent object-carried volumes;
- the permanent spell representation continues to use `expiresAbsoluteMinute:null`, the engine's established marker for an effect with no finite expiration.

This is intentionally a targeting classification pass. It does not broaden arbitrary free-standing point placement, universal object inventory anchoring, or every Dispel Magic discovery path.

### Validation

Three new deterministic regression groups increase the defined core suite from **621 to 624 tests**. They verify: (1) Immunity negates Magic-User Continual Light at the eyes before either permanent blindness or its save-fallback globe is created; (2) Immunity negates Cleric Continual Darkness at the eyes before either permanent blindness or its save-fallback darkness is created; and (3) an Immunity-protected carrier can anchor permanent Continual Light and Continual Darkness while the effects retain their external-world classification and the carrier's Immunity remains active.

The exact final `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic core harness was also executed against the exact final script in an isolated Node runtime with a minimal DOM shim. After the same startup-default normalization that normal browser boot performs, the full suite passed with state isolation preserved:

```text
Build: 0.4.67
Tests: 624 / 624 passed
Failures: 0
State isolation: preserved
JavaScript syntax: clean
```

The installed headless Chromium in this execution environment currently refuses both loopback HTTP and local-file navigation, returning `chrome-error://chromewebdata/`; therefore this checkpoint does **not** claim a fresh Chromium page/console-error run. The last browser-validated baseline remains v0.4.66 at 621/621. This limitation is recorded rather than replacing it with an unverified browser claim.

### Next small checkpoint

Review **Invisibility** against ordinary Immunity as one bounded second-level recipient effect: casting it directly on an Immunity-protected creature should be gated before the persistent invisibility state is created, while keeping the existing voluntary recipient-suppression path intact.

## v0.4.66 — Immunity targeting split for Light and Darkness

This checkpoint keeps the low-level **Immunity** pass bounded to the first-level **Light / Darkness** family. Mentzer distinguishes two materially different uses of Light: it may be cast on an **object**, in which case the 30-foot-diameter light moves with that object, or it may be cast at a **creature's eyes**, in which case the creature makes a saving throw and can be blinded. The reversed **Darkness** keeps the same range, duration, saving throw, and area unless otherwise specified; when aimed at an opponent's eyes it likewise causes blindness, while its ordinary form is a 30-foot-diameter darkness volume through which infravision still works. Ninth-level **Immunity** gives its recipient total immunity to 1st-, 2nd-, and 3rd-level spells unless the protection is deliberately dropped for the round.

### Eye-directed Light and Darkness now stop at Immunity before the saving throw

The two offensive eye-targeting branches now consult `rawImmunityNegatesSpellForSubject` before they roll the target's Spell save or write any blindness state.

- **Light at the eyes** is completely negated when the intended victim has active Immunity. No `light_blindness` state is created.
- **Darkness at the eyes** is likewise completely negated before a save or `darkness_blindness` state is created.
- Because Mentzer's fallback globe/patch behind the intended victim occurs specifically when the victim **makes the saving throw**, total Immunity does not manufacture that save-success fallback. The protected target is immune before the saving-throw branch is reached.
- The existing voluntary Immunity-suppression path remains available. If the recipient deliberately drops Immunity for that round/casting, the ordinary Light/Darkness eye procedure can proceed normally.

This closes the harmful recipient-state side of the family without turning every use of Light or Darkness into a spell on the creature carrying the illumination.

### Object-carried / moving volumes remain external world effects

Mentzer explicitly allows Light to be placed on an object such as a coin or weapon so the light moves with that object. The engine's bounded representation uses a creature as the carrier anchor for that moving object/area state. v0.4.66 makes the targeting semantics explicit:

- moving ordinary **Light** and ordinary **Darkness** records are now marked `ignoreRawImmunityScaling:true` and `immunityInteraction:'external_world_effect'`;
- personal Immunity on the represented carrier does **not** extinguish or prevent the externally anchored 30-foot light/darkness volume;
- no `dropImmunity` declaration is required merely because the protected creature is carrying the object or serving as the movement anchor;
- casting either external effect leaves the carrier's Immunity fully active.

This is a representation distinction, not a new source rule: the source says the Light spell may be placed on an object and move with it; the engine uses the bearer as a convenient deterministic anchor for that object-carried effect. It does not reinterpret the bearer as the spell's recipient.

### Validation

Three new deterministic regression groups raise the integrated core suite from **618 to 621 tests**. They verify that (1) Immunity blocks Light at the eyes before blindness or the successful-save fallback globe is created, (2) Immunity blocks Darkness at the eyes before blindness or fallback darkness state is created, and (3) an Immunity-protected carrier can still anchor the full-duration external Light and Darkness volumes without suppressing Immunity.

The exact final `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic core harness was then executed **three consecutive times** in Chromium against the exact final document content.

```text
Build: 0.4.66
Tests: 621 / 621 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Next small checkpoint

Apply the same recipient-versus-external classification to **Continual Light / Continual Darkness** as one bounded second-level family. Their permanent eye-blindness branches should be reviewed separately from their object-carried or free-standing permanent light/darkness volumes.

## v0.4.65 — Immunity recipient classification for Floating Disc and Ventriloquism

This checkpoint keeps the low-level **Immunity** pass deliberately narrow and resolves the classification question left by v0.4.64. **Floating Disc** and **Ventriloquism** are first-level Magic-User spells, but the printed effect of neither spell is a spell effect on the caster as a recipient. Floating Disc creates an external, non-solid magical platform that remains within 6 feet of the caster for six turns; Ventriloquism makes the caster's voice appear to originate from one item or location within 60 feet for two turns. By contrast, the ninth-level **Immunity** spell makes its recipient immune to low-level spells that operate on that recipient; it does not state that the protected creature becomes unable to cast low-level magic whose actual effect is elsewhere in the world.

### Personal Immunity does not suppress these two external effects

The existing runtime behavior already allowed both spells to function while the caster had Immunity. v0.4.65 makes that classification explicit instead of adding an overbroad self-Immunity gate:

- **Floating Disc** remains castable while the Magic-User is personally protected by Immunity. The disc still lasts exactly **6 turns**, carries up to **5,000 cn**, stays within **6 feet**, remains at waist height, has no solid weapon-capable existence, and drops its load when the spell ends.
- **Ventriloquism** remains castable while the Magic-User is personally protected by Immunity because its printed effect is **one item or location**, not the caster. It still lasts exactly **2 turns** and the apparent voice source must remain within **60 feet**.
- Neither spell requires `dropImmunity` / `allowThroughImmunity`, because there is no low-level spell effect being bestowed on the Immunity recipient.
- Both active-effect records are now marked `ignoreRawImmunityScaling:true` and `immunityInteraction:'external_world_effect'`. This is primarily semantic hardening: it prevents later common-effect refactors from accidentally treating the caster-following disc or remote voice source as a personal recipient buff merely because the record has a relationship to the caster.
- Casting either spell leaves the ongoing Immunity effect fully active; no one-round suppression is recorded.

This distinction is intentionally local to the two spells reviewed here. It does **not** establish a blanket rule that every range-0 spell bypasses Immunity; Detect Magic, Read Languages, Read Magic, Shield, and similar spells actually alter the protected caster's senses or defenses and therefore remain subject to the recipient gate implemented in the preceding checkpoints.

### Validation

Two new deterministic regression groups raise the integrated core suite from **616 to 618 tests**. They verify that personal Immunity leaves the full six-turn Floating Disc and two-turn Ventriloquism effects intact without voluntary suppression, while the Immunity spell itself remains active.

The exact final `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic core harness was then executed **three consecutive times** in Chromium against the exact final document content.

```text
Build: 0.4.65
Tests: 618 / 618 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Next small checkpoint

Review **Light / Darkness** against ordinary Immunity as one bounded handler family. That pass should distinguish casting on a protected creature's eyes from creating a free-standing or object-carried light/darkness volume, rather than applying one blanket Immunity result to every targeting mode.

## v0.4.64 — Immunity pre-commit coverage for Read Languages and Read Magic

This checkpoint continues the deliberately small **low-level Immunity integration pass** and touches only the first-level Magic-User spells **Read Languages** and **Read Magic**. Mentzer Basic gives both spells range 0 and limits their effect to the spellcaster: Read Languages grants two turns of read-only comprehension of unknown languages/codes, while Read Magic grants one turn of comprehension of magical words/runes and makes successfully read magical writing recognizable thereafter. The ninth-level **Immunity** spell gives its recipient total immunity to 1st-, 2nd-, and 3rd-level spells, while allowing the recipient to lower the protection for one round by concentration when a desired spell should operate normally.

### Both reading spells now ask ordinary Immunity before creating information state

The existing Read Languages and Read Magic handlers now call `rawImmunityNegatesSpellForSubject` before they write their self-information effects.

- With ordinary Immunity active, **Read Languages** is completely negated and no `read_languages` state is created.
- With ordinary Immunity active, **Read Magic** is completely negated and no `read_magic` state is created.
- With `dropImmunity` / `allowThroughImmunity` represented for the casting, the protected caster may deliberately lower Immunity and receive the full printed spell effect.
- Read Languages still lasts exactly **2 turns** and remains read-only; it does not grant speech.
- Read Magic still lasts exactly **1 turn**, continues to feed the existing magical-writing/scroll-reading procedures, and preserves the rule that magical writing successfully learned through the spell may be recognized later without recasting.
- Deliberate suppression does not remove the ongoing ninth-level Immunity effect; protection resumes under the existing Immunity lifecycle.

No artifact Read Languages or artifact Read Magic behavior changed. This checkpoint only closes the ordinary mortal-spell pre-commit gap.

### Validation

Two new deterministic regression groups raise the integrated core suite from **614 to 616 tests**. They verify that (1) ordinary Immunity blocks both first-level reading spells before any information state is created and (2) deliberate suppression permits the full two-turn Read Languages state and one-turn Read Magic state while leaving Immunity ongoing.

The exact final `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic core harness was then executed **three consecutive times** in Chromium against the exact final document content.

```text
Build: 0.4.64
Tests: 616 / 616 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Next small checkpoint

Review the remaining first-level **Floating Disc** and **Ventriloquism** handlers against Immunity as a bounded pair. Because both create effects that are not straightforward harmful/beneficial recipient-state changes, the next pass should classify the RAW interaction first and only add an Immunity gate where the spell actually operates on the protected recipient.

## v0.4.63 — Immunity pre-commit coverage for Protection from Evil

This checkpoint continues the deliberately small **low-level Immunity integration pass** and touches only the first-level **Protection from Evil** spell in its Magic-User and Cleric forms. The ninth-level **Immunity** spell gives its recipient total immunity to 1st-, 2nd-, and 3rd-level spells and permits the recipient to lower that protection by concentration for one round so a desired spell can operate normally. Protection from Evil is a first-level self spell, so an Immunity-protected caster should not acquire its barrier, saving-throw bonus, or attack-roll protection unless Immunity is deliberately suppressed.

### Protection from Evil now asks ordinary Immunity before creating its barrier

The shared Protection from Evil handler now calls `rawImmunityNegatesSpellForSubject` before it writes the `protection_from_evil` active effect. This covers both class versions without creating separate spell paths.

- A **Magic-User** protected by ordinary Immunity cannot create the six-turn Protection from Evil barrier.
- A **Cleric** protected by ordinary Immunity cannot create the twelve-turn Protection from Evil barrier.
- With `dropImmunity` / `allowThroughImmunity` represented for the casting, the recipient voluntarily suppresses Immunity and Protection from Evil resolves normally with its existing **-1 on attacks against the caster, +1 on saving throws, and enchanted/summoned/controlled-creature touch barrier**.
- Voluntary suppression does not remove the ongoing ninth-level Immunity effect; protection resumes under the existing Immunity lifecycle after the allowed casting.

No other Protection from Evil behavior changed in this checkpoint. The existing rule that the touch barrier is broken when the protected caster attacks, while the attack-roll and saving-throw modifiers remain for the spell duration, is left intact.

This remains a narrow one-handler checkpoint. **Read Languages, Read Magic, Floating Disc, Ventriloquism, Light/Darkness edge forms, Resist Cold, Remove Fear, Purify Food and Water, and other remaining bespoke low-level handlers** still require individual review where they create state without consulting ordinary Immunity.

### Validation

Two new deterministic regression groups raise the integrated core suite from **612 to 614 tests**. They verify that (1) ordinary Immunity blocks both the Magic-User and Cleric forms before any Protection from Evil state is written and (2) deliberate suppression permits the full Cleric Protection from Evil effect while leaving Immunity ongoing.

The exact final `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic core harness was then executed **three consecutive times** in Chromium against the final document content.

```text
Build: 0.4.63
Tests: 614 / 614 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Next small checkpoint

Continue the same bounded Immunity pass with **Read Languages and Read Magic**, since both are first-level self-information spells whose handlers still create state directly without consulting ordinary ninth-level Immunity.

## v0.4.62 — Immunity pre-commit coverage for Shield

This checkpoint continues the intentionally small **low-level Immunity integration pass** and touches only the first-level Magic-User spell **Shield**. Under the established source hierarchy, the ninth-level **Immunity** spell gives total protection from 1st-, 2nd-, and 3rd-level spells unless its recipient deliberately lowers the protection for the round. Shield is a 1st-level Magic-User spell, so an Immunity-protected caster should not acquire Shield's AC or Magic Missile protection unless that protection is voluntarily suppressed.

### Shield now asks ordinary Immunity before creating protection state

The existing Shield handler already checked artifact Immunity. v0.4.62 adds the ordinary ninth-level `rawImmunityNegatesSpellForSubject` gate immediately before Shield writes either `shieldSpellRounds` or the tracked `shield` active effect.

- With ordinary Immunity active, **Shield is completely negated** and neither the 120-round combat flag nor the two-turn active effect is created.
- With `dropImmunity` / `allowThroughImmunity` represented for the casting, the recipient deliberately suppresses Immunity long enough for Shield to resolve normally. Shield then receives its existing two-turn duration, AC 2 against missiles, AC 4 against other attacks, and per-Magic-Missile saving-throw protection.
- The ongoing ninth-level Immunity effect is not removed by the voluntary exception; its protection resumes afterward under the already-established lifecycle.

This is deliberately a one-handler checkpoint. **Read Languages, Read Magic, Protection from Evil, Floating Disc, Ventriloquism, Light/Darkness edge forms, disease/blindness procedures, and other remaining bespoke low-level handlers** still need individual review where they commit state without asking the common Immunity gate.

### Validation

Two new deterministic regression groups raise the integrated core suite from **610 to 612 tests**. They verify that (1) ordinary Immunity blocks Shield before either AC/protection state is written and (2) deliberate suppression permits one full Shield casting without ending Immunity.

The exact final `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic core harness was then executed **three consecutive times** in Chromium against the final document content.

```text
Build: 0.4.62
Tests: 612 / 612 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Next small checkpoint

Continue the same bounded Immunity pass with **Protection from Evil**, auditing both its Magic-User and Cleric forms against ordinary ninth-level Immunity and the existing voluntary suppression path without broadening into the rest of first-level magic.

## v0.4.61 — Immunity pre-commit coverage for Detect Magic and Detect Evil

This checkpoint returns to the remaining **low-level Immunity integration** and deliberately touches only two closely related self-information spells. The source-bounded ninth-level **Immunity** procedure gives its recipient total immunity to 1st-, 2nd-, and 3rd-level spells, while allowing the recipient to drop that protection by concentration for one round so a desired spell can operate normally. **Detect Magic** is a 1st-level information spell; **Detect Evil** is likewise low-level (1st for Clerics and 2nd for Magic-Users in the consolidated lists), so an Immunity-protected caster should not acquire either detection state unless the protection is deliberately suppressed.

### Detect Magic and Detect Evil now ask Immunity before creating detection state

The ordinary RAW handlers for **Detect Magic** and **Detect Evil** now route through the same shared `rawImmunityNegatesSpellForSubject` gate already used by Fly, Haste/Slow, Hold Person, Detect Invisible, ESP, and Clairvoyance. The gate is evaluated **before** either detection effect is written to `activeSpellEffects`.

- With Immunity active, **Detect Magic** resolves as completely negated and no `detect_magic` effect is created.
- With Immunity active, **Detect Evil** likewise creates no `detect_evil` effect.
- A recipient may still deliberately suppress Immunity for the casting/round through the existing `dropImmunity` / `allowThroughImmunity` path. The detection spell then resolves normally and the ongoing ninth-level Immunity effect remains in place to resume protection afterward.

This checkpoint does **not** generalize Immunity across every remaining low-level self spell. Read Languages, Read Magic, Shield, Protection from Evil, Floating Disc, Light/Darkness edge forms, disease/blindness procedures, and other bespoke handlers still need individual review where they bypass the common pre-commit gate.

### Validation

Two new deterministic regression groups raise the integrated core suite from **608 to 610 tests**. They verify that (1) Immunity prevents Detect Magic and Detect Evil from creating their information effects and (2) deliberate suppression allows one Detect Magic casting without removing the ongoing Immunity effect.

The exact final `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic core harness was then executed **three consecutive times** in Chromium against the final document content.

```text
Build: 0.4.61
Tests: 610 / 610 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Next small checkpoint

Continue the same narrow Immunity pass rather than broadening the audit. The next useful target is the **Shield** handler, which already recognizes artifact Immunity but still needs the ordinary ninth-level Immunity pre-commit gate and deliberate suppression path.

## v0.4.60 — Regression determinism maintenance: artifact ESP / Prismatic fixture

This checkpoint is deliberately limited to the intermittent regression identified in v0.4.59. **No player-facing RAW procedure or artifact mechanic changes in this build.** The failure was isolated to the v0.4.54 regression fixture rather than the Prismatic Wall or artifact ESP implementation.

### Cause of the intermittent failure

The v0.4.54 test activates artifact **ESP** against a represented creature before placing a surviving green Prismatic layer between observer and subject. Artifact ESP correctly permits the subject a **Saving Throw vs. Spells**. The old fixture did not force the save outcome. Depending on the deterministic RNG state inherited within that test, the subject could occasionally make the save, in which case no ESP effect was created at all. The later assertion then reported that ESP had exposed information through green even though the actual condition was simply **“No active ESP effect.”**

The production implementation was behaving correctly: when an artifact ESP effect exists, the represented observer-to-subject line is checked by the shared Prismatic detection trajectory and a surviving green layer blocks the information.

### Fixture correction

The regression now gives the test creature an explicit high Spell-save target **and seeds the test RNG immediately before the ESP saving throw**, matching the already-established deterministic ESP fixture elsewhere in the harness. The explicit seed matters because the BECMI saving-throw helper correctly treats a natural 20 as success regardless of the target number. Together, the fixed save target and fixed non-20 roll guarantee that the test reaches the behavior it is intended to exercise: **an active ESP effect encountering a green Prismatic detection barrier**. No engine function, saving-throw rule, Prismatic geometry, artifact charge rule, or ESP duration was altered.

### Validation

The deterministic suite remains **608 tests** because this is a correction to an existing regression rather than a new rules feature. The exact final document passes extracted inline JavaScript syntax validation with `node --check`. The complete suite was then stress-run **20 consecutive times** in Chromium against the exact final document to verify that the previously intermittent v0.4.54 case remains stable. All 20 runs passed without a page error or console error.

```text
Build: 0.4.60
Tests: 608 / 608 passed
Failures: 0
State isolation: preserved
Regression count change: 0 (fixture correction only)
Runs: 20 / 20 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Next small checkpoint

With the flaky validation case isolated, the next implementation pass can return to one bounded RAW feature. The current high-magic boundary still includes remaining Prismatic producers, low-level **Immunity** pre-commit gaps, **Shapechange** special attacks/defenses and form-specific vulnerabilities, and additional native **Contingency** event sources. The next pass should select only one of those interactions and keep the same small-checkpoint cadence.

## v0.4.59 — Medusa gaze, mirror safety, Prismatic blocking, and delayed snake venom

This checkpoint keeps the post-Basilisk gaze work deliberately small by connecting **one additional published gaze monster: the Medusa**. The primary Mentzer Basic catalogue entry defines the Medusa's direct sight as petrifying, gives the **-4** penalty for attacking without looking directly and the snakes' **+2** counter-advantage, and notes that a reflected gaze can petrify the Medusa. The compatible Rules Cyclopedia consolidation adds an explicit **one-character-per-round** gaze limit, states that a character may watch the Medusa in a mirror without danger, and specifies that a successful snakebite deals **1d6** and forces a poison save or death in one turn.

### Medusa is no longer parsed as snakebite plus an ordinary generic “gaze attack”

The authoritative Medusa runtime profile now uses a bounded source-specific procedure:

- the ordinary physical attack is one **snakebite for 1d6**;
- the gaze is stored separately as `medusa_gaze`, so it is not rolled as a second weapon-style attack;
- a normal melee order aimed at a represented Medusa requires an explicit **avoid / meet / mirror** posture, using the same natural-language forms already established for the Basilisk;
- the Medusa gaze record is global to that Medusa for the combat round, preserving the compatible Cyclopedia statement that the gaze affects only **one represented character per round**.

The current deterministic gaze producer activates when the targeted character has explicitly chosen a Medusa gaze posture. That allows the gaze itself to operate across represented sight distance before a too-distant snakebite is rejected, but it does **not** yet pretend that the engine can automatically choose a gaze victim among every creature who merely happens to see the Medusa.

### Direct sight, avoiding the gaze, and mirror viewing are distinct

A character who chooses **meet gaze** makes the ordinary Turn to Stone saving throw. Failure writes the same petrified/turned-to-stone state used by the Basilisk and other petrification systems.

A character who chooses **avoid gaze** does not make the gaze save, but attacks the Medusa at the printed **-4**. If the Medusa's snakes attack that character in hand-to-hand combat, they receive the printed **+2**.

A character who chooses **use mirror and attack** must have a represented steel mirror and sufficient represented light. The Cyclopedia explicitly says that watching the Medusa's reflection is safe, but it does **not** print the Basilisk's special `-2` mirror attack rule. Therefore this implementation does not import that unrelated modifier: mirror combat remains an attack **without looking directly at the Medusa**, so the existing Medusa **-4 / +2** rule applies. Unlike the Basilisk mirror procedure, the Medusa rule also does not state that the character must forgo a shield, so no shield restriction is invented here.

The source also says that if the Medusa **sees her own reflection**, she must save vs. Turn to Stone or petrify herself. This checkpoint records that requirement as a remaining event-bound interaction rather than inventing an automatic chance that she looks into a presented mirror. A later small pass can connect a represented forced/self-reflection event once the engine has a deterministic way to establish that fictional condition.

### Blue Prismatic light blocks the represented Medusa gaze

The Medusa gaze now calls the same common Prismatic gaze trajectory used by the Basilisk. If the represented sight line crosses a surviving **blue** layer, the gaze is blocked before the target makes a Turn to Stone save. The block is recorded in the gaze state and referee log.

This is a live use of the already-established Prismatic rule that blue blocks gaze attacks; it does not broaden Prismatic handling into unrelated monster powers.

### Snakebite poison now has its printed one-turn deadline

On a successful Medusa snakebite, the victim takes the ordinary **1d6** damage and then saves vs. Poison unless an existing poison-immunity/protection gate prevents the venom. A failed save writes a fatal-poison deadline exactly **one turn (10 minutes)** later. The existing poison clock, Neutralize Poison, Heal/Cureall, and other represented poison-clearing systems therefore carry the consequence instead of killing the victim immediately or losing the delayed threat.

### Validation status

Four new v0.4.59 regression groups raise the deterministic core suite from **604 to 608 tests**. They verify: (1) the Medusa profile separates snakebite from gaze and the explicit gaze-choice grammar works; (2) avoid and mirror postures use the source-bounded **-4 / +2** modifiers without importing the Basilisk's `-2` mirror rule; (3) the gaze is limited to one represented character per round and is blocked by a surviving blue Prismatic layer; and (4) a failed snakebite poison save creates the exact one-turn fatal-poison deadline.

The exact final `index.html` passes extracted inline JavaScript syntax validation with `node --check`. A clean Chromium run of the complete deterministic suite passed **608/608** with no page or console errors. Repeated stress execution also exposed an **intermittent pre-existing v0.4.54 artifact ESP / Prismatic detection regression test**; because this checkpoint does not modify artifact ESP, its geometry, or the v0.4.54 detection code, v0.4.59 does not claim a new multi-run-clean baseline until that older flaky test is isolated in its own small maintenance pass.

```text
Build: 0.4.59
Tests: 608 / 608 passed in the final clean run
Failures in final clean run: 0
State isolation: preserved
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
New v0.4.59 regression groups: 4
Repeated-run note: intermittent pre-existing v0.4.54 artifact-ESP test observed during stress repetition
```

### Remaining boundary after v0.4.59

The Medusa now has a bounded executable direct-gaze posture, one-target-per-round limit, blue-Prismatic interception, and delayed snake venom. Still intentionally separate are: **forced/self-reflection of the Medusa**, her printed **+2 on saving throws vs. Spells**, automatic gaze-victim selection when characters are merely in sight rather than explicitly targeting her, and nonstandard actions while exposed to the gaze. The next smallest maintenance checkpoint should first isolate the intermittent **v0.4.54 artifact ESP regression test** so repeated validation is trustworthy again; after that, gaze or Prismatic integration can continue one producer at a time.

## v0.4.58 — Complete ordinary Basilisk gaze choices in hand-to-hand combat

This checkpoint stays deliberately narrow. It finishes the **ordinary hand-to-hand Basilisk gaze procedure** that v0.4.57 left open, without broadening into Medusa, catoblepas, beholder, or other gaze-capable creatures. The governing Mentzer Expert Basilisk entry states that a character in hand-to-hand combat must choose each round either to **avoid** or **meet** the gaze; it also gives the separate **mirror** procedure. The compatible Rules Cyclopedia text preserves the same modifiers and mirror chance.

### Explicit gaze choice is now required for a normal melee order

A normal melee order aimed at a represented Basilisk no longer silently assumes a gaze posture. The command parser and the lower-level combat-order validator require one of three explicit choices:

- **avoid gaze and attack** — the character takes the printed **-4** penalty on melee Hit rolls against the Basilisk, while the Basilisk receives the printed **+2** on its attacks against that character;
- **meet gaze and attack** — neither side receives those attack modifiers, but the character makes the normal **Turn to Stone** saving throw once for that hand-to-hand round;
- **use mirror and attack** — the character attacks at the printed **-2** instead of -4 and does not directly meet the gaze.

The choice is stored on the round's combat order and appears in the combat-order readout. This prevents an ordinary attack instruction from concealing a major survival decision from the player.

### Mirror procedure is executable rather than descriptive only

The mirror path now enforces the source prerequisites before the order is accepted:

- the character must have access to a represented **steel mirror** in personal or shared party inventory;
- the area must have represented usable light;
- the character may **not use a shield** while using the mirror.

Once per hand-to-hand round, the engine makes the printed **1 on 1d6** reflection check. On a 1, the Basilisk sees itself in the mirror and makes its own Turn to Stone saving throw. Failure records the Basilisk as petrified/turned to stone, ends its hostility, and clears its active melee engagements. A successful save leaves it active. If a represented Prismatic blue layer blocks the gaze line first, the gaze is stopped before the mirror can reflect it.

### Gaze resolution is once per Basilisk/character pair per round

The automatic surprise gaze from v0.4.57 and the new hand-to-hand gaze choice now share one round record. A character who already resolved the automatic surprise gaze against a particular Basilisk does not make a second gaze save merely because the same pair enters hand-to-hand later in that round. Likewise, repeated attack calls in one round do not duplicate the gaze check.

This checkpoint remains intentionally bounded to **normal melee orders against the Basilisk**. More unusual actions while already engaged with a Basilisk—such as parry-only rounds, spellcasting while engaged, wrestling, or other special melee maneuvers—still need a general per-round gaze-posture layer if they are to expose the same avoid/meet/mirror choice independently of a normal melee order. That broader combat-state refactor is not claimed here.

### Validation status

Four new v0.4.58 regression groups raise the deterministic core suite from **600 to 604 tests**. They verify: (1) a normal Basilisk melee order is rejected until an explicit gaze choice is supplied and the new command grammar records that choice; (2) the exact **-4 / +2** avoid-gaze modifiers; (3) one-and-only-one deliberate meet-gaze Turn to Stone save per round; and (4) mirror prerequisites, the exact **-2** Hit-roll penalty, and the **1-in-6** self-reflection followed by the Basilisk's own saving throw.

The exact final `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic core harness was then executed **three consecutive times** in installed Chromium against the exact final document content.

```text
Build: 0.4.58
Tests: 604 / 604 passed
Failures: 0
State isolation: preserved
Browser runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
New v0.4.58 regression groups: 4
```

### Remaining boundary after v0.4.58

The Basilisk's normal attack/gaze/mirror procedure is now substantially represented for ordinary melee attacks. The next small checkpoint should keep the same incremental approach and connect **one additional published gaze monster**—preferably the Medusa—to the common blue-Prismatic gaze barrier and its own source-defined gaze procedure. Separate later passes can generalize gaze posture to nonstandard engaged actions, continue remaining Prismatic producers, then return to **Immunity**, **Shapechange**, **Contingency**, and the broader non-spell BECM RAW completion audit.

## v0.4.57 — Prismatic blue blocks a live Basilisk surprise gaze

This is another intentionally small checkpoint. It connects one **live gaze producer** to the existing Prismatic Wall trajectory system rather than attempting a general gaze rewrite. The primary BECMI Basilisk record states that its bite and gaze can petrify and that a **surprised character automatically meets the gaze** but still receives the Turn to Stone saving throw. The compatible Rules Cyclopedia consolidation preserves that procedure, while Prismatic Wall states that **blue blocks gaze attacks**.

### Basilisk now has a bounded executable gaze path

The authoritative Basilisk runtime profile no longer treats the printed `1 bite / 1 gaze` line as though both entries were ordinary `1d10` hit-roll attacks. The profile now separates the two procedures:

- the physical **bite** is the Basilisk's one ordinary `1d10` attack and, on a hit, invokes the printed Turn to Stone saving throw before writing petrification state;
- the **gaze** is tagged as its own special attack rather than being converted into a second generic damage attack;
- during the first round, a character who is actually represented as **surprised by the Basilisk** automatically meets that gaze, exactly as the source specifies;
- failure of the Turn to Stone save records the character as petrified/turned to stone, while success leaves the character active.

The surprise-gaze check occurs before ordinary hand-to-hand separation blocks a bite. This matters because the source makes surprise itself the gaze-contact condition; the engine does not require the Basilisk to have already reached physical bite range merely to resolve that automatic gaze contact.

### Blue Prismatic geometry blocks that gaze before the saving throw

The common Prismatic trajectory layer now exposes a dedicated gaze query. The live Basilisk surprise-gaze path asks that query before exposing the target to petrification.

- If the represented Basilisk-to-character sight line crosses a surviving **blue** layer, the gaze is blocked and no Turn to Stone save or petrification is applied.
- The block records the Prismatic color in the encounter state/referee log so the result remains inspectable.
- If blue is absent and no other applicable gaze-blocking layer is encountered, the ordinary Basilisk gaze procedure resolves normally.

This checkpoint deliberately does **not** claim the entire Basilisk gaze procedure complete. The ordinary hand-to-hand choice to **avoid the gaze** (`-4` attacks while the Basilisk gains `+2`), deliberately **meet the gaze**, and the **mirror** procedure (`-2` attack penalty and the printed chance to reflect the gaze) remain separate work. Other monster gaze attacks also remain unconnected unless they already use a common gaze producer.

### Validation status

Three new v0.4.57 regression groups were added. They verify that the Basilisk profile separates bite from gaze and preserves bite petrification; that a represented surviving blue Prismatic layer blocks the live automatic surprise gaze; and that an unblocked automatic surprise gaze uses the Turn to Stone save and petrifies on a forced failed save.

The exact final `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic core harness was executed once in installed Chromium using the exact final HTML through an in-memory page load. All **600/600** tests passed with state isolation preserved and no page or console errors.

```text
Build: 0.4.57
Tests: 600 / 600 passed
Failures: 0
State isolation: preserved
Browser runs: 1 / 1 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
New v0.4.57 regression groups: 3
```

### Remaining boundary after v0.4.57

The next small checkpoint can finish the **ordinary Basilisk gaze choice/mirror procedure** without broadening into every gaze-capable monster at once. After that, other Prismatic gaze producers can be connected one at a time. The larger remaining RAW work is still separated into later checkpoints for residual Prismatic information/matter/magic producers, **Immunity** pre-commit coverage, **Shapechange** special attacks/defenses and form-specific vulnerabilities, additional **Contingency** event sources, and the broader non-spell BECM completion audit.

## v0.4.56 — Prismatic matter interception for Telekinesis

This is intentionally a small checkpoint. It continues only the **Prismatic Wall matter/magic bridge** rather than combining that work with gaze attacks, Immunity, Shapechange, or another broad re-audit. The authority hierarchy is unchanged: **Mentzer D&D - BECM is primary**, with the **Rules Cyclopedia** used only as compatible consolidation. The consolidated Prismatic Wall text states that creatures and objects contacting or passing through the wall are affected, that **indigo blocks all matter**, and that **violet blocks magic of all types**. The Telekinesis procedure moves a creature or object by concentration at up to 20 feet per round.

### Ordinary Telekinesis now checks the represented movement segment

The ordinary Magic-User **Telekinesis** handler already enforced its 120-foot range, 200-cn-per-caster-level weight limit, saving throw for an unwilling subject, 20-foot-per-round movement limit, six-round duration, and concentration. It now checks the subject's represented start-to-destination segment against active Prismatic geometry **before** changing the subject's coordinates.

- A surviving **indigo** layer blocks the telekinetically moved creature as matter.
- A surviving **violet** layer also blocks the magical movement.
- The casting is still treated as resolved/expended; the subject simply remains on the original side of the wall.
- This checkpoint does not invent geometry when a target does not have represented combat coordinates.

### Artifact Telekinesis uses the same matter/magic barrier

The deterministic artifact **Telekinesis** path now calls the same represented Prismatic matter/magic query. This applies both to represented creatures and to deployed objects that already have a telekinetic 3D position. A blocked artifact use spends its PP normally but does not move the target across the wall.

This closes an important live **indigo matter** path without claiming universal matter interception. Other producers that can move or project matter across represented geometry still need individual routing, and **blue gaze blocking** remains the next separate Prismatic target rather than being bundled into this checkpoint.

### Validation status

Two new v0.4.56 regression groups were added: one verifies ordinary Telekinesis against isolated indigo and violet layers; the second verifies artifact Telekinesis against indigo for both a creature and a deployed object, including PP expenditure on the blocked attempt.

During the full regression run, two previously unexecuted v0.4.55 information-barrier tests initially failed because their **test fixtures** placed Know Alignment targets outside the procedure's represented range. The underlying v0.4.55 implementation was not changed. The fixtures were corrected so the target remains within the spell/artifact range while the line still crosses the represented green Prismatic layer.

The exact final `index.html` passes extracted inline JavaScript syntax validation with `node --check`. Direct browser navigation remains blocked by this environment, so Chromium was loaded with the **exact final HTML document content** using an in-memory page load. The complete deterministic core harness then passed **597/597** in one clean run with state isolation preserved and no page or console errors.

```text
Build: 0.4.56
Tests: 597 / 597 passed
Failures: 0
State isolation: preserved
Browser runs: 1 / 1 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
New v0.4.56 regression groups: 2
```

### Remaining cross-system RAW boundary after v0.4.56

The next small checkpoint should stay on Prismatic integration and connect **blue gaze blocking** to a bounded live gaze producer rather than broadening into several systems at once. After that, the remaining Prismatic arbitrary-matter/general-magic paths can be closed in similarly small pieces. Separate later checkpoints still remain for **Immunity** pre-commit coverage, **Shapechange** special attacks/defenses and form-specific vulnerabilities, additional **Contingency** event sources, and the broader non-spell BECM RAW completion audit.

## v0.4.55 — Prismatic information barriers and dimensional-transport interception

This checkpoint continues the source-bounded cross-system integration pass identified by v0.4.54. The source hierarchy remains unchanged: **Mentzer D&D - BECM is primary**, with the **Rules Cyclopedia** used only as compatible consolidation. The focus here is deliberately narrow: extend the existing Prismatic Wall geometry into additional represented information paths and into two dimensional-transport spells that must not bypass the wall.

### Know Alignment and Locate Object now respect represented Prismatic detection geometry

The common green/violet detection-line resolver is now reused by more information effects rather than allowing those handlers to reveal data through a represented wall.

- Ordinary **Know Alignment** checks the represented caster-to-subject line before revealing alignment. A surviving green layer (or later violet all-magic layer) resolves the casting without exposing the represented alignment payload.
- Ordinary **Locate Object** now performs the same check when the located object is carried by a represented combat subject. If the carrier is across a blocking Prismatic detection layer, the spell does not expose the carrier/object direction.
- Artifact **Know Alignment** returns an explicit blocked result rather than substituting `unknown` for a secretly revealed value.
- Artifact **Locate Object** now carries its represented range through the query, identifies a represented carrier before returning location data, and withholds the result when green/violet blocks the detection line.

This is an additional bridge, not a declaration that every information system is complete. **Detect Magic, Detect Evil, Find Traps, Lore, crystal-ball-style world queries, Truesight's non-creature revelations, and other bespoke information producers remain individual audit targets wherever they can expose information across represented geometry.**

### Dimension Door and Teleport can no longer bypass a represented Prismatic Wall

A shared Prismatic transport-line query now evaluates a represented subject and represented destination as both **matter** and **magic**. Ordinary **Dimension Door** and **Teleport** call this gate before changing the subject's position. If the represented path crosses a surviving applicable Prismatic layer, the cast resolves as expended but the subject does not cross the barrier.

For the current color model this means an **indigo** matter layer can stop the transported subject, while **violet** remains the final all-magic barrier. This is intentionally bounded to represented start/destination geometry. It does not invent unseen planar topology or claim universal interception for every teleportation, gate, artifact, monster, or module-specific transport effect.

### Validation status

Four new v0.4.55 regression groups were added for: ordinary Know Alignment/Locate Object detection blocking; artifact Know Alignment/Locate Object blocking; Dimension Door interception by indigo/violet; and Teleport interception by violet.

The exact final `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The previous v0.4.54 baseline remains the last browser-executed checkpoint recorded as **591/591 passed across five clean Chromium runs**. In the present execution environment, local browser navigation to the generated document was blocked/timed out, so the newly added v0.4.55 regression groups are **defined but not falsely reported here as browser-executed passes**.

```text
Build: 0.4.55
New regression groups: 4
JavaScript syntax: clean
Last fully browser-executed baseline: v0.4.54 — 591 / 591 passed, 5 / 5 clean
Current v0.4.55 browser harness: not independently executed in this environment
```

### Remaining cross-system RAW boundary after v0.4.55

The next highest-value work remains: finish **Immunity** pre-commit coverage for bespoke first- through fifth-level state changes; connect the rest of the Prismatic **green/blue/indigo/violet** categories to remaining detection, gaze, arbitrary-matter, and general-magic producers; continue **Shapechange** into deterministic catalog special attacks/defenses and form-specific weapon vulnerabilities; add more native **Contingency** event sources; and then resume the broader non-spell BECM RAW completion gates.

## v0.4.54 — Prismatic detection barriers and targeted low-level Immunity gating

This checkpoint continues the post-spell-list **cross-system RAW integration pass** under the same source hierarchy: **Mentzer D&D - BECM remains primary**, with the **Rules Cyclopedia** retained only as compatible consolidation. The work closes two concrete gaps left by v0.4.53: Mentzer's green **Prismatic Wall** layer says that it blocks **all detection spell effects**, while **Immunity** gives total protection from 1st–3rd-level spells unless the recipient deliberately drops the protection for the round.

### Green/violet Prismatic layers now block live detection paths

The common Prismatic trajectory resolver already knew that **green** blocks detection and **violet** blocks magic generally, but most information spells did not yet ask that resolver whether their line crossed the wall. v0.4.54 adds a shared represented detection-line query and routes several live consumers through it.

- **Detect Invisible** and ordinary unseen-target combat now use target-aware detection. A creature with magical Detect Invisible or Truesight no longer ignores invisibility across a represented surviving green layer. If green has been removed but violet remains, the all-magic layer still blocks the effect.
- **ESP** and **Clairvoyance** now test the represented caster-to-subject line before exposing information. A blocked cast remains spent and records which Prismatic color blocked it, but the engine does not leak represented thoughts or visual information through the barrier.
- Artifact **ESP** and **Clairvoyance** status queries use the same wall check; a blocked result explicitly reports the Prismatic color and withholds the target's represented thought/appearance payload.
- Artifact **Detect Invisible** and **Truesight** lists omit invisible creatures whose detection line is blocked by a surviving green/violet layer.
- Artifact **Wizard Eye** movement now stops at a represented green or violet Prismatic layer rather than moving the remote magical sensor through it.

This implements the most frequently exercised detection producers against the printed green-layer rule without pretending that every information effect has already been routed. **Detect Magic, Detect Evil, Locate Object, Find Traps, Know Alignment, Lore, Truesight's non-creature world revelations, crystal-ball-style effects, and other bespoke information systems still require individual connection to the common detection barrier where they expose information across represented geometry.**

### Immunity now blocks more low-level state changes before they happen

A shared `rawImmunityNegatesSpellForSubject` path now evaluates the recipient before selected 1st–3rd-level state-changing spell handlers commit their effects. It also preserves the printed voluntary concentration exception: a recipient may deliberately suppress Immunity for the casting/round when a beneficial spell is desired.

The new gate is connected to:

- **Fly** — an Immunity-protected recipient does not acquire the movement effect unless the protection is deliberately dropped;
- **Haste** — protected recipients in a multi-target selection are reported as immune and are not hasted;
- **Slow** — protected victims are rejected before the save or movement/attack penalty is applied;
- **Hold Person** — protected victims are rejected before the saving throw and, importantly, before the persistent paralysis flags are written;
- **Detect Invisible**, **ESP**, and **Clairvoyance** — when the spell would operate through the protected caster/recipient, the low-level effect is completely negated unless Immunity is deliberately suppressed.

This is deliberately narrower than claiming universal Immunity completion. Older bespoke handlers that directly change non-effect state still need the same pre-commit gate, especially disease/blindness/light-darkness edge forms, some area/control procedures, and any module- or artifact-specific low-level spell-like effect that bypasses the common spell-damage/effect layers.

### Validation

Four new v0.4.54 regression groups raise the deterministic core suite from **587 to 591 tests**. They verify: (1) total low-level Immunity against Fly and Hold Person plus deliberate suppression for a beneficial Fly; (2) ordinary Detect Invisible, ESP, and Clairvoyance blocked by a green Prismatic layer; (3) artifact ESP, Clairvoyance, Detect Invisible, and Truesight blocked by the same represented barrier; and (4) Wizard Eye movement stopped by both green and violet layers.

The exact final `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic core harness was then executed **five consecutive times** in installed Chromium against the exact final document content with no state leakage, runtime page errors, or console errors.

```text
Build: 0.4.54
Tests: 591 / 591 passed
Failures: 0
State isolation: preserved
Runs: 5 / 5 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Remaining high-magic RAW boundary after v0.4.54

The next high-value work is to finish **Immunity** pre-commit coverage for remaining bespoke 1st–5th-level state changes; route the rest of the **Prismatic Wall** green/blue/indigo/violet categories through live detection, gaze, transported matter, and general-magic producers; continue **Shapechange** into deterministic catalog special attacks/defenses and magic-weapon-vs.-form vulnerabilities; and add more native **Contingency** event sources. Once those bridges are sufficiently closed, the audit can return to the remaining non-spell BECM RAW systems rather than continuing to deepen only high-level magic.

## v0.4.53 — Immunity wound scaling, live Prismatic remedies/gas barriers, and Shapechange type vulnerabilities

This checkpoint continues the post-spell-list **cross-system RAW integration pass** under the same authority hierarchy: **Mentzer D&D - BECM remains primary**, with the **Rules Cyclopedia** used only as compatible consolidation. The work focuses on three interactions for which the Master spell text is unusually explicit: **Immunity** reduces quantifiable fourth- and fifth-level spell effects; **Prismatic Wall** blocks specified categories and is dismantled only by its printed remedies in order; and **Shapechange** gives the caster the new form's weaknesses as well as its strengths.

### Immunity now scales the bespoke serious/critical wound handlers

The generic spell/damage layers already understood the Master **Immunity** spell, but the dedicated Cleric handlers for **Cure Serious Wounds / Cause Serious Wounds** and **Cure Critical Wounds / Cause Critical Wounds** were still bypassing that common scaling. They now use the same source-bounded multiplier as other fourth- and fifth-level effects.

- **Cure Serious Wounds** is reduced to one-half normal healing while Immunity remains active; beneficial rounding is in the recipient's favor.
- **Cause Serious Wounds** now reaches the common spell-damage pipeline as a fourth-level magical spell and is reduced to one-half normal damage.
- **Cure Critical Wounds** is likewise reduced to one-half normal healing while Immunity remains active.
- **Cause Critical Wounds** is now tagged as the fifth-level reversed spell before damage is applied. This produces exactly the source's illustrative **3–10 damage** range from its normal 3d6+3 packet when Immunity halves the effect.
- A recipient may still deliberately drop Immunity for the round and receive the full beneficial cure, preserving the already implemented concentration exception.

The common quarter-effect branch for a successful saving throw remains available to qualifying fourth- and fifth-level effects. The remaining Immunity work is now concentrated in bespoke state-changing spell handlers that create flags outside the common active-effect record, especially older low-level control/movement procedures.

### Prismatic Wall remedies are now executable through ordinary spell casting

The engine previously stored the seven-color remedy table and could test it through a helper, but normal spell resolution did not route casts aimed at a represented **Prismatic Wall** through that table. v0.4.53 adds that bridge.

A cast explicitly aimed at the wall now recognizes the printed sequence:

- red — **magical cold** (including represented Ice Storm/Wall of Ice use);
- orange — **magical lightning**;
- yellow — **Magic Missile**;
- green — **Passwall / Pass-Wall**;
- blue — **Disintegrate**;
- indigo — **Dispel Magic**;
- violet — **Continual Light**.

The remedy must match the **outermost remaining color**. An out-of-order remedy is a resolved but ineffective cast; it does not silently skip layers. RAW_STRICT also recognizes these explicit remedy casts even when a spell such as Magic Missile or Lightning Bolt normally uses a specialized combat path rather than the generic spell dispatcher.

### Blue/violet Prismatic blocking now reaches moving poison gas

The existing trajectory layer already blocked missiles and breath weapons. This checkpoint connects represented poison/gas volumes to the same wall geometry.

Ordinary **Cloudkill** now checks its 20-foot-per-round movement segment against every represented Prismatic Wall. If a surviving **blue** layer is encountered, the gas cannot pass; if blue has already been removed but **violet** remains, the cloud's magical effect is likewise blocked. The cloud remains on its current side rather than being silently teleported or destroyed. Artifact Cloudkill uses the same movement rule.

The artifact **Poison Gas Breath** path now checks both its initial breath trajectory and its lingering three-round cloud against the wall. Yellow still blocks the initial breath while present. If yellow is already gone, blue blocks the poison/gas component; violet remains the later general-magic barrier. The persistent cloud stores its represented origin so a creature on the far side is not poisoned merely because the rectangular volume overlaps both sides of the wall.

This closes the main poison/gas producer identified in the v0.4.52 audit. Detection effects, gaze effects, arbitrary transported matter, and every bespoke general-magic trajectory are still not globally routed through Prismatic geometry and remain explicit work rather than being claimed complete.

### Shapechange carries dragon/giant type into common form-specific predicates

Canonical monster combat profiles now preserve the workbook's **Monster Type** field instead of discarding it during profile construction. A PC under Shapechange uses the represented form's type/name for common monster-type queries, and the shared **dragon** and **giant** predicates now recognize Shapechanged characters while still refusing to classify an ordinary untransformed PC merely because of the character's name.

This matters because Mentzer explicitly says the caster assumes the form's **flaws as well as strengths**. Type-specific systems that use the common dragon/giant predicates can therefore treat a Shapechanged dragon as a dragon and a Shapechanged giant as a giant rather than continuing to see only the caster's original character category. This is an integration step, not a claim that every catalog special attack, special defense, and magic-weapon-vs.-type interaction is now universally automated.

### Validation

Five new v0.4.53 regression groups raise the integrated deterministic suite from **582 to 587 tests**. They cover serious/critical wound scaling under Immunity; ordinary Prismatic remedy ordering; moving Cloudkill blocked by blue/violet; initial and lingering poison-gas breath blocked by blue after yellow is gone; and Shapechange dragon/giant type propagation.

The exact final `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic core harness was then executed **five consecutive times** in installed Chromium through Playwright against the exact final document content:

```text
Build: 0.4.53
Tests: 587 / 587 passed
Failures: 0
State isolation: preserved
Runs: 5 / 5 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Remaining high-magic RAW boundary after v0.4.53

The high-magic bridge is now concentrated in four areas: finish **Immunity** coverage for bespoke state-changing first- through fifth-level handlers that still bypass common effect gating; route the remaining **Prismatic Wall** categories through live detection, gaze, arbitrary-matter, and general-magic producers; continue **Shapechange** integration into represented monster special attacks, defenses, and type-specific vulnerabilities where the catalog supplies deterministic data; and add more native **Contingency** event sources. After those bridges are closed, the formal audit can move back into the remaining non-spell BECM RAW systems.

## v0.4.52 — Pre-damage Contingency, Prismatic trajectories, ordinary cancellation strikes, and Shapechange form traits

This checkpoint continues the post-spell-list **cross-system RAW integration pass** under the unchanged authority order: **Mentzer D&D - BECM is primary** and the **Rules Cyclopedia is secondary only where compatible**. The implementation closes the highest-value gaps left by v0.4.51 without treating unrepresented world facts as deterministic.

### Contingency now resolves before qualifying damage lands

The shared PC and monster damage pipelines now expose a structured **pre-damage / about-to-be-damaged Contingency event** after ordinary damage reductions have established that a positive packet is actually pending, but **before hit points are subtracted**. This is the timing required by Mentzer's explicit example in which a character at eight hit points or less who is *about to be damaged* immediately receives a stored **Dimension Door**.

The new hook supports `about_to_be_damaged`, `pre_damage`, and `would_be_damaged` trigger families, including an optional represented HP threshold. If the already-specified contingent spell displaces the recipient or otherwise removes the recipient from the represented damage event before the packet lands, the pending damage is preempted. Existing post-damage `damaged` and `hp_at_or_below` triggers remain separate and continue to fire only after actual HP loss. Free-form prose still does not execute until a represented event can satisfy it; no semantic condition is guessed merely to force a trigger.

### Prismatic Wall now intercepts represented trajectories

The v0.4.51 movement geometry is now reused by a common **line/trajectory resolver**. A segment crossing the printed 10-foot-radius sphere, or an explicitly dimensioned flat Prismatic Wall, determines the side of contact and walks the surviving colors in the correct direction. The resolver records all seven printed blocking categories:

- **red** — magical missiles;
- **orange** — nonmagical missiles;
- **yellow** — breath weapons;
- **green** — detection effects;
- **blue** — poisons, gases, and gaze attacks;
- **indigo** — matter;
- **violet** — magic of all types.

This checkpoint connects that geometry directly to ordinary missile attacks, ordinary **Magic Missile**, artifact Magic Missile packets, and represented artifact breath attacks. A blocked trajectory never proceeds to its target. The helpers for detection, poison/gas, gaze, matter, and general magical trajectories are source-bounded and ready for reuse, but the audit does **not** yet count every bespoke producer of those effects as globally routed through the wall.

### Rod of Cancellation can now strike ordinary represented magical items

The Rod of Cancellation now has its primary Mentzer magical-item procedure in addition to the special Prismatic interaction. A character with an unused rod may target a uniquely represented carried magical item. The target is **Armor Class 9 by default**, with a represented combat-use AC override available when a referee has supplied one. The rod makes an ordinary touch/Hit Roll against that item.

On a successful hit, the target is marked permanently nonmagical, its represented magic bonus is removed, represented charges are drained, and the rod's single use is expended. On a miss, both target and rod remain unchanged. The implementation deliberately does **not** import the later Rules Cyclopedia resistance exception for intelligent swords and +5 items into `RAW_STRICT`: the primary Mentzer description says the rod drains any magical item it hits, and the project source hierarchy does not permit a secondary addition to override that primary procedure.

A regression in this work also exposed and corrected a nullable-AC bug in the new path: JavaScript coercion had briefly treated an unspecified AC override as AC 0 rather than falling through to the printed AC 9. The final build explicitly distinguishes an absent override from a numeric zero.

### Shapechange form categories and immunities enter common predicates

Shapechange already adopted represented form Armor Class, Hit rolls, natural attack profile, movement profile, and the spellcasting restriction for non-bipedal-humanoid forms. This checkpoint carries additional represented form facts into common engine predicates:

- an undead form is treated as **undead rather than living**;
- a construct form is treated as a **construct rather than living**;
- represented form poison immunity is honored by the common poison gate;
- represented form sleep immunity is honored by the common sleep eligibility gate;
- represented form charm immunity is honored by the common charm application gate.

This implements more of Mentzer's instruction that the caster takes the new form's special attacks, immunities, flaws, and other details while retaining the caster's own mind, hit points, and saving throws. It still does not claim universal automation of every arbitrary monster special ability merely because a form name exists; exceptional attacks and vulnerabilities require represented catalog data and a common handler capable of expressing them.

### Validation

Six new deterministic regression groups raise the integrated core suite from **576 to 582 tests**. They verify: immediate pre-damage Contingency displacement; magical versus nonmagical missile layer selection; breath interception at yellow; successful AC 9 Rod of Cancellation item contact and one-use expenditure; a missed cancellation strike retaining both item and rod; and Shapechange inheritance of represented undead category plus poison/sleep/charm immunities.

The exact final `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic core harness was executed **five consecutive clean times** in installed Chromium through Playwright against the final self-contained document:

```text
Build: 0.4.52
Tests: 582 / 582 passed
Failures: 0
State isolation: preserved
Runs: 5 / 5 clean
Runtime exceptions/page errors: 0
Console errors: 0
JavaScript syntax: clean
```

### Remaining high-magic RAW boundary after v0.4.52

The remaining high-magic bridge is narrower again: finish ordinary **Immunity** scaling through bespoke first- through fifth-level handlers that still bypass the common spell-effect multiplier; route Prismatic Wall through the remaining **detection, poison/gas, gaze, arbitrary matter, and general magic** producers; broaden Shapechange from shared category/immunity predicates into represented **special attacks and form-specific vulnerabilities** where the monster catalog supplies enough data; add further source-bounded native Contingency events beyond damage; and then resume the remaining non-spell BECM RAW audit.

## v0.4.51 — Native Contingency damage events, live Rod of Cancellation use, and Prismatic movement interception

This checkpoint continues the post-spell-list **cross-system RAW integration pass** without changing the established source hierarchy. **Mentzer D&D - BECM remains primary**; the **Rules Cyclopedia remains secondary only where compatible**. The compatible consolidated high-level spell text is especially useful here because it states three interaction rules directly: Contingency fires automatically and immediately when its specified local situation occurs; creatures or objects contacting or passing through a Prismatic Wall begin resolving its ordered colors from the side they contact; and a Rod of Cancellation can strip the three outermost remaining colors. The rod's own item description also states that it works only once.

### Native damage and hit-point Contingency events

The common damage pipeline now emits deterministic **post-damage Contingency events** for represented subjects with an active Contingency. Two structured trigger families are wired directly into ordinary HP loss:

- `damaged` — fires after actual hit-point loss occurs; artifact temporary hit points that absorb the entire packet do not falsely count as HP damage;
- `hp_at_or_below` — checks the subject's represented HP after damage against the stored threshold.

When either event matches the stored structured trigger, the existing Contingency resolver consumes the one Contingency and immediately resolves the already-specified secondary spell. The existing 120-foot locality rule remains satisfied because these particular native events occur on the contingent subject itself. Free-form prose is still not guessed, and this checkpoint does **not** yet claim a pre-damage `about_to_be_damaged` event. That distinction matters for source examples whose trigger wording requires the contingent spell to occur before a new damage packet is applied.

### Rod of Cancellation as an actual inventory action

The Rod of Cancellation path is no longer only an internal Prismatic helper. A represented character carrying an unused `Rod of Cancellation` can now use it through the ordinary item-use / improvised-action route, including during active combat when the target is a represented Prismatic Wall.

A successful use removes exactly the **three outermost remaining colors**, using the same common layer resolver already exercised by Wish. The rod is then marked **spent and nonmagical**, preserving its printed one-use character rather than treating it as a rechargeable item. If no active Prismatic Wall is represented, the engine refuses the operation and does **not** expend the rod.

This checkpoint intentionally wires the rod only to the Prismatic Wall interaction that is already source-bounded in the spell layer. Generic attack-roll cancellation against arbitrary represented magical items remains a separate magical-item integration task; the engine does not silently claim that broader procedure complete merely because the wall interaction now works from inventory.

### Prismatic Wall movement geometry

Prismatic Wall now participates directly in the **3D combat movement segment** instead of requiring a manual `triggerNow` contact or a helper call.

For the printed **10-foot-radius sphere**, each actual segment/sphere-surface crossing is detected. This means a creature moving from outside to inside, inside to outside, or completely through a sphere encounters the appropriate wall surface in travel order. The caster remains exempt, as printed. Other creatures resolve the currently remaining color layers in the correct direction: outside-in begins with the outermost surviving color, while movement from the caster's side reverses the color order.

For a **flat vertical or horizontal wall**, deterministic interception is enabled when the player/referee supplies explicit represented extents (`widthFeet` plus `heightFeet`/`depthFeet`) within the printed 500-square-foot maximum. The wall stores its plane normal, dimensions, center, and which side faces the caster. If a flat wall was created with area only and no represented dimensions, it remains valid spell state but is marked `geometryRefereeRequired`; the engine does not invent a square or rectangle merely to obtain a collision result.

Movement contact now feeds the existing Prismatic color resolver. A surviving creature can continue moving and may still be stopped later by hostile influence. Death, petrification, unconsciousness, an indigo planar-loss result, or an active Anti-Magic Shell stops the movement at the wall. The Anti-Magic case inflicts no wall damage and harms neither effect, matching the printed exception.

This is specifically a **movement-geometry bridge**. The wall's red/orange/yellow/green/blue/indigo/violet blocking metadata is already recorded, but universal interception of missile trajectories, breath lines, poison/gas volumes, gaze lines, detection effects, and other magic has not yet been routed through the same geometry layer and is not counted complete here.

### Validation

Five new deterministic regression groups raise the integrated core suite from **571 to 576 tests**. They verify: native HP-threshold Contingency activation; one-use inventory Rod of Cancellation behavior; spherical Prismatic movement contact; Anti-Magic Shell stopping harmlessly at the wall; and explicitly dimensioned flat-wall segment interception while unspecified flat extents remain referee-bounded.

The exact final `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic core harness was executed **three consecutive clean times** in installed Chromium through Playwright against the final self-contained document:

```text
Build: 0.4.51
Tests: 576 / 576 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
```

### Remaining high-magic RAW boundary after v0.4.51

The next highest-value cross-system work is now narrower: complete ordinary **Immunity** routing through the remaining bespoke first- through fifth-level recipient handlers; add additional source-bounded native Contingency events, especially **pre-damage / about-to-be-damaged** timing where the trigger wording requires it; extend Prismatic Wall interception from creature movement to **missiles, breath weapons, gases/poisons, gaze/detection lines, and magic trajectories**; implement the Rod of Cancellation's ordinary magical-item strike procedure outside the special Prismatic interaction; complete **Shapechange** adoption of exceptional form-specific attacks, immunities, and vulnerabilities; and then continue the remaining non-spell BECM RAW audit.

## v0.4.50 — High-magic cross-system integration: Timestop release, Immunity scaling, Contingency events, and Prismatic cancellation

This checkpoint begins the post-spell-list **cross-system RAW integration pass** identified at the end of v0.4.49. No new spell level is invented. Instead, procedures that were already registered as individual spells are now connected to the shared combat/effect lifecycle where their printed rules depend on interactions with other magic.

The source hierarchy is unchanged: **Mentzer D&D - BECM remains primary** and the **Rules Cyclopedia remains secondary consolidation where compatible**. In particular, the compatible consolidated descriptions explicitly state that Immunity reduces quantifiable fourth- and fifth-level spell effects, that Contingency triggers immediately when its stated situation occurs, that non-instantaneous spells created during Timestop wait until normal time resumes, and that Wish or a Rod of Cancellation removes only the three outermost remaining colors of a Prismatic Wall. This checkpoint connects those already-registered spell records to common engine state rather than creating parallel special cases.

### Timestop deferred-spell lifecycle

Timestop now has a real **deferred spell queue** instead of merely freezing other creatures and pausing existing round counters.

When the Timestop caster casts a spell whose printed duration is not instantaneous, the spell is created during stopped time but does **not** begin operating immediately. Its target/order declaration is stored on the active Timestop record. When the final stopped-time round expires, Timestop is removed first and the queued spells are then resolved in order; their own durations begin at that point, so none of their duration is consumed while time is stopped.

A bounded list of spells whose source duration is explicitly **Instantaneous** remains immediate. Such a spell may operate on the caster/world as permitted, but an instantaneous attack directed at another creature frozen in normal time cannot harm that creature. The first regression case uses **Fly** as a duration spell and verifies that no Fly effect exists until Timestop ends; a second case verifies that an instantaneous **Disintegrate** cannot injure a frozen creature.

The queue deliberately does not pretend that every unusual spell with a `Special` duration has been classified as instantaneous. Unclassified non-instantaneous/special procedures are conservatively deferred until the source-specific case is audited.

### Immunity quantifiable-effect integration

The ordinary ninth-level **Immunity** spell now exposes a common spell-effect scalar in addition to the already-live damage/weapon protection from v0.4.49:

- first- through third-level spells resolve to **zero effect** when the relevant recipient is protected;
- fourth- and fifth-level spell effects expose the printed **one-half** scalar, or **one-quarter** when a successful applicable save is represented;
- common tracked numeric spell state now applies that scalar to represented durations, combat-round durations, resave intervals, and standard bonus/penalty fields, rounding fractional results in the protected recipient's favor;
- ordinary healing now honors the same spell-level interaction instead of bypassing Immunity merely because it is beneficial;
- **Cure Light Wounds** and the dedicated combat paths for **Magic Missile, Sleep, and Charm Person** now explicitly recognize ordinary Immunity rather than only artifact immunity;
- a beneficiary may deliberately suppress Immunity for the current represented round/cast so beneficial magic can pass, after which the protection resumes.

This is a substantial common-system bridge, but it is not yet a claim that every bespoke binary fourth-/fifth-level spell outcome is mathematically reducible. Effects whose source result is inherently all-or-nothing, or whose handler mutates bespoke world state outside the common effect registry, remain individual audit targets rather than being silently assigned invented “half conditions.”

### Contingency event execution

Contingency no longer stops at storing prose. It now has a **common trigger/execution hook**.

A Contingency may optionally store a structured trigger specification alongside the player's exact trigger wording. When the campaign/combat layer supplies a matching represented event, the engine enforces the spell's **120-foot locality**, consumes the one Contingency, and immediately resolves the already-specified secondary Magic-User spell with its stored target/effect order. Missing secondary target/effect details still cause the secondary spell to fail rather than being invented.

Free-form English conditions are still not guessed. A prose-only Contingency remains marked as requiring a referee/common-event confirmation; an explicit `conditionMet` event can trigger it once the referee/AI has established that the fictional condition actually occurred. This separates **event execution**, which is now deterministic, from arbitrary natural-language world observation, which remains a referee boundary.

### Prismatic Wall powerful-magic cancellation

The common Prismatic Wall layer state now supports the second printed removal path in addition to the existing ordered one-color remedy sequence. **Wish** removes exactly the **three outermost remaining colors**. A shared **Rod of Cancellation** resolver performs the same three-color operation for the item path, so later item-use integration does not need to reimplement Prismatic Wall layer ordering.

The operation is stateful: if red/orange/yellow are still outermost, they are removed first; a later cancellation therefore removes green/blue/indigo, leaving violet. If three or fewer colors remain, the surviving colors are removed and the wall ends. The spell remains immovable, retains its nearest-plane extension, and still cannot be bypassed by planar/dimensional travel or an active Anti-Magic Shell merely because this cancellation path now exists.

Universal interception of every movement segment, projectile, breath line, gaze, poison/gas effect, and detection ray against represented Prismatic Wall geometry is still a later geometry integration task. The current change closes the powerful-magic **layer-removal** rule, not every possible world collision.

### Validation

Six new deterministic regression groups raise the integrated core suite from **565 to 571 tests**. They cover: deferred non-instantaneous Timestop magic; instantaneous attacks against frozen targets; three-color Wish/Rod Prismatic Wall cancellation; fourth-level timed-effect scaling plus beneficial-spell Immunity suspension; structured Contingency execution; and the explicit refusal to guess free-form Contingency prose.

The exact final `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic core harness was executed **five consecutive times** in installed Chromium through Playwright against the exact final document content:

```text
Build: 0.4.50
Tests: 571 / 571 passed
Failures: 0
State isolation: preserved
Runs: 5 / 5 clean
Runtime exceptions/page errors: 0
Console errors: 0
```

### Remaining high-magic RAW boundary after v0.4.50

The next integration work should continue from these shared hooks rather than add another spell tranche. Highest-value remaining items are: route ordinary Immunity through every remaining bespoke first- through fifth-level recipient handler and audit binary/non-registry fourth-/fifth-level effects individually; connect structured Contingency triggers to more native combat/world events without pretending to understand arbitrary prose automatically; route actual Rod of Cancellation inventory use into the common three-color Prismatic resolver; perform universal Prismatic Wall geometry interception; audit all form-specific Shapechange abilities through the transformation profile; and continue the remaining non-spell BECM RAW audit once those high-magic interactions are closed.

## v0.4.49 — Complete ninth-level Magic-User spell tranche and mortal spell-level closure

This checkpoint advances the formal **Mentzer BECM RAW spell-compliance pass through the complete printed ninth-level Magic-User list**. With this tranche, every ordinary Mentzer Magic-User spell level (1–9) and Cleric spell level (1–7) now has a registered source-bounded procedure in `RAW_STRICT`; the next work is no longer “the next spell level,” but the remaining **cross-system integration and non-spell RAW gates**. The source hierarchy remains unchanged: **Mentzer D&D - BECM.pdf is primary**, with the Rules Cyclopedia used only as compatible secondary consolidation.

Mentzer's ninth-level list contains **Contingency, Create Any Monster, Gate, Heal, Immunity, Maze, Meteor Swarm, Power Word Kill, Prismatic Wall, Shapechange, Timestop, and Wish**. **Close Gate** is now a first-class reversed ninth-level Magic-User/Elf spell variant rather than only an order flag on Gate.

### Ninth-level procedures

- **Contingency** is touch-range, indefinite, limited to one contingency per creature/item even by Wish, and accepts only a Magic-User spell of **4th level or lower that does not normally cause damage**. The exact trigger wording, the secondary spell, and the **120-foot trigger locality** are stored. Missing required details cause failure rather than engine invention. Arbitrary prose-trigger recognition remains an explicit referee/event-layer boundary; the record does not pretend that every possible English condition can already be observed automatically by the simulation.
- **Create Any Monster** uses **90-foot range**, **3-turn duration**, and a total created-Hit-Dice budget equal to caster level. Humans and demihumans are rejected. Creatures with **three or more special-ability asterisks** require a represented one-hour study. The construct branch creates one permanent construct from proper represented materials; the minimum is **5,000 gp per asterisk**, doubled for a construct with four or more asterisks. Created monsters retain the printed Protection from Evil / Anti-Magic blocking metadata.
- **Gate / Close Gate** continues to use the already-live planar lifecycle rather than creating a duplicate ninth-level subsystem: Outer-Plane Gates last one turn; other Gates last 1d100 turns and perform the printed 10% per-turn wanderer check; Elemental Gates create vortex/wormhole state; named Outer-Plane contact uses the 95%/5% responder result and 1d6-round arrival. Close Gate destroys an ordinary Gate or a permanent nearby-plane Gate while not banishing an Immortal already present.
- **Heal** now resolves as the Magic-User form of Cureall: touch range; wounds leave exactly **1d6 damage**, or one represented curse, poison, paralysis, disease, blindness, Feeblemind, or Raise Dead recovery state is removed. The existing Power Word Blind caster-level cure gate is preserved.
- **Immunity** lasts **one turn per caster level** and now participates in ordinary damage resolution. It totally negates 1st–3rd-level spell damage, all missile damage, and normal/silver weapon damage; 4th–5th-level spell damage is halved, or quartered when its applicable saving throw succeeds; magical hand-held weapons inflict half damage; natural attacks remain unaffected. A source-faithful one-round concentration suspension helper is present so protection can be dropped and return automatically. Universal scaling of every non-damage numeric 4th/5th-level spell consequence is still a named cross-system integration gate rather than silently approximated.
- **Maze** places one represented target within **60 feet** into an indestructible Astral maze with **no saving throw**. Escape time is keyed to Intelligence exactly: Int 1–8 = 1d6 turns; 9–12 = 2d20 rounds; 13–17 = 2d4 rounds; 18+ = 1d4 rounds. The victim is action-disabled while absent and retains the exact represented departure position for return.
- **Meteor Swarm** implements both printed configurations: **four meteors** dealing 8d6 strike + 8d6 blast each, or **eight meteors** dealing 4d6 strike + 4d6 blast each. A creature can be the direct target of only one meteor; strikes never miss and allow no save, while each **20-foot-radius** fiery blast grants its own Spell save for half and overlapping blasts stack independently. The deterministic geometry path currently requires a represented creature center for each meteor; arbitrary empty-point aiming remains a geometry-layer boundary.
- **Power Word Kill** uses current hit points at **120-foot range**: one target at 1–60 hp is slain, 61–100 hp is stunned for 1d4 turns, and 101+ hp is unaffected. Up to five creatures can be slain by the multiple-target form only when every target has 20 hp or less. Magic-Users, Elves, and represented creatures that cast Magic-User spells receive the source special **Spell save at -4**.
- **Prismatic Wall** lasts **6 turns** and supports the printed 10-foot-radius sphere centered on the caster or a flat vertical/horizontal surface of up to **500 square feet**. All seven layers are stored in fixed order with their blocking effects, damage/save consequences, planar extension, immovability, and Anti-Magic passage rule. The sequential remedy procedure is executable: magical cold, magical lightning, Magic Missile, Passwall, Disintegrate, Dispel Magic, then Continual Light. A creature crossing represented layers can resolve the red/orange/yellow fixed damage and the green/blue/indigo/violet saving-throw consequences. Universal movement interception and arbitrary wall crossing are still geometry integration work.
- **Shapechange** is self-only for **one turn per caster level**. The caster keeps mind, hit points, and saving throws while represented AC, Hit rolls, special attacks, immunities, strengths, and flaws come from the familiar form. Unique/unseen creature forms are rejected; familiar objects obey the printed **1 foot of height and 100 cn of weight per caster level** limits. Only bipedal-humanoid creature forms permit spellcasting. Further changes require a full round of concentration in combat and the raw effect now feeds the common transformation profile rather than remaining a decorative record.
- **Timestop** runs for **2–5 magical rounds**. Other actors are frozen by the common action gates and are invulnerable to the caster's direct attacks; the caster receives normal one-action-per-round cadence, remains vulnerable to ongoing environmental/fire/cold/gas hazards, and the common raw-spell round clock pauses ordinary round-based spell effects while time is stopped. Held-item immobility, wearer invisibility to normal-time creatures, and Protection from Evil / Anti-Magic passage restrictions are stored. Fully queueing every non-instant spell cast during stopped time for release at resume remains a cross-system timing edge.
- **Wish** now enforces the primary Mentzer Magic-User qualification of **level 33–36 and Intelligence 18+** before either a bounded deterministic Wish case or referee resolution can occur. Exact player wording is preserved. The record carries the printed no-XP/no-level rule, **50,000 gp** treasure ceiling and unrecoverable 1 XP-per-gp cost, temporary ability-score range 3–18 for six turns, short-term magic-item ceiling of **+5** for 1d6 turns, artifact exclusion, harmful-target save/rebound rule, and the existing bounded Elemental-Gate permanence case. Free-form Wish interpretation remains deliberately referee-authored rather than converted into an unsafe generic command language.

### Common integration added in v0.4.49

Ninth-level work also closes several shared-engine holes. Raw Shapechange now participates in the same transformed AC/natural-attack/spellcasting profile used by other transformation procedures. Maze and Timestop feed the ordinary movement/attack/spellcasting gates. Timestop pauses the existing combat-round spell timers instead of allowing Cloudkill, Dance, Telekinesis, delayed fireballs, and similar effects to age while no normal time passes. Immunity is inserted into both PC and monster damage pipelines, and artifact/common damage routing now passes the same damage context to monsters so spell level, weapon type, missile state, saving-throw state, and magical status are available consistently.

The old regression assumptions that deliberately treated Contingency as the “next unimplemented spell” have been retired. `RAW_STRICT` now tests a different failure mode: a high-level spell such as Contingency can be registered yet still refuse execution when the player has not supplied source-required trigger/secondary details.

### Deliberately bounded ninth-level and post-spell edges

Completion here means **spell-level registry/procedure closure at the project's source-bounded standard**, not that every possible interaction in the entire BECMI rules corpus is now universally automated. The important remaining high-magic integration gates are: free-form Contingency trigger observation/execution; generic 4th/5th-level non-damage quantifiable scaling under Immunity; automatic one-round Immunity suspension through every beneficiary spell path; empty-point Meteor Swarm targeting; universal Prismatic Wall crossing/interception and Wish/rod three-color cancellation routing; all form-specific exceptional monster powers under Shapechange; and complete deferred release of duration spells created during Timestop. Wish intentionally remains partly referee-authored because its printed procedure itself depends on exact wording, intent, balance, and DM judgment.

These boundaries are explicit. They do not re-open a missing spell level and they do not make `LEGACY_FALLBACK` count as RAW implementation.

### Validation

Twelve new v0.4.49 regression groups raise the integrated deterministic suite from **553 to 565 tests**. They cover ninth-level registry/Close Gate reversal completeness; Contingency; Create Any Monster; Heal; Immunity; Maze; Meteor Swarm; Power Word Kill; Prismatic Wall; Shapechange; Timestop; and Magic-User Wish qualification/referee state. All preceding regressions continue to pass after older “ninth level is unimplemented” assertions were advanced to the new boundary.

The exact final `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete browser harness was executed **five consecutive times** in installed headless Chromium against the exact final document content via the Chrome DevTools protocol:

```text
Build: 0.4.49
Tests: 565 / 565 passed
Failures: 0
State isolation: preserved
Runs: 5 / 5 clean
Runtime exceptions/page errors: 0
Console errors: 0
```

### RAW boundary after v0.4.49

The ordinary **Mentzer mortal spell-level pass is now closed**: Magic-User levels 1–9 and Cleric levels 1–7 have source-bounded handlers, with source-valid reversals registered as first-class forms. The next implementation pass should therefore return to the outstanding cross-system/non-spell completion gates already identified by the broader audit rather than inventing a tenth spell level. The highest-value immediate target is the **high-magic interaction layer** just named above—especially generic Immunity scaling, Contingency trigger lifecycle, Timestop deferred spell release, and Prismatic Wall universal crossing/cancellation—followed by the remaining Weapon Mastery, planar, artifact, class-endgame, exceptional-monster, treasure, and world encounter integration gates.

## v0.4.48 — Source-bounded eighth-level Magic-User/Elf tranche, persistent high magic, and mental-state integration

This checkpoint advances the formal **Mentzer BECM RAW spell-compliance pass through the complete printed eighth-level Magic-User/Elf spell list** while preserving the existing house procedures and compatibility modes. The source hierarchy remains unchanged: **Mentzer D&D - BECM.pdf is primary**; **Rules Cyclopedia.pdf** is secondary only where compatible. `RAW_STRICT` now recognizes every eighth-level spell printed in Mentzer's Master rules and the source-valid reversals as bounded executable procedures. `LEGACY_FALLBACK` remains compatibility-only and is not evidence of RAW completion.

Mentzer's primary eighth-level list contains exactly **twelve** spells: **Clone, Create Magical Monsters, Dance, Explosive Cloud, Force Field, Mass Charm, Mind Barrier, Permanence, Polymorph Any Object, Power Word Blind, Symbol, and Travel**. The later Rules Cyclopedia inserts **Steelform** into its consolidated eighth-level list, but because this project explicitly gives Mentzer BECM precedence where the sources differ, Steelform is not added to the strict Mentzer eighth-level registry.

### Eighth-level Magic-User / Elf spells

All twelve primary-source eighth-level spell names now have dedicated source-bounded handlers:

- **Clone** — **10-foot range** and permanent creation from a represented flesh sample. Human/demihuman clones require **one pound of flesh**, materials costing **5,000 gp per original Hit Die**, and **one week of growth per original Hit Die**. Character Hit Dice use the class Hit-Dice cap rather than equating high experience level with additional Hit Dice. A completed human/demihuman clone is nonmagical and cannot be dispelled. The engine enforces one represented clone per character, records the original's source snapshot, and implements the dangerous same-plane coexistence lifecycle: awareness/emotional link, the clone's obsession with destroying the original, the **one-day-per-caster-level** deadline, clone insanity on failure, the original's permanent **-1 Intelligence/-1 Wisdom**, the subsequent **5% per day** insanity check, and the final one-week unrecoverable-death state if that check succeeds. Different-plane separation delays the mind-link until the two occupy the same plane.
- **Clone — simulacrum branch** — a clone of another living creature requires **1% of its flesh**, costs **500 gp per original hit point**, and grows for **one week per Hit Die**. The record begins at the printed **50% Hit Dice/hit points/damage**, **50% special-ability** chance, and no original spells or spell-like abilities; it obeys its creator, supports the **10 feet per caster level** concentrated mental-command range, and is marked enchanted/dispellable/protection-from-evil-blockable. If the original is dead, represented growth advances **5% per week** to the printed **90% maximum**, after which missing special abilities, including spells, may be checked at the 90% rate.
- **Create Magical Monsters** — **60-foot range**, **two-turn duration**, and a total created-Hit-Dice budget equal to caster level. Creatures may possess no more than **two asterisks/special abilities**; humans and demihumans are rejected and undead are permitted. Fractional-HD accounting preserves the printed special cases: a **1-1 HD** creature counts as 1 HD and a creature of **1/2 HD or less** counts as 1/2 HD. The construct branch requires represented proper materials, creates only one construct, makes it permanent, retains the two-asterisk maximum, and enforces at least **5,000 gp per asterisk** in material cost.
- **Dance** — hostile touch requires the ordinary Hit Roll and permits **no saving throw**. The victim cannot attack, cast spells or spell-like abilities, or flee; common action gates now enforce that state. The victim also suffers the printed **-4 on Saving Throws** and **+4 worsening of Armor Class**. Duration follows the exact caster-level bands: **3 rounds at levels 18-20, 4 at 21-24, 5 at 25-28, 6 at 29-32, and 7 at 33-36**.
- **Explosive Cloud** — **1-foot range**, **six-turn duration**, and the same represented **30-foot-diameter, 20-foot-high** moving cloud geometry as Cloudkill. It moves **20 feet per round / 60 feet per turn**. Every represented creature in the cloud makes a fresh Spell save each round or is paralyzed for that round and takes unavoidable explosive damage equal to **one point per two caster levels, rounded down**. The damage is explicitly untyped for resistance purposes so ordinary fire, gas, electricity, or similar immunities do not negate it.
- **Force Field** — **120-foot range** and **six-turn duration**. The engine supports the printed bounded forms: sphere/part of a sphere up to **20-foot radius**, flat/combined surfaces up to **5,000 square feet**, cylinder, and rectangular box/part thereof. The field is invisible, immovable, perfectly smooth, and cannot appear through represented creatures or solid matter; represented overlap becomes a hole rather than harmful displacement. Ordinary Dispel Magic cannot remove it. **Disintegrate** and explicit Wish handling can. The record preserves that nothing physical or magical passes through while Teleport, Dimension Door, and planar travel may bypass it, and that a sealed field magically preserves occupants from natural death by starvation or lack of air.
- **Mass Charm / Remove Charm** — **120-foot range**, up to **30 total levels/Hit Dice**, individual Spell saves at **-2**, and no effect on a creature of 31+ levels/HD. Continuing charm state now uses the complete printed Intelligence cadence rather than the earlier coarse approximation: Int 0/1/2/3 save again after **120/90/60/45 days**; Int 4-5 after **30 days**; 6-8 after **15 days**; 9-12 after **7 days**; 13-15 after **3 days**; 16-17 after **24 hours**; 18 after **8 hours**; 19 after **3 hours**; 20 after **1 hour**; and 21+ after **1 turn**. An attack by the caster breaks that victim's represented charm. **Remove Charm** clears represented charm effects in a **20-foot cube** and suppresses represented charm-producing objects there for **one turn**.
- **Mind Barrier / Open Mind** — the normal form has **10-foot range** and lasts **one hour per caster level**. An unwilling recipient may save. The recipient is hidden from represented ESP, clairvoyance/clairaudience, crystal-ball and similar mental-information procedures, and gains **+8 on saves against mind-influencing effects** while retaining the universal natural-1 failure rule. The reversed **Open Mind** is a hostile touch requiring the normal Hit Roll and imposes the corresponding **-8** saving-throw modifier. Both forms now feed the common mental-detection and saving-throw paths rather than remaining decorative effect records.
- **Permanence** — **10-foot range**, permanent until valid dispelling, and limited to an eligible **Magic-User spell of 7th level or lower** that is neither instantaneous nor already permanent. Clerical spells and eighth-/ninth-level Magic-User spells are rejected; the referee may still disallow a source-legal combination for game balance as Mentzer directs. Creature, item/area, and weapon limits are represented (**two**, **one**, and **five** permanent effects respectively). Each weapon permanence after the first receives its independent **25% failure chance**, and failure destroys the represented weapon. A successful permanence can be dispelled by the original caster or a higher-level spellcaster; removing the permanence also removes its linked spell effect.
- **Polymorph Any Object** — **240-foot range**, represented objects or creatures, and the printed **-4 Spell save** for creatures. A section of a greater whole is limited to one **10-foot cube**. The engine uses the animal/vegetable/mineral kingdom ladder exactly: no kingdom change is permanent until dispelled; an adjacent animal↔vegetable or vegetable↔mineral change lasts **one hour per caster level**; animal↔mineral lasts **one turn per caster level**. Hit points and age remain unchanged and a creature produced by the transformation is not automatically friendly.
- **Power Word Blind** — **120-foot range**, no saving throw, and exact hit-point bands: **1-40 hp = 1d4 days**, **41-80 hp = 2d4 hours**, and **81+ hp = unaffected**. Blindness imposes **-4 on Saving Throws** and worsens Armor Class by **4** through the common save/AC paths. Cure Blindness or Cureall removes the effect only when cast by a Cleric whose level is at least the original caster's level; Cureall can now apply this check to represented combat monsters as well as PCs.
- **Symbol** — touch, permanent fixed rune, with the caster choosing a printed rune when the spell is prepared/cast. The executable set is **Death, Discord, Fear, Insanity, Sleep, and Stunning**. Passage normally triggers without a save; a Magic-User or ordinary Magic-User-spellcasting creature may attempt a Spell save only when merely reading or touching the rune. Death slays represented creatures at **75 hp or less**; Discord stores the persistent ally-attack/confusion state; Fear applies the **30-round** forced-flight state; Insanity blocks attacks, spellcasting, special abilities/items while leaving ordinary walking possible; Sleep stores **1d10+10 hours** of unawakenable sleep; and Stunning affects creatures of **150 hp or less** for **2d6 turns**.
- **Travel** — reuses the same source procedure already implemented for the seventh-level Cleric form: self-only, **one turn per caster level**, flight at **360 feet per turn / 120 feet per round**, one-round concentration to enter a nearby plane with at most one plane shift per turn, and transport of one additional touched creature per five caster levels with a Spell save for unwilling passengers. One full round of uninterrupted concentration changes the caster to gaseous form at **720 feet per turn / 240 feet per round**; the gaseous caster cannot use items or cast spells, is harmed only by magic, and cannot cross Protection from Evil or Anti-Magic Shell barriers.

### Eighth-level common-system integration

The spell pass adds several cross-system corrections rather than treating high-level magic as isolated registry entries. Charm timing now uses the full Basic intelligence table across Charm Person, Charm Monster, and Mass Charm. Dance and Power Word Blind feed ordinary action, Armor Class, and saving-throw calculations. Mind Barrier/Open Mind feed ordinary mental-detection and saving paths. Force Field participates in ordinary dispelling/disintegration logic. Permanence links the permanent effect to the spell it sustains so a valid dispel removes both. Clone growth is processed by campaign time, and the Power Word Blind cure-level gate now works on represented monster targets through both Cure Blindness and Cureall.

### Deliberately bounded eighth-level edges

The eighth-level registry is complete at the same **source-bounded executable** standard as the earlier spell tranches, but several procedures deliberately stop where the current world model stops rather than inventing facts:

- **Clone** stores source snapshots, growth, mind-link, insanity, and simulacrum advancement, but it does not automatically manufacture a second fully playable PC with every historical memory, inventory consequence, off-scene action, and campaign relationship. Universal damage mirroring between an original and clone outside represented resolution paths remains a broader actor-state integration task.
- **Create Magical Monsters** creates persistent bounded records, but arbitrary monster stat blocks still come from the campaign's represented creature catalog rather than being invented from a requested name.
- **Force Field** enforces represented geometry and spell interactions but cannot perform universal collision against walls, creatures, missiles, or planar structures the world model has never represented.
- **Mass Charm** now breaks when the caster attacks a represented victim, but the rule granting another save to other charmed witnesses requires represented perception/line-of-sight; the engine does not declare that an off-scene or occluded creature witnessed an attack.
- **Permanence** enforces spell eligibility and capacity, but the separate Master magic-item research/construction system remains responsible for the broader rule that permanent enchanted-item creation requires Permanence under the primary Mentzer text.
- **Polymorph Any Object** records the exact kingdom-duration and preservation rules, but arbitrary form-specific ecology and every derived capability of an unrepresented new form remain referee/content-layer responsibilities.
- **Symbol** can resolve represented passage/read/touch triggers and the six printed effects, but it does not invent a creature crossing a rune or universally intercept every arbitrary monster special-ability producer when no such action is represented.

These are representation boundaries; they do not permit `LEGACY_FALLBACK` to count as RAW completion.

### Validation

Twelve new v0.4.48 regression groups raise the deterministic core suite from **541 to 553 tests**. They cover eighth-level registry/reversal completeness and the ninth-level strict boundary; Clone; Dance; Explosive Cloud; Force Field; Mass Charm/Remove Charm; Mind Barrier/Open Mind; Permanence; Polymorph Any Object; Power Word Blind including monster-target Cureall; Symbol; and Create Magical Monsters.

The exact final `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic core harness was then executed **five consecutive times** in installed Chromium through Playwright against the exact final document content:

```text
Build: 0.4.48
Tests: 553 / 553 passed
Failures: 0
State isolation: preserved
Runs: 5 / 5 clean
Runtime exceptions/page errors: 0
Console errors: 0
```

### Remaining RAW spell boundary after v0.4.48

The formal mortal spell pass can now advance to the **ninth-level Magic-User/Elf list**. As with earlier tranches, pre-existing artifact powers, shared helpers, or partial campaign procedures do not count as mortal RAW completion until each spell has been audited against its printed procedure.

The next tranche is therefore **Contingency, Create Any Monster, Gate / Close Gate, Heal, Immunity, Maze, Meteor Swarm, Power Word Kill, Prismatic Wall, Shapechange, Timestop, and Wish**. Completing that tranche will close the ordinary Mentzer BECM Magic-User spell-level registry before the audit moves on to remaining cross-system integration and non-spell RAW gaps.

## v0.4.47 — Source-bounded seventh-level spell tranche and Mentzer 20-die spell-cap correction

This checkpoint advances the formal **Mentzer BECM RAW spell-compliance pass through the complete printed seventh-level Magic-User/Elf and Cleric spell lists** while preserving the existing house procedures and compatibility modes. The source hierarchy is unchanged: **Mentzer D&D - BECM.pdf is primary**; **Rules Cyclopedia.pdf** is secondary only where compatible. `RAW_STRICT` now recognizes all printed seventh-level spells and their source-valid reversals as bounded executable procedures. `LEGACY_FALLBACK` remains a compatibility mode and does not count as RAW completion.

This pass also corrects an important source-reading error introduced in v0.4.43. The higher-level Mentzer BECM text explicitly establishes a **maximum of 20 damage dice from any single spell**, naming **fire ball, lightning bolt, and delayed blast fire ball** as examples. The earlier third-level pass had read the lower-level spell descriptions in isolation and incorrectly removed that cap. Build 0.4.47 restores the primary-source rule throughout the ordinary mortal spell engine and updates the regression suite accordingly.

### Seventh-level Magic-User / Elf spells

All twelve printed seventh-level Magic-User/Elf spell names now have dedicated source-bounded handlers:

- **Charm Plant** — **120-foot range** and a duration of **six months**, until dispelled, or until winter dormancy. One casting can affect one tree, six bushes, twelve shrubs, or twenty-four smaller plants. Ordinary vegetation receives no saving throw; represented plant monsters receive the printed Spell save before becoming charmed.
- **Create Normal Monsters** — **30-foot range**, **one-turn duration**, and a total created-Hit-Dice budget equal to the caster's level. Creatures with special abilities, humans, demihumans, and undead are rejected when represented as such. Creatures below one Hit Die use the printed fractional accounting, and all normal weapons/armor created with the monsters vanish when the spell ends.
- **Delayed Blast Fire Ball** — **240-foot range**, selectable **0–60-round delay**, and the same **20-foot-radius** explosion as the source spell. The resulting magical gem can be physically carried but not magically moved, and the engine now enforces Mentzer's global **20-die maximum**, so mortal damage tops out at **20d6**. Each represented victim receives the normal Spell save for half damage.
- **Lore** — a held item requires **1d4 turns** of study; a place, person, or non-held item requires **1d100 days**. The engine records the subject, elapsed study requirement, one-function-at-a-time magical-item limitation, and the fact that answers concerning legendary or unrepresented facts remain referee-authored rather than fabricated.
- **Magic Door / Magic Lock** — Magic Door creates the printed invisible caster-only passage through up to **10 feet of nonliving solid material** and records its **seven one-way uses**. Magic Lock creates the corresponding caster-only impassable portal with the same seven-use/dispel lifecycle; Knock and ordinary magical-item bypasses are explicitly ineffective against the seventh-level lock.
- **Mass Invisibility / Appear** — Mass Invisibility selects represented recipients within one **60-foot-square area** inside **240 feet**, gives each recipient an independent invisibility state, and breaks that recipient's effect when they attack or cast. The reversal, Appear, affects a represented **20-foot cube**, removes represented invisibility, and prevents affected creatures/objects from becoming invisible again for **one full turn**.
- **Power Word Stun** — **120-foot range**, no saving throw, and the printed hit-point bands: **1–35 hp = 2d6 turns**, **36–70 hp = 1d6 turns**, and **71+ hp = no effect**.
- **Reverse Gravity** — **90-foot range**, a represented **30-foot cube**, and the printed **two-second** reversal with a maximum upward fall of **65 feet**. No save is allowed. Where an obstruction distance is represented, upward and return falls inflict the ordinary **1d6 per 10 feet** falling damage; unknown ceiling geometry is left explicit rather than invented.
- **Statue** — self-only for **2 turns per caster level**, with the caster able to change to or from statue form no more than once per round. Statue form is **AC -4**, cannot move, does not breathe, and is immune to normal weapons plus normal or magical fire/cold; magical weapons and other eligible spells remain effective. These protections and action gates now feed common Armor Class, breathing, damage, and action predicates.
- **Summon Object** — infinite range to a specifically prepared nonliving object at the caster's home, maximum **500 cn**, with the printed **1,000 gp preparation powder** requirement, familiarity/exact-location requirement, and possessor branch. If another being possesses the object, it does not arrive and the caster receives the approximate possessor/location information rather than the engine forcing retrieval.
- **Sword** — creates the source magical sword within **30 feet** for **one round per caster level**. While the caster concentrates, it attacks **twice per round** using the caster's attack level, inflicts two-handed-sword damage (**1d10**), and can hit targets regardless of ordinary magical-weapon requirements. Its duration and concentration state are live combat records; Dispel Magic/Wish removal and unrepresented autonomous targeting remain bounded by represented combat state.
- **Teleport Any Object** — touch range and the normal Teleport destination/error procedure, extended to nonliving objects. The weight limit is **500 cn per caster level**; represented holders or unwilling creatures receive the printed **-2 Spell save**. The caster teleporting themself has no error chance. Too-high results invoke falling/object-breakage state, too-low results destroy the object/recipient, and a solid part of a larger whole is bounded to the printed **10-foot cube**.

### Seventh-level Cleric spells

All eight printed seventh-level Cleric spell names now have bounded executable procedures:

- **Earthquake** — **120-yard range**, **one-turn duration**, and a base **60-foot-square** area at 17th level, increasing each dimension by **5 feet per caster level above 17th**. Represented small structures can be reduced to rubble, larger construction/earth formations receive the printed cracking/rockslide state, and creatures in represented fissure danger use the printed **1-in-6** selection followed by a Death Ray save to escape crushing.
- **Holy Word** — affects all represented creatures within **40 feet**. Creatures of another alignment are subject to the printed level/HD table: up to 5th are killed; levels 6–8 are stunned **2d10 turns**; levels 9–12 are deafened **1d6 turns**; level/HD 13+ are stunned **1d10 rounds**. Same-alignment creatures and level/HD 13+ creatures receive the printed Spell save to avoid the effect. A represented **100% Anti-Magic Shell** blocks the word.
- **Raise Dead Fully / Obliterate** — the normal form restores a human or demihuman at full hit points without the ordinary Raise Dead recovery penalty and uses the expanded **four months at 17th level + four months per additional level** death limit. Other living creatures use the ordinary Raise Dead recovery procedure. Against undead, the spell destroys **7 HD or less**, forces **7–12 HD** to save at **-4** or be destroyed, and inflicts **6d10** with a Spell save for half against more than 12 HD. The reversal, Obliterate, mirrors those destructive bands against living creatures and gives undead the printed Cureall-like restoration.
- **Restore / Life Drain** — Restore returns one represented experience level previously lost to Energy Drain and applies the caster's printed one-level sacrifice. The caster's sacrificed level returns only after **2d10 full days of rest**, now tracked through the existing full-rest lifecycle rather than a calendar-expiry shortcut. The reverse, Life Drain, inflicts one ordinary Energy Drain through the common level-loss system and is recorded as the printed Chaotic act.
- **Survival** — touch, **one hour per caster level**, and protection from nonmagical environmental hazards including heat, cold, lack of air, hunger, thirst, and sleep deprivation. The state now feeds both environmental-damage/breathing predicates and daily provisioning so an affected character does not consume food/water or accumulate deprivation while protected. Magical damage, breath weapons, and creature attacks remain unaffected.
- **Travel** — self-only for **one turn per caster level**. The caster can fly at **360 feet per turn / 120 feet per round**, can perform the printed nearby-plane shift by one round of concentration, and can assume gaseous form by one full round of concentration for **720 feet per turn / 240 feet per round**. Gaseous Travel blocks item use and spellcasting, retains carried equipment, and preserves the printed magic-only damage and barrier restrictions as source state. Existing represented movement/elevation now recognizes the spell.
- **Wish** — limited to a **36th-level Cleric with Wisdom 18 or greater**. The engine requires the requested wish wording and records it for referee adjudication under the printed Wish guidelines rather than manufacturing unrestricted outcomes. Existing explicitly modeled Wish interactions remain available where the source supplies a deterministic result.
- **Wizardry** — self-only for **one turn or until used**, enabling one item normally restricted to Magic-Users: a represented device or a scroll spell of **1st or 2nd level**. The spell stores the minimum necessary Magic-User caster level for the borrowed effect and consumes its window after the eligible use.

### Common-system integration and source correction

Seventh-level states are connected to common engine predicates rather than left as decorative records. Statue feeds Armor Class, action, breathing, and damage immunity checks; Survival feeds environmental damage and the daily food/water pipeline; Travel supplies combat movement/elevation and gaseous spellcasting restrictions; Holy Word's round-based stun is decremented by the common round clock; Delayed Blast Fire Ball counts down and detonates through that same clock; Mass Invisibility uses the ordinary invisibility break path; and Restore recovery advances only through completed full rest days.

The common spell-damage helper now applies Mentzer's **20-die maximum** to per-level spell damage. The Delayed Blast Fire Ball profile also drops an inherited extra-die assumption so it is exactly the source **1d6 per caster level, maximum 20 dice**. Master Artifact attack packets remain separately source-defined; the correction prevents an artifact implementation or a lower-level spell description from overriding the global mortal-spell rule.

The formal strict-completion boundary has moved again. The regression that asks RAW_STRICT to reject the next unimplemented spell now uses **Clone**, the first eighth-level Magic-User spell in the project's Mentzer list.

### Deliberately bounded seventh-level edges

Seventh-level registration is complete at the same source-bounded executable standard as the lower spell levels, but several world/referee edges remain intentionally explicit. Lore does not invent historical knowledge. Magic Door records its seven uses, but arbitrary site-navigation code cannot decrement a passage it does not know was crossed. Mass Invisibility operates on represented recipients rather than fabricating invisible objects or unrepresented observers. Reverse Gravity and Earthquake require represented geometry to resolve exact collisions and structural consequences. Sword has a live combat profile and concentration lifecycle, but fully autonomous target selection outside represented combat remains referee-driven. Statue's transformation state is represented, while unusual free-form attempts to toggle form outside supported action paths may still require referee interpretation. Summon Object cannot discover an item whose preparation/location/possession is absent from state. Travel records planar and gaseous capabilities without inventing unmapped planar routes. Wish remains deliberately referee-authored except where the printed rule gives a deterministic interaction.

These are representation boundaries, not permission for `LEGACY_FALLBACK` to count as RAW completion.

### Validation

Ten new v0.4.47 regression groups raise the integrated deterministic core suite from **531 to 541 tests**. They cover seventh-level registry/reversal completeness; the Mentzer 20-die cap and Delayed Blast Fire Ball countdown; Charm Plant/Create Normal Monsters; Lore/Magic Door/Summon Object/Sword; Mass Invisibility/Appear/Power Word Stun; Reverse Gravity/Statue; Teleport Any Object/Earthquake; Holy Word/Raise Dead Fully/Obliterate; Restore/Life Drain/Survival/Travel; and Clerical Wish/Wizardry.

The exact final `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic browser harness was executed **five consecutive times** against the exact final document content:

```text
Build: 0.4.47
Tests: 541 / 541 passed
Failures: 0
State isolation: preserved
Runs: 5 / 5 clean
Runtime exceptions/page errors: 0
Console errors: 0
```

### Remaining RAW spell boundary after v0.4.47

The formal spell pass can now advance to the **eighth-level Magic-User/Elf list**. BECMI Clerics have no eighth-level spell list. The next tranche is **Clone, Create Magical Monsters, Dance, Explosive Cloud, Force Field, Mass Charm, Mind Barrier, Permanence, Polymorph Any Object, Power Word Blind, Symbol, and Travel**, including their reversals and common-system interactions where applicable.

The primary-source hierarchy remains important at this level: compatible Rules Cyclopedia text may clarify a Mentzer procedure, but Cyclopedia-only additions are not silently promoted into the Mentzer spell list merely because they appear in the later compilation.

## v0.4.46 — Source-bounded sixth-level spell tranche and high-level spell-state integration

This checkpoint advances the formal **BECMI RAW spell-compliance pass through the complete sixth-level Magic-User/Elf and Cleric lists** while retaining the project's existing optional/house procedures as parallel selectable systems. The source hierarchy remains unchanged: the existing project audit treats **Mentzer BECM as primary** and the **Rules Cyclopedia as secondary clarification where compatible**. This continuation cross-checks the sixth-level procedures against the compatible Rules Cyclopedia spell text; it does **not** import later Cyclopedia-only additions that are absent from the project's Mentzer spell lists merely to inflate completeness.

`RAW_STRICT` now recognizes every sixth-level spell and its printed reversals as an executable source-bounded procedure. The next deliberate boundary is the **seventh-level Magic-User/Elf and Cleric lists**. `LEGACY_FALLBACK` remains available for compatibility but still does not count as RAW completion.

### Sixth-level Magic-User / Elf spells

All twelve sixth-level Magic-User/Elf spell names now have dedicated bounded handlers:

- **Anti-Magic Shell** — self-only **12-turn** shell represented as a live **100% Anti-Magic zone** hugging the caster. It suppresses spell effects crossing its exact represented point and prevents the caster's own magic from functioning inside. The spell record explicitly marks ordinary Dispel Magic as ineffective and removes its Anti-Magic zone when the shell ends.
- **Death Spell** — **240-foot range**, represented **60-foot cube**, and one shared **4d8 Hit-Dice capacity**. Living creatures below **8 HD** are processed from lowest Hit Dice upward and each receives the printed Death Ray save. Undead and creatures of 8+ HD are excluded rather than given an invented partial effect.
- **Disintegrate** — **60-foot range**, Death Ray save for creatures, and permanent destruction of a represented failed-save creature or represented nonmagical object. Magical items and spell effects are refused; represented walls use the printed **10-foot-section** boundary.
- **Geas / Remove Geas** — **30-foot range**, initial Spell save, permanent task/prohibition state, rejection/return of explicitly impossible or directly fatal commands, and explicit immunity to ordinary Dispel Magic and Remove Curse. The exact refusal penalties remain referee-authored. Remove Geas is automatic at equal/higher caster level and uses the printed **5% failure per level of disadvantage** for a lower-level remover.
- **Invisible Stalker** — creates one persistent task-bound stalker record that serves regardless of time or distance until the mission is completed or the creature is slain. Its Dispel Evil dismissal interaction is retained without inventing travel results for unrepresented places.
- **Lower Water** — **240-foot range**, **10-turn** duration, up to **10,000 square feet**, half normal depth, constant-source persistence, possible ship grounding, and the printed end-of-spell rushing-water save/hull-damage data. The world layer still decides which represented vessels or shores are actually exposed.
- **Move Earth** — **240-foot range**, six-turn working period, soil-only restriction, movement up to **60 feet per turn**, and a **240-foot** vertical-hole ceiling unless rock intervenes. The resulting terrain change is persistent rather than expiring when the casting period ends.
- **Projected Image** — represented image position within **240 feet** for **6 turns**, no concentration requirement, apparent spell origin at the image, true-caster line-of-sight requirement, immunity to missile/spell attacks against the image, and destruction by represented touch or hand-to-hand contact.
- **Reincarnation** — requires represented remains within **10 feet** and executes the printed d8 body table, including the Lawful/Neutral/Chaotic monster subtable. The new body is persistent; incompatible class/race consequences and demihuman level ceilings are explicitly flagged for campaign-state review rather than silently leaving the old class untouched.
- **Stone to Flesh / Flesh to Stone** — **120-foot range**, permanent restoration of represented petrification or conversion of a represented stone quantity up to a **10-foot cube**. The reversed living-creature form uses the Turn to Stone saving category and petrifies carried equipment along with the victim.
- **Wall of Iron** — **120-foot range**, permanent vertical wall exactly **2 feet thick**, maximum **500 square feet**, support/occupied-space validation, caster-level battering hit points, ordinary-spell resistance metadata, rust-monster single-touch destruction, and the printed **10d10** topple packet.
- **Weather Control** — replaces the former generic weather placeholder with the printed concentration-bound outdoor **240-yard** area. The handler supports the printed rain, snow, fog, clear, intense heat, high winds, and tornado conditions, preserves their movement/visibility/missile/navigation consequences as explicit state, and refuses operation away from the **Prime Plane**.

### Sixth-level Cleric spells

All eight sixth-level Cleric spell names now have bounded executable procedures:

- **Aerial Servant** — requires the represented target description and location or the summoned servant immediately departs. A valid servant records the **one-day-per-level** mission window, **Strength 18**, **500 lb / 5,000 cn** carrying limit, ethereal travel, Protection from Evil barrier, and the printed hostile return if the mission times out.
- **Animate Objects** — **60-foot range**, **6 turns**, nonliving/nonmagical target validation, and a **400 lb / 4,000 cn** total limit. Because the printed spell leaves movement, AC, attacks, and damage to the DM, those values remain referee-authored; the source's man-sized-statue and chair examples are retained as explicit guidelines instead of being generalized into a hidden formula.
- **Barrier / Remove Barrier** — creates the **30-foot-diameter / 30-foot-high**, **12-turn** whirling-hammer barrier with **7d10 damage and no save** for passage. The reverse destroys a represented clerical Barrier or the printed eligible Magic-User wall/form effects while refusing the explicitly protected Wall of Iron / stone/iron/steel-form family.
- **Create Normal Animals** — **30-foot creation range**, **10 turns**, one-to-six loyal normal animals, and **240-foot** command range. The caster selects the number but not the species; RAW_STRICT therefore requires a referee/AI-selected represented normal animal type and rejects giant animals rather than silently allowing the player to choose the species.
- **Cureall** — touch, permanent, and resolves exactly one printed use: wounds leave **1d6 damage** remaining, or one curse, poison, paralysis, disease, blindness, or Feeblemind state is removed. It also implements the printed special interaction that immediately clears the two-week Raise Dead recovery period.
- **Find the Path** — self-only, **6 turns + 1 turn per caster level**, named-place requirement, direction/path state, and the printed possibility of secret-door/password knowledge. Special knowledge remains referee-authored and is flagged as destroyed if the caster attempts to record or disclose it.
- **Speak with Monsters / Babble** — the normal form operates for **one round per caster level** within **30 feet**, allows one question per round, and includes both living and undead creatures, including unintelligent ones. Answers remain referee-authored. Babble uses **60-foot range**, **1 turn per level**, the printed **-2 Spell save**, blocks all communication channels and command-word items, but leaves spellcasting itself possible.
- **Word of Recall** — instantly returns only the cleric and carried equipment to a represented permanent home meditation room. The casting-round automatic-initiative rule is stored when combat is active; the spell refuses to invent a sanctuary that has never been established in campaign state.

### Common-system integration and corrections

The shared concentration layer now also handles **Weather Control**, ending the weather effect on represented movement, attack, spellcasting, or damage. Anti-Magic Shell uses the existing Master Anti-Magic state rather than a parallel spell-only subsystem. Geas, Babble, Projected Image, Aerial Servant, and Anti-Magic Shell gained linked cleanup lifecycles so expiry/dispelling/cancellation cannot leave stale action gates or zones behind.

This checkpoint also moves the formal RAW boundary tests forward: older regressions that intentionally used Anti-Magic Shell as the "next unimplemented spell" now use **Charm Plant**, the first seventh-level spell in the existing Mentzer-derived list. The high-level Weather Control regression was updated from the old generic weather placeholder to the new source-bounded concentration procedure.

### Deliberately bounded sixth-level edges

Sixth-level registration is complete at the project's source-bounded executable standard, but the engine still does not pretend to be omniscient. It does not invent Geas penalties, Invisible Stalker off-screen travel outcomes, Animate Objects combat statistics, a Find the Path password/secret door that is not represented, a Reincarnation body's detailed racial biography, universal geometry collision for walls/earth/water, or the exact fictional effects of a Weather Control tornado outside represented combat/world state. Aerial Servant timeout hostility is represented, but finding/retrieving a remote unrepresented target still requires the referee/world model.

These are explicit representation boundaries, not permission for a generic fallback to count as RAW implementation.

### Validation

Ten new v0.4.46 regression groups raise the integrated deterministic suite from **521 to 531 tests**. They cover sixth-level registry/reversal completeness; Anti-Magic Shell; Death Spell/Disintegrate/Stone-to-Flesh reversal; Geas/Remove Geas; Invisible Stalker/Lower Water/Move Earth/Projected Image/Wall of Iron; Weather Control concentration/plane restrictions; Aerial Servant/Animate Objects/Barrier/Create Normal Animals; Cureall/Remove Barrier; Find the Path/Speak with Monsters/Babble/Word of Recall; and Reincarnation.

The exact updated `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The integrated browser harness passes **531 / 531** with no page or console errors in the validated run set.

### Remaining RAW spell boundary after v0.4.46

The formal spell pass can now advance to the **seventh-level Magic-User/Elf and Cleric lists**. The next tranche is:

- Magic-User/Elf: **Charm Plant, Create Normal Monsters, Delayed Blast Fire Ball, Lore, Magic Door, Mass Invisibility, Power Word Stun, Reverse Gravity, Statue, Summon Object, Sword, Teleport Any Object**.
- Cleric: **Earthquake, Holy Word, Raise Dead Fully, Restore, Survival, Travel, Wish, Wizardry**.

Existing handlers with related names or artifact versions must again be audited as mortal spell procedures rather than assumed complete because some adjacent subsystem already uses similar mechanics.

## v0.4.45 — Source-bounded fifth-level spell tranche, concentration lifecycles, and persistent provision state

This checkpoint advances the formal **Mentzer BECM RAW spell-compliance pass** through the complete printed **fifth-level Magic-User/Elf and Cleric spell lists** while retaining all existing house procedures and compatibility modes. The source hierarchy remains unchanged: **Mentzer D&D - BECM.pdf is primary**; **Rules Cyclopedia.pdf** is secondary only where compatible. `RAW_STRICT` continues to refuse a cast before resource expenditure when the printed procedure is not executable, and `LEGACY_FALLBACK` remains a deliberate compatibility option rather than evidence of RAW completion.

The fifth-level registry is now closed at the same **source-bounded executable** standard used for levels 1–4. This checkpoint also adds a common concentration lifecycle for fifth-level effects whose printed procedures depend on the caster continuing to concentrate. The engine does not invent planar answers, unknown landing areas, unrepresented solid geometry, or free-form quest consequences merely to avoid a referee decision.

### Fifth-level Magic-User / Elf spells

All twelve printed fifth-level Magic-User/Elf spell names now have dedicated bounded RAW procedures:

- **Animate Dead** — the previously completed corpse-to-skeleton/zombie implementation is now registered for the fifth-level Magic-User/Elf path as well as the Cleric path. The one-Hit-Die-per-caster-level budget, skeleton/zombie HD treatment, obedience, no-spells restriction, and sleep/charm/poison immunities remain shared common state rather than duplicated class-specific logic.
- **Cloudkill** — creates the printed **30-foot-diameter, 20-foot-tall** poison cloud next to the caster for **6 turns**, moving **20 feet per combat round / 60 feet per turn** along a represented direction. Living creatures inside take **1 hp per round**; creatures below **5 HD** then make the Poison save or die. The record preserves the source heavier-than-air, thick-vegetation-destruction, and constrained-space properties without fabricating unrepresented terrain collisions.
- **Conjure Elemental** — summons one represented **16 HD, AC -2, 3d8-damage** earth, air, fire, or water elemental, with the printed limit of one of each elemental type per caster per day. The common concentration layer now makes control permanently fail if the caster attacks, casts another spell, or moves more than half normal speed; the elemental becomes uncontrolled, stops obeying the caster, and is marked hostile to its summoner.
- **Contact Outer Plane** — implements planar distances **3–12**, the printed insanity/knowledge/lying table, the **once-per-month** use limit, level-21+ insanity reduction, and insanity recovery of one week per planar-distance point. The engine rolls whether the contacted being knows or lies for represented questions but explicitly leaves the actual answer to the referee/AI rather than inventing divine knowledge.
- **Dissolve / Harden** — **120-foot range**, up to **3,000 square feet** and **10 feet deep/thick**, **3d6-day** duration for Dissolve, and **10% movement at best** through represented mud. Harden permanently changes the same represented mud volume to rock. A represented victim hardened into mud receives the printed Spell save rather than being trapped automatically. Constructed walls are not silently treated as natural soil/rock.
- **Feeblemind** — **240-foot range**, Magic-User/Elf/spellcasting-monster eligibility, **-4 Spell save**, effective Intelligence **2**, helpless/action-gated state, and permanent-until-dispelled lifecycle. Common Dispel Magic cleanup can now clear the linked condition; Cureall remains the other printed removal path for the later sixth-level tranche.
- **Hold Monster / Free Monster** — **120-foot range**, **6 turns + 1 turn per caster level**, any living non-undead creature, one-to-four targets, and the printed **-2 save penalty** when only one victim is selected. Free Monster removes up to four represented Hold Person/Hold Monster paralysis effects and nothing else.
- **Magic Jar** — establishes a represented receptacle within **30 feet**, caster-body trance state, and optional possession attempt against a represented living creature within **120 feet of the jar**. Failed possession locks that victim out for one turn; successful possession stores the victim life force in the jar and limits the borrowed body to normal actions rather than special abilities. Jar destruction while off-scene, arbitrary receptacle movement, and every stranded-life-force edge remain explicit representation boundaries rather than invented outcomes.
- **Pass-Wall** — **30-foot range**, **3-turn** duration, and a **5-foot-diameter, 10-foot-deep** horizontal or vertical opening through represented solid rock/stone only. The engine records the temporary aperture and refuses wood or an unspecified material rather than treating the spell as a generic movement effect.
- **Telekinesis** — **120-foot range**, **6 rounds**, capacity **200 cn per caster level**, concentration, and up to **20 feet of movement per round** in any direction. Represented unwilling creatures receive the printed Spell save. The current bounded handler requires represented weight and geometry instead of guessing object mass.
- **Teleport** — **10-foot recipient range**, same-plane/unoccupied-ground destination restrictions, unwilling Spell save, and the printed **Casual / General / Exact** destination tables. Too-high results move the recipient **1d10×10 feet** above the destination and resolve falling damage; too-low results require an explicitly represented vacant area or are fatal. RAW_STRICT does not invent an unseen safe cavity.
- **Wall of Stone** — **60-foot range**, exactly **2 feet thick**, no more than **500 square feet / 1,000 cubic feet**, support requirement, occupied-space rejection, and permanent-until-dispelled-or-broken state. The record also preserves the printed **10d10** damage packet if the wall is toppled and shatters.

### Fifth-level Cleric spells

All eight printed fifth-level Cleric spell names now have bounded executable procedures:

- **Commune** — **3-turn** divination, three **yes/no** questions, normally no more than once per week, and the once-per-year doubled six-question use. The rules engine stores the questions and cadence but leaves the answers to the referee/greater powers.
- **Create Food** — creates food for **12 men and their mounts**, plus **12 more per caster level above 8th**. The created supply is stored separately from packed rations, expires after **24 hours**, and is consumed before ordinary carried provisions. This lets the existing daily provisioning system use the spell without silently converting supernatural food into permanent inventory.
- **Cure Critical Wounds / Cause Critical Wounds** — the printed **3d6+3 (6–21)** healing/damage packet. The reversed hostile form uses an ordinary touch Hit roll and allows no saving throw.
- **Dispel Evil** — handles represented undead and magically enchanted/summoned/animated creatures within **30 feet**, the single-target **-2 Spell save**, failed-save destruction/banishment, and successful-save forced flight while the caster concentrates. It can also remove a represented magical charm or a represented cursed item rather than pretending to discover a curse that is absent from campaign state.
- **Insect Plague** — **480-foot range**, **one-day** duration, **30-foot-radius** swarm, vision-obscuring state, automatic driving-off of represented creatures below **3 HD**, and directed movement up to **20 feet per round** while the caster remains still and concentrates. The cast is rejected unless the scene is represented as outdoors and above ground.
- **Quest / Remove Quest** — **30-foot range**, living target, Spell save, player/referee-authored task, and explicit rejection of impossible or suicidal tasks. A failed save stores the continuing quest and the printed refusal-curse boundary. Remove Quest uses the printed **50% base chance**, reduced **5% per level** when the remover is below the original caster; the engine does not invent a bonus for being higher level where Mentzer does not state one.
- **Raise Dead / Finger of Death** — Raise Dead uses the printed human/dwarf/elf/halfling body requirement, **120-foot range**, **4 days at 8th level + 4 days per additional caster level**, return at **1 hp**, and **two full weeks of non-magically-accelerable bed-rest restrictions**. Its undead use includes the -2 Spell save destruction/forced-vampire-retreat path plus the Companion extension for greater undead. Finger of Death uses the **60-foot** Death Ray save, preserves the Lawful life-or-death restriction, and applies the printed healing interaction to represented undead of 10+ HD.
- **Truesight** — self-only, **1 turn + 1 round per caster level**, and **120-foot** represented revelation of hidden, invisible, ethereal, secret-door, false-form, alignment, and level/Hit-Dice information. The existing unseen-target predicate now recognizes Truesight, but the engine still refuses to manufacture secret doors or hidden creatures that the campaign state never represented.

### Fifth-level common-system integration

A new shared concentration-break path now covers **Conjure Elemental, Telekinesis, and Insect Plague**. Ordinary PC movement, attacks, spellcasting, and incoming damage feed the relevant source restrictions instead of leaving concentration as a decorative flag. Conjure Elemental uses its special rule: a forbidden action loses control permanently rather than merely ending the summoning.

The logistics layer now consumes temporary **Create Food** before packed standard/iron rations. The combat movement multiplier recognizes represented **Dissolve** mud at one-tenth movement. Common condition cleanup recognizes Feeblemind, Hold Monster, Harden trapping, Quest, and Insect Plague links. Truesight feeds the common invisible-perception predicate. Fifth-level reversed spell preparation/casting also uses the existing class distinction: Magic-Users/Elves prepare the reversed form separately, while Clerics may reverse an eligible prepared spell at casting time.

### Deliberately bounded fifth-level edges

Fifth-level registration is complete, but full world simulation remains intentionally bounded in several places. Cloudkill records that it sinks and is destroyed by thick vegetation, but unmodeled terrain cannot collide with it automatically. Contact Outer Plane and Commune never invent supernatural answers. Magic Jar tracks represented receptacle/possession state but does not invent off-scene jar destruction or every possible stranded-life-force event. Pass-Wall and Wall of Stone cannot perform universal collision against geometry the world model does not contain. Telekinesis requires represented target weight. Teleport requires a represented same-plane destination and explicit vacant space for a too-low result. Quest records the task/refusal-curse rule but leaves the exact creative curse to the referee as Mentzer directs. Truesight reveals represented hidden facts rather than creating new ones.

These are representation boundaries, not permission for `LEGACY_FALLBACK` to count as RAW completion.

### Validation

One pre-existing Protection from Evil regression was made fully deterministic by explicitly assigning opposed alignments in the test fixture; no rule behavior changed. Nine new v0.4.45 regression groups raise the integrated deterministic core suite from **512 to 521 tests**. They cover fifth-level registry/reversal completeness; Cloudkill; Conjure Elemental concentration and daily limits; Contact Outer Plane plus Dissolve/Harden; Feeblemind plus Hold/Free Monster; Magic Jar/Pass-Wall/Telekinesis/Teleport/Wall of Stone; Commune/Create Food/Cure Critical Wounds; Dispel Evil/Insect Plague/Quest; and Raise Dead/Finger of Death/Truesight.

The exact final `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic core harness was then executed **five consecutive times** in installed Chromium through Playwright against the exact final document content:

```text
Build: 0.4.45
Tests: 521 / 521 passed
Failures: 0
State isolation: preserved
Runs: 5 / 5 clean
Runtime exceptions/page errors: 0
Console errors: 0
```

### Remaining RAW spell boundary after v0.4.45

The formal spell pass can now advance to the **sixth-level Magic-User and Cleric lists**. Existing ordinary handlers such as Weather Control, and specialized artifact implementations such as Disintegrate, must be audited against the printed mortal spell procedures rather than assumed complete merely because related engine code already exists.

The next tranche is therefore **Anti-Magic Shell, Death Spell, Disintegrate, Geas, Invisible Stalker, Lower Water, Move Earth, Projected Image, Reincarnation, Stone to Flesh, Wall of Iron, and Weather Control**, plus **Aerial Servant, Animate Objects, Barrier, Create Normal Animals, Cureall, Find the Path, Speak with Monsters, and Word of Recall**, including their reversals and common-system interactions.

## v0.4.44 — Source-bounded fourth-level spell tranche and deterministic multi-target spell selection

This checkpoint continues the formal **Mentzer BECM RAW spell-compliance pass** through the complete printed **fourth-level Magic-User/Elf and Cleric spell lists**, while preserving every existing house procedure as a parallel selectable option. The source hierarchy is unchanged: **Mentzer D&D - BECM.pdf is primary**; **Rules Cyclopedia.pdf** is secondary only when compatible. `RAW_STRICT` continues to refuse a spell before resource expenditure when its printed procedure has not yet been implemented; `LEGACY_FALLBACK` remains available solely for compatibility with older saves and house-driven play.

The fourth-level registry is now closed at the same **source-bounded executable** standard used for levels 1–3. This means the engine implements the printed mechanical procedure wherever current world/combat state can represent it and explicitly requests referee judgment where Mentzer requires knowledge, interpretation, or fictional state the engine cannot know. It does **not** treat a generic active-effect record as RAW completion.

### Fourth-level Magic-User / Elf spells

All twelve printed fourth-level Magic-User/Elf spell names now have dedicated RAW handlers:

- **Charm Monster** — **120-foot range**, individual Spell saves, continuing charm state and intelligence-based re-save cadence. A creature above 3 HD must be the spell's sole victim; creatures of 3 HD or less use the printed **3d6 victim-count limit**. Undead/charm-immune creatures are rejected before the cast is committed.
- **Confusion** — represented creatures must fit within one **60-foot-diameter area** inside **120 feet**. The spell rolls its **3d6 victim count**, lasts **12 rounds**, gives creatures below 2+1 HD no save, and makes tougher creatures save each round before the common **2d6 confusion-action table** is resolved.
- **Dimension Door** — the recipient must be within **10 feet** of the caster and the represented destination no more than **360 feet** from that recipient. Unwilling creatures receive the printed Spell save; a represented solid destination causes the spell to fail rather than placing the creature inside matter. The engine never invents an unseen safe landing point.
- **Growth of Plants / Shrink Plants** — **120-foot range**, up to **3,000 square feet**, persistent terrain state, normal vegetation only, and direct reversal/cancellation between the two forms. Plant-like monsters are not silently rewritten as ordinary vegetation.
- **Hallucinatory Terrain** — **240-foot range**, persistent terrain illusion, dispellable and broken when an intelligent creature physically contacts the represented illusion. What an unrepresented observer believes remains referee-authored rather than generated as a hidden fact.
- **Ice Storm / Wall of Ice** — the storm uses one shared **1d6-per-caster-level** damage packet across its represented **20-foot cube**, with individual saves and the source cold/fire-type adjustments. The wall uses the printed bounded barrier state, up to **1,200 square feet**, for **12 turns**, including opacity, support requirement, and the printed break-through damage treatment.
- **Massmorph** — up to **100 man-sized equivalents** inside one **240-foot-diameter** area. The illusion persists until dispelled, dropped by the caster, or a recipient leaves the affected area. When Mentzer says a larger creature counts as two or three men, the engine asks for that referee choice rather than inventing the value.
- **Polymorph Self** — requires a represented living creature form no greater than the caster's HD/level, lasts **6 turns + 1 turn per caster level**, retains the caster's hit points, AC, Hit rolls, and saving throws, grants ordinary natural physical capabilities, does not grant special powers/immunities, and blocks spellcasting while transformed.
- **Polymorph Others** — **60-foot range**, Spell save, living target/form requirements, the printed maximum of **twice the victim's original HD** for the new form, permanent-until-dispelled state, preserved hit points, and adoption of the represented form's ordinary creature capabilities/tendencies. Unique/specific creatures are not accepted as generic forms.
- **Remove Curse / Curse** — reuses the live curse/removal layer with the Magic-User/Elf fourth-level preparation path. The numeric source-bounded curse forms route through common Hit/save/reaction predicates; broader imaginative curses remain explicit referee judgments rather than inert text pretending to be automated.
- **Wall of Fire** — represented barrier geometry, **60-foot casting range**, up to **1,200 square feet**, opacity, concentration/stationary-caster requirements, and the source creature-HD barrier behavior are persistent common-engine state rather than a prose-only flag.
- **Wizard Eye** — **240-foot range**, **6-turn duration**, **120 feet per turn** movement, **60-foot infravision**, no passage through solid objects, and concentration required to see through the eye. The engine exposes only represented information rather than inventing what lies behind unmodeled walls.

### Fourth-level Cleric spells

All eight printed fourth-level Cleric spell names now have bounded executable procedures:

- **Animate Dead** converts represented corpses into persistent bounded skeleton/zombie records under the caster's control, preserving undead sleep/charm/poison immunities and preventing invented spellcasting. The world-content layer still decides where unrepresented corpses exist.
- **Create Water** creates the printed temporary water-supply state for **6 turns**, with capacity derived from caster level and support for people/mounts. It creates water rather than silently filling or moving arbitrary unrepresented containers.
- **Cure Serious Wounds / Cause Serious Wounds** use the printed **2d6+2** healing/damage packet and the ordinary touch/hostile-touch procedures.
- **Dispel Magic** continues to use the existing common 20-foot-cube/caster-level resolver rather than a Cleric-specific duplicate.
- **Neutralize Poison / Create Poison** now share a common poison lifecycle. Create Poison uses the hostile touch/Poison-save procedure; Neutralize Poison removes represented poison and can revive a victim killed by poison within the printed **10-round** window. Revival restores the victim's pre-poison wound HP instead of becoming unintended healing.
- **Protection from Evil 10 ft Radius** uses the same common moving-radius save bonus, alignment-based Hit penalty, and enchanted-creature contact-barrier predicates already established by the Magic-User form.
- **Speak with Plants** records the **30-foot**, **3-turn** communication state and the source possibility of a simple favor while explicitly requiring referee-authored plant knowledge/reaction where the rules do not supply deterministic content.
- **Sticks to Snakes** creates **2d8** bounded snake records with the printed basic combat profile and reversion-to-stick lifecycle instead of a generic summoning placeholder.

### Explicit multi-target parser correction

The working v0.4.44 regression pass exposed a deterministic-targeting defect rather than a spell-rule defect: an explicit selection such as `Goblin 1; Goblin 2` was normalized into one impossible monster query. The common strict combat-target resolver now treats semicolon-separated names as independent target clauses and deduplicates the resulting represented creatures. This fix applies to ordinary spells/items that use the shared strict target parser and does not alter generic group queries or random-target selection.

This closes the outstanding **Charm Monster / Confusion** regression from the working build without weakening either spell's saving throws, HD limits, area limits, or random victim-count rolls.

### Deliberately bounded fourth-level edges

Fourth-level spell registration is complete, but several world-simulation edges remain intentionally bounded rather than guessed: arbitrary unseen Dimension Door destinations; Hallucinatory Terrain observer beliefs; free-form vegetation/object geometry beyond represented locations; every possible transformed creature extraordinary power; persistent summoned/created creature placement after leaving the currently represented scene; arbitrary corpse discovery; and universal physical collision against walls created in locations whose geometry has never been modeled. These are cross-system representation tasks, not permission for `LEGACY_FALLBACK` to count as RAW.

### Validation

The exact final `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The same HTML bytes were loaded into installed Chromium through Playwright and the complete deterministic core harness was executed **three consecutive times**. All three runs produced:

```text
Build: 0.4.44
Tests: 512 / 512 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
```

Nine v0.4.44 regression groups cover fourth-level registry completeness/reversal levels, Charm Monster and Confusion, Dimension Door, Growth/Shrink Plants and Hallucinatory Terrain, Ice Storm/Wall of Ice, Massmorph and both Polymorph procedures, Wall of Fire/Wizard Eye, Cure/Neutralize/Create Poison handling, and the Animate Dead/Create Water/Speak with Plants/Sticks to Snakes creation-state group. The complete pre-existing suite remains green.

### Remaining RAW spell boundary after v0.4.44

The formal spell pass can now advance to the **fifth-level Magic-User/Elf and Cleric lists**. `Cloudkill` remains deliberately outside the ordinary RAW-complete registry despite existing artifact-specific attack code, which prevents a specialized artifact implementation from being mistaken for a fully implemented mortal spell. The next tranche is therefore **Animate Dead (MU form), Cloudkill, Conjure Elemental, Contact Outer Plane, Dissolve, Feeblemind, Hold Monster, Magic Jar, Pass-Wall, Telekinesis, Teleport, Wall of Stone**, plus **Commune, Create Food, Cure Critical Wounds, Dispel Evil, Insect Plague, Quest, Raise Dead, and Truesight**, with their reversals and common-system interactions audited spell by spell.

## v0.4.43 — Source-bounded third-level spell tranche and historical Fire Ball / Lightning Bolt interpretation (superseded in v0.4.47)

This checkpoint continues the formal **Mentzer BECM RAW spell-compliance pass** through the complete printed **third-level Magic-User/Elf and Cleric spell lists**. The project source hierarchy is unchanged: **Mentzer D&D - BECM.pdf is primary**; **Rules Cyclopedia.pdf is secondary** where it clarifies a compatible procedure. All existing house procedures remain intact and switchable beside the RAW procedures.

The strict rule from the previous checkpoints also remains in force: **RAW_STRICT does not fabricate an effect for a printed spell whose executable procedure has not been implemented.** `LEGACY_FALLBACK` remains available only as a compatibility profile. Third-level spell names and their source-valid reversals are now registered as executable; fourth-level **Charm Monster** remains deliberately unregistered and is used by the regression suite as the next-level boundary check.

### Third-level Magic-User / Elf spells

The full third-level Magic-User/Elf list now has source-bounded executable support:

- **Clairvoyance** — **60-foot range**, **12-turn duration**, represented creature as the viewpoint, and one full turn of concentration to see through a subject's eyes before changing subjects. More than **2 feet of rock** or a thin coating of lead blocks the view. The engine never invents an unseen creature merely to satisfy the spell.
- **Dispel Magic** — retains the previously implemented **120-foot range**, **20-foot cube**, automatic dispelling of equal/lower-level spell effects, and **5% failure per caster-level difference** against higher-level magic. Magical items themselves are not destroyed by the ordinary form.
- **Fire Ball** — keeps the printed **240-foot range**, **40-foot-diameter** blast, **1d6 fire damage per caster level**, and Spell save for half damage.
- **Fly** — touch range; duration **1d6 turns + 1 turn per caster level**; movement up to **360 feet per turn / 120 feet per round** in any direction by concentration; hovering does not require concentration.
- **Haste / Slow** — Haste affects up to **24 represented creatures** in one **60-foot-diameter** selection for **3 turns**, doubling movement and normal missile/melee attack rate while leaving spellcasting and magical-device use at normal speed. Slow is the reversed form, allows the printed Spell save, halves movement/attack rate, and directly cancels Haste (and vice versa) instead of stacking.
- **Hold Person / Free Person** — the Magic-User/Elf form now preserves its own **120-foot range** and **1 turn per caster level** duration instead of inheriting the Cleric's fixed nine-turn form. Single-target use applies the printed **-2 saving-throw penalty**; group use can affect up to four eligible human/demihuman/human-like creatures. Free Person removes only Hold Person paralysis.
- **Infravision** — touch range, **one-day duration**, **60-foot** heat/lack-of-heat vision in darkness, with normal/magical light recorded as interfering with the sense.
- **Invisibility 10' Radius** — **120-foot range** to the initial recipient; all represented creatures within 10 feet at casting become invisible with carried gear. Non-anchor recipients that move beyond 10 feet become visible and do not regain the effect by returning. Each recipient also breaks their own invisibility by attacking or casting a spell.
- **Lightning Bolt** — retains **180-foot range**, **60-foot by 5-foot** line, **1d6 damage per caster level**, Spell save for half, and the existing represented solid-surface rebound procedure.
- **Protection from Evil 10' Radius** — **12 turns**, centered on the caster. Creatures inside receive **+1 on saving throws**; attacks from creatures of an alignment different from the caster suffer **-1 to Hit rolls**. Enchanted creatures cannot make melee contact until someone inside attacks that specific enchanted creature; missile and magical attacks remain possible.
- **Protection from Normal Missiles** — **30-foot range**, **12 turns**, and complete protection against small nonmagical missiles. Magical missiles and large projectiles such as siege missiles remain unaffected.
- **Water Breathing** — **30-foot range**, **one-day duration**, allows underwater breathing at any depth without changing movement or interfering with breathing air.

### Third-level Cleric spells

The full printed third-level Cleric list is also executable at the bounded deterministic level:

- **Continual Light / Continual Darkness** reuses the permanent light/darkness lifecycle from the second-level Magic-User implementation while preserving its Cleric spell level. Opposed continual forms cancel one another; Continual Darkness blocks infravision.
- **Cure Blindness** removes represented blindness caused by ordinary Light/Darkness and their continual forms, but does not remove blindness explicitly represented as a curse.
- **Cure Disease / Cause Disease** uses the existing live disease lifecycle. Cause Disease allows the printed Spell save and, on failure, applies **-2 on Hit rolls**, blocks magical wound healing, doubles natural-healing time, and becomes fatal in **2d12 days** unless cured. Cure Disease removes represented disease; at Cleric level 11+ it can also remove represented lycanthropy.
- **Growth of Animals** — **120-foot range**, **12 turns**, normal or giant animals only. It doubles represented size/strength, normal damage, and carrying capacity while leaving behavior, Armor Class, and hit points unchanged.
- **Locate Object** now preserves the class-specific Cleric form: **120-foot range** and **6-turn duration**. The second-level Magic-User form remains **60 feet + 10 feet per caster level** for **2 turns**. Both return direction rather than distance and search only represented objects rather than generating missing world content.
- **Remove Curse / Curse** — touch range. Remove Curse clears one represented curse while retaining explicit referee/source control for magical-item curses that may only be suppressed temporarily. The reversed Curse permits the source-bounded safe forms: **-4 Hit rolls**, **-2 saving throws**, or **prime requisite reduced to half normal**. The compatible Rules Cyclopedia **-4 reaction-roll** example is also stored as an optional safe form. More powerful/imaginative curses remain referee judgments and may rebound rather than receiving invented mechanics.
- **Speak with the Dead** — **10-foot range**, duration **1 round per Cleric level**, up to **three questions**, and the printed corpse-age limits by caster level. The effect records the corpse's represented alignment, death-time knowledge cutoff, and whether answers should be clear/brief or may be riddling. It explicitly requires referee/AI-authored pre-death knowledge rather than fabricating a dead creature's private memories.
- **Striking** — **30-foot range**, **1-turn duration**, one represented weapon, **+1d6 damage per successful hit**, and no Hit-roll bonus. The effect records its magic-only-damage semantics and ordinary PC weapon damage paths now add the 1d6 bonus.

### Fire Ball / Lightning Bolt damage-cap interpretation — superseded in v0.4.47

At v0.4.43 the audit read the Expert spell descriptions in isolation and removed the 20-die cap from ordinary mortal **Fire Ball** and **Lightning Bolt**. That interpretation was incomplete. The consolidated Mentzer Companion/Master text contains an explicit global rule that **no single spell produces more than 20 damage dice**, specifically naming Fire Ball, Lightning Bolt, and Delayed Blast Fire Ball as examples. Build **0.4.47** corrects the engine and regression suite to the primary source.

The **Master Artifact A1** versions remain separate source-defined fixed **20d6** packets. After v0.4.47, ordinary mortal per-level spell damage is also bounded by Mentzer's global 20-die maximum, while the artifact paths retain their own fixed packet definitions.

### Cross-system integration added in v0.4.43

The new third-level states are connected to existing common predicates rather than stored as inert labels. RAW Haste/Slow now affect encounter/combat movement and ordinary attack count; Fly supplies its 120-foot-per-round combat movement floor; Water Breathing feeds the aquatic-breathing predicate; Infravision feeds dungeon visibility; Invisibility 10' Radius feeds ordinary unseen-target logic and breaks through normal attack/casting paths; Protection from Evil Radius feeds saving throws, enemy Hit modifiers, and enchanted-contact blocking; Protection from Normal Missiles blocks eligible missile Hit rolls; Growth of Animals doubles represented monster normal damage; Curse modifiers feed common Hit/saving paths and selected reaction paths; and Striking contributes its 1d6 packet to ordinary PC weapon damage.

Protection from Evil received an additional correctness pass while this tranche was being integrated. Its **alignment-based -1 Hit-roll penalty** and its **enchanted-creature melee-contact barrier** are independent source rules. The contact barrier therefore applies to enchanted creatures regardless of alignment. For the 10-foot-radius form, attacking one enchanted creature opens melee contact only for that creature; it does not collapse the barrier against every other enchanted creature.

### Deliberately bounded third-level edges

This checkpoint means that every printed third-level spell name has a source-bounded executable handler; it does **not** mean that every possible fictional/world-state consequence has been converted into an omniscient simulator. The following boundaries remain explicit:

- **Clairvoyance** can bind to represented creatures and enforce concentration/obstruction, but changing to arbitrary unseen subjects still requires represented campaign information; it will not populate unknown rooms or creatures.
- Fire Ball and Lightning Bolt have live 3D combat geometry, friendly fire, saves, and rebound where represented, but arbitrary empty-space targeting and every destructible world object are not yet universal outside combat.
- Out-of-combat **Invisibility 10' Radius** uses the represented local party cluster when precise combat coordinates do not exist.
- **Growth of Animals** currently targets represented normal/giant animals in combat. Full persistent mount, wilderness-herd, and arbitrary world-object integration remains open.
- The Curse **prime-requisite-half** result is stored exactly but is not yet routed through every ability-derived subsystem. The reaction-roll curse is connected to retainer/persistent-NPC reaction paths but not every possible reaction producer in the engine.
- **Speak with the Dead** establishes the three-question window and knowledge boundary but does not yet provide a dedicated player command that consumes the three questions; actual answers remain referee/AI-authored from represented pre-death knowledge.
- **Striking** is live on ordinary PC weapon damage, but the special case where a normal weapon can harm a magic-only creature for *only* the Striking 1d6 is not yet exhaustively routed through every monster-specific weapon-immunity exception.

These are tracked integration edges rather than replaced with invented rules. The next spell-compliance tranche should proceed to **fourth-level Magic-User/Elf and Cleric magic** while preserving the same RAW/house separation.

### v0.4.43 validation

Eight new deterministic regression groups raise the integrated core suite from **495 to 503 tests**. They cover the then-current v0.4.43 expectations: complete third-level registry/reversal boundaries; the now-superseded mortal Fire Ball/Lightning Bolt cap interpretation versus fixed 20d6 Master Artifact packets; Fly/Infravision/Water Breathing; Haste/Slow cancellation and action-rate integration; class-specific Hold Person/Free Person; radius invisibility/protection plus normal-missile immunity; third-level Cleric disease/growth/curse state; and Speak with the Dead/Striking boundaries.

The exact integrated inline JavaScript passes `node --check`. The final v0.4.43 document was loaded into headless Chromium and the deterministic core harness was executed **three consecutive times** against the exact integrated document:

```text
Build: 0.4.43
Tests: 503 / 503 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
```

## v0.4.42 — First-level reversals and complete bounded second-level spell tranche

This checkpoint continues the formal **Mentzer RAW spell-compliance pass** while leaving all existing house systems intact. The RAW/house procedure profiles added in v0.4.41 remain unchanged: RAW weapon damage, RAW side initiative, RAW getting-lost displacement, and strict source-bounded spells remain available alongside the contextual Arms Across Eras matrix, phase initiative, and map-safe lost-time procedure. Independent optional BECM systems retain their own switches.

The important engine rule also remains unchanged: **RAW_STRICT will not spend a spell or create a generic placeholder when the printed procedure has not been implemented.** The compatibility-only `LEGACY_FALLBACK` remains available for older campaigns, but it is not treated as RAW completion.

### First-level reversed forms

The outstanding first-level reversed procedures from the previous checkpoint are now executable:

- **Cause Light Wounds** is the reversed Cleric Cure Light Wounds: hostile touch requires the ordinary Hit roll, then inflicts exactly **1d6+1** damage with **no saving throw**.
- **Cause Fear** is the reversed Cleric Remove Fear: the target receives the source saving throw and, on failure, enters the printed **two-turn forced-flee** state.
- **Darkness** is the reverse of Light. It creates the printed 30-foot-diameter darkness for the parent spell's duration, ordinary infravision still works, opposing Light cancels it, and eye-targeted use can blind the victim. Continual Darkness remains a distinct second-level effect and blocks infravision.

Reversal preparation/casting semantics are now explicit rather than inferred. **Clerics may reverse an eligible prepared spell at casting time**, while **Magic-Users and Elves prepare the reversed form separately**. This keeps the two class procedures distinct while still using one common spell-resolution layer.

### Second-level Magic-User / Elf spell tranche

All twelve ordinary second-level Magic-User spell names now have source-bounded executable handlers in RAW_STRICT, including the two reversals introduced by later Mentzer material:

- **Continual Light / Continual Darkness** — permanent light/darkness state, eye-target saves and blindness, cancellation between opposite continual forms, ordinary-light and infravision consequences.
- **Detect Evil** — the Magic-User's 60-foot/two-turn form, using harmful intent and evil enchantment rather than equating Chaotic alignment with evil.
- **Detect Invisible** — six turns, range **10 feet per caster level**, connected to the common invisible-target perception predicate.
- **ESP / Mindmask** — ESP records the printed 60-foot, 12-turn directional thought-reading state and the required **six rounds (one minute) of concentration**; a referee-identified jumble requires the additional six rounds needed to isolate one creature. Living thoughts are language-independent, Undead thoughts are unreadable, wood and liquid do not block the effect, up to two feet of rock can be penetrated, and a thin lead coating blocks it. Mindmask is the touch-range reversed form and blocks ESP/other mind-reading for the same 12-turn duration. The rules engine never invents a creature's private thoughts: it exposes represented thoughts when present and otherwise leaves the actual thought content to the referee/AI.
- **Invisibility** — creature visibility persists until attack or spellcasting; carried gear follows the creature's state, and common attack/casting paths break the effect.
- **Knock** — represented locks, bars, gates, chests and doors can be opened; Hold Portal and Wizard Lock are bypassed rather than dispelled so their magic can take effect again when the portal closes.
- **Levitate** — caster-only vertical movement at **20 feet per round**, with no self-propelled horizontal movement, for six turns plus one turn per caster level.
- **Locate Object** — range is **60 feet + 10 feet per caster level**; it identifies direction rather than distance and searches represented objects without fabricating an unseen object that is not in campaign state.
- **Mirror Image** — creates **1d4** images for six turns; successful ordinary attacks remove images before harming the caster, while represented area attacks remove all remaining images.
- **Phantasmal Force** — the illusion itself remains player/referee-authored, because RAW makes its content and unfamiliar-image save bonus a DM judgment. The engine enforces the **240-foot range, 20-foot cube, concentration duration, AC 9 illusory-monster rule, disappear-on-hit/touch conditions, attack saving throw, and the fact that the spell never causes real damage**. Illusory death becomes unconsciousness and illusory petrification becomes paralysis; these unreal consequences use their own printed **1d4-turn** duration and are not erased merely because concentration on the visual phantasm ends. Moving, taking damage, failing a saving throw, attacking, or beginning another spell breaks the caster's concentration.
- **Web** — creates the represented 10-foot cube for 48 turns. The engine uses the printed escape cases exactly: great strength/giant creatures break free in two rounds, Gauntlets of Ogre Power in four rounds, and an average Strength 9–12 human in 2d4 turns. Strength cases not assigned a time by the source are left to referee judgment rather than receiving a fabricated formula.
- **Wizard Lock** — permanent magical lock state on represented portals/locks, including the caster and +3-level/HD opening exceptions and the temporary Knock bypass. Dispel cleanup removes the linked physical lock state instead of leaving a stale locked door behind.

A source-hierarchy difference was preserved deliberately for **ESP**. The primary Mentzer Expert description does not grant the target a saving throw; the later Rules Cyclopedia version does. Because this project explicitly gives Mentzer BECM priority when the two differ, the RAW profile follows the Mentzer procedure rather than silently importing the Cyclopedia change.

### Second-level Cleric spell tranche

The eight ordinary second-level Cleric spells now use bounded executable procedures rather than generic placeholders:

- **Bless / Blight** use the source area, duration, live Hit/damage/morale modifiers, individual Blight saves, and the restriction that Bless does not affect characters already in hand-to-hand combat.
- **Find Traps** creates the source detection window against represented traps without inventing undisclosed traps that are absent from campaign state.
- **Hold Person / Free Person** use the printed humanoid eligibility, individual saving throws, paralysis lifecycle, and reversed release procedure.
- **Know Alignment / Confuse Alignment** preserve the ordinary alignment-reading procedure and the reversed false-reading effect; the engine stores the false result so subsequent Know Alignment checks receive the same misinformation while the reversal lasts.
- **Resist Fire** grants normal-fire/heat immunity, **+2** on applicable saves, and the exact magical-fire/dragon-fire damage reduction when individual dice are represented.
- **Silence 15 ft Radius** creates the 15-foot moving or stationary silence sphere according to the target's save and routes spellcasting through the common silence gate.
- **Snake Charm** uses the source Hit-Dice budget and no-save treatment for eligible normal snakes, with different combat/noncombat durations and the attack-break condition.
- **Speak with Animal** records one chosen normal/giant animal type, the 30-foot communication range, six-turn duration, and the printed **+2 reaction adjustment** without inventing automatic favors or speech for fantastic/intelligent monsters.

### Concentration and common-runtime integration

Phantasmal Force introduced a reusable concentration-break path rather than an isolated spell flag. Common PC movement, successful damaging hits against the caster, failed saving throws, attacks, and casting another spell can terminate the active illusion. Illusory death/petrification consequences are stored as separate timed **1d4-turn** effects from the moment they occur, so the unreal unconscious/paralyzed state has its own printed duration and is not accidentally removed with the concentration effect itself.

ESP/Mindmask is also routed through a common mental-reading block that recognizes both the ordinary reversed spell and existing artifact Mindmask/Mind Barrier effects. This prevents two independently implemented magic systems from disagreeing about whether a mind can be read.

### Test correction and validation

The v0.4.42 working build exposed one nondeterministic regression: the Blight test attempted to force failure with an impossible target number, but the common BECM saving-throw resolver correctly allows a **natural 20** to succeed. The regression was corrected by pinning the deterministic test seed instead of weakening the saving-throw rule.

The exact final `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The same HTML bytes were loaded into installed Chromium through Playwright and the complete deterministic core harness was executed **three consecutive times**:

```text
Build: 0.4.42
Tests: 495 / 495 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
```

Eleven net new regressions beyond v0.4.41 now cover reversal preparation/casting semantics, the three first-level reversed effects, Bless/Blight, Hold/Free Person, Resist Fire, Darkness/Continual Darkness/Invisibility/Detect Invisible, Wizard Lock/Knock, Mirror Image/Silence, Web/Snake Charm, ESP/Mindmask, Phantasmal Force concentration and unreal consequences, plus the existing strict-registry check now uses an actually unimplemented spell rather than Phantasmal Force.

### Remaining RAW spell boundary after v0.4.42

The formal low-level pass can now move to **third-level Magic-User and Cleric spells**. The highest-value next tranche includes Clairvoyance, Fly, Haste/Slow, the Magic-User Hold Person/Free Person form, Infravision, Invisibility 10-foot Radius, Protection from Evil 10-foot Radius, Protection from Normal Missiles, Water Breathing, and the third-level Cleric list. Existing Fire Ball, Lightning Bolt, and Dispel Magic infrastructure should be audited against the same strict source standard rather than assumed complete merely because working combat handlers already exist.

Several representation edges remain intentionally bounded even for completed first/second-level handlers: arbitrary invisible world objects that have no campaign record, generalized Floating Disc cargo manipulation, Magic Missile allocation across multiple targets, a direct player action for forcibly waking a Sleeper, persistent charmed creatures after they leave the current encounter, exact physical touching/hitting of a free-standing Phantasmal Force object/monster through every combat path, and free-form hidden-object/trap discovery when the world state itself has not yet represented the object. These are integration edges, not permission for LEGACY_FALLBACK to count as RAW completion.

## v0.4.41 — RAW/house procedure profiles and formal low-level spell compliance

This checkpoint begins the formal spell-by-spell BECM compliance pass while preserving the project's existing house systems. **Mentzer BECM remains the primary authority**; the Rules Cyclopedia remains secondary only where compatible. House procedures are no longer treated as substitutes for RAW when both can coexist: the engine now exposes explicit procedure profiles and keeps the underlying implementations side by side.

### RAW and house procedure profiles

The Options panel now includes **APPLY BECM RAW PROCEDURES** and **APPLY HOUSE PROCEDURES**. The RAW profile selects the ordinary RAW weapon-damage procedure, RAW side initiative, RAW getting-lost displacement, and strict source-bounded spell resolution. The house profile restores the contextual Arms Across Eras weapon matrix, phase initiative, and the map-safe lost-time wilderness variant while keeping strict spell resolution. Existing optional BECM systems such as Weapon Mastery, General Skills, War Machine, Siege Machine, and Touch Dispel retain their current ON/OFF states rather than being silently changed by either profile.

This is intentionally a **bounded profile switch**, not a false claim that every house layer already has a parallel RAW implementation. In particular, the 3D Influence-Sphere/positional combat layer remains a project house system and still needs a full RAW abstract-positioning alternative before that dimension can be switched wholesale.

### Strict RAW spell resolution versus legacy compatibility

The spell engine now distinguishes **RAW_STRICT** from **LEGACY_FALLBACK**. New campaigns default to RAW_STRICT. In that mode, a spell whose printed effect does not yet have a source-bounded executable handler is refused **before Anti-Magic resolution or spell-slot expenditure**, preventing a registered spell name from masquerading as an implemented rule. Legacy saves from builds through v0.4.40 migrate to LEGACY_FALLBACK so existing campaigns are not silently changed; the player/referee can then switch them to strict RAW when desired.

The previous registry helper also no longer reports every listed spell as `implemented:true`. It reports registration separately from executable handling, and the old regression test was rewritten accordingly. This removes an important audit false positive: all BECM spell records may be present in the catalogue without implying that all printed spell procedures are complete.

### First-level Magic-User RAW procedure tranche

The normal forms of the Mentzer Basic first-level Magic-User spell list now have dedicated or hardened procedures rather than generic active-effect placeholders:

- **Charm Person** now enforces human-like/societal eligibility, excludes animals, undead, constructs, fantastic creatures and creatures of 6+ HD, uses the initial Spell save, records the Basic DM Intelligence-category re-save cadence (high 1 day, average 1 week, low 1 month), removes hostility on a failed save, and breaks the charm immediately if the caster attacks the victim. Long-term persistence after the represented monster leaves combat still requires a durable NPC/creature ownership record.
- **Detect Magic** creates the exact two-turn, 60-foot sensing window. It reveals visible magic rather than inventing knowledge of hidden objects.
- **Floating Disc** now records the six-turn duration, 5,000-cn capacity, six-foot following distance, waist-height placement, and non-solid/non-weapon nature. Generalized item loading/unloading on the disc remains open.
- **Hold Portal** now creates an actual magical hold on represented doors/portals for 2d6 turns. A character at least three levels above the caster can force passage in one round; the underlying spell remains so the portal can re-hold after it closes. General monster-HD forcing and the full Knock interaction remain for the second-level pass.
- **Light** uses the Magic-User duration of six turns plus one turn per caster level and a 30-foot-diameter light volume. Eye-targeting uses the Spell save and blindness consequence; attached party light now feeds dungeon visibility. General object/empty-point anchoring remains open.
- **Magic Missile** now uses the printed progression of one missile at levels 1-5, three at 6-10, five at 11-15, and so on; each missile rolls 1d6+1 independently. Current ordinary casting sends all created missiles at the selected target; multi-target allocation remains open.
- **Protection from Evil** now applies the six-turn Magic-User duration, +1 saving throws, -1 enemy Hit rolls, and the enchanted/summoned/controlled-creature contact barrier. If the protected caster attacks, only the contact barrier drops; the numeric modifiers continue. Magic Missile remains unaffected as printed.
- **Read Languages** creates the exact two-turn read-only comprehension state for unknown languages and codes.
- **Read Magic** creates the exact one-turn magical-reading state and now integrates with the existing scroll-reading procedure so an already-active spell can be used rather than consuming another prepared casting.
- **Shield** retains its two-turn duration, AC 2 against missiles and AC 4 against other attacks, and the per-missile Spell save against Magic Missile.
- **Sleep** now rolls the printed 2d8 HD budget, affects eligible living creatures of 4+1 HD or less with no save, and tracks the actual 4d4-turn sleeping duration so the state clears on expiry. A generalized force-awakening action remains open.
- **Ventriloquism** now has the printed 60-foot range, two-turn duration, and one-item-or-location source state.

The reversed **Darkness** form of Light is not yet certified through the ordinary player spell command. It remains explicitly open for the reversal pass rather than being silently inferred from the artifact implementation.

### First-level Cleric RAW procedure tranche

The normal forms of the Mentzer Basic first-level Cleric list were hardened against the same strict standard:

- **Cure Light Wounds** heals exactly 1d6+1 hit points or can remove paralysis instead of healing; it never does both from the same casting. Existing Cause Disease healing restrictions remain honored.
- **Detect Evil** uses the Cleric's 120-foot, six-turn form and distinguishes harmful intent/evil enchantment from Alignment, traps, or poison.
- **Detect Magic** uses the same visible-magic rule as the Magic-User form.
- **Light** uses the Cleric's fixed 12-turn duration and shares the common light/blindness/visibility procedure.
- **Protection from Evil** uses the Cleric's 12-turn duration and the same live save, Hit-roll, and contact-barrier integrations described above.
- **Purify Food and Water** no longer fabricates food or fills empty waterskins. It purifies represented spoiled/poisoned food or water, up to one ration, six waterskins, or enough ordinary food for twelve people; mud may settle into clean water as the spell specifically permits.
- **Remove Fear** creates the two-turn calming effect and, against represented magical fear, allows the printed new Spell save with a bonus equal to caster level, capped at +6.
- **Resist Cold** now creates the six-turn moving 30-foot aura, grants +2 to appropriate cold saves, protects against freezing temperature, and applies the printed -1 point per damage die with a minimum of 1 point per die whenever the individual damage dice are represented. The engine does not invent a mathematically different aggregate approximation when only a final damage total is known.

The reversed Cleric forms available later in BECM—such as Cause Light Wounds and Cause Fear—remain for the explicit reversal tranche.

### Shared combat, save, visibility, and physical-state integration

The new spell procedures are connected to the common runtime rather than existing as isolated flags. `pcSave` now consumes Protection from Evil and Resist Cold modifiers; `attackRoll` handles Protection from Evil's Hit penalty/contact restriction and Charm Person's caster-attack break; `damagePc` can apply exact per-die Resist Cold reduction; ordinary Light contributes to visibility; spell expiry clears linked Sleep, Hold Portal, and blindness state; and represented held doors participate in movement/forcing procedure.

### Remaining boundaries after this checkpoint

This build does **not** claim first-level spell certification is fully finished. The next requirements are the ordinary reversal syntax/procedures, generalized object and empty-point targeting, Magic Missile target splitting, Sleep force-awakening, durable non-combat charm records, Floating Disc item transfer, and any other source behavior currently bounded by missing world-object representation. After those are closed, the formal pass should proceed through second-level Magic-User and Cleric spells rather than allowing generic fallbacks.

### Validation

The exact integrated `index.html` was loaded into headless Chromium and the complete deterministic core harness was executed **three consecutive times**. Each run produced:

```text
Build: 0.4.41
Tests: 484 / 484 passed
Failures: 0
State isolation: preserved
Runtime exceptions/page errors: 0
Console errors: 0
```

Eight new regressions cover the RAW/house procedure profiles, RAW_STRICT versus legacy fallback behavior, Magic Missile progression, Sleep duration/expiry, Protection from Evil's save/attack/contact rules, Hold Portal duration and three-level forcing exception, Resist Cold's aura/save/per-die reduction, and Light's visibility/duration integration. All prior 476 tests remain passing.

## v0.4.40 — Known Artifact live integration edges

This checkpoint closes the principal Known Artifact integration edges left after v0.4.39 without changing the project source hierarchy or claiming universal automation for every narrative artifact consequence. The implementation remains bounded to source procedures that can be represented deterministically in the current engine.

### Fiery Brand of Masauwu

The Brand's one-spell **Spell Damage Bonus** now links directly to a represented **Meteor Swarm** instead of requiring the referee to issue the intermediate `meteor_bonus_applied` event manually. When the bonus is actually consumed by Meteor Swarm, the Brand advances its printed Doom counter automatically. The first augmented Meteor Swarm arms the Doom, the third removes the user and artifact from mortal play, and a represented undead strike while the Doom is armed now triggers that removal through the common PC-damage path. Carried equipment remains behind rather than vanishing with the user.

### Ortnit's Lance of Doom

The one-day dragon vulnerability now feeds the live PC damage resolver. Represented dragon blows and breath damage are doubled while the source timer is active; after one full day the multiplier expires. The lance-kill handicap now debits **one-third of represented carried treasure** from assigned coin value and valued inventory, recording any remainder that cannot be represented cleanly for referee resolution rather than inventing a fractional object.

### Pileus

The Rot penalty now creates a persistent victim-bound one-hour disease event. Progression follows the source order through toes, fingers, ears, nose, and then limbs. Relinquishing the cap does not cancel an already-triggered occurrence. **Cure Disease** before the hour expires cancels that occurrence but does not reset the progression index; a later Rot event therefore attacks the next body part. The clock removes the affected part only when the active uncured event reaches its one-hour deadline.

### Ivory Plume of Maat

The Plume's first-use **justice wall** now has represented state. The closed stone cylinder is invulnerable to outside attack, including represented Wish interaction. The printed eyes-closed / thought-of-justice / step-forward procedure dismisses it safely. If the user instead damages the wall, the resulting double-physical-damage handicap is permanent and continues after the artifact is relinquished.

### Wife of Ilmarinen

The Wife's 1-in-6 attack penalty now redirects the triggering represented attack at its controller rather than merely recording that a misdirection occurred. The first redirect uses the normal applicable saving throw; subsequent redirected occurrences expose the printed **+4 saving-throw bonus** through the common artifact attack-save resolver. The redirected attack still spends the original power's PP and follows the ordinary source penalty lifecycle.

### Verthandi's Invincible Hourglass

Hourglass use now follows the printed **seconds equal to PP cost** concentration transaction. PP are deducted when concentration begins, not when it completes. The requested power is withheld until the exact required seconds elapse. Damage or another represented interruption breaks concentration without refunding PP and without counting the power as successfully used. Noncombat player syntax can advance this second-scale transaction without fabricating a campaign minute, while combat concentration advances through the round processor.

### Runtime identity correction

`ensureArtifactState()` now preserves the live `sourceRuntime` object identity while normalizing the enclosing artifact record. Save migration still deep-normalizes serialized records, but active source transactions such as Pileus Rot rows and Hourglass concentration no longer become stale merely because another artifact helper calls the normalizer. This fixes live transaction continuity without weakening save validation.

### Verification

The final inline JavaScript passes `node --check`. The exact integrated HTML was loaded into installed Chromium through Playwright and the deterministic core suite was executed three consecutive times:

```text
Build: 0.4.40
Tests: 476 / 476 passed
Failures: 0
Campaign-state isolation: preserved
Runs: 3 / 3 clean
Page errors: 0
Console errors: 0
```

Eleven new regressions cover automatic Masauwu Meteor Swarm/Doom linkage, undead-strike Doom, Ortnit dragon damage and treasure loss, Pileus persistence and Cure Disease interaction, Maat's justice wall and permanent physical-damage consequence, Wife attack redirection and repeated-save bonus, and Verthandi completion/interruption timing.

### Remaining artifact work

The large Master artifact implementation is now concentrated in genuinely bespoke or underrepresented edges rather than missing Table 2/Table 3 rows or the named Known Artifact procedures above. The **Comb of the Korrigans' final full character-class conversion**, arbitrary object/container/geometry interactions, uncommon producer-specific routing, and campaign-authored legendary destruction methods remain bounded referee work. The next major implementation pass should return to the broader **Basic / Expert / Companion / Master compliance audit** and close the highest-value non-artifact partial/open procedures, with Immortal rules still explicitly outside scope.

---

## v0.4.39 — Sinbad coupling, Armida backlash, and artifact validation fixes

This checkpoint closes two of the Known Artifact integration edges identified in v0.4.38. It does **not** certify complete BECM compliance or every extraordinary monster/artifact effect. The 600 base creatures plus 7 module extensions and the existing optional systems are retained.

### Source review

The primary Mentzer Master source was checked directly for these procedures:

| Procedure | Printed Master Dungeon Master's Book page | Combined Mentzer BECM PDF page |
| --- | --- | --- |
| Girdle of Armida: Charm/Confusion backlash | 58 | 389 |
| Rainbow Scarf of Sinbad: Open Locks / Intelligence 18 coupling | 61 | 392 |

Printed page numbers govern the rules citation; combined-PDF page numbers are navigation aids. Rules Cyclopedia remains secondary and does not replace the Master examples.

### Rainbow Scarf of Sinbad

Normal invocation of the Scarf's **Open Locks 75%** now automatically produces its **Intelligence to 18** power unless the user explicitly specifies otherwise, matching the published example.

- Open Locks costs **10 PP** and Intelligence to 18 costs **20 PP**, so the coupled invocation spends **30 PP** as one transaction.
- Both powers retain their existing **six-turn** durations and expire independently through the common timed-effect lifecycle.
- Each power receives its own use count and its own standard artifact-penalty check. Because the linked Intelligence power costs 20 PP, it retains its normal 10% standard penalty chance.
- Automatic production of Intelligence 18 does **not** silently teach that separate power command to a character who has only discovered Open Locks.
- The combined invocation is preflighted before PP is spent. Insufficient PP or a damage-stripped linked Intelligence power rejects the combined use without partial spending or first-use effects.
- The player may explicitly opt out using `without intelligence`; this spends only the 10 PP Open Locks cost and does not end any Intelligence effect already active from an earlier use.
- The opt-out survives the ordinary player-command parser and queued combat-order serialization.

This retains the published Scarf anomaly: the sample declares **PP 90** although its listed PP-costed powers total **85**, and its special 10-PP Container/Open Locks entries remain sample-specific rather than being normalized to the general artifact table.

### Girdle of Armida

Whenever the Girdle's **Charm Monster** or **Confusion** is cast at a represented **Lawful or Neutral** creature, the engine now casts **Hold Person back at the user**, with the ordinary saving throw, exactly as the sample specifies. The backlash is independent of the Girdle's separate standard-chance size-change penalty and does **not** spend additional artifact PP.

The trigger is based on the intended recipient's represented alignment, not whether Charm ultimately takes hold: an immune Lawful/Neutral target still causes the backlash. Mixed Lawful/Neutral groups trigger one backlash for the invocation rather than one per target. A successful save avoids the Hold; a failed save creates the existing Hold Person effect and blocks further artifact actions until that hold ends. Source-runtime counters and the last qualifying target set survive save normalization.

### Transaction and normalization corrections

The artifact action gate now distinguishes actual Hold/Stun/Dance/Petrification incapacitation from Web restraint, so an already webbed character can still activate the printed **Web Movement** artifact power. Failed preflight of the Sinbad coupled power no longer mutates nullable artifact lifecycle fields: `possessedAtAbsoluteMinute`, `releasedAtAbsoluteMinute`, and nullable published-source PP totals now preserve `null` instead of being normalized to zero by JavaScript's `Number(null)` behavior.

### Verification

The exact final inline JavaScript passes `node --check`. The integrated core suite was then run in the installed Chromium engine through Playwright by loading the exact HTML bytes into a real page DOM. Three consecutive runs produced:

```text
Build: 0.4.39
Tests: 465 / 465 passed
Failures: 0
Campaign-state isolation: preserved
Page errors: 0
Console errors: 0
```

Ten new regressions cover Sinbad's combined cost, automatic-but-undiscovered Intelligence effect, separate power accounting, shared six-turn expiry, insufficient-PP transaction rejection, damage-stripped linked power handling, player opt-out, queued-combat opt-out, Armida failed/successful saves, alignment filtering, mixed qualifying targets, no-extra-PP backlash, and held-user action blocking. Existing Web/Turn Wood and Web Movement regressions also verify that the new incapacitation gate does not accidentally prevent escape-enabling artifact powers.

### Remaining artifact work

The next artifact integration pass should address **Fiery Brand of Masauwu** Meteor Swarm bonus consumption, **Verthandi's Invincible Hourglass** concentration/interruption transaction, **Ortnit's Lance** live dragon-damage and carried-treasure hooks, **Pileus** Rot progression, the **Ivory Plume of Maat** justice-wall interaction, and the **Wife of Ilmarinen** redirected attack target. Comb's final character-class conversion and other genuinely open geometry/object/container procedures remain bounded referee work. After those edges, return to the broader Basic/Expert/Companion/Master procedures still marked partial or open below. Immortal rules remain outside scope.

---

## Executive result

The Known World engine remains a **substantial but incomplete** implementation of Mentzer Basic, Expert, Companion, and Master. Build 0.4.40 uses **Mentzer D&D - BECM.pdf** as the explicit primary rules authority and **Rules Cyclopedia.pdf** as a secondary consolidation/clarification source. It preserves the project's existing optional systems rather than treating them as replacements for BECMI: the Arms Across Eras contextual weapon matrix, phase-based two-sided initiative, the 3D positional/Influence Sphere layer, Weapon Mastery, General Skills, War Machine, Siege Machine, and the Master Touch Dispel option remain separately switchable or bounded by their existing campaign options.

The authoritative bestiary remains **600 catalogue creatures plus 7 Smoking Pillar module extensions = 607 runtime profiles**. All 607 profiles are spawnable, preserve provenance, and now carry usable spatial sizing/Influence Sphere information for the 3D combat engine. This is data/runtime completeness, not a claim that all 607 extraordinary powers have bespoke automation.

**Current Master Artifact state (v0.4.40):** Every printed Table 2 category remains complete at bounded-registry level: A1 **25/25**, A2 **18/18**, true A3 **12/12**, A4 **24/24**, A5 **29/29**, B1 **19/19**, B2 **24/24**, B3 **26/26**, B4 **15/15**, C1 **13/13**, C2 **22/22**, C3 **25/25**, D4 **13/13**, and D5 **22/22**, with D1-D3 retaining full printed-row coverage. **All three printed Table 3 adverse-effect sections remain closed at bounded-registry level:** Table 3A handicap-only **6/6**, Table 3B penalty-only **11/11**, and Table 3C shared handicap-or-penalty **28/28**. The Master artifact lifecycle now also includes bounded **rudimentary intelligence and autonomous personal-defense behavior**: a damaged artifact answers a personal attack with a source-safe attack power, a vessel already at 10% or more damage always attempts to defend when personally attacked, and an artifact with no remaining attack powers can use the printed random A1 fallback costing 35 PP or less. The referee-only library includes all 16 published Mentzer Known Artifacts; v0.4.38 added persistent source-event runtime for activation, discovery, recharge, touch, timing, and staged-doom procedures, while v0.4.39 closes the Rainbow Scarf Open Locks/Intelligence coupling and Girdle of Armida Hold Person backlash with transactional validation. **v0.4.40** closes the principal live Known Artifact integration edges for Masauwu, Ortnit, Pileus, Maat, the Wife of Ilmarinen, and Verthandi, including their common damage, inventory, disease-clock, redirection, and second-scale concentration hooks. Remaining artifact work is concentrated in genuinely bespoke class-conversion, object/container/geometry, producer-specific, and campaign-authored destruction procedures rather than missing Table 2/Table 3 rows or the principal published Known Artifact lifecycles.

Build **0.4.34** completes the printed Table 3B penalty-only registry: Die, Forgetfulness, Gaseous Form, Life Trap, Mania, Operational Error, Paranoia, Service, Spell Effect, Withdrawal, and Wounded. Immediate, timed, and persistent consequences are attached to live user, spell, hit-point, availability, and artifact-power state; campaign-specific behavior and spell manifestations remain explicitly referee-authored where the table does not supply a universal deterministic result.

Build **0.4.35** completes the printed **Table 3C shared adverse-effect registry at 28/28**. Every Table 3C entry can now be authored explicitly as either a handicap or a penalty, with its printed numeric range enforced where the source supplies one. Live common hooks now cover ability-score loss, aging state, alignment change, the 100%/10-foot Anti-Magic adversity, Armor Class/Hit/damage/saving-throw penalties, hit-point loss per Hit Die, extra physical or magical damage, exact-level Energy Drain, and Weak Magic's per-die reduction with its minimum-damage floor. The handicap lifecycle was also corrected so relinquished handicaps continue to affect their original user throughout the magnitude-specific fade instead of disappearing merely because possession ended. Open Table 3C manifestations that Mentzer deliberately leaves to DM development remain explicit authored/pending state instead of receiving invented universal behavior.

Build **0.4.36** adds the Master artifact's printed **rudimentary intelligence and autonomous self-defense** procedure. Artifact intelligence remains intentionally narrow: it reacts to personal danger rather than learning, planning, or becoming a general NPC mind. Actual vessel damage triggers a defensive response even below 10% damage; once the vessel is already 10% or more damaged, every represented personal attack triggers the automatic-defense path whether or not that particular blow can penetrate the artifact's +5-or-artifact damage requirement. The defender considers remaining attack powers, refuses choices that the represented geometry shows would further damage the artifact, spends ordinary artifact charges for the selected power, and ignores possible collateral harm to its mortal carrier. If no attack powers remain, it can select a random A1 attack costing 35 PP or less, as Mentzer directs. Because Mentzer says the artifact senses the “most effective” power but supplies no numerical ranking algorithm, deterministic auto-selection uses the **highest printed PP cost among source-safe, target-valid remaining attack powers** as an explicit engine proxy; the referee/AI may override that proxy with another source-safe choice. Unpossessed artifacts whose battlefield origin is not represented, custom powers without deterministic targeting, and other genuinely ambiguous cases remain pending rather than receiving invented geometry or tactics.

Build 0.3.91 further advances the Companion/Master weapon system. The v0.3.90 polearm, Hook/Disarm, rare-throwing, and Despair work remains intact. This checkpoint adds the major Master shield-weapon procedures (class access, variable blade state, mastery defense rows, exact-hit Breaks, off-hand Second Attack, and the tusked shield's special extra-attack treatment), explicit one-/two-handed bastard-sword mastery mode including its printed rare-throw ranges and Mentzer RAW two-handed initiative loss, the Master Ignite procedure for explicitly flammable targets, and additional bola/net escape and rescue handling. The optional Weapon Mastery switch remains **OFF by default**.

Build 0.3.92 added the first deterministic **Companion Inner-Planes engine**. Persistent planar state distinguishes Prime, Ethereal, elemental Air/Earth/Fire/Water, and elemental wormholes. Ethereal movement uses Mentzer's nearby-Prime-material multipliers; elemental dominance/opposition is represented as a reusable rules function; wormhole direction and destination are persistent; and elemental survival checks can evaluate explicitly recorded protections without inventing possession of spells/items. Astral/Outer-Plane procedures remain outside this checkpoint.

Builds **0.3.93–0.3.95** provide a deterministic **Master Anti-Magic / Dispel Magic core**. Percentage Anti-Magic zones distinguish attack-form and radiated Anti-Magic; represented spell effects can be suppressed and re-enabled according to the Master duration rules; attack-form Anti-Magic can suppress the active magical bonus of an equipped permanent weapon while it remains in the field; ordinary Dispel Magic uses the 20-foot cube and caster-level comparison; and the optional Master **Touch Dispel** supports the Magic-User special prepared form, Cleric reversal use, held-on-the-fingertips lifecycle, interruption by another spell, charged-item DM choice, and source-defined potion, scroll, wand/staff, miscellaneous-item, and permanent-item results for represented inventory records. v0.3.95 adds finite 3D ray geometry, horizontal-axis support for beholder-style rays, Touch Dispel transmission through represented nested containers, the 5-foot transmission limit, random selection when one touch can affect several magical items, and the Master caster-level exceptions for Dispel Magic produced by a ring of spell storing or Staff of Dispelling at the common resolver level. The remaining limitations are explicitly recorded below rather than being treated as complete universal magic handling.

Build **0.3.96** closes the principal remaining Master **Despair** timing and PC-victim branches. Failed monster/NPC special Morale checks no longer remove the victim immediately; they create a pending break that resolves at the victim's next movement opportunity. Player-character victims now use Saving Throw vs. Death Ray and, on failure, enter a persistent 1d6-round forced retreat-in-awe state. That state consumes the PC's movement opportunity, prevents attacks/spellcasting during the affected round, and uses the existing 3D movement layer rather than inventing a separate fear-position system. Weapon-using monsters with sufficient Weapon Mastery can now trigger Despair against PCs from maximum weapon damage. The source-defined all-blows-deflected trigger is also evaluated at round end when a declared mastery deflection prevented every eligible blow and the defender took no damage. The engine currently chooses the permitted **flee** branch for failed monster/NPC Despair; a surrender choice remains referee/AI judgment because Mentzer supplies no random selector between flee and surrender.

Build **0.3.97** advances the Companion/Master planar and high-level magic layer. The 9th-level Magic-User **Gate** now creates persistent Gate records with Mentzer durations, Elemental Gates create a vortex/wormhole connection, non-Outer Gates perform their 10% per-turn other-planar wanderer checks, **Close Gate** destroys ordinary or permanent nearby-plane Gates, and a bounded **Wish** can make an open Elemental Gate's vortex/wormhole permanent without generalizing Wish beyond the printed deterministic case. Gate traversal is now executable: Elemental travel enters a tracked wormhole, while Ethereal/Astral/Outer travel changes planar state directly. Arrival through an Elemental wormhole records the printed transformation requirement for referee resolution instead of inventing a universal protection roll that Mentzer does not supply. Outer-Plane Gate calls record the 95% named-resident / 5% other-being result and 1d6-round response timing while leaving the being's reaction to the referee as RAW requires. A bounded **Astral Plane core** is also present: enchanted weapon bonuses are reduced by one, +1 becomes effectively nonmagical, Teleport/Dimension Door/Fly/Levitate receive the Master dimensional movement downgrades, and a successful save against represented mortal area-damage magic avoids all damage. Outer-plane local laws and full Astral dimensional orientation remain referee/partial work.

Build **0.3.98** closes two important Master Anti-Magic/Dispel gaps and one foundational Expert spell-area gap. Spell missiles whose effects physically travel through the battlefield now have exact 3D segment tests against spherical and finite-ray Anti-Magic zones. **Fire Ball** now resolves as Mentzer's 20-foot-radius spherical volume in actual `(x,y,z)` combat space, rolls damage once, affects every PC and monster inside the sphere (including friendly fire), gives each victim its own save, and clips the expanding blast at any Anti-Magic field that successfully cancels the effect. If cancelling Anti-Magic contains the explosion point, the instantaneous explosion does not occur. The build also adds live **Staff of Dispelling** use: any character carrying a functioning staff can expend one charge to touch one represented magical effect or item; spell effects use the staff's effective 15th caster level, temporary magic is destroyed, and permanent represented items are deactivated for 1d4 rounds. Combat use is queued into the Magic phase and uses the existing 3D touch/barrier test rather than bypassing initiative. The earlier Touch Dispel combat-accessibility path was corrected to use the real spatial-barrier function.

Build **0.3.99** completes another bounded Expert/Master magic checkpoint. **Lightning Bolt** now resolves as the printed 60-foot-long, 5-foot-wide line in true `(x,y,z)` space, with one damage roll, individual saves, friendly fire, the Companion 20-die cap, and the Expert rebound rule: when the bolt hits represented solid terrain it reverses back toward the caster while preserving the total 60-foot path. Cancelling Anti-Magic now destroys the instantaneous bolt where its actual 3D line first enters the successful A-M field, so the bolt does not continue beyond that boundary. The build also adds a live **Ring of Spell Storing** runtime using Mentzer BECM's fixed-spell model: stored spells are known to the wearer, a used fixed slot becomes empty, the same spell may be restored by an appropriate spellcaster casting it directly into the ring, and every stored spell resolves at the lowest class level needed to cast it. Ring use in combat queues into the existing Magic phase rather than bypassing phase initiative. Direct prepared-spell parsing was generalized so named prepared spells such as Lightning Bolt can be issued through the deterministic combat command path without requiring AI interpretation.

Build **0.4.00** establishes a deterministic **Master artifact lifecycle core** instead of leaving artifacts wholly OPEN. Referee-authored artifacts now carry Minor/Lesser/Greater/Major magnitude limits; explicit Power Level, charge capacity, recharge rate, physical vessel HP, AC/HD/save metadata, power-category limits, activation and discovery state, possession, handicap lifecycle, penalty checks, damage-driven power loss, Immortal recall checks, and a unique-method permanent-destruction gate. Spell-backed artifact powers resolve as 40th-level magic and spend their printed power-point cost through the existing Magic phase in combat. The engine intentionally does not randomize artifacts or invent their unique legends, selected powers, adverse effects, or destruction methods. Those remain referee-authored exactly because the Master rules make each artifact unique and campaign-directed. The complete Table 2 power library, all adverse-effect mechanics, autonomous artifact defense selection, and all published Known Artifacts remain further work.

Build **0.4.01** begins converting the Master artifact power tables from referee placeholders into executable rules. A bounded deterministic Table 2 registry now encodes the printed A3 attack bonuses for Hit rolls (+2 through +6), weapon damage (+2 through +5), weapon strength (+1 through +5), double/triple weapon damage, and spell damage (+1 through +4 per damage die); the D2 personal AC bonuses (−2 through −10) and saving-throw bonuses (+2/+4/+6); and the D3 radiated Anti-Magic powers from 10% through 50%. Printed PP costs and durations are stored with each registry entry. One-turn A3 effects feed the live attack/damage engine, 6-turn D2 effects feed live AC and character saves, one-spell damage bonuses are consumed by the next represented damaging spell, and D3 powers create a moving 5-foot radiated Anti-Magic zone centered on the user for 6 turns. `dev artifact tablepowers` lists this encoded subset and `dev artifact tablepower <artifact>: <power>` adds it without bypassing the magnitude/category/Power Level limits. The rest of Table 2 remains source-gated rather than guessed.

Build **0.4.02** extends that artifact registry into the first D1 recovery procedures and the remaining easy-to-bound D2 defenses. The engine now carries the printed D1 entries for Cure Wounds (7 hp), Cure Blindness, Cure Disease, Cure Wounds Serious (14 hp), Neutralize Poison, Cure Wounds Critical (21 hp), Stone to Flesh, Remove Charm, and Remove Curse, including their Table 2 PP costs and touch/30-foot/120-foot ranges. In combat, a targeted cure must pass the live 3D range/barrier check **before PP are spent**. The procedures operate only on afflictions already represented in runtime state rather than inventing absent conditions. D2 now also includes the 6-turn Parry power and the +1/+2/+3 hit-point-per-Hit-Die bonuses. Parry imposes the printed −4 on hand-to-hand attacks (and on thrown-missile paths that identify themselves as thrown) without double-stacking the ordinary Fighter Parry option. Hit-point bonuses use the character's BECMI Hit Dice and form a nonstacking magical hit-point buffer. Damage is subtracted from the magical hit points first, and the bonus is then negated when damage is taken, matching the Master artifact explanation; any overflow reaches ordinary hp. A later artifact hit-point bonus replaces the earlier buffer rather than inventing additive stacking.

Build **0.4.03** fills the remaining printed Master Table 2 D1 registry entries with bounded executable procedures: **Remove Fear, Free Person, Free Monster, Remove Geas, Raise Dead, Raise Dead Fully, Restore, Regeneration, Heal, and Automatic Healing**. Free Person/Monster can release up to four represented Hold victims; Remove Geas compares the recorded geas caster level against the artifact's effective 40th level; Raise Dead enforces the artifact-level 132-day limit and returns a represented PC at 1 hp with the printed two-week recovery state; Raise Dead Fully restores a represented PC at full hp within the artifact-level 96-month/eight-year limit; Restore reverses one explicitly recorded Energy Drain level; Regeneration restores 3 hp per round for one turn but does not function after the recipient reaches 0 hp; Heal uses Cureall's one-condition rule and, when used for wounds, leaves 1d6 damage; and Automatic Healing may be invoked immediately or armed for one turn to trigger when the user reaches 0 hp. Target/time/range validation occurs before PP expenditure. This remains deliberately bounded rather than overstated: Remove Charm's full 20-foot-cube suppression behavior, Stone to Flesh arbitrary 10-foot-cube targeting, non-PC resurrection, partial-corpse disability, universal Energy Drain production, and some related cross-spell interactions remain separate integration work.

Build **0.4.04** expands Master Table 2 **D2 Personal Bonuses** without changing the referee-authored artifact model. All ten **Memorize +1 through +10 bonus spell-level** powers are now encoded at their printed 10–100 PP costs. A spellcaster may use the bonus to memorize one or more spells already known, provided the total spell levels do not exceed the activated bonus; these artifact-granted memorized spells are stored separately from ordinary daily preparation, are consumed after use, and are not refreshed by normal rest. All five **Ability Score bonus** entries are also executable: one, two, three, or four randomly selected distinct ability scores—or all six—rise to 18 for the printed six turns/one hour. Active Strength, Dexterity, Wisdom, Constitution, and Charisma consequences feed the live engine and are recomputed when overlapping effects expire; Intelligence records additional language capacity without inventing a language choice. This checkpoint also corrects the shared **Charisma reaction/retainer profile** to the Mentzer Basic values rather than the later Rules Cyclopedia revision, preserving the project's stated source hierarchy.

Build **0.4.05** expands Master Table 2 **D3 Personal Protections** with seven source-bounded powers: **Water Breathing; Immune to Disease; Immune to Paralysis; Immune to Poison; Immune to Aging Attacks; Immune to Energy Drain; and Immune to Breath Weapons**. Their printed PP costs, target restrictions, ranges, and durations are persisted directly, including the one-day Water Breathing duration rather than forcing every power into turn-based timing. Water Breathing now satisfies represented underwater breathing and Plane-of-Water survival checks. Poison immunity blocks represented poison damage and current poison/venom handlers; disease and paralysis immunity block the current represented acquisition procedures; breath immunity blocks breath-weapon damage while leaving ordinary physical damage intact. Aging and Energy Drain immunity are exposed as common live protection states for present and future producers. These protections prevent or suppress effects while active; they do not silently cure an affliction that already exists unless the printed power itself says that it cures it.

Build **0.4.06** continues D3 with **Shield, Mindmask, Invisibility, Invisibility 10-foot Radius, Mass Invisibility, Survival, Mind Barrier, and Protection from Magical Detection**. Shield uses the Basic AC 2 missile / AC 4 other-attack protection for the artifact table's six-turn duration. Mindmask and Mind Barrier provide common mental-detection blocking, and Mind Barrier contributes its printed +8 to represented mind-influencing saves. Invisibility now persists until broken by attacking or spellcasting, applies the later Rules Cyclopedia's −6 unseen-target attack clarification, and the 10-foot-radius form permanently loses recipients that leave the radius. Mass Invisibility enforces represented 240-foot range and 60-foot-square combat geometry. Survival lasts the printed 48 hours and blocks explicitly classified nonmagical environmental damage while satisfying the existing planar survival predicate. Protection from Magical Detection supplies a six-turn common detection-block state for the user and carried items. The still-unmodeled object-only invisibility branches, mixed dragon/man-size Mass Invisibility capacity, and detection consumers that do not yet route through common predicates remain explicit boundaries rather than guessed behavior.

Build **0.4.07** converts the four remaining Master Table 2 **D3 Personal Protections** into bounded executable procedures: **Security, Statue, Luck, and Immunity**. Security can trap up to five distinct owned inventory items; unauthorized removal starts the printed one-hour audible alarm, while owner permission and the command to silence it are persistent actions. Statue lasts the artifact table's 80 turns and supplies persistent once-per-round form state, AC −4, immobility/no-breathing behavior, and the printed fire/cold/gas/drowning/normal-weapon protections while leaving magical weapons and other magic able to harm the statue normally. Luck lasts one turn or one use and lets the user preselect the result of one of that user's own eligible die rolls before it is made; common PC attack, saving-throw, weapon-damage, healing, and dice paths consume the choice exactly once. Immunity lasts 40 turns, blocks represented 1st–3rd-level spell effects and all missile damage, blocks normal/silver hand-held weapons, halves magical hand-held weapon damage in the recipient's favor, leaves natural attacks unaffected, and can be voluntarily dropped for one round before returning automatically. The remaining D3 work is now **cross-system integration**, not missing registry entries: Statue's reactive +2 initiative/petrification branch, universal 4th/5th-level quantifiable spell scaling under Immunity, object-only invisibility, mixed-size Mass Invisibility capacity, and unusual bespoke spell/item/monster producers that bypass the common predicates remain explicitly bounded.

Build **0.4.08** advances the remaining Master Table 2 **D2 Personal Bonuses** with five further executable procedures: **Dodge normal missiles, Size Control, Elasticity, Dodge any missiles, and Dodge directional attacks**. The three dodge powers now use the character's live Saving Throw vs. Wands after an eligible attack would hit; normal and any-missile dodging track the printed maximum of six successful dodges per round, directional dodging tracks its one-effect-per-round limit, and any successful artifact dodge forfeits the character's remaining attacks, spells, and Magic-phase item use that round. The common damage path routes represented normal missiles, magical missiles, breath weapons, Lightning Bolt-style lines, and explicitly tagged ray/beam/cone/line effects through this procedure. Size Control lasts six turns and accepts the printed **−6 through +6 Changing Monsters modifier**; the modifier feeds live descending AC, Hit rolls, per-die weapon damage, saving throws, and hit points per Hit Die, while expiration restores the original hit-point baseline. Because Mentzer gives the 3-inch-to-18-foot range and the modifier range without a fixed height-to-modifier conversion, the engine requires the modifier to be stated rather than inventing one. Elasticity lasts the artifact table's 12 turns, carries a persistent stretched/normal state, prevents attacks and spellcasting while stretched, blocks artifact use while the carried equipment is stretched with the user, and halves represented blunt-weapon damage. Remaining D2 *powers* are now concentrated in **Polymorph Self, Inertia Control, and Shapechange**; simultaneous selection among more than six incoming missiles and arbitrary non-artifact inventory use/drop during Elasticity remain bounded integration edges rather than guessed procedures.

Build **0.4.09** completes the printed Master Table 2 **D2 Personal Bonuses registry** at a bounded executable level with **Polymorph Self, Inertia Control, and Shapechange**. Polymorph Self uses the artifact's 40th-level **46-turn** duration, preserves the user's AC, hit points, Hit rolls, and saving throws, grants represented natural physical movement and ordinary natural attacks from the chosen living form, bars spellcasting while transformed, and rejects nonliving, over-40-HD, and explicit unique/specific forms rather than inventing exceptions. Inertia Control stops one distinct carried object for **four hours**; common represented equipment, consumption, and inventory-removal paths respect the stopped state, a second command releases it, and any explicitly represented pre-stop velocity is restored on release. Shapechange lasts **40 turns**, is limited to previously seen creature or object forms, adopts represented creature AC, Hit rolls, movement, ordinary natural attacks, and common physical traits while preserving the user's mind, hit points, and saving throws, permits spellcasting only in represented bipedal humanoid forms, enforces the printed **40-foot / 4,000-cn** inanimate limits, and requires a full round of concentration for a combat form change. Inanimate Shapechange forms are immobile and non-breathing. All printed D2 rows now have bounded executable support; remaining D2 work is cross-system integration rather than missing registry coverage, especially universal extraordinary-power/immunity routing, general object combat profiles and free-flight physics, every inventory-transfer route, and the Shapechange interaction with Protection from Evil/Anti-Magic Shell.

Build **0.4.10** begins bounded executable coverage of Master Table 2 **A1 Direct Physical Attacks** without claiming the category complete. Eight printed powers are now deterministic: **Cause Wounds, Light (10 PP / fixed 7 hp), Magic Missile (15 PP / exactly five 1d6+1 missiles), Cause Wounds, Serious (30 PP / fixed 14 hp), Cause Wounds, Critical (35 PP / fixed 21 hp), Create Poison (40 PP), Ice Breath (55 PP), Fire Breath (60 PP), and Acid Breath (65 PP)**. The three Cause Wounds powers use the ordinary hostile touch Hit roll and no saving throw while retaining the artifact table's fixed damage rather than the underlying spell's dice. Magic Missile uses the table's fixed five missiles at 150 feet, supports one target for all five or an explicit five-assignment split, and routes represented Shield protection through its normal save. Create Poison currently implements the creature branch—touch range, Saving Throw vs. Poison, death on failure—while the container-poisoning branch remains open. Fire and Ice Breath use a true widening 30-foot cone 10 feet across at its end; Acid Breath uses a 30-foot by 5-foot line. Each breath deals one-half the user's current hit points, rounded down, with Saving Throw vs. Dragon Breath for half. These attacks use the existing 3D barrier/range layer and common Anti-Magic entry check. Remaining A1 powers and universal monster immunity/resistance or unusual area-Anti-Magic routing remain explicit completion work.

Build **0.4.11** expands that A1 layer with eight more printed powers: **Bearhug (35 PP), Cause Disease (25 PP), Dispel Evil (40 PP), Cloudkill (45 PP), Ice Storm (45 PP), Death Spell (50 PP), Finger of Death (50 PP), and Poison Gas Breath (50 PP)**. Bearhug uses empty-hand and relative-size checks, a normal melee Hit roll, 2d8 initial damage, a one-turn hold, a Death Ray escape save each round, and automatic 2d8 squeezing on a failed escape. Cause Disease creates the Expert wasting-disease state (-2 Hit rolls, no magical wound curing, natural healing at half frequency, fatal in 2d12 days unless cured). Dispel Evil now handles represented undead/enchanted monsters inside 30 feet, the -2 single-target save, destruction/banishment, save-and-flee behavior, and represented character charm/curse removal without guessing when both are present. Cloudkill is a persistent 30-foot-diameter, 20-foot-high cloud that moves 20 feet per combat round for six turns, deals 1 hp per round, and requires sub-5-HD living victims to save vs. Poison or die. Ice Storm uses the artifact's fixed 20d6 packet in a 20-foot cube with Spell saves for half; Death Spell uses a fixed 32-HD budget, lowest-HD-first, and excludes 8+ HD/level creatures; Finger of Death uses the Death Ray save and preserves the Companion 3d10 healing interaction for undead of 10+ HD; Poison Gas Breath creates the printed three-round 20-foot cloud and applies Saving Throw vs. Dragon Breath or death to newly exposed victims. This pass also hardens persistent artifact-effect identity so nested artifact queries no longer detach a live round-based effect from the saved record while it is being processed.

Build **0.4.12** completes bounded executable coverage of all **25 Master Artifact A1 Direct Physical Attacks** under the consolidated Mentzer BECM primary. Fire Ball and Lightning Bolt map into the existing 3D spell engine; Delayed Blast Fire Ball adds its 0–60-round persistent gem countdown; Life Drain applies the Energy Drain level/HD procedure without inventing unavailable pre-Name HP rolls; Explosive Cloud adds fixed 20-hp-per-round moving-cloud damage plus round-long paralysis; Disintegrate, Power Word Kill, Obliterate, and Meteor Swarm implement their printed creature branches and thresholds. Eight new regressions bring the integrated deterministic suite to **339/339**, with three clean Chromium runs and zero runtime exceptions. Remaining A1 work is integration-only (objects, arbitrary empty-point targeting, movable delayed gems, unusual immunity/Anti-Magic producers), while the next missing artifact registry category is A2.

Build **0.4.13** begins bounded executable coverage of Master Artifact **A2 Direct Mental Attacks** with **6 of the 18 printed rows**: **Cause Fear, Sleep, Charm Person, Charm Monster, Calm Others, and Feeblemind**. Cause Fear now drives the common forced-retreat state; artifact Sleep uses the table's fixed 20-turn duration and 20-HD budget while retaining Mentzer's normal-creature/no-save/smallest-first eligibility; Charm Person and Charm Monster enforce the Master creature-category boundaries and Charm Monster's printed eighteen-3-HD-or-less versus one-greater-than-3-HD selection rule; Calm Others performs the no-save 2d6+4 reaction roll for up to 40 HD; and Feeblemind applies the -4 Spell save, effective Intelligence 2, helpless action state, and Cureall removal. Six new regressions bring the deterministic suite to **345/345**, with three clean Chromium runs and zero page errors. A2 remains PARTIAL at 6/18; optional charm resave scheduling, universal charmed-PC obedience, manual waking, Calm Others re-hostility routing, and general Dispel Magic linkage for the bespoke Feeblemind state remain explicit integration gates rather than being approximated.

Build **0.4.14** advances Master Artifact **A2 Direct Mental Attacks** to **9 of 18 printed rows**. **Confusion (25 PP)** now uses the printed 120-foot range, 30-foot radius, 18-creature ceiling, 12-round duration, no-save treatment below 2+1 HD, per-round Spell saves for tougher creatures, and the 2d6 confusion action table. **Control Animals (60 PP)** applies the artifact's 20-turn, 40-HD, 20-creature limits to represented normal/giant animals, with Spell saves and persistent command state. **Control Lesser Undead (70 PP)** applies the printed 20-turn, 20-HD, 10-creature, maximum-7-HD limits with Spell saves and hostile release when control ends. Three new regressions bring the deterministic suite to **348/348**, with three clean Chromium runs, state isolation preserved, and zero page errors. A2 remains PARTIAL at 9/18; Control Plants, Charm Plant, Geas Another, Mass Charm, Open Mind, Control Giants, Control Greater Undead, Control Dragons, and Control Humans remain open.

Build **0.4.15** advances Master Artifact **A2 Direct Mental Attacks** to **12 of 18 printed rows** with **Control Plants (35 PP), Charm Plant (45 PP), and Geas Another (50 PP)**. Control Plants uses the underlying Expert control-item 60-foot reach, the artifact table's 30-foot-square area and 20-turn duration, Spell saves for represented plant-like creatures, and persistent control state. Charm Plant uses the printed 120-foot range and alternative 1-tree / 6-medium-bush / 12-small-shrub / 24-small-plant capacities, with plant-like monsters receiving their source-defined Spell save; for artifact duration the engine follows Table 2's explicit **3 months** rather than the contradictory six-month sentence later in the spell body. Geas Another uses the printed 30-foot range, Saving Throw vs. Spells, 40th-level artifact source metadata, and persistent instruction state while leaving the source-required semantic judgment (possible / not directly fatal) and violation penalty to referee/AI input. Three new regressions bring the deterministic suite to **351/351**, with three clean Chromium runs, state isolation preserved, and zero page or log errors. A2 remains PARTIAL at 12/18; **Mass Charm, Open Mind, Control Giants, Control Greater Undead, Control Dragons, and Control Humans** remain open.

Build **0.4.16** completes bounded executable registry coverage of **all 18 Master Artifact A2 Direct Mental Attacks**. **Mass Charm (75 PP)** enforces the printed 120-foot range, 30-HD total, maximum-30-HD individual target, and −2 Spell save while reusing persistent charm state. **Open Mind (80 PP)** uses hostile touch and applies the reversed Mind Barrier's −8 penalty to represented mind-influencing saves for the underlying 40th-level artifact duration of 40 hours. **Control Giants (85 PP), Control Greater Undead (90 PP), Control Dragons (95 PP), and Control Humans (100 PP)** implement their distinct one-type/count/HD limits and 20-turn durations; controlled dragons are routed through the common spellcasting gate so they cannot cast spells while controlled. Six new regressions bring the deterministic suite to **357/357**, with three consecutive Chromium harness runs, state isolation preserved, zero test failures, zero page errors, and zero console errors. A2 is now **IMPLEMENTED / BOUNDED REGISTRY (18/18)**; remaining work is cross-system charm/control integration rather than missing Table 2 rows.

Build **0.4.17** begins bounded executable coverage of Master Artifact **A4 Miscellaneous Attack Forms** with **6 of the 24 printed rows**: **Blight (10 PP), Turn Undead as Cleric L6 (20 PP), Turn Undead as Cleric L12 (45 PP), Dispel Magic (55 PP), Turn Undead as Cleric L24 (70 PP), and Turn Undead as Cleric L36 (95 PP)**. Blight uses Mentzer's reversed Bless procedure—60-foot range, 20-foot square, six turns, individual Spell saves, and a live −1 to Morale/Hit/damage rolls. The four Turn Undead powers create timed turning authority at the exact printed cleric levels and durations, using the existing BECM turning table and the stronger of native cleric level or artifact-granted level. A4 Dispel Magic delegates to the already-live 40th-level artifact spell resolver and its 120-foot / 20-foot-cube procedure rather than duplicating dispelling logic. Four regressions bring the deterministic suite to **361/361**, with three clean Chromium runs, state isolation preserved, and zero page or console errors. A4 remains **PARTIAL: 6/24**.

Build **0.4.18** advances Master Artifact **A4 Miscellaneous Attack Forms** to **11 of 24 printed rows** with **Darkness (15 PP), Light (20 PP), Continual Darkness (30 PP), Silence 15' Radius (40 PP), and Babble (50 PP)**. Light and ordinary Darkness now create moving 30-foot-diameter area states for the exact Table 2 duration of 46 turns and cancel one another when directly opposed; Continual Darkness creates a persistent 30-foot-radius state that overrides ordinary dungeon light and infravision in the represented party-location visibility layer. Silence uses the printed 180-foot range, 15-foot radius and 12-turn duration: a failed Spell save makes the field follow the creature, while a successful save leaves the field fixed at the cast location; the common spellcasting gate now checks active Silence fields. Babble uses the printed 60-foot range, 40-turn duration and -2 Spell save and records a live communication-garbled state without incorrectly preventing spellcasting. Four new regressions bring the deterministic suite to **365/365**, with three clean Chromium runs, state isolation preserved, zero failures, zero page errors and zero console errors. A4 remains **PARTIAL: 11/24**; arbitrary empty-point/object anchoring, Light/Darkness eye-blindness targeting, universal communication/command-word consumers, and unusual Anti-Magic/Dispel discovery remain explicit integration edges.

Build **0.4.19** advances Master Artifact **A4 Miscellaneous Attack Forms** to **18/24** by wiring the three Set normal Trap percentages, three Pick Pockets percentages, and Disarm Attack into the existing thief/physical-state/Companion-combat procedures. Successful normal traps persist their referee-described physical design without fabricating a universal trigger or damage packet; temporary Pick Pockets uses the ordinary victim-HD penalty and detection procedure; and Disarm Attack grants the existing Companion Disarm option for six turns even to an otherwise unqualified user. The integrated suite reaches **368/368** with three clean runs.

Build **0.4.20** completes bounded executable registry coverage of **all 24 Master Artifact A4 Miscellaneous Attack Forms**. The final six rows are **Curse (25 PP), Polymorph Other (45 PP), Appear (60 PP), Polymorph Any Object (75 PP), Anti-Magic Ray (90 PP), and Blasting (100 PP)**. Curse deterministically supports the source's safe numeric -4 attack and -2 saving-throw branches while leaving open-ended/reaction/prime-requisite curses referee-gated. Polymorph Other and the represented creature branch of Polymorph Any Object now reuse the live transformation layer, preserve hit points, enforce living/HD limits and saves, and feed represented PC AC/THAC0/movement/natural attacks through the new form. Appear strips represented invisibility and suppresses effective invisibility for one turn. Anti-Magic Ray creates a one-turn 100% attack-form ray through the existing finite 3D A-M geometry. Blasting resolves the Table 2 60-foot-by-20-foot cone, one 2d6 damage packet, and one-turn deafness on failed Spell saves. Six new behavioral regressions plus the expanded registry assertion bring the deterministic suite to **374/374**, with three consecutive clean Chromium runs, state isolation preserved, zero test failures, zero page errors, and zero console errors. A4 is now **IMPLEMENTED / BOUNDED REGISTRY (24/24)**; remaining A4 work is cross-system integration rather than missing rows.

Current completion gates are concentrated rather than foundational: full unification of Anti-Magic/Dispel handling across every bespoke spell flag and every permanent magic-item power; remaining cone/irregular field geometry and generalized clipping for other unusual non-spherical area spells; arbitrary empty-point targeting for Fire Ball/Lightning Bolt and other point-selected effects; the many still-unimplemented high-level spell effects beyond the new Gate/Astral branches; remaining Weapon Mastery edge cases (shield-weapon inventory/repair and unusual magical interactions, poison acquisition/application, binding-weapon ownership/destruction/repair lifecycle, referee/AI surrender selection for failed Despair, and remaining unusual special-effect interactions); remaining planar procedures (full Astral dimensional orientation/rotation learning, Astral navigation/lost procedures, complete Outer-Plane local-law handling, planar encounter generation, automated protection-aware elemental transformation, and remaining plane-specific spell transformations); completion of the artifact core (bounded D1 area/non-PC edge cases; D2 cross-system integration after completion of the printed Personal Bonuses registry, including unusual Shapechange powers/immunities, general object combat/physics and transfer routing, the >6-missile selection boundary, Elasticity inventory routing, and Protection from Evil/Anti-Magic Shell passage; D3 cross-system edge integration for Statue initiative/petrification, Immunity's generic 4th/5th-level quantifiable effects, object/size/detection cases, and unusual producers that bypass common predicates; A1 cross-system integration edges; A2 cross-system charm/control integration after complete printed-row coverage; A4 cross-system integration after complete printed-row coverage (arbitrary object/empty-point branches, universal Dispel/Anti-Magic discovery, polymorphed-monster extraordinary powers/object physics, exact ray-width treatment where the source supplies no width, structural Blasting, and remaining Curse consumers); published Known Artifact records and the remaining artifact cross-system integration edges); remaining mortal class endgames; universal automation of exceptional monster powers; universal lair treasure integration; and Known World regional encounter-table deployment of the complete catalogue. Immortal-set play remains explicitly out of scope.

**Validation for this checkpoint:** the extracted inline JavaScript parses successfully. The complete v0.4.34 deterministic core harness was executed against the exact integrated document in Node with a lightweight DOM host: **436 / 436 tests passed, 0 failures, campaign-state isolation preserved**. The host emits expected IndexedDB-unavailable journal warnings because it does not supply browser persistence. A Chromium executable remains unavailable in this runtime; the last full Chromium baseline is v0.4.28 at **424 / 424**, repeated three times with zero page/runtime errors.

Status meanings:

- **IMPLEMENTED** — deterministic state mutation and resolution are present.
- **IMPLEMENTED / REFEREE INPUT** — the engine performs the rule after the referee supplies a judgment the printed rule itself requires.
- **PARTIAL** — a usable core exists, but published branches remain open.
- **DATA ONLY** — lists or statistics exist without the full procedure.
- **OPEN** — no rules-faithful engine procedure yet.
- **N/A** — presentation or campaign advice that does not define a mechanical procedure.

## Authoritative monster roster

| Scope | Count | Engine result |
|---|---:|---|
| Workbook authority | 600 | All identities, governing statistics, descriptions, support text, and source citations are embedded and spawnable. |
| Smoking Pillar extensions | 7 | Module-specific profiles extend rather than replace the 600-entry authority. |
| Runtime total | 607 | All instantiate with persistent HP, AC, HD, movement, morale, saves, role, source, readiness metadata, physical size data, and an Influence Radius usable by the 3D combat layer. |
| Ordinary automated profiles | about 375 | Parsed ordinary attacks resolve through the combat engine. |
| Variable-weapon profiles | about 148 | Encounter instances receive a source-guided legal weapon loadout. |
| Parameterized profiles | 43 | Published variable AC/HD/morale fields resolve per instance and the result is recorded. |
| Referee-procedure candidates | about 34 before dedicated handlers | The creature remains usable, but the engine displays an automation notice when a non-damage or unusual published procedure requires adjudication. Existing dedicated handlers reduce the live referee-required subset. |

“Spawnable” therefore means the creature can enter and persist in the game. It does not falsely imply that every unusual power among 607 profiles has a bespoke handler. `dev monster readiness [query]`, `dev monster catalog [query]`, `dev monster lore [query]`, and `dev monster rules <query>` expose the distinction.


## Preserved Known World optional / extension systems

These systems are intentionally retained while Mentzer BECM remains the surrounding rules chassis.

| System | Status | Current audit |
|---|---|---|
| Arms Across Eras contextual weapon matrix | IMPLEMENTED / OPTIONAL | The existing Size × Protection × Range contextual matrix remains selectable and does not replace BECMI attack rolls, class rules, initiative, saves, or combat sequence. Melee uses the project's **Close / Normal / Far** measure. |
| Phase-based initiative | IMPLEMENTED / OPTIONAL | Initiative remains two-sided. The initiative winner chooses whether to move first or last; subsequent missile, magic, and melee phases resolve in the configured side order. RAW side-turn initiative remains selectable. |
| 3D positional combat | IMPLEMENTED / EXTENSION | Combatants retain `(x,y,z)` point positions. True 3D distance, elevation, flying/swimming movement, Influence Spheres, hostile-contact movement stopping, friendly sphere overlap, connected-component melee grouping, melee merge/split, and rough player-facing combat diagrams are present. Medium humanoids use a 2.5-foot Influence Radius (5-foot diameter). Solid 3D barriers can prevent contact. Complex arbitrary terrain solids and every unusual movement power remain subject to individual handlers. |
| Shared melee measure | IMPLEMENTED / EXTENSION | Every connected melee has one shared **Close / Normal / Far** state used by the contextual weapon matrix while exact coordinates remain active for location, blocking, line of sight, outside range, and melee membership. |
| FlexAI tactical role layer | IMPLEMENTED / ADVISORY | Tactical roles and descriptive behavior can guide choices, but published BECMI statistics and mandatory behavior remain authoritative. |
| 607-profile creature runtime | IMPLEMENTED DATA / PARTIAL AUTOMATION | All profiles can instantiate and participate in ordinary combat; exceptional creature-specific powers remain progressively handler-driven and readiness-gated where necessary. |

## Basic Player rules

| Rules domain | Status | Engine audit |
|---|---|---|
| Ability generation and adjustments | IMPLEMENTED | Ability scores, adjustments, hit points, armor class, attacks, reactions, and retainer limits feed live procedures. |
| Classes and level limits | IMPLEMENTED | Cleric, Fighter, Magic-User, Thief, Dwarf, Elf, and Halfling foundations and legal equipment are represented. |
| Alignment | IMPLEMENTED / REFEREE INPUT | Alignment is stored and exposed; broad behavioral interpretation remains a roleplaying judgment. |
| Starting money, prices, and equipment | IMPLEMENTED | Purchases, quantities, coin conversion, inventory, and equipping mutate campaign state. |
| Encumbrance and movement | IMPLEMENTED | Carried weight changes movement and exploration/travel timing. |
| Dungeon turns, light, rest, doors, traps, and searches | IMPLEMENTED | The exploration clock, illumination, rest, door state, trap state, and repeatable search procedures persist. |
| Surprise, reaction, initiative, missile, magic, melee, morale | IMPLEMENTED | Core encounter and combat sequence is deterministic. RAW side initiative is available, and the preserved optional phase-based mode uses the same two-sided initiative with winner-selected movement order. |
| Damage, death, healing, and saving throws | PARTIAL | Core HP, death, healing and character saves are active. Monster class/level saves now cover all five categories; special source saves and some fallback targets still require adjudication. |
| Cleric and Magic-User spell acquisition/preparation | IMPLEMENTED | Spell access, spellbooks, preparation, slots, disruption, expenditure, and rest recovery are present. |
| Individual spell effects | PARTIAL | Common combat, healing, detection, and control effects are bespoke; open-ended illusions, transformations, creation, planar, and wish-class effects remain referee-mediated. |
| Basic advancement and XP | IMPLEMENTED | Treasure/monster XP, safe-haven settlement, and legal advancement are present. |

## Basic Dungeon Master rules

| Rules domain | Status | Engine audit |
|---|---|---|
| Adventure and dungeon sequence | IMPLEMENTED | The site graph, keyed rooms, passage time, doors, wandering checks, rest, and return loop are active. |
| Wandering monsters, distance, surprise, reactions | IMPLEMENTED | Checks and encounter state are deterministic and auditable. |
| Monster statistics and No. Appearing | PARTIAL | All 600 authority records are usable; ordinary fields are deterministic, while unusual powers without handlers invoke an explicit referee handoff. Normal regional tables do not yet distribute all 600 creatures across the Known World. |
| Monster morale and behavior | IMPLEMENTED / REFEREE INPUT | Published morale is deterministic. Source behavior controls; flexible tactical selection never overrides it. |
| Treasure placement and recovery | IMPLEMENTED | Coin, portable treasure, persistent room loot, and XP settlement are active. Mentzer A–V coins, gems, jewelry and magic allowances now generate through persistent referee commands. Exact magic-item selection, special treasure instructions and automatic world placement remain **PARTIAL**. |
| Dungeon stocking | IMPLEMENTED | Procedural B/X-style stocking, persistent generated sites, and wandering tables are present. |
| Referee information control | IMPLEMENTED | Player and developer/referee views are separated; hidden state is gated. |

## Expert rules

| Rules domain | Status | Engine audit |
|---|---|---|
| Wilderness movement and terrain | IMPLEMENTED | Daily movement, hex scale conversion, terrain, encumbrance, forced march, rest debt, and persistent travel time are active. |
| Getting lost | IMPLEMENTED | RAW displacement is default; a declared map-safe lost-time campaign option is separately labeled. |
| Weather, wind, foraging, hunting, and provisions | IMPLEMENTED | Daily weather/wind, travel foraging, food/water consumption, starvation damage, and recovery constraints are active. |
| Wilderness encounters, evasion, and pursuit | IMPLEMENTED | Frequency, distance, surprise, reaction, evasion, pursuit, and transition to combat are present. |
| Water travel and vessels | IMPLEMENTED | Vessel statistics, crew stations, cargo, sail/oar movement, wind, reefs, hull damage, wrecking, and repair are active. |
| Swimming and drowning | IMPLEMENTED / REFEREE INPUT | Surface swimming uses one-fifth outdoor running speed; underwater speed is read in feet. The 400-en limit, dangerous-water checks, exhaustion, support, wreck escape, Constitution/half-Constitution breath capacity, escalating drowning checks, one-third-Constitution rescue window, Healing/magic revival, and post-rescue exhaustion persist. The referee still identifies environmental danger when it is not represented by mapped weather or terrain. |
| Underwater combat | IMPLEMENTED / REFEREE INPUT | Surface dwellers take −4 to attacks, improved by monthly Intelligence-check acclimation. Cutting/slashing/smashing weapons use −10 and half damage; thrusting/piercing weapons function normally apart from the surface-dweller penalty. Ordinary missiles fail; only undersea-made crossbows operate, with ranges in feet. Casters must breathe, and Air/Fire-associated spells fail. The referee marks an unusual weapon, creature, or spell as native/undersea-made where the printed rule requires classification. |
| Retainers, hirelings, mercenaries, and specialists | IMPLEMENTED | Search, reaction, wages, loyalty/morale, payroll, equipment, and task restrictions persist. |
| Stronghold construction | IMPLEMENTED / ADAPTED | Components, costs, time, structural HP, supervision, and safe-haven use are active. Early private construction is an explicit Known World campaign adaptation; Name-level political authority is not granted early. |
| Expert spell expansion | PARTIAL | Lists and casting are present. Fire Ball has true 3D spherical resolution and v0.3.99 adds exact Lightning Bolt line/rebound resolution with friendly fire, individual saves, the 20-die cap, and Anti-Magic clipping. Not every expanded spell has a bespoke effect. |
| Expert monsters and treasure | PARTIAL | Roster data is authoritative and spawnable; unusual handlers and universal lair treasure generation remain open. |

## Companion Player rules

| Rules domain | Status | Engine audit |
|---|---|---|
| Levels 15–25 and class progression | PARTIAL | Level/XP/THAC0/save/slot progressions exist. Every high-level class choice, title, obligation, and endgame branch is not yet modeled. |
| Fighter Combat Options: multiple attacks | IMPLEMENTED | Human status and 12th-level qualification are enforced; adjusted attack need ≤2 activates 2/3/4 attacks at levels 12/24/36. Dwarves, elves, and halflings qualify automatically at their published XP thresholds and receive two or three attacks at their class-specific milestones; they never receive four. |
| Fighter Combat Options: Smash | IMPLEMENTED | Declaration loses initiative, applies −5 to hit, and adds the full Strength score after ordinary weapon damage and modifiers. |
| Fighter Combat Options: Parry | IMPLEMENTED | The character gives up attacks; hand-to-hand attackers suffer −4 to hit for the round. |
| Fighter Combat Options: Disarm | IMPLEMENTED | Weapon-only target validation, normal hit roll without damage, and the opposed Dexterity-adjusted d20 procedure are active. |
| Lance Attack and mounted combat | IMPLEMENTED / PARTIAL | Named mount assignment and the 20-yard running, flying, or swimming charge are active for Fighters, Dwarves, and Elves only. The lance roll is doubled before Strength and magic adjustments are added once. Multiple-attack eligibility remains target-specific. Optional aerial saddle/falling detail beyond the printed bounded procedures remains open. |
| Unarmed combat: striking | IMPLEMENTED / PARTIAL | Strike/haymaker declarations, size and creature immunities, Strength damage, stun, knockout save, and durations persist. Multiheaded targets and magical apparel edge cases remain referee-mediated. |
| Unarmed combat: wrestling | IMPLEMENTED / REFEREE INPUT | Wrestling Rating, class adjustment option, opposed rolls, Grab/Fall/Pin progression, instant-pin margin, pin damage, saving throw, and natural-20 escape are active. Groups of three or more use the highest-WR leader, +1/+5 helper adjustments, and 4/8/12 size limits; all pinners may damage against one save, and each pinner negates one attack of a multi-attacking victim. The referee applies unusual touch powers whose monster handler is not yet bespoke. |
| Weapon and armor restrictions | IMPLEMENTED | Class restrictions and ordinary weapon/equipment state are enforced. |
| Companion special weapons | IMPLEMENTED / PARTIAL | Blackjack, blowgun, bola, net, trident, heavy crossbow, and whip equipment exists. Build 0.3.89 resolves the central blackjack/blowgun/bola/net/whip special-result tables, recurring Entangle/Slow/Stun recovery, paralysis/knockout duration, bola strangling deadline, non-solid target restrictions, poison immunity, and size-sensitive net saves. Remaining branches include a complete poison-preparation economy, all rescue/cutting/repair interactions, and every equipment-specific edge case. |
| Companion spells | PARTIAL | Spell registrations and slots exist and a growing set has bespoke resolution. v0.3.97 adds the executable 9th-level Magic-User Gate/Close Gate lifecycle and bounded Elemental-Gate permanence via Wish. Many other Companion high-level spells remain data/referee-mediated. |
| Dominion entry and class strongholds | IMPLEMENTED / PARTIAL | Recognition, followers, stronghold conversion, dominion foundation, population, income, expenses, confidence, and events exist; every class-specific political branch remains under audit. |

## Companion Dungeon Master rules

| Rules domain | Status | Engine audit |
|---|---|---|
| Dominion economy and confidence | IMPLEMENTED | Families, resources, service/resource/tax income, liege share, tithe, ruler XP, confidence, unrest, and annual events persist. |
| Stronghold staff and followers | IMPLEMENTED | Published staff roles, salaries, and major follower procedures are represented. |
| War Machine BFR | IMPLEMENTED | Leadership, officer requirement, experience, victories/routs, training, equipment, AC, and special troops calculate separately and remain inspectable. |
| War Machine troop class and BR | IMPLEMENTED | Published BFR bands and all twelve mounted/missile/magic/spell/flying/speed bonus tests are applied. |
| War Machine battle modifiers | IMPLEMENTED / REFEREE INPUT | Troop ratio, fatigue, and mercy rematch are automatic. Terrain, information, surprise, immunities, and heroics use explicit named fields because applicability requires referee judgment. |
| War Machine battle results | IMPLEMENTED | d100 rolls, score difference, casualties, dead/wounded split, fatigue, retreat/rout/destruction, victories, rout history, and persistent battle records are active. |
| War Machine tactics table | IMPLEMENTED / DEFAULT OFF | Attack*, Attack, Envelope, Trap, Hold, and Withdraw apply BR shifts, casualty shifts, No Effect, and No Combat. Toggle with `war tactics on/off`. |
| War Machine mercy | IMPLEMENTED | Mercy halves loser casualties, preserves recoverable wounded, stores the +2 reaction relationship, and applies the spared force's −20 BR in a rematch within one year. |
| War Machine PC actions and XP | IMPLEMENTED / REFEREE INPUT | PCs and major NPCs remain outside abstract troop casualties. Validated visible heroics apply the published ±20 leader or ±10 name-level modifier; winners retain one combat spell and expend one-third of applicable charges, losers expend all combat spells and two-thirds of charges when no normal adventure was played. Commanders receive enemy troop count XP on victory or one-third on defeat through the safe-haven XP ledger. The referee supplies the normal-play heroic outcome. |
| War Machine special items | IMPLEMENTED | A Rod of Victory adds +25 to its holder's d100 result, capped at 100, and caps a loss exceeding 100 at the 91–100 result. A Staff of Health restores up to 500 wounded when its holder's force holds the field. |
| War Machine movement and forced march | IMPLEMENTED | The 51–100 and 101+ size reductions, both foraging rates/chances, terrain adjustment, food fatigue and recovery, all eight troop-class forced-march rows, d6 maneuver initiative, and 1/5-mile contact ranges persist. |
| War Machine break contact | IMPLEMENTED | Retreat versus pursuit is compared after battle; qualifying Withdraw results add one terrain unit while preventing occupation or pursuit. |
| Simple Companion siege bridge | IMPLEMENTED | Detailed Siege Machine supersedes the simple ×4 defender/retreat/casualty bridge when a siege record is used. |
| Multiverse, Ethereal, Elemental, and planar travel | PARTIAL / IMPLEMENTED CORE | v0.3.92 provides persistent Prime/Ethereal/Elemental/wormhole state, Mentzer Ethereal movement multipliers, no-gravity Ether, elemental dominance/opposition, wormhole state, and explicit survival evaluation. v0.3.97 adds executable Gate/Close Gate records and traversal, Elemental vortex/wormhole creation, bounded Wish permanence for Elemental Gates, per-turn Gate wanderer events, Outer-Gate response timing, and an Astral core covering item-strength reduction, movement-spell dimensional downgrade, and successful-save negation of represented mortal area damage. Still open: full Astral orientation/rotation learning and navigation, complete Outer-Plane local laws/encounters, automatic protection-aware elemental transformation, complete planar encounter generation, and remaining plane-specific spell rewrites. |
| Companion monsters and magic items | PARTIAL | Catalogue and ordinary item mechanics exist; not every special power is bespoke. |

## Master Player rules

| Rules domain | Status | Engine audit |
|---|---|---|
| Levels 26–36 and demihuman Attack Ranks | IMPLEMENTED / PARTIAL | Human progression and all Dwarf C–M, Elf C–M, and Halfling A–K XP thresholds and hit-roll improvements persist beyond racial level caps. Demihuman spell/breath damage-resistance thresholds and combat-option milestones are represented. Remaining incompleteness concerns class paths and endgame benefits rather than the Attack Rank tables. |
| Weapon Mastery | IMPLEMENTED / PARTIAL / DEFAULT OFF | Optional campaign switch; human/demihuman choice progression; proficiency aliases; committed choices; training time, cost, midpoint failure/refund/retry lifecycle; rank success matrix; P/S damage; H/M attack bonuses; opponent-favorable mixed H/M handling; unskilled half damage and missile −1; ordinary mastery ranges; dagger-like double-damage thresholds; automatic eligible AC defenses; declared Deflect; several automatic Delay/Stun effects; trident Skewer; Companion special-result tables; persistent mastery status effects; individualized Master polearms; Hook/Disarm; rare throwing; group Despair allocation; and monster mastery Intelligence caps are active. **v0.3.91 adds Master shield weapons:** Fighter/Thief/demihuman access, source-bounded blade counts, exact mastery defense rows, Breaks on the exact needed Hit roll with the printed magic and foe-damage modifiers, off-hand Second Attack for horned/knife/sword shields, and the two-handed tusked shield receiving one attack beyond the character's otherwise legal Multiple Attacks count. Horned shields do not break. Knife/tusked defense rows have no printed `/N` attack limit, so the engine treats those listed AC benefits as applying to all otherwise eligible attacks rather than inventing a limit. Shield-weapon defense is used instead of stacking a second weapon-mastery AC benefit when both a main weapon and shield weapon are equipped; this non-stacking choice is an engine interpretation pending an explicit source statement. **Bastard sword:** one-/two-handed modes are explicit; two-handed mode selects its own Master mastery/deflect/rare-throw rows, prevents shield use, and in RAW weapon mode always loses initiative as Mentzer states. Matrix mode preserves the project's existing optional no-blanket-two-handed-timing convention. **Ignite:** explicitly flammable targets use the printed 5% per damage point chance and burn 1d6 rounds for 1d4 damage per round; whether unusual scenery/creatures are flammable remains referee input. Bola helper rescue, self-destruction with an edged weapon when not strangled, strangling-survivor 2d6 paralysis, and dagger-assisted net escape/destruction are represented. **v0.3.96 completes the principal Despair branches:** all three printed triggers are represented for the applicable PC mastery path (maximum damage, all eligible blows deflected without taking damage, two disarms), lowest-HD/level allocation and once-per-fight limits persist, failed monster morale now resolves at the next movement opportunity rather than immediately, PC victims save vs. Death Ray and flee in awe for 1d6 rounds, and weapon-using monsters can impose the PC branch from maximum mastery damage. The deterministic monster response uses Mentzer's permitted flee result; surrender remains referee/AI choice. **Still incomplete:** complete physical ownership/recovery/repair bookkeeping for cut/damaged nets and bolas; magical binding-weapon edge cases; full poison acquisition/application logistics; and remaining unusual special-effect interactions. |
| Siege weapon statistics | IMPLEMENTED | Ballista, light/heavy catapult, trebuchet, bore, ram, and major miscellaneous equipment have cost, encumbrance, AC, HP, crew, range, damage, rate, BR, and ammunition fields where published. |
| Fortification statistics | IMPLEMENTED | Standard walls, towers, keep, gatehouse, buildings, moat, gates, doors, and barbican have HP and BR values. |
| Siege Machine preparation | IMPLEMENTED / REFEREE INPUT | Forces, fortifications, equipment, crew factors, ammunition, payroll funds, ration batches, cleric levels, specialists, projects, week count, and history persist. The referee supplies declarations that the printed procedure keeps secret. |
| Siege Machine tactics | IMPLEMENTED | Bombard, Harass, Assault, and Depart are accepted and resolve with tactic-specific siege-equipment BR. |
| Bombard resolution | IMPLEMENTED | Attacker d10 and defender 2d10 artillery casualty procedures are represented and persisted. |
| Harass and Assault resolution | IMPLEMENTED | Direct 1/10 and 1/2 loss scaling, defender casualty halving, Harass location suppression/rout fatigue, extended ratios, fortification BR, equipment BR, and Assault displacement state are active. |
| Ammunition | IMPLEMENTED / REFEREE INPUT | First-week exemption, expenditure, zero-ammunition exclusion, attacker 3/4–1/2–1/4 recovery based on the current tactic, rest-week halving, defender one-quarter recovery, conversion, and no ordinary ballista recovery persist. Defenders may demolish stone buildings for ammunition equal to lost building BR; an armorer can make referee-declared ballista units because the rule gives no production rate. |
| Sustenance and payroll during siege | IMPLEMENTED | Second-week payroll, cash shortage, standard/iron ration spoilage, mount rations, level 10–36 clerical support, morale loss, fatigue, weakness, desertion deadlines, and automatic desertion/rebellion with force deactivation persist. |
| Special squads | IMPLEMENTED / REFEREE INPUT | Hidden squads are created before the siege, their PC/NPC membership and purpose persist, normal adventure play determines success, and declared information, leader-removal, or equipment-loss consequences apply before the next week. |
| Field construction and specialists | IMPLEMENTED / REFEREE INPUT | Engineer/artillerist capacities, 10% hardware, wood-distance multipliers, 1/2 HP per worker-day, worker caps, weekly progress, reclaimed timber, equipment completion, and armorer-made ballista ammunition are active. The referee supplies a ballista-ammunition quantity because no field production rate is printed. |
| Targeted assault frontage | IMPLEMENTED | Frontage rounds to 100-foot sections; each section admits up to 300 attackers and four engines. Defender BR uses the selected section, towers within 200 feet, and one-quarter of remaining fortification BR. Nonparticipating strength remains in persistent force state. |
| Post-siege fortification damage | IMPLEMENTED | Each artillery weapon rolls once, the sum is multiplied by siege weeks, d100 is subtracted, rubble is checked, and damage follows the published 75%-wall then repeated 20% allocation order. |
| Master spells | PARTIAL | Lists and slots exist; several deterministic effects are bespoke. v0.3.97 adds Gate/Close Gate plus bounded Astral interactions; v0.3.98 makes Fire Ball a true 3D area spell; v0.3.99 adds the inherited Expert Lightning Bolt as a 60' × 5' 3D line with rebound and Anti-Magic clipping, plus live Ring of Spell Storing casting at the lowest required caster level. Many Companion/Master spells and unusual area interactions still require dedicated procedures. |

## Master Dungeon Master rules

| Rules domain | Status | Engine audit |
|---|---|---|
| Master monsters | PARTIAL | Entries are in the 600-entry authority and spawnable with 3D spatial data. Ordinary attacks, movement, saves, morale, and loadouts can resolve; extraordinary procedures remain readiness-gated until a dedicated handler exists. Weapon-using monsters can participate in optional Weapon Mastery with Intelligence-based caps. |
| Artifacts | PARTIAL / IMPLEMENTED CORE | v0.4.00 adds the Master artifact lifecycle core. Minor/Lesser/Greater/Major magnitude limits, maximum Power Level, total and A/B/C/D power-count limits, explicit power costs, charge capacity, magnitude recharge rates, the below-10-PP use lockout, 40th-level spell-backed effects, save-as-36th-level-Fighter metadata, activation/discovery/possession state, first-use and zero-charge handicap hooks, the standard power-cost-minus-10 penalty check, magnitude-specific handicap fade after possession ends, artifact vessel HP, AC −20 / 40-HD attackability metadata, +5-or-artifact-only damage, minimum possible damage, lowest-cost power loss beginning at 40% damage and each additional 10%, 80%/90% Immortal recall checks, automatic recall at 100% vessel damage, and unique legendary-method permanent destruction are represented. v0.4.01 adds deterministic Table 2 A3 hit/weapon-damage/weapon-strength/double/triple/spell-damage bonuses, D2 AC/save bonuses, and D3 10–50% radiated Anti-Magic. v0.4.02 adds nine bounded D1 recovery entries plus D2 Parry and the +1/+2/+3 hp-per-HD magical damage pools. v0.4.03 adds the remaining printed D1 registry entries: Remove Fear, Free Person, Free Monster, Remove Geas, Raise Dead, Raise Dead Fully, Restore, Regeneration, Heal, and Automatic Healing, including represented recovery/timing lifecycles and pre-spend target validation. v0.4.04 adds all ten D2 Memorize +1 through +10 bonus spell-level powers and all five D2 Ability Score bonus powers, including one-use bonus memorization kept separate from ordinary daily slots, six-turn score-to-18 effects, live derived-stat recomputation, expiration/restoration, and saved-state persistence. v0.4.05 adds D3 Water Breathing plus immunity to Disease, Paralysis, Poison, Aging Attacks, Energy Drain, and Breath Weapons, with printed PP/range/duration metadata and live integration into represented breathing, poison, disease, paralysis, breath-damage, and planar checks. v0.4.06 adds D3 Shield, Mindmask, Invisibility, Invisibility 10-foot Radius, Mass Invisibility, Survival, Mind Barrier, and Protection from Magical Detection, including persistent break/tether state, live AC/save/environment hooks, and represented 3D range/area geometry. v0.4.07 adds the remaining D3 registry entries—Security, Statue, Luck, and Immunity—with permission-aware secured-item alarms, persistent statue-form defenses, one-use pre-roll result selection, and common spell/missile/weapon immunity hooks. v0.4.08 adds D2 Dodge Normal Missiles, Size Control, Elasticity, Dodge Any Missiles, and Dodge Directional Attacks, including live Save-vs.-Wands routing, per-round dodge limits/action forfeiture, Changing-Monsters size modifiers, and stretched-form blunt-damage/action restrictions. v0.4.09 adds D2 Polymorph Self, Inertia Control, and Shapechange, completing bounded executable coverage of every printed D2 Personal Bonus row with transformation familiarity, form-stat substitution, full-round Shapechange concentration, object size/weight limits, carried-object inertia state, and common movement/inventory hooks. v0.4.10 begins A1 Direct Physical Attacks with fixed 7/14/21-hp Cause Wounds powers, exactly five artifact Magic Missiles, creature-target Create Poison, and Fire/Ice/Acid Breath using the printed PP values and bounded 3D geometry. v0.4.11 adds Bearhug, Cause Disease, Dispel Evil, Cloudkill, Ice Storm, Death Spell, Finger of Death, and Poison Gas Breath, plus persistent-effect identity hardening for nested artifact checks. v0.4.12 completes all 25 printed A1 rows with Fire Ball, Lightning Bolt, Delayed Blast Fire Ball, Life Drain, Explosive Cloud, Disintegrate, Power Word Kill, Obliterate, and Meteor Swarm, while explicitly bounding object/empty-point/environmental integration. v0.4.13 begins A2 Direct Mental Attacks with Cause Fear, Sleep, Charm Person, Charm Monster, Calm Others, and Feeblemind, including live fear retreat, the fixed artifact Sleep budget/duration, category-aware charm targeting, no-save reaction calming, and Feeblemind helplessness/Cureall linkage. v0.4.14 adds Confusion, Control Animals, and Control Lesser Undead with their printed A2 recipient, HD, duration, save, and release constraints. v0.4.15 adds Control Plants, Charm Plant, and Geas Another with represented plant-control/charm persistence, the explicit Table 2 three-month Charm Plant duration, and referee-bounded Geas semantics. v0.4.16 completes all 18 printed A2 rows with Mass Charm, Open Mind, Control Giants, Control Greater Undead, Control Dragons, and Control Humans, including typed control ceilings, persistent release state, and the dragon spellcasting prohibition. v0.4.17 begins A4 with Blight, the four printed Turn Undead powers, and Dispel Magic. v0.4.18 adds Darkness, Light, Continual Darkness, Silence 15' Radius, and Babble with live area/status integration. v0.4.19 adds the three printed Set Normal Trap percentages, the three printed Pick Pockets percentages, and Disarm Attack by routing them through persistent physical-state, ordinary Pick Pockets, and Companion Disarm machinery; A4 is now 18/24 at bounded executable coverage. v0.4.20 closes A4 at 24/24. v0.4.21 reconciles the source-internal A3/A5 heading inconsistency using the Known Artifact labels, completes all 29 Bonuses-to-Attacks rows as A5, and begins B1 at 7/19. v0.4.22 then completes the actual A3 Attacks-that-Stop-or-Slow table at 12/12 with live Web/Hold/Slow/Turn Wood/petrification/power-word/Dance/Life-Trapping/Maze state. v0.4.23 completes B1 Aids to Normal Senses at 19/19 with bounded represented-world sensing, communication, timekeeping, tracking, lie-detection, corpse-question, and X-Ray procedures. v0.4.24 completes B2 Additional Senses at 24/24; v0.4.25-v0.4.26 complete B3 Aids to Movement at 26/26; and v0.4.27 completes B4 Aids to offset Encumbrance at 15/15 by routing the printed Container, Floating Disc, and Buoyancy capacities into the common carried-load/encumbrance layer. Artifacts remain referee-authored and are not random treasure. v0.4.28-v0.4.33 complete the remaining C1/C2/C3/D4/D5 Table 2 categories; v0.4.34-v0.4.35 complete all Table 3A/3B/3C adverse-effect rows at bounded registry level; and v0.4.36 adds the bounded rudimentary-intelligence/self-defense lifecycle, including the 10% automatic-defense threshold, no-self-damage selection rule, charge expenditure, and random A1 <=35 PP fallback when no attack powers remain. Still open: bounded D1 area/non-PC edge cases; D2 cross-system integration edges rather than missing registry rows (universal Shapechange extraordinary powers/immunities, general object combat/physics and every transfer route, >6-missile batch choice, Elasticity inventory routing, and Protection from Evil/Anti-Magic Shell passage); D3 cross-system edges (especially Statue reactive initiative/petrification and universal 4th/5th-level Immunity scaling, plus object/size/detection and unusual-producer routing); A1 integration edges (objects, arbitrary empty points, delayed-gem carriage, unusual resistance/Anti-Magic routing); A2 cross-system charm/control integration; complete Known Artifact records; Immortal-creator campaign responses; and full Anti-Magic/artifact routing for every temporary/permanent interaction. |
| Anti-magic and high-level magical procedures | PARTIAL / IMPLEMENTED CORE | v0.3.93–0.3.95 implement percentage Anti-Magic zones, attack-form vs. radiated behavior, spell-casting cancellation checks, tracked-effect suppression/recovery, equipped permanent-weapon magic-bonus suppression in attack-form A-M, spherical and finite-ray 3D field tests, horizontal beholder-style ray orientation, ordinary Dispel Magic's 20' cube and caster-level procedure, ring-stored Dispel effective levels 5/8 and Staff of Dispelling level 15 at the common resolver, and the optional Touch Dispel lifecycle. v0.3.98 adds Fire Ball boundary clipping and live Staff of Dispelling activation. v0.3.99 adds Lightning Bolt line-entry destruction at successful A-M boundaries and live Ring of Spell Storing casting/replacement using lowest required caster levels. Still open: complete cone/irregular A-M geometry, generalized clipping for remaining unusual area shapes, universal routing of every permanent item and bespoke spell state through the common magic layer, and artifact interaction. |
| Paths and quests to Immortality | OUT OF SCOPE | The project ends at mortal Master-level BECM play by explicit direction; Immortal-set procedures are not a completion gate. |
| High-level campaign procedures | PARTIAL | Dominions and strategic combat exist; planar rules and the artifact lifecycle core are substantial but incomplete, and all mortal class endgames are not yet complete. |

> **Artifact status update (v0.4.35):** The historical implementation summary in the Artifacts row above is superseded where it describes missing Table 2 or adverse-effect registry mechanics. Table 2 is complete; Table 3A is **6/6**, Table 3B is **11/11**, and Table 3C is **28/28** at bounded-registry level. Autonomous artifact behavior/self-defense, published Known Artifact records, and the named cross-system integration edges remain open.

## Build 0.3.80 option and combat command surface

Campaign options can be changed from the Options panel or by command:

```text
fighter options on / off
unarmed combat on / off
weapon mastery on / off
general skills on / off
war machine on / off
war tactics on / off
siege machine on / off
touch dispel on / off
```

Examples:

```text
set Aldric fighter status knight
Aldric smash at ogre 1
Aldric parry
Aldric disarm bandit 1
Aldric mounts War Horse
Aldric lance charge at ogre 1
Locke strike goblin 1
Locke haymaker goblin 1
Locke wrestle goblin 1
Locke pin and damage goblin 1
Aldric, Locke, and Corwin wrestle together against ogre 1
Aldric, Locke, and Corwin pin and damage together against ogre 1
aquatic status
dev combat environment underwater
dev underwater acclimate Aldric: months=4
dev underwater crossbow Corwin on
train Aldric in sword to basic with skilled trainer
```

## Master Anti-Magic / Dispel command surface

Examples:

```text
touch dispel on
prepare Mara: Touch Dispel
Mara casts touch dispel
Mara casts touch dispel on Sword +2
Mara touches Wand of Testing
Mara touch dispel choice drain charges
Mara touch dispel choice make nonmagical
Mara touches Potion Alpha and Potion Beta simultaneously

dev anti-magic status
dev anti-magic add ImmortalAura radiated 35 30 around Immortal
dev anti-magic ray BeholderRay 100 60 10 from Beholder toward Aldric horizontal
dev anti-magic clear
```

`Touch Dispel` is intentionally optional and OFF by default. In combat, direct casting/release is queued through the spell phase rather than resolving outside the initiative sequence. A successful touch against a charged wand/staff or charged miscellaneous item releases the spell immediately, then stores the unresolved source-required DM outcome until `drain charges` or `make nonmagical` is chosen; the engine does not silently invent that choice. Represented nested nonmagical containers double effective magic level per layer, transmission is capped at 5 feet, and when a single touch could affect several magical items the eligible recipient is selected randomly.

## Strategic command surface

Examples (Developer Mode):

```text
dev war create Talamau Guard: troops=120, leader_level=8, int=13, wis=12, cha=15, officers=3, officer_level=3, troop_level=2, training_weeks=8, leader_training_weeks=8, months_together=6, weapon_quality=good, average_ac=5, missile_percent=25, missile_range=120
dev war rate Talamau Guard
war tactics on
dev war battle Talamau Guard vs Pirate Host: tactic_a=hold, tactic_b=attack_forceful, mercy=true
dev war march Talamau Guard: days=2, forage=two_thirds, terrain_modifier=1, forced=true
dev war maneuver Talamau Guard vs Pirate Host
dev war pcs Talamau Guard: commander=Aldric, members=Aldric|Nemiriel, hero=Aldric, heroic_result=success, heroic_role=leader, heroic_visible_percent=10, heroic_failure_chance=50, staff=Nemiriel, rod=Aldric

dev siege create Pillar Siege: attacker=Pirate Host, defender=Talamau Guard
dev siege fort Pillar Siege: wall_castle=4, gatehouse=1, tower_bastion=2
dev siege equip Pillar Siege attacker: trebuchet=2, catapult_light=4, ram=1, belfry=1
dev siege equip Pillar Siege defender: ballista=4, catapult_light=1
dev siege supply Pillar Siege attacker: cash=5000, iron=1000
dev siege construct Pillar Siege attacker: type=catapult_light, count=1, workers=20, wood_distance=5
dev siege frontage Pillar Siege: feet=200, section_br=40, nearby_tower_br=12, remaining_br=80
dev siege squad create Pillar Siege defender Night Sortie: purpose=destroy trebuchets, members=Aldric|Nemiriel
dev siege squad apply Pillar Siege Night Sortie: success=true, information=good, equipment=trebuchet, count=1
dev siege demolish ammo Pillar Siege: count=1
dev siege salvage wood Pillar Siege attacker: wall_feet=10, stone_buildings=1
dev siege make ballista ammo Pillar Siege defender: units=2
dev siege week Pillar Siege: attacker=assault, defender=harass, attacker_rest=false, defender_rest=false
dev siege status Pillar Siege
dev siege close Pillar Siege
```

## Completion gate

The engine should not be labeled **full Mentzer BECM** until every OPEN mechanical domain is implemented, and every PARTIAL domain has either completed its deterministic branches or clearly isolated the referee judgment that the printed rule itself requires. Current next-priority sequence:

1. Finish the remaining Master Anti-Magic / Dispel edge procedures: cone/irregular geometry where required; universal permanent-item and bespoke-spell-effect routing; generalized clipping for remaining unusual area shapes; and explicit artifact interactions. Fire Ball boundary clipping and live Staff of Dispelling are implemented in v0.3.98; Lightning Bolt clipping and live Ring of Spell Storing are implemented in v0.3.99.
2. Finish the remaining Master Weapon Mastery edge procedures: poison acquisition/application logistics, physical ownership/recovery/repair for binding weapons, magical shield/net/bola edge cases, referee/AI surrender selection where a failed Despair result should surrender rather than flee, and any remaining special-effect interactions exposed by source-by-source audit.
3. Convert the remaining deterministic Companion/Master spell entries from data/referee placeholders into specific procedures, including cross-spell interactions where the source is explicit.
4. Continue Master artifact implementation from the v0.4.35 state: Table 2 and all Table 3 sections are complete at bounded-registry level (**3A 6/6, 3B 11/11, 3C 28/28**). Next implement autonomous artifact defense/power selection, then encode the published Known Artifacts and close the named cross-system edges (universal Dispel/Anti-Magic discovery, charm/control break and resave routing, transformation extraordinary powers, generalized object/terrain physics, unusual immunity producers). Preserve referee authorship wherever Mentzer requires a unique activation, purpose, manifestation, adverse-effect selection, or destruction method.
5. Continue the planar implementation beyond the existing Inner/Astral/Gate core: full Astral orientation/navigation, protection-aware elemental transformation, planar encounters, complete Outer-Plane local-law handling, and remaining plane-specific spell alterations.
6. Finish remaining mortal class endgame branches. Immortal-set play is excluded.
7. Continue converting exceptional monster text into dedicated handlers until the 607-profile roster is not merely spawnable but mechanically complete for all published deterministic powers.
8. Connect lair treasure and the complete catalogue to regional/terrain/climate/rarity encounter deployment across the Known World.

The 3D positional layer, contextual weapon matrix, and phase-based initiative are preserved extensions and are **not** completion blockers for BECM RAW so long as RAW modes and the underlying Mentzer procedures remain available and mechanically intact.

Only after those gates pass should world/content expansion be treated as building on a complete engine rather than developing alongside it.

## v0.3.80 validation checkpoint

17 focused assertions pass, including actual equipped-weapon damage and missile-range calls, RAW/Matrix separation, aliases, opponent bonuses, and toggle-off behavior. All 36 damage profiles pass structural checks; the full inline JavaScript compiles. This is a partial Weapon Mastery checkpoint, not full BECM compliance. The 607-creature roster was not modified. Source: Rules Cyclopedia printed pp. 78–81; reconciliation with all Master-set discrepancies remains open.

## v0.3.81 — Weapon Mastery defenses

Implemented 23 non-shield defense profiles and 10 deflection profiles from Rules Cyclopedia printed pp. 78–80. Incoming ordinary monster melee attacks consume eligible party defense allowances; hits may be deflected by a death-ray save, and successful deflection prevents damage and attached attack effects. Defense and deflection budgets are independent, limited per round, reset with a new combat, and inactive when Weapon Mastery is off. A failed deflection consumes an attempt. Ordinary launched missiles are not deflectable.

Validation: 25 focused assertions pass for category eligibility, attempt limits, failure consumption, round/combat resets, and disabled behavior. The preceding 17 mastery damage/range assertions also pass. Inline JavaScript compiles. Browser gameplay has not been exercised in this checkpoint.

Remaining Weapon Mastery work includes shield defenses and secondary attacks, enemy mastery, missile-path defense integration, mixed H/M opponents, special effects and despair, polearm variants, rare throwing, two-handed bastard-sword selection, and training lifecycle/eligibility. No claim of complete Basic–Master compliance is made by this checkpoint. Broader outstanding rules remain listed above.

## v0.3.82 — Training lifecycle and deflection declaration

Mentzer Master Player printed pp. 15–16 govern the training midpoint, refund, different-trainer retry, and advance declaration; RC printed pp. 75–76 clarify post-cap demihuman eligibility. Demihuman training allowances now count levels 4/8 (and dwarf 12) and 200,000-XP increments after the class cap. Basic proficiency does not consume these demihuman improvements. Human post-36 choices now read the actual XP table.

Failed courses pause halfway with a persistent pending record. `training continue NAME` completes the failed course; `training stop NAME` refunds half the fee. A completed failed course permits a +10% retry with a different explicitly named trainer. Example: `train Dorin with dagger to skilled under skilled trainer named Orin`. Unnamed trainers receive no inferred different-trainer bonus. Insufficient funds do not commit a choice. Class restrictions, first-level limits, and active combat prevent invalid training. Exceptional refusal of refunds by chaotic trainers remains referee work.

Correction to v0.3.81: deflection is no longer automatic. `deflect on NAME` declares it for subsequent attacks in the current combat; `deflect off NAME` cancels it. Declarations are stored with that combat. AC defense bonuses remain automatic. This implements the Master requirement to declare deflection before the blow.

Validation: 18 training assertions, 26 defense/declaration assertions, and 17 damage/range assertions pass (61 total). Inline JavaScript compiles. Full engine compliance remains open, including the mastery special effects, shields, spells, planar systems, and other gaps above. Training scheduling during other party activity, exceptional trainer behavior, and full initial-choice allocation still require work.

## v0.3.83 — Initial mastery allocation

`mastery choose NAME: weapon, weapon` allocates first-level human Basic proficiencies without training fees or elapsed time. Selections are validated atomically, may be made incrementally, preserve unused choices, and cannot replace existing choices. The existing campaign convention is four Fighter choices and two for other humans (RC support; the Master Fighter expansion is optional). Silver daggers use ordinary dagger proficiency and cannot consume a duplicate initial choice. Demihuman implicit Basic proficiency now checks class weapon legality.

Example: `mastery choose Aldric: normal sword, dagger, short bow, spear`. A strict dagger-only Magic-User may select only the dagger and retain the unused choice. No expanded Magic-User weapon permission is silently enabled.

Validation: 14 new allocation assertions plus the previous 61 focused assertions pass; full inline JavaScript compiles. No browser gameplay test was run. Still open: full mastery special effects, shield attacks/defenses, enemy mastery, advanced use-mode/alias handling during training, and the other Basic–Master audit gaps. This build does not complete the rules engine.

## v0.3.84 — Proficiency aliases and record persistence

Ordinary/silver dagger training now shares one proficiency ID; the legacy `sword` ID maps to `sword_normal`. Existing rank and commitment records merge using the higher rank. Pending courses and history retain their details under the same canonical ID, preventing separate choice charges and lost retry eligibility when equipment aliases change. Initial allocation uses the same mapping. Physical equipment identity and material remain separate from learned proficiency.

Validation: 11 new assertions check conflict merging, choice counts, pending-course data, retry history, JSON serialization and restoration, and toggle preservation. The previous 75 focused assertions also pass (86 total); inline JavaScript compiles. This verifies record serialization, not an end-to-end browser save/load session. The mastery special effects, shields, advanced use modes, enemy mastery, and broader Basic–Master completion gates remain open.

## v0.3.85 — Dagger mastery double damage

Implemented Skilled/Expert/Master/Grand Master natural-roll thresholds 20/19/18/17 from Mentzer Master Player dagger table and printed p. 22, supported by RC pp. 79–80. The ordinary attack must hit. Ordinary and silver daggers share this effect. Party melee and thrown dagger attacks apply it; other weapons and mastery-off campaigns do not. The implementation doubles the stored weapon roll before adding damage modifiers, preserving the true roll even when a negative modifier had reduced damage to zero. RAW and Matrix results both carry their own base rolls.

The current engine applies backstab after mastery doubling, so simultaneous effects compound. Treat that stacking order as an engine interpretation awaiting source reconciliation, not a verified boxed-set rule. Enemy mastery and analogous polearm effects remain open.

Validation: 17 new focused assertions pass for rank boundaries, misses, materials, wrong weapons, modifiers, zero damage, and disabling. Previous mastery suites pass (103 focused assertions total); JavaScript compiles. No full browser combat test was performed. The other mastery special effects and broader Basic–Master completion gates remain unfinished.


## v0.3.86 — Monster saving throws and instance integration

Replaced the generic monster spell-save approximation with the existing class saving-throw bands. Explicit Fighter, Cleric, Magic-User, Thief, Dwarf, Elf and Halfling levels and Normal Man saves are recognized. Supported source formulas include half HD, full HD and twice HD; class-dependent forms require an actual generated class and level. Expert's monster Save As explanation and the Rules Cyclopedia Normal Man row support these changes.

Combat resolves death/poison, wands, paralysis/petrification, breath and spells individually. Spawned monsters retain source save text, class/level and copied explicit overrides. Older instances recover source text from the catalogue using their type. Striking and individual/group wrestling use the same death-ray target lookup. Explicit per-instance overrides take precedence over class saves.

Of the 600 workbook rows, 562 have an explicit class/level or Normal Man profile; the remaining 38 include HD formulas now supported as well as source-dependent cases. Do not interpret the 38 as either all implemented or all blocked. Haunts, Special/Varies entries, the undead-dragon source conflict, and absent generated class data need further work. Legacy numeric fallback saves remain and are not certified source-correct; a missing numeric target warns and falls back to 16. This is a compatibility limitation, not a completed rule procedure.

Validation: 30 focused assertions cover class bands, HD formulas, aliases, overrides, actual saving-throw calls, spawned instances, serialization and old-instance catalogue recovery. The previous 103 mastery assertions pass (133 total), and the inline JavaScript compiles. No browser end-to-end test was performed. This build does not complete Basic–Master compliance.


## v0.3.87 — Persistent Mentzer treasure generation

Implemented all Basic DM pp. 40–41 treasure types A–V: independent presence checks, correct quantity dice, thousand-coin scaling for full lairs, per-individual carried treasure, gem values, jewelry values and magical-item allowances. The primary table was visually checked against printed p. 40. Mentzer remains authoritative: for example type B gold is 25%, type M platinum is 5d6 thousands, and carried U/V do not gain Cyclopedia gem or special-treasure additions. This build uses Basic gem valuations, not the expanded Cyclopedia valuation table.

The searchable developer registry now exposes:

- `dev treasure create cave B lair` — roll once for a full lair.
- `dev treasure create purses P carried 12` — roll separately for 12 individuals.
- `dev treasure monster nest MON-0001 lair` — use the supplied workbook ID's simple treasure code (the example ID must exist and support that scope).
- `dev treasure show cave` — review the retained result.
- `dev treasure claim cave 100` — recover nonmagical treasure at its recorded location, adding 100 cn for referee-specified gem/jewelry weight to the calculated coin weight.

Results persist in campaign state with every die roll. Creation cannot reroll an existing ID; recovery cannot grant an existing hoard twice. Location includes mode, location ID and hex coordinates. Nonmagical treasure enters the existing inventory and XP ledger as a portable bundle. Coins are retained as denominations in the bundle; they are not immediately credited to spendable treasury. Exact magical selections remain pending, are not inventory items, and award no XP. Monster-source annotations, multipliers and special instructions are rejected for adjudication rather than silently stripped. Partial-lair scaling and automatic placement in generated or module locations remain open. This is not universal treasure completion.

Validation: 47 new assertions cover all 22 types, source-specific quantities, presence thresholds, scope validation, RNG validation, duplicate IDs, location checks, recovery, serialization, source lookup and Special rejection. Previous 133 focused assertions pass (180 total); full inline JavaScript compiles. A Playwright browser save/reload/recovery test was attempted but could not launch because Chromium is absent. No browser test passed. Remaining compliance gates at the start of this audit remain open.


## v0.3.88 — 3D positional combat and unified 607-profile runtime

Implemented the Known World positional extension as a hidden three-dimensional combat layer while preserving BECMI and Arms Across Eras resolution. Combatants retain exact `(x,y,z)` point coordinates and size-derived Influence Spheres. Medium humanoids use a 2.5-foot radius / 5-foot diameter. Friendly spheres may overlap; hostile contact stops free movement and establishes an engagement unless a blocking terrain surface prevents interaction. Connected hostile-contact components define separate melees; contacts can merge melees and separation can split them. Exact coordinates remain active during melee, while each melee carries one shared Arms Across Eras **Close / Normal / Far** measure.

True 3D separation now supports elevation, balconies, pits, flying, swimming, and ranged distance without a separate aerial coordinate system. The player-facing combat map remains deliberately approximate but identifies combatants, persistent formations, melee relationships, and elevation while developer state retains exact geometry.

The 600-entry authoritative monster catalogue was normalized into the runtime and layered with seven Smoking Pillar extensions for exactly 607 profiles. Catalogue profiles now include spatial size/Influence information and preserve source provenance. Spawnability does not imply that every extraordinary published monster power has a dedicated handler.

Regression work also corrected integration errors exposed by the spatial layer, including formation/movement assumptions and legacy encounter compatibility.

## v0.3.89 — Companion/Master weapon effects and mastery integration

Continued the Master Weapon Mastery and Companion special-weapon implementation without changing the default-off status of Weapon Mastery or replacing the contextual matrix.

Implemented or extended:

- Companion blackjack, blowgun, bola, net, and whip result-table handling independent of the Master Weapon Mastery toggle where the Companion weapon itself supplies the special rule;
- victim HD/level saving-throw bands and size-sensitive Medium-net bonuses;
- persistent Entangle, Slow, Stun, Knockout, Paralysis, Delay, Prone, Strangle, and Skewer state machinery where currently invoked;
- movement, attack, spellcasting, AC, and saving-throw consequences for active states;
- recurring escape/recovery saves and ongoing Skewer damage;
- non-solid target restrictions for binding weapons and poison immunity for blowguns;
- bola natural-roll strangling thresholds by mastery rank;
- Mastery Stun size restriction using physical creature size rather than contextual target-size classification;
- several table-driven automatic Delay/Stun effects for bows, crossbows, throwing hammer, sling, battle axe, two-handed sword, and spear;
- trident Skewer with an effective 9-HD ceiling from the Master descriptive rule;
- mixed H/M targets choosing the result favorable to the opponent for mastery attack bonus and P/S damage;
- weapon-using monster mastery with published Intelligence caps (Basic through Master; never Grand Master), while retaining Basic as the runtime default unless advanced training is explicitly recorded;
- player-facing and developer-facing display of active mastery conditions;
- additional direct combat commands for blackjack, whip entangle, trident skewer, standing from a fallen state, and developer monster-mastery setup;
- regression coverage for the new weapon conditions and 607-profile spatial/runtime invariants.

**Known partials in this subsystem:** phase-based `Delay` currently defers the affected creature's attack rather than providing a fully generalized per-phase individual-initiative reordering; explicit rescue of bola strangling and all net/bola destruction/repair branches are incomplete; blowgun poison requires a poisoned-weapon state but a full poison acquisition/application workflow is not complete; the Despair helper currently handles the principal trigger/cap/morale path but not the complete multi-victim allocation implied by the printed limits; and several shield/polearm/sword special rows remain unwired.

**Validation:** extracted inline JavaScript passes `node --check`. The complete in-browser core regression harness passes **228 / 228**, with **0 failures** and **state isolation preserved**. This is a validated checkpoint, not a declaration of full Basic–Master compliance.

## v0.3.90 — Individualized polearms, rarely-thrown weapons, and Despair allocation

Continued the Master Weapon Mastery implementation using the Mentzer Master Players' Book as primary authority and the Rules Cyclopedia only as secondary clarification. The optional Weapon Mastery campaign switch remains off by default, and the Arms Across Eras contextual matrix remains an independent optional damage/context layer.

Implemented the optional individualized polearms from Master p. 18 as true separate proficiency identities that inherit only the statistics and special traits the source assigns: Bardiche, Bill, Gisarme, Glaive, Lochaber Axe, Partizan, Ranseur, Spetum, Spontoon, and Voulge. Parent-table damage/defense/deflection is inherited where specified; Hook, Disarm, Set vs. Charge, high-mastery Stun, dagger-like Double Damage, non-throwability, and the Voulge +2 damage adjustment are attached according to the individual weapon description rather than inferred generically. This preserves Arms Across Eras matrix entries for the actual polearm while RAW Weapon Mastery mode uses the inherited Mentzer table statistics.

Implemented direct Weapon Mastery Hook and Disarm declarations for applicable weapons. Hook substitutes for the normal attack, rolls to hit, causes minimum weapon damage, and then checks the victim's paralysis save for the fallen/prone result. Weapon Mastery Disarm substitutes for the normal attack and uses the victim's Dexterity check with the printed mastery penalties; a character who also possesses the Fighter Combat Option Disarm applies its additional +5 victim penalty. Successful mastery disarms are counted for the Despair trigger.

Implemented the unambiguous rarely-thrown Master-table rows for Battle Axe, Club/Torch, War Hammer, Mace, Normal Sword, and Short Sword at the mastery ranks where a range is printed. These attacks use Strength rather than Dexterity on the Hit roll, first check the target for surprise on 1–2 on d6, and—when the target is not surprised—allow a Saving Throw vs. Death Ray to reduce damage by half. The two-handed bastard-sword rare-throw row remains open pending exact use-mode/table reconciliation; no value was invented for it.

Expanded Despair from a single-target helper to a group allocator. Skilled/Expert/Master/Grand Master use 4/8/12/16 HD-or-level allowances, only above-animal-intelligence foes with Morale are candidates, candidates are ordered lowest HD/level first, and the allowance is consumed across those candidates. Each affected monster makes its own normal Morale check, and the ability is marked used after the first eligible trigger in a fight. The cumulative-HD allocation is the engine's reading of the printed “numbers affected” limit plus the direction to affect the lowest-level/HD enemies first. Exact phase timing of a failed foe's “next opportunity,” surrender selection, and the player-character Despair saving-throw branch remain completion items.

**Validation:** extracted inline JavaScript passes `node --check`. The complete Chromium in-browser deterministic core harness passes **232 / 232**, with **0 failures** and **state isolation preserved**. Four new regression cases cover individualized polearm inheritance/independent proficiency, Hook/Disarm/Set permissions, rarely-thrown rank/range activation, and cumulative Despair allocation/once-per-fight behavior. The 607-profile monster catalogue was not structurally changed in this checkpoint.

This remains a partial Basic–Master implementation. The next Master Weapon Mastery completion cluster is shield weapons, exact bastard-sword use modes, Ignite, binding-weapon rescue/destruction/repair, and the remaining Despair/poison timing branches.

## v0.3.91 — Shield weapons, bastard-sword modes, Ignite, and binding rescue

Continued the Master Weapon Mastery implementation from the Mentzer Master Players' Book, with Rules Cyclopedia material used only as secondary clarification where it consolidates the same procedure. Existing BECMI modes, the optional Arms Across Eras contextual matrix, phase-based two-sided initiative, 3D positional combat, and the 607-profile monster runtime remain intact.

### Shield weapons

Implemented the Master shield-weapon family as weapon/shield hybrids rather than ordinary +1 AC shields. Fighter, Thief, Dwarf, Elf, and Halfling access is supported. Horned, Knife, Sword, and Tusked shields retain separate mastery identities and source-bounded blade counts. Because the source gives ranges rather than a generation probability for variable blades, a newly tracked shield begins at the minimum guaranteed count and `shield blades NAME N` can explicitly record any legal count within the printed range.

The printed mastery defense rows are now available for shield weapons. Horned shields retain their non-breaking rule. Knife, Sword, and Tusked shields check Breaks whenever the shield user or foe rolls the exact Hit-roll number needed. The break check uses 1d10, the shield's magical bonus, the foe's weapon magical bonus, and the printed `-1 per 10 points of maximum damage possible` only when it is the foe's attack, matching the wording of the Master rule. Each successful break disables one blade rather than destroying the whole shield.

Horned, Knife, and Sword shields can make the printed Second Attack while the user attacks with another one-handed weapon and has at least Basic mastery with the shield weapon. The Tusked shield remains two-handed and cannot be paired with another weapon; when Multiple Attacks apply, its special extra attack is treated as **normal legal Multiple Attacks + 1**, not as a doubling of the attack count. Shield extra attacks are limited to ordinary melee attacks and are not added to Smash, Disarm, Hook, Skewer, or other substitute maneuvers.

Two source/engine interpretations remain explicit rather than hidden. Knife and Tusked shield defense entries do not print a `/N` attack allowance, so the engine treats the listed defense as applying to all otherwise eligible attacks. When a main weapon and a shield weapon could both provide a mastery AC benefit, the engine uses the shield weapon defense rather than stacking both benefits; no explicit stacking rule has been found in the supplied Master text.

### Bastard sword

The Bastard Sword now has explicit one-handed and two-handed combat modes. The two-handed mode selects the separate Master table data, including its defense/deflect progression and printed rarely-thrown ranges. Switching to two hands removes incompatible shield use. In **RAW weapon mode**, two-handed bastard-sword use always loses initiative as stated in Mentzer Master. In the optional **contextual Matrix mode**, the project's pre-existing convention that two-handed weapons do not suffer a blanket initiative loss is deliberately preserved; this is a Known World option, not a claim that it is Mentzer RAW.

The v0.3.90 rare-throw procedure therefore now also supports the two-handed Bastard Sword at the mastery ranks where the Master table prints a range.

### Ignite

Implemented the Master `Ignite` definition for burning oil when Weapon Mastery is enabled. An explicitly flammable target has a `5% × damage caused that round` chance to ignite. On ignition it burns for `1d6` rounds and suffers `1d4` damage per round. The engine does not infer that an arbitrary creature, object, or terrain feature is flammable when the world data does not say so; Developer/referee state can mark the target flammable. This row is therefore **IMPLEMENTED / REFEREE INPUT** for open-ended scenery.

### Bola and net continuation

Expanded binding-weapon handling. A helper may attempt to remove a bola using the victim's Death Ray save with the printed +2 bonus. A strangling-bola survivor is left effectively paralyzed for 2d6 rounds. A non-strangled victim holding an edged weapon can spend the round destroying the bola. A netted victim with a dagger receives the printed +4 escape bonus; successful escape cuts/destroys the net. The persistent combat condition is cleared correctly.

Full object-economy bookkeeping for the damaged/cut binding weapon—who owns it, whether it remains recoverable, material consumption, and all magical-net exceptions—is still **PARTIAL**. The engine does not claim those branches complete merely because the combat condition can now be resolved.

### Persistence correction

During regression work, `normalizeMember()` was corrected to preserve Fighter Combat Option status and fealty flags across normalization/save migration. This prevents a qualified high-level fighter from silently losing the status needed for Companion Fighter Combat Options after state normalization.

### Validation

The completed `index.html` passes extracted-inline-JavaScript syntax checking with `node --check`. The complete deterministic Chromium core harness reports **239 / 239 tests passing, 0 failures, state isolation preserved**. The final harness was repeated three times with the same 239/239 result. Seven new regression cases cover shield class/blade/defense state, exact-hit shield breakage, tusked-shield attack count, two-handed bastard mastery/rare-throw/RAW initiative behavior, dagger-assisted net escape, strangling-bola rescue, and explicit-flammability Ignite behavior.

This remains a **substantial but incomplete** Mentzer Basic–Master implementation. The next high-value BECM work is no longer the core shield/bastard/Ignite machinery; it is the remaining special-effect lifecycle details, high-level deterministic spell procedures, Companion planar procedures, Master artifacts/anti-magic, remaining mortal class endgames, and continued conversion of exceptional monster procedures into dedicated handlers.



## v0.3.92 — Companion Inner-Planes core

Implemented a persistent planar rules state with `prime`, `ethereal`, elemental `air/earth/fire/water`, and `wormhole` locations. Developer commands can inspect or place a test campaign into these states without falsely consuming a spell or magic item.

### Ethereal Plane

Implemented Mentzer Companion's Ethereal movement table. A 120'/round fly-equivalent movement rate becomes 240' in vacuum, 120' beside air, 90' beside fire or water, 60' beside soil or wood, 30' beside rock, and 0 beside metal or lead. The planar status records that Ethereal travelers are not affected by gravity, though they can sense Prime-plane down. This is a movement/environment rule only; it does not invent a means of entering the Ether.

### Vortexes and wormholes

The engine can persist an elemental wormhole's destination and whether travel is with or against the current. Wormholes are treated as vertical dungeon-like passages with air and flow-based apparent gravity. No universal numeric with-current/against-current multiplier is invented because Mentzer states the relative difficulty but does not provide one in the reviewed procedure. Gate/Wish creation and permanent-vortex lifecycle remain future work.

### Elemental dominance and opposition

Implemented the Companion elemental relationship cycle: Air dominates Water, Water dominates Fire, Fire dominates Earth, and Earth dominates Air. A dominating elemental attack exposes a double-damage result with a save-to-normal flag; the dominated creature's return relation exposes minimum normal damage. Air/Fire and Earth/Water are marked as opposed, with the normal -4 reaction adjustment and support for the -8 total good/evil opposition case. This helper is now available to later combat/spell handlers; universal automatic classification of every creature and spell by element remains incomplete.

### Elemental survival

Added explicit per-character planar-protection records and deterministic survival evaluation for the four elemental planes. The engine does not assume a character possesses `create air`, `resist fire`, `water breathing`, `survival`, a force field, an elemental-adaptation ring, or a talisman merely because the procedure mentions it; the protection must be explicitly recorded. Plane of Air is treated as ordinarily breathable while retaining referee responsibility for localized poisonous/corrosive gas. Earth, Fire, and Water evaluate appropriate explicit protections; a force field is recognized as protective but immobile. Automatic connection to every live spell duration and every magic-item inventory record remains open.

### Developer command surface

Added:

```text
dev plane status
dev plane enter prime|ethereal|air|earth|fire|water
dev plane ethereal material vacuum|air|fire/water|soil/wood|rock|metal|lead
dev plane wormhole air|earth|fire|water with|against
dev plane protect <name> on|off <protection>
dev plane survival <name> [air|earth|fire|water]
```

These are referee/testing controls, not player powers. They deliberately do not bypass spell, item, travel, or campaign requirements during ordinary play.

### Validation

The extracted v0.3.92 inline JavaScript passes `node --check`. Three new core-harness definitions validate the Ethereal movement table, elemental dominance/opposition, and persistent wormhole plus Fire-plane protection logic. A complete fresh Chromium harness execution was attempted through both `--dump-dom` and the Chrome DevTools Protocol, but the headless browser stalled on the very large self-contained build before returning the suite result. Therefore the audit preserves the last completed browser result (**239/239 at v0.3.91**) and does not claim a new full-suite pass for v0.3.92.

This remains a **partial** planar implementation. The next planar work should connect Gate/Wish and active spell/item state to actual plane transitions, implement wormhole-arrival elemental transformation/protection, apply the documented Inner-Plane spell modifications, and only then advance into Master Astral/Outer-Plane procedures.

## v0.3.93 — Master Anti-Magic and ordinary Dispel Magic core

Implemented a common Master-level magic-interaction layer without replacing the ordinary Expert/BECMI spell chassis.

### Anti-Magic zones

Combat state can now contain explicit Anti-Magic zones with a source combatant, radius, percentage, and kind (`attack` or `radiated`). The engine checks spell use against applicable fields and treats 100% Anti-Magic as automatic cancellation while percentage fields use d100. Represented active spell effects retain caster level and can be marked suppressed rather than being incorrectly deleted when the Master rule says the magic may return.

Attack-form Anti-Magic and radiated Anti-Magic are kept distinct. Attack-form fields can suppress permanent magic while it remains inside the field; the live equipped-weapon magical bonus is currently routed through this check. Radiated Anti-Magic affects temporary magic and represented temporary effects retain the one-turn post-exit suppression period. Spell duration continues to elapse during suppression. Instantaneous magic that is canceled is lost rather than resuming later.

The geometry implemented at this checkpoint is a reusable **sphere** around the source. This supports many zones but is not a claim that every published ray/cone/irregular Anti-Magic shape has been modeled. Exact beholder-eye orientation/cone handling and universal permanent-item suppression remain open.

### Ordinary Dispel Magic

The common Dispel resolver uses the ordinary 120-foot-range / 20-foot-cube procedure. Each represented active spell effect in the cube is considered independently. Effects from an equal- or lower-level caster are removed automatically; effects from a higher-level caster use the published 5% failure chance per level of difference.

This procedure intentionally does not dispel the underlying magic of an item. The Rules Cyclopedia clarification that ordinary Dispel can remove an effect **produced by** an item without destroying the item remains compatible with this architecture, but all item-produced effects must still be normalized into the common active-effect registry before that behavior is universal.

Developer controls added:

```text
dev anti-magic status
dev anti-magic add <id> <attack|radiated> <percent> <radius-ft> around <combatant>
dev anti-magic clear
```

These are diagnostic/referee controls and do not grant a player an Anti-Magic ability.

### v0.3.93 limitations

The system does not yet claim complete Master magic interaction. Bespoke legacy spell flags not represented in `activeSpellEffects`, exact non-spherical field geometry, full permanent-item routing, and clipping of expanding area effects at an Anti-Magic boundary remain open.


## v0.3.94 — Optional Touch Dispel lifecycle and magic-item effects

Implemented the Master optional concentrated form of Dispel Magic, **Touch Dispel**, while leaving the campaign option OFF by default.

### Preparation and casting

A Magic-User can prepare the special `Touch Dispel` form when the option is enabled and ordinary Dispel Magic is known; it consumes the corresponding third-level Magic-User preparation. A Cleric uses the reversible form of the prepared fourth-level Dispel Magic rather than needing a second pseudo-spell entry. Spell-state normalization was corrected so an explicitly prepared special form is not overwritten by the older single-`memorizedSpell` compatibility field.

Casting Touch Dispel without an item target creates a persistent held fingertip effect. It lasts up to one turn if not released. The held effect cannot be voluntarily suppressed. If the caster attempts another spell before releasing it, the held Touch Dispel and the newly attempted spell are both negated, and the appropriate prepared spell is expended. If the held effect is itself dispelled or expires, the linked caster state is cleared.

During combat, Touch Dispel casting/release is resolved through the spell phase rather than bypassing the current two-sided phased initiative system.

### Item effective levels and results

The item resolver now supports represented inventory records using the Master categories:

- **Potion:** effective magic level 6; a successful touch destroys the magic while leaving a nonmagical liquid record.
- **Scroll:** effective level is the minimum caster level required for its highest spell; success destroys all spell magic while leaving the physical scroll/parchment record.
- **Wand or staff:** effective level 12; on success the DM must explicitly choose either to drain charges equal to the caster's level or to make the item permanently nonmagical.
- **Miscellaneous magic:** effective level 36 unless a creator level is recorded; charged items use the wand/staff branch, while uncharged items use permanent-item treatment.
- **Permanent rod, ring, armor, shield, or weapon:** effective level 18 plus one level per magical plus and per additional power; success deactivates the item for 1d10 rounds rather than destroying it.

The same 5% failure chance per level of difference is applied when the target item's effective magic level exceeds the caster level. Deactivation is mirrored into represented equipped weapon/armor/shield records so the runtime can observe the temporary loss of magic. Artifacts are explicitly rejected by the ordinary Touch Dispel path and remain governed by the unfinished artifact subsystem.

For charged items, no automatic choice is invented. If the user has not supplied `drain charges` or `make nonmagical`, the engine reports the required DM decision and keeps the held spell unreleased.

### Touch accessibility

In combat, the target item must be carried by the caster or by another party combatant within physical touch reach under the 3D Influence Sphere/spatial-barrier rules. Expedition stores, mounts, and vessel cargo are not treated as touch-accessible during combat merely because they exist in campaign inventory. Outside combat, ordinary carried/logistics inventory can be selected.

### Remaining Touch Dispel branches

The following source-defined cases remain open and are not hidden behind assumptions:

- each intervening nonmagical container doubling the effective magic level;
- the maximum 5-foot transmission through multiple containers;
- choosing randomly when one touch simultaneously contacts multiple magical items;
- full live casting-level exceptions for ring of spell storing and staff of dispelling;
- universal propagation of temporary deactivation into every bespoke magic-item power;
- artifact-specific interaction.

### v0.3.94 validation

The integrated `index.html` passes extracted-inline-JavaScript syntax checking with `node --check`.

The complete deterministic Chromium core harness was then executed against the actual self-contained v0.3.94 document through Playwright `page.set_content(...)` and `window.KnownWorldTestHarness.runCore({display:false})`. Result:

```text
Build: 0.3.94
Tests: 249 / 249 passed
Failures: 0
State isolation: preserved
```

Four new v0.3.94 regression cases verify the special Magic-User preparation and Cleric reversal rules, potion destruction vs. permanent-weapon temporary deactivation, the explicit charged-item DM choice with held-spell preservation, and mutual negation when another spell is attempted while Touch Dispel is held. The preceding Anti-Magic/ordinary-Dispel regressions and all earlier core tests pass in the same integrated run.

The project therefore has a tested **Master Anti-Magic / Dispel core**, but the audit remains **PARTIAL / IMPLEMENTED CORE** until the remaining geometry, container, universal effect-routing, item-casting, and area-boundary branches above are closed.

## v0.3.95 — Anti-Magic ray geometry and Touch Dispel container completion

This checkpoint continues the Master Dungeon Master's Anti-Magic and Dispel Magic procedures without changing the surrounding BECMI combat chassis or the project's optional contextual matrix, phased side initiative, or 3D Influence Sphere combat layer.

### Finite 3D Anti-Magic rays

Anti-Magic zones now support both the existing spherical test areas and a finite **ray** shape. A ray stores an origin/source, direction or target, length, width, percentage, and an optional horizontal-only axis. The geometric test uses the combat engine's actual `(x,y,z)` coordinates: a point must fall within the finite length and within half the listed width of the ray axis. This gives the engine a reusable 3D representation for a 60-foot by 10-foot Anti-Magic ray and allows a beholder-style source to prohibit upward/downward aiming without reverting combat to 2D.

Developer command added:

```text
dev anti-magic ray <id> <percent> <length-ft> <width-ft> from <combatant> toward <combatant> [horizontal]
```

This is a diagnostic constructor. Automatic beholder facing, eye-selection AI, and full monster-specific ray lifecycle remain part of monster-handler work rather than being inferred from the existence of the generic geometry.

### Touch Dispel through containers

Represented magical inventory records may now carry an ordered `touchDispelContainers` chain. For Touch Dispel, each intervening **nonmagical** container doubles the enclosed item's effective magic level. A potion without explicit container data receives the ordinary implicit vial layer for this purpose. Container transmission distance is tracked and the effect cannot reach enclosed magic through more than 5 feet of represented nested containers.

If a touched container is itself magical, that magical container becomes the recipient and its contents are not affected. If a nonmagical container holds more than one eligible magical item, the engine randomly selects one. The same one-item random-selection rule is available when a declaration explicitly states that two or more directly named magical items are touched simultaneously/at the same instant.

These procedures depend on represented container metadata; the engine does not invent arbitrary nested packing arrangements that are absent from campaign state.

### Charged-item choice timing corrected

A successful Touch Dispel against a charged wand/staff or charged miscellaneous item now **releases the held spell immediately**. If the DM has not yet selected the published outcome, the engine stores a persistent pending decision tied to the selected item. The subsequent choice either drains charges equal to the Touch Dispel caster's level or makes the item nonmagical. This replaces the v0.3.94 checkpoint behavior that kept the successful spell held while awaiting the DM choice.

### Dispel Magic item-source caster levels

The common Dispel Magic resolver now accepts an explicit magic source and applies the Master exceptions before comparing caster levels:

```text
Ring of Spell Storing, Magic-User Dispel: effective caster level 5
Ring of Spell Storing, Cleric Dispel:     effective caster level 8
Staff of Dispelling:                      effective caster level 15
```

The ordinary caster's own level remains the default. Full player-facing activation, charge expenditure, and inventory command handling for every ring/staff source remains separate work; this checkpoint completes the common resolution rule so those item handlers do not need to duplicate or guess it later.

### Validation

The extracted inline JavaScript passes `node --check`. The complete deterministic Chromium core regression suite was executed against the finished v0.3.95 `index.html` through Playwright and the live `KnownWorldTestHarness`:

```text
Build: 0.3.95
Tests: 256 / 256 passed
Failures: 0
State isolation: preserved
```

New regressions cover finite ray length/width and horizontal aiming, the 5/8/15 Dispel source levels, charged-item pending-choice timing, nested-container effective-level doubling, the 5-foot transmission limit, random selection among multiple magical items in one nonmagical container, simultaneous direct-item selection, and magical-container interception.

The Master Anti-Magic / Dispel subsystem remains **PARTIAL / IMPLEMENTED CORE** because exact area-effect clipping, universal magic-state/item routing, remaining cone/irregular field shapes, full live item activation, and artifact-specific interactions are not yet complete.

## v0.3.96 — Master Despair timing, PC victims, and deflection trigger

This checkpoint completes the principal executable branches of the Master Weapon Mastery **Despair Effect** while preserving the project's optional Weapon Mastery switch, two-sided phased initiative, contextual weapon matrix, and 3D positional movement.

### Next-opportunity timing for monster/NPC victims

A failed special Despair Morale check no longer sets a monster to `fled` immediately. The failure is stored as a pending Despair response. At that creature's **next movement opportunity**, it breaks engagement and flees. Until that movement opportunity is reached, the engine retains the creature on the battlefield rather than retroactively removing it from earlier phases. In the current deterministic branch, failed monster/NPC victims flee; Mentzer permits either flee or surrender but does not provide a random selector, so surrender remains a referee/AI judgment rather than an invented die roll.

### Player-character Despair

Weapon-using monsters with an eligible Weapon Mastery rank can now turn Despair against player characters. PC victims use their **character level** for the Skilled/Expert/Master/Grand Master 4/8/12/16 allowance and make a **Saving Throw vs. Death Ray** instead of a Morale check. A successful save leaves the PC impressed but functional. A failed save creates a persistent **1d6-round flee-in-awe** state.

The forced retreat is resolved in the existing movement phase. The affected PC moves away from the immediate threat using the established 3D positional movement state, leaves engagements, and cannot attack, cast, or use another combat action during the affected retreat round. This integrates the printed fear result with the project's phase initiative without adding individual initiative or a separate fear subgame.

### All-blows-deflected trigger

The defense budget now tracks eligible incoming blows and successful declared Deflect attempts separately. At the end of the round, if a weapon master successfully deflected **every eligible blow** and took no damage that round, the source-defined Despair trigger can fire. A failed or unavailable deflection prevents this trigger. This is separate from the existing maximum-damage and two-disarm triggers.

### Monster maximum-damage trigger

Weapon attacks made by weapon-using monsters now retain the same compared-damage audit data used by player attacks. When the active weapon damage roll reaches its maximum and the monster has sufficient mastery, the common Despair allocator can affect eligible PCs. Monster mastery remains bounded by the already-implemented Intelligence caps.

### Validation

The final v0.3.96 `index.html` passes extracted inline JavaScript syntax checking with `node --check`.

The complete deterministic Chromium core harness was executed against the finished self-contained document through Playwright and `window.KnownWorldTestHarness.runCore({display:false})`:

```text
Build: 0.3.96
Tests: 259 / 259 passed
Failures: 0
State isolation: preserved
```

Three new regressions verify: (1) failed monster Despair does not remove the victim until its next movement opportunity; (2) weapon-using monsters can impose the Death-Ray-save/1d6-retreat PC branch and that the retreat consumes the appropriate phase behavior; and (3) avoiding all eligible blows through Deflect with no damage can trigger Despair. All previous 256 deterministic core tests continue to pass in the same integrated run.

Remaining Weapon Mastery work is now concentrated in poison acquisition/application, physical bola/net ownership and recovery/repair state, magical binding-weapon/shield interactions, and rare source-specific special-effect edges rather than the core Despair procedure.

## v0.3.97 — Gate/Close Gate lifecycle and Astral core

This checkpoint extends the planar framework using Mentzer Companion **Gate** as the primary spell procedure and the Master-era Astral rules, with the Rules Cyclopedia used only as secondary consolidation where the scans are difficult to extract reliably.

### Gate and Close Gate

A successful 9th-level Magic-User **Gate** now creates a persistent planar connection record rather than a generic spell placeholder. The record retains the caster, caster level, origin, destination, creation time, duration, open/closed status, elemental-vortex status, Gate history, and any Outer-Plane response state.

The executable duration rules are:

```text
Outer Plane Gate:       1 turn
Other Gate destination: 1d100 turns
```

For non-Outer Gates, every full turn while the Gate remains open performs the printed **10% other-planar wanderer check**. A successful check creates a persistent encounter/referee event. The engine deliberately does not invent the identity or reaction of the wanderer until an appropriate planar encounter procedure supplies it.

An Elemental Gate creates a tracked **vortex and wormhole**. Traversing it first enters the wormhole; a separate completion operation exits at the other end. Travel back through the same connection is possible while it remains open. The current implementation continues to record direction as with/against the wormhole current without inventing a numeric speed multiplier, because Mentzer only states that movement with the current is easier.

The reverse **Close Gate** closes an ordinary Gate and can destroy a permanent nearby-plane Gate such as an elemental vortex. It does not banish a creature that has already crossed the Gate.

### Bounded Wish permanence

A deliberately narrow Wish branch is implemented for the source-defined case in which a Wish makes an existing Elemental Gate's vortex and wormhole permanent. The engine does not interpret this as permission to make Astral or Outer access permanent and does not generalize Wish into an unrestricted rules engine.

### Outer-Plane Gate contact

When Gate is directed at an Outer Plane with the required named resident, the engine records:

```text
95%: the named resident answers
 5%: some other Outer-Plane being answers
arrival: 1d6 rounds
```

If the Gate was opened during combat, the round-based response point is processed by the combat-round lifecycle. The being's identity in the 5% branch and its reaction, demands, aid, departure, or hostility remain referee input because the spell text explicitly makes those consequences situational judgments.

Outer-plane local physical and magical laws are likewise not fabricated. Developer state may name an Outer Plane, but the audit continues to classify its detailed environmental law as referee-defined/partial.

### Elemental wormhole transformation

On reaching an Elemental Plane through a wormhole, the engine records the source requirement that creatures and carried things be changed into the proper element unless protected by sufficiently powerful magic. No universal saving throw or invented protection threshold is applied. The arrival instead receives a persistent `pendingElementalTransformation` referee-check record until a source-defined protection handler can determine the result from actual spells/items.

### Astral Plane core

The tracked planar-state vocabulary now includes **Astral** and named **Outer** planes. The Astral core implements the deterministic Master behavior that can safely be applied to existing engine data:

- enchanted weapon magical strength is reduced by one while on the Astral Plane; a +1 weapon is effectively nonmagical there without destroying its enchantment;
- ordinary Teleport on the Astral Plane becomes three-dimensional flight at the Fly-equivalent rate;
- Dimension Door becomes flight at half that rate;
- Fly becomes levitation;
- Levitate is useless;
- successful saving throws against represented mortal area-damage magic on the Astral Plane avoid all damage rather than merely halving it.

The engine also records the Astral movement/environment notes that ordinary walking requires a surface, flight is the usual travel method, and gravity has only minor effect near solid matter.

Not yet claimed as complete are the source's full two-dimensional spell-orientation model, the 3–6-use learning procedure for rotating effects, Astral navigation/getting-lost adjudication, the special Astral Teleport spell, Wish-based dimensional-perspective changes, all magic-item categories beyond the common enchanted-weapon bonus path, and Immortal-origin magic/save modifications across every live spell route.

### Developer/referee commands

The planar diagnostic surface now includes:

```text
dev plane status
dev plane gates
dev plane enter prime|ethereal|astral|air|earth|fire|water|outer <name>
dev plane traverse <gate-id>
dev plane complete wormhole
dev plane close <gate-id>
```

The previous Ethereal material, wormhole, protection, and survival commands remain available.

### Validation

The final v0.3.97 `index.html` passes extracted inline JavaScript syntax validation with `node --check`.

The complete deterministic Chromium core harness was run against the integrated self-contained document through Playwright and the actual `KnownWorldTestHarness`:

```text
Build: 0.3.97
Tests: 263 / 263 passed
Failures: 0
State isolation: preserved
```

Four new deterministic regressions verify: (1) Elemental Gate creation and Close Gate closure; (2) the bounded Wish permanence branch; (3) Elemental Gate traversal through a wormhole and persistent transformation requirement at exit; and (4) Astral enchanted-weapon reduction plus the Teleport/Dimension Door/Fly/Levitate movement downgrade. All previous 259 tests pass in the same integrated run.



## v0.3.98 — Fire Ball volume, Anti-Magic path/clipping, and live Staff of Dispelling

This checkpoint continues the Master Anti-Magic/Dispel audit while also correcting a foundational Expert spell-resolution limitation. Mentzer remains primary; the merged Mentzer BECM source itself supplies the Staff of Dispelling's 1d4-round permanent-item deactivation wording, while Rules Cyclopedia remains secondary support.

### Exact traveling-effect intersection with Anti-Magic

The 3D engine now has analytic segment intersection against both supported Anti-Magic field shapes:

```text
sphere
finite ray / cylindrical beam
```

The ray test respects the stored ray origin, direction, finite length, width, and horizontal-only restriction. Traveling spell effects currently routed through the path check are Magic Missile, Fire Ball, and Delayed Blast Fire Ball. A projectile that crosses a cancelling field can therefore be destroyed even when neither caster nor intended target begins inside the field.

This is deliberately narrower than a universal "all magic follows a line" assumption. Teleportation, control effects, and other magic that does not physically travel along the caster-target segment are not forced through the path test.

### Fire Ball as a true 3D volume

Fire Ball is no longer resolved against only one selected foe. The selected target supplies the current blast center and the engine then builds the printed 20-foot-radius sphere in true `(x,y,z)` world space. Damage is rolled once for the spell. Every living PC or monster inside the sphere is affected, including allies and the caster if physically inside the blast. Each affected creature resolves its own Saving Throw vs. Spells and receives the appropriate full/half result. The Companion 20-die single-spell maximum remains enforced.

Master Anti-Magic now interacts with that sphere according to the printed area-spell example. Every supported A-M zone intersecting the blast is checked once for this spell effect. A field that successfully cancels the magic acts as an invisible boundary for the expanding blast: combatants inside the cancelling field take no Fire Ball damage from the clipped volume. If the chosen explosion point itself is inside a cancelling A-M field, the instantaneous explosion does not occur at all.

The current player command surface still chooses the blast center through a selected combatant. General arbitrary empty-point targeting and generalized clipping for every unusual spell shape remain open; exact Lightning Bolt line/rebound resolution is implemented in v0.3.99.

### Live Staff of Dispelling

The Staff of Dispelling is now an executable inventory item rather than only a caster-level override understood by the common Dispel resolver.

A character carrying a represented, functioning Staff of Dispelling with at least one charge can use:

```text
Aldric uses Staff of Dispelling on Haste
Aldric uses Staff of Dispelling on Sword +2
```

Each actual use expends one charge. In combat, the declaration becomes a `magic_item` order and resolves in the normal Magic phase; it does not bypass the project's two-sided initiative sequence. A touch against another combatant's item/effect must satisfy the existing 3D Influence-Sphere contact test and cannot pass through a represented solid spatial barrier.

For represented targets:

```text
spell effect:       Dispel as a 15th-level caster
potion/scroll/etc.: temporary magic is destroyed
permanent item:     magic deactivated for 1d4 rounds
artifact:           rejected to the separate artifact subsystem
```

The implementation uses the Master description that the staff adds destruction of temporary magic and temporary deactivation of permanent magic, while the Rules Cyclopedia supplies the consolidated 1d4-round permanent-item duration. The existing Touch Dispel combat-accessibility code was also corrected to call the actual spatial-interaction barrier routine, closing a latent integration bug that earlier out-of-combat tests did not exercise.

### Validation

The final v0.3.98 `index.html` passes extracted inline JavaScript syntax validation with `node --check`.

The complete deterministic Chromium core harness was executed against the finished self-contained document through Playwright and `window.KnownWorldTestHarness.runCore({display:false})`:

```text
Build: 0.3.98
Tests: 267 / 267 passed
Failures: 0
State isolation: preserved
```

Four new regressions verify: (1) exact 3D spell-path intersection against both spherical and finite-ray Anti-Magic fields; (2) true spherical Fire Ball friendly fire plus clipping of a protected creature behind a cancelling A-M boundary; (3) Staff of Dispelling charge expenditure, level-15 spell dispelling, temporary-magic destruction, and 1d4-round permanent-item deactivation; and (4) the direct combat command queues Staff of Dispelling use into the Magic phase and resolves there. All preceding 263 deterministic tests pass in the same integrated run.

The Anti-Magic/Dispel subsystem remains **PARTIAL / IMPLEMENTED CORE** rather than "complete" because irregular/conical field geometry, generalized handling of remaining unusual area shapes, universal item/effect normalization, and artifact-specific interactions remain open. Live Ring of Spell Storing casting is implemented in v0.3.99.

## v0.3.99 — Lightning Bolt 3D line/rebound and live Ring of Spell Storing

This checkpoint closes two items that were explicit v0.3.98 completion gates while keeping Mentzer boxed-set rules primary and Rules Cyclopedia secondary.

### Lightning Bolt

The inherited Expert spell is now a true spatial effect rather than a single-target damage call. The selected hostile supplies the legal start point, which must be within 180 feet of the caster in true 3D distance. From that point the engine traces a line **60 feet long and 5 feet wide** continuing away from the caster. Damage is rolled once at 1d6 per caster level, subject to the Companion **20-die maximum**, and every PC or monster whose coordinate lies in the line resolves its own Saving Throw vs. Spells for half damage. Friendly fire therefore follows directly from the printed area.

Represented solid combat barriers now participate in the Expert rebound rule. If the bolt reaches a solid barrier before its 60-foot length is exhausted, the remaining length reverses back toward the caster; the total traced length remains 60 feet. The line may therefore strike creatures on the return path. The engine treats each creature as one victim of the spell even if geometric overlap occurs on both outgoing and returning portions, because the printed spell describes creatures within the single area of effect and does not explicitly grant repeated damage to one creature from overlapping portions.

Master Anti-Magic now clips this instantaneous line. Each intersected A-M field is checked according to its percentage when the Lightning Bolt first enters it. If that check cancels the magic, the line ends at the field boundary and does not resume beyond the A-M area. This implements the Master rule that instantaneous effects such as Fire Ball and Lightning Bolt are destroyed by Anti-Magic rather than merely suppressed.

Current targeting still uses a combatant as the start-point anchor. Arbitrary empty-space aiming and richer room-surface geometry remain open presentation/geometry work, not a missing Lightning Bolt damage procedure.

### Ring of Spell Storing

Represented Rings of Spell Storing may now carry fixed slot records containing spell name, spell class, spell level, and whether that slot is currently available. The runtime follows the Rules Cyclopedia model:

```text
- the ring's exact spells are fixed and cannot be changed;
- the wearer/user can invoke an available stored spell;
- using the spell empties only that fixed slot;
- the same spell may be restored when an appropriate spellcaster casts it directly into the ring;
- stored spell range, duration, and effect use the lowest level needed by that class to cast the spell.
```

Examples accepted by the deterministic command layer include:

```text
Aldric uses Ring of Spell Storing to cast Magic Missile at Goblin 1
Mara uses Ring of Spell Storing to cast Fire Ball at Orc 2
Mara casts Fire Ball into Ring of Spell Storing
```

Combat use is a `magic_item` order and resolves in the existing **Magic phase**. It therefore does not create a new initiative system or bypass the phase-based two-sided initiative option. Ring-stored Dispel Magic inherits the already-implemented Master effective levels naturally: Magic-User Dispel functions at level 5 and Cleric Dispel at level 8 because those are the lowest levels needed to cast the respective spell.

The implementation does not invent random contents for a ring whose treasure record has not yet been assigned its fixed spells; such a record must first acquire source-valid spell slots through treasure generation/referee setup. This preserves the Rules Cyclopedia requirement that the ring's exact spells are fixed.

### Deterministic direct casting

The local combat grammar now recognizes any currently prepared named spell rather than only the original Basic shortlist. This allows deterministic declarations such as `Mara casts Lightning Bolt at Orc 1` to enter the normal spell order path without requiring AI interpretation. Spell legality, preparation, underwater restrictions, disruption, Anti-Magic, target validation, and expenditure still resolve through the existing rules engine.

### Validation

The final v0.3.99 `index.html` passes extracted inline JavaScript syntax validation with `node --check`.

The complete Chromium core harness was executed against the integrated self-contained document through Playwright and `window.KnownWorldTestHarness.runCore({display:false})`. The final file completed three consecutive clean runs:

```text
Build: 0.3.99
Tests: 273 / 273 passed
Failures: 0
State isolation: preserved
```

Six new deterministic regressions verify: (1) Lightning Bolt's 60' × 5' 3D area with friendly fire; (2) solid-barrier rebound while preserving the total 60-foot path; (3) destruction of the instantaneous bolt where it enters successful Anti-Magic; (4) Ring of Spell Storing lowest-required-level casting and single-slot expenditure; (5) exact-spell slot replacement by direct casting into the ring; and (6) direct ring use queues and resolves in the existing Magic phase. All preceding deterministic tests pass in the same integrated build.

## v0.4.00 — Master artifact lifecycle core

This checkpoint moves **Artifacts** from OPEN to **PARTIAL / IMPLEMENTED CORE** while preserving the Master rule that artifacts are unique, campaign-directed creations rather than ordinary randomly generated treasure.

### Magnitude, Power Level, and power limits

The engine now records the four Master magnitudes and their printed general characteristics:

| Magnitude | Maximum Power Level | Maximum powers | A Attacks | B Info + Move | C Transforms | D Defenses | Recharge / turn | Handicap slots | Penalty slots | Handicap fade after relinquishment |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Minor | 100 | 8 | 2 | 1 | 2 | 3 | 5 PP | 1 | 1 | 30 days |
| Lesser | 250 | 11 | 3 | 2 | 2 | 4 | 10 PP | 2 | 3 | 60 days |
| Greater | 500 | 14 | 4 | 3 | 3 | 4 | 20 PP | 3 | 5 | 120 days |
| Major | 750 | 17 | 4 | 4 | 4 | 5 | 30 PP | 4 | 8 | 240 days |

Artifact creation is referee-facing. A record stores its unique name, Immortal creator, Sphere, purpose, activation condition, destruction method, magnitude, and chosen Power Level. Powers are then added individually with an A/B/C/D category and printed PP cost. The engine rejects a power if it would exceed the artifact's chosen Power Level, magnitude power-count maximum, or category maximum.

The Master footnotes allowing an alternate handicap/penalty count based on actual power invested remain a source-authoring option rather than an automatic replacement for the printed magnitude defaults in this checkpoint.

### Charges and use

An artifact's full charge capacity equals its Power Level. Every invoked power spends PP equal to that power's cost. If remaining charges fall below 10, no further artifact power can be used until recharge restores the artifact to at least 10 PP. Recharge runs from the campaign clock at the magnitude-specific PP-per-turn rate and does not share the artifact's physical hit-point pool.

Spell-backed artifact powers resolve through the common BECMI spell engine at **40th level**, as the Master rules specify for artifact magical effects. In combat they are ordinary `magic_item` orders and resolve in the existing Magic phase, preserving the project's two-sided phase initiative. Non-spell Table 2 powers may be defined in the record but remain explicitly referee-pending until their dedicated mechanical handler exists; the engine does not pretend that a descriptive placeholder is full automation.

The possessor must have an activated artifact and must have discovered control of the specific power before invoking it through the player command layer. This supports the Master requirement that possession alone does not reveal or grant control over every power.

### Adverse effects

The engine now has persistent artifact handicap and penalty lifecycle state. On first power use, defined handicap records are activated; if a referee has not yet selected the artifact's source-valid handicaps, the required magnitude slots are created as explicit pending referee selections rather than random invented effects. When an artifact reaches zero charges, a cumulative handicap application is likewise recorded.

For each power use, the standard penalty chance is implemented as:

```text
Penalty chance (%) = power PP cost - 10
```

A successful check creates a persistent pending penalty application. Which penalty applies remains the referee's selected artifact definition, as required by the source. When possession ends, active handicaps receive the magnitude-specific 30/60/120/240-day fade clock; taking possession again suspends that fade.

The individual mechanical effects from the complete Master handicap/penalty tables are **not yet universally automated**.

### Artifact vessel damage and destruction

Artifact vessels now have Power-Level hit points, separate from charges, and expose the Master combat metadata of **40 HD / AC −20** for attacks against the artifact. Only weapons of **+5 or greater** and other artifacts are accepted as damaging sources. A qualifying attack inflicts only the minimum possible damage represented by its damage expression.

At **40% damage**, the artifact loses its lowest-cost available power. Another power is lost for each additional 10% damage. At 80% damage the engine makes the printed 1-in-6 Immortal recall check; at 90% it makes the 2-in-6 check; and at 100% vessel damage the artifact automatically returns to its Immortal creator rather than being treated as permanently annihilated.

Permanent destruction is a separate referee-confirmed procedure. Each artifact must have one recorded unique legendary destruction method; the engine refuses permanent destruction unless that exact method is explicitly confirmed. This preserves the Master distinction between destroying the mortal vessel and permanently destroying the artifact itself.

### Command surface

Developer/referee commands added in this checkpoint include:

```text
dev artifact status
dev artifact create <id>: name=..., magnitude=minor|lesser|greater|major, power=N, creator=..., sphere=..., activation=..., destruction=...
dev artifact power <id>: id=..., name=..., type=attack|info_move|transform|defense, cost=N, spell=..., spell_class=...
dev artifact tablepowers
dev artifact tablepower <id>: <canonical Table 2 power>
dev artifact adverse <id>: kind=handicap|penalty, id=..., name=..., trigger=..., description=...
dev artifact possess <id> by <character>
dev artifact release <id> from <character>
dev artifact activate <id>
dev artifact discover <id> by <character>: <power>
dev artifact use <id> by <character>: <power> at <target>
dev artifact damage <id>: attack=2d6+3, magic=5
dev artifact destroy <id>: <exact unique destruction method>
```

Once an artifact and its known powers have been established by the referee, a player may use natural deterministic syntax such as:

```text
Aldric invokes Ivory Plume of Maat: Dispel Evil at Demon 1
```

Combat invocation queues the artifact into the normal Magic phase instead of creating a new initiative path.

### Remaining artifact completion work

The artifact subsystem is not yet complete. v0.4.12 now provides bounded executable registry coverage for **all 25 A1 Direct Physical Attacks**, the implemented A3 combat bonuses, all 19 printed D1 recovery/defense rows at a usable represented-state level, **every printed D2 Personal Bonus row**, and the complete printed D3 Personal Protections registry. A1 is therefore no longer missing table rows; its remaining work is cross-system integration: container-target Create Poison, object/wall Disintegrate, arbitrary empty-point Fire Ball/Lightning Bolt/Delayed Blast Fire Ball/Meteor Swarm targeting, carriage of the delayed-fireball gem, environmental cloud/wind flow, unusual monster poison/breath/fire/cold/acid resistances, and complete Anti-Magic clipping through all unusual area volumes.

Remaining artifact registry work is concentrated in **A2/A4/A5/B/C/D4/D5**, followed by concrete adverse-effect handlers, autonomous artifact self-defense/power selection, complete records for the published Known Artifacts, deeper Anti-Magic/Dispel routing, and Immortal-creator campaign responses where the printed rule supplies a bounded procedure. D1/D2/D3 still have named integration edges (full-area Remove Charm, arbitrary Stone to Flesh volume, non-PC resurrection, partial-corpse effects, universal Energy Drain producers; Shapechange extraordinary powers/immunities and general object physics; Statue reactive initiative/petrification, generic 4th/5th-level Immunity scaling, object-only invisibility, mixed Mass Invisibility capacity, and uncommon detection producers). Unique legend, purpose, activation, discovery clues, selected adversities, and legendary destruction quests remain referee-authored where Mentzer explicitly makes them campaign-specific.

### Validation

The finished v0.4.00 `index.html` passes extracted inline JavaScript syntax validation with `node --check`.

The complete deterministic Chromium core harness was then executed three consecutive times against the final self-contained build through Playwright and `window.KnownWorldTestHarness.runCore({display:false})`:

```text
Build: 0.4.00
Tests: 278 / 278 passed
Failures: 0
State isolation: preserved
```

Five new artifact regressions verify: magnitude recharge and the below-10-PP lockout; total/category power limits; +5 qualification, minimum artifact damage, and lowest-cost power loss at 40% damage; Greater-artifact 120-day handicap fade; and a spell-backed artifact power resolving in the existing Magic phase while spending its PP cost. All preceding 273 deterministic tests pass unchanged.

## v0.4.01 — Deterministic Master Artifact Table 2 combat powers

This checkpoint converts a first bounded portion of the Master DM artifact power table from descriptive/referee placeholders into executable engine rules without generalizing powers whose printed procedure still depends on another unimplemented spell or a referee choice.

### A3 attack bonuses

The deterministic registry now includes the printed one-turn A3 entries for Hit-roll bonuses **+2, +3, +4, +5, and +6**; weapon-damage bonuses **+2, +3, +4, and +5**; weapon-strength bonuses **+1 through +5**; **double** and **triple weapon damage**; and the one-spell damage bonuses **+1, +2, +3, and +4 per damage die**. The exact Table 2 PP cost is stored in each definition.

Weapon-strength bonuses feed the weapon's effective magical plus for both Hit and damage resolution. Weapon-damage multipliers operate on the weapon damage before ordinary additive modifiers, matching the Master explanation of double/triple weapon damage. Flat weapon-damage bonuses then add to the resulting weapon damage. These effects work through RAW damage and the optional Arms Across Eras Matrix path without replacing either system.

The one-spell artifact damage bonus is persistent until the next represented damaging spell and is then consumed. Fire Ball, Lightning Bolt, Magic Missile, and the common deterministic damaging-spell branch all apply it per damage die.

Where multiple simultaneously active artifact powers would provide the same numeric bonus type, v0.4.01 uses the **single highest active value** rather than inventing additive stacking. More exotic stacking interactions among artifacts, Weapon Mastery, backstab, lance/Set Spear multiplication, and other exceptional multipliers remain a narrow interpretation/edge-case review item rather than a claim that Mentzer supplies a universal stacking order.

### D2 personal defenses

The six-turn D2 registry now includes AC bonuses **−2, −4, −6, −8, and −10** and Saving Throw bonuses **+2, +4, and +6**. The AC bonus feeds the live descending-AC calculation. The saving-throw bonus feeds the ordinary PC save resolver while preserving the existing natural-1 failure and natural-20 success behavior.

### D3 radiated Anti-Magic

The six-turn D3 entries **Anti-Magic 10%, 20%, 30%, 40%, and 50%** now create a moving **5-foot-radius radiated Anti-Magic** zone centered on the artifact user. The zone uses the existing Master Anti-Magic engine, so represented temporary magic is checked through the same percentage procedure rather than a separate artifact-only cancellation system. When the artifact power expires, its Anti-Magic zone is deactivated.

This is intentionally radiated Anti-Magic, not the separate Table 2 Anti-Magic Ray and not the attack-form behavior of a beholder central eye.

### Persistence and duration

Artifact power records now preserve their Table 2 key, source category, deterministic mechanic, and parameters. Active effects persist in campaign state. Turn durations work both from campaign-clock time and from the combat round lifecycle (60 rounds per turn in the existing engine convention). One-spell effects persist until consumed.

Developer support adds:

```text
dev artifact tablepowers
dev artifact tablepower <artifact>: <canonical Table 2 power>
```

The first command lists the currently encoded deterministic Table 2 subset. The second adds one of those powers to an artifact while still enforcing the artifact's magnitude power count, A/B/C/D category limit, and chosen Power Level.

### Validation

The finished v0.4.01 `index.html` passes extracted inline JavaScript syntax validation with `node --check`.

The integrated Chromium core harness completed three consecutive clean runs:

```text
Build: 0.4.01
Tests: 282 / 282 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
```

Four new deterministic regressions verify: (1) exact encoded A3 costs/bonuses and one-turn expiration; (2) live D2 AC and saving-throw bonuses; (3) one-spell artifact damage-bonus consumption; and (4) a moving 5-foot D3 radiated Anti-Magic zone with six-turn expiration. All preceding 278 tests pass unchanged.

## v0.4.02 — Master Artifact D1 recovery and D2 defensive procedures

This checkpoint continues Table 2 conversion without broadening the artifact system into invented effects. The newly executable entries are limited to procedures whose result, cost, range, duration, and target can be represented deterministically by current engine state.

### D1 cures and recovery

The registry now includes these Master DM Table 2 D1 entries with their printed PP costs: **Cure Wounds** (15 PP, restores 7 hp), **Cure Blindness** (20 PP), **Cure Disease** (20 PP), **Cure Wounds, Serious** (25 PP, restores 14 hp), **Neutralize Poison** (30 PP), **Cure Wounds, Critical** (35 PP, restores 21 hp), **Stone to Flesh** (50 PP), **Remove Charm** (65 PP), and **Remove Curse** (70 PP).

The printed ranges are carried into the power definitions: touch powers use physical reach; Cure Disease uses 30 feet; Stone to Flesh and Remove Charm use 120 feet. In combat, the engine checks the current 3D positions and solid spatial barriers before spending the artifact's PP. An invalid or unreachable target therefore does not silently consume charges. Outside combat, ordinary narrative proximity remains the referee's spatial context, as elsewhere in the noncombat engine.

These cure handlers remove only conditions that exist in represented campaign state. They do not manufacture a disease, poison, curse, charm, blindness, or petrification record merely so the cure can succeed. Cure Disease also restores the prior maximum hit points when it removes the module's represented parasite infestation. Neutralize Poison cancels the represented delayed-fatal-poison timer.

The D1 entries that depend on broader procedures remain source-gated: Remove Fear's continuing save bonus, Free Person/Free Monster, Remove Geas, Raise Dead, Raise Dead Fully, Restore, Regeneration, Heal, and Automatic Healing are not claimed complete in this checkpoint.

### D2 Parry and hit-point bonuses

**Parry** is now a six-turn artifact effect. Hand-to-hand attackers suffer the printed **−4 Hit-roll penalty**. When an attack path explicitly identifies a thrown missile, that attack is also penalized; device-hurled missiles are not treated as thrown attacks. If the character also uses the ordinary Companion Fighter Parry option, the two −4 values do not add together: the same defensive penalty is applied once rather than inventing a −8 stack.

The three Table 2 hit-point powers are also executable: **+1 hp per Hit Die** for 1 turn (30 PP), **+2 hp per Hit Die** for 6 turns (60 PP), and **+3 hp per Hit Die** for 1 turn (90 PP). The engine uses the BECMI rolled-Hit-Dice progression—normally no more than 9 character Hit Dice, with halflings capped at 8—for this calculation. The granted points are a separate magical buffer. On the first damaging event, damage is subtracted from those magical hit points before ordinary hp; the hit-point bonus is then negated, so unused magical points do not survive that damage event. A later artifact hit-point bonus also replaces an earlier active buffer instead of adding the two bonuses together, preserving the project's conservative nonstacking treatment where Mentzer does not provide a general stacking order.

Artifact effect persistence serializes the granted hit-point buffer and its active/expired state, so saves/reloads do not recreate a bonus already negated by damage.

### Validation

The finished v0.4.02 `index.html` passes extracted inline JavaScript syntax validation with `node --check`.

The complete deterministic Chromium core harness was then executed three consecutive times against the integrated self-contained document through Playwright and `window.KnownWorldTestHarness.runCore({display:false})`:

```text
Build: 0.4.02
Tests: 286 / 286 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
```

Four new regressions verify: (1) the exact 21-hp Cure Wounds Critical result, Neutralize Poison state removal, and their Table 2 PP costs; (2) 3D touch accessibility is checked before charge expenditure; (3) hp-per-HD bonuses replace rather than stack, absorb damage first, and are negated by that damaging event; and (4) Parry supplies exactly −4 without double-stacking Fighter Parry and expires after its six-turn duration. All preceding 282 tests pass unchanged.

## v0.4.03 — Remaining Master Artifact D1 recovery lifecycle

This checkpoint completes the **printed D1 Table 2 registry** at a bounded represented-state level while preserving Mentzer's requirement that an artifact's actual selected powers, activation, purpose, handicaps, penalties, and destruction method remain referee-authored. The new procedures use the artifact's effective 40th-level spell resolution where the underlying effect requires a caster-level comparison and reject an invalid target before PP are spent.

### Remove Fear, Free Person/Monster, and Remove Geas

**Remove Fear** carries Table 2's three-turn duration and +6 saving-throw benefit. It clears represented fear state and exposes the +6 bonus to live PC saves whose reason is identified as fear. **Free Person** removes represented Hold Person/paralysis state from up to four selected PC victims within 120 feet; **Free Monster** does the same for represented Hold Person/Hold Monster victims, including current combat monsters, within 120 feet. **Remove Geas** compares a recorded source caster level to the artifact's effective 40th level and applies the published 5%-per-level failure rule only if the source somehow exceeds that level.

### Raise Dead and Raise Dead Fully

**Raise Dead** uses the Table 2 artifact limit of **132 days dead**, requires a represented body to be available, restores the recipient at **1 hp**, and creates a **14-full-rest-day** recovery record. During that recovery the represented PC moves at half normal encounter speed and cannot fight, cast spells, or use combat abilities; each completed full rest day reduces the recovery counter by exactly one. The rule's prohibition on carrying heavy loads is not assigned an invented threshold in this checkpoint and remains referee/bounded until the engine's load-state semantics are mapped directly to it. Partial missing-body consequences likewise remain referee input rather than being guessed.

**Raise Dead Fully** uses the artifact-level limit of **96 months (eight years)** and restores a represented PC at full hit points without the ordinary Raise Dead recovery penalty. The campaign clock currently models a month as 30 days, so the 96-month eligibility check follows that existing abstract calendar convention. The human/demihuman PC branch is automated; the different non-PC creature branch remains outside the artifact targeting abstraction.

### Restore, Regeneration, Heal, and Automatic Healing

**Restore** reverses one full level of Energy Drain when the character carries an explicit `energyDrainHistory` record; the saved pre-drain level/XP/max-hp state is restored and one history entry is consumed. This does not claim universal Energy Drain production yet. The temporary level loss specified for a cleric who personally casts Restore is not imposed on an artifact, because the artifact is producing the effect rather than acting as a mortal cleric caster.

**Regeneration** restores **3 hp each round for one turn**, in combat or through equivalent campaign-clock passage, but it ceases to restore hp after the recipient reaches 0 hp. **Heal** is implemented through the Companion Cureall procedure: one named condition is cured per use, and wound healing leaves exactly **1d6 damage** rather than simply setting the target to maximum hp. If several Cureall-valid problems are present, the command must identify which one is being cured before PP are spent.

**Automatic Healing** can be used as an immediate Cureall-style wound recovery or armed for one turn. When armed, it consumes the artifact PP on activation and triggers once if the user reaches 0 hp during that interval, before ordinary death state is finalized; the trigger then applies the same 1d6-residual-damage wound result and expires.

### Bounded D1 edges

The D1 registry is now complete, but this is **not** a claim that every geometrical or creature-type edge of every underlying spell is globally automated. **Remove Charm** still operates on represented selected targets rather than a full 20-foot cube plus its printed temporary prevention behavior; **Stone to Flesh** does not yet accept an arbitrary empty 10-foot cube of matter; non-PC resurrection and partial-corpse disability are referee/bounded; and Restore depends on explicit Energy Drain history until universal drain lifecycle support exists. These remain named completion gates rather than silent approximations.

### Validation

The finished v0.4.03 `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic Chromium core harness was executed three consecutive times against the final self-contained document through Playwright and `window.KnownWorldTestHarness.runCore({display:false})`:

```text
Build: 0.4.03
Tests: 291 / 291 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Page errors: 0
```

Five new regressions verify: (1) Free Person/Free Monster, Remove Fear, and Remove Geas represented-state procedures; (2) Raise Dead's 132-day limit and two-week rest lifecycle plus Raise Dead Fully recovery; (3) one-level Restore from explicit Energy Drain history; (4) Regeneration at 3 hp/round with the zero-hp stop; and (5) Heal's Cureall one-condition semantics plus armed Automatic Healing at 0 hp. All preceding 286 deterministic tests pass unchanged.



## v0.4.04 — Master Artifact D2 Memorize and Ability Score bonuses

This checkpoint continues the source-gated conversion of Master DM Table 2. It implements only D2 procedures whose printed cost, duration, scope, and mechanical consequence can be represented by current engine state. The artifact itself remains referee-authored: adding a Table 2 procedure to the registry does not cause artifacts to acquire that power automatically.

### Memorize bonus spell levels

All ten printed **Memorize +1 through +10 bonus spell-level** D2 entries are now registered at their corresponding **10, 20, 30, 40, 50, 60, 70, 80, 90, and 100 PP** costs. The user must be a represented spellcaster and must name one or more spells already present in that character's spell book. Multiple choices may be supplied in one activation, and the sum of their spell levels may not exceed the activated artifact bonus. Unknown spells and over-budget combinations are rejected before artifact PP are spent.

Artifact-granted memorization is stored in `artifactBonusPreparedSpells`, separate from the ordinary class/daily `preparedSpells` list. This keeps the Master power from silently enlarging the normal per-day slot table. Each granted spell is a one-use memorized spell: casting it marks that artifact-granted entry spent. Ordinary rest and ordinary preparation can refill the character's normal spell plan but do not refresh a spent artifact bonus entry. The existing Master Touch Dispel prepared-spell path remains recognized by the normalized preparation system.

### Ability Score bonuses

All five printed D2 Ability Score powers are executable: **1 random score (20 PP), 2 random scores (40 PP), 3 random scores (60 PP), 4 random scores (80 PP), or all scores (100 PP)**. The selected scores become **18 for six turns / one hour**. Random multi-score activations select distinct ability categories within that activation so the stated number of scores is actually affected.

The engine stores the user's pre-effect score baseline and recomputes the union of currently active artifact Ability Score effects. When one effect expires, a score remains 18 if another active artifact effect still covers it; when no covering effect remains, the original score is restored. The active-effect records and baseline metadata persist in campaign saves so reloading cannot restart or erase an already-running duration.

The printed instruction to gain the benefits derived from the raised scores is wired into represented mechanics. Strength and Dexterity are read live by existing attack/AC procedures; Wisdom updates the spell-saving-throw adjustment; Constitution adjusts the Hit-Dice-derived hit-point contribution for the duration; Charisma updates reaction adjustment, maximum retainers, and retainer morale; XP adjustment is recalculated from the current prime-requisite scores. Intelligence records any additional language **capacity** but does not invent which languages the character knows, because the source leaves that choice outside the artifact power.

### Mentzer Basic Charisma precedence

While validating the all-ability effect, this checkpoint exposed a source-hierarchy mismatch in the shared Charisma helper. It had inherited the later Rules Cyclopedia's revised reaction modifiers. The project explicitly treats Mentzer boxed-set rules as primary, so `charismaProfile()` now uses the **Mentzer Basic Player** table: reaction modifiers −2, −1, −1, 0, +1, +1, +2 across the seven Charisma bands, with maximum retainers 1–7 and retainer morale 4–10. This correction applies to ordinary characters as well as temporary artifact-driven Charisma 18.

### Remaining D2 boundary

At v0.4.04 this was the remaining D2 boundary. v0.4.08 subsequently implemented the missile-dodging procedures, Size Control, and Elasticity, and v0.4.09 implemented Polymorph Self, Inertia Control, and Shapechange. The printed D2 Personal Bonuses registry is therefore complete at the bounded executable level; the current open work is cross-system integration documented in the v0.4.09 section below.

### Validation

The finished v0.4.04 `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic Chromium core harness was executed three consecutive times against the final self-contained document through Playwright and `window.KnownWorldTestHarness.runCore({display:false})`:

```text
Build: 0.4.04
Tests: 296 / 296 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Page errors: 0
```

Five new regressions verify: (1) Mentzer Basic Charisma values take precedence over the later Rules Cyclopedia revision; (2) Memorize bonus spell levels accept only known spells within the activated level budget and do not spend PP on invalid requests; (3) artifact bonus memorization remains separate from ordinary daily slots and is not refreshed by ordinary preparation; (4) random Ability Score bonuses raise the correct number of distinct scores to 18 and restore them after six turns; and (5) the all-score power updates and then restores live Wisdom, Dexterity, Constitution, and Charisma-derived mechanics. All preceding 291 deterministic tests pass unchanged.

## v0.4.05 — Master Artifact D3 immunity and breathing protections

This checkpoint continues the source-gated conversion of Master DM Table 2, concentrating on D3 protections whose scope can be expressed faithfully in the existing character, condition, damage, planar, and 3D targeting state. It does not make these powers universal treasure or assign them to any artifact automatically; the referee-authored artifact lifecycle and discovery rules remain unchanged.

### Registry, targeting, and duration

Seven additional D3 powers are now executable with their printed Power Point costs and timing: **Water Breathing (15 PP, 30-foot range, one day); Immune to Disease (20 PP, touch, 18 turns); Immune to Paralysis (30 PP, touch, 6 turns); Immune to Poison (40 PP, self only, 18 turns); Immune to Aging Attacks (50 PP, touch, 18 turns); Immune to Energy Drain (80 PP, touch, 6 turns); and Immune to Breath Weapons (100 PP, touch, 1 turn)**. Combat targeting uses the existing 3D distance/barrier procedure before PP are spent. The artifact active-effect lifecycle now also supports exact minute-based durations, which allows the printed one-day Water Breathing effect to persist for 1,440 campaign minutes instead of being approximated as a generic number of turns.

### Water Breathing and planar survival

A recipient with the artifact Water Breathing effect is recognized by the common underwater-breathing check. The same live effect is fed into the established elemental survival record, so it satisfies the explicit Water-plane breathing requirement without inventing any additional planar immunity. Expiration removes that protection normally after the full one-day duration.

### Disease, poison, and paralysis

**Immune to Poison** now blocks represented poison damage in the common PC damage path and is recognized by the current giant-centipede, giant-crab-spider/venom, and related poison procedures. A delayed fatal poison that was already present before immunity is not erased: the due effect is suppressed while immunity remains active and becomes dangerous again after the immunity ends unless actually neutralized. This deliberately distinguishes temporary immunity from the separate Neutralize Poison cure power.

**Immune to Disease** is recognized by the currently represented disease-acquisition procedures, including the Kai Besil parasite and rabid-jaguar infection paths. **Immune to Paralysis** prevents new represented paralysis, including the shared Weapon Mastery condition application path. Neither protection silently removes a disease or paralysis state that predates the protection; cure powers remain responsible for removal.

### Breath, aging, and Energy Drain

**Immune to Breath Weapons** blocks damage identified as breath-weapon damage through the common PC damage procedure, while ordinary physical damage remains unaffected. **Immune to Aging Attacks** and **Immune to Energy Drain** now exist as common artifact-protection predicates that other deterministic attack/effect handlers can query. The latter protects against loss of levels or Hit Dice while active but does not imply immunity to ordinary physical damage from the same attack.

These last two hooks are intentionally broader than the number of current producers: the engine still does not claim universal automation for every aging attack or every Energy Drain source among the full 607-profile catalogue. Likewise, unusual non-damage rider effects attached to a bespoke breath weapon still require their own handler if they are not routed through the shared damage/effect paths.

### Remaining D3 boundary

D3 is still partial. The source-gated powers still to be converted include **Shield, Mindmask, Invisibility, Invisibility 10-foot Radius, Security, Mass Invisibility, Survival, Statue, Mind Barrier, Protection from Magical Detection, Luck, and Immunity**, plus any cross-system details needed to make those procedures interact correctly with Anti-Magic, 3D geometry, items, and unusual monster attacks. The existing 10–50% radiated Anti-Magic entries remain intact from v0.4.01.

### Validation

The finished v0.4.05 `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic Chromium core harness was loaded through Playwright and `window.KnownWorldTestHarness.runCore({display:false})` was executed three consecutive times against the final self-contained document:

```text
Build: 0.4.05
Tests: 300 / 300 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Page errors: 0
```

Four new regressions verify: (1) Water Breathing's 30-foot combat range, full one-day duration, underwater-breathing integration, and Plane-of-Water survival; (2) poison-damage prevention and temporary suppression—without cure—of an already-pending fatal poison; (3) disease/paralysis prevention without retroactive curing; and (4) breath-weapon damage immunity plus the live Aging and Energy Drain protection predicates. All preceding 296 deterministic tests pass unchanged.

## v0.4.06 — Master Artifact D3 Shield, invisibility, mental, survival, and detection protections

This checkpoint converts eight more Master DM Table 2 D3 Personal Protections into persistent executable engine state while preserving Mentzer's printed PP costs, ranges, and durations. The newly encoded entries are **Shield (10 PP, 6 turns); Mindmask (15 PP, touch, 12 turns); Invisibility (20 PP); Invisibility 10-foot Radius (25 PP, 120-foot range); Mass Invisibility (60 PP, 240-foot range, 60-foot-square recipient area); Survival (65 PP, 48 hours); Mind Barrier (80 PP, 10-foot range, 48 hours, +8 saving throws); and Protection from Magical Detection (85 PP, 6 turns)**. The prior D3 Anti-Magic and immunity entries remain unchanged.

### Shield

Artifact Shield uses the Mentzer Basic Shield defense values but the Master artifact table's longer six-turn duration. While active, the recipient's effective AC cannot be worse than **AC 2 against missiles** or **AC 4 against other attacks**. This is applied in the common PC AC resolver, so monster attacks and other engine procedures querying effective AC see the protection automatically. It does not stack into a better value when the character already has superior AC.

### Mindmask and Mind Barrier

Mindmask is represented as a touch-range, 12-turn protection that makes the recipient unavailable to ESP and other mind-reading through the common `artifactMentalDetectionBlocked` predicate. Mind Barrier supplies the same common mental-information block and, independently, adds the printed **+8** to represented saving throws whose reason is identified as charm, illusion, phantasm, feeblemind, ESP/clairvoyance/clairaudience, or another explicitly mental influence. Natural 1 still fails because the existing saving-throw core retains its normal natural-1 rule.

The engine does not reinterpret Mind Barrier as blanket charm immunity. Effects that do not use the common PC saving-throw path, or future mental-information procedures that do not yet consult the detection predicate, remain integration work rather than receiving invented behavior.

### Invisibility and the 3D combat layer

Single-target artifact Invisibility now persists without a clock expiration and ends when the recipient **attacks or casts a spell**. In combat, an attacker that cannot see an invisible target suffers the Rules Cyclopedia's later consolidated **−6 attack-roll penalty**; a live Detect Invisible effect or an explicit see-invisible capability bypasses that penalty. This numeric combat modifier is a secondary Rules Cyclopedia clarification around the Mentzer spell effect, not a replacement for the boxed-set rule.

Invisibility 10-foot Radius applies invisibility to every represented living creature within ten feet of the selected recipient at the moment of activation. The engine stores the recipient/tether relationship in artifact active-effect state. Once another recipient moves farther than ten feet from the central recipient, that specific invisibility ends permanently and does not return merely because the creature moves back inside the radius. In combat this is evaluated against actual `(x,y,z)` positions.

Mass Invisibility accepts represented recipients only after all selected creatures pass the 240-foot accessibility check and, in combat, fit inside one **60-foot square** in the horizontal plane. Every selected recipient then receives the same persistent attack/spell break lifecycle as ordinary invisibility.

Two source boundaries remain explicit. The current deterministic artifact target model applies single/radius invisibility to represented creatures, not unattached arbitrary objects, so the Basic object's touch/drop visibility rules are not falsely generalized. Mass Invisibility enforces the printed 300 represented-recipient ceiling, but does not invent a conversion formula for a mixed group of man-sized and dragon-sized creatures where Mentzer states separate maxima of 300 men or 6 dragons.

### Survival

Artifact Survival lasts exactly **48 hours** as Table 2 specifies. It is recognized by the existing planar-survival predicate and by the common PC damage procedure when damage is explicitly classified as **nonmagical environmental damage**. Ordinary weapon damage, spell damage, magical environmental hazards, and other attacks are not silently recategorized and therefore are not blocked. This keeps the Master spell's environmental scope without turning Survival into general damage immunity.

### Protection from Magical Detection

Protection from Magical Detection persists for six turns and exposes a common live predicate indicating that the user and carried items cannot be detected by magical means. This is the source-defined state needed by Detect Magic and similar future detection consumers. Procedures that do not yet route through that common predicate remain listed as integration work; the engine does not pretend that every bespoke monster/item detection routine has already been intercepted.

### Remaining D3 boundary

The principal D3 powers still requiring dedicated procedures are **Security, Statue, Luck, and Immunity**. Security needs permission-aware possession/theft and audible-alarm routing; Statue needs a persistent once-per-round form-toggle state plus its AC, movement, elemental, breathing, weapon-immunity, and +2 initiative branches; Luck needs a safe universal pre-roll selection hook without retroactively changing a completed roll; and Immunity requires broad spell-level, missile, normal/silver weapon, magical hand-held weapon, natural-attack, and voluntary round-by-round suspension integration. Those remain source-gated rather than approximated.

### Validation

The finished v0.4.06 `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic Chromium core harness was loaded through Playwright and `window.KnownWorldTestHarness.runCore({display:false})` was executed three consecutive times against the final self-contained document:

```text
Build: 0.4.06
Tests: 306 / 306 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Page errors: 0
```

Six new regressions verify: (1) artifact Shield's Basic AC rows and six-turn expiry; (2) Mindmask/Mind Barrier mental-detection state and exact +8 mind-influence save modifier; (3) Survival's explicit nonmagical-environment scope, planar protection hook, and 48-hour duration; (4) single-target Invisibility's unseen-target attack modifier and attack/spell break conditions; (5) the 10-foot-radius one-way tether plus Mass Invisibility's 60-foot-square recipient geometry; and (6) Protection from Magical Detection's common six-turn protection state. All preceding 300 deterministic tests pass unchanged.

## v0.4.07 — Master Artifact D3 Security, Statue, Luck, and Immunity

This checkpoint converts the four remaining printed Master DM Table 2 **D3 Personal Protections** into persistent executable artifact procedures. The registry entries preserve the printed costs and artifact durations: **Security (30 PP); Statue (70 PP, 80 turns); Luck (100 PP, 1 turn or one use); and Immunity (100 PP, touch, 40 turns)**. This means D3 now has a bounded executable entry for every printed Personal Protection power; remaining D3 work is integration at the edges rather than missing table rows.

### Security

Security protects from one to five **distinct owned inventory items**. Each secured item receives a persistent internal identity so that the alarm follows that specific object through normal inventory transfers. If the item leaves the owner's possession without permission, it begins the printed one-hour alarm and reports that the repeated cries are audible to **120 feet**. The owner can explicitly authorize removal/transfer before the item leaves possession, or silence an already sounding alarm. Returning the item to the owner resets the removal state. Fungible inventory stacks containing more than one unit are rejected at activation instead of guessing which physical unit is trapped.

The common transfer command checks Security immediately, and the artifact clock also rechecks ownership so non-transfer state changes can be detected. Arbitrary referee-authored disappearance that bypasses represented inventory still requires the referee to place the object/state into the engine; the system does not claim omniscient detection of unrepresented theft.

### Statue

Statue creates an **80-turn** active effect and lets the user change to or from statue form at most once per combat round. While in statue form the common AC resolver uses **AC −4**, movement/physical action declarations are restricted, and the user is treated as not requiring air. The common damage path blocks normal weapons, fire, cold, gas, and drowning/suffocation effects; magical hand-held weapons and other non-fire/non-cold magic remain capable of causing normal damage. Expiration or deactivation automatically returns the user to normal form.

The Companion spell's **+2 initiative when changing form** is recorded by the form-toggle procedure but is not yet generalized into a reactive interruption of the project's optional two-sided phase-initiative sequence. Likewise, the printed branch allowing a petrified Statue user to return to normal one round later is not automatically fired because petrification producers are not yet unified around a common application timestamp. Those two branches remain explicit follow-up work rather than being approximated.

### Luck

Luck creates a one-turn, one-use effect. The player may choose a positive result **before** an eligible personal die is rolled. The next compatible roll by that same character uses the selected value if it fits that die, then the Luck effect is consumed immediately. The common character saving-throw and attack-roll procedures, player weapon-damage rolls, represented healing dice, and the shared dice helper are wired to this hook. Luck does not alter another player's roll, a monster/referee roll, or a roll that has already happened.

This implementation deliberately stores the choice until an eligible die of sufficient size is actually rolled; an out-of-range choice does not get silently clamped or consumed on the wrong die.

### Immunity

Artifact Immunity lasts **40 turns** and may be placed on a living character at touch range. The common spell-level predicate completely blocks represented **1st–3rd-level spells**, returns a one-half multiplier for 4th/5th-level effects (one-quarter when the caller identifies a successful save), and leaves higher-level magic unchanged. Existing live spell paths that already use the common resolver—including Fire Ball, Lightning Bolt, Shield, and represented healing/condition procedures—consult the protection. The common damage resolver blocks all normal or magical missiles, blocks normal/silver hand-held weapons, halves damage from magical hand-held weapons with fractions rounded in the recipient's favor, and intentionally leaves claws, bites, breath weapons, and other natural attacks untouched.

The recipient may voluntarily drop Immunity for one round so beneficial magic can function; combat state records the suspended round and the protection returns automatically on the following round. Outside combat the same command creates a one-round-equivalent suspension. The remaining boundary is universal propagation of the 4th/5th-level quantitative multiplier into every bespoke high-level spell effect that does not yet use the common spell-effect resolver; those producers remain PARTIAL rather than receiving invented blanket behavior.

### D3 status after v0.4.07

All printed D3 Personal Protection entries now have bounded executable registry procedures. Remaining D3 integration work is concentrated in: Statue's reactive +2 initiative and petrification-recovery branch; object-only invisibility; mixed man/dragon Mass Invisibility capacity; Protection from Magical Detection consumers outside the common predicate; the full family of unusual missile/spell/item/monster producers; and generic scaling of every quantifiable 4th/5th-level spell effect under Immunity.

### Validation

The finished v0.4.07 `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic Chromium core harness was loaded through Playwright and `window.KnownWorldTestHarness.runCore({display:false})` was executed three consecutive times against the final self-contained document:

```text
Build: 0.4.07
Tests: 310 / 310 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Page errors: 0
```

Four new regressions verify: (1) Security's unauthorized-removal alarm plus owner silence and permission; (2) Statue's AC −4, normal-weapon/fire immunity, no-breathing state, magical-weapon vulnerability, and 80-turn expiration; (3) Luck's preselected personal die result and exactly-once consumption; and (4) Immunity's 1st–3rd-level spell block, magical-missile block, half damage from magical hand-held weapons, natural-attack exception, and one-round voluntary suspension. The existing net-escape regression now sets an explicit deterministic seed so its intended non-natural-1 escape case cannot fluctuate with wall-clock initialization; this is test hardening only and does not alter the production Weapon Mastery rule.


## v0.4.08 — Master Artifact D2 Missile Dodging, Size Control, and Elasticity

This checkpoint converts five more printed Master DM Table 2 **D2 Personal Bonuses** into persistent executable procedures: **Dodge Normal Missiles (35 PP, 1 turn), Size Control (35 PP, 6 turns), Elasticity (45 PP, 12 turns), Dodge Any Missiles (50 PP, 1 turn), and Dodge Directional Attacks (65 PP, 1 turn)**. These entries retain their printed artifact costs and durations rather than inheriting durations from similarly named potions or spells.

### Missile dodging

The three dodge effects share a common incoming-attack resolver. An eligible attack must first be one that would otherwise affect the character; the user then makes the printed **Saving Throw vs. Wands**. A successful save prevents 100% of that attack and marks the user as unable to take any further actions in that combat round. That action-loss state is consulted by normal weapon attacks, prepared spellcasting, and the Magic-phase magic-item path.

**Dodge Normal Missiles** applies to normal fired or thrown weapons and permits up to six successful dodges in a round. **Dodge Any Missiles** uses the same procedure and six-dodge limit but accepts magical and siege missiles as well, including represented Magic Missile damage. **Dodge Directional Attacks** accepts missiles, rays, beams, cones, lines, and breath-style directional attacks when physical evasion is possible, but permits only one successful dodge per round. The common PC damage path now recognizes ordinary/magical missile tags, breath attacks, Lightning Bolt, and explicitly tagged ray/beam/cone/line effects and routes them through the active artifact dodge before applying damage.

The printed rule lets the player choose which missiles to dodge if more than six will hit in the same round. The present sequential damage resolver can enforce the six-success maximum but does not yet present a batch-selection UI for a simultaneous salvo; that choice remains player/referee input when several hits are resolved as one batch.

### Size Control

Size Control creates a six-turn persistent state and lets the user change the operational size modifier at will from **−6 through +6**, the extended range specified for the artifact power. The live modifier is applied using Mentzer's **Changing Monsters** procedure: it is added to Hit rolls, added per die of weapon damage, subtracted from saving-throw rolls, subtracted from descending Armor Class, and added per Hit Die to hit points. When the modifier changes, current injury is preserved against the new maximum; when the effect ends, the original hit-point baseline is restored rather than permanently rewriting the character.

The source separately states that the user can range from **3 inches to 18 feet tall**, but it does not supply a deterministic mapping between those exact heights and the −6…+6 modifiers. The engine therefore requires an explicit modifier instead of inventing a height table. Exact visual height remains descriptive/referee-authored unless a later source-backed mapping is added.

### Elasticity

Elasticity uses the artifact table's **12-turn** duration while inheriting the printed potion behavior. The user can toggle between normal and stretched form; stretched form represents the body and carried equipment extending as far as 30 feet long or as thin as 1 inch. While stretched, the user cannot make attacks or cast spells, and the artifact itself cannot be invoked as a carried item until the user returns to normal shape. The common damage path halves represented blunt-weapon damage, rounding down.

The potion text also says carried items cannot be used or dropped while stretched. Artifact invocation is blocked now, but every ordinary inventory-use/drop route is not yet unified behind a single predicate, so those remaining item-routing cases stay PARTIAL rather than being silently assumed complete.

### D2 status after v0.4.08

The remaining unimplemented printed D2 powers are **Polymorph Self, Inertia Control, and Shapechange**. Existing D2 procedures now cover the numeric AC/save/HP bonuses, Parry, all Memorize bonus levels, all Ability Score bonuses, all three missile/directional dodge entries, Size Control, and Elasticity. Once the three transformation/inertia powers are complete, remaining D2 work should be integration and unusual producer coverage rather than missing registry rows.

### Validation

The finished v0.4.08 `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic Chromium core harness was loaded through Playwright and `window.KnownWorldTestHarness.runCore({display:false})` was executed three consecutive times against the final self-contained document:

```text
Build: 0.4.08
Tests: 314 / 314 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Page errors: 0
```

Four new regressions verify: (1) the printed PP costs and durations of the five new D2 entries; (2) Size Control's hit-point, AC, per-die damage, at-will modifier change, and expiration/restoration state; (3) Elasticity's stretched-form state, blunt-damage halving, non-blunt exception, and 12-turn expiration; and (4) Save-vs.-Wands eligibility for normal missiles, magical missiles, and directional ray/beam/cone/line attacks together with the no-further-actions flag after a successful dodge. All preceding 310 deterministic tests pass unchanged.

## v0.4.09 — Master Artifact D2 Polymorph Self, Inertia Control, and Shapechange

This checkpoint completes the printed Master DM Table 2 **D2 Personal Bonuses registry** at a bounded executable level. The three final entries retain the source values exactly: **Polymorph Self (65 PP, 46 turns)**, **Inertia Control (85 PP, 4 hours, one object)**, and **Shapechange (100 PP, 40 turns; inanimate forms no larger than 40 feet / 4,000 cn)**. No new power is substituted for any source-defined branch.

### Polymorph Self

Artifact Polymorph Self follows the Expert spell as a 40th-level effect. The chosen form must be a represented **living creature** with no more than 40 Hit Dice; explicit unique/specific forms are rejected. The character keeps his or her own Armor Class, hit points, Hit rolls, and saving throws. The engine instead borrows represented **natural physical abilities** of the form: ordinary movement modes and ordinary natural attacks can be used, while special attacks and special immunities are not granted. Spellcasting is barred for the duration. The transformed body's represented physical size/protection also feeds the project's optional Arms Across Eras target classification without altering the BECMI statistics that Polymorph Self says remain unchanged.

### Inertia Control

Inertia Control can stop **one distinct carried object** for four hours. Once stopped, the object remains marked immovable and the common represented inventory-removal, consumption, and ready/equip routes refuse to move or use it. A second command releases the object. If the object has an explicit represented velocity when stopped, that value is snapshotted and restored when released, preserving the printed instruction that previous inertia resumes.

The browser engine does not yet contain a universal free-flight/projectile-physics model or a single chokepoint for every possible scripted transfer/drop operation. Therefore the source's absolute “cannot be moved by any means” is enforced across the common represented item routes, while arbitrary detached scene-object physics and bespoke transfer paths remain integration work rather than being claimed complete.

### Shapechange

Shapechange uses the Master spell's 40th-level duration of **40 turns**. Creature forms are limited to creatures the character has actually seen, using persistent `seenCreatureForms` plus represented current-combat and combat-history familiarity. Object forms use persistent referee-authored `seenObjectForms` records that carry identity, height, and weight; the engine enforces the printed 40-foot and 4,000-cn maxima and does not invent dimensions for an unfamiliar object.

A creature-form Shapechange preserves the user's **mind, hit points, and saving throws** while substituting represented form Armor Class, Hit rolls/THAC0, movement, ordinary natural attacks, and common physical traits. Spellcasting is permitted only when the chosen represented form is a **bipedal humanoid**. Inanimate forms are immobile and non-breathing. A form change made during combat requires a full round of concentration and completes at round end; further changes may be requested while the power remains active.

The source states that Shapechange gains the form's special attacks, immunities, flaws, and other details. The engine can route ordinary profile attacks and common predicates, but it does **not** claim universal automation of every extraordinary power among the 607 monster profiles. Bespoke special attacks/immunities still use an existing dedicated handler where one exists and otherwise remain referee resolution. General object AC/durability, arbitrary physical inertia for scene objects, specific-identity/unique-form judgments beyond represented flags, and the prohibition on passing through Protection from Evil or Anti-Magic Shell are also still integration boundaries.

### D2 status after v0.4.09

**All printed D2 Personal Bonus table entries now have bounded executable registry support.** Remaining D2 work is integration and unusual-producer coverage rather than missing Table 2 rows. The audit therefore no longer lists Polymorph Self, Inertia Control, or Shapechange as OPEN powers.

### Validation

The finished v0.4.09 `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic Chromium core harness was loaded through Playwright and `window.KnownWorldTestHarness.runCore({display:false})` was executed three consecutive times against the final self-contained document:

```text
Build: 0.4.09
Tests: 318 / 318 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Page errors: 0
```

Four new regressions verify: (1) the printed costs, durations, and Shapechange object caps for the three final D2 powers; (2) Polymorph Self's preservation of character AC/hp/Hit rolls/saves together with represented physical form movement, natural attack use, spellcasting prohibition, and 46-turn expiration; (3) Inertia Control's one-object stop/release state, common inventory/equipment blocking, represented velocity restoration, and four-hour expiry; and (4) Shapechange's seen-form gate, full-round combat concentration, form AC/Hit-roll substitution with hp/saves preserved, non-humanoid spellcasting restriction, familiar-object transformation, immobility/non-breathing state, and 40-foot object limit. All preceding 314 deterministic tests pass unchanged.

## v0.4.10 — Master Artifact A1 fixed wounds, Magic Missile, Create Poison, and breath weapons

This checkpoint begins deterministic implementation of Master DM Table 2 **A1 Direct Physical Attacks**. It does not mark A1 complete. The registry now preserves the printed artifact costs and the table-level overrides for eight powers: **Cause Wounds, Light 10 PP; Magic Missile 15 PP; Cause Wounds, Serious 30 PP; Cause Wounds, Critical 35 PP; Create Poison 40 PP; Ice Breath 55 PP; Fire Breath 60 PP; Acid Breath 65 PP**.

### Cause Wounds

The artifact table fixes these three wound effects at **7, 14, and 21 hit points** respectively. The engine therefore does not roll the ordinary spell's wound dice. Against a hostile represented combat monster the artifact user must make the normal melee touch Hit roll required by the underlying Cause Wounds procedures; a miss spends the artifact PP but inflicts no damage. A hit receives no saving throw and applies the table's fixed damage. Existing player-character artifact Immunity routing remains in force where its represented spell-level scope applies.

### Magic Missile

Artifact Magic Missile is the exact Table 2 packet of **five 1d6+1 missiles at 150 feet**, rather than recalculating missile count from the artifact's effective 40th caster level. All five may strike one represented target. A split attack requires exactly five explicit semicolon/comma target assignments, with repeated names allowed, so the engine does not invent how an ambiguous two-, three-, or four-name declaration distributes five missiles. The missiles retain the ordinary automatic-hit/no-normal-save behavior; represented Shield protection may make its normal Saving Throw vs. Spells against each missile. The common Anti-Magic entry check and existing PC artifact-immunity hooks remain active.

### Create Poison

The deterministic creature-target branch uses the printed touch range and the underlying reversed Neutralize Poison procedure: a living creature makes a **Saving Throw vs. Poison** and is slain on failure. Existing represented poison immunity prevents the effect. The alternative source branch that poisons a container's contents is intentionally still OPEN because the current deterministic target resolver in this checkpoint handles creatures only; no container semantics are invented.

### Fire, Ice, and Acid Breath

The three new breath powers use the Master explanations directly. **Fire Breath** and **Ice Breath** create a widening **30-foot cone, 10 feet across at the far end**; **Acid Breath** creates a **30-foot line 5 feet across**. Base damage is one-half the artifact user's current hit points, rounded down, and each affected creature makes its own Saving Throw vs. Dragon Breath for half damage. The cone/line is resolved in the existing three-dimensional combat space, honors represented solid barriers, excludes the user, and can affect friend or foe if physically inside the area.

The current A1 Anti-Magic bridge checks the invocation/primary target through the common Master Anti-Magic resolver. It does not yet claim full clipping of every portion of these breath volumes through arbitrary Anti-Magic geometry, nor does it claim universal routing of every monster-specific fire/cold/acid resistance or poison immunity in the 607-profile catalogue. Those remain cross-system integration work.

### A1 status after v0.4.10

A1 is **PARTIAL**. The eight powers above are executable. Remaining printed A1 powers, including Bearhug, Cause Disease, Dispel Evil, Cloudkill, Ice Storm, Death Spell, Finger of Death, Poison Gas Breath, the artifact-specific Fire Ball/Lightning Bolt entries, Delayed Blast Fire Ball, Life Drain, Explosive Cloud, Disintegrate, Power Word Kill, Obliterate, and Meteor Swarm, remain to be converted or explicitly mapped to already implemented spell procedures where source-compatible. No A2/A4/A5/B/C/D4/D5 completion is implied by this checkpoint.

### Validation

The finished v0.4.10 `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic core harness was loaded into headless Chromium and `window.KnownWorldTestHarness.runCore({display:false})` was executed three consecutive times against the final self-contained document:

```text
Build: 0.4.10
Tests: 323 / 323 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Page errors: 0
```

Five new regressions verify: (1) A1 costs, fixed wound amounts, exact Magic Missile packet, and breath geometry; (2) the fixed 14-hp Cause Wounds, Serious result following a successful touch Hit roll; (3) exact five-missile resolution and rejection of ambiguous partial allocation without spending PP; (4) Create Poison's creature Saving Throw vs. Poison and lethal failure result; and (5) Fire Breath's widening 3D cone, half-current-hp damage, individual Breath saves, and exclusion of an off-cone target. All preceding 318 deterministic tests pass unchanged.



## v0.4.11 — Master Artifact A1 Bearhug, disease, dispelling, clouds, storm, death, and poison gas

This checkpoint continues Master DM Table 2 **A1 Direct Physical Attacks** with eight additional bounded executable entries: **Bearhug (35 PP), Cause Disease (25 PP), Dispel Evil (40 PP), Cloudkill (45 PP), Ice Storm (45 PP), Death Spell (50 PP), Finger of Death (50 PP), and Poison Gas Breath (50 PP)**. Together with v0.4.10, sixteen of the twenty-five printed A1 rows now have dedicated deterministic handlers.

### Bearhug

Bearhug now requires an active combat encounter, two empty hands, a target of approximately the same represented size or smaller, and a normal melee Hit roll. A successful hit inflicts **2d8** damage and establishes the printed one-turn hold. At each following combat round while held, the victim makes a **Saving Throw vs. Death Ray**; success breaks the hold, while failure permits the artifact user to squeeze automatically for another **2d8** damage. Death, separation through end-state, or duration expiry closes the hold. The engine does not invent a separate grappling subsystem beyond the printed Bearhug procedure.

### Cause Disease

Cause Disease uses the Expert reversed Cure Disease procedure at its printed **30-foot** range. A living victim receives a **Saving Throw vs. Spells**. Failure creates a persistent wasting-disease state: **−2 on Hit rolls**, magical wound curing is blocked, natural recovery occurs at half the normal frequency, and the victim dies after **2d12 days** unless the disease is cured. Cure Disease-compatible artifact recovery clears the state and removes the healing restriction. Disease-immunity hooks apply where already represented.

### Dispel Evil

Dispel Evil uses its **30-foot / one-turn** artifact entry and the Expert spell behavior. When invoked as an area effect from the artifact user, represented undead and enchanted monsters within 30 feet each make their ordinary Saving Throw vs. Spells; failed saves destroy the creature, or banish an explicitly other-planar creature to its home plane. A successful save forces the represented monster to flee. When exactly one eligible monster is named, the printed **−2 saving-throw penalty** applies. The engine also removes one represented magical charm or one represented curse from a character. If both are present, it refuses to guess which one the user intended and refunds the attempted use. Cursed-item cleansing remains open because the current item curse model is not yet universal.

### Cloudkill

Cloudkill now creates the printed persistent poison cloud in the 3D combat layer: **30 feet across, 20 feet high, six turns**, appearing adjacent to the user and moving **20 feet per combat round** along the chosen horizontal direction. Every living creature exposed takes **1 hp each round**; creatures with fewer than 5 Hit Dice also make a **Saving Throw vs. Poison** or die. Represented poison immunity is honored. The source also specifies wind-following movement, downward sinking, and destruction by thick vegetation; the engine does not yet have a generalized environmental volume-flow solver, so those branches remain explicit integration work rather than being approximated.

### Ice Storm

Artifact Ice Storm uses Table 2's fixed **20d6** damage rather than deriving damage from the artifact's effective 40th caster level. It occupies a **20-foot cube** at up to **120 feet**, rolls damage once, and gives each represented victim a **Saving Throw vs. Spells for half damage**. Explicitly represented cold-type/cold-immune subjects are unaffected and explicitly represented fire-type subjects receive the printed −4 save penalty. As with other current point-selected area spells, placement is centered on a represented selected creature; arbitrary empty-point placement is still a general spell-targeting gate.

### Death Spell

Artifact Death Spell applies the table's fixed **32 Hit Dice** budget in a **60-foot cube** at up to **240 feet**. Living creatures of **7 HD/levels or less** are considered from lowest Hit Dice upward until the budget is exhausted; undead/nonliving subjects and creatures of 8 or more HD/levels are excluded. Each selected victim makes a **Saving Throw vs. Death Ray** and dies on failure. This preserves the Expert lowest-HD-first procedure while applying the artifact table's deterministic 32-HD override.

### Finger of Death

Finger of Death operates at **60 feet**. A living target makes a **Saving Throw vs. Death Ray** and is slain on failure. The Companion clarification is also retained: an undead creature of **10 or more Hit Dice** is cured for **3d10 hp** instead of harmed; lesser undead are not valid living victims.

### Poison Gas Breath

Poison Gas Breath creates a persistent **20-foot × 20-foot × 20-foot** cloud for **three full rounds**. Newly exposed creatures make a **Saving Throw vs. Dragon Breath** or die; the user is excluded, and represented poison/gas immunity applies. The cloud remains fixed in the represented 3D space and can affect a creature that enters on a later round. The printed magical-wind dispersal branch remains open until the common wind/area-effect interaction layer is generalized.

### Persistent artifact-effect hardening

While adding the multi-round cloud procedures, the harness exposed a state-identity problem: repeated calls to the artifact normalizer could replace live `activePowerEffects` objects while a combat-round procedure still held references to the old objects. `ensureArtifactState()` now preserves existing active-effect object identity by ID while normalizing their fields. This prevents nested protection/immunity queries from detaching a Cloudkill, Poison Gas, Regeneration, Shapechange, or other round-based effect from the saved artifact record before its duration is decremented or its mutable state is updated.

### A1 status after v0.4.11

A1 remains **PARTIAL**, but sixteen of twenty-five printed rows now have dedicated bounded handlers. The nine remaining rows are **Fire Ball, Lightning Bolt, Delayed Blast Fire Ball, Life Drain, Explosive Cloud, Disintegrate, Power Word Kill, Obliterate, and Meteor Swarm**. Several already have ordinary spell-engine support, but the artifact versions still need explicit Table 2 overrides, targeting, area, duration, and/or artifact-specific effects before the audit will count them complete.

### Validation

The finished v0.4.11 `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic core harness was loaded into headless Chromium and `window.KnownWorldTestHarness.runCore({display:false})` was executed three consecutive times against the final self-contained document:

```text
Build: 0.4.11
Tests: 331 / 331 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Page errors: 0
```

Eight new regressions verify: (1) printed costs/ranges/durations/fixed packets for the eight new A1 entries; (2) Bearhug's empty-hand, Hit-roll, one-turn hold, escape-save, and automatic squeeze procedure; (3) Cause Disease's 2d12-day state and wound-healing block/removal; (4) Dispel Evil's 30-foot undead area sweep; (5) Cloudkill's 1-hp exposure, sub-5-HD poison save, six-turn duration, and 20-foot-per-round movement; (6) Ice Storm's fixed 20d6 and 20-foot cube; (7) Death Spell's fixed 32-HD budget and 7-HD victim ceiling; and (8) Finger of Death plus persistent Poison Gas Breath/new-entrant handling. All preceding 323 deterministic tests pass unchanged.

## v0.4.12 — Complete bounded Master Artifact A1 registry under the consolidated Mentzer BECM primary

This checkpoint completes the printed Master Artifact **A1 Direct Physical Attacks** registry at the engine's bounded deterministic level. The source hierarchy has also been reconciled to the project's updated materials: **Mentzer D&D - BECM.pdf is primary**, and **Rules Cyclopedia.pdf is secondary**. The two earlier provenance labels found during the transition audit are corrected in this audit: the Staff of Dispelling temporary deactivation rule and the Ring of Spell Storing fixed-spell procedure are both present in Mentzer BECM itself.

The nine A1 rows completed in this build are **Fire Ball (55 PP), Lightning Bolt (60 PP), Delayed Blast Fire Ball (65 PP), Life Drain (70 PP), Explosive Cloud (75 PP), Disintegrate (80 PP), Power Word Kill (85 PP), Obliterate (90 PP), and Meteor Swarm (100 PP)**. Together with v0.4.10-v0.4.11, all **25/25 printed A1 rows** now have source-bounded executable support.

### Fire Ball and Lightning Bolt artifact mapping

The artifact entries for Fire Ball and Lightning Bolt now explicitly delegate to the existing live BECM spell engine rather than duplicating a second geometry subsystem. Artifact casting therefore uses the already-tested **20d6 maximum**, true three-dimensional area/line geometry, friendly fire, individual saving throws, Lightning Bolt rebound behavior, and current Anti-Magic interception. The Table 2 artifact PP costs remain 55 and 60 respectively.

### Delayed Blast Fire Ball

Delayed Blast Fire Ball supports the printed **0-60 round delay**, fixed **20d6** artifact damage packet, **240-foot range**, and 20-foot-radius spherical blast. A delayed gem is persistent combat state and detonates on the selected round rather than being decremented twice by both its handler and the common artifact round clock. Current deterministic placement uses a represented creature's current 3D position as the desired location. The source permits the resulting gem to be picked up and physically carried while barring magical movement; generalized carried-gem inventory physics and arbitrary empty-point placement remain explicit integration work.

### Life Drain / Energy Drain

Life Drain now applies one source-defined **Energy Drain** on touch. A first-level character is killed; other player characters lose one level, XP falls to the midpoint of the new level, and represented level benefits are removed. For post-Name levels, where the class hit-point benefit is fixed, the correct fixed HP benefit is removed deterministically. For pre-Name levels, the original Hit Die roll that produced the lost level's HP is not retained by older save data; the engine now **flags that exact HP adjustment for referee resolution instead of fabricating a die result**. Monsters lose one Hit Die, with the bounded current profile applying proportional HP loss when no per-HD historical HP record exists. Restore can use the recorded Energy Drain history for represented character state.

### Explosive Cloud

Explosive Cloud now creates the printed six-turn moving cloud using the same persistent 3D volume foundation as Cloudkill. The artifact Table 2 override is **20 hp damage per round**. Each creature still alive in the cloud makes a **Saving Throw vs. Spells each round**; failure causes paralysis for that round, and the common combat action gates now actually prevent movement, attacks, and spellcasting for that failed-save round. The cloud advances **20 feet per round** along its represented direction. General wind-following/environmental flow remains outside the bounded volume solver.

### Disintegrate

Disintegrate now resolves against represented creatures at up to **60 feet** with a **Saving Throw vs. Death Ray**; failure destroys the creature. The Expert/Mentzer spell also permits a nonmagical object or a section of larger nonmagical material to be disintegrated. Universal object/wall combat entities are not yet normalized, so the object branch remains referee/runtime integration work rather than being silently approximated.

### Power Word Kill

Power Word Kill implements the Companion/Mentzer thresholds at **120 feet**: a single target with **1-60 hp is slain**, **61-100 hp is stunned for 1d4 turns**, and **101+ hp is unaffected**. Up to five targets can be selected when each has 20 hp or less. Magic-users and creatures represented as magic-user spellcasters receive the source-defined **Saving Throw vs. Spells at -4**. The timed stun is connected to the common action gates so it actually prevents actions for its duration.

### Obliterate

Obliterate follows the reversed Raise Dead Fully procedure: a living target of **7 HD/levels or less is destroyed**, a living target of **7-12 HD/levels** makes a **Saving Throw vs. Spells at -4**, and a living target above 12 HD/levels takes **6d10 damage**, with a Spell save for half. Against represented undead, the engine invokes its existing bounded Cureall-style healing branch. Cureall's alternate blindness/feeblemind choice for arbitrary undead states remains limited by which afflictions are represented on the monster profile.

### Meteor Swarm

Meteor Swarm supports both printed configurations: **four meteors for 8d6 strike + 8d6 blast each**, or **eight meteors for 4d6 strike + 4d6 blast each**. One and only one meteor may be aimed at each selected represented creature; strike damage has no save, while each 20-foot-radius fiery blast gives each victim a separate Saving Throw vs. Spells for half blast damage. Overlapping blast volumes naturally stack because each meteor is resolved separately. Arbitrary empty-point meteor aiming is still part of the broader point-targeting integration gate.

### A1 completion state

A1 is now **IMPLEMENTED / BOUNDED** rather than PARTIAL: every printed A1 Table 2 row has an executable handler or an explicit mapping into an already-live BECM spell procedure. "Bounded" remains important: object-only Disintegrate, arbitrary empty-point targeting, movable delayed-fireball gems, universal wind/volume interactions, and unusual monster-specific immunities still depend on broader engine facilities and are not falsely claimed as universal automation.

The next artifact work should proceed into the still-open **A2 Direct Mental Attacks**, followed by the remaining A4/A5/B/C/D4/D5 categories and then adverse effects/autonomous artifact defense/Known Artifacts. This does not change the broader engine priorities for high-level magic, planes, monster exceptional powers, and world-level encounter/treasure integration.

### Validation

The finished v0.4.12 `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic Chromium core harness was executed against the exact integrated document three consecutive times through the project's `KnownWorldTestHarness`:

```text
Build: 0.4.12
Tests: 339 / 339 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
```

Eight new regressions verify: (1) all 25 printed A1 registry rows and the nine final PP costs; (2) Delayed Blast Fire Ball's exact selected-round countdown without double decrement; (3) deterministic post-Name Life Drain level/XP/fixed-HP loss; (4) non-invention of an unknown pre-Name Hit Die result; (5) Explosive Cloud's fixed 20 hp, movement, duration, and action-blocking paralysis; (6) Disintegrate plus Power Word Kill's kill/stun thresholds; (7) Obliterate's three living-creature HD branches; and (8) four-meteor Meteor Swarm strike/blast execution. All preceding 331 deterministic tests pass unchanged.

## v0.4.13 — First bounded Master Artifact A2 Direct Mental Attacks

This checkpoint begins deterministic implementation of Master Artifact **A2 Direct Mental Attacks** under the reconciled source hierarchy: **Mentzer D&D - BECM.pdf is primary** and **Rules Cyclopedia.pdf is secondary**. Six of the eighteen printed A2 rows now have bounded executable handlers: **Cause Fear (10 PP), Sleep (15 PP), Charm Person (20 PP), Charm Monster (30 PP), Calm Others (30 PP), and Feeblemind (40 PP)**. The remaining twelve rows are still open and are listed below.

### Cause Fear

Artifact Cause Fear uses the printed **120-foot range** and **2-turn duration**. One living target makes a **Saving Throw vs. Spells**. On failure, the common forced-retreat machinery is used rather than creating a second fear-movement subsystem. A monster/NPC flees at its next represented movement opportunity; a player character spends the affected round moving away and cannot attack or cast during that forced retreat. The timed artifact effect expires after the two-turn duration. The existing Remove Fear procedure recognizes the artifact fear state so represented magical fear can be removed through the same source-defined recovery path.

### Sleep

Artifact Sleep uses the Table 2 overrides of **240-foot range, a 40-foot square, a fixed 20-Hit-Die budget, and a fixed 20-turn duration**. The underlying Mentzer Sleep eligibility remains in force: the victims must be represented living **normal** creatures of **4+1 Hit Dice or less**; Undead, Constructs, enchanted/fantastic categories, and creatures explicitly marked immune to Sleep are excluded. There is **no saving throw**. Eligible recipients are processed lowest-Hit-Dice first and a creature is never partially put to sleep when the remaining HD budget is insufficient. Sleep persists as timed state and the target automatically wakes when the artifact effect expires.

The ordinary spell also permits a sleeping creature to be awakened by physical force such as a slap or kick. The engine does not yet have a universal wake-another-creature interaction command, so that manual-waking branch remains an explicit integration gate rather than being fabricated through unrelated damage code.

### Charm Person and Charm Monster

Artifact Charm Person uses the Master creature-category rule: represented **Humans, Demi-humans, and Humanoids** are eligible; living subjects outside those categories are not. An eligible target at up to **120 feet** makes a **Saving Throw vs. Spells**. Failure records a live charm relationship and causes a represented hostile monster to stop participating as an ordinary enemy.

Artifact Charm Monster likewise uses a **120-foot range** and a Spell save but extends eligibility to represented living creatures other than **Undead and Constructs**, subject to explicit charm immunity. The artifact Table 2 quantity is enforced: it may affect **up to 18 creatures of 3 HD or less**, or **one creature of more than 3 HD**. A declaration that tries to mix a multi-target use with a greater-than-3-HD creature is rejected before PP expenditure.

Mentzer supplies an optional detailed Intelligence-based schedule for later saving throws against continuing charm. This checkpoint records the charm state but does **not** silently enable that optional schedule. Universal target-specific obedience for a charmed player character, including every possible harmful/contradictory command and the dangerous-situation resave trigger, is also not yet routed through one common command predicate. Those are explicit charm-integration tasks, not missing initial charm resolution.

### Calm Others

Calm Others implements the Master artifact description directly: up to **40 total Hit Dice** of represented creatures within **120 feet** may be selected, **no saving throw applies**, and the referee reaction procedure is immediately rolled on the normal **2d6 Monster Reaction table with +4**. The resulting reaction is recorded. A cautious, neutral, or friendly result ends the selected represented monsters' immediate hostility; an attack/aggressive result leaves them hostile.

This bounded handler currently targets represented monster/NPC combatants, where the Monster Reaction table has defined engine meaning. If a calmed creature is later attacked, a universal event-driven re-hostility rule has not yet been routed through every damage producer; that remains a cross-system integration edge.

### Feeblemind

Artifact Feeblemind uses the printed **240-foot range** and only accepts a represented **Magic-User, Elf, or spell-casting monster**. The victim makes a **Saving Throw vs. Spells at -4**. On failure, effective Intelligence becomes **2**, the subject is marked helpless, and the common action gates prevent movement, attacks, and spellcasting while the condition remains. This is a persistent condition rather than an arbitrary timed approximation.

The existing Cureall path removes the represented Feeblemind state, matching Mentzer's listed cure. The ordinary spell also permits Dispel Magic at the normal success chance; the project's general Dispel Magic layer does not yet universally discover every bespoke condition flag, including this new artifact Feeblemind state. That Dispel integration remains explicitly open.

### A2 status after v0.4.13

A2 is **PARTIAL: 6/18 printed rows implemented**. The remaining rows are **Confusion, Control Plants, Charm Plant, Geas Another, Control Animals, Control Lesser Undead, Mass Charm, Open Mind, Control Giants, Control Greater Undead, Control Dragons, and Control Humans**. The next useful tranche should start with Confusion and the control/charm procedures that can reuse the new mental-effect eligibility and persistence helpers, while retaining source-specific target limits, saves, durations, and command restrictions.

### Validation

The finished v0.4.13 `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic Chromium core harness was executed against the exact integrated document three consecutive times through the project's `KnownWorldTestHarness`:

```text
Build: 0.4.13
Tests: 345 / 345 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
```

Six new regressions verify: (1) the six new A2 registry rows, printed PP costs, and fixed table parameters; (2) Cause Fear's failed-save forced retreat and duration state; (3) Sleep's fixed 20-HD budget, 20-turn duration, normal-creature eligibility, lowest-HD-first allocation, and no-save resolution; (4) Charm Person category eligibility plus Charm Monster's eighteen-3-HD-or-less versus one-greater-than-3-HD targeting boundary; (5) Calm Others' 40-HD ceiling, no-save 2d6+4 reaction procedure, and immediate hostility transition; and (6) Feeblemind's -4 Spell save, effective Intelligence 2, helpless common-action gating, and Cureall removal. All preceding 339 deterministic tests pass unchanged.

## v0.4.14 — Confusion and first bounded control powers

This checkpoint advances Master Artifact **A2 Direct Mental Attacks** from **6/18 to 9/18 printed rows** under the same source hierarchy: **Mentzer D&D - BECM.pdf is primary** and the **Rules Cyclopedia.pdf is secondary**. The new bounded handlers are **Confusion (25 PP), Control Animals (60 PP), and Control Lesser Undead (70 PP)**.

### Confusion

Artifact Confusion uses the printed **120-foot range**, **30-foot radius**, **up-to-18-creature** area, and **12-round** duration. Creatures below **2+1 HD** receive no saving throw. Creatures of **2+1 HD or more** make a Saving Throw vs. Spells each represented round while they remain in the area. A confused creature receives the printed per-round **2d6** action result: **2–5 attack the caster's party, 6–8 do nothing, 9–12 attack its own party**. The effect persists as a tracked combat effect rather than being collapsed into one initial save.

### Control Animals

Artifact Control Animals lasts **20 turns** and can affect no more than **20 creatures totaling 40 Hit Dice**. Eligibility is bounded to represented **normal or giant animals**, excluding fantastic/magical creatures and intelligent animal races rather than guessing broader zoological categories. Each candidate receives the common Control Saving Throw vs. Spells. Successful control is persistent and command-oriented; suicidal orders are rejected by the common control boundary. When the effect ends, represented animal subjects enter the source-defined afraid/release state.

### Control Lesser Undead

Artifact Control Lesser Undead lasts **20 turns**, can affect no more than **10 undead totaling 20 Hit Dice**, and rejects any candidate above **7 Hit Dice**. Each target receives a Saving Throw vs. Spells. Successful victims receive persistent control state for the artifact duration. On release, controlled undead return to hostile disposition rather than remaining friendly by accident.

### A2 status after v0.4.14

A2 is now **PARTIAL: 9/18 printed rows implemented**. Remaining rows are **Control Plants, Charm Plant, Geas Another, Mass Charm, Open Mind, Control Giants, Control Greater Undead, Control Dragons, and Control Humans**. The next coherent tranche should reuse the new persistent control/charm machinery while preserving each row's printed type, count, Hit-Die, duration, save, and command restrictions.

### Validation

The finished v0.4.14 `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic Chromium core harness was executed against the exact integrated document three consecutive times through `window.KnownWorldTestHarness.runCore({display:false})`:

```text
Build: 0.4.14
Tests: 348 / 348 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
```

Three new regressions verify: (1) Confusion's 30-foot grouping, 12-round persistence, low-HD no-save boundary, and per-round action state; (2) Control Animals' animal eligibility, 40-HD / 20-creature ceiling, Saving Throw vs. Spells, 20-turn persistence, and release state; and (3) Control Lesser Undead's undead eligibility, maximum-7-HD individual ceiling, 20-HD / 10-creature ceiling, saving throw, 20-turn persistence, and hostile release. All preceding **345 deterministic tests pass unchanged**.

## v0.4.15 — Control Plants, Charm Plant, and Geas Another

This checkpoint advances Master Artifact **A2 Direct Mental Attacks from 9/18 to 12/18 printed rows**. The source hierarchy remains unchanged: **Mentzer D&D - BECM.pdf is primary**, with the Rules Cyclopedia used only as compatible secondary clarification.

### Control Plants

Artifact **Control Plants (35 PP)** follows Table 2's **30-foot × 30-foot area** and **20-turn duration**, together with the underlying Expert magic-item procedure's **60-foot reach**. Represented plant-like creatures inside the selected square receive the common Control **Saving Throw vs. Spells**. Failed saves create persistent control state, stop ordinary hostile participation, and expire cleanly after 20 turns while restoring the subject's prior represented hostility state.

The underlying Control procedure requires the controller to see the victims and forbids suicidal orders. The engine preserves those boundaries. Ordinary unkeyed vegetation is not instantiated as creature objects, so the source-defined ability of controlled normal plants to **entangle without causing damage** remains referee/environment input rather than being fabricated as monster damage or a generic combat condition.

Plant classification is deliberately conservative. Explicit `plantLike` runtime metadata is accepted, and the canonical names already identified by the source examples (such as treants and shriekers) are recognized. Universal plant/fungus classification across all 607 catalogue records remains a bestiary-integration task rather than an inferred semantic sweep over descriptive prose.

### Charm Plant

Artifact **Charm Plant (45 PP)** uses the printed **120-foot range** and the source quantity structure of **1 tree / 6 medium bushes / 12 small shrubs / 24 small plants**. The engine preserves those as **alternative categories rather than inventing a mixed-allocation formula**: one tree, up to six medium bushes, up to twelve small shrubs, or up to twenty-four small plants. Mixed size classes are rejected because Mentzer does not supply a conversion rule. A represented plant-like monster without finer source-sized metadata is conservatively treated as the one-tree category instead of being guessed into a smaller class. Normal plants receive no save in the spell; represented plant-like monsters make a **Saving Throw vs. Spells**.

There is an internal wording conflict in the consolidated Mentzer text: the spell heading gives **Duration: 3 months**, the artifact Table 2 row also gives **DR 3 mon**, but a later sentence in the spell body says the plants remain charmed for six months. For the artifact power, v0.4.15 follows the artifact table's explicit **3-month** value (and the matching spell heading), represented as **90 campaign days** using the engine's established 30-day campaign-month convention. This is recorded as a source ruling rather than silently blending the contradictory durations.

The live state marks successfully affected plant-like monsters as charmed/friendly and restores their previous represented charm/hostility fields when the artifact duration expires. Full command semantics for arbitrary stationary vegetation—entangling passers-by, inability to move, and other tasks limited by plant capability—remain referee/AI mediated where the engine has no terrain-object actor.

### Geas Another

Artifact **Geas Another (50 PP)** uses the printed **30-foot range**. Invocation requires a represented target plus a stated instruction (`target: instruction`). The victim makes a **Saving Throw vs. Spells**. Failure stores a persistent geas, its exact instruction, and an effective **40th-level artifact caster source**, so the existing Remove Geas procedure can compare caster levels and clear the same represented state.

Mentzer explicitly requires referee judgment here: the stated action must be **possible** and **not directly fatal**, or the geas returns upon the caster; if a valid victim ignores it, the resulting penalties are **decided by the DM**. The engine therefore does not invent a universal natural-language test for "possible" or "directly fatal," nor does it fabricate a standard violation penalty. Those branches remain **IMPLEMENTED / REFEREE INPUT**. The deterministic engine handles target/range, saving throw, persistent instruction/source state, and Remove Geas integration after the referee/AI accepts the instruction as source-legal.

### A2 status after v0.4.15

A2 is now **PARTIAL: 12/18 printed rows implemented at a bounded executable or referee-input level**. Remaining rows are **Mass Charm, Open Mind, Control Giants, Control Greater Undead, Control Dragons, and Control Humans**. The next efficient tranche is the four typed control powers—Giants, Greater Undead, Dragons, and Humans—because they can reuse the persistent control machinery while preserving their distinct type/count/HD restrictions; Mass Charm and Open Mind can then close the category.

### Validation

The finished v0.4.15 `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic Chromium core harness was executed against the exact integrated document three consecutive times through `window.KnownWorldTestHarness.runCore({display:false})`, while Chromium runtime and browser-log error channels were monitored:

```text
Build: 0.4.15
Tests: 351 / 351 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Browser log warnings/errors: 0
```

Three new regressions verify: (1) Control Plants' 60-foot reach, selected represented targets fitting one 30-foot square, Spell save, 20-turn persistence, and PP cost; (2) Charm Plant's plant eligibility, source-preserving alternative 1/6/12/24 category limits, 120-foot range, 45-PP cost, and Table 2 three-month/90-day persistence; and (3) Geas Another's `target: instruction` requirement, 30-foot range, Spell save, persistent instruction, effective 40th-level source metadata, and 50-PP cost. All preceding **348 deterministic tests pass unchanged**.

## v0.4.16 — Complete bounded Master Artifact A2 registry

This checkpoint completes bounded executable registry coverage of **all 18 printed Master Artifact A2 Direct Mental Attacks** under the established authority order: **Mentzer D&D - BECM.pdf is primary**, and the Rules Cyclopedia remains secondary clarification only where compatible. The six final rows are **Mass Charm (75 PP), Open Mind (80 PP), Control Giants (85 PP), Control Greater Undead (90 PP), Control Dragons (95 PP), and Control Humans (100 PP)**.

### Mass Charm

Artifact **Mass Charm** uses the printed **120-foot range**, **30 total levels/Hit Dice**, and **−2 penalty to each Saving Throw vs. Spells**. A creature of **31 or more levels/Hit Dice** is ineligible. Successful victims enter the same persistent charm state used by the earlier charm handlers rather than receiving a second incompatible charm representation.

The underlying Companion spell says each charm's continuing duration is governed by the victim's Intelligence and that an attack by the caster automatically breaks that victim's charm while witnessing charmed creatures may make another save. The engine already records persistent charm, but it does not yet schedule the full Intelligence-based daily/weekly/monthly resave lifecycle or universally route every attack producer through the caster-attack/witness-resave rule. Those are now **A2 cross-system integration edges**, not missing Mass Charm registry behavior.

### Open Mind

Artifact **Open Mind** is the reversed **Mind Barrier** procedure. It requires **touch**; in combat, an unwilling victim requires the printed normal hostile Hit Roll. The artifact Table 2 row specifies the **−8 saving-throw penalty** but supplies no replacement duration, so the implementation uses the underlying spell duration of **1 hour per caster level**. Artifact spell-backed effects resolve at 40th level, producing a **40-hour** Open Mind duration.

The common saving-throw path now recognizes the Open Mind state and applies **−8** to represented mind-influencing attacks, including the A2 families already classified by Mentzer as charm, confusion, control, fear, feeblemind, sleep, and similar mental effects. This is the inverse of the existing Mind Barrier +8 hook rather than a special-case modifier attached only to one spell.

### Control Giants

Artifact **Control Giants** lasts **20 turns** and affects no more than **four giants of one represented giant type**. The source's control-item procedure supplies the Saving Throw vs. Spells and forbids suicidal orders. Mixed giant types are rejected before PP expenditure instead of being treated as one legal selection. Controlled giants return to hostile disposition when the effect expires.

### Control Greater Undead

Artifact **Control Greater Undead** lasts **20 turns**, may affect **any represented undead**, and enforces both printed ceilings: **40 total Hit Dice** and **20 creatures**. Each candidate receives the common Control Saving Throw vs. Spells. Successful subjects receive persistent control state and return to hostile disposition when control ends.

This power is separate from Control Lesser Undead rather than silently replacing it: the lesser form retains its maximum-7-HD-per-creature, 20-HD-total, 10-creature limits, while Greater Undead uses the wider 40-HD/20-creature artifact row.

### Control Dragons

Artifact **Control Dragons** lasts **20 turns** and affects **one represented dragon type per use**, with the printed alternative quantity of **up to three Small dragons or one Large dragon**. Mixed dragon types and mixed Small/Large selections are rejected. Where the runtime profile does not establish whether the dragon is Small or Large, the engine refuses to guess.

The underlying Dragon Control procedure explicitly says controlled dragons obey commands **except for casting spells** and become hostile when control ends. v0.4.16 therefore marks controlled dragons with a persistent no-spellcasting state and routes that state through the common `masteryCannotCast` action gate rather than leaving it as descriptive metadata only. Expiration clears the prohibition and restores hostile disposition.

### Control Humans

Artifact **Control Humans** lasts **20 turns** and is deliberately restricted to represented **humans**, rather than folding demihumans or merely humanoid monsters into the category. Each selected human may have no more than **7 HD/levels**, and the complete selection may contain no more than **40 total HD/levels** or **20 creatures**. The common Control Saving Throw vs. Spells applies. Previous represented hostility state is preserved and restored when control ends rather than forcing every released human to a single invented reaction.

### A2 status after v0.4.16

A2 is now **IMPLEMENTED / BOUNDED REGISTRY: 18/18 printed rows have executable support**. The remaining A2 work is integration, not missing power rows: Intelligence-based charm resave scheduling; universal command/obedience handling for charmed or controlled PCs/NPCs; caster-attack charm break and witness resaves; re-hostility/reaction routing through every possible damage producer; manual waking for Sleep; universal Dispel/Anti-Magic discovery of bespoke mental-state flags; and unusual monster immunities or producers that bypass common mental/control predicates.

The artifact registry roadmap can therefore move to the next still-open Table 2 categories while A2 integration is tightened alongside the shared spell/control framework.

### Validation

The finished v0.4.16 `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic Chromium core harness was then executed **three consecutive times** against the exact integrated document through `window.KnownWorldTestHarness.runCore({display:false})`:

```text
Build: 0.4.16
Tests: 357 / 357 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3
Runtime exceptions/page errors: 0
Console errors: 0
```

Six new regressions verify: (1) the final A2 registry count and printed PP/limit metadata; (2) Mass Charm's 30-HD aggregate ceiling, 31+-HD rejection, −2 Spell save, and charge cost; (3) Open Mind's hostile touch requirement, 40-hour artifact duration, and −8 common mental-save modifier; (4) Control Giants' one-type/four-creature boundary; (5) Greater Undead and Dragon Control limits, including the dragon no-spellcasting action gate and hostile release; and (6) Human Control's human-only, maximum-7-HD, 40-HD-total, 20-creature boundaries. All preceding **351 deterministic tests pass unchanged**.

The container's managed Chromium policy blocks both `file:` and localhost navigation, so the validation wrapper injects the exact self-contained HTML into a headless Chromium `about:blank` document. That opaque test origin denies IndexedDB and emits five expected journal-availability warnings per run. Those are validation-host limitations rather than application exceptions; the harness reports no failures, page errors, or console errors.



## v0.4.17 — First bounded Master Artifact A4 Miscellaneous Attack Forms

This checkpoint begins deterministic implementation of Master Artifact **A4 Miscellaneous Attack Forms** while preserving the project's source hierarchy: **Mentzer D&D - BECM.pdf is primary**, and Rules Cyclopedia remains secondary only where compatible. Six of the twenty-four printed A4 rows now have bounded executable support: **Blight (10 PP), Turn Undead as Cleric L6 (20 PP), Turn Undead as Cleric L12 (45 PP), Dispel Magic (55 PP), Turn Undead as Cleric L24 (70 PP), and Turn Undead as Cleric L36 (95 PP)**.

### Blight

Artifact **Blight** uses the reversed Bless procedure named by Table 2. It preserves the printed **60-foot range**, **20-foot-square effect**, **six-turn duration**, and **Saving Throw vs. Spells for each victim**. A failed save produces one nonstacking live `artifact_blight` state. While active, the target suffers the printed **−1 Morale, −1 Hit rolls, and −1 damage rolls**. The Hit-roll modifier is routed through the common attack resolver for PCs and monsters; weapon and represented natural-attack damage rolls use the same penalty; monster Morale checks, including the special Weapon Mastery Despair Morale check, read the reduced Morale score. A replacement Blight refreshes rather than stacks the −1 penalty.

### Turn Undead artifact powers

The four A4 Turn Undead rows are now executable at their exact printed cleric-equivalent levels and durations:

| Artifact power | PP | Granted turning level | Duration |
|---|---:|---:|---:|
| Turn Undead as Cleric L6 | 20 | 6 | 1 turn |
| Turn Undead as Cleric L12 | 45 | 12 | 2 turns |
| Turn Undead as Cleric L24 | 70 | 24 | 3 turns |
| Turn Undead as Cleric L36 | 95 | 36 | 3 turns |

Activation creates a timed artifact effect on the user. The ordinary **Turn Undead** action then uses the existing Mentzer turning table, target ordering, once-per-undead-group attempt rule, turning/destruction results, and HD budget. A non-cleric may turn while the artifact effect is active. If a Cleric uses one of these powers, the engine uses the **higher of the character's native Cleric level and the artifact-granted level** rather than weakening an already superior cleric. A newly activated artifact Turn Undead power replaces an older artifact turning effect rather than stacking several cleric levels.

### Dispel Magic

Artifact **Dispel Magic (55 PP)** is intentionally mapped into the existing BECM Dispel Magic implementation instead of receiving a parallel bespoke dispelling subsystem. Artifact spell-backed powers resolve at effective **40th caster level**. The live spell procedure therefore supplies the printed **120-foot range**, **20-foot cube**, automatic destruction of represented spell effects from equal/lower-level casters, and **5% failure per caster-level difference** against a higher-level source. This preserves the existing Anti-Magic/Dispel integration and avoids inconsistent duplicate logic.

### A4 status after v0.4.17

A4 is **PARTIAL: 6/24 printed rows implemented at a bounded executable level**. The remaining rows are **Darkness, Light, Set Normal Trap 50%, Curse, Disarm Attack, Continual Darkness, Pick Pockets 50%, Set Normal Trap 70%, Silence 15' Radius, Polymorph Other, Babble, Pick Pockets 75%, Appear, Set Normal Trap 90%, Polymorph Any Object, Pick Pockets 100%, Anti-Magic Ray, and Blasting**.

Those remaining rows divide naturally into several implementation groups: light/darkness/silence area-state integration; temporary thief/trap/disarm skill grants; Curse and Babble status handling; Polymorph procedures; Appear; the 100% Anti-Magic Ray; and Blasting's directional damage/deafness geometry. They should remain source-gated until each underlying procedure is connected to the common engine rather than represented as descriptive-only powers.

### Validation

The finished v0.4.17 `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic Chromium core harness was executed **three consecutive times** against the exact integrated build through `window.KnownWorldTestHarness.runCore({display:false})`:

```text
Build: 0.4.17
Tests: 361 / 361 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
```

Four new regressions verify: (1) all six new A4 registry rows, exact PP costs, Blight range/area/duration, exact Turn Undead durations, and Dispel Magic delegation; (2) Blight's six-turn live state and −1 Hit-roll path; (3) a non-cleric receiving and using level-6 artifact Turn Undead authority; and (4) the higher-of-native-or-artifact turning-level rule for a Cleric. All preceding **357 deterministic tests pass unchanged**.

As in v0.4.16, the managed Chromium validation origin denies IndexedDB and emits the expected journal-availability warnings. These are test-host limitations, not engine exceptions; there are no test failures, page errors, or console errors.

## v0.4.18 — A4 Light, Darkness, Silence, and Babble integration

This checkpoint continues deterministic implementation of Master Artifact **A4 Miscellaneous Attack Forms** under the same source hierarchy: **Mentzer D&D - BECM.pdf is primary**; Rules Cyclopedia is secondary only where compatible. Five additional printed rows now have bounded executable support: **Darkness (15 PP), Light (20 PP), Continual Darkness (30 PP), Silence 15' Radius (40 PP), and Babble (50 PP)**. Together with v0.4.17, A4 is now **11/24**.

### Darkness and Light

The ordinary artifact **Darkness** and **Light** rows preserve Table 2's **120-foot range, 30-foot-diameter effect, and 46-turn duration**. The bounded engine form attaches the area to one represented creature so the field can move with that creature; arbitrary empty-point placement and carried-object anchoring remain separate targeting work. Ordinary Light and ordinary Darkness directly cancel one another rather than stacking. The artifact Light state now satisfies the party's coarse dungeon-visibility predicate when carried by a living party member. Ordinary Darkness suppresses ordinary sight at that coarse party-location level while still allowing represented Dwarf/Elf infravision, matching the normal Darkness distinction.

The source's separate offensive branch—casting Light or Darkness specifically at a creature's eyes and resolving blindness—has not been silently folded into every creature-targeted use. That branch remains an explicit targeting integration edge so ordinary area illumination/darkness is not confused with an eye attack.

### Continual Darkness

Artifact **Continual Darkness** uses the printed **120-foot range and 30-foot-radius effect** and, because the Table 2 row supplies no finite duration, remains persistent until a source-valid removal/cancellation procedure ends it. The bounded implementation attaches the field to a represented creature and routes it into dungeon visibility. In this represented form Continual Darkness overrides torches, lanterns, ordinary Light and Dwarf/Elf infravision. General arbitrary-area placement, object anchoring, universal Continual Light cancellation, and full Dispel Magic discovery of every artifact-area record remain integration work.

### Silence 15' Radius

Artifact **Silence 15' Radius** uses the printed **180-foot range, 30-foot-across sphere (15-foot radius), and 12-turn duration**. When cast on a represented creature, that creature makes a Saving Throw vs. Spells. On a failed save the sphere follows the target; on a successful save the target is not bound to the effect and the silence remains fixed at the cast position. In combat, the live 3D distance layer determines whether a subject is inside the field. Outside combat, the site/location layer preserves the static-versus-following distinction at the engine's available spatial resolution.

The common spellcasting gate now checks active Silence fields, so a represented creature inside the sphere cannot cast while the field applies. The broader communication layer and every non-spell verbal action remain separate consumers; the power does not invent restrictions beyond what the source supplies.

### Babble

Artifact **Babble** uses the printed **60-foot range, 40-turn duration, and Saving Throw vs. Spells at -2**. Failure creates a persistent communication-garbled state. The state is intentionally **not** treated as silence, paralysis, or feeblemind: the source specifically permits spellcasting while preventing meaningful communication and command-word use. The engine therefore leaves ordinary spellcasting available while exposing Babble as a live status for present and future communication/command-word consumers. Universal NPC dialogue suppression, telepathy/writing consumers, and command-word magic-item routing remain explicit cross-system work.

### A4 status after v0.4.18

A4 is **PARTIAL: 11/24 printed rows implemented at a bounded executable level**. The remaining thirteen are **Set Normal Trap 50%, Curse, Disarm Attack, Pick Pockets 50%, Set Normal Trap 70%, Polymorph Other, Pick Pockets 75%, Appear, Set Normal Trap 90%, Polymorph Any Object, Pick Pockets 100%, Anti-Magic Ray, and Blasting**.

The next efficient tranche is the temporary thief/combat-skill group—Set Normal Trap, Pick Pockets, and Disarm Attack—because the engine already has live thief-skill and Fighter Disarm procedures that can consume exact temporary artifact percentages/durations. The polymorph/Appear/Anti-Magic-Ray/Blasting group should follow after those shared hooks are finished.

### Validation

The finished v0.4.18 `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic Chromium core harness was executed **three consecutive times** against the exact integrated build:

```text
Build: 0.4.18
Tests: 365 / 365 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
```

Four new regressions verify: (1) all eleven currently bounded A4 registry rows and the exact new PP/range/duration metadata; (2) Light/Darkness moving 46-turn states, direct cancellation, and Light's dungeon-visibility integration; (3) persistent Continual Darkness overriding torchlight and infravision; and (4) Silence's failed-save moving field and spellcasting block plus Babble's -2 Spell save, 40-turn duration, and explicit preservation of spellcasting. All preceding **361 tests pass unchanged**.

The managed headless test origin still denies IndexedDB and therefore emits the same five expected journal-availability warnings per run. These are validation-host limitations, not page errors or application exceptions.


## v0.4.19 — A4 Set Normal Trap, Pick Pockets, and Disarm Attack

This checkpoint continues Master Artifact **A4 Miscellaneous Attack Forms** with the seven temporary skill/combat rows that can be resolved through procedures already present in the Mentzer engine: **Set normal Trap 50% (20 PP), Disarm Attack (25 PP), Pick Pockets 50% (30 PP), Set normal Trap 70% (40 PP), Pick Pockets 75% (55 PP), Set normal Trap 90% (65 PP), and Pick Pockets 100% (80 PP)**. Each of these powers lasts the printed **6 turns**. Together with v0.4.17-v0.4.18, A4 is now **18/24** at bounded executable coverage.

### Pick Pockets 50%, 75%, and 100%

Activating one of the three artifact Pick Pockets rows grants the possessor the printed base percentage for six turns, including to a character who is not a Thief. The actual attempt is deliberately routed through the engine's ordinary BECMI Pick Pockets procedure rather than a second artifact-only theft subsystem. The victim's represented level/Hit Dice therefore reduces the chance by **5 percentage points per level/HD**, a normal failed attempt may go unnoticed, and a failed roll greater than twice the adjusted chance—or a roll of 100—causes the attempt to be noticed. The attempt still advances the ordinary ten-minute procedure time and therefore allows the normal artifact recharge clock to advance as well.

The engine does not invent pocket contents. A successful attempt reaches the established victim's pocket without notice; transferring a specific object still requires that the object already exist in represented inventory/state or be supplied by referee-authored content. This preserves the existing information boundary rather than generating treasure from a skill roll.

### Set normal Trap 50%, 70%, and 90%

The three Set normal Trap rows grant their exact printed percentage for six turns. A use must include a physical description of the **normal trap** being set. The engine makes the hidden percentile check and, on success, creates a persistent physical-state trap record with the setter, location, armed state, stated design, source, and percentage used.

Table 2 supplies the ability percentage and duration but does not define a universal trap trigger, damage packet, construction inventory, or geometry for every possible normal trap. The engine therefore does **not** fabricate those details. The trap's stated physical design/referee ruling remains authoritative for its exact trigger and consequence. This row is consequently **IMPLEMENTED / REFEREE INPUT** at the point where the printed rule itself stops being numeric.

### Disarm Attack

Artifact Disarm Attack grants the user temporary qualification to use the engine's already-implemented **Companion Fighter Disarm** procedure for six turns. A weapon is still required, and the attack resolves through the established Disarm d20/Dexterity procedure. The artifact qualification is independent of class, so an otherwise unqualified character can use Disarm while the power remains active. The artifact grant also avoids applying a demihuman class restriction that exists only because of the user's ordinary class option; it does not replace the target's actual represented weapon or the existing Disarm resolution.

This mapping is intentionally narrow. The Master artifact row says **Disarm Attack (DR 6T)** without defining a second, artifact-specific disarming formula, so reusing the existing BECM Disarm procedure avoids inventing a competing mechanic.

### A4 status after v0.4.19

A4 is **PARTIAL: 18/24 printed rows implemented at a bounded executable level**. The six remaining rows are **Curse, Polymorph Other, Appear, Polymorph Any Object, Anti-Magic Ray, and Blasting**.

The next artifact pass should concentrate on these six. Polymorph Other/Any Object can build on the existing transformation foundation; Anti-Magic Ray can build on the live Master Anti-Magic geometry; Curse remains referee-bounded where the underlying curse is not numerically specified; and Appear/Blasting require their exact spell/area procedures to be reconciled before being marked executable.

### Validation

The finished v0.4.19 `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic Chromium core harness was executed **three consecutive times** against the exact integrated build:

```text
Build: 0.4.19
Tests: 368 / 368 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
```

Three new behavioral regressions plus the expanded A4 registry assertion verify: (1) all eighteen currently bounded A4 rows, exact PP costs, six-turn skill durations, and the 50/70/90 and 50/75/100 percentages; (2) a non-Thief can receive Pick Pockets 100%, use the ordinary represented-NPC procedure, spend exactly 80 PP on activation, and then receive the normal 5-PP Minor-artifact recharge when that ten-minute attempt advances the clock; (3) Set normal Trap 90% persists a successfully described trap without inventing its trigger/damage; and (4) Disarm Attack grants the existing Disarm procedure to an otherwise unqualified character. All preceding **365 tests pass unchanged**.

The managed headless test origin continues to emit the same five expected IndexedDB journal warnings per run. These are validation-host limitations only; there are no page errors, application exceptions, console errors, or deterministic-test failures.

## v0.4.20 — Complete bounded Master Artifact A4 registry

This checkpoint closes the six remaining printed Master Artifact **A4 Miscellaneous Attack Forms** rows and therefore completes A4 at the same bounded standard already used for A1/A2/D1/D2/D3. Mentzer BECM remains primary. Rules Cyclopedia is used only as secondary clarification for the underlying spell/item procedures where Table 2 names a pre-existing effect without reprinting all of its behavior.

The final rows are **Curse (25 PP), Polymorph Other (45 PP), Appear (60 PP), Polymorph Any Object (75 PP), Anti-Magic Ray (90 PP), and Blasting (100 PP)**. Together with v0.4.17-v0.4.19, all **24/24 printed A4 rows** now have an executable handler or an explicit mapping into an already-live BECM procedure.

### Curse

Artifact Curse uses hostile touch and a **Saving Throw vs. Spells**. The deterministic handler exposes the two fully numeric safe limits that can presently feed common live engine predicates without inventing broader campaign consequences: **-4 to attack rolls** and **-2 to all saving throws**. Both persist until a source-valid removal such as Cureall/Remove Curse reaches the represented state. The source also permits open-ended curses, including prime-requisite and reaction consequences; those branches are recognized but deliberately refused by this deterministic command until their affected consumers are universally routed. This prevents a textual curse from being recorded as if all of its consequences were automated.

### Polymorph Other

Polymorph Other uses the printed **60-foot range**, living-target requirement, Spell save, permanent-until-dispelled duration, and the underlying restriction that the new living creature form cannot exceed **twice the victim's Hit Dice/levels**. A specific/unique individual cannot be selected. Hit points remain unchanged. For represented PCs, the common transformation layer now supplies the new creature form's physical AC/THAC0/movement and ordinary encoded natural attacks while original class spellcasting is not retained. Extraordinary powers/tendencies that do not already have common handlers remain explicit integration edges rather than being fabricated.

Represented combat monsters may carry the transformation identity/state, but universal replacement of every monster-specific exceptional procedure with the adopted form remains part of the broader monster-power integration project.

### Appear

Appear implements the reversed Mass Invisibility procedure at the Table 2 limits: **240-foot range, one 20-foot cube, and one-turn prevention of renewed invisibility**. Selected represented invisible creatures in the cube are made visible, existing artifact invisibility effects are ended, and a one-turn `artifact_appear` state makes common invisibility checks return false. Astral/Ethereal cross-plane targets remain excluded by the existing planar boundary rather than being treated as ordinary occupants of the same combat volume.

The engine still lacks a universal object-invisibility registry, so invisible objects not represented through a common effect record remain an explicit object-system integration edge.

### Polymorph Any Object

Polymorph Any Object uses the printed **240-foot range, 10-foot-cube object scale, -4 Spell save, and Table 2 40-240-turn duration band**. The executable branch in this checkpoint covers represented living-creature-to-living-creature changes through the common transformation system. It preserves hit points, enforces the inherited Polymorph Other twice-victim-HD limit plus the artifact-level ceiling, and uses **240 turns** for the represented same/adjacent-kind creature-form branch under Table 2's finite artifact duration override.

Arbitrary terrain/object creation, animal/vegetable/mineral kingdom conversion, general 10-foot-cube object combat profiles, and every object-transfer/physics consequence remain explicit cross-system work. The row is therefore complete at the project's **bounded registry** standard, not a claim of universal object physics.

### Anti-Magic Ray

Anti-Magic Ray now creates a **100% attack-form Anti-Magic ray for one turn**, using the existing Master Anti-Magic state rather than a new artifact-only cancellation system. The ray is tied to the user and represented aim target and suppresses magic through the same common Anti-Magic checks already used by spells/items. Table 2 gives duration and 100% effect but does not print an independent ray width; the 3D extension currently uses the engine's established **10-foot finite-ray width convention** so the effect has an executable spatial volume. That width is an explicit engine geometry convention, not presented as a newly discovered Mentzer number, and remains eligible for later source-specific refinement.

### Blasting

Blasting uses Table 2's **60-foot length, 20-foot terminal width, 2d6 damage, and deafening rider**. One 2d6 damage packet is rolled for the represented cone and applied to each creature in it. Each victim then makes a **Saving Throw vs. Spells**; failure produces one turn of represented deafness. The cone uses the existing true-3D positional solver, and creatures exactly co-located at the origin point are not treated as occupying the cone merely because the mathematical cone radius there is zero.

The secondary Horn of Blasting procedure also damages constructions/ships. Universal structural targeting for this artifact row remains a cross-system edge because arbitrary structures are not all represented through the same creature-damage interface; no substitute structure damage was invented.

### A4 completion state

A4 is now **IMPLEMENTED / BOUNDED REGISTRY: 24/24 printed rows**. Remaining work in this category is integration-only: arbitrary empty-point/object anchors, object invisibility, universal Remove Curse/Dispel discovery, reaction/prime-requisite/open-ended Curse consumers, full monster-form extraordinary-power replacement, Polymorph Any Object's general animal/vegetable/mineral and terrain/object physics, source-refined Anti-Magic-Ray width if a more specific governing procedure is found, and Blasting against represented structures/vessels.

The next artifact-table registry work should proceed to **A5**, then the remaining **B/C/D4/D5** categories, followed by adverse effects, autonomous artifact self-defense/power selection, and the published Known Artifacts.

### Validation

The finished v0.4.20 `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic Chromium core harness was executed **three consecutive times** against the exact integrated document:

```text
Build: 0.4.20
Tests: 374 / 374 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
```

Six new behavioral regressions plus the expanded registry assertion verify: (1) all 24 A4 rows and final printed PP/geometry parameters; (2) Curse's -4 attack branch and Cureall removal; (3) Polymorph Other's failed-save transformation, unchanged hit points, permanent-until-dispelled state, and live transformed PC AC; (4) Appear ending represented invisibility and suppressing renewed effective invisibility for one turn; (5) Polymorph Any Object's -4 save and finite 240-turn represented creature branch; (6) Anti-Magic Ray's one-turn 100% attack-form zone and cleanup; and (7) Blasting's 60-by-20 cone, shared 2d6 damage packet, and one-turn failed-save deafness. All preceding **368 tests pass unchanged**.

The managed headless test origin continues to emit the same five expected IndexedDB journal warnings per run. These are validation-host limitations only; there are no page errors, application exceptions, console errors, or deterministic-test failures.

## v0.4.21 — A3/A5 source reconciliation; complete bounded A5 registry; B1 begins

This checkpoint resolves a source-label problem that had caused the project to treat the **Bonuses to attacks** table as A3. The extracted Master artifact table text repeats an A3 label, but the published Known Artifact examples classify these bonus powers as **A5**: most explicitly, the **Rainbow Scarf of Sinbad** lists **A5 Bless 10**. The engine therefore preserves two distinct categories: **A3 Attacks that Stop or Slow** and **A5 Bonuses to attacks**. This is recorded as a source-internal labeling inconsistency rather than silently rewriting the source.

A5 now has bounded executable coverage for all **29/29 printed bonus rows**. The newly reconciled procedures include Bless; the +2/+4/+6 Turn Undead bonus rows and their +1d6/+2d6/+3d6 successful-HD additions; Leap 30'/60'/90' with +2/+4/+6 Hit bonuses on the concluding attack; Striking; and the artifact Smash procedure. Existing Hit-roll, weapon-damage, weapon-strength, double/triple weapon-damage, and spell-damage bonus rows are retained under the corrected A5 category.

B1 **Aids to Normal Senses** also begins in this checkpoint with **7/19 printed rows**: Read Languages, Read Magic, Infravision, Hear Noise 50%, Find Secret Doors, Hear Noise 90%, and Hear Noise 140%. These route through already represented reading, scroll-identification, visibility, listening, and secret-search procedures rather than creating parallel mini-systems.

### v0.4.21 validation

The integrated v0.4.21 engine passed **384/384 deterministic core tests** on three consecutive Chromium runs with state isolation preserved and no page or console errors.

## v0.4.22 — Complete bounded Master Artifact A3 Attacks that Stop or Slow

This checkpoint implements all **12/12 printed A3 Attacks that Stop or Slow rows** and reconciles the audit terminology so A3 and A5 no longer overlap.

The implemented A3 registry is:

| PP | Power | Implemented bounded procedure |
|---:|---|---|
| 10 | Web | 10' range / 10' cube / 48 turns; no save; represented victims are action-disabled. Very strong/giant escape and average-Strength 2d4-turn breaking are timed where the source gives an explicit value. |
| 15 | Hold Animal | 180' range; up to four represented normal/giant animals of one type; Spell save; 40 turns. |
| 20 | Hold Person | 120' range; up to four eligible human/demihuman/human-like creatures; Spell save; a single selected victim receives the underlying -2 save adjustment; 40 turns. |
| 25 | Slow | 240' range; up to 24 represented creatures in the bounded area selection; Spell save; 3 turns; movement and attack rate are halved while spellcasting/magic-device use is **not** disabled. |
| 35 | Hold Monster | 120' range; up to four non-undead creatures; Spell save; single-target -2 adjustment; 46 turns. |
| 45 | Turn Wood | 30' activation range; a represented 120'-wide by 60'-high wave advances 10' per round to 360'; 40 turns. Represented wooden weapons caught by the wave are unusable while trapped. |
| 50 | Flesh to Stone | 120' range; one living creature; save vs. Turn to Stone; failed save creates persistent petrification until source-valid reversal/cure. |
| 60 | Power Word Stun | No save; <=35 hp = fixed 12 rounds, 36-70 hp = fixed 6 rounds, 71+ hp unaffected. |
| 75 | Dance | Touch Hit Roll, no save, fixed artifact duration 8 rounds; attacks, spellcasting, spell-like abilities, and deliberate escape are blocked; -4 saves and +4 AC. |
| 85 | Power Word Blind | No save; <=40 hp = fixed 4 days; 41-80 hp = 2d4 hours; 81+ hp unaffected; -4 saves and +4 AC. |
| 100 | Life Trapping | Man-sized/Medium or smaller represented victim, Spell save, up to 20 concurrent trapped creatures per artifact; trapped creatures are unavailable, powerless, do not age, and need no food/air until release. |
| 100 | Maze | 60' range, no save; Astral-maze duration is driven by Intelligence: Int 1-8 = 1d6 turns, 9-12 = 2d20 rounds, 13-17 = 2d4 rounds, 18+ = 1d4 rounds. |

### Cross-system integration added in v0.4.22

A3 conditions now feed the common action and defense predicates instead of existing only as descriptive flags. Web, Hold, petrification, Power Word Stun, Dance, Maze, and Life Trapping prevent ordinary actions through the same shared gates used by combatants. Artifact Slow has its own source-faithful state so it halves movement/attack frequency without inheriting the project Weapon-Mastery binding slow's separate spellcasting prohibition. Dance and Power Word Blind feed the common AC/save calculations. Maze and Life Trapping make a creature unavailable as an ordinary attack target. Stone to Flesh/Cureall-style affliction clearing deactivates matching artifact petrification/blindness effects rather than leaving hidden penalties behind. Permanent artifact destruction now ends active deterministic effects, which also releases represented Life-Trapping occupants.

Turn Wood is routed through the 3D combat layer rather than a flat text flag: its wave advances each combat round and can seize represented wooden equipped weapons. The source also affects loose wooden cargo, devices, doors, ships, and similar objects; those branches remain dependent on broader universal object/structure representation and are not claimed as automated here.

### Deliberately bounded A3 edges

A3 is **IMPLEMENTED / BOUNDED REGISTRY: 12/12 printed rows**, not a claim that every environmental consequence is universally automated. Remaining A3 integration edges include Web destruction by all possible fire producers and fire damage to every creature caught in the burning web; exact free-point placement/geometry for Web and Slow beyond the current represented-target selection; Turn Wood's interaction with arbitrary loose wooden objects, siege devices, ships, and permanent/secured construction; complete cure-level gating for Power Word Blind across every clerical healing producer; and the source's mirror/gaze fiction for Life Trapping when a target is not represented as an explicit creature selection.

### Validation

The finished v0.4.22 `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic Chromium core harness was executed **three consecutive times** against the exact integrated document:

```text
Build: 0.4.22
Tests: 390 / 390 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
```

Six new A3 regression groups verify: (1) all 12 true A3 registry rows, PP costs, and fixed Table 2 durations; (2) Hold Person paralysis and Slow's source-faithful half movement/attack behavior without blocking spellcasting; (3) persistent Flesh to Stone plus source-valid removal and fixed Power Word Stun hp bands; (4) Dance and Power Word Blind durations/AC/save penalties; (5) Maze Intelligence bands and Life Trapping availability/release; and (6) Web escape timing plus Turn Wood's represented wooden-weapon capture. All preceding **384 tests pass unchanged**.

The isolated `set_content` validation origin does not grant browser storage APIs, so Chromium emits repeated localStorage/IndexedDB access warnings during harness fixture autosaves. These are validation-host warnings only; the three runs contain **zero page errors and zero console errors** and preserve the harness state-isolation fingerprint.

### Current artifact registry roadmap after v0.4.22

The major A-side attack registry is now closed at the bounded level: **A1 25/25, A2 18/18, A3 12/12, A4 24/24, A5 29/29**. D1/D2/D3 likewise retain complete printed-row coverage. The next registry work should resume with the remaining **B1 12 rows**, then B2-B4, the C categories, and D4-D5. After that, artifact effort should shift from missing rows to the harder cross-system and campaign-authored layers: universal magic/object routing, adverse effects, autonomous defensive behavior, and the published Known Artifacts.



## v0.4.23 — Complete bounded Master Artifact B1 Aids to Normal Senses

This checkpoint completes all **19/19 printed B1 Aids to Normal Senses rows**. The twelve newly completed rows are **Detect New Construction (10 PP), Timekeeping (10 PP), Detect Slopes (15 PP), Speak with Animals (15 PP), Speak with the Dead (25 PP), Speak with Plants (30 PP), Tracking 90% outdoors / 50% indoors (30 PP), Communication (40 PP), Lie Detection (50 PP), Speak with Monsters (60 PP), Tracking 90% anywhere (70 PP), and X-Ray Vision (80 PP)**. The seven earlier B1 rows—Read Languages, Read Magic, Infravision, Hear Noise 50%, Find Secret Doors, Hear Noise 90%, and Hear Noise 140%—remain intact.

### Represented-world sensing rather than invented map knowledge

Detect New Construction and Detect Slopes now query explicit represented site-feature metadata inside their printed ranges. They do **not** manufacture hidden construction, slopes, rooms, or secret topology that the campaign state has not represented. The same source-bounded rule is used for X-Ray Vision: it can reveal explicitly represented hidden spaces through qualifying nonmetal material, but the engine does not invent unseen wall contents merely because the power is active.

### Timekeeping

Timekeeping implements the Master artifact procedure directly. Each paid use creates one exact campaign-time **mark** that remains queryable for up to **24 hours**. The artifact can maintain **three simultaneous marks**; attempting a fourth while three are live is rejected before Power Points are spent. Asking how much time has elapsed from a mark is a read operation and costs no additional PP.

### Tracking

Both Tracking rows use a six-hour active profile and reject trails more than **24 hours old**. The 30-PP version preserves **90% outdoors / 50% indoors**; the 70-PP version preserves **90% anywhere**. Checks are resolved at the source intervals of **one-half mile outdoors** and **240 feet indoors**. Weather, obstacles, and deliberate attempts to obscure the trail do not reduce these magical percentages, matching the artifact procedure. The engine still requires a represented trail/target context; it does not conjure a trail for an entity whose passage is not part of the game state.

### Creature speech, dead questions, and Lie Detection

Speak with Animals, Speak with Plants, and Speak with Monsters expose the source-defined ability to communicate with eligible represented creatures while active; they do not force cooperation or invent the creature's knowledge. Speak with the Dead binds the effect to a represented dead target and enforces the printed **three-question** ceiling. The actual answers remain referee/AI-authored from known campaign facts rather than fabricated by the mechanics layer. Lie Detection binds concentration to a represented creature within **120 feet** and exposes whether the creature is intentionally lying; it does not silently convert that into omniscient factual truth.

### Communication

Communication now uses a paid one-hour artifact window. A living or undead target becomes aware of the attempted contact and may accept or deny it. Acceptance opens up to **one turn of telepathic conversation regardless of distance and even across planes**. Denial records the source-defined **24-hour lockout** against renewed contact with that individual. Acceptance/denial and the conversation content remain represented decisions rather than being fabricated by the resolver.

### X-Ray Vision

X-Ray Vision preserves the artifact-specific limits: **30-foot range**, **one turn** of examination, up to **400 square feet**, and **no penetration of metal**. It may be activated at most **once per hour**; an early re-use attempt is rejected before PP expenditure. Search resolution snapshots the active one-turn sensing state at the start of the search action so a full-turn examination can reveal qualifying represented features before the effect expires at the turn boundary.

### Validation

The finished v0.4.23 `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic Chromium core harness was executed **three consecutive times** against the exact integrated document:

```text
Build: 0.4.23
Tests: 396 / 396 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
```

Six new B1 regression groups verify: (1) three simultaneous 24-hour Timekeeping marks and no-PP rejection of a fourth; (2) both Tracking percentage profiles, the 24-hour trail-age ceiling, six-hour duration, and indoor/outdoor segment lengths; (3) Speak with the Dead's dead-target requirement and exact three-question ceiling; (4) Communication acceptance/denial, cross-plane/distance operation, one-turn conversation, and 24-hour denial lockout; (5) creature-speech eligibility plus bounded Lie Detection; and (6) represented construction/slope sensing and X-Ray's material/range/area/cooldown limits. All preceding **390 tests pass unchanged**.

The injected validation document has no permission to use localStorage or IndexedDB. Consequently the harness produces repeated **storage-access warnings** during autosave/journal paths (approximately 217-219 warnings per run); inspection shows they are limited to the expected `localStorage`/`IDBFactory` access-denied messages. There are **no application console errors, page exceptions, or deterministic-test failures**.

### Current artifact registry roadmap after v0.4.23

The bounded registry now has complete printed-row coverage for **A1 25/25, A2 18/18, A3 12/12, A4 24/24, A5 29/29, B1 19/19, D1, D2, and D3**. The next registry target is **B2 Additional Senses**, followed by B3-B4, the C categories, and D4-D5. After the remaining printed rows are closed, artifact work should shift toward cross-system magic/object routing, adverse effects, autonomous defensive behavior, and the published Known Artifacts.


## v0.4.24 — Complete bounded Master Artifact B2 Additional Senses

This checkpoint completes all **24/24 printed B2 Additional Senses rows**. The registry now contains the seven percentage-based or magical Find Traps entries plus **Predict Weather, Detect Magic, Detect Evil, Know Alignment, Locate Object, Clairvoyance, ESP, Wizard Eye, Detect Invisible, Detect Danger, Choose Best Option, Truesight, Mapmaking, Treasure Finding, Lore, and Find the Path** at the printed Power Point costs and fixed Table 2 limits.

### Find Traps family

The percentage rows preserve the printed **50%, 60%, 70%, 80%, 90%, 100%, and 110%** chances for six turns. They feed the ordinary represented trap-search procedure rather than creating a second trap subsystem. The 35-PP magical Find Traps branch instead uses the source spell form: a represented trap within **30 feet** is sensed for the two-turn duration without revealing or inventing traps that are absent from the keyed site state. Percentage values above 100 are retained exactly because Table 2 prints them that way; the engine does not silently clamp the stored source value.

### Weather and local detection senses

Predict Weather creates a twelve-hour forecast envelope using the artifact table's **40-mile effect** and the Companion/Rules-Cyclopedia clarification that the area is a diameter, yielding a 20-mile radius around the artifact user. The engine exposes only represented/currently generated weather data inside that envelope; it does not manufacture detailed future meteorology beyond the campaign weather procedure.

Detect Magic, Detect Evil, Detect Invisible, Detect Danger, and Truesight query represented site/combat state inside their printed ranges. Detect Evil follows the BECMI intent-oriented meaning rather than converting the power into an alignment detector. Detect Danger classifies explicitly represented hazardous features; it does not invent hidden poison, collapsing ceilings, or ambushes. Truesight can pierce represented illusion/invisibility state, but it does not generate unseen world content.

### Know Alignment, Locate Object, Clairvoyance, and ESP

Know Alignment binds a one-round 30-foot reading to an explicitly represented target and returns the target's represented alignment rather than inferring one from behavior. Locate Object stores a specific object query and searches represented carried/site objects inside the artifact's fixed **120-foot** range; it reports direction/holder/location where the engine has that information and does not create a missing object.

Clairvoyance and ESP retain their **60-foot / 12-turn** forms. Clairvoyance binds to a represented creature as the remote viewpoint. ESP rejects undead, respects a Saving Throw vs. Spells, and exposes only explicitly represented surface-thought information; absence of a stored thought is reported as unknown rather than filled with generated inner monologue.

### Wizard Eye, Detect Invisible, and Truesight in 3D space

Wizard Eye is a persistent represented sensor with the printed **240-foot maximum range**, **six-turn duration**, and **120 feet per turn** movement. Its position is tracked in `(x,y,z)`, so attempts to exceed either the per-turn movement allowance or the maximum distance from the user are rejected. Detect Invisible and Truesight use the same represented 3D combat positions when evaluating invisible creatures.

### Choose Best Option, Mapmaking, and Treasure Finding

Choose Best Option is intentionally bounded to alternatives supplied with explicit referee/engine scores. It selects the highest scored represented option and consumes its one-use effect; the rules engine does not pretend to possess omniscient strategic knowledge where the campaign state supplies no basis for comparison.

Mapmaking snapshots represented keyed topology while the one-turn sense is active. It can record known exits and represented local mapping information but cannot discover nonexistent or unrepresented rooms merely because the power is active. Treasure Finding searches represented treasure candidates inside its **400-foot** envelope and returns the largest qualifying represented cache; treasure amount/location are not fabricated if the campaign state does not contain them.

### Lore and Find the Path

Lore is implemented as a study state rather than instantaneous omniscience. For a held represented subject it requires the artifact table's **one-turn** study; for a remote/not-held subject it uses the table's **one-day** branch. When the study matures, it can return stored campaign/artifact knowledge already represented by the engine. Questions whose answers are not present in campaign state remain referee/AI knowledge tasks rather than mechanical inventions.

Find the Path requires a named represented destination and resolves a route through the keyed site graph for the printed **46-turn** duration. It therefore provides actual executable route guidance when topology exists, but it does not fabricate passages through locations that have not been authored or represented.

### Deliberately bounded B2 edges

B2 is **IMPLEMENTED / BOUNDED REGISTRY: 24/24 printed rows**, not a claim of universal world omniscience. Remaining integration edges include richer Detect Magic coverage across every temporary magical object/effect type; full material/lead/stone obstruction modeling for Clairvoyance, ESP, and Wizard Eye; universal concentration interruption for all remote-sense producers; generated weather forecasting beyond the existing campaign weather state; arbitrary free-space Wizard Eye navigation through authored architecture; automatic map annotation/export; hidden-object direction calculation where no coordinates are represented; and exhaustive Truesight interaction with every monster-specific illusion, polymorph, and concealment ability.

### Validation

The finished v0.4.24 `index.html` passes extracted inline JavaScript syntax validation with `node --check`. The complete deterministic Chromium core harness was executed **three consecutive times** against the exact integrated document:

```text
Build: 0.4.24
Tests: 403 / 403 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
```

Seven new B2 regression groups verify: (1) all 24 printed B2 registry rows, PP costs, and fixed limits; (2) percentage and magical Find Traps integration with ordinary represented trap search; (3) Predict Weather's twelve-hour/40-mile-diameter envelope plus represented Detect Magic/Evil/Danger/Truesight features; (4) Know Alignment, Locate Object, Clairvoyance, and ESP targeting/content boundaries; (5) Wizard Eye's 3D movement/range plus Detect Invisible/Truesight; (6) referee-scored Choose Best Option, keyed Mapmaking, and represented Treasure Finding; and (7) Lore study timing plus keyed Find-the-Path routing. All preceding **396 tests pass unchanged**.

The injected validation document has no permission to use localStorage or IndexedDB, so the harness emits approximately **219-220 expected storage-access warnings per run** from journal/autosave paths. Inspection confirms that all console messages are warnings of that class; there are **zero console errors and zero page exceptions**.

### Current artifact registry roadmap after v0.4.24

The bounded registry now has complete printed-row coverage for **A1 25/25, A2 18/18, A3 12/12, A4 24/24, A5 29/29, B1 19/19, B2 24/24, D1, D2, and D3**. The next registry target is **B3**, followed by B4, the C categories, and D4-D5. Once those printed rows are closed, artifact work should move toward universal cross-system magic/object routing, adverse effects and handicaps, autonomous artifact defensive behavior, and the individual published Known Artifact records.

## v0.4.25 — Master Artifact B3 movement modes and artifact-granted movement skills

This checkpoint begins **B3 Aids to Movement** and implements the coherent movement-mode / temporary-skill tranche: **17/26 printed B3 rows**. The registered rows are Climb Walls 70/80/90/100/110/120%, Levitate, Tree Movement, Plant Door, Fly, Gaseous Form, Haste, Move Silently 50/70/90%, Web Movement, and Burrowing. Their printed Power Point costs and durations are preserved rather than normalized to ordinary class progression.

### Artifact-granted Climb Walls and Move Silently

The six Climb Walls percentages and three Move Silently percentages are now temporary active abilities rather than metadata. A non-Thief with the corresponding artifact power can use the ordinary BECMI procedure while the effect lasts. A Thief uses the better of the native class percentage and the artifact percentage. Source values above 100% are preserved exactly: the 110% and 120% Climb Walls rows are not silently clamped in storage. Existing long-climb segmentation and falling damage continue to govern failed Climb Walls checks.

### Levitate, Fly, Tree Movement, Plant Door, Web Movement, and Burrowing

Levitate records the source's **20-foot-per-round vertical movement** and the restriction that normal lateral travel requires pushing or pulling against a surface. Fly rolls the printed **40 + 1d6 turns** at activation and exposes **360 feet/turn (120 feet/round)** plus hovering through the existing 3D movement layer. Because these are actual movement states, Fly and Levitate permit elevation changes during positional combat.

Tree Movement uses the user's full normal movement as modified by encumbrance. Plant Door records the source-defined ability for plants, even dense growth and trees, not to bar the user's passage. Web Movement uses full normal movement through webs, prevents artifact Web from immobilizing the user, and leaves the Web effect itself present rather than dispelling it.

Burrowing is deliberately source-bounded. Table 2 prints **10', 30', or 60'** movement but does not assign those three rates to particular materials in the artifact entry. Activation therefore requires one of those exact source-authorized values and stores the chosen rate; the engine does not fabricate a soil/rock/material mapping that the cited B3 row does not provide.

### Haste and Gaseous Form

Haste uses the printed **240-foot range, three-turn duration, up to 24 creatures in a 60-foot area**. Its live combat integration doubles represented movement and ordinary melee/missile attack rate. It does **not** accelerate spellcasting or magical-device use. When Haste and Slow overlap, the attack-rate helper treats them as opposing speed effects rather than multiplying ordinary attacks indefinitely.

Gaseous Form uses the BECMI-family potion procedure as the secondary procedural clarification for Table 2's three-turn row: the user cannot make ordinary attacks, has **AC -2**, and remains mobile. The current engine does not yet globally intercept every possible nonmagical damage producer for the source's nonmagical-weapon immunity, nor does it physically drop every carried inventory object into the site ground-state when the form begins; those are recorded below as integration edges rather than silently approximated.

### Deliberately bounded B3 edges

B3 is **PARTIAL: 17/26 printed rows** after this checkpoint. The nine remaining rows are **Dimension Door, Pass Plant, Telekinesis, Transport Through Plants, Teleport, Plane Travel, Travel, Teleport Any Object, and Word of Recall**. They are being held for the next tranche because each changes represented location, object ownership/location, or individual planar state and therefore needs one common translocation layer rather than nine unrelated shortcuts.

Additional integration edges in the completed tranche include: universal nonmagical-damage immunity while gaseous; physical placement and later recovery of gear dropped by Gaseous Form; explicit architectural collision/path rules for Levitate/Fly beyond represented 3D combat barriers; Tree Movement validation against authored tree density outside the ordinary terrain model; Plant Door hidden-inside-tree line-of-sight state; and Burrowing material-specific rates because Table 2 itself does not map its three printed rates to materials.

### Validation

The finished v0.4.25 `index.html` passes extracted inline JavaScript syntax validation. The complete deterministic Chromium core harness was executed **three consecutive times** against the exact integrated document:

```text
Build: 0.4.25
Tests: 409 / 409 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
```

Six new B3 regression groups verify: (1) all 17 movement-mode/skill rows implemented in this checkpoint, their PP costs, and fixed source parameters; (2) artifact Climb Walls and Move Silently granting the ordinary procedures to non-Thieves; (3) Haste doubling movement and ordinary attacks while leaving spellcasting rate alone; (4) Web Movement allowing movement through a still-active artifact Web; (5) Fly, Levitate, and Burrowing exposing their live 3D/source-authorized movement envelopes; and (6) Gaseous Form blocking attacks, setting AC -2, and leaving movement available. All preceding **403 tests pass unchanged**.

The isolated validation document again produces approximately **222-224 expected storage-access warnings per run** because localStorage/IndexedDB are unavailable to the injected test page. Inspection confirms **zero page exceptions and zero console errors**.

### Current artifact registry roadmap after v0.4.25

The bounded registry has complete printed-row coverage for **A1 25/25, A2 18/18, A3 12/12, A4 24/24, A5 29/29, B1 19/19, B2 24/24, D1, D2, and D3**. **B3 is 17/26.** The next checkpoint should build the shared translocation/location-state layer and use it to close the remaining nine B3 rows before proceeding to B4.



## v0.4.26 — Master Artifact B3 translocation and planar movement completion

This checkpoint completes **B3 Aids to Movement at 26/26 printed rows** by adding the nine location-changing powers that were intentionally deferred from v0.4.25: **Dimension Door (25 PP), Pass Plant (35 PP), Telekinesis (40 PP), Transport Through Plants (45 PP), Teleport (50 PP), Plane Travel (65 PP), Travel (80 PP), Teleport any Object (85 PP), and Word of Recall (90 PP)**. They share one persistent artifact-translocation state instead of maintaining nine unrelated location systems.

### Dimension Door, Teleport, and Teleport any Object

Dimension Door is bounded to represented local 3D space. The recipient must be within the source touch/10-foot envelope, the destination must be no more than **360 feet** away, unwilling creatures receive their Saving Throw vs. Spells, and a destination inside a represented solid spatial barrier fails without spending the artifact's Power Points. The engine deliberately does not invent unseen architecture outside represented geometry.

Teleport uses the printed destination-familiarity table rather than treating teleportation as automatic: **Casual 01-50 success / 51-75 too high / 76-00 too low; General 01-80 / 81-90 / 91-00; Exact 01-95 / 96-99 / 00**. A Too High result uses the printed **1d10 × 10 feet** displacement and ordinary falling damage; a Too Low result is fatal when the represented destination supplies no source-valid vacant-space exception. Teleport is restricted to the same represented plane.

Teleport any Object uses artifact caster level 40 for a **20,000-cn maximum**, preserves the **10-foot-cube** limit for a solid part of a greater whole, and uses the source **-2 Saving Throw** for another creature or its held/carried property. The special self-teleport branch is error-free. Successful object teleports now physically remove the represented object from its carrier inventory and create a persistent relocated-object record at the destination; Too Low destroys the relocated object rather than leaving a zero-quantity ghost in inventory.

### Pass Plant and Transport Through Plants

Pass Plant operates only on explicitly authored living trees large enough to contain the traveler and enforces the source tree-type distance table: **Oak 600 yards; Ash/Elm/Linden/Yew 360 yards; Evergreen 240 yards; other trees 300 yards**. Where the campaign state cannot establish the distance between two represented plants, the engine refuses to guess it.

Transport Through Plants requires a living origin plant and living destination plant on the same represented plane, is limited to **once per day**, and may carry up to **two additional willing creatures**. The destination can be arbitrarily distant because the source supplies no range limit. Plant existence, life state, and location remain authored world facts rather than being generated by the artifact system.

### Telekinesis

Artifact Telekinesis uses the Table 2 override directly: **120-foot range, six rounds, 8,000 cn maximum weight, and 20 feet of movement per round**. In 3D combat it can move a represented creature by a stated vector, gives an unwilling creature its Saving Throw vs. Spells, and rejects movement into represented solid barriers. Deployed represented objects can also carry persistent telekinetic position state. Full held-object grabbing contests and interruption-by-damage across every possible producer remain integration work beyond this bounded row.

### Plane Travel and Travel

Plane Travel performs the printed **one self-only planar shift** to an explicitly represented named plane. The current planar layer records the destination and prevents a no-op shift to the same plane. Full cosmological adjacency and every Outer-Plane local-law restriction remain separate planar-engine integration rather than being invented inside the artifact power.

Travel lasts the Table 2 **40 turns**. Its normal state provides **360 feet/turn (120 feet/round) flight** and participates in the existing 3D elevation/movement system. The user may enter the source gaseous state, increasing movement to **720 feet/turn (240 feet/round)**; while gaseous, ordinary attacks and spellcasting are blocked and AC becomes **-2** through the common combat gates. Travel also allows at most **one planar shift per turn** and, at artifact caster level 40, can carry up to **eight additional represented companions** when they are explicitly named. Universal nonmagical-damage immunity and passage through every Protection from Evil/Anti-Magic-shell producer remain shared gaseous/planar integration edges rather than special-cased approximations here.

### Word of Recall

Word of Recall now requires an explicitly authored **permanent home with a meditation room**. A new developer command, `dev artifact sanctuary <character>: here|<site>`, records that destination. On use, only the artifact user and carried equipment return; other creatures do not travel. The result also exposes the source's automatic-initiative-unless-surprised fact for combat integration. Broader initiative automation for every casting-order edge remains a common combat-layer task.

### Shared translocation-state boundary

The new translocation layer records per-subject world/plane/3D overrides, relocated objects, daily-use locks, and movement history. If a lone PC moves, the ordinary global campaign location is synchronized. When only part of a multi-character party teleports or changes plane, the moved characters retain individual artifact location overrides; the older exploration UI still assumes a normally co-located party. Fully independent simultaneous exploration for split parties is therefore an explicit future engine-integration edge, not something this checkpoint silently fakes.

### Validation

The finished v0.4.26 `index.html` passes extracted inline JavaScript syntax validation. The exact integrated document was then executed through the deterministic Chromium core harness **three consecutive times**:

```text
Build: 0.4.26
Tests: 415 / 415 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
```

Seven B3 regression groups cover the completed tranche, six newly added in v0.4.26: (1) all **26/26** B3 registry rows, printed PP costs, and fixed translocation parameters; (2) Dimension Door plus Telekinesis in represented 3D geometry; (3) Pass Plant and Transport Through Plants with authored living-plant, range, companion, and once-per-day limits; (4) Teleport's familiarity chart plus Plane Travel; (5) Travel's 360/720 movement modes, gaseous action restrictions, and one-shift-per-turn rule; (6) physical Teleport-any-Object relocation and error-free self travel; and (7) Word of Recall's authored permanent-home meditation room. All preceding **409 tests pass unchanged**.

The isolated injected test document produced **224-225 expected localStorage/IndexedDB access warnings per run** from journal/autosave paths. These are test-host permission warnings; all three runs recorded **zero page exceptions and zero console errors**.

### Current artifact registry roadmap after v0.4.26

The bounded registry now has complete printed-row coverage for **A1 25/25, A2 18/18, A3 12/12, A4 24/24, A5 29/29, B1 19/19, B2 24/24, B3 26/26, D1, D2, and D3**. The next printed Table 2 target is **B4**, followed by the **C categories and D4-D5**. Once those registries are closed, artifact work should shift from table coverage toward cross-system integration, adverse effects/handicaps, autonomous defensive behavior, and the individual published Known Artifact records.

## v0.4.27 — Master Artifact B4 Aids to offset Encumbrance completion

This checkpoint completes **B4 Aids to offset Encumbrance at 15/15 printed rows**. The registry now contains all nine Container capacities, the 5,000-en Floating Disc, and all five Buoyancy tiers exactly at their Table 2 Power Point costs and printed durations:

- **Container:** 5,000 en / 10 PP; 10,000 en / 20 PP; 15,000 en / 30 PP; 20,000 en / 40 PP; 25,000 en / 50 PP; 30,000 en / 60 PP; 35,000 en / 70 PP; 40,000 en / 80 PP; 50,000 en / 90 PP. Each has the printed **6-hour** duration.
- **Floating Disc:** **5,000 en / 10 PP**, lasting **6 turns**.
- **Buoyancy:** 10,000 en / 15 PP for 6 turns; 20,000 en / 30 PP for 12 turns; 40,000 en / 45 PP for 18 turns; 80,000 en / 60 PP for 24 turns; **any weight / 75 PP for 36 turns**.

### Common encumbrance integration

B4 now feeds the ordinary logistics/encumbrance pipeline instead of existing as isolated artifact metadata. For a PC carrier, the engine first calculates the represented raw load from ordinary inventory plus assigned coin/supply load, then subtracts active B4 support before evaluating the standard movement-rate ladder. This means an artifact encumbrance aid automatically affects personal movement and every other current procedure that calls the common carrier-load function.

The implementation keeps the three mechanisms distinct. Reusing another power of the same mechanism replaces the earlier effect, while simultaneously active **Container**, **Floating Disc**, and **Buoyancy** effects may support separate portions of the represented load. The `Buoyancy, any weight` row reduces the user's represented effective load to zero for its duration. Expiration immediately restores the underlying raw load, so a character who overloaded while relying on an artifact can become overloaded when the effect ends.

### Source-bounded interpretation

The Master Table 2 supplies the B4 category name, capacities, costs, and durations, but does not provide separate prose specifying target/range/loading procedures for Container or Buoyancy. The engine therefore uses a deliberately conservative binding: these powers offset the **artifact user's represented carried load** up to the printed capacity. This directly implements the category's stated purpose without inventing remote targets, vehicle effects, item creation, or extra carrying capacity beyond the printed amount.

Known Artifact examples support treating **Container** as a property of the artifact vessel itself (for example, the Diamond Orb of Tyche and Hymir's Steaming Caldron). The current engine represents that capacity through effective encumbrance rather than an object-by-object extradimensional inventory. Exact item stowage, retrieval order, access geometry, and what occurs to individually stored objects if a Container duration ends remain explicit inventory/referee integration edges.

Floating Disc uses the BECMI spell procedure as the compatible secondary clarification: the disc is a nonweapon platform that follows the user within 6 feet and disappears when the duration ends. The engine currently abstracts which exact carried records sit on the disc by applying its 5,000-en support to the user's represented carried load. Object-by-object disc placement and automatic floor-drop placement at expiration remain future inventory/physical-state integration.

For **Buoyancy**, no more detailed Mentzer procedure was found beyond the B4 Table 2 rows. The engine therefore does not claim a remote creature, vessel, watercraft, or arbitrary-object target mode. Its self-load binding is recorded explicitly so a later source-supported interpretation can replace it without hidden rules drift.

### Validation

The finished v0.4.27 `index.html` passes extracted inline JavaScript syntax validation. The exact integrated document was executed through the deterministic Chromium core harness **three consecutive times**:

```text
Build: 0.4.27
Tests: 418 / 418 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
```

Three new regression groups verify: (1) all **15/15 B4 registry rows**, PP costs, capacities, and durations; (2) a 5,000-en Container reducing a represented 3,000-en personal load to zero and restoring the raw load exactly after six hours; and (3) Floating Disc reducing a 6,000-en load by exactly 5,000 en for six turns followed by `Buoyancy, any weight` reducing the full represented load to zero for thirty-six turns. All preceding **415 tests pass unchanged**.

The isolated injected validation document again produced approximately **224-225 localStorage/IndexedDB access warnings per run** from journal/autosave paths. Inspection confirms these are test-host permission warnings only; all three runs recorded zero page exceptions and zero console errors.

### Current artifact registry roadmap after v0.4.27

The bounded registry now has complete printed-row coverage for **A1 25/25, A2 18/18, A3 12/12, A4 24/24, A5 29/29, B1 19/19, B2 24/24, B3 26/26, B4 15/15, D1, D2, and D3**. All printed **B Information & Movement** subcategories are therefore closed at the bounded-registry level. The next Table 2 target is **C1 Creations and Summonings**, followed by the remaining **C categories and D4-D5**. After those rows are closed, artifact work should shift from missing registry entries toward cross-system integration, adverse effects/handicaps, autonomous defensive behavior, and the individual published Known Artifact records.

## v0.4.28 — Master Artifact C1 Creations and Summonings completion

This checkpoint completes **C1 Creations and Summonings at 13/13 printed rows**. The registry now carries the full Table 2 sequence at its printed Power Point costs and fixed artifact limits: **Produce Fire 15; Create Water 20; Summon Animals 30; Create Food 35; Create Normal Animals 40; Create Normal Monsters 45; Animate Dead 50; Animate Objects 60; Sword 70; Create normal objects 75; Clone 80; Create Magical Monsters 90; Create Any Monster 100**. The artifact-specific Table 2 durations and ceilings govern where they differ from the ordinary spell text, including Create Water's 50 gallons, the 40-HD creature budgets, Sword's 40 rounds/two attacks per round, the 1,000-cn normal-object limit, and Create Any Monster's four-turn artifact duration.

### Persistent creation-state layer

C1 now has a persistent `artifactCreations` state layer rather than transient text-only resolution. Creation records retain the producing artifact/power and creator, world/plane/combat location, duration, created or affected creature IDs, payload, completion state, and history. Timed creations expire through both campaign-clock and combat-round processing. Creature creations vanish cleanly at the end of their printed duration, summoned animals restore their prior hostility state, animated objects lose their animation markers, created food spoils after its source-defined day, and Clone records mature when their growth time completes.

**Produce Fire** now counts as live illumination for its two-turn duration. It records the torch-equivalent held magical flame and its printed 30-foot throw envelope without inventing terrain ignition targets that are not represented.

**Create Water** creates a represented 50-gallon/200-quart spring for six turns. The new draw helper moves available created water into the engine's represented waterskin capacity; the spring does not silently manufacture containers or bypass the ordinary carried-water state.

**Create Food** produces 400 represented ration shares and feeds the ordinary daily-ration pipeline before packed standard/iron rations because the magical food is perishable. Any unused portion spoils after 24 hours. The current survival model does not separately meter mount fodder, so the Table 2 “men + mounts” scope remains a named future mount-provision integration edge rather than being double-counted or invented.

### Summoned and created creatures

**Summon Animals** works only on currently represented normal, nonmagical animal-intelligence creatures within the printed 360-foot range. At artifact caster level 40, up to 40 total Hit Dice can answer. The engine does not generate otherwise-unrepresented local fauna simply to satisfy the spell; encounter ecology remains authored/world state.

**Create Normal Animals** creates the source's 1 large, up to 3 medium, or up to 6 small non-giant animals for ten turns, subject to the 40-HD artifact budget. Mentzer makes the exact animal type a DM determination; therefore the type supplied to the deterministic engine is explicitly labeled **referee-resolved** rather than treated as a player entitlement.

**Create Normal Monsters** enforces the 40-HD limit, excludes humans/demihumans and undead, and only accepts catalogue monsters with no Hit-Dice asterisks. Created monsters carry ordinary represented equipment only and vanish with the creation when its two turns end.

**Create Magical Monsters** likewise enforces 40 HD but permits monsters with up to two special-ability asterisks and permits undead; humans/demihumans remain excluded. **Create Any Monster** accepts other nonhuman/non-demihuman catalogue creatures for four turns and 40 total HD. A creature with three or more asterisks requires an explicit `studied` assertion, and constructs require explicit `materials`, preserving the printed study/material boundaries rather than granting undocumented free construction.

### Animate Dead, Animate Objects, Sword, normal objects, and Clone

**Animate Dead** consumes explicitly represented corpses, applies the 40-HD ceiling, uses the source skeleton/zombie HD relation (skeleton = original HD; zombie = original HD + 1; PC/demihuman corpse begins from one HD in this bounded procedure), and creates persistent controlled undead records. It does not create a corpse when none exists.

**Animate Objects** accepts represented nonliving, nonmagical physical/deployed/carried objects totaling no more than 4,000 cn for six turns. It marks those exact objects as animated and clears the markers on expiration. Mentzer leaves each object's movement, attacks, damage, and combat characteristics to DM judgment, so the engine intentionally does **not** fabricate universal animated-object combat statistics.

**Sword** creates the 40-round magical sword state, keeps its target within 30 feet, makes two attacks per round, and rolls two-handed-sword damage (1d10) on successful hits. The current engine binds the artifact's 40th-level attack statement to its existing high-level attack-progression helper; a future universal magic-user/monster/item attack-table audit can replace that shared binding if a more source-specific attack table is required without changing the C1 registry or duration mechanics.

**Create normal objects** requires a stated object, 1-1,000 cn weight, an explicit `seen` assertion for the source's prior-observation requirement, and a uniquely represented equal-weight solid material item that is consumed. Treasure creation is rejected. The resulting object is persisted in physical state as nonmagical and permanent. This is intentionally stricter than freeform material conversion because the engine will not invent untracked source matter.

**Clone** requires an explicitly represented target plus a `flesh` assertion. Undead and constructs are rejected. Human/demihuman clones reserve the printed 5,000 gp per HD and one week per HD; other living-creature simulacra use 500 gp per original hit point and one week per HD. The treasury cost and growth period are deterministic. At completion the engine records a grown clone/simulacrum, but it does not silently synthesize a second full PC or monster with every copied class feature, memory, spell, equipment, extraordinary ability, or personality consequence; those identity/ability details remain a source-bounded referee integration step.

### Validation

The finished v0.4.28 `index.html` passes extracted inline JavaScript syntax validation. The exact integrated document was executed through the deterministic Chromium core harness **three consecutive times**:

```text
Build: 0.4.28
Tests: 424 / 424 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions/page errors: 0
Console errors: 0
```

Six new regression groups verify: (1) all **13/13 C1 rows**, PP costs, and artifact-fixed limits; (2) Produce Fire/Create Water/Create Food integration with light, carried water, ration priority, and duration; (3) normal-animal/normal-monster creation count, catalogue eligibility, HD, and duration; (4) represented corpse/object animation and cleanup; (5) Sword's 40-round, two-attack, 1d10 live combat procedure; and (6) equal-weight normal-object conversion, Clone cost/growth/completion, plus Magical/Any Monster duration state. All preceding **418 tests pass unchanged**.

The isolated injected validation document produced **227-229 localStorage/IndexedDB access warnings per run** from journal/autosave paths. These are test-host permission warnings only; all three runs recorded zero page exceptions and zero console errors.

### Current artifact registry roadmap after v0.4.28

The bounded registry now has complete printed-row coverage for **A1 25/25, A2 18/18, A3 12/12, A4 24/24, A5 29/29, B1 19/19, B2 24/24, B3 26/26, B4 15/15, C1 13/13, D1, D2, and D3**. The next printed Table 2 target is **C2 Static Changes**, followed by **C3 Dynamic Changes, C4, and D4-D5**. Once those registries are closed, artifact work should move from missing Table 2 rows toward the remaining cross-system edges, concrete adverse effects/handicaps, autonomous artifact defensive behavior, and the individual published Known Artifact records.

## v0.4.29 — Master Artifact C2 Static Changes completion

This checkpoint completes **C2 Static Changes at 22/22 printed rows**: Purify Food and Water; Repair normal objects; Change Odors; Change Tastes; Hold Portal; Remove Traps at 50%, 75%, and 100%; Wizard Lock; Create magic aura; Magic Door; repair of temporary and permanent magical objects; Rulership; Magic Lock; Remove Barrier; Victory; Metal to Wood; Close Gate; Permanence; Gate; and Timestop. Printed PP costs, ranges, durations, use counts, volumes, and weight limits are retained in the deterministic registry.

The live procedures are deliberately state-bounded. Purification, repair, sensory changes, portal effects, barrier removal, and Metal to Wood require represented targets and persist their changes. Remove Traps creates the printed six-turn percentage ability. Rulership records the +10 to +50 Confidence range without inventing the situation-dependent exact award. Victory contributes +25 to the next War Machine Combat Results Table roll and records the printed 91-100 worst-result floor. Close Gate operates only on one uniquely represented open Gate. Permanence removes duration from one uniquely represented eligible temporary magical effect. Gate creates persistent planar-gate state with the printed one-turn or percentile-turn duration, while the called resident's response remains referee-controlled. Timestop rolls and records the printed 1+1d4-round exclusive-user interval.

Three regression groups were added, bringing the defined core suite from **424 to 427 tests**. They cover all C2 rows and PP costs; purification, repair, sensory conversion, and Metal to Wood; and the bounded lock, trap-removal, Victory, Gate, Permanence, and Timestop state paths. The exact integrated inline JavaScript passes syntax parsing. A Chromium executable was unavailable in this runtime and the permitted browser download timed out, so the new **427-test suite is present but was not executed here**; the last fully executed checkpoint remains v0.4.28 at **424/424**, three clean runs, zero runtime exceptions, and preserved state isolation.

### Current artifact registry roadmap after v0.4.29

The bounded registry now has complete printed-row coverage for **A1-A5, B1-B4, C1-C2, and D1-D3**. The next Table 2 target is **C3 Dynamic Changes**, followed by **C4 and D4-D5**. After table closure, work shifts to adverse effects and handicaps, autonomous artifact behavior/self-defense, published Known Artifact records, and remaining cross-system integration edges.

## v0.4.30 — Master Artifact C3 Dynamic Changes completion

This checkpoint completes **C3 Dynamic Changes at 25/25 printed rows**. The registry now includes the complete Open Locks ladder from 60% through 120%; Warp Wood; Growth of Animal; Knock; Growth and Shrink Plants; Heat Metal; Control Winds; Harden; Control Temperature; Dissolve; Lower Water; Pass-Wall; Move Earth; Summon Weather; Reverse Gravity; Weather Control; Earthquake; and Wish. Printed PP costs, ranges, durations, areas, weight/count limits, and concentration boundaries are retained.

C3 operates through persistent represented-world state. Lock opening and Knock act on named locks or obstructions. Plant, earth, water, wall, gravity, and earthquake changes record their exact source envelopes for the authored geometry layer. Environmental controls require an explicit source-legal result and retain their printed radii and durations. Dissolve rolls its 3d6-day duration. Heat Metal records the seven-round temperature cycle for the shared equipment/contact damage path. Growth of Animal is restricted to a represented normal nongiant animal. Wish executes the already-supported permanent elemental Gate/vortex case directly and otherwise records the exact request for referee adjudication rather than manufacturing an unrestricted result.

One registry regression group was added, bringing the defined suite from **427 to 428 tests**. It verifies all 25 C3 rows, PP costs, and fixed table limits. Inline JavaScript syntax validation passes. Because Chromium remains unavailable in this runtime, the new 428-test suite is defined but not browser-executed here; the last fully executed baseline remains v0.4.28 at **424/424**, three clean runs with state isolation preserved.

### Current artifact registry roadmap after v0.4.30

The bounded registry now has complete printed-row coverage for **A1-A5, B1-B4, C1-C3, and D1-D3**. The next Table 2 target is **C4**, followed by **D4-D5**. After those close, work shifts to adverse effects and handicaps, autonomous artifact behavior/self-defense, published Known Artifact records, and remaining cross-system integration edges.

## v0.4.31 — Source correction and Master Artifact D4 Misdirection completion

Direct verification of the printed Master Rules Table 2 establishes that **there is no C4 category**. Category C contains C1 Creations and Summonings, C2 Static Changes, and C3 Dynamic Changes, after which the table proceeds directly to D Defenses. The earlier C4 roadmap entry resulted from OCR and multi-column text ordering and is removed rather than populated with invented material.

This checkpoint therefore completes the actual next category, **D4 Misdirection at 13/13 printed rows**: Ventriloquism; Confuse Alignment; Obscure; Mirror Image with five false images; Hide in Shadows at 30%, 50%, and 70%; Massmorph; Hallucinatory Terrain; Merging; Phantasmal Force; Projected Image; and Blend with surroundings. Printed PP costs, ranges, durations, areas, heights, image counts, target limits, and concentration boundaries are preserved.

Misdirections now create persistent represented illusion state with per-observer interaction/disbelief boundaries. Confuse Alignment preserves actual alignment while exposing a false magical reading for forty turns. Hide in Shadows uses the existing percentage-effect layer. Merging permits the user plus up to seven willing creatures, with emergence and re-merging retained under the user's permission. Blend with surroundings records its stationary concealment and movement/attack break condition. The engine does not turn illusion descriptions into omniscient facts or silently decide intelligent observer reactions.

One regression group was added, bringing the defined suite from **428 to 429 tests**. It verifies all thirteen D4 rows, their PP costs, and fixed limits. Inline JavaScript syntax validation passes. Chromium remains unavailable in this runtime, so the last fully browser-executed baseline remains v0.4.28 at **424/424**, three clean runs with state isolation preserved.

### Current artifact registry roadmap after v0.4.31

The bounded registry now covers **A1-A5, B1-B4, C1-C3, and D1-D4**. **D5 Barriers is the sole remaining Table 2 subcategory.** This was the final pre-v0.4.32 roadmap state; the following checkpoint closes D5 and the full printed table.

## v0.4.32 — Master Artifact D5 Barriers and full Table 2 closure

This checkpoint implements all **22/22 printed D5 Barriers rows** with their Power Point costs and printed bounds: Resist Cold; Protection from Evil; Resist Fire; Protection from Normal Missiles; Protection from some creatures; Protection from Evil 10-foot Radius; Bug Repellant; Wall of Ice; Anti-Plant Shell; Protection from Poison; Wall of Stone; Shelter; Protection from Lightning; Protection from many creatures; Anti-Animal Shell; Wall of Iron; Protection from most creatures; Barrier; Anti-Magic Shell; Force Field; Protection from all creatures; and Prismatic Wall.

The handlers preserve timed recipient effects for elemental resistance, normal-missile protection, creature barriers, insect/plant/animal exclusion, poison protection, lightning absorption, and Protection from Evil. Wall of Ice, Wall of Stone, Wall of Iron, Barrier, Force Field, and Prismatic Wall create persistent represented barrier geometry with their printed range, duration, volume/area, damage, and layer metadata. Shelter records its artifact-contained, user-only 24-hour state and cumulative renewal boundary. Anti-Magic Shell creates a 100% represented suppression zone with a twelve-turn lifetime. Exact passage, structural, damage, eligible-creature, and prismatic-layer consequences remain routed through represented world state rather than omniscient assumptions.

The regression suite now defines **430 tests**. The added D5 registry test verifies all 22 rows, every printed PP cost, and fixed Ice Wall, Iron Wall, Force Field, and lightning-absorption limits. Inline JavaScript syntax validation passes. Chromium remains unavailable in this workspace, so the last fully executed browser baseline remains **v0.4.28 at 424/424**, repeated three times with state isolation preserved.

### Current artifact roadmap after v0.4.32

All printed Master Artifact Table 2 categories—**A1-A5, B1-B4, C1-C3, and D1-D5**—now have bounded executable coverage. Artifact work can move from missing registry rows to concrete adverse effects and handicaps, autonomous artifact self-defense/power selection, individual published Known Artifact records, and the named cross-system integration edges. Unique legend, purpose, activation, discovery clues, selected adversities, and legendary destruction methods remain referee-authored where Mentzer makes them campaign-specific.

## v0.4.33 — Master Artifact Table 3A handicap-only effects

This checkpoint begins the concrete adverse-effect layer by encoding all **6/6 Table 3A effects suitable only for handicaps**: Doom, Lameness, Magic Error, Operating Costs, Recharging Costs, and Sentience. The registry enforces the printed boundaries: Doom is restricted to Major artifacts; Magic Error is prohibited for the Sphere of Energy and requires a referee-selected 10%–80% chance; Operating Costs requires a 1%–50% asset percentage and an authored trigger; Lameness requires a selected limb and either the half-level attack or half-speed movement branch; Sentience records the 4d6-day control duration where that outcome is selected; and Recharging Costs disables automatic recharge while preserving the referee-authored power source.

Handicap definitions and active applications now retain canonical Table 3 keys, mechanics, parameters, and source categories through save normalization. First-use and zero-charge triggers convert a selected definition into persistent mechanical state instead of always leaving it as an unresolved description. Lameness exposes live movement/attack-level multipliers, Recharging Costs enters the existing recharge gate, and Magic Error exposes its selected failure percentage for common magic routing. Doom, Sentience outcomes, total asset destruction, and the nature of a recharge power source remain explicitly referee-resolved where the table directs the DM to invent their manifestation or campaign facts.

Two referee commands were added: `dev artifact tableadverses` lists the canonical 3A entries, and `dev artifact tableadverse <id>: <effect>, trigger=..., ...` installs one with its required parameters while enforcing magnitude, Sphere, and handicap-slot limits.

The regression suite now defines **432 tests**. New groups verify all six 3A definitions and fixed ranges, Doom/Magic Error eligibility restrictions, live Lameness state, Recharging Costs disabling automatic recharge, authored power-source preservation, and the Lesser-artifact 60-day fade clock. Inline JavaScript syntax validation passes. Chromium remains unavailable, so the last fully executed browser baseline remains **v0.4.28 at 424/424**, repeated three times with state isolation preserved.

### Current artifact roadmap after v0.4.33

Proceed through **Table 3B penalty-only effects**, then **Table 3C effects usable as handicaps or penalties**. After the adverse registry and common mechanical hooks close, implement autonomous artifact self-defense/power selection and the individual published Known Artifact records. Campaign-specific triggers, mental-state portrayal, Doom manifestations, sentient-being identity, operating-cost asset selection, and recharge fuel remain referee-authored as Mentzer directs.

## v0.4.34 — Master Artifact Table 3B penalty-only effects

This checkpoint completes all **11/11 printed Table 3B penalty-only effects**: Die, Forgetfulness, Gaseous Form, Life Trap, Mania, Operational Error, Paranoia, Service, Spell Effect, Withdrawal, and Wounded. The canonical registry retains each effect's Table 3B identity, Sphere exclusions, fixed range/timing/dice, required referee selections, and persistent application state.

The deterministic procedures cover the source-bounded consequences. **Die** immediately reduces the user to 0 hp and enters the ordinary death/Automatic Healing path. **Forgetfulness** spends named, counted, or spell-level-budgeted prepared spells as though cast. **Gaseous Form** affects the user but not equipment for one turn and permits movement while blocking attacks and spellcasting. **Life Trap** removes the user from ordinary interaction, retains an authored or represented released occupant, and persists until the source-valid release procedure is confirmed. **Withdrawal** rolls 2d10 days and blocks ordinary movement, attacks, spellcasting, and artifact use. **Wounded** ties its 1d20 temporary or permanent hit-point loss to one selected artifact power.

**Operational Error** is preflighted before the selected artifact power resolves; the invocation still spends its normal PP, but a triggered failure blocks the original effect, while partial and misfunction outcomes retain the referee-authored details. **Mania**, **Paranoia**, and **Service** create persistent behavior obligations; Paranoia retains its 60-foot scope and Thought-Sphere prohibition. **Spell Effect** accepts only a canonical A1, A3, A4, C1, C2, C3, D4, or D5 Table 2 selection, preserves its direction and category, and costs no additional PP; circumstances not fully represented remain explicitly pending rather than receiving an invented universal target or result.

The referee command surface now includes `dev artifact tablepenalties`, generalized `dev artifact tableadverse <id>: <Table 3A or 3B effect>, ...`, and `dev artifact endpenalty <id>: <application name, key, id, or all>`. Timed penalty effects and their applications retain stable object identity through state normalization, and penalty/effect linkage plus the Gaseous Form equipment-exclusion marker survive save normalization.

Four regression groups bring the core suite from **432 to 436 tests**. They verify the 11-row registry and source restrictions; Forgetfulness, Gaseous Form, and Withdrawal timing/action state; Life Trap persistence and removal; and Operational Error, Wounded, and Die consequences. The validation pass also corrected three older artifact test fixtures that exceeded Major-artifact transformation/Power-Level limits or attempted possession with no party member; no production rule limit was relaxed.

The exact integrated inline JavaScript parses successfully. The complete deterministic suite executed in a lightweight Node DOM host at **436 / 436 passed, 0 failures, campaign-state isolation preserved**. The host lacks IndexedDB and therefore emits expected journal-persistence warnings. Chromium remains unavailable here; the last full Chromium baseline remains v0.4.28 at **424 / 424**, repeated three times without page/runtime errors.

### Current artifact roadmap after v0.4.34

Proceed through **Table 3C effects usable as handicaps or penalties**. Then implement autonomous artifact self-defense/power selection, the individual published Known Artifact records, and the remaining cross-system integration edges. Unique manifestations, mental-state portrayal, service tasks, misfunction details, released-being identity, activation clues, and legendary destruction methods remain referee-authored wherever Mentzer makes them campaign-specific.

## v0.4.35 — Master Artifact Table 3C shared adverse effects

This checkpoint closes the remaining printed Master Artifact adverse-effect registry by encoding all **28/28 Table 3C effects suitable for either handicaps or penalties**: Ability Score Penalty; Aging; Alignment Change; Anti-Magic 100%, 10-foot Radius; Armor Class Penalty; Attitude or Behavior Change; Body Part Change; Damage; Damage Penalty; Extra Damage from Blows; Extra Damage from Magic; Energy Drain; Ethereality under Stress; Fumbling; Gas; Greed; Hit Points Penalty; Hit Rolls Penalty; Magic Destruction; Memory Penalty; Obsession; Range Penalty; Repel Others; Rot; Saving Throws Penalty; Polymorph; Size Change; and Weak Magic. A Table 3C definition must now explicitly state `kind=handicap` or `kind=penalty`; the selected kind then uses the ordinary magnitude slot limit, first-use/power-use trigger default, persistence rules, and removal/fade lifecycle for that adverse class.

### Printed ranges and source-bounded parameters

The registry preserves the source's fixed numerical boundaries instead of treating Table 3C as freeform text. Ability Score Penalty supports one to six distinct abilities at one to six points each; Armor Class Penalty is +1 to +10; Damage Penalty is 2-12 points but never reduces a successful hit below 1 damage; Energy Drain accepts the printed 1-8 levels or 10%-60% branch; Fumbling is limited to 10%-50%; Hit Points Penalty is 1-3 per Hit Die; Hit Rolls Penalty is 1-10; a single Saving Throw penalty is 1-12 while an all-saves penalty is 1-6; Size Change is bounded to 3 inches through 18 feet; and Weak Magic is 1-3 less damage per die with at least 1 point per die. Anti-Magic is fixed at **100% in a 10-foot radius**.

Where Mentzer gives a principle rather than a universal manifestation, the engine requires the referee to supply the missing authored fact. Examples include the exact behavior or body change, amount/type of generic or extra damage, Gas manifestation, Obsession focus, Rot location, Polymorph form, and uncontrolled Size Change height. The engine does not invent a campaign-specific fear, NPC greed target, gas poison, physical mutation, or monster form merely to make the record executable.

### Live shared mechanical hooks

The common rules layer now consumes the Table 3C modifiers that are numerically deterministic in represented state. **Armor Class Penalty** worsens descending AC directly; **Hit Rolls Penalty** feeds the ordinary attack resolver; **Damage Penalty** reduces represented weapon damage while preserving the source's minimum 1 point on a successful hit; **Saving Throws Penalty** feeds the ordinary PC save resolver; and **Weak Magic** reduces represented damaging-spell dice while preserving at least one point of damage per die. Extra Damage from Blows and Extra Damage from Magic can add an authored fixed amount through the common PC damage path, optionally restricted by an authored attack/spell type.

Ability Score Penalty applies its selected reductions to the live character abilities and therefore naturally affects existing derived consumers. Hit Points Penalty subtracts the selected 1-3 hp per BECMI Hit Die from live current/maximum hp. Alignment Change changes the live alignment and retains its prior value for eventual removal. The exact-level branch of Energy Drain delegates to the already-live BECMI Energy Drain procedure rather than creating a second level-loss system; the percentage branch is retained as explicit pending referee resolution because the source does not specify a universal rounding rule for fractional levels.

The **100% Anti-Magic, 10-foot Radius** adversity now creates a live 10-foot Anti-Magic zone around the user. It does not destroy the artifact record, but ordinary magic routing can be suppressed by the zone, including artifact powers called forth through the common magic layer. Ending the penalty or completing a handicap fade removes that adversity zone.

### Corrected handicap fade ownership

The Table 3C pass also fixes a lifecycle edge exposed by the new reversible handicaps. Handicap applications now retain the affected character's identity separately from the artifact's current possessor. Relinquishing the artifact starts the existing 30/60/120/240-day magnitude fade but **does not stop the handicap from applying immediately**. When the fade actually completes, reversible Table 3C state—such as ability penalties, alignment change, hit-point capacity loss, or the Anti-Magic zone—is restored/removed. This makes the existing fade clock mechanically meaningful rather than merely archival.

### Referee-facing command surface

`dev artifact tableadverses` now lists Tables 3A-3C. The new `dev artifact tableshared` lists only the 28 Table 3C rows. `dev artifact tableadverse <id>: <effect>, kind=handicap|penalty, ...` installs a shared effect while validating the selected printed range and consuming the correct magnitude slot. The existing `dev artifact endpenalty` removal path now also restores reversible Table 3C penalty state.

### Explicit bounded edges

Registry completion is not a claim that every Table 3C phrase has a universal automated manifestation. **Fumbling** retains its validated 10%-50% chance but still needs the remaining universal attack-redirection hook to make every weapon/spell attack strike the user; **Gas** records its magnitude-scaled area, save penalty, and authored effect but does not invent one gas result; **Greed**, **Attitude/Behavior Change**, **Obsession**, and **Repel Others** still require role-play/AI/referee behavior; **Magic Destruction** still needs universal magical-item-touch routing; **Memory Penalty** needs the final all-class spell-preparation gate; **Range Penalty** accepts the source's feet-or-yards reduction but still needs universal weapon/spell range routing; **Rot** requires authored progression/cure consequences; **Polymorph** requires its chosen form to be routed through all transformation extraordinary powers; and uncontrolled **Size Change** deliberately does not invent a height-to-Changing-Monsters-modifier conversion that Mentzer never supplies. The optional nearby secondary victims mentioned for Aging, Attitude/Behavior Change, and Damage also remain referee-selected rather than being chosen automatically. These are now named cross-system integration edges, not missing Table 3C registry entries.

### Validation

The integrated `index_v0.4.35.html` passes extracted inline JavaScript syntax validation. Five new regression groups increase the deterministic suite from **436 to 441 tests**. They verify: all 28 Table 3C names and fixed ranges; mandatory handicap/penalty selection and validation; live AC/Hit/damage/save/Weak-Magic routing; post-relinquishment handicap persistence plus full Major-artifact 240-day restoration; and creation/removal of the fixed 100% 10-foot Anti-Magic adversity.

The exact integrated document then ran through the Chromium core harness **three consecutive times**:

```text
Build: 0.4.35
Tests: 441 / 441 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions: 0
Console errors: 0
Log errors: 0
```

### Current artifact roadmap after v0.4.35

All printed Master Artifact **Table 2 powers** and **Table 3 adverse-effect rows** now have bounded registry coverage. The next artifact checkpoint should implement the source's autonomous artifact intelligence/self-defense procedure: artifacts sensing personal attack, choosing the most effective available power while avoiding attacks that would further damage the artifact, falling back to a random A1 attack costing 35 PP or less when no attack power remains, and respecting the 10% damage threshold for automatic defense. After that, encode the individual published Known Artifact records and continue closing the named cross-system integration edges.

## v0.4.36 — Master Artifact rudimentary intelligence and autonomous self-defense

This checkpoint implements the printed Master artifact response to **personal danger**. Mentzer describes artifact intelligence as rudimentary rather than analytical: an artifact does not reason or learn, but it can respond to its purpose and to present personal danger. When personally attacked, it can defend itself with its powers; it avoids attacks that would further damage itself, but it does **not** protect its wielder from collateral effects. The damage section separately states that a damaged artifact defends itself, that it senses which power would be the most effective attack, that an artifact with no attack powers remaining may randomly use any A1 attack costing 35 PP or less, and that after the artifact reaches **10% damage** it always defends itself when attacked.

### Trigger and damage-threshold lifecycle

`damageArtifactVessel()` now carries the attacker's represented identity into an autonomous-defense check. A qualifying +5-or-better weapon or artifact attack still applies only the minimum possible damage, exactly as before. If that attack actually damages the vessel, the artifact attempts an autonomous defense even when total damage is still below 10%. Once current vessel damage reaches 10% or more, a represented **personal attack** always enters the defense path even when the specific incoming attack cannot harm the vessel—for example, a +4 weapon striking an already 10%-damaged artifact. This preserves the source's distinction between “when an artifact is damaged it will defend itself” and the stronger “once ... damaged 10% or more it always defends itself when it is attacked.”

The existing 40%/50%/... damage-driven power-loss procedure runs before the post-hit defense selection. Therefore a power just lost because the new damage crossed a threshold cannot be chosen to answer the same attack. The existing 80%/90% Immortal recall checks and automatic 100% return still take precedence; a recalled artifact no longer resolves a mortal-world counterattack.

### Source-safe autonomous power selection

The engine first examines **remaining attack powers already belonging to the artifact**. A candidate must still exist, not be disabled by artifact damage, be affordable at the artifact's current charge total, have a represented legal target/range where the current engine can determine one, and not be an attack the engine can show would endanger the artifact itself. The current self-preservation filter rejects a target-centered blast when the artifact lies inside the represented blast volume, rejects the adjacent Explosive Cloud manifestation that would include the artifact, and conservatively rejects Lightning Bolt for autonomous selection because the live BECM bolt can rebound toward its origin. The selection logic intentionally does **not** reject an attack merely because it might injure the wielder; Mentzer explicitly says the artifact does not account for its user's frailties.

Mentzer supplies no numerical rule for deciding which surviving power is “most effective.” To keep ordinary play deterministic without pretending that an unwritten ranking exists, the automatic resolver uses **highest printed PP cost among source-safe, target-valid attack powers** as the engine's default proxy. Ties are stable rather than random. The referee/AI command path may specify a different preferred power, but that override still must pass the no-self-damage and ordinary usability checks. If attack powers still remain but none can be proven usable and safe from represented state, the engine records a pending referee/AI decision instead of silently jumping to the fallback.

### Random A1 fallback

Only when **no attack powers remain** does the engine build the source-defined fallback pool. It selects randomly from encoded **A1 attacks costing 35 PP or less** that the artifact can currently afford and that do not violate the represented no-self-damage rule. The fallback is instantiated as an ephemeral Table 2 attack; it does not become a permanent new power on the artifact. Its ordinary PP cost is still spent. This preserves the exceptional fallback without rewriting the artifact's authored power list.

### Activation, discovery, adverse effects, and carried origin

Autonomous defense is the artifact acting for itself, not a mortal invoking a learned control. It therefore does not require the possessor to have activated the item or discovered that power, and it does not count as the mortal's first voluntary power use for handicap/penalty triggering. Charges and recharge timing still change normally because the artifact power was actually expended. This is a bounded engine interpretation of Mentzer's separate “mortal uses an artifact” adverse-effect language and the artifact's own personal-defense intelligence.

A carried artifact uses its possessor's represented `(x,y,z)` combat position as the artifact's present origin. The current artifact record does not yet maintain an independent world/combat coordinate when unpossessed, so an unpossessed artifact can select a defensive power but records the range/geometry resolution as **pending** rather than inventing a location. Likewise, custom attack powers, arbitrary choice powers, or other attacks whose safe geometry cannot be established remain pending.

### Referee/developer visibility

Artifact status now reports current vessel damage percentage, whether the 10% automatic-defense threshold is active, and the number of recorded autonomous-defense events. `dev artifact damage` accepts `attacker=<creature>` plus optional `defense=<power>`/`choice=...` fields so a test or referee can identify the personal attacker and provide a source-safe tactical override. A separate `dev artifact defend <id> against <attacker> [using <power>]` command exposes the autonomous resolver directly without fabricating vessel damage.

### Validation

The exact integrated `index_v0.4.36.html` passes extracted inline JavaScript syntax validation. Four new regressions increase the deterministic core suite from **441 to 445 tests**. They verify: (1) actual vessel damage below 10% triggers autonomous defense without requiring activation/discovery and without firing mortal adverse effects; (2) an artifact already at 10% damage defends even against a personal attack that cannot itself damage the vessel; (3) autonomous selection rejects a higher-cost area attack when its represented blast would include the artifact; and (4) the random A1 <=35 PP fallback is used only after no attack powers remain.

The complete integrated document then ran through the Chromium core harness **three consecutive times**:

```text
Build: 0.4.36
Tests: 445 / 445 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Page errors: 0
Console errors: 0
```

### Current artifact roadmap after v0.4.36

The printed Master Artifact **Table 2 power registry**, **Table 3 adverse-effect registry**, and the basic **rudimentary intelligence / personal self-defense lifecycle** now have bounded engine coverage. The next artifact checkpoint is the set of **published Known Artifact records**: encode each printed artifact's identity, magnitude, creator/Sphere where supplied, powers, handicaps, penalties, activation/control information, vessel data, and unique destruction condition without turning campaign-specific legend or unknown information into player-visible metadata. After that, continue closing the already named cross-system edges (unusual target geometry, transformation extraordinary powers, universal range/magic-item routing, and other bespoke producers that bypass the common predicates).


## v0.4.37 — Published Master "Known Artifact" source library and campaign loader

This checkpoint encodes the complete set of **16 published Known Artifact examples** in the Mentzer Master rules as a referee-only source library and adds a bounded loader that can instantiate those examples into campaign state without treating the samples as immutable campaign canon. Mentzer explicitly presents these artifacts as worked examples whose powers may be modified by the DM, and separates the player-facing introductory legend from the detailed referee material. The engine therefore stores both layers separately rather than exposing the full source record merely because the party possesses an item.

The source library now contains **Armet by Wayland, Claw of Mighty Simurgh, Comb of the Korrigans, Diamond Orb of Tyche, Fiery Brand of Masauwu, Girdle of Armida, Humbaba's Glaring Eye, Hymir's Steaming Caldron, Ivory Plume of Maat, Ortnit's Lance of Doom, Pileus, Rainbow Scarf of Sinbad, Shard of Sakkrad, Tome of Ssu-Ma, Verthandi's Invincible Hourglass, and Wife of Ilmarinen**. Each template retains the published name, magnitude, Power Level, printed A/B/C/D limits, Sphere, creator when the sample explicitly supplies one, introductory legend, vessel description, activation/discovery procedure, use/control notes, listed powers and PP costs, handicaps, penalties, and source-specific exceptional procedures that can be represented without invention.

### Published-source fidelity and deliberate anomalies

The loader intentionally does **not** run a published sample back through the generic artifact-construction legality checks and "correct" it. Published records can contain values that differ from the general construction table, and those differences are part of the source record. Two especially useful regression anchors are retained exactly:

- **Hymir's Steaming Caldron** is declared **PP 95**, while its four listed powers total **100 PP**. The artifact therefore has a source-declared Power Level of 95 and a separately recorded listed-power total of 100; neither number is silently rewritten.
- **Rainbow Scarf of Sinbad** is declared **PP 90**, while the shown powers total **85 PP**. Its sample-specific **Container 10,000 en** and **Open Locks 75%** are each retained at their printed **10 PP** sample cost rather than being normalized to the general Table 2 registry.

The same distinction is used for other example-specific forms. Ortnit's inherent **Lance +5, +10 vs. Giants** is retained as an intrinsic source row rather than fabricated into a PP expenditure. The Ivory Plume's sample **Continual Light** wording is retained as a source-specific power instead of being misrepresented as some other finite light effect. The Comb's printed "Poison breath" is mapped to the already encoded A1 **Poison Gas Breath** mechanical procedure while keeping the sample's printed label in its source row.

### Referee-only source metadata and player information boundaries

`normalizeArtifactRecord()` now preserves a dedicated published-source layer: template key, printed power limits, declared and listed PP totals, legend, physical description, activation/discovery notes, use/control notes, original power rows, special notes, anomaly notes, and penalty policy. These fields survive save normalization but are not printed by ordinary player artifact status.

The player view continues to reveal only information that the campaign has actually made available. The developer/referee view can inspect the original published template, printed limits, PP totals, activation/control instructions, anomalies, and the fact that the sample did not provide a permanent destruction method. Two commands expose this layer:

```text
dev artifact known [name]
dev artifact load <Known Artifact name>
```

The first lists or inspects the source templates. The second creates a live campaign artifact from one published example. **Loading does not automatically place, award, activate, or reveal every power to the party.** Those steps remain subject to the individual sample's campaign procedure or referee action.

### No invented permanent-destruction methods

The general artifact rules require a unique legendary method for permanent destruction, but the printed Known Artifact examples do not provide such a method for each sample. The library therefore leaves `destructionMethod` blank rather than inventing sixteen legendary quests. The existing permanent-destruction gate consequently refuses to annihilate one of these loaded artifacts until the referee supplies a campaign-specific method. Ordinary vessel damage, Immortal recall, and return procedures remain unchanged.

This also keeps the engine consistent with Mentzer's advice that rumors and myths should precede the appearance of an artifact and that the DM may alter the worked examples. The source template is a starting record for the referee, not omniscient player knowledge.

### Source-specific handicap and penalty timing

The generic adverse-effect engine has been extended only where the examples require a bounded exception. Handicap triggers may now name a specific power and may require a particular use count. A handicap can also carry an explicit fade period when the sample supplies one. Thus **Girdle of Armida's** natural-weapon extra-damage handicap uses its printed **100-day** post-possession decay instead of being overwritten by the normal Minor-artifact 30-day fade.

Penalty checks now support source-defined schedules in addition to the normal `PP cost - 10` percentage. The published library can express fixed percentages, one-in-N rolls, power-restricted checks, restricted penalty pools, and weighted outcomes. This preserves, among other examples, the **Comb of the Korrigans' 4:1:1** penalty weighting, **Shard of Sakkrad's 20%** check whenever a power is used, **Verthandi's Invincible Hourglass' 10%** check only when either 100-PP power is used, and the **Wife of Ilmarinen's 1-in-6** misdirection check on power use. Event-driven penalties whose trigger is not ordinary power use remain encoded as source metadata for their later event hook rather than being incorrectly rolled every time a power is invoked.

The D2 ability-score handler also accepts an explicit ability list for source examples. This lets the Rainbow Scarf's **Intelligence to 18** affect Intelligence specifically instead of reusing the general Table 2 random-ability procedure.

### Scope boundary

This checkpoint completes the **published-record/library layer**, not every bespoke story trigger or every unique adverse consequence of all sixteen artifacts. Common Table 2 powers already use their live shared mechanics where a direct mapping exists; source-specific or descriptive powers remain explicit custom/pending procedures rather than false automation. Likewise, weather-triggered service, strike-triggered dragon vulnerability, special touch reactions, staged Doom sequences, treasure sacrifices, transformation progression, command-word discovery, and similar artifact-specific campaign events remain to be wired individually where the source supplies a deterministic trigger and the underlying world state can represent it.

### Validation

Five new regressions increase the deterministic core suite from **445 to 450 tests**. They verify: (1) all sixteen published templates and the intentional PP-total anomalies; (2) **every one of the sixteen templates can actually be loaded** without a broken Table 2 mapping or invented destruction method; (3) referee-only source metadata is retained without leaking through player artifact status; (4) fixed, restricted, weighted, and one-in-six penalty policies preserve their source procedures; and (5) the Rainbow Scarf's specific Intelligence effect plus Armida's 100-day fade execute without normalizing away the sample rules.

The exact integrated document passes extracted inline JavaScript syntax validation. It was then loaded into headless Chromium with the deterministic core harness and executed **three consecutive times**:

```text
Build: 0.4.37
Tests: 450 / 450 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Page errors: 0
Console errors: 0
```

The isolated `set_content` validation host generated the familiar localStorage/IndexedDB permission warnings used in earlier injected-harness runs; they are storage-host warnings only and produced no page or console errors and no test failures.

### Current artifact roadmap after v0.4.37

The Master subsystem now has bounded coverage for the complete **Table 2 power registry**, complete **Table 3 adverse-effect registry**, **rudimentary autonomous self-defense**, and a loadable referee-only library for all **16 published Known Artifact examples**. The next artifact checkpoint should wire the deterministic **artifact-specific activation, discovery, and event-triggered adverse procedures** from those sixteen examples into the common campaign event layer, while leaving genuinely narrative or referee-dependent choices pending. After that, continue the previously named cross-system edges: unusual target geometry, transformation extraordinary powers, universal magic-item/range routing, object/container detail, and other bespoke producers that still bypass common predicates.


## v0.4.38 — Known Artifact source-event runtime

This checkpoint advances the sixteen published Master **Known Artifact** records from a static referee library into a persistent **source-event runtime**. The goal is deliberately narrower than inventing generic artifact behavior: where Mentzer gives a concrete trigger, interval, percentage, activation condition, discovery method, or recharge exchange, the engine can now record and resolve that procedure directly. Where the source still requires a story decision, a new character build, a particular encounter interpretation, or an unrepresented object/environment state, the event remains explicit and bounded rather than being silently guessed.

`normalizeArtifactRecord()` now preserves `sourceRuntime` across save normalization. Loaded published artifacts keep event counters, per-day discovery limits, touch/control state, staged doom state, special recharge state, timed transformation data, and other source-specific lifecycle information. The referee command surface adds:

```text
dev artifact event <id> by <character>: <event>, key=value
```

This is a referee/testing hook for deterministic campaign events; it does not make hidden source information player-visible.

### Activation and discovery procedures

The following printed acquisition/discovery gates now have direct runtime procedures:

- **Armet by Wayland:** remains inactive until a wearer participates in slaying a large/huge dragon and either deals at least half the required damage or delivers the killing blow.
- **Claw of Mighty Simurgh:** grants complete power knowledge telepathically during the claimant's first sleep.
- **Comb of the Korrigans:** requires one full turn in a burning fire for activation; thereafter befriending an elf reveals one power telepathically, with the printed one-per-day limit.
- **Diamond Orb of Tyche:** one uninterrupted hour of gazing reveals the next power in PP-cost order, with the one-power-per-day limit.
- **Fiery Brand of Masauwu:** slaying creatures with the item reveals powers in PP-cost order, at most two per day. Its source requirement that the Brand be **lit** is now an actual power-use gate, and water can extinguish it.
- **Girdle of Armida:** its arcane writing reveals all powers only when Read Magic is supplied by a caster of at least 30th level.
- **Humbaba's Glaring Eye:** a valid reading requires ESP or Clairvoyance, a reflecting surface, and Read Language at the same time. The reflected power is randomly selected and changes at midnight.
- **Hymir's Steaming Caldron:** activates only when filled with water and heated over a fire; Read Magic then reveals its commands in the bubbles. A separate source flag records whether Hymir's ale has actually been tasted for the exact-flavor condition.
- **Ivory Plume of Maat:** a represented Paladin or Lawful Knight receives full knowledge on possession; other users may acquire it through a source-valid Commune or Contact Other Plane directed to Maat.
- **Ortnit's Lance of Doom:** the first represented creature strike exposes Hold Monster/Translating behavior and the wielder's awareness of the dodge ability; attempting to dodge a missile reveals how to use Dodge Any Missiles.
- **Pileus:** activates when worn while freeing an imprisoned member of the wearer's race, then reveals all powers in dreams that night.
- **Rainbow Scarf of Sinbad:** requires sea travel, wearing the scarf, passing sea mist, and both Read Magic and Detect Invisible; it reveals at most one power per hour.
- **Shard of Sakkrad:** touching it immediately grants all power/command knowledge, and ending physical contact immediately removes that knowledge. Shard power use is now rejected while the represented user is not touching it.
- **Tome of Ssu-Ma:** magical opening is rejected; the Open Locks attempt applies the printed **+50 to the percentile roll**, and a character who fails is permanently locked out from opening it. Success opens the Tome and exposes the complete first-page power/cost/instruction record.
- **Verthandi's Invincible Hourglass:** full-moon sleep reveals powers in ascending PP cost, with Timestop ordered before Wish at the 100-PP tie; Haste or Potion of Speed can make the printed 25% additional-revelation check.
- **Wife of Ilmarinen:** can explain its powers, but a user cannot command its attacks until the special control word is obtained from Ilmarinen, a previous user, or a Wish. This source control gate is enforced before a user-directed power can resolve.

### Source-specific recharge, touch, and timed events

Three printed exceptions now bypass the generic magnitude recharge cycle correctly. The **Ivory Plume** and **Wife of Ilmarinen** begin with ordinary automatic recharge disabled. The Plume restores **1 PP per 100 XPV, rounded up**, when an eligible Chaotic/evil-intentioned foe is slain while it is openly worn. The Wife restores **1 PP per 100 gp** of gold or silver consumed. The **Diamond Orb** still uses normal recharge until its container is completely filled; that event permanently disables automatic recharge and switches it to the printed **100 gp of treasure per 1 PP** exchange.

The Ivory Plume's special touch defense is also executable. A represented Chaotic or evil-intentioned toucher triggers the printed no-save **Obliterate** reaction, spending 90 PP. For a mortal target in the <=12-HD/level range the no-save variant is fatal; a more powerful represented target receives the underlying 6d10 branch without the normally permitted save. The separate source rule that slaying a Lawful creature kills the user without a save is exposed as its own event procedure.

The **Claw of Mighty Simurgh** now makes its printed 25% Service check when qualifying severe weather is witnessed; a trigger records the requirement to gather a party and depart for the far northern mountains within three days. **Ortnit's Lance** records its one-day dragon vulnerability after a creature is struck and records the one-third carried-treasure loss requirement after a lance kill, while the actual universal damage/treasure transfer hooks remain a later cross-system edge.

### Staged Doom and long-running state

Two unusually stateful artifact examples now preserve their source sequence instead of flattening it into a generic penalty roll.

For the **Fiery Brand of Masauwu**, the first Spell Damage Bonus applied to Meteor Swarm arms the Doom. The event counter persists; a subsequent undead strike removes the user and artifact from mortal play, and the **third** augmented Meteor Swarm does the same. The carried equipment is explicitly left behind in the recorded outcome. The current engine exposes the exact `meteor_bonus_applied`/`undead_strike` source events; automatically detecting the later consumption of the one-spell damage bonus by Meteor Swarm itself remains a spell-consumption integration edge.

For the **Shard of Sakkrad**, 100-PP uses now advance the printed handicap sequence rather than applying all similarly named triggers at once: Operating Cost first, Greed second, then Immortal Doom. Once Doom is armed, the next 100-PP use begins at **5%** for an Immortal arrival and each later use increases that chance by **2 percentage points**. A successful arrival check is recorded as a pending Immortal event; the engine does not invent which Immortal appears or what that being does.

**Humbaba's Glaring Eye** now schedules its possession-time obsession check every ten days. Each successive Saving Throw vs. Spells receives the printed cumulative -1, -2, -3, etc. penalty. A failed check persists the obligation to choose and actively pursue a route to Immortality while forsaking other activities. Midnight also refreshes the Eye's random reflected-power state.

The **Comb of the Korrigans** now tracks the three-month transformation clock, exposes the printed minor-change milestone after two weeks, and stops/reverses the process when the artifact is relinquished. Reversal takes the printed three months. At full transformation the engine records that the source says the user has become a **1st-level elf**, but it does not silently rebuild an existing character's class, XP, hit points, spells, and equipment legality; that final character-conversion transaction remains referee-confirmed until the common class-rebuild layer can do it safely.

### Deliberate boundaries after v0.4.38

This is not a claim that every sentence in all sixteen Known Artifact examples is now bespoke automation. Important remaining edges include: automatic linkage of the Fiery Brand's one-spell damage bonus to a later Meteor Swarm; Verthandi's seconds-equal-PP concentration/interruption transaction; the Girdle's Hold Person backlash against Lawful/Neutral charm/confusion targets; the Rainbow Scarf's automatic Intelligence-18 coupling to Open Locks; Ortnit's actual universal dragon-damage multiplier and carried-treasure debit; Pileus body-part Rot progression; the Plume's invulnerable justice-wall interaction; the Wife's redirected attack target on its 1-in-6 failure; and other story/geometry/inventory producers that still need a common hook. These are now isolated integration edges rather than missing artifact identity, registry, activation, or discovery infrastructure.

### Validation

Five new deterministic regression groups raise the integrated core suite from **450 to 455 tests**. They cover: multi-artifact activation/discovery gates; first-sleep/sea-mist/touch/full-moon/control-word discovery lifecycles; nonstandard recharge and event-triggered penalties including the Plume's automatic touch Obliterate; Masauwu/Sakkrad staged Doom; and Humbaba/Comb long-running clock state.

The exact integrated inline JavaScript passes syntax validation. The final v0.4.38 document was then loaded into a Chromium `Page.setDocumentContent` host (used because this environment blocks direct `file:` and localhost navigation) and the deterministic core harness was executed **three consecutive times**:

```text
Build: 0.4.38
Tests: 455 / 455 passed
Failures: 0
State isolation: preserved
Runs: 3 / 3 clean
Runtime exceptions: 0
Console errors: 0
Log errors: 0
```

### Current artifact roadmap after v0.4.38

The artifact subsystem now has bounded registry coverage for every printed Table 2 and Table 3 row, the vessel/damage/recall lifecycle, rudimentary autonomous self-defense, all sixteen published Known Artifact records, and a persistent source-event layer for their principal deterministic activation/discovery/recharge/timing procedures. The next pass should close the **remaining artifact-specific integration edges** listed above, then return to the broader BECMI audit for any non-artifact Basic/Expert/Companion/Master procedures still marked partial or open.
