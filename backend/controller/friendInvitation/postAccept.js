import FriendInvitation from './../../models/friendInvitation.js';
import User from './../../models/user.js';
import {
  updateFriendsPendingInvitations,
  updateFriends,
} from '../../socketHandlers/updates/friends.js';
export const postAccept = async (req, res) => {
  console.log('req body', req.body);
  try {
    const { id } = req.body.data;

    const invitation = await FriendInvitation.findById(id);

    if (!invitation) {
      return res.status(401).send('Error occured. Please try again');
    }

    const { senderId, receiverId } = invitation;

    // add friends to both users
    const senderUser = await User.findById(senderId);
    senderUser.friends = [...senderUser.friends, receiverId];

    const receiverUser = await User.findById(receiverId);
    receiverUser.friends = [...receiverUser.friends, senderId];

    await senderUser.save();
    await receiverUser.save();

    // delete invitation
    await FriendInvitation.findByIdAndDelete(id);

    // update list of the friends if the users are online
    updateFriends(senderId.toString());
    updateFriends(receiverId.toString());

    // update list of friends pending invitations
    updateFriendsPendingInvitations(receiverId.toString());
    return res.status(200).send('Friend successfuly added');
  } catch (err) {
    console.log(err);
    return res.status(500).send('Something went wrong. Please try again');
  }
};
