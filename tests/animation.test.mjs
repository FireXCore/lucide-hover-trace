import { test } from "node:test";
import assert from "node:assert/strict";
import { traceOffsets, traceDelay } from "../dist/index.js";

test("draw and reverse offsets are deterministic", () => {
  assert.deepEqual(traceOffsets("draw", 21), [21, 0]);
  assert.deepEqual(traceOffsets("reverse", 21), [-21, 0]);
});
test("redraw and ping-pong return complete keyframe sequences", () => {
  assert.deepEqual(traceOffsets("redraw", 8), [0, 8, 0]);
  assert.deepEqual(traceOffsets("ping-pong", 8), [8, 0, 8, 0]);
});
test("invalid geometry is skipped", () => {
  assert.deepEqual(traceOffsets("draw", NaN), [0, 0]);
  assert.deepEqual(traceOffsets("draw", -5), [0, 0]);
});
test("stagger timing clamps negative values and supports simultaneous mode", () => {
  assert.equal(traceDelay(3, 70, false), 210);
  assert.equal(traceDelay(3, 70, true), 0);
  assert.equal(traceDelay(-1, -3, false), 0);
});
