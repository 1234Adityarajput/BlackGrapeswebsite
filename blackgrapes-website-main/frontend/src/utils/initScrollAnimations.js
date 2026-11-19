/**
 * BLACK GRAPES SOFTECH - AUTOMATED SCROLL REVEAL ENGINE
 * 100% Safe, Non-blocking scroll reveal observer.
 * Zero CPU overhead, no mutation loops.
 */
import { initMotionSystem } from './motionEngine';

export function initScrollAnimations() {
  return initMotionSystem();
}

export default initScrollAnimations;
