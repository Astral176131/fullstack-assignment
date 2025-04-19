import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/index.css';

const loginSchema = z.object({
  uid: z.string()
    .min(1, { message: 'UID is required' })
    .email({ message: 'Invalid email format' }),
  password: z.string()
    .min(6, { message: 'Password must be at least 6 characters' })
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange'
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.uid,
          password: data.password
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Show error toast with message from backend or default message
        toast.error(result.error || 'Invalid UID or password', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      // Show success toast
      toast.success('Successfully logged in!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    } catch (error) {
      console.error('Login error:', error);
      // Show error toast for network errors
      toast.error(
        error instanceof Error ? error.message : 'Login failed', 
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome back!</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <div className="input-group">
            <input
              {...register('uid')}
              className="input-field"
              placeholder="UID"
              type="email"
            />
            {errors.uid && (
              <p className="error-message">{errors.uid.message}</p>
            )}
          </div>

          <div className="input-group">
            <input
              type="password"
              {...register('password')}
              className="input-field"
              placeholder="Password"
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>

          <button 
            type="submit" 
            className="login-button" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}