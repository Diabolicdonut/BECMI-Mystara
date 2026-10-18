// Design-only, pure measure-control prototype for Known World.
// NOT linked to production combat. Never rolls RNG or changes authoritative positions.
// Caller must supply existing BECMI side-initiative d6 and verified movement/position facts.
const MEASURES = Object.freeze(['Close','Normal','Far']);
const INTENTS = Object.freeze(['Press','Hold','Open']);
const DIRECTIONS = Object.freeze({Press:-1,Hold:0,Open:1});
const validRating = n => Number.isInteger(n) && n >= -3 && n <= 3;
const validProfile = w => w && validRating(w.sizeRating) && validRating(w.handlingRating);
const unresolved = reason => Object.freeze({status:'unresolved',reason});
const result = (measure,reason,extra={}) => Object.freeze({status:'resolved',measure,reason,...extra});
const moved = (measure,direction) => MEASURES[Math.max(0,Math.min(2,MEASURES.indexOf(measure)+direction))];

/**
 * One pairwise engagement only. Intent and movement legality are established by
 * ordinary BECMI phases. "Hold" means resisting a change of the current band,
 * not a new action/attack. A supplied geometryResult always wins.
 *
 * input = {
 *  measure, intentA, intentB,
 *  weaponA:{sizeRating,handlingRating}, weaponB:{sizeRating,handlingRating},
 *  initiativeA:1..6, initiativeB:1..6, // existing BECMI SIDE initiative
 *  space:'Open'|'Restricted',
 *  movement:{A:{Press:boolean,Open:boolean},B:{Press:boolean,Open:boolean}},
 *  activeThreatA?: boolean, activeThreatB?: boolean, // verified forward threat
 *  handlingRelevantA?:boolean, handlingRelevantB?:boolean, // verified technique constraints
 *  geometryResult?:'Close'|'Normal'|'Far' // already resolved actual positioning
 * }
 */
export function evaluateMeasureTransition(input) {
  if (!input || typeof input !== 'object') return unresolved('invalid-input');
  if (!MEASURES.includes(input.measure)) return unresolved('unknown-measure');
  if (input.geometryResult !== undefined) {
    if (!MEASURES.includes(input.geometryResult)) return unresolved('invalid-geometry-result');
    return result(input.geometryResult,'geometry-authoritative');
  }
  if (!INTENTS.includes(input.intentA) || !INTENTS.includes(input.intentB))
    return unresolved('unknown-intent');
  if (!validProfile(input.weaponA) || !validProfile(input.weaponB))
    return unresolved('invalid-weapon-profile');
  if (input.space !== 'Open' && input.space !== 'Restricted')
    return unresolved('unknown-space');
  const ia = input.initiativeA, ib = input.initiativeB;
  if (!Number.isInteger(ia) || ia < 1 || ia > 6 || !Number.isInteger(ib) || ib < 1 || ib > 6)
    return unresolved('unknown-existing-initiative');
  const da = DIRECTIONS[input.intentA], db = DIRECTIONS[input.intentB];
  // The spatial engine/RAW movement rules must verify attempted motion.
  for (const [who,intent] of [['A',input.intentA],['B',input.intentB]]) {
    if (intent !== 'Hold' && input.movement?.[who]?.[intent] !== true)
      return unresolved('movement-not-established');
  }
  if (da === db) {
    return result(moved(input.measure,da),
      da === 0 ? 'mutual-hold' : 'compatible-intentions',
      {winner:'none',reachA:0,reachB:0,handlingTieBreak:false});
  }
  const isDenial = (mine,theirs) => mine === 'Hold' && theirs === 'Press';
  function denialBonus(mine,theirs,self,opponent,verified) {
    if (!isDenial(mine,theirs) || input.measure === 'Close') return 0;
    const diff = self.sizeRating - opponent.sizeRating;
    if (diff <= 0) return 0;
    if (typeof verified !== 'boolean') return null;
    if (!verified) return 0;
    if (input.measure === 'Normal') return diff >= 2 ? 1 : 0;
    return diff >= 3 ? 2 : 1;
  }
  const reachA = denialBonus(input.intentA,input.intentB,input.weaponA,input.weaponB,input.activeThreatA);
  const reachB = denialBonus(input.intentB,input.intentA,input.weaponB,input.weaponA,input.activeThreatB);
  if (reachA === null || reachB === null) return unresolved('unknown-active-threat');
  const scoreA = ia + reachA, scoreB = ib + reachB;
  let winner = scoreA > scoreB ? 'A' : scoreB > scoreA ? 'B' : 'none';
  let handlingTieBreak = false;
  // Handling is a restricted-SPACE offensive rating in the approved workbook.
  // Trial extension: use ONLY as tie-break when the effect on BOTH declared
  // techniques is independently verified. Never a blanket speed/reach modifier.
  if (winner === 'none' && input.space === 'Restricted') {
    if (typeof input.handlingRelevantA !== 'boolean' ||
        typeof input.handlingRelevantB !== 'boolean') return unresolved('unknown-handling-relevance');
    if (input.handlingRelevantA && input.handlingRelevantB) {
      const ha = input.weaponA.handlingRating, hb = input.weaponB.handlingRating;
      if (ha !== hb) {
        winner = ha > hb ? 'A' : 'B';
        handlingTieBreak = true;
      }
    }
  }
  const intent = winner === 'A' ? input.intentA : winner === 'B' ? input.intentB : 'Hold';
  return result(moved(input.measure,DIRECTIONS[intent]),
    winner === 'none' ? 'control-tied' : 'contested-control',
    {winner,reachA,reachB,scoreA,scoreB,handlingTieBreak});
}
