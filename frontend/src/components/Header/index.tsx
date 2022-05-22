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

  return <div style={{background: `url(/images/bg_beach.jpg)`, minHeight: '150px'}}>
    <div className={styles.overlay}>
      <Row align='middle' gutter={16}>
        <Col flex={1}><Link to='/'><Typography.Text style={{color: 'white'}}>Турагентсво
          Петрова</Typography.Text></Link></Col>
        {!authContext?.authenticated ? <>
            <Col><Link to='/login'><Typography.Link style={{color: 'white'}}>Войти</Typography.Link></Link></Col>
            <Col><Link to='/register'><Typography.Link
              style={{color: 'white'}}>Зарегистрироваться</Typography.Link></Link></Col>
          </> :
          <>
            <Col>
              <Dropdown
                overlay={<Menu><Menu.Item key='orders'><Link to='/orders'>Мои заказы</Link></Menu.Item><Menu.Item
                  onClick={handleLogOut} key='logout'>Выйти</Menu.Item></Menu>}>
                <Typography.Link style={{color: 'white'}}>Пользователь</Typography.Link>
              </Dropdown>
            </Col>
          </>}
      </Row>
    </div>
  </div>
}