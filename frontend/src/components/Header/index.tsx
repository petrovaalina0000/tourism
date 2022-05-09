import {FC, useContext} from "react";
import styles from './index.module.css';
import {Col, Dropdown, Menu, Row, Typography} from "antd";
import {AuthContext} from "../AuthProvider";
import {Link} from "react-router-dom";

export const Header: FC = () => {
  const authContext = useContext(AuthContext);

  const handleLogOut = () =>{
    authContext?.logout();
  }

  return <div className={styles.container}>
    <Row align='middle' gutter={16}>
      <Col flex={1}><Typography.Title level={3}>Петрова</Typography.Title></Col>
      {!authContext?.authenticated ? <>
          <Col><Link to='/login'><Typography.Link>Войти</Typography.Link></Link></Col>
          <Col><Link to='/register'><Typography.Link>Зарегистрироваться</Typography.Link></Link></Col>
        </> :
        <>
        <Col><Dropdown overlay={<Menu><Menu.Item onClick={handleLogOut}>Выйти</Menu.Item></Menu>}>
            <Typography.Link>Пользователь</Typography.Link>
          </Dropdown>
        </Col>
        </>}
    </Row>
  </div>
}