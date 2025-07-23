"use client";

import { useState } from 'react';
import { ShoppingCart, Heart, Check, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import ContactForm from "../components/ContactForm";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CheckoutPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "تيشرت قطن",
      price: 300,
      quantity: 4,
      image: "/assets/images/تيشرت قطن.svg"
    },
    {
      id: 2,
      name: "تيشرت قطن",
      price: 300,
      quantity: 2,
      image: "/assets/images/تيشرت قطن.svg"
    }
  ]);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    saveInfo: false,
    paymentMethod: ''
  });

  const [selectedPayment, setSelectedPayment] = useState('visa');

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setProducts(products.map(product => 
      product.id === id ? { ...product, quantity: newQuantity } : product
    ));
  };

  const subtotal = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const shipping = 50;
  const tax = 50;
  const discount = 500;
  const total = subtotal + shipping + tax - discount;

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* شعار معاك */}
            <Image src="/assets/images/g10.svg" alt="معاك" width={48} height={48} />
            {/* عربة التسوق */}
            <Image src="/assets/images/shopping-cart 2.svg" alt="cart" width={24} height={24} />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          
          {/* Contact Form - Takes 2 columns */}
          <div className="lg:col-span-2 bg-white p-6">
            <div className="flex justify-between items-center gap-6">
              <h2 className="text-2xl font-bold">اتصال</h2>
              <Button variant="ghost" size="sm" className="text-primary-500">
                تسجيل الدخول
              </Button>
            </div>
            <div className="h-1" />
            <div className="flex flex-col gap-6">
              {/* Email */}
              <div>
                <Label htmlFor="email" className="block text-sm font-medium">
                  أدخل البريد الإلكتروني أو رقم الهاتف
                </Label>
                <div className="h-2" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full border border-gray-300 py-2 px-4"
                />
                <div className="h-2" />
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="newsletter"
                    checked={formData.saveInfo}
                    onCheckedChange={(checked) => handleInputChange('saveInfo', checked as boolean)}
                  />
                  <label htmlFor="newsletter" className="text-sm text-gray-600">
                    أرسل لي بريداً إلكترونياً بالأخبار والعروض
                  </label>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="text-lg font-semibold">عنوان الشحن</h3>
                <div className="h-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* اختر اسم الدولة */}
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="country" className="block text-sm font-medium">
                      اختر اسم الدولة
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full border border-gray-300 py-2 px-4 flex-row-reverse text-left !rounded-none">
                        <SelectValue placeholder="اختر الدولة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sa">السعودية</SelectItem>
                        <SelectItem value="ae">الإمارات</SelectItem>
                        <SelectItem value="kw">الكويت</SelectItem>
                        <SelectItem value="eg">مصر</SelectItem>
                        <SelectItem value="bh">البحرين</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {/* اختر العملة */}
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="currency" className="block text-sm font-medium">
                      اختر العملة
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full border border-gray-300 py-2 px-4 flex-row-reverse text-left !rounded-none">
                        <SelectValue placeholder="اختر العملة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sar">ريال سعودي</SelectItem>
                        <SelectItem value="aed">درهم إماراتي</SelectItem>
                        <SelectItem value="kwd">دينار كويتي</SelectItem>
                        <SelectItem value="egp">جنيه مصري</SelectItem>
                        <SelectItem value="bhd">دينار بحريني</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {/* الحي */}
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="district" className="block text-sm font-medium">
                      الحي
                    </Label>
                    <Input
                      id="district"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="اسم الحي"
                      className="w-full border border-gray-300 py-2 px-4"
                    />
                  </div>
                  {/* الشارع */}
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="street" className="block text-sm font-medium">
                      الشارع
                    </Label>
                    <Input
                      id="street"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="اسم الشارع"
                      className="w-full border border-gray-300 py-2 px-4"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {/* الرمز البريدي */}
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="postalCode" className="block text-sm font-medium">
                      الرمز البريدي (اختياري)
                    </Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      placeholder="الرمز البريدي"
                      className="w-full border border-gray-300 py-2 px-4"
                    />
                  </div>
                  {/* وصف البيت */}
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="address" className="block text-sm font-medium">
                      وصف البيت (اختياري)
                    </Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="رابط - المنتج"
                      className="w-full border border-gray-300 py-2 px-4"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <Checkbox
                    id="saveInfo"
                    checked={formData.saveInfo}
                    onCheckedChange={(checked) => handleInputChange('saveInfo', checked as boolean)}
                  />
                  <label htmlFor="saveInfo" className="text-sm text-gray-600">
                    احفظ هذه المعلومات للمرة القادمة
                  </label>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <div className="mb-6">
                  <div className="flex items-center justify-start gap-2 mb-2">
                    <Checkbox id="note-checkbox" />
                    <span className="text-right font-medium">كتابة ملاحظة</span>
                  </div>
                  <textarea
                    className="w-full border border-gray-300"
                    rows={4}
                    placeholder="اكتب ملاحظتك هنا"
                    style={{borderRadius:0}}
                  />
                </div>
                <div className="h-1" />
                <h3 className="text-lg font-semibold">الدفع</h3>
                <div className="flex flex-row-reverse flex-wrap gap-4 w-full">
                  {/* Visa */}
                  <label className={`flex flex-row items-center justify-center w-full sm:flex-1 min-w-0 p-2 border bg-white cursor-pointer gap-3 ${selectedPayment === 'visa' ? 'ring-2 ring-green-500' : ''}`}>
                    <input type="radio" name="payment" checked={selectedPayment === 'visa'} onChange={() => setSelectedPayment('visa')} className="w-6 h-6 accent-green-500" />
                    <Image src="/assets/images/Visa.svg" alt="visa" width={60} height={36} unoptimized />
                  </label>
                  {/* Tamara */}
                  <label className={`flex flex-row items-center justify-center w-full sm:flex-1 min-w-0 p-2 border bg-white cursor-pointer gap-3 ${selectedPayment === 'tamara' ? 'ring-2 ring-green-500' : ''}`}>
                    <input type="radio" name="payment" checked={selectedPayment === 'tamara'} onChange={() => setSelectedPayment('tamara')} className="w-6 h-6 accent-green-500" />
                    <Image src="/assets/images/تمارا.svg" alt="تمارا" width={60} height={36} unoptimized />
                  </label>
                  {/* Mastercard */}
                  <label className={`flex flex-row items-center justify-center w-full sm:flex-1 min-w-0 p-2 border bg-white cursor-pointer gap-3 ${selectedPayment === 'mastercard' ? 'ring-2 ring-green-500' : ''}`}>
                    <input type="radio" name="payment" checked={selectedPayment === 'mastercard'} onChange={() => setSelectedPayment('mastercard')} className="w-6 h-6 accent-green-500" />
                    <Image src="/assets/images/mastercard.svg" alt="mastercard" width={60} height={36} unoptimized />
                  </label>
                  {/* Mada */}
                  <label className={`flex flex-row items-center justify-center w-full sm:flex-1 min-w-0 p-2 border bg-white cursor-pointer gap-3 ${selectedPayment === 'mada' ? 'ring-2 ring-green-500' : ''}`}>
                    <input type="radio" name="payment" checked={selectedPayment === 'mada'} onChange={() => setSelectedPayment('mada')} className="w-6 h-6 accent-green-500" />
                    <Image src="/assets/images/Mada.svg 1.svg" alt="mada" width={60} height={36} unoptimized />
                  </label>
                  {/* Tabby */}
                  <label className={`flex flex-row items-center justify-center w-full sm:flex-1 min-w-0 p-2 border bg-white cursor-pointer gap-3 ${selectedPayment === 'tabby' ? 'ring-2 ring-green-500' : ''}`}>
                    <input type="radio" name="payment" checked={selectedPayment === 'tabby'} onChange={() => setSelectedPayment('tabby')} className="w-6 h-6 accent-green-500" />
                    <Image src="/assets/images/tabby.svg" alt="tabby" width={60} height={36} unoptimized />
                  </label>
                </div>
                <div className="h-6" />
                <Button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold h-13 text-lg">
                  ادفع الآن
                </Button>
              </div>
            </div>
          </div>

          {/* Order Summary - Takes 1 column */}
          <div className="lg:col-span-1 bg-gray-100 min-h-screen p-6">
            <div className="bg-white shadow-sm p-4 flex flex-col gap-4">
              <h2 className="text-xl font-bold">تفاصيل الطلب</h2>
              <div className="w-full h-px bg-gray-200" />
              <div className="font-bold">المنتجات</div>
              <div className="flex flex-col gap-1">
                {products.map((product, idx) => (
                  <>
                    <div key={product.id} className="flex items-center py-1 w-full gap-2">
                      {/* صورة المنتج مع دائرة الكمية */}
                      <div className="w-1/5 flex items-center justify-end relative">
                        <img
                          src="/assets/images/تيشرت قطن.svg"
                          alt={product.name}
                          className="w-12 h-12 object-cover"
                        />
                        <div
                          className="absolute -top-2 -left-2 bg-green-600 text-white text-xs w-6 h-6 flex items-center justify-center gap-1"
                          style={{ borderRadius: "50%" }}
                        >
                          {idx + 1}
                        </div>
                      </div>
                      {/* اسم المنتج */}
                      <div className="w-3/5 text-right font-medium">{product.name}</div>
                      {/* السعر */}
                      <div className="w-1/5 text-left font-bold">{product.price} ج.م</div>
                    </div>
                    {/* خط بين المنتجات */}
                    {idx === 0 && <div className="w-full h-px bg-gray-200" />}
                  </>
                ))}
                {/* خط فاصل بين المنتجات */}
                <div className="w-full h-px bg-gray-200" />
              </div>
              {/* كود الخصم */}
              <div className="flex items-center gap-2">
                <input type="text" placeholder="اكتب كود الخصم" className="flex-1 border border-gray-300 py-2 px-4 text-right focus:outline-none focus:ring-2 focus:ring-green-500" style={{borderRadius:0}} />
                <button className="text-white font-bold px-4 py-2" style={{borderRadius:0, background:'#35A36E'}}>تطبيق</button>
              </div>
              {/* ملخص الطلب */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span>ملخص السلة</span>
                  <span>{subtotal} ج.م</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>ضريبة القيمة</span>
                  <span>{tax} ج.م</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>تكلفة الشحن</span>
                  <span>{shipping} ج.م</span>
                </div>
                <div className="w-full h-px bg-gray-200" />
              </div>
              {/* إجمالي الطلب */}
              <div className="flex justify-between items-center text-lg font-bold">
                <span>إجمالي الطلب</span>
                <span className="text-2xl">{total} ج.م</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}