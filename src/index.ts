/**
 * Exposes Semark Protocol validation to Oxlint.
 *
 * @remarks
 * Responsibility: Publishes the Semark rule and its recommended severity.
 *
 * Boundary: Delegates source validation to the rule implementation and does not run Oxlint.
 *
 * @semarkFile
 */

import { definePlugin } from "@oxlint/plugins";

import { semarkValidationRule } from "./semark-validation-rule.js";

export const recommendedRules = {
  "semark/valid": "error",
} as const;

export default definePlugin({
  meta: {
    name: "semark",
  },
  rules: {
    valid: semarkValidationRule,
  },
});
