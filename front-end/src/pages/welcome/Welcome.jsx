import { AiOutlineArrowLeft } from 'react-icons/ai';
import styles from './welcome.module.css';
import ParticlesBg from 'particles-bg';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/action';
import { BsFillPlayFill } from 'react-icons/bs';
import { FaClipboardList } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { VscGraphLine } from 'react-icons/vsc';
export const Welcome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      <Tooltip label="Thanks! for playing 🙏">
        <div
          onClick={() => {
            dispatch(logout());
          }}
          className={styles.btn1}
        >
          <BiLogOut
            fontSize={'24px'}
            style={{ paddingRight: '5px', color: 'rgb(239, 199, 40)' }}
          />{' '}
          Log out
        </div>
      </Tooltip>
      <AiOutlineArrowLeft
        onClick={() => {
          navigate('/');
        }}
        fontSize={'32px'}
        style={{
          paddingLeft: '20px',
          paddingTop: '20px',
        }}
      />
      <ParticlesBg type="fountain" bg={true} />
      <div className={styles.welome_text}>The quiz app 🙏 welcomes you </div>
      <div className={styles.welcome_cont}>
        <div
          onClick={() => {
            navigate('/quiz');
          }}
          className={styles.btn}
        >
          <BsFillPlayFill
            fontSize={'34px'}
            style={{ paddingRight: '5px', color: 'rgb(239, 199, 40)' }}
          />{' '}
          Start your quiz now!
        </div>
        <div
          onClick={() => {
            navigate('/hallofame');
          }}
          className={styles.btn}
        >
          <FaClipboardList
            fontSize={'20px'}
            style={{ paddingRight: '5px', color: 'rgb(239, 199, 40)' }}
          />
          See our hall of fame!
        </div>
        <div
          onClick={() => {
            navigate('/mystats');
          }}
          className={styles.btn}
        >
          <VscGraphLine
            fontSize={'20px'}
            style={{ paddingRight: '5px', color: 'rgb(239, 199, 40)' }}
          />{' '}
          My stats!
        </div>
      </div>
    </div>
  );
};
