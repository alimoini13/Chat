import { styled } from '@mui/system';
import AddFriendButton from './AddFriendButton';
import FriendsTitle from './FriendsTitle';
import PendingInvitationsList from './PendingInvitationsList.js/PendingInvitationsList';
import FriendsList from './FriendsList/FriendsList';

const FriendsSidebar = () => {
  const MainContainer = styled('div')({
    width: '224px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#2F3136',
  });
  return (
    <MainContainer>
      <AddFriendButton />
      <FriendsTitle title="Private Message" />
      <FriendsList />
      <FriendsTitle title="Invitations" />
      <PendingInvitationsList />
    </MainContainer>
  );
};

export default FriendsSidebar;
