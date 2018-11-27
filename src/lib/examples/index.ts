import { ExamplesMapResolver } from './ExamplesMapResolver';

// re-align `typeFieldMap` and `fieldMap` (resolve examples and fakes), using a generic `resultResolver`.
// Allow `matches` list for both, using `resolveMatches`
export const resolveExamples = ({
  field,
  type,
  fields = [],
  config = {}
}: any): string => {
  const resolved = new ExamplesMapResolver({
    field,
    type,
    fields,
    config
  }).resolve();
  return resolved;
};

export { ExamplesMapResolver };
