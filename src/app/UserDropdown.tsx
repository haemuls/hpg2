import React from 'react';
import { Dropdown } from 'react-bootstrap';

interface UserDropdownProps {
  nickname: string;
  onProfileClick: (e: React.MouseEvent<HTMLElement>) => void;
  onLogout: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ nickname, onProfileClick, onLogout }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {nickname}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          href="/Mypage"
          onClick={onProfileClick}
          style={{
            width: '100%',
            padding: '10px',
            boxSizing: 'border-box',
            transition: 'background-color 0.3s ease, color 0.3s ease',
          }}
          onMouseOver={(e) => {
            const target = e.target as HTMLElement;
            target.style.backgroundColor = '#c0c0cb';
            target.style.color = '#fff';
          }}
          onMouseOut={(e) => {
            const target = e.target as HTMLElement;
            target.style.backgroundColor = '';
            target.style.color = '';
          }}
        >
          Profile
        </Dropdown.Item>
        <Dropdown.Item
          href="/"
          onClick={onLogout}
          style={{
            width: '100%',
            padding: '10px',
            boxSizing: 'border-box',
            transition: 'background-color 0.3s ease, color 0.3s ease',
          }}
          onMouseOver={(e) => {
            const target = e.target as HTMLElement;
            target.style.backgroundColor = '#c0c0cb';
            target.style.color = '#fff';
          }}
          onMouseOut={(e) => {
            const target = e.target as HTMLElement;
            target.style.backgroundColor = '';
            target.style.color = '';
          }}
        >
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserDropdown;
