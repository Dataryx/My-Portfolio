
import React, { useState } from 'react';
import { Mail, MapPin, Hash, Send, Link, AlertTriangle, CheckCircle2 } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'IDENT_MISSING: NAME PIECE REQUIRED';
    if (!formData.email.trim()) {
      newErrors.email = 'ROUTE_MISSING: EMAIL UPLINK REQUIRED';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'STRUCTURAL_ERROR: INVALID EMAIL FORMAT';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'MANIFEST_EMPTY: DESCRIPTION REQUIRED';
    } else if (formData.message.length < 10) {
      newErrors.message = 'ASSEMBLY_TOO_SMALL: MIN 10 CHARS';
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSuccess(false);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-10 items-stretch">
      <div className="lg:col-span-5 flex flex-col justify-between space-y-12">
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-green-700">
            <Link size={24} />
            <span className="brick-font text-lg uppercase tracking-widest">JOINT: STABLE</span>
          </div>
          <h2 className="brick-font text-[9vw] lg:text-[6vw] leading-[0.8] uppercase text-black">
            SNAP_ <br /><span className="text-red-600">IN.</span>
          </h2>
          <p className="text-xl font-black uppercase tracking-tight leading-none text-black/60">
            Select a <span className="underline decoration-4 decoration-yellow-400 underline-offset-8">connector</span> to begin the assembly.
          </p>
        </div>

        <div className="space-y-4">
          {[
            { label: 'UPLINK', val: 'BLOCKS@BRICK.DEV', color: 'bg-red-600', icon: Mail },
            { label: 'LOCALE', val: 'SYDNEY // BASEPLATE 1', color: 'bg-blue-600', icon: MapPin },
            { label: 'RELAY', val: '@BRICK_BUILDER', color: 'bg-yellow-400', icon: Hash },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-4 group cursor-pointer brick-card p-4 bg-white hover:bg-black hover:text-white transition-all">
              <div className={`w-12 h-12 ${item.color} text-white flex items-center justify-center border-4 border-black rounded-lg transition-all group-hover:rotate-12 studs`}>
                <item.icon size={24} className={item.label === 'RELAY' ? 'text-black' : 'text-white'} />
              </div>
              <div className="space-y-0.5">
                <p className="brick-font text-[9px] text-red-600 opacity-60 uppercase">{item.label}</p>
                <p className="brick-font text-lg leading-none uppercase">{item.val}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-7 brick-card p-10 md:p-12 space-y-8 relative overflow-hidden bg-white">
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] brick-font text-[18vw] select-none pointer-events-none uppercase">BUILD</div>

        <div className="flex justify-between items-center border-b-8 border-black pb-6 mb-8">
           <h3 className="brick-font text-3xl uppercase italic leading-none opacity-80">Message Pack</h3>
           <div className="flex gap-2">
              <div className={`w-5 h-5 border-2 border-black rounded-full ${Object.keys(errors).length > 0 ? 'bg-red-600 animate-pulse' : 'bg-red-600'}`}></div>
              <div className="w-5 h-5 bg-blue-600 border-2 border-black rounded-full"></div>
              <div className="w-5 h-5 bg-yellow-400 border-2 border-black rounded-full"></div>
           </div>
        </div>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-brick-snap">
            <div className="w-20 h-20 bg-green-600 text-white border-4 border-black rounded-full flex items-center justify-center studs shadow-[0_8px_0px_#17522b]">
              <CheckCircle2 size={40} />
            </div>
            <h4 className="brick-font text-3xl uppercase">UPLINK_SECURED</h4>
            <p className="text-lg font-bold uppercase tracking-tight text-black/60">Instructions received. Analysis in progress.</p>
            <button 
              onClick={() => setIsSuccess(false)}
              className="btn-brick bg-black text-white px-6 py-3"
            >
              PREPARE NEW PACK
            </button>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="brick-font text-[10px] tracking-widest text-blue-600 flex justify-between">
                  Your Identity {errors.name && <span className="text-red-600 flex items-center gap-1"><AlertTriangle size={8} /> {errors.name}</span>}
                </label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-gray-100 border-4 p-4 brick-font text-base outline-none transition-all placeholder:text-black/5 uppercase ${errors.name ? 'border-red-600 bg-red-50' : 'border-black focus:bg-white focus:border-red-600'}`}
                  placeholder="Builder_Name"
                />
              </div>
              <div className="space-y-1.5">
                <label className="brick-font text-[10px] tracking-widest text-blue-600 flex justify-between">
                  Return Route {errors.email && <span className="text-red-600 flex items-center gap-1"><AlertTriangle size={8} /> {errors.email}</span>}
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-gray-100 border-4 p-4 brick-font text-base outline-none transition-all placeholder:text-black/5 uppercase ${errors.email ? 'border-red-600 bg-red-50' : 'border-black focus:bg-white focus:border-red-600'}`}
                  placeholder="Email_Channel"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="brick-font text-[10px] tracking-widest text-blue-600 flex justify-between">
                Manifest Description {errors.message && <span className="text-red-600 flex items-center gap-1"><AlertTriangle size={8} /> {errors.message}</span>}
              </label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3} 
                className={`w-full bg-gray-100 border-4 p-4 brick-font text-base outline-none transition-all resize-none placeholder:text-black/5 uppercase ${errors.message ? 'border-red-600 bg-red-50' : 'border-black focus:bg-white focus:border-red-600'}`}
                placeholder="What are we building?"
              ></textarea>
            </div>
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-6 text-white brick-font text-2xl uppercase flex items-center justify-center gap-4 group transition-all shadow-[0_8px_0px_rgba(0,0,0,0.3)] studs ${isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-black hover:bg-green-700'}`}
            >
              {isSubmitting ? 'TRANSMITTING...' : (
                <>
                  DISPATCH UPLINK 
                  <Send size={24} className="group-hover:translate-x-3 group-hover:-translate-y-3 transition-transform duration-500" />
                </>
              )}
            </button>
          </form>
        )}
        
        <div className="flex justify-between brick-font text-[8px] opacity-20 uppercase pt-6">
           <span>Model_Ref: B-2025</span>
           <span>Prot: SNAP_LOCK</span>
           <span>Quality: PLASTIC_GRADE_A</span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
