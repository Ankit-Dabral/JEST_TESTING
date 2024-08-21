import { Frame } from "./types";

export const isStrike = (frame: Frame) =>
  frame.rolls.length === 1 && frame.rolls[0] === 10;

export const isSpare = (frame: Frame) =>
  frame.rolls.length === 2 && frame.rolls[0] + frame.rolls[1] === 10;

export const totalPinHitOnFrame = (frame: Frame) =>
  frame.rolls.reduce((acc, roll) => acc + roll, 0);
