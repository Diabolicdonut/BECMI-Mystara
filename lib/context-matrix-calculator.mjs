// Pure, opt-in Known World Context Matrix weapon calculator (v0.4.336).
// It never rolls dice, reads campaign state, changes damage, or infers encounter facts.
export const DEFAULT_CONTEXT_CALIBRATION = Object.freeze({
  referenceProtection: 'Soft',
  stepsPerDamagePoint: 2,
  minimumModifier: -3,
  maximumModifier: 3
});

const sizes = Object.freeze(['Small', 'Medium', 'Large']);
const protections = Object.freeze(['Soft', 'Hard']);
const measures = Object.freeze(['Close', 'Normal', 'Far']);
const spaces = Object.freeze(['Open', 'Restricted']);
const profiles = Object.freeze({
  'Size-Based': Object.freeze({Close: 'negative-size', Normal: 0, Far: 'positive-size'}),
  'Flat': Object.freeze({Close: 0, Normal: 0, Far: 0}),
  'Long-Slight': Object.freeze({Close: -1, Normal: 0, Far: 1}),
  'Short-Favored': Object.freeze({Close: 2, Normal: 0, Far: -2}),
  'Short-Slight': Object.freeze({Close: 1, Normal: 0, Far: -1}),
  'Long-Favored': Object.freeze({Close: -2, Normal: 0, Far: 2})
});

const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const rating = value => Number.isInteger(value) && value >= -3 && value <= 3;
const neutral = reason => Object.freeze({eligible: false, modifier: 0, reason});
const roundExcel = value => Math.sign(value) * Math.floor(Math.abs(value) + 0.5);

// The first argument describes a WEAPON attack only. When attackContext is
// supplied, delivery=weapon and contextualWeaponDamageEligible=true are
// explicitly required. Natural/special/breath/projectile attacks are ineligible.
// Unknown facts never trigger partial, guessed, or inferred adjustments.
export function calculateContextMatrix(input, calibration = DEFAULT_CONTEXT_CALIBRATION) {
  if (!object(input)) return neutral('invalid-input');
  if (Object.hasOwn(input, 'attackContext')) {
    const a = input.attackContext;
    if (!object(a) || a.delivery !== 'weapon' ||
        a.contextualWeaponDamageEligible !== true) return neutral('notEligible');
  }
  const w = input.weapon;
  if (!object(w) || !rating(w.sizeRating) || !rating(w.powerRating) ||
      !rating(w.handlingRating) ||
      !Object.hasOwn(profiles, w.rangeProfile)) return neutral('invalid-weapon-profile');
  if (w.rcDamage === 'Nil') return neutral('nil-damage');
  if (Object.hasOwn(w, 'rcDamage') &&
      (typeof w.rcDamage !== 'string' ||
       !/^[1-9][0-9]*d[1-9][0-9]*(?:[+-][0-9]+)?$/.test(w.rcDamage))) {
    return neutral('nonnumeric-damage');
  }
  const {targetSize, protection, measure, space} = input;
  if (!sizes.includes(targetSize) || !protections.includes(protection) ||
      !measures.includes(measure) || !spaces.includes(space)) return neutral('unknown-context');
  if (!object(calibration) || !protections.includes(calibration.referenceProtection) ||
      !Number.isInteger(calibration.stepsPerDamagePoint) ||
      calibration.stepsPerDamagePoint <= 0 ||
      !Number.isInteger(calibration.minimumModifier) ||
      !Number.isInteger(calibration.maximumModifier) ||
      calibration.minimumModifier > calibration.maximumModifier) return neutral('invalid-calibration');

  const sizeStep = targetSize === 'Small' ? -w.sizeRating :
    targetSize === 'Large' ? w.sizeRating : 0;
  const powerStep = protection === 'Soft' ? -w.powerRating : w.powerRating;
  const referencePower = calibration.referenceProtection === 'Soft' ?
    -w.powerRating : w.powerRating;
  const rawRange = profiles[w.rangeProfile][measure];
  const rangeStep = rawRange === 'negative-size' ? -w.sizeRating :
    rawRange === 'positive-size' ? w.sizeRating : rawRange;
  const netSourceSteps = sizeStep + powerStep + rangeStep - referencePower;
  const convertedPoints = roundExcel(netSourceSteps / calibration.stepsPerDamagePoint);
  const handlingPoints = space === 'Restricted' ? w.handlingRating : 0;
  const uncappedTotal = convertedPoints + handlingPoints;
  const modifier = Math.max(calibration.minimumModifier,
    Math.min(calibration.maximumModifier, uncappedTotal));
  return Object.freeze({
    eligible: true,
    modifier,
    reason: 'ok',
    sizeStep,
    powerStep,
    rangeStep,
    handlingPoints,
    referencePower,
    netSourceSteps,
    convertedPoints,
    uncappedTotal
  });
}
