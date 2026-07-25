type StructuredDataValue = Record<string, unknown>;

function serialize(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function StructuredData({ data }: { data: StructuredDataValue[] }) {
  return (
    <script type="application/ld+json">
      {serialize({
        "@context": "https://schema.org",
        "@graph": data,
      })}
    </script>
  );
}
