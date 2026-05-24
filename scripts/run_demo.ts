import { deflectionLab, summary } from "../src/services/ragDeflectionService";

console.log("rag-deflection-bot demo");
console.log(JSON.stringify(summary(), null, 2));
console.log(JSON.stringify(deflectionLab(), null, 2));
