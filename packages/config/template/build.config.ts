import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
    preset: "@atosjs/config/build.preset",
    entries: ["src/index"],
});