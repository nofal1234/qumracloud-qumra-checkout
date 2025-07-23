import React from "react";

export default function ContactForm() {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* العنوان */}
      <label className="text-lg font-bold mb-2 text-right block">اتصال</label>
      {/* حقل البريد أو الهاتف */}
      <input
        type="text"
        placeholder="ادخل البريد الإلكتروني أو رقم الهاتف"
        className="w-full border border-gray-300 py-2 px-4 text-right focus:outline-none focus:ring-2 focus:ring-green-500"
        dir="rtl"
      />
      {/* Checkbox */}
      <div className="flex items-center gap-2 justify-end">
        <label className="text-sm cursor-pointer" htmlFor="news">
          أرسل لي بريدًا إلكترونيًا بالأخبار والعروض
        </label>
        <input
          id="news"
          type="checkbox"
          className="accent-green-500 w-4 h-4"
        />
      </div>
    </div>
  );
} 