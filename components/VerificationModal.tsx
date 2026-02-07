
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Smartphone, X, CheckCircle2, ChevronDown, ArrowRight, Lock } from 'lucide-react';

interface VerificationModalProps {
  onClose: () => void;
  onSuccess: (phoneNumber: string) => void;
}

const VerificationModal: React.FC<VerificationModalProps> = ({ onClose, onSuccess }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(179);

  useEffect(() => {
    let interval: any;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSendCode = () => {
    if (phone.length < 10) return;
    setLoading(true);
    setTimeout(() => {
      setStep(2);
      setLoading(false);
    }, 800);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code !== '123456') {
      alert('인증번호가 올바르지 않습니다 (데모용 번호: 123456)');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setStep(3);
      setLoading(false);
    }, 800);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-brand-blue/20 backdrop-blur-md animate-fadeIn p-4">
      <div className="bg-white w-full max-w-md rounded-[20px] shadow-brand overflow-hidden relative border border-brand-border/30">
        <button onClick={onClose} className="absolute top-5 right-5 text-brand-gray hover:text-brand-blue transition-colors">
          <X size={20} />
        </button>

        <div className="p-10">
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center">
                <div className="w-14 h-14 bg-brand-blue/5 rounded-2xl flex items-center justify-center text-brand-blue mx-auto mb-4">
                  <Smartphone size={28} />
                </div>
                <h3 className="text-xl font-bold text-brand-blue mb-1">Enter Phone Number</h3>
                <p className="text-brand-gray text-xs font-medium">인증번호를 받을 휴대폰 번호를 입력하세요.</p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r pr-3 border-brand-border">
                    <span className="text-base">🇨🇦</span>
                    <span className="text-sm font-bold text-brand-blue">+1</span>
                  </div>
                  <input
                    type="tel"
                    placeholder="647 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-brand-bg border border-brand-border rounded-btn pl-24 pr-4 h-[44px] font-bold text-brand-blue focus:bg-white transition-all"
                  />
                </div>

                <button
                  onClick={handleSendCode}
                  disabled={phone.length < 10 || loading}
                  className="w-full btn-primary shadow-brand disabled:opacity-50"
                >
                  {loading ? 'Sending...' : '인증 코드 받기'}
                </button>
                
                <p className="text-[11px] text-brand-gray text-center font-medium leading-relaxed">
                  전화번호는 중복 참여 방지 목적이며 외부에 공개되지 않습니다.
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center">
                <div className="w-14 h-14 bg-brand-blue/5 rounded-2xl flex items-center justify-center text-brand-blue mx-auto mb-4">
                  <Lock size={28} />
                </div>
                <h3 className="text-xl font-bold text-brand-blue mb-1">Enter One Time Password</h3>
                <p className="text-brand-gray text-xs font-medium">전송된 6자리 인증번호를 입력하세요.</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between gap-2">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      className="w-full h-[52px] bg-brand-bg border border-brand-border rounded-btn text-center text-xl font-bold text-brand-blue focus:bg-white transition-all"
                    />
                  ))}
                </div>

                <div className="flex justify-between items-center px-1">
                   <p className="text-[11px] font-bold text-brand-gray">남은 시간: <span className="text-brand-red">{formatTime(timer)}</span></p>
                   <button onClick={() => setTimer(179)} className="text-[11px] font-bold text-brand-blue hover:underline">재전송</button>
                </div>

                <button
                  onClick={handleVerify}
                  disabled={otp.some(d => !d) || loading}
                  className="w-full btn-primary shadow-brand disabled:opacity-50"
                >
                  {loading ? 'Verifying...' : '인증 완료'}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center animate-fadeIn space-y-6">
               <div className="w-20 h-20 bg-status-success/10 text-status-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={40} />
               </div>
               <div>
                 <h3 className="text-2xl font-bold text-brand-blue">인증 완료!</h3>
                 <p className="text-brand-gray text-sm mt-2 leading-relaxed">
                    휴대폰 인증이 성공적으로 완료되었습니다.<br/>
                    이제 정책 제안, 투표, 댓글 작성이 가능합니다.
                 </p>
               </div>
               <button
                 onClick={() => onSuccess(phone)}
                 className="w-full btn-primary shadow-brand"
               >
                 정책 참여하러 가기
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationModal;
