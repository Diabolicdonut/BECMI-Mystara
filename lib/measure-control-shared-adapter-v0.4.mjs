// DESIGN-ONLY fail-closed shared-melee wrapper for the existing engine's
// connected Influence Sphere architecture. Does not modify production.
import {evaluateSizeInitiativeMeasure} from './measure-control-size-initiative.mjs';
const unresolved=reason=>Object.freeze({status:'unresolved',reason});
const done=(measure,reason)=>Object.freeze({status:'resolved',measure,reason});
export function evaluateSharedMeleeSizeControl({
  group,participants,sideRolls,currentRound,allSidesMoved,movement,geometryResult
}={}){
  if(!group||!['close','normal','far'].includes(group.range))
    return unresolved('unknown-shared-measure');
  const measure=group.range[0].toUpperCase()+group.range.slice(1);
  if(geometryResult!==undefined){
    if(!['Close','Normal','Far'].includes(geometryResult))
      return unresolved('invalid-geometry-result');
    return done(geometryResult,'geometry-authoritative');
  }
  if(!Number.isInteger(currentRound)||!Number.isInteger(group.formedRound))
    return unresolved('unknown-formed-round');
  if(currentRound===group.formedRound)return done(measure,'new-contact-deferred');
  if(!Array.isArray(participants)||participants.length!==2)
    return unresolved('multi-combatant-reach-ambiguous');
  if(participants.some(p=>p.kind!=='weapon'))
    return unresolved('natural-or-unverified-attack-reach');
  const [a,b]=participants;
  if(!a||!b||typeof a.sideId!=='string'||typeof b.sideId!=='string'||a.sideId===b.sideId)
    return unresolved('not-two-opposing-initiative-sides');
  if(allSidesMoved!==true)return unresolved('movement-phase-incomplete');
  if(!sideRolls||!Object.hasOwn(sideRolls,a.sideId)||!Object.hasOwn(sideRolls,b.sideId))
    return unresolved('missing-side-initiative');
  return evaluateSizeInitiativeMeasure({
    measure,intentA:a.intent,intentB:b.intent,
    weaponA:a.weapon,weaponB:b.weapon,
    initiativeA:sideRolls[a.sideId],initiativeB:sideRolls[b.sideId],
    activeThreatA:a.activeThreat,activeThreatB:b.activeThreat,
    movement,normalReachPolicy:'far-only'
  });
}
