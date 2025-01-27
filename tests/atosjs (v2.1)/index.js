import { TimeFormat } from "../../packages/atosjs/lib/index.js";

const t = new TimeFormat({
  format: {
    short: false,
    locale: "pt-BR",
  },
});

async function timer() {
  console.log(t.convertFromMilliseconds(32661000));
  console.log(t.convertFromMilliseconds(5000));

  // short
  t.format.short = true;
  console.log(t.convertFromMilliseconds(32661000));
  console.log(t.convertFromMilliseconds(5000));
  console.log(t.convertFromMilliseconds(1000));
}

timer();
