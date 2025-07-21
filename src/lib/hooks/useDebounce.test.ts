import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./useDebounce";

// Tell Jest to use fake timers to control time
jest.useFakeTimers();

describe("useDebounce", () => {
  it("should return the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));
    expect(result.current).toBe("initial");
  });

  it("should only update the value after the specified delay", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: { value: "first" },
      }
    );

    // The value should still be the initial one
    expect(result.current).toBe("first");

    // Rerender with a new value
    rerender({ value: "second" });

    // The value should still be the old one because the timer hasn't passed
    expect(result.current).toBe("first");

    // Fast-forward time by 500ms
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Now the value should be updated
    expect(result.current).toBe("second");
  });
});
