import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
    preset: "../config/build.preset",
    entries: ["src/index"],
});