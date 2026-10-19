# Oversized rigid weapons — contextual physical clearance v0.4.345

The user's 2026-10-19 contextual-combat authorization establishes an approximate
10-foot rigid-pole dungeon transport benchmark. This is an optional Known World
physical-feasibility policy, not an invented universal BECMI RAW restriction.
Existing printed RAW rules remain independently authoritative.

## Weapon identity and actual length

The 46 canonical weapon ratings and all damage expressions remain unchanged.
Size rating and two-handed use never imply a particular length or impossibility.
A spear or short poleaxe is not banned simply for belonging to a long-weapon
family. An actual rigid length over 10 feet establishes oversize.

The supplied compatible Rules Cyclopedia, printed p.65 (PDF page 67), describes
pikes as 12-18 feet long. The whole interval exceeds the user benchmark. If no
actual pike length is supplied, 18 feet is used only as the upper bound required
to *prove* a clearance exception, not as an invented exact length. A verified
12-foot pike can use a verified 12-foot handling span. An explicitly established variant length takes precedence over the standard
interval without silently changing its Size or damage ratings. Null/false/zero
or malformed supplied lengths remain unresolved rather than being coerced into
a convenient number.

`rigidLengthFt` on the actual equipped/inventory item records a known length.
`actor.rigidWeaponLengths[weaponId]` can record an explicitly long NPC weapon;
it applies only to that actual weapon ID and cannot overwrite a supplied item
fact. For one owned inventory item matching its equipped instance, a missing
inventory length can use the equipped actual length. An explicitly unknown
inventory fact stays unknown; one known equipped instance cannot establish the
length of an unspecified second item in an aggregate quantity.

## Independent physical facts

`state.weaponClearanceBySite[siteId]` stores separately:

- `transportFt`: maximum verified rigid length along the actual approach/route.
- `deployFt`: maximum verified rigid length that can be brought into use.
- `attackFt`: maximum verified rigid length usable for the intended attack path.
- `sourceNote`: the explicit physical observation, module geometry or referee source.

An encounter can supply scoped `combat.rigidWeaponClearance` facts, including its
actual `siteId` and `confined:true` where confinement is explicitly established.
A fact for another keyed site never grants clearance here. Known zero clearance
is a value; explicit unknown is null. Read-only policy calls do not rewrite any
missing/null/false/zero original. The explicit recorder validates nonnegative
finite distances or null and a known keyed site/source note.

The developer-only referee command is:

`dev weapon clearance <site-id> transport=<ft|unknown> deploy=<ft|unknown> attack=<ft|unknown> source=<physical source>`

This command records actual facts; it does not authorize inventing dimensions.
A cavern label or Context Matrix `Space=Open` is not proof of oversized rigid
transport, deployment or attack clearance. The ordinary confined-site default
uses the user's practical benchmark without pretending the actual ceiling is
10 feet. Explicit sufficient route and handling spans can permit a spacious
cavern or other genuinely supported exception.

Transport permission does not imply deployment. Deployment does not imply an
attack path. A currently usable weapon is not forbidden solely because a different
route would have been too narrow; source-supported arrival may have differed.

## Runtime boundaries

Ordinary keyed entry/movement checks carried positive-quantity personal/shared
items and actual equipped weapons. A refusal spends no travel time or RNG and
never silently drops equipment. Normal equipment economics, drawing/dropping,
shield compatibility and encumbrance remain unchanged.

An unusable ordinary manufactured weapon cannot attack, supply a Measure Size
advantage or provide weapon approach coverage. Refusal precedes its attack/damage
dice; physical impossibility is not converted into a small damage penalty.
Existing source-specific interactions and natural/special attack sequences remain
separate. Usable weapon damage follows its existing pipeline unchanged.

Pure RAW bypasses this new contextual policy while preserving all existing RAW
restrictions and separately saved contextual facts/preferences. Natural attacks
remain outside the weapon calculator and retain their published damage. Ordinary
retreat/fighting withdrawal has no new compulsory Measure escape contest.

The optional clearance dictionary migrates absent old-save data to its empty new
collection; explicit supplied null/false/zero values remain literal. New physical
facts persist separately from player belief/perception and are not added to a map.

## Remaining dependencies

This checkpoint changes feasibility only. Direction-independent current-Measure
Size is next; Ferocity and the separate natural proximity damage policy follow
in their own accepted checkpoints. The full 2026-10-19 completion contract is
binding. Passing these deterministic/native tests is not a claim of proven
encounter balance. No graphical map implementation is included.
