import css from 'styled-jsx/css';

const styles = css`
  .logo-image-container {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .logo-image {
    height: 48px;
    cursor: pointer;
  }

  .avatar-container {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }

  .avatar-button {
    cursor: pointer;
    background: none;
    border: none;
    outline: none;
  }
`;

export default styles;
