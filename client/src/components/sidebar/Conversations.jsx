import useGetConversation from "../../hooks/useGetConversation";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
  const { conversation, loading } = useGetConversation();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversation.map((item, idx) => (
        <Conversation
          key={item._id}
          conversation={item}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversation.length - 1}
        />
      ))}

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};
export default Conversations;
