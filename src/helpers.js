export function getCurrentConversation(conversations, userId, recipientId) {
	return conversations.find(
		(conversation) =>
			conversation.recipients.includes(userId)
			&& conversation.recipients.includes(recipientId)
	)
}