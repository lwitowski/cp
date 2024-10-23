'use client';

import { FormEventHandler, useState } from 'react';
import { useAddInvestment } from './mutations';
import { useRouter } from 'next/navigation';

export const NewInvestmentPage = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const addInvestment = useAddInvestment();
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    await addInvestment.mutateAsync({
      name,
      quantity: parseInt(quantity, 10),
      buyPrice: parseFloat(buyPrice),
      currentPrice: parseFloat(currentPrice),
    });

    router.push('/');
  };

  return (
    <form className="p-4 mx-auto max-w-2xl" onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">New investment</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Stock name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="quantity" className="block text-sm font-medium leading-6 text-gray-900">
                Quantity
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="buyPrice" className="block text-sm font-medium leading-6 text-gray-900">
                Buy price
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  id="buyPrice"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(e.target.value)}
                  required
                  className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="currentPrice" className="block text-sm font-medium leading-6 text-gray-900">
                Current price
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  id="currentPrice"
                  value={currentPrice}
                  onChange={(e) => setCurrentPrice(e.target.value)}
                  required
                  className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add investment
        </button>
      </div>
    </form>
  );
}

export default NewInvestmentPage;