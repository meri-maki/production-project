import React, { useState, useEffect } from 'react';
import styles from './UserCard.module.scss';

// Задача 1: UserCard компонент
// Найдите и исправьте все ошибки в этом компоненте

interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  isActive: boolean;
}

interface UserCardProps {
  user: User;
  onUserClick: (userId: number) => void;
  showDetails?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ user, onUserClick, showDetails = false }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<any>(null); // Ошибка 1: any вместо типизации

  useEffect(() => {
    if (showDetails && isExpanded) {
      // Ошибка 2: отсутствует обработка ошибок
      fetch(`/api/users/${user.id}/details`)
        .then(response => response.json())
        .then(data => setUserDetails(data));
    }
  }, [showDetails, isExpanded]); // Ошибка 3: отсутствует user.id в зависимостях

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    onUserClick(user.id);
  };

  const handleEmailClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    // Ошибка 4: не проверяется наличие email
    window.open(`mailto:${user.email}`);
  };

  return (
    <div 
      className={`${styles.userCard} ${user.isActive ? styles.active : styles.inactive}`}
      onClick={handleClick}
    >
      <div className={styles.header}>
        {/* Ошибка 5: отсутствует обработка случая когда avatar отсутствует */}
        <img 
          src={user.avatar} 
          alt={`${user.name} avatar`}
          className={styles.avatar}
        />
        <div className={styles.userInfo}>
          <h3 className={styles.userName}>{user.name}</h3>
          <p 
            className={styles.userEmail}
            onClick={handleEmailClick}
          >
            {user.email}
          </p>
        </div>
        {/* Ошибка 6: некорректное условие для отображения статуса */}
        {user.isActive && (
          <span className={styles.statusBadge}>
            {user.isActive ? 'Online' : 'Offline'}
          </span>
        )}
      </div>

      {/* Ошибка 7: неправильная логика отображения деталей */}
      {isExpanded && showDetails && (
        <div className={styles.details}>
          {/* Ошибка 8: отсутствует проверка на null */}
          <p>Phone: {userDetails.phone}</p>
          <p>Department: {userDetails.department}</p>
          <p>Join Date: {userDetails.joinDate}</p>
        </div>
      )}
    </div>
  );
};

export default UserCard;