import { setMessages } from '../../features/chat/chatSlice';
import { store } from '../../store';

export const updateDirectChatHistoryIfActive = (data) => {
  const { participants, messages } = data;

  // find id of user from token and id from active conversation
  console.log('getstate', store.getState().user);
  const receiverId = store.getState().chat.chosenChatDetails?.id;
  const userId = store.getState().user.userDetails?.userDetails._id;
  console.log('false', receiverId, userId);
  if (receiverId && userId) {
    const usersInCoversation = [receiverId, userId];
    console.log('p', participants, usersInCoversation);
    updateChatHistoryIfSameConversationActive({
      participants,
      usersInCoversation,
      messages,
    });
  } else {
  }
};

const updateChatHistoryIfSameConversationActive = ({
  participants,
  usersInCoversation,
  messages,
}) => {
  const result = participants.every(function (participantId) {
    return usersInCoversation.includes(participantId);
  });

  if (result) {
    store.dispatch(setMessages(messages));
  }
};
