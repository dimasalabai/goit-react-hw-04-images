import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from './modal.module.css';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ close, children }) => {
  const closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      close();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeModal);

    return () => document.removeEventListener('keydown', closeModal);
  }, []);
  // якщо з useEffect повертається функція, то він її викликає після розмонтування

  return createPortal(
    <div onClick={closeModal} className={styles.overlay}>
      <div className={styles.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

/*
class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModal);
  }
  closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      this.props.close();
    }
  };
  render() {
    const { closeModal } = this;
    const { children } = this.props;
    return createPortal(
      <div onClick={closeModal} className={styles.overlay}>
        <div className={styles.modal}>{children}</div>
      </div>,
      modalRoot
    );
  }
}*/
export default Modal;
