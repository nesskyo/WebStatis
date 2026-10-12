import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '../../lib/supabase';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';

const resetSchema = z.object({
  email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
});

type ResetFormData = z.infer<typeof resetSchema>;

interface ResetFormProps {
  onBackToLogin: () => void;
}

export const ResetForm: React.FC<ResetFormProps> = ({ onBackToLogin }) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: ResetFormData) => {
    setServerError(null);
    try {
      const redirectUrl = `${window.location.origin}/reset-password`;
      const { error } = await supabase.auth.resetPasswordForEmail(data.email.trim(), {
        redirectTo: redirectUrl,
      });

      if (error) {
        setServerError(error.message || 'Gagal mengirim instruksi reset password.');
        return;
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      console.error('[ResetForm] Error:', err);
      setServerError('Terjadi kesalahan teknis. Silakan coba kembali.');
    }
  };

  return (
    <div className="w-full space-y-5">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onBackToLogin}
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-ink/60 hover:text-ink transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Kembali</span>
        </button>
      </div>

      <div>
        <h3 className="font-display text-2xl text-ink tracking-tight uppercase">
          Pemulihan Password
        </h3>
        <p className="font-body text-sm text-ink/70 mt-1">
          Masukkan alamat email Anda untuk menerima tautan pembuatan password baru.
        </p>
      </div>

      {serverError && (
        <div
          role="alert"
          className="p-3.5 bg-red-500/10 border-l-4 border-red-500 text-red-600 text-sm flex items-start gap-2.5 font-body leading-snug"
        >
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
          <span>{serverError}</span>
        </div>
      )}

      {isSuccess ? (
        <div className="p-4 bg-emerald-500/10 border-l-4 border-emerald-500 text-emerald-800 space-y-3 font-body">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" />
            <div>
              <p className="font-semibold text-sm">Tautan Terkirim!</p>
              <p className="text-xs text-emerald-700 mt-1">
                Kami telah mengirim tautan reset password ke email Anda. Silakan periksa inbox atau folder spam Anda.
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onBackToLogin}
            className="w-full"
          >
            Kembali ke Login
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <Input
            label="Email Terdaftar"
            type="email"
            placeholder="nama@perusahaan.com"
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
          />

          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={isSubmitting}
            className="w-full mt-2"
          >
            {isSubmitting ? 'Mengirim...' : 'Kirim Tautan Reset'}
          </Button>
        </form>
      )}
    </div>
  );
};

export default ResetForm;
