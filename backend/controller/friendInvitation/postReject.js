import { updateFriendsPendingInvitations } from '../../socketHandlers/updates/friends.js';
import FriendInvitation from './../../models/friendInvitation.js';

export const postReject = async (req, res) => {
  try {
    const { data } = req.body;
    const { id } = data;
    const { userId } = req.user;
    console.log('post reject req body', id);
    // remove that invitation from friend invitations collection
    // const invitationExists = await FriendInvitation.findById(data.id);
    const invitationExists = await FriendInvitation.exists({ _id: id });
    if (invitationExists) {
      console.log('post reject exist');
      await FriendInvitation.findByIdAndDelete(id);
    }

    // update pending invitations
    updateFriendsPendingInvitations(userId);

    return res.status(200).send('Invitation succesfully rejected');
  } catch (err) {
    console.log(err);
    return res.status(500).send('Something went wrong please try again');
  }
};
