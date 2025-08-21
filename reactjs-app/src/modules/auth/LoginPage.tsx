import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthorStore';

interface IFormInput {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup
      .string()
      .required('Email is required')
      .email('Please enter a valid email address'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  })
  .required();

const LoginPage = () => {
  const loginStore = useAuthStore();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: 'hoangle191205@gmail.com',
      password: '123456789',
    },
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    setLoginError(null);
    try {
      await loginStore.login({
        username: data.email,
        password: data.password,
        navigate,
      });
    } catch (error) {
      setLoginError('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 py-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-700 flex items-center justify-center gap-2">
          <span>🔒</span> Login
        </h2>

        {/* Email Field */}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-bold text-gray-700 mb-2"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            name="email"
            className={`w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-base ${errors.email
              ? 'border-red-400 focus:border-red-400 focus:ring-red-200'
              : 'border-gray-300 focus:border-blue-400 focus:ring-blue-200'
              }`}
            placeholder="Nhập email của bạn"
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-bold text-gray-700 mb-2"
          >
            Password <span className="text-red-500">*</span>
          </label>
          <input
            {...register('password')}
            type="password"
            id="password"
            name="password"
            className={`w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-base ${errors.password
              ? 'border-red-400 focus:border-red-400 focus:ring-red-200'
              : 'border-gray-300 focus:border-blue-400 focus:ring-blue-200'
              }`}
            placeholder="Nhập mật khẩu"
            autoComplete="current-password"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-2">{errors.password.message}</p>
          )}
        </div>

        {loginError && (
          <p className="text-red-600 text-sm mb-4 text-center">{loginError}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg font-semibold transition-colors bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white shadow-md text-lg"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};
export default LoginPage;