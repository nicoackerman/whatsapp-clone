import { useState } from "react";
import { ChevronDown, ChevronRight, Copy, Check } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

// Define a more specific type for JSON data
export type JsonData =
  | string
  | number
  | boolean
  | null
  | undefined
  | JsonData[]
  | { [key: string]: JsonData };

export interface JsonBlockProps {
  data: JsonData | string;
  name?: string;
  level?: number;
  defaultExpanded?: boolean;
  maxLevel?: number;
}

interface JsonValueProps {
  value: JsonData;
  keyName?: string;
  level: number;
  defaultExpanded: boolean;
  isLast?: boolean;
  maxLevel: number;
}

const JsonValue = ({
  value,
  keyName,
  level,
  isLast,
  defaultExpanded,
  maxLevel,
}: JsonValueProps) => {
  const [isExpanded, setIsExpanded] = useState(
    defaultExpanded && level < maxLevel,
  );
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    try {
      void navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const getValueType = (val: JsonData): string => {
    if (val === null) return "null";
    if (Array.isArray(val)) return "array";
    return typeof val;
  };

  const getValueColor = (type: string): string => {
    switch (type) {
      case "string":
        return "text-green-600 dark:text-green-400";
      case "number":
        return "text-blue-600 dark:text-blue-400";
      case "boolean":
        return "text-purple-600 dark:text-purple-400";
      case "null":
        return "text-gray-500 dark:text-gray-400";
      default:
        return "text-foreground";
    }
  };

  const formatValue = (val: JsonData): string => {
    if (typeof val === "string") return `"${val}"`;
    if (typeof val === "number" || typeof val === "boolean") return String(val);
    if (val === null) return "null";
    if (Array.isArray(val) || typeof val === "object")
      return JSON.stringify(val, null, 2);
    return "";
  };

  const isExpandable = (val: JsonData): boolean => {
    return val !== null && (typeof val === "object" || Array.isArray(val));
  };

  const getObjectLength = (obj: JsonData): number => {
    if (Array.isArray(obj)) return obj.length;
    if (typeof obj === "object" && obj !== null) return Object.keys(obj).length;
    return 0;
  };

  const renderExpandableContent = () => {
    if (Array.isArray(value)) {
      return value.map((item, index) => (
        <JsonValue
          key={index}
          value={item}
          keyName={String(index)}
          level={level + 1}
          isLast={index === value.length - 1}
          defaultExpanded={defaultExpanded}
          maxLevel={maxLevel}
        />
      ));
    } else if (typeof value === "object" && value !== null) {
      const entries = Object.entries(value);
      return entries.map(([key, val], index) => (
        <JsonValue
          key={key}
          value={val}
          keyName={key}
          level={level + 1}
          isLast={index === entries.length - 1}
          defaultExpanded={defaultExpanded}
          maxLevel={maxLevel}
        />
      ));
    }
    return null;
  };

  const indent = level * 16;

  if (!isExpandable(value)) {
    // Primitive value
    return (
      <div
        className="hover:bg-muted/50 group flex items-center gap-2 rounded px-1 py-0.5"
        style={{ paddingLeft: `${indent}px` }}
      >
        {keyName && (
          <span className="text-muted-foreground text-sm font-medium">
            {keyName}:
          </span>
        )}
        <span
          className={cn(
            "overflow-wrap-break-word word-break-all font-mono text-sm",
            getValueColor(getValueType(value)),
          )}
        >
          {formatValue(value)}
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="h-4 w-4 p-0 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={() => handleCopy(formatValue(value))}
        >
          {copied ? (
            <Check className="h-3 w-3" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
      </div>
    );
  }

  // Expandable object/array
  const length = getObjectLength(value);
  const isArray = Array.isArray(value);
  const openBracket = isArray ? "[" : "{";
  const closeBracket = isArray ? "]" : "}";

  return (
    <div className="select-none">
      <div
        className="hover:bg-muted/50 group flex cursor-pointer items-center gap-1 rounded px-1 py-0.5"
        style={{ paddingLeft: `${indent}px` }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Button
          variant="ghost"
          size="sm"
          className="h-4 w-4 p-0 hover:bg-transparent"
        >
          {isExpanded ? (
            <ChevronDown className="h-3 w-3" />
          ) : (
            <ChevronRight className="h-3 w-3" />
          )}
        </Button>

        {keyName && (
          <span className="text-muted-foreground text-sm font-medium">
            {keyName}:
          </span>
        )}

        <span className="text-muted-foreground font-mono text-sm">
          {openBracket}
        </span>

        {!isExpanded && (
          <>
            <span className="text-muted-foreground/70 text-xs">
              {length} {isArray ? "items" : "keys"}
            </span>
            <span className="text-muted-foreground font-mono text-sm">
              {closeBracket}
            </span>
          </>
        )}

        <Button
          variant="ghost"
          size="sm"
          className="ml-auto h-4 w-4 p-0 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            handleCopy(JSON.stringify(value, null, 2));
          }}
        >
          {copied ? (
            <Check className="h-3 w-3" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
      </div>

      {isExpanded && (
        <div>
          {renderExpandableContent()}
          <div
            className="text-muted-foreground py-0.5 font-mono text-sm"
            style={{ paddingLeft: `${indent + 16}px` }}
          >
            {closeBracket}
            {!isLast && <span className="text-muted-foreground/50">,</span>}
          </div>
        </div>
      )}
    </div>
  );
};

export function JsonBlock({
  data,
  name = "root",
  level = 0,
  defaultExpanded = true,
  maxLevel = 2,
}: JsonBlockProps) {
  if (data === undefined) {
    return (
      <div className="bg-muted/20 overflow-x-auto rounded-md border p-3 font-mono text-sm">
        <div className="text-muted-foreground mb-2 font-sans text-xs">
          {name}
        </div>
        <span className="text-gray-500 dark:text-gray-400">undefined</span>
      </div>
    );
  }

  let parsedData: JsonData;
  if (typeof data === "string") {
    try {
      parsedData = JSON.parse(data) as JsonData;
    } catch (error) {
      console.error(error);
      parsedData = data;
    }
  } else {
    parsedData = data;
  }
  return (
    <div className="bg-muted/20 overflow-x-auto rounded-md border p-3 font-mono text-sm">
      <div className="text-muted-foreground mb-2 font-sans text-xs">{name}</div>
      <JsonValue
        value={parsedData}
        level={level}
        defaultExpanded={defaultExpanded}
        maxLevel={maxLevel}
      />
    </div>
  );
}
