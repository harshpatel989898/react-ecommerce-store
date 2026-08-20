import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '../../../store/useAuthStore';
import { useToastStore } from '../../../store/useToastStore';
import Input from '../../../components/common/Input/Input';
import PasswordInput from '../../../components/common/Input/PasswordInput';
import Button from '../../../components/common/Button/Button';
import { ROUTES } from '../../../config/routes';
import { FiZap } from 'react-icons/fi';
import { AVATARS } from '../../../assets';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { success } = useToastStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'alex.morgan@auratech.io',
      password: 'password123',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    login(
      {
        id: 'usr_demo',
        name: 'Alex Morgan',
        email: data.email,
        avatar: AVATARS.alexMorgan,
        role: 'customer',
        createdAt: new Date().toISOString(),
      },
      'jwt_token_demo_aura'
    );
    success('Welcome Back!', 'Successfully logged into your AuraStore account.');
    navigate(ROUTES.HOME);
  };

  return (
    <div className="min-h-screen bg-[#090d16] flex items-center justify-center p-6">
      <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center mx-auto text-white text-2xl shadow-lg shadow-indigo-600/30">
            <FiZap />
          </div>
          <h1 className="text-2xl font-black text-slate-100">Welcome to AuraStore</h1>
          <p className="text-xs text-slate-400">Sign in to access your saved hardware cart & orders</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Email Address" type="email" {...register('email')} error={errors.email?.message} />
          <PasswordInput label="Password" {...register('password')} error={errors.password?.message} />

          <Button type="submit" variant="primary" className="w-full mt-2" isLoading={isSubmitting}>
            Sign In to Account
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
