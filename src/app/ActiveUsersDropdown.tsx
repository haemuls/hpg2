import React from 'react';
import { Dropdown } from 'react-bootstrap';

interface ActiveUsersDropdownProps {
  activeUserCount: number | null;
  activeUsersProblems: Record<number, string[]>;
  problemTitles: Record<number, string>;
}

const ActiveUsersDropdown: React.FC<ActiveUsersDropdownProps> = ({
  activeUserCount,
  activeUsersProblems,
  problemTitles,
}) => {
  return (
    <Dropdown className="mr-3">
      <Dropdown.Toggle
        id="dropdown-active-users"
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          color: '#000',
          fontSize: '16px',
          padding: '0 10px',
        }}
      >
        {activeUserCount !== null
          ? `현재 접속인원: ${activeUserCount}명`
          : '접속 중 사용자 수'}
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ background: 'transparent' }}>
        {Object.keys(activeUsersProblems || {}).map((problemId) => {
          const problemIdNumber = Number(problemId);
          const problemTitle = problemTitles?.[problemIdNumber];

          if (activeUsersProblems?.[problemId]?.length > 0) {
            return (
              <Dropdown.Item
                key={problemId}
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
                {problemTitle || `문제 ID ${problemId}`} : {activeUsersProblems[problemId].length}명
              </Dropdown.Item>
            );
          }
          return null;
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ActiveUsersDropdown;
