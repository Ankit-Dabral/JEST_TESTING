import { roll } from "./roll";
import { score } from "./score";
import { Frame } from "./types";

describe("score", () => {
  it("should score 300 for a perfect game", () => {
    const frames: Frame[] = Array.from({ length: 10 }, (_, i) => ({
      rolls: i === 9 ? [10, 10, 10] : [10],
      number: i + 1,
    }));

    expect(score(frames)).toBe(300);
  });

  it("should score 0 for a gutter game", () => {
    const frames: Frame[] = Array.from({ length: 10 }, (_, i) => ({
      rolls: [0, 0],
      number: i + 1,
    }));

    expect(score(frames)).toBe(0);
  });

  it("should score correctly for a game with all spares and a final bonus roll", () => {
    const frames: Frame[] = Array.from({ length: 9 }, (_, i) => ({
      rolls: [5, 5],
      number: i + 1,
    }));
    frames.push({ rolls: [5, 5, 5], number: 10 });

    expect(score(frames)).toBe(150);
  });

  it("should score correctly for a mixed game", () => {
    const frames: Frame[] = [
      { rolls: [10], number: 1 }, // Strike
      { rolls: [7, 3], number: 2 }, // Spare
      { rolls: [9, 0], number: 3 }, // Open frame
      { rolls: [10], number: 4 }, // Strike
      { rolls: [0, 8], number: 5 }, // Open frame
      { rolls: [8, 2], number: 6 }, // Spare
      { rolls: [0, 6], number: 7 }, // Open frame
      { rolls: [10], number: 8 }, // Strike
      { rolls: [10], number: 9 }, // Strike
      { rolls: [10, 8, 1], number: 10 }, // Strike with bonus rolls
    ];

    expect(score(frames)).toBe(167);
  });

  it("should throw an error for invalid rolls", () => {
    const frame: Frame = { rolls: [], number: 1 };

    expect(() => roll(11, frame)).toThrow("Invalid roll");
    expect(() => roll(-1, frame)).toThrow("Invalid roll");
  });

  it("should throw an error when frame is full", () => {
    const frame: Frame = { rolls: [5, 5], number: 1 };

    expect(() => roll(3, frame)).toThrow("Frame is full");
  });

  it("should throw an error if total pins in a frame exceed 10 (except the 10th frame)", () => {
    const frame: Frame = { rolls: [5], number: 1 };

    expect(() => roll(6, frame)).toThrow(
      "Frame has a total number of knocked down pins of more than 10"
    );
  });

  it("should allow three rolls in the 10th frame if the first roll is a strike", () => {
    const frame: Frame = { rolls: [10, 10], number: 10 };

    expect(() => roll(10, frame)).not.toThrow();
  });

  it("should allow three rolls in the 10th frame if the first two rolls make a spare", () => {
    const frame: Frame = { rolls: [5, 5], number: 10 };

    expect(() => roll(5, frame)).not.toThrow();
  });

  it("should throw an error if more than two rolls are attempted in the 10th frame without a strike or spare", () => {
    const frame: Frame = { rolls: [5, 3, 2], number: 10 };

    expect(() => roll(1, frame)).toThrow(
      "Last frame should only have 3 rolls if it's a strike or a spare"
    );
  });
});
