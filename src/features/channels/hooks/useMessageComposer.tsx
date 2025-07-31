import React from "react";
import { MessageComposerContext } from "../providers/MessageComposerProvider";

export const useMessageComponser = () => {
  const ctx = React.useContext(MessageComposerContext);
  if (ctx === null)
    throw new Error(
      "useMessageComponser must be inside MessageComposerProvider",
    );
  return ctx;
};
