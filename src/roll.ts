import { Frame } from "./types";
import { totalPinHitOnFrame } from "./utils";

export const roll = (numberOfPinsHit: number, frame: Frame) => {
  if (numberOfPinsHit < 1 || numberOfPinsHit > 10) {
    throw new Error("Invalid roll");
  }

  if (
    frame.rolls.length === 2 ||
    (frame.rolls.length === 3 && frame.number === 10)
  ) {
    console.error(`Frame ${frame.number} is already full`);
    throw new Error(`Frame is full`);
  }

  if (totalPinHitOnFrame(frame) + numberOfPinsHit > 10 && frame.number !== 10) {
    console.error(
      `Frame ${frame.number} has a total number of knocked down pins of more than 10`
    );
    throw new Error(
      `Frame has a total number of knocked down pins of more than 10`
    );
  }

  if (
    frame.number === 10 &&
    frame.rolls.length === 3 &&
    (frame.rolls[0] !== 10 || frame.rolls[0] + frame.rolls[1] !== 10)
  ) {
    throw new Error(
      `Last frame should only have 3 rolls if it's a strike or a spare`
    );
  }

  frame.rolls.push(numberOfPinsHit);
};
