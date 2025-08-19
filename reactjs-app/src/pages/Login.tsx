// import { useState } from 'react';
// import { useForm, type SubmitHandler } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { useNavigate } from 'react-router-dom';
// import { useAuthStore } from '../stores/useAuthorStore'; // nó dùng để lưu trữ người dùng đã đăng nhập


// interface IFormInput {
//     username: string;
//     password: string;
// }

// // Validation schema using Yup
// const schema = yup
//     .object({
//         username: yup.string().email('Email is invalid').required('Email is required'),
//         password: yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
//     })
//     .required();

// export default function LoginPage() {
//     const loginStore = useAuthStore();
//     const navigate = useNavigate();
//     const [loginError, setLoginError] = useState<string | null>(null);

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm<IFormInput>({
//         resolver: yupResolver(schema),
//         defaultValues: {
//             username: 'tungnt@softech.vn',
//             password: '123456789',
//         },
//         mode: 'onChange',
//     });

//     const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
//         setLoginError(null);
//         console.log('Form submitted:', data);

//         try {
//             await loginStore.login({
//                 username: data.username,
//                 password: data.password,
//                 navigate,
//             });
//         } catch (error) {
//             console.error('Login error:', error);
//             setLoginError('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
//         }
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gray-100 py-8">
//             <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//                 <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

//                 {/* Username Field */}
//                 <div className="mb-4">
//                     <label htmlFor="username" className="block text-sm font-bold text-gray-700">
//                         Username <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                         {...register('username')}
//                         type="text"
//                         id="username"
//                         name="username"
//                         className={`w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${errors.username
//                             ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
//                             : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
//                             }`}
//                         placeholder="Enter your username"
//                     />
//                     {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
//                 </div>

//                 {/* Password Field */}
//                 <div className="mb-4">
//                     <label htmlFor="password" className="block text-sm font-bold text-gray-700">
//                         Password <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                         {...register('password')}
//                         type="password"
//                         id="password"
//                         name="password"
//                         className={`w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${errors.password
//                             ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
//                             : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
//                             }`}
//                         placeholder="Enter your password"
//                     />
//                     {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
//                 </div>

//                 {loginError && (
//                     <p className="text-red-600 text-sm mb-4 text-center">{loginError}</p>
//                 )}
//                 {/* Submit Button */}
//                 <button
//                     type="submit"
//                     className="w-full py-2 rounded-md font-medium transition-colors bg-green-500 hover:bg-green-600 text-white"
//                 >
//                     Login
//                 </button>
//             </form>
//         </div>
//     );
// }
