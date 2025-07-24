import React from 'react';
import styles from './UserCard.module.scss';

interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user' | 'moderator';
  isActive: boolean;
}

interface UserCardProps {
  user: User;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    onDelete(user.id);
  };

  const roleColors = {
    admin: styles.adminRole,
    user: styles.userRole,
    moderator: styles.moderatorRole,
  };

  return (
    <div className={`${styles.card} ${isDeleting && styles.deleting}`}>
      <div className={styles.header}>
        <img 
          src={user.avatar} 
          alt={user.name}
          className={styles.avatar}
        />
        <div className={styles.info}>
          <h3 className={styles.name}>{user.name}</h3>
          <p className={styles.email}>{user.email}</p>
        </div>
      </div>
      
      <div className={styles.body}>
        <span className={`${styles.role} ${roleColors[user.role]}`}>
          {user.role}
        </span>
        <span className={`${styles.status} ${user.isActive ? styles.active : styles.inactive}`}>
          {user.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>
      
      <div className={styles.actions}>
        <button 
          onClick={() => onEdit(user.id)}
          className={styles.editBtn}
          disabled={isDeleting}
        >
          Edit
        </button>
        <button 
          onClick={handleDelete}
          className={styles.deleteBtn}
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export default UserCard;