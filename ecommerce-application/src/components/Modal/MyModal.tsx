import { FC } from 'react';
import './MyModal.scss';
import { MyModalProps } from '../../types/profilePageTypes';

const MyModal: FC<MyModalProps> = ({ active, setActive, children }) => {
  return (
    <div
      className={active ? 'modal active' : 'modal'}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? 'modal__content active' : 'modal__content'}
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          e.stopPropagation()
        }
      >
        {children}
      </div>
    </div>
  );
};

export default MyModal;
