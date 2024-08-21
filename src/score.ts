import { Frame } from "./types";
import { isSpare, isStrike, totalPinHitOnFrame } from "./utils";

// A Strike scores 10 plus the number of pins knocked down in the next two rolls.
const scoreStrikeBonus = (frames: Frame[], i: number) => {
  const nextFrame = frames[i + 1];
  if (nextFrame.rolls.length > 1) {
    return nextFrame.rolls[0] + nextFrame.rolls[1];
  }
  if (nextFrame.rolls.length === 1 && i < frames.length - 2) {
    const nextNextFrame = frames[i + 2];
    return totalPinHitOnFrame(nextFrame) + nextNextFrame.rolls[0];
  }
  return 0;
};

// A Spare scores 10 plus the number of pins knocked down in the next roll.
const scoreSpareBonus = (frames: Frame[], i: number) => {
  const nextFrame = frames[i + 1];
  return nextFrame.rolls[0];
};

const isLastFrame = (frame: Frame) => frame.number === 10;

export const score = (frames: Frame[]) =>
  frames.reduce((acc, frame, i) => {
    acc += totalPinHitOnFrame(frame);
    if (!isLastFrame(frame)) {
      acc += isSpare(frame)
        ? scoreSpareBonus(frames, i)
        : isStrike(frame)
        ? scoreStrikeBonus(frames, i)
        : 0;
    }
    return acc;
  }, 0);
