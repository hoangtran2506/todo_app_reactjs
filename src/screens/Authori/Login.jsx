import { useContext, useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { setLocalStorage } from '../../utils/localstorage';
import { ACTIONS, AppContext } from '../../hooks/useContext';
import { redirect } from 'react-router-dom';
import { TOKEN_KEY } from '../../constans';

const Login = () => {
  const {dispatch} = useContext(AppContext);
  const [formValue, setFormValue] = useState({
    name: 'test',
    email: 'test@gmail.com',
  });

  const handleChange = (key, value) => {
    setFormValue({
      ...formValue,
      [key]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('this is submit handle', e.target);
    const { name, email, password } = formValue;
    if (name && email && password) {
      const token = 'abc';
      dispatch({
        type: ACTIONS.AUTHOR,
        payload: {
          name: formValue.name,
          email: formValue.email,
          token: token,
        }
      })
      setLocalStorage(TOKEN_KEY, token)
  } else {
      dispatch({
        type: ACTIONS.AUTHOR,
        payload: null
      })
    }
  };

  return (
    <div style={{}}>
      <Form onSubmit={handleSubmit}>
        <Row className='mb-3'>
          <Form.Group controlId='formGridEmail'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              value={formValue.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='formGridPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              value={formValue.password}
              onChange={(e) => handleChange('password', e.target.value)}
            />
          </Form.Group>
        </Row>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
