type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

interface JsonViewerProps {
  json: JSONValue;
}

export default function JsonViewer({ json }: JsonViewerProps) {
  return <JsonViewer json={json} />;
}
