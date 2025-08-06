import { ChatInput } from "~/features/chat/components/ui/ChatInput";

export default function ChannelInput({
  ...props
}: React.ComponentProps<"div">) {
  return (
    <>
      <ChatInput {...props}>
        <ChatInput.Left>
          <ChatInput.EmojiPicker />
        </ChatInput.Left>
        <ChatInput.TypingBar></ChatInput.TypingBar>
        <ChatInput.Right>
          <ChatInput.SendButton />
        </ChatInput.Right>
      </ChatInput>
    </>
  );
}
