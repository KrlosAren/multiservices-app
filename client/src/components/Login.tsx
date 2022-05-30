import { useFormik } from 'formik';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import fetchAPI from '../utils/fetchApi';

const SignupForm = () => {
  const { login } = useContext(AuthContext)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values, helpers) => {
      helpers.setSubmitting(true);
      try {
        const resp = await fetchAPI(
          'http://django.localhost/api/auth/login/',
          'post',
          values
        );
        if (resp.status === 200) {
          const auth = {
            email: resp.data.user.email,
            name: resp.data.user.first_name + '' + resp.data.user.last_name,
            access_token: resp.data.access_token,
            refresh_token: resp.data.refresh_token,
          };
          login(auth);
          helpers.setSubmitting(false);
          helpers.resetForm();
        } else {
          helpers.setSubmitting(false);
          helpers.resetForm();
        }
      } catch (error: any) {
        helpers.setSubmitting(false);
        helpers.resetForm();
        throw new Error(error);
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor='email'>Email Address</label>
      <input
        id='email'
        name='email'
        type='email'
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <input
        id='password'
        name='password'
        type='password'
        onChange={formik.handleChange}
        value={formik.values.password}
      />

      <button type='submit'>Submit</button>
    </form>
  );
};

export default SignupForm;
