import React from 'react';
import NewChatButton from '../buttons/NewChatButton';
import HistoryButton from '../buttons/HistoryButton';
import DeleteChatButton from '../buttons/DeleteChatButton';
import './Navbar.css';
import { useAuth } from '../../hooks/auth/useAuthHook';

interface NavbarProps {
  onNewChatClick: () => void;
  formsOpen?: boolean;
  onHistoryClick?: () => void;
  onDeleteChatClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onNewChatClick,
  formsOpen,
  onHistoryClick,
  onDeleteChatClick
}) => {
  const { user } = useAuth();
  const isGuest = !user || user.email === 'Guest';

  return (
    <nav className="navbar">
      <div className="leftSection">
        <div className="appName">CheckAI</div>
        <NewChatButton
          onNewChatClick={onNewChatClick}
          formsOpen={formsOpen}
          className="newChatButton"
        />
      </div>

      <div className="rightSection">
        {/* History dugme samo ako forma nije otvorena i korisnik nije guest */}
        {!formsOpen && !isGuest && onHistoryClick && (
          <HistoryButton
            className="historyButton"
            onClick={onHistoryClick}
          />
        )}

        {/* Delete dugme ostaje isto */}
        {onDeleteChatClick && (
          <DeleteChatButton onDelete={onDeleteChatClick} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
