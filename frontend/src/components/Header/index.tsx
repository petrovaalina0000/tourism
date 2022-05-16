import {FC, useContext} from "react";
import styles from './index.module.css';
import {Col, Dropdown, Menu, Row, Typography} from "antd";
import {AuthContext} from "../AuthProvider";
import {Link} from "react-router-dom";

export const Header: FC = () => {
  const authContext = useContext(AuthContext);

  const handleLogOut = () => {
    authContext?.logout();
  }

  return <div className={styles.container}>
    <Row align='middle' gutter={16}>
      <Col flex={1}><Link to='/'><Typography.Title level={3}>Турагенство Петрова</Typography.Title></Link></Col>
      {!authContext?.authenticated ? <>
          <Col><Link to='/login'><Typography.Link>Войти</Typography.Link></Link></Col>
          <Col><Link to='/register'><Typography.Link>Зарегистрироваться</Typography.Link></Link></Col>
        </> :
        <>
          <Col>
            <Dropdown overlay={<Menu><Menu.Item key='orders'><Link to='/orders'>Мои заказы</Link></Menu.Item><Menu.Item
              onClick={handleLogOut} key='logout'>Выйти</Menu.Item></Menu>}>
              <Typography.Link>Пользователь</Typography.Link>
            </Dropdown>
          </Col>
        </>}
    </Row>
  </div>
}