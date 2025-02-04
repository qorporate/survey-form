export function yesAndNoToBoolean(value) {
    if (!value) {
        alert("Value is required");
        throw new Error("missing a value. check the console.");
    }

    return value.toLowerCase() === "Yes";
}
