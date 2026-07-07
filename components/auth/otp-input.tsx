import { useOTPInput } from '@/lib/auth-hooks';

interface OTPInputProps {
  length?: number;
  onChange?: (code: string) => void;
  onComplete?: (code: string) => void;
}

export function OTPInput({ length = 6, onChange, onComplete }: OTPInputProps) {
  const { code, fullCode, isFilled, handleChange, handleKeyDown } = useOTPInput(length);

  const handleInputChange = (index: number, value: string) => {
    handleChange(index, value);
    const newCode = [...code];
    newCode[index] = value;
    const newFullCode = newCode.join('');
    onChange?.(newFullCode);

    if (newFullCode.length === length && /^\d+$/.test(newFullCode)) {
      onComplete?.(newFullCode);
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {code.map((digit, index) => (
        <input
          key={index}
          data-otp-input
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleInputChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="w-12 h-12 text-center text-2xl font-semibold rounded-lg bg-card border border-border focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan/50 transition-all"
        />
      ))}
    </div>
  );
}
